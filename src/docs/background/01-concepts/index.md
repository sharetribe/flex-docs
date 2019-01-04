---
title: Concepts
slug: concepts
date: 2019-01-04
category: background
ingress: 'TODO: ingress'
---

## Domain concepts

TODO: domain concepts description

##### Marketplace

Arena that connects providers and customers. Marketplace is the primary scope
for all data like users, listings, orders, etc.

##### Operator

The Sharetribe customer. A ‘superadmin’ account that has full access to the
console for the marketplace, as well as to the billing & other information for
the Sharetribe account.

##### Admin

Marketplace operator Account that allows access to console for the marketplace.
This account is not a marketplace User and cannot be used to log in to the
actual marketplace.

##### Provider (seller)

Provider is a User that is allowed to post a listing and/or has posted at least
one listing to the marketplace.

##### Customer (buyer)

Customer is any registered User of the marketplace. Providers are always also
customers.

##### Profile

The public facing information of a User. This can include things like avatar,
bio, link to a webpage, reviews, and contact address.

##### Storefront

A provider profile is called storefront when it describes an entity (store,
studio, etc.) instead of the single person.

##### User

A User is any registered user of a marketplace.

##### Account

Account is the technical identification information of a User that allow her
access to the marketplace.

##### Role

A role is a set of permissions that govern what a User is allowed to do in the
marketplace.

##### Listing

A listing is a description of a service that a provider provides in the
marketplace. The provider of a listing is called the author of that listing.

##### Need

A thing that a customer wants or requests in the marketplace.

##### Listing collection

A collection of listings that is managed by the marketplace admin. A collection
can be either a manually managed or an automatic one (e.g. 50 latest listings).
A listing collection is useful when implementing things like landing pages and
wanting to show featured listings.

##### Review

A review is a description of the level of service a customer got from a provider
and provider got from customer. It can take many forms like textual description,
a star rating or a combination of those.

##### Transaction

Transaction is the process of providing a service described by a listing.
Transaction has a predefined set of states. Transactions don’t always lead to
completed orders.

##### Order

Order is a transaction where participants have an intention to exchange value
(i.e. not just a conversation).

##### Payment

Payment is the transfer of money from one party to another party (customer to
provider, provider to marketplace admin, etc.)

##### Payin

Payin is the amount of money that is paid by the customer.

##### Payout

Payout is the amount of money that is moved to the receiver.

##### Delayed Payout

Delayed payout is a payment that is paid but not yet transferred to final
receiver.

##### Commission

Commission is the amount that the marketplace charges from payments going
through it. Commissions can be charged from providers, customer or both.

##### Booking

Reservation of a bookable listing at a specific time.

##### Availability Calendar

Description of the availability of a bookable listing.

##### Notification

Notification means contacting User about an event of interest at the
marketplace, such as payment received, message received, etc. Notifications can
be delivered via email, SMS, via Inbox, etc.

##### Message

A message is a free form text attached to a transaction.

##### Inbox

Inbox is a place where User can see all notifications she has received.

##### Extended data

Extended data is a set of key value pairs that can be attached to marketplace
objects, such as users, listings and transactions. It can be used out of the box
without prior configuration or schema definition.

##### Extended data schema

Schema can be optionally defined for some extended data keys. When schema is
defined, it can be used to index extended data properly and make those keys
queriable via the API.

##### Category

Category is a hierarchy for classifying listings in marketplace.

##### Tag

Tag is a keyword that can be attached to marketplace objects (users, listings,
transactions) for building ad hoc hierarchies and/or classifying objects. Tags
can be indexed and searched by.

##### Declining

A provider declining a request to buy/book a listing. This doesn’t require a
refund but only voiding a preauthorization of a payment.

##### Cancelling

Cancel can mean multiple things: provider or customer cancelling after an order
has been paid, or customer cancelling before the provider has accepted.

##### Listing pending approval

A listing that has been created by its author when the marketplace requires
listing approvals. It is visible only to its author or marketplace operator, but
not discoverable by any public API endpoints.

##### Published Listing

A listing that is discoverable via public listing queries and search API
endpoints. If the marketplace requires listing approvals, the listing is
published only after it is approved by an operator.

##### Closed Listing

A published listing can be closed by its author or a marketplace operator.
Closed listings are not returned in search results or public listing queries but
they can still be accessed as own listings or with a direct url. The intention
of closing a listing is not to delete it but to stop advertising it. A closed
listing can be opened, which makes them published again.

##### Deleted Listing

When listing is deleted the intention is to completely remove it. It’s no longer
returned from any API endpoints except when the listing is linked from some
other resource (transaction). In that case listing’s info is not shown, only
id + deleted status.

##### Banned User

Banning a user means removing the user and all of user’s listings from
marketplace because of bad behaviour. The email of banned user is no longer
available for new accounts. The user data is not returned from APIs, except when
it’s a linked resource (only id + banned status).

## Application concepts

TODO: application concepts description

##### Template app

A Node.js + React/Redux based universal app that implements a marketplace UI
backed by the Marketplace API. Intended to be customized per marketplace by the
customers themselves.

For more information, see the [FTW documentation](/references/ftw/).

##### Marketplace API

API for marketplace applications. Supports authoring and discovering content,
managing user accounts, and the purchasing flow.

For more information, see the [API reference documentation](/references/api/).

##### Console

A UI for administrators to build, run and track their marketplaces.

##### Admin API

An API for accessing admin functionality intended for integrations and custom
Admin applications. Planned in the long term.

##### Webhooks

A way to get notified about events of interest in the marketplace for external
applications. In practice it’s JSON messages delivered via HTTPS to admin
defined endpoints.

##### Integration

An external application that reacts to marketplace events, and/or calls APIs to
pull marketplace data and cause effects in marketplace. For example
“automatically update a Mailchimp email list when new user joins”.

##### Sharetribe custom core

A set of services that together provide the marketplace API, the Console, the
Admin API and webhooks functionalities.

##### Sharetribe custom

Internal name for the whole offering consisting of starter app, core, marketing
site, documentation, etc.

##### Sharetribe SDK

A library that makes it easy to correctly interact with the Sharetribe
Marketplace API (and later Admin APIs).

##### Sharetribe SDK for JavaScript

A JavaScript implementation of the Sharetribe SDK.library that makes it easy to
correctly interact with the Sharetribe Marketplace API (and later Admin APIs).

For more information, see the [JS SDK documentation](/references/js-sdk/).
