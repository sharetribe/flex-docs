---
title: Introduction to extended data
slug: extended-data-introduction
updated: 2024-11-14
category: concepts-extended-data
ingress:
  Extended data allows you to fully customize the information you want
  to collect about users, listings, and transactions on your
  marketplace.
published: true
---

This article explains the basics of extended data. If you want to get
technical instead, check out the
[Extended data API Reference](/references/extended-data/).

## Why extended data?

Extended data is a Sharetribe feature that allows you to customize your
user, listing, and transaction data. Your marketplace has its own unique
offering and requires specific data that other marketplaces do not.
Maybe you’re building a marketplace for cooking classes and want to ask
chefs how many years of experience they have. Or perhaps you’re building
a summer cottage rental community and want your providers to define the
amenities of their cottage. Extended data gives you the freedom to
determine exactly what information you want your users to provide on
your marketplace and how. However, the possibilities of extended data do
not end there!

Extended data can be customized to different use-cases to fit your exact
needs: in addition to collecting the information you need from your
users in the form you choose, it allows you to display featured
listings, have different user types, build custom search functionality,
and much more.

With extended data, you can build integrations with third-party
services, such as a subscription payment system or SMS notification
software. You can also have extended data that is only revealed at a
specific point in a transaction. Or maybe you want more control over how
search results on your marketplace are prioritized and sorted? For all
these customizations, extended data is your friend.

The possibilities you have with extended data are vast. In the next
section, we’ll discuss each type of extended data in more detail and
offer examples of what they can be used for.

## Types of extended data

There are six possible types of extended data, defined by who can edit
and view them. Five out of these are available in Sharetribe at this
time. They are _public data_, _protected data_, and _private data_, as
well as _public metadata_ and _protected metadata_.

In the following sections, “author” means the user who created the
listing or profile in question. “Operator” refers to both the
marketplace owner and the Integration API. The marketplace operators and
the Integration API have access to view and edit all of the data types.

### Access to edit

Extended _data_ can be written and edited by listing or user profile
authors in your frontend application. _Metadata_ can be written and
edited only by marketplace operators.

### Access to view

Public data and public metadata can be viewed by everyone with access to
your marketplace. Protected data is private by default, but can be
viewed at a certain point during a transaction process by members of
that transaction. Protected metadata is visible to the participants of
the transaction. Private data can only be viewed by the listing or user
profile authors themselves.

We can also organize the data types by placing them in a table.

|           | Data                                                     | Metadata                                         |
| :-------- | :------------------------------------------------------- | :----------------------------------------------- |
| Public    | editing: author, operator – viewing: all users           | editing: operator – viewing: all users           |
| Protected | editing: author, operator – viewing: transaction members | editing: operator – viewing: transaction members |
| Private   | editing: author, operator – viewing: author, operator    | not available                                    |

In order to determine what type of extended data you want to collect on
your marketplace, you need to answer the following questions:

- What information do you want to collect about your users and listings
  and during transactions?
- Who can write and edit that information?
- What information do you want to display and to whom?

In the next section, we’ll explore how different types of extended data
are shown on your marketplace and Console and offer examples of the
possibilities the different types of extended data provide.

## Using extended data

### 1. Public data

Public data is information that is visible to all users of your
marketplace and can be written and edited by listing authors or user
profile owners. It can help your customers make purchasing decisions,
let your customers know important details about your sellers, or be used
as search filters and parameters and to sort search results. Public data
allows you to customize your public listing and user information to fit
your needs exactly!

Let’s look at listing public data in action. Here is a listing from an
imaginary bike rental marketplace, Biketribe.

<publicextendeddatacarousel title="Examples of public extended data">

</publicextendeddatacarousel>

Further public data you might want to collect could be website links or
relevant social media handles in user profiles. Public data can be any
type of information you believe will be important for your buyers to
have or your sellers to share to get the most out of your marketplace.

### 2. Protected data

Protected data is information that can be revealed at specific points of
the transaction process. It can only be seen by the parties taking part
in the transaction, meaning the provider, customer, and the marketplace
operator. After a cooking class booking is confirmed, you might want to
request the customer to provide information on any dietary restrictions.
Or maybe you only want to reveal a provider's phone number or address
after payment has been confirmed to guarantee your users do not bypass
your payment system. These cases can be handled with protected data.

Other examples of protected data could be a link to the provider’s Zoom
page or a link to download a digital file the buyer has purchased. Or
maybe your marketplace is for car rentals, and you want the customer to
provide photos of the rented vehicle before and after the rental period.
All these and more can all be included as protected data.

### 3. Private data

Private data can only be edited and viewed by those who created the
listing or user profile in question and marketplace operators. It is
similar to protected data but is not intended to be revealed during the
transaction process. Private data can be used to collect and store
information about users or listings that is important for marketplace
operators but does not need to or should not be revealed to other users.

Private data is especially useful in third-party integrations. You can
store an ID from an external service to user or listing private data and
connect it to services such as SMS notifications with Twilio or sync the
provider’s schedule with Google Calendar!

As a further example – even though you may not want your customers and
providers to be able to contact each other outside of your platform, you
might still want to be able to call them yourself. A user’s phone number
can be saved in their private data for these situations.

Private data can also be used if you want the provider to give specific
information for your listing approval process. Maybe you run a
marketplace for graphic designers and want to verify their experience
with past employers or check their portfolio before publishing a
listing. Contact details of previous employers and links to online
portfolios could be included as private data.

### 4. Public metadata

Public metadata is visible to all users, but only the operator and the
Integration API can edit it.

Typical use-cases for metadata are featured listings or premium users.
You may want to curate listings that get this extra visibility yourself
or offer it as a paid service, so using public data, which the users can
edit themselves, is not an option. This is where metadata comes into
play. Like public data, public metadata can be used as search filters
and parameters and in sorting search results.

In addition to featured listings, other ways to use public metadata
could be to distinguish verified users from regular ones or highlight
Gold members who are part of your highest subscription tier. Maybe you
want to waive the marketplace commission for them. Based on the user’s
subscription information saved in their metadata, you can trigger a
transaction process with or without a commission fee. Or maybe you want
to establish one-time payments for users to get to promote their
listings on your landing page: data of such payments can be saved in
public metadata. You can use this metadata to always display featured
listings first in relevant search results, for example.

### 5. Protected metadata

Transactions can also have metadata. It can only be seen by the
transaction members as it is tied to the transaction. An example of
transaction metadata could be a unique Zoom link to where an online
service will take place.

This metadata can be written into the transaction by the Integration API
at a specific point of the transaction, or it can be added in Console by
the operator. You can also configure the transaction process to update
transaction metadata.

## Getting started with extended data

Extended data is a powerful feature that allows you to customize your
marketplace’s offering, whether services, rentals, or products, to your
exact needs. It helps you collect the information you require from your
users and enables additional functionality together with the transaction
process and through the Integration API. Extended data also plays a
vital role in search result sorting and filtering.

To get started with extended data, you should decide what information
you want to collect about your users and listings or what is important
for users to know during transactions. Next, you should think about who
has access to edit that information. Finally, you should consider
whether you want to display this information to everyone, select users,
or just to yourself. Through extended data, Sharetribe can support a
multitude of different kinds of listings, monetization models, user
profiles, and so on. You can create the exact data structure you need
for your marketplace.
