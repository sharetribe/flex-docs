---
title: Custom pricing
slug: custom-pricing
updated: 2019-10-04
category: background
ingress:
  This article introduces you to the concept of custom pricing and how
  it differs from other pricing methods.
published: true
---

## What kind of pricing can you achieve with Flex

Service marketplaces usually base their pricing on the length of a
booking, on a number of booked units, or the combination of these two.
With Flex you can design your pricing using these two parameters but the
pricing can also be extended to support more complicated business models
or even be replaced with a completely different model altogether. Here
are some examples of common pricing schemes you might want to add on top
of the regular listing price.

- **Add-ons.** Upsell additions on top of the regular price. Examples:
  cleaning fee, insurance, delivery.
- **Discount based on booking length.** An example: daily price is
  $20, weekly
  price $70, and monthly price \$200. Another example: 20%
  discount on daily rate for bookings of 5 or more days, 30% discount on
  bookings of 10 or more days, and so on.
- **Taxes.** Add any type of tax rates to the listing price and display
  them as separate line items in the receipt.
- **Offer multiple pricing packages in the same listing.** An example: a
  hairdresser offers both haircuts and hair dying.
- **Seasonal pricing.** Examples: weekends cost more than weekdays,
  summers cost more than winters, and so on.
- **Quantity discount.** An example: booking a room for two people costs
  $100,
  and after that each additional person costs $20 extra.

All of these can be achieved using _custom pricing_. Custom pricing
provides the marketplace website or app with a wide range of ways to
affect how bookings are created. In this article we'll look at bit
closer on how pricing works in Flex and how it can be extended with
custom pricing.

## How pricing works in Flex

In Flex, the total price of a transaction is defined by its _line
items_. Line items describe what is included in a transaction. It
depends on the transaction process what the line items contain but it
can be a varying set of things from number of booked units to customer
and provider commissions and payment refunds. The line items of a
transaction depend on the _actions_ that are attached to transitions
defined in a transaction process. In general, actions can perform
anything that is related to the transaction process, like make bookings,
publish reviews and create payouts. But when it comes to pricing, it's
up to the actions to construct the right set of line items based on the
request parameters that are passed to the API and transaction data such
as booking, listing, customer, and provider attributes.

Different actions can be used to create different pricing schemes.
Night- and day-based pricing actions measure the number of nights and
days between the start and end of the booking to calculate the number of
booked units whereas unit-based action just takes a _quantity_ parameter
that it uses to construct the line item that holds the information about
the number of booked units.

Every line item has a unit price and one of the following attributes:
_quantity_ and _percentage_. The quantity attribute can be used to
denote the number of booked units, like number of booked nights. The
percentage param is used when modeling commissions for example. Based on
these attributes a line total is calculated for each line item. Line
totals then define the total payin and payout sums of the transaction.

When using a night, day and unit based pricing actions the Flex API
constructs the line items based on parameters passed in a request. The
marketplace website or app does not need to concern how the line items
are created but it can rely on the information they contain when
presenting the transaction information in the UI.

## More complex pricing schemes with custom pricing

In addition to a pricing scheme that is based on booking length or
number of booked units, pricing can be extended or completely
re-designed by using _custom pricing_. Custom pricing works so that it
uses a specific custom pricing action called `set-line-items-and-total`
in the transaction process. As the name suggests, this action allows you
to define any number of line items you need. So the client application,
that is your marketplace website or application, passes the booking
related line items to the API when initiating a transaction. When
passing line items to the API, a unit price and a quantity or a
percentage need to be defined for each line item. Then based on these,
the API calculates a total for each line item and the overall total sums
for the transaction.

When using the custom pricing action, it is to be noted that it can not
be combined with the night, day or unit-based pricing actions that rely
on the API to construct the line items based on booking length or a
number of units. So if the intention is to design the pricing so that
the booking length and a number of add ons affect the pricing, also the
line item that describes the actual booking needs to be passed to the
API by the client. Commissions and price negotiations can be combined
with custom pricing but the price of the actual booking needs to consist
of the line items provided by the client application.

