---
title: User extended data
slug: user-extended-data
updated: 2022-09-29
category: concepts-extended-data
ingress:
  User extended data allows you to distinguish between different types
  of users, such as customer and providers or regular and verified
  providers, as well as share sensitive information to a transaction
  counterparty.
published: true
---

User profiles have all four extended data types – public data, protected
data, private data, and public metadata. A user's extended data is
nested in the user's _profile_ attribute, not a direct attribute of the
user resource.

## Viewing and modifying user extended data

User public and metadata are visible through the
[users/show](https://www.sharetribe.com/api-reference/marketplace.html#show-user)
endpoint in Marketplace API. In addition, the authenticated user can
view their own extended data through the
[current_user/show](https://www.sharetribe.com/api-reference/marketplace.html#show-current-user)
endpoint. Operators can see all user extended data through the
[user retrieval endpoints](https://www.sharetribe.com/api-reference/integration.html#users)
in Integration API.

Authenticated users are able to modify their own public, protected and
private extended data through the
[current user creation and update endpoints](https://www.sharetribe.com/api-reference/marketplace.html#current-user)
in Marketplace API. Operators can modify all user extended data using
the
[users/update_profile](https://www.sharetribe.com/api-reference/integration.html#update-user-profile)
in Integration API.

## Types of users

By default, Flex marketplace users have the capabilities to be both
providers and customers. However, you may want to limit those
capabilities, for instance by only allowing verified marketplace users
to create listings. Or you may want to have a three-way marketplace
where only one type of participant can be in several roles – yoga
teachers may want to hire spaces from venues as customers and then offer
their events as providers. You can achieve these types of distinctions
by setting specific attributes in your users' extended data and allowing
them access to certain parts of the marketplace based on those
attributes.

You can also implement different tiers of providers, where for example a
regular (non-paid) provider is allowed to publish one listing and a
premium (paid) provider is allowed to publish three. These types of
attributes will need to be set to the user's metadata, so that only
operators can modify their provider tier.

## Revealing information within the transaction

User extended data can also be used for sensitive information that the
transaction participants may want to only reveal to the other
participant of the transaction. This type of information can include
contact information such as phone numbers, or e.g. instructions to
access a listing's goods or services in some other way.

As a part of your marketplace's transaction process, then, you can have
an action that reveals the user's protected data in the transaction. In
other words, the revealed protected data becomes also available in the
transaction's protected data, and can be shown to either one of the
transaction participants.

## User filtering in Integration API

The Marketplace API does not have an endpoint for querying users.
However, when you are building an integration or creating analytics, you
can use the
[user query endpoint in Integration API](https://www.sharetribe.com/api-reference/integration.html#query-users).

To facilitate user querying, it is possible to filter users also by
extended data when calling the endpoint. That way, you can segment your
users by important attributes for more fine-grained processing. To
filter users by extended data, you will need to
[create a search schema](/how-to/manage-search-schemas-with-flex-cli/)
for the user profile.
