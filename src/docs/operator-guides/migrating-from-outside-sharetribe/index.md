---
title: Migrating from outside Sharetribe ecosystem
slug: migrating-from-outside-sharetribe
updated: 2022-01-31
category: operator-guides
ingress: How to import data from outside Sharetribe ecosystem
published: true
---

Data from an existing marketplace can be migrated to Sharetribe Flex. If
your marketplace is running in Sharetribe Go, there is a ready migration
path that will be handled by us. We will handle the migration in this
case and you can find the outline for this process
[here](https://www.sharetribe.com/docs/operator-guides/go-to-flex-migration/).

If you are running a marketplace outside the Sharetribe ecosystem, and
would like to import data to Flex, it is possible. You will need to
extract your data from its existing storage and transform it into a data
format called Intermediary. Sharetribe will then validate the
transformed data and load it into Flex.

This article will outline how you can encode data into Intermediary
format, give you syntax examples of the format, and provide instructions
on the migration process.

The tooling for these migrations is still in it's infancy and will
require some technical knowledge and a lots of patience.

## Intermediary data

Intermediary is an edn (https://github.com/edn-format/edn) data format
that allows defining data rows for marketplaces. It supports creating
links between rows via references.

We recommend that you use an .edn library to generate the data and
validate the .edn syntax to ensure that the file is up to standard.

### Format

Intermediary is specified as
[a map](https://clojure.org/reference/data_structures#Maps) with the
following keys:

- :ident - identifies the target marketplace by marketplace ID,
- :data - a seq of marketplace data rows. Each row is a 2-tuple of id
  and content.

You can find your marketplace ID in Flex Console > Build > General. Note
that the anonymised test file needs to specify your test environment
marketplace ID and your production data file needs to specify your
production environment marketplace ID.

The id part of row 2-tuple is specified as a tuple of 1 to 3 elements.
The first element is always an id attribute and identifies the row type.
The second element can be an alias or an import id. A 3 element version
has id attr, import id and an alias.

```
;; 1 element tuple
[:im.stripeAccount/id]

;; 2 element tuple with import id
[:im.image/id #uuid "58afd8e1-e336-4ca4-a1e7-ff1d91856a6c"]

;; 2 element tuple with alias
[:im.user/id :user/jane]

;; 3 element tuple
[:im.listing/id #uuid "b074e697-ab0c-4746-a195-c58d73606b1f" :listing/rock-sauna]
```

Import ids can be given to rows and they should be unique for the
marketplace and have type [UUID](#uuid). Aliases can be used to
reference rows from other rows. Aliases are useful when the data is
written by hand. Import ids are useful for programmatically generated /
exported data.

Note that import ids are only used in the import phase and they can not
be mapped to existing resource ids. TODO: EXPLAIN BETTER! Content part
of row 2-tuple is a map that is processed by tuple expansion function
registered for the content type.

If you are not generating data by hand (TODO WHAT IS THE JUSTIFICATION
HERE?), it is highly recommended that you use the 2 element form of the
id tuple. This means that you don't use aliases but unique uuid's
throughout the file to reference entities. You can read more about
[generating UUIDs for your data here](https://www.uuidgenerator.net/api).

#### Aliases

If you currently use non-UUID ids in your data, you can use them to
generate aliases for the data. Aliases must be unique across the file,
and they cannot contain spaces.

Since aliases are namespaced keywords (e.g. `:user/jane` in the
example), the unique part cannot begin with a number. If your unique ids
begin with a number, you can generate the aliases e.g. in the following
pattern:

```
// type: 'user', id: 123
alias = (type, id) =>
// returns ':user/u123'
return ':{type}/{type1stletter}{id}'
```

#### Referencing

When you already have data that is dependent on each other, such as
listings related to users and reviews related to listings, you can
reference the data within the import file. You can refer to resources by
either alias or UUID with the `#im/ref` syntax. The supported references
for each type, if any, are listed in the type description in the
[Supported types](#supported-types) section below. Note that referencing
data with an id or alias that does not exist in the same file causes a
validation error.

```
;; Referencing a listing by alias
[[:im.image/id #uuid "58afd8e1-e336-4ca4-a1e7-ff1d91856a6c"]
  #:im.image{:url "https://asset-url.someservice.com/path/to/img1.jpg"
            :sortOrder 1
            :listing #im/ref :listing/rock-sauna}]

;; Referencing a listing by UUID
[[:im.image/id]
  #:im.image{:url "https://asset-url.someservice.com/path/to/img2.jpg"
            :sortOrder 2
            :listing #im/ref [:im.listing/id #uuid "b074e697-ab0c-4746-a195-c58d73606b1f"]}]
```

See the [example](#an-example-of-intermediary-format) for more details.

### Supported types

Currently, the Intermediary format supports the following top level
types:

```
- :im.user/id
- :im.listing/id
- :im.image/id
- :im.stripeAccount/id
- :im.review/id
```

This means that the Intermediary supports importing:

- [Users](#user)
- [Listings](#listing)
- [Profile images](#image)
- [Listing images](#image)
- [Stripe accounts](#stripe-account) - You need to use the same Stripe
  keys in Flex as in your current service
- [Reviews](#review)

The migration process has some built-in validation for the types within
the Intermediary file. Optional keys must have non-empty values, and if
an optional key does not have a value, the key must be omitted for that
resource. Empty strings are validated as empty values.

#### Listing

Supported fields to migrate:
[API reference listing resource](https://www.sharetribe.com/api-reference/marketplace.html#listing-resource-format)

- Required attributes
  - `:im.listing/createdAt`
  - `:im.listing/title`
  - `:im.listing/closed` OR `:im.listing/state`
  - accepted values for `:im.listing/state`
    - `:listing.state/published`
    - `:listing.state/closed`
    - `:listing.state/draft`
    - `:listing.state/pendingApproval`
- Optional attributes - only include the key if it has a non-empty value
  - `:im.listing/description`
  - `:im.listing/location`
  - `:im.listing/price`
  - `:im.listing/author`
  - `:im.listing/publicData`
  - `:im.listing/privateData`
  - `:im.listing/metadata`

Supported references

- `#im.listing/author` -> `#im.user`

Example syntax:

```
[[:im.listing/id #uuid "b074e697-ab0c-4746-a195-c58d73606b1f" :listing/rock-sauna]
         #:im.listing{:createdAt #inst "2018-04-17T06:55:04.291-00:00"
                      :title "A solid rock sauna"
                      :description "A very nice solid rock sauna built solely of wood.\nHere's some more sensible stuff."
                      :closed false
                      :location #im/location [23.12 21.21]
                      :price #im/money [12.12M "EUR"]
                      :publicData {:category "rock"
                                   :amenities ["sauna" "pool"]}
                      :author #im/ref :user/john}]
```

#### User

Supported fields for migration:
[API reference current user resource](https://www.sharetribe.com/api-reference/marketplace.html#currentuser-resource-format).

Inside the user resource, the email resource differs a bit from the
documentation. The email resource is referenced under `:primaryEmail`
key like this:

```
:primaryEmail {:im.email/address "foo@sharetribe.com"
               :im.email/verified true}
```

The Intermediary file validation also checks that the email address
format is valid.

- Required attributes for `:im.user`
  - `:im.user/primaryEmail`
  - `:im.user/role`
  - `:im.user/createdAt`
  - `:im.user/profile`
    - Required attributes for `:im.user/profile`
      - `:im.userProfile/firstName`
      - `:im.userProfile/lastName`
    - Optional attributes - only include the key if it has a non-empty
      value
      - `:im.userProfile/displayName`
      - `:im.userProfile/bio`
      - `:im.userProfile/publicData`
      - `:im.userProfile/protectedData`
      - `:im.userProfile/privateData`
      - `:im.userProfile/metadata`
- Optional attributes - only include the key if it has a non-empty value
  - `:im.user/passwordHash`

Supported references

- `#im.userProfile/avatar` -> `#im.image`

Example syntax

```
[[:im.user/id :user/john]
  #:im.user{:createdAt #inst "2018-04-17T06:55:04.291-00:00"
            :primaryEmail {:im.email/address "foo@sharetribe.com"
                          :im.email/verified true}
            :profile {:im.userProfile/firstName "John"
                      :im.userProfile/lastName "Doe"
                      :im.userProfile/displayName "John D"
                      :im.userProfile/bio "He's just a poor boy from a poor family.\nSpare him his life from this monstrosity."
                      :im.userProfile/publicData { :premiumAccount true }
                      :im.userProfile/avatar #im/ref :avatar/john}
            :role [:user.role/customer :user.role/provider]}]
```

#### Image

Image urls need to be public and properly encoded URLs, so that we can
access the imported images while importing the data.

- Required attributes
  - `:im.image/url`
- Optional attributes - only include the key if it has a non-empty value
  - `:im.image/listing`
  - `:im.image/sortOrder`

Supported references

- `#im.image/listing` -> `#im.listing`

Note that for profile images, the reference is added in [user](#user)
with `#im.userProfile/avatar` -> `#im.image`

Example syntax

```
[[:im.image/id #uuid "58afd8e1-e336-4ca4-a1e7-ff1d91856a6c"]
  #:im.image{:url "https://asset-url.someservice.com/path/to/img1.jpg"
            :sortOrder 1
            :listing #im/ref :listing/rock-sauna}]
```

#### Stripe account

- Required attributes
  - `:im.stripeAccount/stripeAccountId`
  - `:im.stripeAccount/user` TODO: how about chargesEnabled and
    payoutsEnabled?

Example syntax

```
[[:im.stripeAccount/id]
  #:im.stripeAccount{:stripeAccountId "a_stripe_id"
                    :chargesEnabled true
                    :payoutsEnabled false
                    :user #im/ref :user/john}]
```

#### Review

Supported fields to migrate:
[API reference review resource](https://www.sharetribe.com/api-reference/marketplace.html#review-resource-format)

There are two types of reviews: `ofCustomer` and `ofProvider`. They
differ in the reference to listing, as `ofProvider` reviews have a
reference to a listing and `ofCustomer` don't.

- Required attributes
  - `:im.review/type`
  - `:im.review/state`
  - `:im.review/rating`
  - `:im.review/createdAt`
  - `:im.review/author`
  - `:im.review/subject`
  - `:im.review/content`
- Optional attributes - only include the key if it has a non-empty value
  - `:im.review/listing`

Supported references

- `#im.review/listing` -> `#im.listing`
- `#im.review/author` -> `#im.user`
- `#im.review/subject` -> `#im.user`

Example syntax

```
[[:im.review/id]
  #:im.review{:content "Exactly as advertised. Bummed this was a one time deal."
              :rating 5
              :type :review.type/ofProvider
              :state :review.state/public
              :createdAt #inst "2018-01-06T00:10:10Z"
              :author #im/ref :user/jane
              :subject #im/ref :user/john
              :listing #im/ref :listing/rock-sauna}]
```

### Value types

Intermediary format uses some notable value types:

- [Location](#location)
- [Money](#money)
- [UUID](#uuid)
- [Timestamp](#timestamp)

#### Location

Location is given as
[LatLng type](https://docs.mapbox.com/android/maps/api/9.6.0/com/mapbox/mapboxsdk/geometry/LatLng.html)
representing the latitude and longitude of the location. Both latitude
and longitude are 32 bit floats. The `location` attribute is used in the
FTW template to provide listing location coordinates through either
Mapbox or Google maps.

If your source data has addresses specified, and you would like to use
them to determine locations, you can use e.g. the Mapbox
[forwardGeoCode](https://github.com/sharetribe/ftw-daily/blob/01cdf40368380d64d90136efb37948c1da79ee0e/src/components/LocationAutocompleteInput/GeocoderMapbox.js#L106)
API call in your data transformation setup. We recommend that you
provide a valid location attribute if your marketplace uses maps in some
way, whether or not you provide an address attribute in e.g. public
data.

```
#:im.listing{...
            :location #im/location [23.12 21.21]
                      ...}
```

#### Money

Money type is defined as [ amount, currency ]. _TODO What's the
reasoning that price in Intermediary is given as decimals but Flex
handles prices in minor units?_

```
#:im.listing{...
            :price #im/money [12.12M "EUR"]
            ...}
```

#### UUID

A
[Universally Unique identifiers (UUID)](https://en.wikipedia.org/wiki/Universally_unique_identifier)
can be used to identify resources within the migration file using type
`#uuid`. If your data already uses UUIDs, make sure their format matches
[the canonical representation](https://en.wikipedia.org/wiki/Universally_unique_identifier#Format).

```
:im.image/id #uuid "58afd8e1-e336-4ca4-a1e7-ff1d91856a6c"
```

#### Timestamp

Timestamp values are given with type `#inst`.

```
:createdAt #inst "2018-04-17T06:55:04.291-00:00"
```

## Things to consider

### No updates are supported

The import is loaded only once to the production environment and
currently updates with multiple imports are not supported.

### Test import

We can perform multiple imports to test environment, with the caveat
that no data deletion in this situation is possible. This might lead to
double information being uploaded to the test site.

Also, anonymizing test import data by hiding sensitive information like
names, addresses, email addresses and stripe keys is highly recommended.

We recommend that you only use a subset of your data for the test
import. The purpose of the test migration is to confirm that your
extract-and-transform process creates a migration file that is valid and
consistent, so there is rarely need for importing the anonymized
equivalent of your full user data into the test environment.

### Password management

Importing passwords from outside the Sharetribe ecosystem is not
supported. This means that your users will be logged out of the service
and are required to use the recover password functionality to gain
access.

### Security and sharing data

Since you will be sharing user information about your service to ours,
it is essential to share the data securely. Contact us when you are
ready to share the data.

Anonymised test data for validation and test migrations can be shared
via email. However, for production data with real user information, we
will create a secure upload link that is valid for an agreed amount of
time.

## A full example of Intermediary format

The following is a complete example demonstrating value types
(#im/location, #im/money), import ids, aliases and referencing by import
ids and aliases.

```
{:ident :marketplace-ident
 :data [[[:im.listing/id #uuid "b074e697-ab0c-4746-a195-c58d73606b1f" :listing/rock-sauna]
         #:im.listing{:createdAt #inst "2018-04-17T06:55:04.291-00:00"
                      :title "A solid rock sauna"
                      :description "A very nice solid rock sauna built solely of wood.\nHere's some more sensible stuff."
                      :closed false
                      :location #im/location [23.12 21.21]
                      :price #im/money [12.12M "EUR"]
                      :publicData {:category "rock"
                                   :amenities ["sauna" "pool"]}
                      :author #im/ref :user/john}]

        [[:im.image/id #uuid "8bc7c21d-58f0-412d-8b89-be993893a356" :avatar/john]
         #:im.image{:url "https://asset-url.someservice.com/path/to/avatar.jpg"}]

        [[:im.user/id :user/john]
         #:im.user{:createdAt #inst "2018-04-17T06:55:04.291-00:00"
                   :primaryEmail {:im.email/address "foo@sharetribe.com"
                                  :im.email/verified true}
                   :profile {:im.userProfile/firstName "John"
                             :im.userProfile/lastName "Doe"
                             :im.userProfile/displayName "John D"
                             :im.userProfile/bio "He's just a poor boy from a poor family.\nSpare him his life from this monstrosity."
                             :im.userProfile/publicData { :premiumAccount true }
                             :im.userProfile/avatar #im/ref :avatar/john}
                   :role [:user.role/customer :user.role/provider]}]

        [[:im.stripeAccount/id]
         #:im.stripeAccount{:stripeAccountId "a_stripe_id"
                            :chargesEnabled true
                            :payoutsEnabled false
                            :user #im/ref :user/john}]

        [[:im.image/id #uuid "58afd8e1-e336-4ca4-a1e7-ff1d91856a6c"]
         #:im.image{:url "https://asset-url.someservice.com/path/to/img1.jpg"
                    :sortOrder 1
                    :listing #im/ref :listing/rock-sauna}]

        [[:im.image/id]
         #:im.image{:url "https://asset-url.someservice.com/path/to/img2.jpg"
                    :sortOrder 2
                    :listing #im/ref [:im.listing/id #uuid "b074e697-ab0c-4746-a195-c58d73606b1f"]}]


        [[:im.user/id :user/jane]
         #:im.user{:createdAt #inst "2018-04-17T06:55:04.291-00:00"
                   :primaryEmail {:im.email/address "bar@sharetribe.com"
                                  :im.email/verified true}
                   :profile {:im.userProfile/firstName "Jane"
                             :im.userProfile/lastName "Doe"
                             :im.userProfile/displayName "Jane D"}
                   :role [:user.role/customer :user.role/provider]}]

        [[:im.review/id]
         #:im.review{:content "Exactly as advertised. Bummed this was a one time deal."
                     :rating 5
                     :type :review.type/ofProvider
                     :state :review.state/public
                     :createdAt #inst "2018-01-06T00:10:10Z"
                     :author #im/ref :user/jane
                     :subject #im/ref :user/john
                     :listing #im/ref :listing/rock-sauna}]

        [[:im.review/id]
         #:im.review{:content "Great customer!"
                     :rating 5
                     :type :review.type/ofCustomer
                     :state :review.state/public
                     :createdAt #inst "2018-01-06T00:10:10Z"
                     :author #im/ref :user/john
                     :subject #im/ref :user/jane}]]}
```
