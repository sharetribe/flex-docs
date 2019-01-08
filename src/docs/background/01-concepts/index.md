---
title: Concepts
slug: concepts
date: 2019-01-08
category: background
ingress: 'The main concepts of the Flex'
private: false
---

## Domain concepts

The key concepts in the Sharetribe Flex marketplace domain.

##### Marketplace

A platform that connects providers and customers. Marketplace is the
primary scope for all data like users, listings, orders, etc.

##### User

A User is any registered user of a marketplace.

##### Provider (seller)

Provider is a User that is allowed to post a listing and/or has posted at least
one listing to the marketplace.

##### Customer (buyer)

Customer is any registered User of the marketplace. Providers are always also
customers.

##### Profile

The public facing information of a User. This can include things like avatar,
bio, link to a webpage, reviews, and contact address.

##### Operator / Admin

Marketplace operator account that allows access to Console for the marketplace.
This account is not a marketplace User and cannot be used to log in to the
actual marketplace.

##### Account

Account is the technical identification information of a User that
allow her to access a marketplace.

##### Role

A role is a set of permissions that govern what a User is allowed to do in the
marketplace.

##### Listing

A listing is a description of a service that a provider provides in the
marketplace. The provider of a listing is called the author of that listing.

##### Review

A review is a description of an experience the customer had with the
provider or a description of an experience that the provider had with
the customer. A review includes a free text description and a numeric
rating between 0-5.

##### Transaction

Transaction is an instance of the process where the customer and the
provider exchange value. Transaction has a predefined set of states
and transitions between the states defined by the Transaction process.

##### Transaction process

Transaction process is the definition of the process where the
customer and the provider exchange value. It defines the states and
transitions between the states that a transaction can take. It also
defines the actions, such as creating a payment, reserving a time slot
or sending out a notification email, that happen as part of the
transitions.

##### Payment

Payment is the transfer of money from one party to another party (customer to
provider, provider to marketplace admin, etc.)

##### Payin

Payin is the amount of money that is paid by the customer.

##### Payout

Payout is the amount of money that is moved to the provider.

##### Delayed Payout

Delayed payout is a payment that is scheduled but not yet transferred
to the provider.

##### Commission

Commission is the amount that the marketplace charges from payments going
through it. Commissions can be charged from providers, customer or both.

##### Booking

Reservation of a listing at a specific time.

##### Availability Calendar

Description of the availability of a listing.

##### Notification

Notification means contacting User about an event of interest at the
marketplace, such as payment received, message received,
etc. Notifications are delivered via email.

##### Message

A message is a free form text attached to a transaction. Messages are
exchanged between the customer and the provider in the transaction.

##### Extended data

Extended data is a set of key-value pairs that can be attached to marketplace
objects, such as users, listings and transactions. It can be used out of the box
without prior configuration or schema definition.

##### Extended data schema

Schema can be optionally defined for some types of extended data
keys. When schema is defined, it can be used to make extended data
values queriable via the Marketplace API.

##### Draft listing

A listing that is created but not yet published. It is visible to the
author and to the marketplace operators but not discoverable by any
public API endpoints.

##### Listing pending approval

A listing that has been created by its author when the marketplace
requires listing approvals. It is visible only to its author or
marketplace operator, but not discoverable by any public API
endpoints.

##### Published Listing

A listing that is discoverable via public listing queries and search
API endpoints. If the marketplace requires listing approvals, the
listing is published only after it is approved by an operator.

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

Banning a User means removing the user and all of user’s listings from
marketplace because of bad behaviour. The email of banned user is no longer
available for new accounts. The user data is not returned from APIs, except when
it’s a linked resource (only id + banned status).

##### Deleted User

Deleting a User means completely removing all the personal data of the
User.

## Application concepts

Applications and services that are part of the Flex offering.

##### Flex Template for Web

A Node.js + React/Redux based universal app that implements a marketplace UI
backed by the Marketplace API. Intended to be customized per marketplace by the
marketplace builders.

For more information, see the [FTW documentation](/references/ftw/).

##### Marketplace API

API for marketplace applications. Supports e.g. authoring and
discovering content, managing user accounts, and the purchasing flow.

For more information, see the [API reference documentation](/references/api/).

##### Console

A UI for administrators to build, run and track their marketplaces.

##### Admin API

An API for accessing admin functionality intended for integrations and custom
Admin applications. Planned.

##### Webhooks

A way to get notified about events of interest in the marketplace for
external applications. In practice it’s JSON messages delivered via
HTTPS to admin defined endpoints. Planned.

##### Integration

An external application that reacts to marketplace events, and/or
calls APIs to read and/or write marketplace data. For example
“automatically update a Mailchimp email list when a new user joins”.

##### Sharetribe Flex

An umbrella name for the Sharetribe Flex offering.

##### Sharetribe SDK for JavaScript

A JavaScript library that makes it easy to correctly interact with the
Sharetribe Marketplace API (and later Admin APIs).

For more information, see the [JS SDK documentation](/references/js-sdk/).

