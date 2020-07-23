---
title: Customize pricing
slug: customize-pricing-tutorial
updated: 2020-07-21
category: tutorial-transaction-process
ingress:
  Learn how to customize pricing in your marketplace by adding an optional
  cleaning fee on top of the regular nightly price of the accommodation.
published: true
---

## Store cleaning fee into listing

Pricing can be based on a lot of variables but one practical way to build it is
to base it on information stored as extended data in listings. In this example,
we are using listing's public data to store information about the cleaning fee.
We start by doing some changes to **EditListingPricingPanel** in
_EditListingWizard_.

```shell
└── src
    └── components
        └── EditListingPricingPanel
            └── EditListingPricingPanel.js
```

Here we will only list the required changes. See the
[Add extended data to listing entity tutorial](/tutorial-extended-data/add-extended-data/)
for step-by-step instructions on how to add public data field for listing.

### Save to public data

In _EditListingPricingPanel_ we need to edit the `onSubmit` function to save the
new public data field `cleaningFee`. Because we are using `FieldCurrencyInput`
in this example as the input, the `cleaningFee` will be Money object when we get
that from `values`. Money object can't be used directly as public data so we
need to create a JSON object with keys `amount` and `currency` and use the JSON
object in the API call.

> **Note:** `price` attribute is one of the listing's default attributes so it's
> passed to Marketplace API directly unlike the new public data `cleaningFee`
> which needs to be under the `publicData` key.

```jsx
      onSubmit={values => {
        const { price, cleaningFee = null } = values;

        const updatedValues = {
          price,
          publicData: {
            cleaningFee: { amount: cleaningFee.amount, currency: cleaningFee.currency },
          },
        };
        onSubmit(updatedValues);
      }}
```

### Initialize the form

Next we want to pass inital values for `price` and `cleaningFee`. For this we
need to get the `cleaningFee` from listing attributes under the `publicData`
key. Also, because `FieldCurrencyInput` expects the value to be Money object we
need to convert the value we get from Marketplace API back to instance of Money.

```jsx
const { price, publicData } = currentListing.attributes;
const cleaningFee =
  publicData && publicData.cleaningFee ? publicData.cleaningFee : null;
const cleaningFeeAsMoney = new Money(cleaningFee.amount, cleaningFee.currency);
const initialValues = { price, cleaningFeeAsMoney };
```

### Add input component

We want to be able to save the amount of listing's cleaning fee so we add new
`FieldCurrencyInput` to the _EditListingPricingForm_. The id and name of this
field will be `cleaningFee`. Adding this fee will be optional so we don't want
to add any `validate` param to the `FieldCurrencyInput` like there is in the
`price` input.

```shell
└── src
    └── forms
        └── EditListingPricingForm
            └── EditListingPricingForm.js
```

```jsx
...

<FieldCurrencyInput
    id="price"
    name="price"
    className={css.priceInput}
    autoFocus
    label={pricePerUnitMessage}
    placeholder={pricePlaceholderMessage}
    currencyConfig={config.currencyConfig}
    validate={priceValidators}
  />

<FieldCurrencyInput
  id="cleaningFee"
  name="cleaningFee"
  className={css.cleaningFeeInput}
  autoFocus
  label={cleaningFeeMessage}
  placeholder={cleaningFeePlaceholderMessage}
  currencyConfig={config.currencyConfig}
/>
...
```

After adding the new translations keys and some padding to price input in CSS
file, the EditListingPricingPanel should look something like this:

![EditListingPricePanel](./editlistingpricepanel.png)

## Update BookingDatesForm

In our example the cleaning fee is optional and users can select that as an
add-on to their booking. In this section, we will add the UI component for
selecting the cleaning fee and pass the information about the user's choice to
the FTW-backend.

> **Note**: In case you would like to add the cleaning fee automatically to
> every booking, you don't need to add the UI component for selecting the
> cleaning fee and you can move forward to the next section: Add a transaction
> line item for the cleaning fee.

### Prepare props

In order to be able to use the information about cleaning fee inside the
`BookingDatesForm` we need to pass some new information from _BookingPanel_ to
the form. BookingPanel is component that is used on _ListingPage_ and
_TransactionPage_ to show the booking breakdown.

```shell
└── src
    └── components
        └── BookingPanel
            └── BookingPanel.js
```

_BookingPanel_ gets `listing` as a prop. The cleaning fee is now saved to
listing's public data so we can find it under the `publicData` key from
listing's attributes. Because we decided that adding a cleaning fee to listing's
information is optional, we need to check if the cleaningFee exists in public
data or not.

```jsx
const cleaningFee =
  listing.attributes.publicData && listing.attributes.publicData.cleaningFee
    ? listing.attributes.publicData.cleaningFee
    : null;
```

Once we have saved the information about the cleaning fee to variable
`cleaningFee` we need to pass that forward to `BookingDatesForm`. This form is
used for collecting the booking data (e.g. booking dates) and values from this
form will be used when creating the transaction lineItems. We will pass the
`cleaningFee` to this form as a new prop.

