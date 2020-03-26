---
title: Concepts
slug: concepts
updated: 2019-11-21
category: background
ingress:
  Explanation of the key concepts we use when we talk about Sharetribe
  Flex. The concepts are used in the API and throughout the
  documentation.
published: true
---

## Application concepts

Description of the applications and services that are included in the
Flex offering.

### Console

The user interface admins use to build their marketplace platform.
Console is also where the day-to-day management, such as overseeing
users’ activity, monitoring listings and reviews, and managing
notifications, takes place.

### Flex Templates for Web (FTW)

A template of a Flex marketplace user interface. Sharetribe customers
can customize FTW for their own marketplace, or build their own UI from
scratch. Flex Template for Web is built with Node.js + React/Redux.

Currently we have two different template options:

- [FTW-daily](https://github.com/sharetribe/ftw-daily) "Saunatime" - a
  rental marketplace with day-based bookings
- [FTW-hourly](https://github.com/sharetribe/ftw-hourly) "Yogatime" - a
  service marketplace with time-based bookings

Information about using Flex Template for Web can be found in the
[Getting started with FTW](/tutorials/getting-started-with-ftw/)
tutorial.

### Flex CLI

Flex CLI (Command-line interface) is a tool for changing your
marketplace's advanced configurations such as transaction processes and
email templates.

See the
[Getting started with Flex CLI](/flex-cli/getting-started-with-flex-cli/)
tutorial for more information.

### Marketplace API

The application programming interface (API) that provides the crucial
features marketplaces need. For example, the Marketplace API allows
creating and searching content (like user profiles and listings),
managing user accounts, and processing transactions.

Sharetribe customers can create their own web-based and mobile UIs on
top of the Marketplace API.

Information about working with the Marketplace API can be found in the
[API reference documentation](/references/api/).

### Integration API

The application programming interface (API) that provides full access to
marketplace's data. It can be used to build applications that integrate
different own or 3rd party systems with the Flex marketplace.

### Integration

An external application that communicates with the marketplace
(typically via the [Integration API](#integration-api)). This can mean
reacting to marketplace events, pulling data from the marketplace, or
triggering activity on the marketplace. For example, “automatically
update a Mailchimp email list when a new user joins the marketplace”.

### Sharetribe Flex

An umbrella name for the entire Sharetribe Flex offering that today
consists of the Marketplace API, Console, Flex Template for Web, and the
documentation.

### Sharetribe SDK for JavaScript

A JavaScript library that makes it easy to correctly interact with the
Marketplace API.

Information about using the JS SDK library can be found in the
[JS SDK documentation](/references/js-sdk/).

### Sharetribe Integration SDK for JavaScript

A JavaScript library that makes it easy to correctly interact with the
Integration API.

Information about using the JS SDK library can be found in the
[JS SDK documentation](/references/js-sdk/).

### Webhooks

A way to send automatic and/or manual messages to external applications
(like email or SMS) to users when something important happens on the
marketplace. In practice, this is done with JSON messages that are
delivered via HTTPS to the endpoints the admin chooses.

Planned.

## Marketplace concepts

The key concepts in the Sharetribe Flex marketplace domain.

### Account

The technical identification information of a user. Users can register
to a marketplace by creating an account.

### Admin/Operator

A marketplace operator account allows access to Console, where the
day-to-day management of the marketplace takes place. The admin is not a
marketplace user, so this account can't be used to log in to the actual
marketplace.

### Availability plan & availability exception

An availability plan is a recurring plan for the dates and times when a
listing is available. For example, a provider can mark their listing to
be available by default on weekdays (Mon–Fri) from 8am to 8pm, and
unavailable during night time and on weekends.

An availability exception is a deviation from the availability plan. For
example, the provider can make an exception and also mark selected
Fridays unavailable, or make certain weekends available for overnight
bookings.

### Banned User

Banning a user means removing the user and all of the user’s listings
from a marketplace due to inappropriate behaviour. The email with which
a banned user registered to the marketplace can't be used to create new
accounts. The user data is only visible when it’s linked to (only ID +
banned status are shown).

### Booking

A reservation of a listing for a specific time.

### Closed Listing

A published listing can be closed by its author or the marketplace
admin. Closed listings are not returned in search results or public
listing queries. This doesn't mean the listings are deleted: they can
still be accessed as own listings or with a direct URL.

The motivation for closing a listing is not to delete it, but to
(temporarily) stop advertising it. A closed listing can be opened, which
makes it published again.

### Commission

The amount of money that a marketplace charges from payments going
through it. Commissions can be charged from providers, customers, or
both.

### Customer (buyer)

A user who registers to a marketplace to make purchases. In general, any
registered marketplace user can make purchases on the platform. So, all
users are always (potential) customers – including the providers.

We use the term “customer” instead of “buyer” because marketplace
platforms can be used for much more than buying and selling products.

### Delayed Payout

A payment that a customer has made but that hasn't been transferred to
the provider yet.

### Deleted Listing

Deleted listings are completely removed. They are only visible if they
are linked to from a transaction. In that case, only the listing ID and
the deleted status are shown, the listing’s information is not visible.

### Deleted User

Deleting a user means completely removing all of the user's personal
data. This includes all of the public-facing data like profile and
listings as well as the user account information.

### Draft listing

A listing that is created but not yet published. A draft listing is
visible to the author and to the marketplace admin but not discoverable
by any public API endpoints.

### Extended data

Additional data that can be attached to marketplace objects. Extended
data is available out of the box and can be written and read via the
Marketplace API without any prior configuration. There are different
types of extended data available (e.g., public, protected, or private).

In practice, extended data allows a marketplace operator to decide, for
example, how much and what kind of information they want their users to
fill in to their profiles. Extended data can also be attached to
listings and transactions.

### Extended data search schema

It's possible to define search schemas for some extended data types.
Defining a schema allows that data type to be indexed so that search
queries can be made for that data.

### Listing

A description of a product or a service that a provider is offering on
the marketplace. The provider of a listing is called the author of that
listing.

### Listing pending approval

Marketplaces can require all listings to be approved before they are
published on the marketplace. A listing that is pending approval is
visible only to its author and the marketplace admin, but not
discoverable by any public API endpoints.

### Marketplace

A platform that connects providers and customers. The marketplace is the
primary scope for all data, such as users, listings, orders, and so on.

### Message

Free form text attached to a transaction. Messages are exchanged between
a customer and a provider when they engage in a transaction.

### Notification

A message that a user gets when something important happens on the
marketplace (e.g., the user has received a message or a payment on the
platform). Notifications are delivered via email.

### Payin

The amount of money paid by the customer.

### Payment

The transfer of money from one party to another (customer to provider,
provider to marketplace admin, etc.)

### Payout

The amount of money that is moved to the provider.

Typically, marketplaces take a commission from each payment. This means
that often, the payin from a customer is a larger sum than the payout to
a provider.

### Profile

The public-facing information of a user. Profiles can include things
like avatar, bio, link to a webpage, reviews, and contact address.

### Provider (seller)

A user who sells or rents their products or services on a marketplace.
Providers can post listings to the marketplace.

We use the term “provider” instead of “seller” because marketplace
platforms can be used for much more than buying and selling products.

### Published Listing

A listing that all registered users on the marketplace can see in search
results or public listing queries.

### Review

After a customer and a provider have engaged in a transaction, they are
asked to describe how the experience with the other party was. This
description is called a review. A review includes a free text
description and a numeric rating between 0-5.

### Role

Determines what a user is able to do on a marketplace. For example,
“Admin” and “Provider” are roles on a marketplace.

### Time slot

A day or a time range when a listing is available for booking (taking
into account the listing's availability plan, availability exceptions,
and existing bookings).

### Transaction

The process of providing the product or service that is listed on a
marketplace. Transactions have a predefined set of states and
transitions between states, which are defined in the transaction
process.

### Transaction process

The process where a customer and a provider exchange value.

The transaction process begins with the first interaction the customer
and provider have with each other. It defines the states and transitions
between the states that a transaction can take. It also defines the
actions that happen as part of the transitions. Examples of actions are
creating a payment, reserving a time slot, or publishing reviews.

### User

Anyone who registers to a marketplace is referred to as a user.