To see how custom pricing works in practice let's look at an example of
initiating a transaction using the
[Flex JavaScript SDK](https://github.com/sharetribe/flex-sdk-js). In
this example we'll create a booking with the following description:

- a booking for a hotel room for three nights for \$80 per night
- a baby crib as an additional service for \$5 per night
- a discount of 15%

In addition the marketplace process defines a provider commission of 10%
that is calculated in the API.

```js
sdk.transactions
  .initiate(
    {
      transition: 'transition/request',
      processAlias: 'preauth-with-custom-pricing/release-1',
      params: {
        listingId: '5c7550aa-8b25-452d-8d93-e04d1d2859f0',
        bookingStart: new Date('2019-04-01T12:00:00.000Z'),
        bookingEnd: new Date('2019-04-04T12:00:00.000Z'),
        lineItems: [
          {
            code: 'line-item/room-for-two',
            unitPrice: new Money(8000, 'USD'),
            quantity: 3,
          },
          {
            code: 'line-item/baby-crib',
            unitPrice: new Money(500, 'USD'),
            quantity: 3,
          },
          {
            code: 'line-item/discount',
            unitPrice: new Money(25500, 'USD'),
            percentage: -15,
          },
        ],
        cardToken: 'tok_mastercard',
      },
    },
    { expand: true }
  )
  .then(response => {
    // respose.data contains the response data
  });
```

With this query `response.data` looks as follows:

<!-- prettier-ignore -->
```js
{
  data: {
    id: {
      uuid: '5c8f8dfe-2d54-48c7-b533-4da71196911a',
    },
    type: 'transaction',
    attributes: {
      processName: 'preauth-with-custom-pricing',
      transitions: [
        {
          transition: 'transition/request',
          createdAt: new Date('2019-03-18T12:24:30.239Z'),
          by: 'customer',
        },
      ],
      payinTotal: {
        amount: 21675,
        currency: 'USD',
      },
      payoutTotal: {
        amount: 19507,
        currency: 'USD',
      },
      processVersion: 6,
      createdAt: new Date('2019-03-18T12:24:30.223Z'),
      lastTransitionedAt: new Date('2019-03-18T12:24:30.239Z'),
      protectedData: {},
      lineItems: [
        {
          code: 'line-item/room-for-two',
          quantity: new Decimal(3),
          reversal: false,
          unitPrice: {
            amount: 8000,
            currency: 'USD',
          },
          lineTotal: {
            amount: 24000,
            currency: 'USD',
          },
          includeFor: ['customer', 'provider'],
        },
        {
          code: 'line-item/baby-crib',
          quantity: new Decimal(3),
          reversal: false,
          unitPrice: {
            amount: 500,
            currency: 'USD',
          },
          lineTotal: {
            amount: 1500,
            currency: 'USD',
          },
          includeFor: ['customer', 'provider'],
        },
        {
          code: 'line-item/discount',
          percentage: new Decimal(-15),
          reversal: false,
          unitPrice: {
            amount: 25500,
            currency: 'USD',
          },
          lineTotal: {
            amount: -3825,
            currency: 'USD',
          },
          includeFor: ['customer', 'provider'],
        },
        {
          code: 'line-item/provider-commission',
          percentage: new Decimal(-10),
          reversal: false,
          unitPrice: {
            amount: 21675,
            currency: 'USD',
          },
          lineTotal: {
            amount: -2168,
            currency: 'USD',
          },
          includeFor: ['provider'],
        },
      ],
      lastTransition: 'transition/request',
    },
  },
}
```

From the response we can see that the `lineTotal` attributes have been
added to the line items and `payinTotal` and `payoutTotal` have been
calculated based on the line items that where passed in the request and
the provider commission line item that has been constructed in the API.

## Trying out custom pricing

In order to take custom pricing into use the custom pricing action,
`set-line-items-and-total`, must be added to the transitions that create
new transactions in your marketplace's transaction process. This change
can be done using Flex CLI. For a full guide on how to change your
marketplace website to use custom pricing refer to
[the custom pricing how-to guide](/guides/how-to-customize-pricing/). It
describes how Flex Template for Web can be modified to use custom
pricing.
