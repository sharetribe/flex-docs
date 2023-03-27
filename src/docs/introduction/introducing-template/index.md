---
title: Introducing Sharetribe Web Template
slug: introducing-template
updated: 2023-01-15
category: introduction
ingress:
  Sharetribe Web Template is an application that features capabilities
  for rental, service, and product marketplaces, complete with
  availability and stock management, powerful searchable listings and a
  delayed review process.
published: true
---

TODO: Replace with CA version

The Sharetribe Web Template is a configurable marketplace application.
It is a great starting point for developing rental, service, or product
marketplaces. It offers basic marketplace functionalities out of the
box, and you can further customize it to suit your specific marketplace.

## Listings

The heart of the Sharetribe Web Template marketplace are listings. As a
registered user, you can create as many listings as you want, and all
published listings are visible to both registered and anonymous users.

The template enables complex filtering, including based on location,
availability dates, price, and listing features. You can freely modify
the listing and search attributes to suit your marketplace.

![Saunatime search page](./saunatime_searchpage.png)

## Availability

The Sharetribe Web Template uses the Flex built-in availability
calendar. You can configure the availability of your listings to be
nightly, daily, or based on a custom time interval such as hours or
15-minute increments. You can also offer a variety of different booking
length options on the same marketplace.

The Sharetribe Web Template has time zone support. The provider’s
location determines the timezone of the listing, and that timezone is
saved into the listing’s availability plan.

For example, if your marketplace has listings in two timezones, such as
in Finland and Sweden, customers in both countries can make bookings in
their own timezones and be sure that their clock matches the booking
time.

![Saunatime booking](./saunatime_booking.png)

When a provider receives a request for a booking, they can accept or
decline the request. The customer's payment method will only be charged
once the provider accepts the booking.

## Inventory management

Inventory management is vital for product marketplaces, and Sharetribe
Web Template uses Flex’s listing stock management features to enable it.
Read more about
[inventory management in Flex](/concepts/inventory-management/).

When your Sharetribe Web Template is configured to sell products, the
seller adds the number of items they have in stock during product
listing creation. When a buyer makes a purchase, that number is
automatically reduced. The seller can manage their stock manually by
editing the listing if there are inventory changes that are not related
to transactions.

If you’re building a marketplace for used or unique items, you can
customize the template so that the default inventory for listings is
always one (1). When an item is sold, its stock will automatically go to
zero.

## Delivery options

The product listing flow allows sellers to choose a delivery method.
When creating a listing, the seller chooses pick-up, shipping, or both.

For pick-up, the seller fills out a pick-up address. For shipping, the
seller specifies a price, and a fee for any additional items, if the
buyer buys more than one. The seller is in charge of shipping and marks
the order as shipped once they’ve mailed it to the buyer.

With Flex, you have the option to integrate a third-party shipping
service. By connecting your marketplace with shipping software like
Shippo or ShippyPro, you can streamline delivery on your platform and
guarantee that your sellers use the shipping service you’ve chosen.

## Messaging

Sharetribe Web Template allows providers and customers to send private
messages related to listings and orders. The messages are shown in a
timeline that also shows the different actions the participants have
taken in the transaction.

![Saunatime provider messaging view](./saunatime_messaging.png)

## Reviews

Once a transaction has completed, the customer and provider can both
leave reviews. In Sharetribe Web Template, reviews remain hidden until
either both parties have submitted their reviews or the review period
expires.

![The second reviewer sees they have a review](./reviewer_2.png)

This ensures that the second participant's review is not affected by the
first review. Both reviews are published to both parties at the same
time, and after the review is published it cannot be modified anymore.

![Reviews are published to both parties at the same time](./both_reviews.png)

## Layout

The Sharetribe Web Template has two main layouts for listing page. One
layout features a single cropped image on top of the page, which is more
geared toward rentals and services. The other layout features a full
image of the item, which is designed with product marketplaces in mind.

### Browsing and filtering

Sharetribe Web Template can be confibured to use one of two different
browse views, one with a map and one without. The map view, by default,
features a location search, some primary filters on top of the page, and
a list of secondary filters behind a button.

The list view consists of listing thumbnails and filters on the left
side. Unlike in the map view, the filters live-update the listings that
are displayed. Potential buyers do not need to update the view
separately but can choose and change attributes in real-time.

![Sneakertime browse view with filters and listings](./search-filters.png)
TODO update image

### Listing thumbnails and images

Default listing thumbnails in Sharetribe Web Template are square-shaped.
The template code has an easy configuration to change the aspect ratio
of the thumbnails.

On the listing page, images are presented in a carousel. They also
retain their original aspect ratio.

![Listing image carousel on the listing page](./images-carousel.png)

## Transaction process

Sharetribe Web Template has two default transaction processes, one for
bookings and one for products. The booking based transaction process has
a step for the provider to accept the booking, and an automatic
completion step when the booking time ends.

The product buying process has instant purchase with no provider
confirmation, and adds steps for stock management, shipping, delivery,
and disputing orders.

With Flex, you can modify your marketplace’s transaction flow to your
specifications. For example, you could add a step for the seller to
confirm a product order, or only have the customer review the
transaction. Read more about
[transaction processes in Flex](/concepts/transaction-process/).

### Booking transaction process

A transaction in Sharetribe Web Template starts on the listing page. The
customer chooses their desired booking time, after which they move to
the checkout page and fill out their payment details.

For bookings, they request to book the listing at their chosen time.
This alerts the provider, who then needs to either accept or decline the
booking. The customer's payment method is only charged if the provider
accepts the booking.

Once the booking time ends, the booking process automatically
transitions to a completed state. This also triggers the payout of the
provider's share of the booking price from Stripe to their own account.
After the booking has completed, the participants are prompted to review
each other.

### Product buying transaction process

A transaction in Sharetribe Web Template starts on the listing page.
Depending on the listing's transaction process, the customer either
chooses their desired booking time, or the number of items they want to
buy and the delivery method (pick-up or shipping). After this, they move
to the checkout page and fill out their payment details.

For products, they purchase the listing. Stock is reserved, and the
seller receives a notification of the order. The seller does not need to
accept the order separately.

If the buyer has chosen shipping as the delivery method, the seller will
mark the order as shipped once they’ve processed it and the package is
on its way. Similarly, once the buyer receives the item, they will mark
the order as received.

If the item does not arrive, its condition is lacking, or there is
another problem with the purchase, the buyer can dispute the order. In a
dispute, the marketplace’s administrator will investigate the situation
and settle the dispute either by refunding the buyer or marking the
order as successfully completed.

After the transaction is complete, both parties are prompted to review
each other.

## Customizing your own marketplace

The fastest way to get started with modifying the Sharetribe Web
Template is to check out our [tutorial](/tutorial/introduction/). The
tutorial starts with the Sharetribe Web Template, and it guides you
through visual and functional modifications.

When working with Flex, you have the option to start development on top
of our
[Sharetribe Web Template](https://github.com/sharetribe/web-template/),
the web application built on top of the Marketplace API. You can also
develop your frontend application from scratch, but using our template
can save considerable time.

If you’re looking to hire a developer from Sharetribe’s
[Expert Partner Network](https://www.sharetribe.com/experts/), check out
[this article](/operator-guides/how-to-hire-developer/) for more
information on the process.
