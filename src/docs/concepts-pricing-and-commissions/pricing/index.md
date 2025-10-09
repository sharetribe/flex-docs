---
title: Pricing
slug: pricing
updated: 2023-10-24
category: concepts-pricing-and-commissions
ingress:
  Sharetribe allows lots of flexibility for your providers in terms of
  how they can set their pricing. This guide walks you through how price
  is defined in Sharetribe.
published: true
---

## What kind of pricing can you achieve with Sharetribe

It's common for a marketplace to base it's pricing on the length of a
booking, on a number of booked units, or the combination of these two.
With Sharetribe you can design your pricing using these two parameters
but the pricing can also be extended to support more complicated
business models or even be replaced with a completely different model
altogether.

Here are some examples of common pricing schemes you might want to add
on top of the regular listing price.

- **Add-ons.** Upsell additions on top of the regular price. Examples:
  cleaning fee, insurance, delivery.
- **Discount based on booking length.** An example: daily price is
  $20, weekly
  price $70, and monthly price \$200. Another example: 20%
  discount on daily rate for bookings of 5 or more days, 30% discount on
  bookings of 10 or more days, and so on.
- **Taxes.** Add any type of tax rate to the listing price and display
  them as separate line items in the receipt.
- **Offer multiple pricing packages in the same listing.** An example: a
  hairdresser offers both haircuts and hair dying.
- **Seasonal pricing.** Examples: weekends cost more than weekdays,
  summers cost more than winters, and so on.
- **Quantity discount.** An example: booking a room for two people costs
  $100,
  and after that, each additional person costs $20 extra.
- **Price variants.** With bookings, you can enable price variants. You
  could add two variants of a single listing, e.g. standard and premium
  versions, which have a price difference.

All of these options can be achieved with the Sharetribe pricing
functionality. In this article, we'll look a bit closer at how pricing
works in Sharetribe and how pricing schemes can be designed.

## Pricing terminology

- **Line item:** Something that affects transaction price, for example,
  a booking for two nights, a cleaning fee, or a customer commission.
  Think of as a line in a receipt.
- **Line total:** Total price of a line item.
- **Payin total:** Amount of money that a customer pays for a
  transaction. The value is the sum of line items that apply to the
  customer.
- **Payout total:** Amount of money a provider receives from a
  transaction. The value is the sum of line items that apply to the
  provider.

## Line items

In Sharetribe, the total price of a transaction is defined by its _line
items_. Line items describe what is included in a transaction. It can be
a varying set of things from the number of booked units to customer and
provider commissions, add-ons, discounts, or payment refunds.

A transaction gets its price from the
[privileged-set-line-items](/references/transaction-process-actions/#actionprivileged-set-line-items)
action . The action takes a list of line items as a parameter. Remember,
that the `privileged-set-line-items` action needs to be placed in
[a privileged transition](/concepts/privileged-transitions/).

Every line item has a unit price and one of the following attributes:
_quantity_ or _percentage_. The quantity attribute can be used to denote
the number of booked units, like the number of booked nights. Quantity
can also be defined as a multiplication of _units_ and _seats_. The
percentage param is used when modeling commissions for example. Based on
these attributes a line total is calculated for each line item. Line
totals then define the total payin and payout sums of the transaction.

The following arguments can be passed in a line item to the Sharetribe
API:

- `code`: A string that identifies the line item. Must start with
  `line-item/`, for example, `line-item/cleaning-fee`, mandatory.
- `unitPrice`: Price of a single unit of the line item, mandatory.
- `lineTotal`: Total value of the line item, can be negative.
- `quantity`: Total amount of units. Can be defined explicitly or
  calculated by multiplying `units` and `seats`.
- `percentage`: A percentage that is used to calculate the line total.
- `seats`: Number of seats that are used to calculate the quantity.
- `units`: Number of units. In combination with seats, forms quantity.
- `includeFor`: An array containing strings `customer` and/or
  `provider`. Defines which party of a transaction the line item applies
  to.

The `lineTotal` is not a mandatory parameter. Sharetribe will calculate
the line total and if one is provided, it will validate the `lineTotal`
parameter against the calculated value.

## Calculating the price

The price of a line item can be calculated in three ways, combining the
`unitPrice` with either `quantity`, `seats` and `units`, or
`percentage`. The following tables provide examples of all price
calculation types:

### unitPrice with quantity

Use unit price and quantity to calculate the price when you want to
multiply a fixed fee with a quantity.

| code                                  | unitPrice              | quantity | lineTotal               | includeFor               |
| :------------------------------------ | :--------------------- | :------- | :---------------------- | :----------------------- |
| "line-item/nights"                    | new Money(5000, "USD") | 3        | new Money(15000, "USD") | ["customer", "provider"] |
| "line-item/cleaning-fee"              | new Money(7500, "USD") | 1        | new Money(7500, "USD")  | ["customer", "provider"] |
| "line-item/fixed-customer-commission" | new Money(2500, "USD") | 1        | new Money(2500, "USD")  | ["customer"]             |

`lineTotal` is calculated as `unitPrice * quantity`.

### unitPrice with seats and units

Use unit price combined with seats and units when the number of
participants affects the price.

| code               | unitPrice              | seats | units | lineTotal               | includeFor               |
| :----------------- | :--------------------- | :---- | :---- | :---------------------- | :----------------------- |
| "line-item/nights" | new Money(5000, "USD") | 3     | 2     | new Money(30000, "USD") | ["customer", "provider"] |

`lineTotal` is calculated as `unitPrice * seats * units`.

### unitPrice and percentage

Use unit price and percentage when the line total is calculated as a
percentage of some other (sub)total.

| code                            | unitPrice               | percentage | lineTotal               | includeFor               |
| :------------------------------ | :---------------------- | :--------- | :---------------------- | :----------------------- |
| "line-item/coupon-discount"     | new Money(50000, "USD") | -15        | new Money(-7500, "USD") | ["customer", "provider"] |
| "line-item/customer-commission" | new Money(50000, "USD") | 15         | new Money(7500, "USD")  | ["customer"]             |
| "line-item/provider-commission" | new Money(50000, "USD") | -15        | new Money(-7500, "USD") | ["provider"]             |

`lineTotal` is calculated as `unitPrice * percentage / 100`.

## Refunds

Refunds are created with the
[calculate-full-refund](/references/transaction-process-actions/#actioncalculate-full-refund)
action. It sets transaction pay in and pay out amounts to zero and
creates reverse line items that undo all the previous line items. Note,
that the `calculate-full-refund` action can be run only once during a
transaction.

The action calculates a full refund. Partial refunds are not supported
by Sharetribe at the moment.

## Price negotiation

You may want to allow your users to negotiate a price for a transaction
instead of setting a default listing price that determines the
transaction payment. In a negotiation flow, the customer or provider
starts the transaction with requesting or suggesting a quote, and the
other party can then either accept or reject the quote, or make a
counter offer. This quote is set as the main line item of the
transaction instead of the default listing price.

Once both parties have accepted a quote, the negotiation completes with
the customer making a payment. Your potential customer and provider
commissions will be applied in addition to the negotiated quote to form
the payin and payout totals of the transaction.
