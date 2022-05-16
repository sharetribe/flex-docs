---
title: Users in Flex
slug: users-in-flex
updated: 2022-05-16
category: concepts-users-and-authentication
ingress: This article explains how users are managed in Flex.
published: true
---

Anyone who registers to your Flex marketplace is referred to as a user.
In addition, the operator can take certain actions on the marketplace
even though they are not technically a user there. Flex marketplaces
only facilitate transactions between registered users – in other words,
it is not possible for someone to purchase or book a listing without
signing up as a user.

## User roles in Flex

Flex has two possible roles for a registered user: customer and
provider. All users can be both customers and providers by default. This
means that even if a person has created a listing, which means they can
be a provider, they can also be a customer on someone else's listing.

If you want to limit certain users to only customers or only providers,
you will need to create those limitations in your client application.
You can use [extended data](/concepts/extended-data-introduction/) to
determine that a user is in a certain group, and then allow a subset of
your marketplace functionalities, e.g. listing creation, for a specified
group.

### Customer

In a transaction, a **customer** is the user who purchases or books the
listing. In marketplaces with payments, the customer is the user who
pays the listing price. Customers can save their payment details in
Flex.

Customers need to enter a valid email address to sign up to Flex, but
other than that customers are not required to enter further information
to use the marketplace. When using the Stripe default payment
integration, customers can save a payment method, however the payment
method information is saved in Stripe and not directly in Flex.

Within a transaction, customers can initiate or transition transactions
specified for the customer.

### Provider

When a user creates a listing and someone else books or purchases that
listing, the user becomes the **provider** of the transaction in
question. In marketplaces with payments, the provider is the transaction
party who receives the listing price.

This means that if the payment happens within the marketplace, the
provider will need to verify their identity to the payment gateway to
adhere to the payment processor's
[Know Your Customer requirements](https://en.wikipedia.org/wiki/Know_your_customer).

Within a transaction, providers can initiate or transition transactions
specified for the provider.

### Transaction related roles: operator and system

A **marketplace operator** is not a user in the marketplace – they
cannot sign in to the marketplace with the same credentials they use to
sign in to Flex Console. The operator can, however, take actions on the
marketplace through Flex Console or Integration API, when those actions
are defined for the operator. Operators cannot participate in the
messaging between customer and provider within the transaction.

A transaction transition is performed by the **system** if it is
scheduled to happen automatically.

## User access

Flex marketplace listings can be viewed by anyone by default, whether
they are registered users or not. If a user wants to start a transaction
or create a listing, they need to be registered to Flex.

### Registered marketplace users

Listings can only be updated by their author, i.e. the registered user
who originally created the listing. Operators can create listings for a
registered user, and update existing listings.

Beyond that, Flex does not have different levels of user access within
the marketplace. Operators who want to create more complex user
hierarchies will need to think about the levels of user access they want
each custom role to have and potentially use a custom backend solution
to complement Flex default user management. If you are contemplating
creating a user hierarchy in your Flex marketplace, contact
[Flex Support](mailto:flex-support@sharetribe.com) and let us know your
use case – we're happy to help you figure out a suitable solution!

### Login as user

Flex has a feature through which operators can log in to their
marketplace as a registered user and take limited actions on their
behalf. When using the Login as user feature, operators cannot initiate
or transition transactions or modify the user's payout information.
However, they can e.g. create and update listings on behalf of the user.

### Integration API

Flex Integration API allows trusted secure applications to access all
data within a marketplace. It is not accessible for marketplace users
with their own sign-in credentials. Instead, Integration API can be used
to create server-side integrations to external systems or retrieve data
for custom marketplace dashboards.

### Authenticating to Flex APIs

Flex marketplace users need to sign up with their email address to
create listings and participate in transactions. Alternatively, they can
use
[social logins](https://www.sharetribe.com/docs/concepts/social-logins-and-sso/)
to sign up, or to login with an email address that already has a user
within Flex.

Flex has a separate
[Authentication API](https://www.sharetribe.com/docs/concepts/authentication-api/)
that handles authentication to other Flex APIs. Both Marketplace API and
Integration API require valid access tokens to be passed in every API
request. If you use the
[Javascript SDKs](https://www.sharetribe.com/docs/concepts/js-sdk/) in
your marketplace client application, they handle authenticating the user
automatically when they enter their credentials.

## Banned and deleted users

When a user is banned or deleted, they can no longer take action on the
marketplace.

### Banned user

Banning a user means removing the user and all of the user’s listings
from a marketplace due to inappropriate behaviour. The email with which
a banned user registered to the marketplace can not be used to create
new accounts. The user data is only visible when it is linked to, and
even then only ID and banned status are shown.

Operators can ban and unban users through Flex Console, but there is no
endpoint in the Flex APIs to ban a user.

### Deleted user

Deleting a user means completely and irreversibly removing all of the
user's personal data. This includes all of the public-facing data like
profile and listings as well as the user account information.

Operators can delete users through Flex Console. In addition, there is
an endpoint in Marketplace API so that operators can build a
functionality for users to delete their own accounts. We have a how-to
guide on
[implementing a _Delete user_ feature](/how-to/implement-delete-user/).

- API and authentication (what can you see through the API with
  different levels of authentication)
- Introduce how authentication works and link to
  https://www.sharetribe.com/docs/concepts/authentication-api/#authentication-api
