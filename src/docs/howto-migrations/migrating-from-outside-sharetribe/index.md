---
title: Migrating from outside Sharetribe ecosystem
slug: migrating-from-outside-sharetribe
updated: 2022-02-18
category: how-to-migrations
ingress: How to import data from outside Sharetribe ecosystem
published: true
---

Data from an existing marketplace can be migrated to Sharetribe. If your
marketplace is running in Sharetribe Go, there is a ready migration path
that will be handled by us. We will handle the migration in this case
and you can find the outline for this process
[here](https://www.sharetribe.com/help/en/articles/8418385-migrating-from-sharetribe-go-to-the-new-sharetribe).

If you are running a marketplace outside the Sharetribe ecosystem, and
would like to import data to Sharetribe, it is possible. You will need
to extract your data from its existing storage and transform it into
Sharetribe's proprietary data format called Intermediary. Sharetribe
will then validate the transformed data and load it into Sharetribe.

This article will outline how you can encode data into Intermediary
format, give you syntax examples of the format, and provide instructions
on the migration process.

## When to request a migration?

You should request a migration when:

- You have a marketplace operating outside the Sharetribe ecosystem
- You know you want to transfer your marketplace users and listings to
  your Sharetribe marketplace. If you’d prefer to re-start your
  community in Sharetribe, then a migration is not needed.
- You have started developing with Sharetribe or configured your no-code
  settings to get started with a no-code Sharetribe marketplace.

You will work with Sharetribe’s engineers to complete your migration. If
you're planning to migrate your data to Sharetribe, you should always
start the process with a test migration to your dev environment, and
ensure everything looks correct there, before doing a live migration. If
you want to initiate the (test or live) migration process, you should
email hello@sharetribe.com with the subject “Migrating from outside
Sharetribe”. Please include your Sharetribe organization (your
organization is displayed in your
[Console](https://console.sharetribe.com/) in the top right corner).

## Intermediary data

Intermediary is an edn (https://github.com/edn-format/edn) data format
that allows defining data rows for marketplaces. It supports creating
links between rows via references.

We recommend that you use an edn library to generate the data and
validate the .edn syntax to ensure that the file is up to standard.

<extrainfo title="How to generate edn using a library?">

edn libraries exist for multiple languages, for example
[JavaSript](https://www.npmjs.com/search?q=edn),
[Python](https://pypi.org/search/?q=edn), and
[Ruby](https://rubygems.org/search?query=edn). Clojure has built-in
support for edn. Usually these libraries support encoding data
structures to edn and creating custom tagged elements.

Here's an example of how to write a bit of intermediary data in edn
format using JavaScript libraries
[jsedn](https://www.npmjs.com/package/jsedn) and
[uuid](https://www.npmjs.com/package/uuid) to represent a user and a
listing:

```javascript
const edn = require('jsedn');
const { v4: uuidv4 } = require('uuid');

const tagged = (tag, value) => new edn.Tagged(new edn.Tag(tag), value);
const uuid = () => tagged("uuid", uuidv4());
const price = (amount, currency) => tagged("im/money", [amount, currency]);

const email = data => {
  const { emailAddress } = data;
  return new edn.Map([edn.kw(":im.email/address"), emailAddress,
                      edn.kw(":im.email/verified"), true]);
};

const profile = data => {
  const { firstName, lastName } = data;
  return new edn.Map([edn.kw(":im.userProfile/firstName"), firstName,
                      edn.kw(":im.userProfile/lastName"), lastName]);
};

const user = data => {
  const { alias, emailAddress, firstName, lastName } = data;
  const role = new edn.Vector([edn.kw(":user.role/customer"), edn.kw(":user.role/provider")]);

  return new edn.Vector([new edn.Vector([edn.kw(":im.user/id"), uuid(), alias]),
                         new edn.Map([
                           edn.kw(":im.user/primaryEmail"), email(data),
                           edn.kw(":im.user/createdAt"), tagged("inst", new Date().toISOString()),
                           edn.kw(":im.user/role"), role,
                           edn.kw(":im.user/profile"), profile(data)
                         ])
                        ]);
};

const listing = data => {
  const { alias, title, priceAmount, author } = data;
  return new edn.Vector([new edn.Vector([edn.kw(":im.listing/id"), uuid(), alias]),
                         new edn.Map([
                           edn.kw(":im.listing/title"), title,
                           edn.kw(":im.listing/createdAt"), tagged("inst", new Date().toISOString()),
                           edn.kw(":im.listing/state"), edn.kw(":listing.state/published"),
                           edn.kw(":im.listing/price"), price(priceAmount, "EUR"),
                           edn.kw(":im.listing/author"), tagged("im/ref", author)
                         ])
                        ]);

const userAlias = edn.kw(":user/john");
const e = new edn.Map([edn.kw(":ident"), edn.kw(":mymarketplace"),
                       edn.kw(":data"), new edn.Vector([
                         listing({
                           alias: edn.kw(":listing/rock-sauna"),
                           title: "A solid rock sauna",
                           priceAmount: 12.20,
                           author: userAlias}),
                         user({
                           alias: userAlias,
                           emailAddress: "foo@sharetribe.com",
                           firstName: "John",
                           lastName: "Doe"
                         })
                       ])
                      ]);

console.log(edn.encode(e)); // or save to file
```

</extrainfo>

### Format

Intermediary is specified as
[a map](https://clojure.org/reference/data_structures#Maps) with the
following keys:

- :ident - identifies the target marketplace by marketplace ID,
- :data - a [seq](https://clojure.org/reference/sequences) of
  marketplace data rows. Each row is a 2-tuple (an array with two
  elements) of id and content.

You can find your marketplace ID in Sharetribe Console > Build >
General. Note that the anonymised test file needs to specify your dev
environment marketplace ID and your live data file needs to specify your
live environment marketplace ID.

The id part of the data row 2-tuple is specified as a tuple of 1 to 3
elements. The first element is always an id attribute and identifies the
row type. The second element can be an alias or an import id. A 3
element version has id attr, import id and an alias.

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
be mapped to existing resource ids, because the final resource id is not
created based on the import id. In other words, if e.g. your dev
marketplace already has data rows, you cannot reference those rows by
import ids in the Intermediary file.

If you are not generating data by hand, it is recommended that you use
the 2 element form of the id tuple. This means using unique UUIDs
throughout the file to reference entities. You can read more about
[generating UUIDs for your data here](https://www.uuidgenerator.net/dev-corner).

#### Aliases

If you currently use non-UUID ids in your data, you can also use them to
generate aliases for the data. Aliases must be unique across the file,
and they cannot contain spaces.

Since aliases are namespaced keywords (e.g. `:user/jane` in the
example), the unique part cannot begin with a number. If your unique ids
begin with a number, you can generate the aliases for instance in the
following pattern:

```
// type: 'user', id: 123
alias = (type, id) =>
// returns ':user/u123'
return ':{type}/{type1stletter}{id}'
```

#### Referencing

When you have data that is dependent on each other, such as listings
related to users and reviews related to listings, you can reference the
data within the import file. You can refer to resources by either alias
or UUID with the `#im/ref` tagged element. The supported references for
each type, if any, are listed in the type description in the
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
  keys in Sharetribe as in your current service
- [Reviews](#review)

The migration process has some built-in validation for the types within
an Intermediary file. Optional keys must have non-empty values, and if
an optional key does not have a value, the key must be omitted for that
resource. Empty strings are validated as empty values.

For listings, users, and reviews, the corresponding Sharetribe API
resource reference is linked under their type description. It is good to
note that the shape of the Intermediary data corresponds to the API
reference, however there may be differences in e.g. attribute naming.

#### Listing

Supported fields to migrate:
[API reference listing resource](https://www.sharetribe.com/api-reference/marketplace.html#listing-resource-format).

Required attributes

- `:im.listing/createdAt` ([#inst](#timestamp))
- `:im.listing/title` (string)
- `:im.listing/state`
- accepted values for `:im.listing/state`
  - `:listing.state/published`
  - `:listing.state/closed`
  - `:listing.state/draft`
  - `:listing.state/pendingApproval`

Optional attributes - only include the key if it has a non-empty value

- `:im.listing/description` (string)
- `:im.listing/location` ([#location](#location))
- `:im.listing/price` ([#money](#money))
- `:im.listing/currentStock` (non-negative integer)
- `:im.listing/author` (#im/ref)
- `:im.listing/publicData` (JSON)
- `:im.listing/metadata` (JSON)

Supported references

- `#im.listing/author` -> `#im.user`

Example syntax:

```
[[:im.listing/id #uuid "b074e697-ab0c-4746-a195-c58d73606b1f" :listing/rock-sauna]
         #:im.listing{:createdAt #inst "2018-04-17T06:55:04.291-00:00"
                      :title "A solid rock sauna"
                      :description "A very nice solid rock sauna built solely of wood.\nHere's some more sensible stuff."
                      :state :listing.state/pendingApproval
                      :location #im/location [23.12 21.21]
                      :price #im/money [12.12M "EUR"]
                      :currentStock 5
                      :publicData {:category "rock"
                                   :amenities ["sauna" "pool"]}
                      :author #im/ref :user/john}]
```

#### User

Supported fields to migrate:
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

At the moment, all users created within Sharetribe are defined with both
`:user.role/customer` and `:user.role/provider`. The user roles cannot
be configured after the import, so we recommend that you add both roles
for all users and determine any distinction between user groups in your
client application.

Required attributes for `:im.user`

- `:im.user/primaryEmail`
  - `:im.email/address`
    ([validated](https://www.regular-expressions.info/email.html) email
    string)
  - `:im.email/verified` (boolean)
- `:im.user/role` (array)
- accepted values for `:im.user/role`
  - `:user.role/customer`
  - `:user.role/provider`
- `:im.user/createdAt` ([#inst](#timestamp))
- `:im.user/profile`

Required attributes for `:im.user/profile`

- `:im.userProfile/firstName` (string)
- `:im.userProfile/lastName` (string)

Optional attributes for `:im.user/profile` - only include the key if it
has a non-empty value

- `:im.userProfile/displayName` (string)
- `:im.userProfile/bio` (string)
- `:im.userProfile/publicData` (JSON)
- `:im.userProfile/protectedData` (JSON)
- `:im.userProfile/privateData` (JSON)
- `:im.userProfile/metadata` (JSON)
- `:im.userProfile/avatar` (#im/ref)

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

Required attributes

- `:im.image/url` (URL-encoded string)

Optional attributes - only include the key if it has a non-empty value

- `:im.image/listing` (#im/ref)
- `:im.image/sortOrder` (integer)

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

Required attributes

- `:im.stripeAccount/stripeAccountId` (string)
- `:im.stripeAccount/user`(#im/ref)

Example syntax

```
[[:im.stripeAccount/id]
  #:im.stripeAccount{:stripeAccountId "a_stripe_id"
                    :user #im/ref :user/john}]
```

#### Review

Supported fields to migrate:
[API reference review resource](https://www.sharetribe.com/api-reference/marketplace.html#review-resource-format)

There are two types of reviews: `ofCustomer` and `ofProvider`. They
differ in the reference to listing, as `ofProvider` reviews have a
reference to a listing and `ofCustomer` don't.

Required attributes

- `:im.review/type`
- accepted values for `:im.review/type`
  - `:review.type/ofCustomer`
  - `:review.type/ofProvider`
- `:im.review/state`
- accepted values for `:im.review/state`
  - `:review.state/pending`
  - `:review.state/public`
- `:im.review/rating` (integer between 1-5)
- `:im.review/createdAt` ([#inst](#timestamp))
- `:im.review/author` (#im/ref)
- `:im.review/subject` (#im/ref)
- `:im.review/content` (string)

Optional attributes - only include the key if it has a non-empty value

- `:im.review/listing` (#im/ref)

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

Location is an Intermediary-specific type specified as a 2-tuple of
latitude and longitude. Both latitude and longitude are 32 bit floats.
The `location` attribute is used in the Sharetribe Web Template to
provide listing location coordinates through either Mapbox or Google
maps.

If your source data has addresses specified, and you would like to use
them to determine coordinate information, you can use a 3rd party
geocoding api such as
[Mapbox](https://docs.mapbox.com/api/search/geocoding/) or
[Google](https://developers.google.com/maps/documentation/geocoding/overview)
in your data transformation setup. We recommend that you provide a valid
location attribute if your marketplace uses maps in some way, whether or
not you provide an address attribute in e.g. public data.

```
#:im.listing{...
            :location #im/location [23.12 21.21]
                      ...}
```

#### Money

Money is an Intermediary-specific type and it is defined as [ amount,
currency ]. Note that in the
[Sharetribe API reference for listings](https://www.sharetribe.com/api-reference/marketplace.html#listing-resource-format),
the `money` type differs somewhat from the Intermediary `#im/money` type
– the `#im/money` type uses decimals for the amount whereas the API
`money` type amount is given as an integer representing the currency's
minor unit.

```
#:im.listing{...
            :price #im/money [12.12M "EUR"]
            ...}
```

#### UUID

A
[Universally Unique identifier (UUID)](https://en.wikipedia.org/wiki/Universally_unique_identifier)
can be used to identify resources within the migration file using .edn's
built-in `#uuid` tagged element. If your data already uses UUIDs, make
sure their format matches
[the canonical representation](https://en.wikipedia.org/wiki/Universally_unique_identifier#Format).

```
:im.image/id #uuid "58afd8e1-e336-4ca4-a1e7-ff1d91856a6c"
```

#### Timestamp

Timestamp in .edn is given as an `#inst` tagged element.

```
:createdAt #inst "2018-04-17T06:55:04.291-00:00"
```

## Things to consider

### No updates are supported

The import is loaded only once to the live environment and currently
updates with multiple live data imports are not supported.

### Test import

We can perform multiple imports to the dev environment, with the caveat
that no data deletion in this situation is possible. This might lead to
duplicate information being uploaded to the dev environment.

Also, anonymizing test import data by hiding sensitive information like
names, addresses, email addresses and Stripe keys is highly recommended.

We recommend that you only use a subset of your data for the test
import. The purpose of the test migration is to confirm that your
extract-and-transform process creates a migration file that is valid and
consistent, so there is rarely need for importing the anonymized
equivalent of your full user data into the dev environment.

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
via email. However, for live data with real user information, we will
create a secure upload link that is valid for an agreed amount of time.

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
                      :state :listing.state/pendingApproval
                      :location #im/location [23.12 21.21]
                      :price #im/money [12.12M "EUR"]
                      :currentStock 5
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
