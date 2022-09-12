---
title: Implement a single vendor shopping cart in FTW
slug: single-vendor-shopping-cart
updated: 2022-09-13
category: how-to-transaction-process
ingress:
  This guide illustrates high-level steps to implementing a
  single-vendor shopping cart in a FTW template.
published: true
---

By default, the FTW templates allow purchasing individual items. With a
one-click buying flow, the order experience can be quite seamless and
pleasant. However, especially for product marketplaces, customers may
want to buy several items from a single vendor to save in shipping
costs. Or a service marketplace may want to allow booking appointments
in bulk.

This article outlines, on a high level, some necessary steps to take
when creating a single-vendor shopping cart implementation.

## Technically

- Add UI elements => add to cart button, cart page
- Add a new line item calculation for carts
- Add a child transaction process for stock or availability handling
  - One listing per transaction, so stock or availability will need to
    be managed separately
  - Alternatively, you can create availability exceptions or stock
    adjustments, but there is no metadata on either of those so to
    maintain some link to the original transaction (e.g. if something
    needs to be refunded), child transactions are a more robust way to
    go
  - child transaction process should mirror the main transaction process
    on stock or availability reserving and confirming, and then have an
    operator step to cancel the stock reservation or booking if a refund
    or a dispute occurs.
- Clear cart once payment is confirmed.
- Refund and payout handling
  - In case the customer wants to only return one of the items, you will
    need to have the capability to partially refund the payment.
    Unfortunately, the default Flex Stripe integration does not allow
    partial refunds, so you will need to create at least a partial
    payment integration.
  - A fairly straightforward way to handle the situation would be to use
    the Flex Stripe integration up until the payment has been confirmed
    and captured. After that, you'd have a separate payment integration
    that handles all payouts and refunds, and in case of partial refunds
    would track the correct payouts.

## Things to consider

- Does the cart expire? How do you handle a situation where there is one
  item available and three people have it in their cart? You may want to
  build in stock/availability checks e.g. when the cart gets refreshed,
  so you can indicate when an item has gone out of stock or is no longer
  available
- How do you handle discounts? If your marketplace or your provider
  offers a bulk discount (e.g. -20% for three items) and one of the
  three items bought has been damaged during shipping or gets returned
  for some other reason – how much is the refund?
