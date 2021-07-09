---
title: Migrating from outside Sharetribe ecosystem
slug: migrating-from-outside-sharetribe
updated: 2021-07-09
category: operator-guides
ingress: How to import data from outside Sharetribe ecosystem
published: true
---

An existing marketplace data can be migrated to Sharetribe Flex. If your
marketplace is running in Sharetribe Go, there is a ready migration path
that will be handled by us. We will handle the migration in this case
and you can find the outline for this process
[here](https://www.sharetribe.com/docs/operator-guides/go-to-flex-migration/).

If you are running a marketplace outside the Sharetribe ecosystem, and
would like to import data to Flex, it is possible by encoding your data
into a data format called Intermediary. This article will outline how
you can encode data into Intermediary format, give you a syntax example
of Intermediary file and provide instructions on the migration process.

The tooling for these migrations is still in it's infancy and will
require some technical knowledge and a lot's of patience.

## Intermediary data

Intermediary is an edn (https://github.com/edn-format/edn) data format
that allows defining data rows for marketplaces. It supports creating
links between rows via references.

### Format

Intermediary is specified as
[a map](https://clojure.org/reference/data_structures#Maps) with the
following keys:

- :ident - identifies the target marketplace by marketplace ident,
- :data - a seq of marketplace data rows. Each row is a 2-tuple of id
  and content.

The id part of row 2-tuple is specified as a tuple of 1 to 3 elements.
The first element is always an id attr and identifies the row type. The
second element can be an alias or an import id. A 3 element version has
id attr, import id and an alias.

Import ids can be given to rows and they should be unique for the
marketplace and they are of type UUID. Aliases can be used to reference
rows from other rows. Aliases are useful when the data is written by
hand. Import ids are useful for both upsert and programmatically
generated / exported data. Content part of row 2-tuple is a map that is
processed by tuple expansion function registered for the content type.

If you are not generating data by hand, it is highly recommended that
you use the 2 element form of the id tuple. This means that you don't
use aliases but unique uuid's throughout the file to reference entities.

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

- Users
- Listings
- Profile images
- Listing images
- Stripe accounts - You need to use the same Stripe keys in Flex as in
  your current service
- Reviews
- Supported references between the different types are:

```
- #im.userProfile/avatar -> #im.image
- #im.image/listing -> #im.listing
- #im.listing/author -> #im.user
- #im.review/listing -> #im.listing
- #im.review/author -> #im.user
- #im.review/subject -> #im.user
```

The attributes that are supported for each resource are described in the
Flex API documentation.

For example, for the User resource, the supported fields can be found
here: https://flex-api-docs-preview.sharetribe.com/#current-user. This
means that importing extended data is also supported if it's listed
under the resource attributes.

Inside the user resource, the email resource differs a bit from the
documentation. The email resource is referenced under :primaryEmail key
like this:

```
:primaryEmail {:im.email/address "foo@sharetribe.com"
               :im.email/verified true}
```

## Things to consider

### No updates are supported

The import is run only once to the production environment and currently
updates with multiple imports are not supported.

### Test import

We can perform multiple imports to test environment, with the caveat
that no data deletion in this situation is possible. This might lead to
double information being uploaded to the test site.

Also, anonymizing test import data by hiding sensitive information like
names, addresses, email addresses and stripe keys is highly recommended.

### Password management

Importing passwords from outside the Sharetribe ecosystem is not
supported. This means that your users will be logged out of the service
and are required to use the recover password functionality to gain
access.

### Security and sharing data

Since you will be sharing user information about your service to ours,
we will be giving you instructions on how to share the data securely.
Contact us when you are ready to share the data.

### Image urls

Image urls need to be public and properly encoded URLs, so that we can
access the imported images while importing the data.

### Reviews

There are two types of reviews: ofCustomer and ofProvider. They differ
in the reference to listing as ofProvider reviews have a reference to a
listing and ofCustomer don't.

## An example of Intermediary format

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