```diff
  <BookingDatesForm
    className={css.bookingForm}
    formId="BookingPanel"
    submitButtonWrapperClassName={css.bookingDatesSubmitButtonWrapper}
    unitType={unitType}
    onSubmit={onSubmit}
    price={price}
    listingId={listing.id}
    isOwnListing={isOwnListing}
    timeSlots={timeSlots}
    fetchTimeSlotsError={fetchTimeSlotsError}
    onFetchTransactionLineItems={onFetchTransactionLineItems}
    lineItems={lineItems}
    fetchLineItemsInProgress={fetchLineItemsInProgress}
    fetchLineItemsError={fetchLineItemsError}
+  cleaningFee={cleaningFee}
  />
```

### Add cleaning fee checkbox

Next, we need to add a new field to _BookingDatesForm_ for selecting the
possible cleaning fee. For this, we will use the `FieldCheckbox` component
because want the cleaning fee to be optional.

```shell
└── src
    └── forms
        └── BookingDatesForm
            └── BookingDatesForm.js
```

In _BookingDatesForm_ we need to import a couple of new resources we will need
for adding the cleaning fee. These will be some helper functions needed to
handle the cleaningFee price information and the checkbox component
`FieldCheckbox`.

```diff
  import { propTypes } from '../../util/types';
+ import { formatMoney } from '../../util/currency';
+ import { types as sdkTypes } from '../../util/sdkLoader';
  import config from '../../config';
  import {
    Form,
    IconSpinner,
    PrimaryButton,
    FieldDateRangeInput,
+   FieldCheckbox,
} from '../../components';
 import EstimatedBreakdownMaybe from './EstimatedBreakdownMaybe';

 import css from './BookingDatesForm.css';
+ const { Money } = sdkTypes;
```

When we have imported these files, we will add the component for showing the
checkbox for selecting the cleaning fee. For this, we need to extract the
cleaningFee from `fieldRenderProps`.

```diff
    ...
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
+   cleaningFee,
  } = fieldRenderProps;
```

We want show the amount of cleaning fee to the user in the checkbox label so we
need to format the cleaningFee to printable form. For this we want to use
`formatMoney` function which will use localized formatting. This function
expects Money object as parameter so we need to do the conversion.

```jsx
const formattedCleaningFee = cleaningFee
  ? formatMoney(intl, new Money(cleaningFee.amount, cleaningFee.currency))
  : null;

const cleaningFeeLabel = intl.formatMessage(
  { id: 'BookingDatesForm.cleaningFeeLabel' },
  { fee: formattedCleaningFee }
);
```

We will also add new translation key `BookingDatesForm.cleaningFeeLabel` to
en.json file where we can use `fee` variable to show the price.

```js
  "BookingDatesForm.cleaningFeeLabel": "Cleaning fee: {fee}",
```

Because there might be listing's without cleaning fee, we want to show the
checkbox only when needed. This is why we will create the `cleaningFeeMaybe`
component which is rendered only if the listing has the cleaning fee saved to
the public data.

```jsx
const cleaningFeeMaybe = cleaningFee ? (
  <FieldCheckbox
    id="cleaningFee"
    name="cleaningFee"
    label={cleaningFeeLabel}
    value="cleaningFee"
  />
) : null;
```

Then we can add the `cleaningFeeMaybe` to the `Form` component

```diff
...
    timeSlots={timeSlots}
    useMobileMargins
    validate={composeValidators(
      required(requiredMessage),
      bookingDatesRequired(startDateErrorMessage, endDateErrorMessage)
    )}
    disabled={fetchLineItemsInProgress}
  />

+ {cleaningFeeMaybe}

  {bookingInfoMaybe}
  {loadingSpinnerMaybe}
  {bookingInfoErrorMaybe}
...
```

After this step, the BookingDatesForm should look like this. You should notice
that the cleaning fee will not be visible in the booking breakdown yet even
though we added the new checkbox.

![Cleaning fee checkbox](./cleaningFeeCheckbox.png)

### Update the bookingData

Next, we want to pass the value of the cleaning fee checkbox forward as part of
the `bookingData`. This is needed so that we can show the selected cleaning fee
as a new row on the booking breakdown. To achieve this, we need to edit the
`handleOnChange` function which takes the values from the form and calls the
`onFetchTransactionLineItems` function for constructing the transaction line
items. These line itemas are shown inside the `bookingInfoMaybe` component under
the form fields.

<extraInfo title="What are line items?">

In Flex, the total price of a transaction is defined by its line items. Line
items describe what is included in a transaction. It can be a varying set of
things from the number of booked units to customer and provider commissions,
add-ons, discounts, or payment refunds.

Every line item has a unit price and one of the following attributes: quantity
or percentage. The quantity attribute can be used to denote the number of booked
units, like the number of booked nights. Quantity can also be defined as a
multiplication of units and seats. The percentage param is used when modeling
commissions for example. Based on these attributes a line total is calculated
for each line item. Line totals then define the total payin and payout sums of
the transaction.

