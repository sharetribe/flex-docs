---
title: What are listing types settings
slug: what-are-listing-types
updated: 2023-09-24
category: operator-guides-listings
ingress:
  Understand the settings and options when creating a Listing type.
published: true
---

Your Listing types determine what kind of listings are created on your
marketplace and how customers interact with them. You must have at least
one Listing type enabled in your marketplace to determine how
transactions work. You may setup multiple Listing types (up to 20) if
there should be different types of transactions on your marketplace.

## Listing type settings

These are two fields that define the Listing type, one outward facing;
the Title, and the other internal; the ID.

- Listing type title: the name of the Listing type. It is shown to your
  users on your marketplace, like when a seller is picking the listing
  type during listing creation. Therefore, use a title that describes
  what should happen with this listing, such as "Daily rental" or
  "Product sale."

- Listing type ID: the unique identifier for this Listing type. It
  distinguishes this Listing type from others. It is not shown to your
  users. This ID is saved along with listing data and displayed or used
  to display data to the Admin or to help developers organize code when
  creating custom functionalities.

## Transaction settings

Transaction settings define several important aspects of how your
marketplace works. They impact what information providers must fill out
when creating their listing. They also impact how buyers initiate a
transaction on the listing page. Finally, transaction settings determine
how a transaction happens between a buyer and provider, including
payment, payout, and reviews.

You have three transaction settings available by default: Calendar
booking; Buying and selling products; and Free messaging.

- Calendar booking: allows providers to set their availability in the
  listing creation form. Allows buyers to initiate transactions based on
  the corresponding availability. Perfect for most rental and service
  marketplaces.
  [Read more](https://www.sharetribe.com/docs/operator-guides/understanding-transaction-settings/#calendar-booking).

- Buying and selling products: allows providers to set the price of a
  unit and define how many units they can provide. Allows buyers to
  purchase those listings. Perfect for product marketplaces (and in some
  other types of marketplaces).
  [Read more](https://www.sharetribe.com/docs/operator-guides/understanding-transaction-settings/#buying-and-selling-products).

- Free messaging: allows a transaction without payments between buyers
  and sellers. Sellers can add a price or not to the listing. Useful for
  marketplaces where payments are not necessary or should happen
  off-platform.
  [Read more](https://www.sharetribe.com/docs/operator-guides/understanding-transaction-settings/#free-messaging).

## Multiple Listing types

You can have up to 20 Listing types in your marketplace. Each Listing
type must have a unique Listing type ID. When creating a listing,
providers select one Listing type from all your Listing types per
listing. Listings cannot take more than one Listing type at a time.

## What do the different Listing type settings mean for my users

Listing types impact how buyers start transactions, how providers create
their listings, and how they both interact to bring a transaction to a
successful conclusion. Learn more about how different Listing types
affect your users
[in this article.](/operator-guides/how-listing-types-work).
