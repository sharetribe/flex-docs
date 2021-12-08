---
title: Commissions and monetizing your platform
slug: commissions-and-monetizing-your-platform
updated: 2021-03-11
category: background
ingress:
  Flex provides configurable options for monetizing your platform. You
  can collect commissions from providers, customers, or both. This
  article provides you with basic information on the mechanisms
  supported by Flex for monetizing your platform.
published: true
---

_**NOTE! The current default method for setting commissions has
deprecated our old commission setting actions. If you are looking for
the old commissions and monetization background article, it can be found
[here](https://5ee94c280d38f10008a3bfa1--sharetribe-flex-docs-site.netlify.app/docs/background/commissions-and-monetizing-your-platform/).**_

## Introduction

If you have already defined a pricing model for your marketplace, this
article will provide you with basic information on the options Flex
provides and how to take them into use.

If you need more information on how to decide the pricing, our
Marketplace Academy has
[an article](https://www.sharetribe.com/academy/how-to-set-pricing-in-your-marketplace/)
describing different pricing models and the tradeoffs behind different
options.

As background, familiarizing yourself with
[line items](/background/pricing/#line-items) and
[privileged transitions](/background/privileged-transitions/) gives you
a good understanding of the concepts discussed in this article. In
addition, the article that describes
[payments in Flex](/background/payments-overview/) provides valuable
information about how the payment flow in Flex works.

Configuring commissions happens with the
[privileged-set-line-items](/references/transaction-process-actions/#actionprivileged-set-line-items)
transaction process action. In the FTW templates, this is done
[on the server side](https://github.com/sharetribe/ftw-daily/blob/master/server/api-util/lineItems.js)
because of the privileged nature of this action. If you are developing a
client application that is not based on one of the FTW templates, you
can apply a similar logic.

## Percentage-based commissions

One of the simplest ways to configure commissions is to define a
percentage of the listing price as a commission. Commissions can be
charged from the provider, the customer, or both.

### Example

A marketplace that charges 10 % from the customer and 12 % from the
provider would configure the commissions like this:

```
const PROVIDER_COMMISSION_PERCENTAGE = -12; // Provider commission is negative
const CUSTOMER_COMMISSION_PERCENTAGE = 10; // Customer commission is positive

const booking = {
  code: bookingUnitType,
  unitPrice,
  quantity: calculateQuantityFromDates(startDate, endDate, bookingUnitType),
  includeFor: ['customer', 'provider'],
};

const providerCommission = {
  code: 'line-item/provider-commission',
  unitPrice: calculateTotalFromLineItems([booking]),
  percentage: PROVIDER_COMMISSION_PERCENTAGE,
  includeFor: ['provider'],
};

const customerCommission = {
  code: 'line-item/customer-commission',
  unitPrice: calculateTotalFromLineItems([booking]),
  percentage: CUSTOMER_COMMISSION_PERCENTAGE,
  includeFor: ['customer'],
};

const lineItems = [booking, providerCommission, customerCommission];
```

For a 100 EUR listing, this would result 110 EUR payin for the customer
and a 88 EUR payout for the provider. The marketplace would receive 22
EUR minus Stripe fees.

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

## Dynamically calculated commissions

In addition to percentages, you can calculate the commission amount with
more complex logic, and set the result of the calculation as the
`unitPrice` of the line item using `quantity` instead of `percentage`.

In this example, the customer's commission percentage gets reduced when
they buy over 5 items. The provider's commission is percentage based,
but always at least 10 dollars.

### Example

```
const PROVIDER_COMMISSION_PERCENTAGE = -12; // Provider commission is negative
const MINIMUM_PROVIDER_COMMISSION = -1000; // Negative commission in minor units, i.e. in USD cents

const CUSTOMER_COMMISSION_PERCENTAGE = 10;
const REDUCED_CUSTOMER_COMMISSION_PERCENTAGE = 7;

const calculateProviderCommission = (booking) => {
  // Use existing helper functions to calculate totals and percentages
  const price = calculateTotalFromLineItems([booking]);
  const defaultCommission = calculateTotalPriceFromPercentage(price, PROVIDER_COMMISSION_PERCENTAGE);

  // Since provider commissions are negative, comparison must be negative as well
  if (defaultCommission.amount < MINIMUM_PROVIDER_COMMISSION) {
    return defaultCommission;
  }

  return new Money(MINIMUM_PROVIDER_COMMISSION, price.currency);
};

```

```
const booking = {
  code: bookingUnitType,
  unitPrice,
  quantity: calculateQuantityFromDates(startDate, endDate, bookingUnitType),
  includeFor: ['customer', 'provider'],
};

const providerCommission = {
  code: 'line-item/provider-commission',
  unitPrice: calculateProviderCommission(booking),
  quantity: 1,
  includeFor: ['provider'],
};

const customerPercentage = booking.quantity > 5
  ? REDUCED_CUSTOMER_COMMISSION_PERCENTAGE
  : CUSTOMER_COMMISSION_PERCENTAGE;

const customerCommission = {
  code: 'line-item/customer-commission',
  unitPrice: calculateTotalFromLineItems([booking]),
  percentage: customerPercentage,
  includeFor: ['customer'],
};

const lineItems = [booking, providerCommission, customerCommission];
```

## Fixed commissions

Defining a fixed commission is also straightforward with the line item
logic. In the following example, both the provider and customer pay a
fixed commission regardless of the listing price or quantity.

### Example

```
const FIXED_PROVIDER_COMMISSION = -1500; // Provider commission is negative
const FIXED_CUSTOMER_COMMISSION = 1050; // Customer commission is positive

const calculateCommission = (booking, amount) => {
  return new Money(amount, booking.unitPrice.currency);
};

const booking = {
  code: bookingUnitType,
  unitPrice,
  quantity: calculateQuantityFromDates(startDate, endDate, bookingUnitType),
  includeFor: ['customer', 'provider'],
};

const providerCommission = {
  code: 'line-item/provider-commission',
  unitPrice: calculateCommission(booking, FIXED_PROVIDER_COMMISSION),
  quantity: 1,
  includeFor: ['provider'],
};

const customerCommission = {
  code: 'line-item/customer-commission',
  unitPrice: calculateCommission(booking, FIXED_CUSTOMER_COMMISSION),
  quantity: 1,
  includeFor: ['customer'],
};

const lineItems = [booking, providerCommission, customerCommission];
```

For a 100 EUR listing, this would result 110.5 EUR payin for the
customer and a 85 EUR payout for the provider. The marketplace would
receive 25.5 EUR minus Stripe fees.

## Subscription-based model

The commission actions are the most straightforward way of monetizing
your marketplace and are directly supported by Flex. However, you might
want to experiment with other monetization models depending on your
business idea. For example, subscriptions might be a good way of
monetizing your marketplace. With the
[Integration API](https://www.sharetribe.com/docs/background/marketplace-api-integration-api/#when-to-use-the-integration-api),
you can integrate a third-party service such as
[Chargebee](https://www.chargebee.com/) or
[Stripe billing](https://stripe.com/en-fi/billing) to process
subscription payments from users who want access to your marketplace.