You can read more about line items and pricing from
[pricing background article](https://www.sharetribe.com/docs/background/pricing/).

</extraInfo>

In the `bookingData` object, we will have all the information about the user's
choices. In this case, it means booking dates and if they selected the cleaning
fee or not. We only need the information if the cleaning fee was selected. We
will fetch the cleaning fee details from Marketplace API later in the
FTW-backend to make sure this information can't be manipulated.

In our case, because there is just one checkbox, it's enough to check the length
of that array to determine if any items are selected. If the length of the
cleaningFee array inside values is bigger than 0, the `hasCleaningFee` param is
true and otherwise false. If we hade more than one item in the checkbox group
then we should check which items were selected.

```jsx
  handleOnChange(formValues) {
    const { startDate, endDate } =
      formValues.values && formValues.values.bookingDates ? formValues.values.bookingDates : {};
    const hasCleaningFee =
      formValues.values.cleaningFee && formValues.values.cleaningFee.length > 0;

    const listingId = this.props.listingId;
    const isOwnListing = this.props.isOwnListing;

    if (startDate && endDate && !this.props.fetchLineItemsInProgress) {
      this.props.onFetchTransactionLineItems({
        bookingData: { startDate, endDate, hasCleaningFee },
        listingId,
        isOwnListing,
      });
    }
  }
```

## Add a new line-item for the cleaning fee

Finally, we need to edit the FTW-backend and add new line item for cleaning fee
so that it will be included in pricing. Flex uses privileged transitions to
ensure that the pricing logic is handled in a secure environment. This means
that constructing line items and transitioning requests of privileged
transitions are made from the server-side.

<extraInfo title="What are privileged transitions and why we use them?">

Privileged transitions are transaction process transitions that can be invoked
only from a secure context. For example, when using Flex Templates for Web this
secure context is FTW-backend. You can also build your own server-side
validation that sits between your marketplace UI and the Flex Marketplace API to
invoke privileged transitions.

We are using privileged transitions and FTW-backend for constructing line items
because we want to make sure this is done in a secure context. If the
client-side code (FTW-frontend) could freely construct the line items, we
couldn't fully trust that the price calculation follows the model intended in
the marketplace. In theory, a marketplace user could make a direct API call to
the Flex Marketplace API and start a transaction with modified line items (e.g.
change the amount of cleaning fee). When we use the privileged transitions and
fetch the pricing information like the cleaning fee amount directly from
Marketplace API in FTW-backend, we can avoid this security risk.

You can read more about privileged transitions from
[privileged transitions background article](/background/privileged-transitions/).

</extraInfo>

When we want to add a new line item for cleaning fee, we'll need to update the
pricing logic in the `/server/api-util/lineItems.js` file:

```shell
└── server
    └── api-util
        └── lineItems.js
```

### Resolve the cleaning fee

First, we will add a new helper function for resolving the cleaning fee line
item. This function will take the listing as a parameter and then get the
cleaning fee from its public data. We don't want to pass this data from
FTW-frontend directly so it' can be not manipulated. Instead, we check it from
the listing that was fetched from Marketplace API.

If you have many helper functions you might want to add the to
`/server/api-utli/lineItemHelpers.js` file instead.

```jsx
const resolveCleaningFeePrice = listing => {
  const publicData = listing.attributes.publicData;
  const cleaningFee = publicData && publicData.cleaningFee;
  const { amount, currency } = cleaningFee;

  if (amount && currency) {
    return new Money(amount, currency);
  }

  return null;
};
```

### Add line-item

Now the transactionLineItems function can be updated to also provide the
cleaning fee line item in case the listing has a cleaning fee configured.

In this example, we decided that the provider commission is calculated from the
total of booking and cleaning fees. That's why we need to add the `cleaningFee`
item also to `calculateTotalFromLineItems(...)` function on providerCommission
line item. If we don't add the cleaning fee there the provider commission is
calculated only based on the booking fee.

Remember also to add cleaning fee to `lineItems` array which is returned in the
end of the function.

```diff
exports.transactionLineItems = (listing, bookingData) => {
  const unitPrice = listing.attributes.price;
  const { startDate, endDate, hasCleaningFee } = bookingData;

  const booking = {
    code: 'line-item/night',
    unitPrice,
    quantity: calculateQuantityFromDates(startDate, endDate, unitType),
    includeFor: ['customer', 'provider'],
  };

+ const cleaningFeePrice = hasCleaningFee ? resolveCleaningFeePrice(listing) : null;
+ const cleaningFee = cleaningFeePrice
+   ? [
+       {
+         code: 'line-item/cleaning-fee',
+         unitPrice: cleaningFeePrice,
+         quantity: 1,
+         includeFor: ['customer', 'provider'],
+       },
+     ]
+   : [];
+

  const providerCommission = {
    code: 'line-item/provider-commission',
+   unitPrice: calculateTotalFromLineItems([booking, ...cleaningFee]),
    percentage: PROVIDER_COMMISSION_PERCENTAGE,
    includeFor: ['provider'],
  };

+ const lineItems = [booking, ...cleaningFee, providerCommission];

  return lineItems;
};
```

Once we have done the changes to FTW-backend we can check the booking breakdown
again. Now if you choose the cleaning fee, you should see the cleaning fee also
in the booking breakdown:

![Cleaning fee in booking breakdown](./cleaningFeeBookingBreakdown.png)
