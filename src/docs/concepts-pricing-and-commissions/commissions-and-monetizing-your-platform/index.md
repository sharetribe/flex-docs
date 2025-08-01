---
title: Commissions and monetizing your platform
slug: commissions-and-monetizing-your-platform
updated: 2025-07-25
category: concepts-pricing-and-commissions
ingress:
  Sharetribe provides configurable options for monetizing your platform.
  You can collect commissions from providers, customers, or both. This
  article provides you with basic information on the mechanisms
  supported by Sharetribe for monetizing your platform.
published: true
---

## Introduction

If you have already defined a pricing model for your marketplace, this
article will provide you with basic information on the options
Sharetribe provides and how to take them into use.

If you need more information on how to decide the pricing, our
Marketplace Academy has
[an article](https://www.sharetribe.com/academy/how-to-set-pricing-in-your-marketplace/)
describing different pricing models and the tradeoffs behind different
options.

As background, familiarizing yourself with
[line items](/concepts/pricing/#line-items) and
[privileged transitions](/concepts/privileged-transitions/) gives you a
good understanding of the concepts discussed in this article. In
addition, the article that describes
[payments in Sharetribe](/concepts/payments-overview/) provides valuable
information about how the payment flow in Sharetribe works.

Configuring commissions happens with the
[privileged-set-line-items](/references/transaction-process-actions/#actionprivileged-set-line-items)
transaction process action. In the template, this is done
[on the server side](https://github.com/sharetribe/web-template/blob/main/server/api-util/lineItems.js)
because of the privileged nature of this action. If you are developing a
client application that is not based on the Sharetribe Web Template, you
can apply a similar logic.

## Percentage-based commissions

One of the simplest ways to configure commissions is to define a
percentage of the listing price as a commission. Commissions can be
charged from the provider, the customer, or both.

<info>

If your application uses hosted configurations, you can define provider
and customer commission percentages and minimum commission amounts in
Sharetribe Console.

![Commission defined in Console](consoleCommission.png)

To implement the other use cases in this article, you will need a degree
of custom development.

</info>

### Example

_This example illustrates how to use percentage-based commissions
without Console-based hosted configurations._

A marketplace that charges 10 % from the customer and 12 % from the
provider would configure the commissions like this:

```js
const { calculateTotalFromLineItems } = require('./lineItemHelpers');

const PROVIDER_COMMISSION_PERCENTAGE = -12; // Provider commission is negative
const CUSTOMER_COMMISSION_PERCENTAGE = 10; // Customer commission is positive

const order = {
  code,
  unitPrice,
  quantity,
  includeFor: ['customer', 'provider'],
};

const providerCommissionPercentage = {
  code: 'line-item/provider-commission',
  unitPrice: calculateTotalFromLineItems([order]),
  percentage: PROVIDER_COMMISSION_PERCENTAGE,
  includeFor: ['provider'],
};

const customerCommissionPercentage = {
  code: 'line-item/customer-commission',
  unitPrice: calculateTotalFromLineItems([order]),
  percentage: CUSTOMER_COMMISSION_PERCENTAGE,
  includeFor: ['customer'],
};

const lineItems = [
  order,
  providerCommissionPercentage,
  customerCommissionPercentage,
];
```

For a 100 EUR listing, this would result in a 110 EUR payin for the
customer and a 88 EUR payout for the provider. The marketplace would
receive 22 EUR minus Stripe fees.

<extrainfo title="Negative or positive commission?">
Commission line items are defined as either positive or negative depending on the transaction
party. 
<ul>
<li> Provider commission is defined as <b>negative</b>, since the provider's total is the listing price minus the provider commission.
<img src="./provider_commission.png"/>
<li> Customer commission is defined as <b>positive</b>, since the customer's total is the listing price plus the customer commission.
<img src="./customer_commission.png"/>
</ul>
</extrainfo>

## Fixed commissions

In addition to percentages, you can define commissions with fixed sums
as the `unitPrice` of the line item using `quantity` instead of
`percentage`.

In the following example, both the provider and customer pay a fixed
commission regardless of the listing price or quantity, and
Console-based commissions are ignored.

### Example

```js
const FIXED_PROVIDER_COMMISSION = -1500; // Provider commission is negative
const FIXED_CUSTOMER_COMMISSION = 1050; // Customer commission is positive

const calculateCommission = (unitPrice, amount) => {
  return new Money(amount, unitPrice.currency);
};

const order = {
  code,
  unitPrice,
  quantity,
  includeFor: ['customer', 'provider'],
};

const providerCommissionFixed = {
  code: 'line-item/provider-commission',
  unitPrice: calculateCommission(unitPrice, FIXED_PROVIDER_COMMISSION),
  quantity: 1,
  includeFor: ['provider'],
};

const customerCommissionFixed = {
  code: 'line-item/customer-commission',
  unitPrice: calculateCommission(unitPrice, FIXED_CUSTOMER_COMMISSION),
  quantity: 1,
  includeFor: ['customer'],
};

const lineItems = [
  order,
  ...extraLineItems,
  providerCommissionFixed,
  customerCommissionFixed,
];
```

For a 100 EUR listing, this would result in a 110.5 EUR payin for the
customer and a 85 EUR payout for the provider. The marketplace would
receive 25.5 EUR minus Stripe fees.

## Dynamically calculated commissions

You can also calculate the commissions with more complex logic. You can
set the result of the calculation as either the `unitPrice` or the
`percentage` of the line item.

In this example, the customer's commission percentage gets reduced with
three percentage points (e.g. from 10 per cent down to 7 per cent) when
they buy 5 items or more. The provider's commission is percentage based,
but always at least 10 dollars.

### Example

Add the following to _lineItemHelpers.js_:

```js
// Base provider and customer commissions are fetched from assets
const MINIMUM_PROVIDER_COMMISSION = -1000; // Negative commission in minor units, i.e. in USD cents
const CUSTOMER_COMMISSION_PERCENTAGE_REDUCTION = 3;

const calculateProviderCommission = (order, providerCommission) => {
  // Use existing helper functions to calculate totals and percentages
  const price = this.calculateTotalFromLineItems([order]);
  const commission = calculateTotalPriceFromPercentage(
    price,
    providerCommission
  );

  // Since provider commissions are negative, comparison must be negative as well
  if (commission.amount < MINIMUM_PROVIDER_COMMISSION) {
    return commission;
  }

  return new Money(MINIMUM_PROVIDER_COMMISSION, price.currency);
};

const calculateCustomerCommissionPercentage = (
  order,
  customerCommission
) =>
  order.quantity > 4
    ? customerCommission.percentage -
      CUSTOMER_COMMISSION_PERCENTAGE_REDUCTION
    : customerCommission.percentage;

exports.getDynamicProviderCommissionMaybe = (
  order,
  providerCommission
) =>
  this.hasCommissionPercentage(providerCommission)
    ? [
        {
          code: 'line-item/provider-commission',
          unitPrice: calculateProviderCommission(
            order,
            getNegation(providerCommission.percentage)
          ),
          quantity: 1,
          includeFor: ['provider'],
        },
      ]
    : [];

exports.getDynamicCustomerCommissionMaybe = (
  order,
  customerCommission
) =>
  this.hasCommissionPercentage(customerCommission)
    ? [
        {
          code: 'line-item/customer-commission',
          unitPrice: this.calculateTotalFromLineItems([order]),
          percentage: calculateCustomerCommissionPercentage(
            order,
            customerCommission
          ),
          includeFor: ['customer'],
        },
      ]
    : [];
```

Then you can use the function like this in _lineItems.js_:

```js
const {
  getDynamicProviderCommissionMaybe,
  getDynamicCustomerCommissionMaybe,
} = require('./lineItemHelpers');

const order = {
  code,
  unitPrice,
  quantity,
  includeFor: ['customer', 'provider'],
};

// Let's keep the base price (order) as first line item and provider and customer commissions as last.
// Note: the order matters only if OrderBreakdown component doesn't recognize line-item.
const lineItems = [
  order,
  ...extraLineItems,
  ...getDynamicProviderCommissionMaybe(order, providerCommission),
  ...getDynamicCustomerCommissionMaybe(order, customerCommission),
];
```

## Subscription-based model

The line item commissions are the most straightforward way of monetizing
your marketplace and are directly supported by Sharetribe. However, you
might want to experiment with other monetization models depending on
your business idea. For example, subscriptions might be a good way of
monetizing your marketplace. With the
[Integration API](/concepts/marketplace-api-integration-api/#when-to-use-the-integration-api),
you can integrate a third-party service such as
[Chargebee](https://www.chargebee.com/) or
[Stripe billing](https://stripe.com/en-fi/billing) to process
subscription payments from users who want access to your marketplace.
