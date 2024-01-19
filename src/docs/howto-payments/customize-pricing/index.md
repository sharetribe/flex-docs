---
title: How to customize pricing
slug: how-to-customize-pricing
updated: 2024-01-19
category: how-to-payments
ingress:
  Sharetribe allows lots of flexibility for your providers in terms of
  how they can set their pricing. This guide walks you through
  customizing listing pricing and commission.
published: true
---

This how-to guide shows you how listing pricing can be customized by
using two examples: adding an insurance fee to a bookable listing, and
changing provider commission so that it's based on booking length. The
changes we are about to make are as follows:

1. Update rental listing data model by storing insurance fee price in
   listing public data
2. Update pricing logic to add a insurance fee line item if a listing
   has insurance fee stored in public data
3. Update provider commission calculation to be dependent on booking
   length

For more information about pricing in Sharetribe, see the
[Pricing background article](/concepts/pricing/).

## 1. Listing extended data

Pricing can be based on a lot of variables, but one practical way to
build it is to base it on information stored as extended data in
listings. See the
[Extend listing data in Sharetribe Web Template](/how-to/extend-listing-data-in-template/)
how-to guide to read how to extend the listing data model with extended
data. See the same guide for instructions how to add inputs for new
attributes in the listing wizard. Alternatively, in order to try out
this guide, you can just add a hard-coded insurance fee to the
`EditListingPricingPanel` component:

```shell
└── src
    └── containers
        └── EditListingPricingPage
            └── EditListingPricingWizard
        └── EditListingPricingPanel
            └── EditListingPricingPanel.js
```

Booking and product related transaction processes have different pricing
panels, since the product process uses the
EditListingPricingAndStockPanel component. This means that adding the
insurance fee to the EditListingPricingPanel only adds it to bookable
listings.

However, we may want to set a different insurance fee for hourly
listings and daily or nightly listings.

On submit, save price and insuranceFee:

```diff
+ import { HOUR } from '../../../../transactions/transaction';
...
 const form = priceCurrencyValid ? (
   <EditListingPricingForm
     className={css.form}
     initialValues={{ price }}
-    onSubmit={onSubmit}
+    const insuranceFeeAmount = unitType === HOUR ? 500 : 2000;
+    onSubmit={values => {
+      const { price } = values;
+      const updatedValues = {
+         price,
+         publicData: {
+           insuranceFee: { amount: insuranceFeeAmount, currency: marketplaceCurrency },
+         }
+      };
+      onSubmit(updatedValues);
+    }}
     onChange={onChange}
     saveActionMsg={submitButtonText}
     disabled={disabled}
```

## 2. Transaction line item for insurance fee

As the previous section mentions, this guide expects that the insurance
fee price is stored in listing public data in an object with two keys:
`amount` and `currency`. The `amount` attribute holds the price in
subunits whereas `currency` holds the currency code. For example, with a
cleaning fee of \$20 the subunit amount is 2000 cents.

```js
const insuranceFeeAmount = unitType === HOUR ? 500 : 2000;
...
publicData: {
    insuranceFee: { amount: insuranceFeeAmount, currency: marketplaceCurrency },
}
```

Sharetribe pricing uses
[privileged transitions](/concepts/privileged-transitions/) to ensure
flexible pricing models while keeping control of the pricing logic in a
secure environment. Transitioning requests of privileged transitions are
made from the server-side. Thus we'll need to update the pricing logic
in the `/server/api-util/lineItems.js` file:

```shell
└── server
    └── api-util
        └── lineItems.js
```

In the helper function section of the file, add a function that resolves
the insurance fee of a listing:

```js
const resolveInsuranceFeePrice = listing => {
  const { amount, currency } =
    listing.attributes.publicData?.insuranceFee || {};

  if (amount && currency) {
    return new Money(amount, currency);
  }

  return null;
};
```

Now the `transactionLineItems` function can be updated to also provide
the insurance fee line item in case the listing has an insurance fee
configured:

```js
const insuranceFeePrice = resolveInsuranceFeePrice(listing);
const insuranceFeeLineItem = insuranceFeePrice
  ? [
      {
        code: 'line-item/insurance-fee',
        unitPrice: insuranceFeePrice,
        quantity: 1,
        includeFor: ['customer', 'provider'],
      },
    ]
  : [];

  // Provider commission reduces the amount of money that is paid out to provider.
  // Therefore, the provider commission line-item should have negative effect to the payout total.
  const getNegation = percentage => {
    return -1 * percentage;
  };

  // Note: extraLineItems for product selling (aka shipping fee)
  // is not included in either customer or provider commission calculation.

  ...

  // Let's keep the base price (order) as first line item and provider and customer commissions as last.
  // Note: the order matters only if OrderBreakdown component doesn't recognize line-item.
  const lineItems = [
    order,
    ...extraLineItems,
    ...insuranceFeeLineItem,
    ...providerCommissionMaybe,
    ...customerCommissionMaybe,
  ];
```

<info>

When selecting a code for your custom line-item, remember that
Sharetribe requires the codes to be prefixed with _line-item/_ and the
maximum length including the prefix is 64 characters. Other than that
there are no restrictions, but we recommend that _kebab-case_ is used
when the code consists of multiple words.

</info>

Now, if you open up a bookable listing page and select dates in the
order panel on the right, the template will fetch line items and you
will see an insurance fee row in the order breakdown:

![Booking panel](booking-panel.png)

Note, that the order breakdown automatically renders the insurance fee
line item by tokenizing the line item code and capitalizing the first
letter. In case this is not enough, you can add your own presentational
line item component to the booking breakdown. This is done by adding the
line item code (in our case `line-item/insurance-fee`) into the
`LINE_ITEMS` array in `src/util/types.js` and creating your own
`LineItem*Maybe` component to be used in `OrderBreakdown`.

## 3. Dynamic provider commission

Now that we've updated the pricing logic based on listing extended data,
let's next update the provider commission based on the booking length.

The idea is to keep the 10% commission defined in Console for bookings
of 5 or less nights. For bookings of more than 5 nights, we'll set the
provider commission three percentage points lower, to 7%. Update the
`transactionLineItems` function in `lineItems.js` as follows:

```jsx
// Base provider and customer commissions are fetched from assets
const PROVIDER_COMMISSION_PERCENTAGE_REDUCTION = 3;

const calculateProviderCommissionPercentage = (
  order,
  providerCommission
) =>
  order.quantity > 5
    ? providerCommission.percentage -
      PROVIDER_COMMISSION_PERCENTAGE_REDUCTION
    : providerCommission.percentage;
```

```jsx
// The provider commission is what the provider pays for the transaction, and
// it is the subtracted from the order price to get the provider payout:
// orderPrice - providerCommission = providerPayout
const providerCommissionMaybe = hasCommissionPercentage(
  providerCommission
)
  ? [
      {
        code: 'line-item/provider-commission',
        unitPrice: calculateTotalFromLineItems([order]),
        percentage: getNegation(
          calculateProviderCommissionPercentage(
            order,
            providerCommission
          )
        ),
        includeFor: ['provider'],
      },
    ]
  : [];
```

Now when the provider takes a look at a pricing breakdown of a booking
longer than 5 nights, the commission is calculated with 7% instead of
10%:

![Provider breakdown](provider-breakdown.png)
