---
title: How to remove Stripe and payments
slug: removing-stripe-and-payments
updated: 2023-09-04
category: how-to-payments
ingress:
  In some cases, you might want to remove Stripe integrations or even
  all the payments from Sharetribe Web Template. This article gives you
  a starting point for these customizations.
published: true
---

## Removing Stripe

In this guide, we will go through the minimum changes needed to make the
booking flow work without Stripe. This is not an easy customization
project.

The Sharetribe Web Template works with specific transaction processes
and payments are a core feature of the booking and purchase processes:
the ubiquitous nature means that you need to touch several components
and files. Most likely you need to customize some parts (e.g.
transaction process, email templates, checkout page) more depending on
your marketplace idea. For example, you might also want to remove unused
Stripe components from your project to clean up the code.

<info>

The template supports the _default-inquiry_ process, which does not
include bookings or stock reservations. This process is the easiest way
to use a marketplace without Stripe. However, if you do want to use
bookings or stock reservations without Stripe, you will need to follow
the steps in this guide.

</info>

### 1. Update the transaction processes and remove Stripe related actions

You need to remove at least the following actions:

- :action/stripe-create-payment-intent
- :action/stripe-capture-payment-intent
- :action/stripe-confirm-payment-intent
- :action/stripe-create-payout
- :action/stripe-refund-charge
- :action/stripe-refund-payment

If you are using the template default processes with strong customer
authentication (e.g. `default-booking` or `default-purchase`) you need
to remove confirming the payment. Otherwise, the transaction will get
stuck. The simplest way to do this is to remove `pending-payment` and
`expire-payment` states and point `request-payment` and
`request-payment-after-inquiry` directly to the following state –
`preauthorized` in `default-booking` and `purchased` in
`default-purchase`.

However, when you are building the transaction process to your
marketplace it might make sense to rename some of the states and
transitions so that they make more sense in your use-case. For instance,
_preauthorized_ state refers to the state of payment - it is
preauthorized to be captured.

#### Edit the transaction process file to reflect the changes in your transaction process

The
[src/transactions/transaction.js](https://github.com/sharetribe/web-template/blob/main/src/transactions/transaction.js)
has a number of helper functions that are used to determine which state
the transaction is. Depending on the transaction process being used, the
_transaction.js_ file refers to either
_src/transactions/transactionProcessBooking.js_ or
_src/transactions/transactionProcessPurchase.js_ for the correct states
in each process. The transaction process file should be updated to match
the new transaction process.
[Read more about editing transaction related files](/how-to/change-transaction-process-in-template/#2-update-the-relevant-files-in-srctransactions-folder).

Example:

```diff
     [STATE_INITIAL]: {
       on: {
         [TRANSITION_INQUIRE]: STATE_INQUIRY,
-        [TRANSITION_REQUEST_PAYMENT]: STATE_PENDING_PAYMENT,
+        [TRANSITION_REQUEST_PAYMENT]: STATE_PREAUTHORIZED,
       },
     },
     [STATE_INQUIRY]: {
       on: {
-        [TRANSITION_REQUEST_PAYMENT_AFTER_INQUIRY]: STATE_PENDING_PAYMENT,
+        [TRANSITION_REQUEST_PAYMENT_AFTER_INQUIRY]: STATE_PREAUTHORIZED,
       },
     },
-
-    [STATE_PENDING_PAYMENT]: {
-      on: {
-        [TRANSITION_EXPIRE_PAYMENT]: STATE_PAYMENT_EXPIRED,
-        [TRANSITION_CONFIRM_PAYMENT]: STATE_PREAUTHORIZED,
-      },
-    },
-
-    [STATE_PAYMENT_EXPIRED]: {},
     [STATE_PREAUTHORIZED]: {
       on: {
         [TRANSITION_DECLINE]: STATE_DECLINED,

```

### 2. Remove Stripe checks from EditListingWizard

In
[`EditListingWizard.js`](https://github.com/sharetribe/web-template/blob/main/src/containers/EditListingPage/EditListingWizard/EditListingWizard.js)
we are checking if the provider has a Stripe account with all the
required information before we allow them to publish listings. This
check is done in the `handlePublishListing` function and needs to be
removed.

```js
  handlePublishListing(id) {
    this.props.onPublishListingDraft(id);
  }
```

After changing the `handlePublishListing` you can remove unused code.
You also might want to clean up `EditListingPage` and remove the Stripe
related props we pass to `EditListingWizard`.

### 3. Edit CheckoutPage

Removing Stripe from `CheckoutPage` is probably the most complicated
task in this list because the Strong Customer Authentication (SCA) and
ability to save payment method have added a lot of logic to the current
page.

By default, the `CheckoutPage` component uses two sub-components,
depending on the transaction process:

- _CheckoutPageWithInquiryProcess_ is used with the default free inquiry
  process
- _CheckoutPageWithPayment_ is used with the default booking and
  purchase processes

We can use an edited version of the _CheckoutPageWithPayment_ component,
titled _CheckoutPageWithoutPayment_, as a starting point for the
modifications.

- [CheckoutPageWithoutPayment.js](CheckoutPageWithoutPayment.js)

The _CheckoutPageWithoutPayment_ component also imports a
_SimpleOrderForm_ component. Let's add the component to the
StripePaymentForm folder.

```shell
  └── src
      └── containers
          └── CheckoutPage
              └── StripePaymentForm
                  └── SimpleOrderForm.js
```

- [SimpleOrderForm.js](SimpleOrderForm.js)

To use _CheckoutPageWithoutPayment_, we need to make these changes to
existing components:

- Export a _processCheckoutWithPayment_ function from
  _src/containers/CheckoutPage/CheckoutPageTransactionHelpers.js_

```jsx
export const processCheckoutWithoutPayment = (orderParams, extraParams) => {
  const {
    message,
    onInitiateOrder,
    onSendMessage,
    pageData,
    process,
    setPageData,
    sessionStorageKey,
  } = extraParams;

  const storedTx = ensureTransaction(pageData.transaction);

  const processAlias = pageData?.listing?.attributes?.publicData?.transactionProcessAlias;

  ////////////////////////////////////////////////
  // Step 1: initiate order                     //
  // by requesting booking from Marketplace API //
  ////////////////////////////////////////////////
  const fnRequest = fnParams => {
    // fnParams should be { listingId, deliveryMethod, quantity?, bookingDates?, protectedData }

    const requestTransition =
      storedTx?.attributes?.lastTransition === process.transitions.INQUIRE
        ? process.transitions.REQUEST_PAYMENT_AFTER_INQUIRY
        : process.transitions.REQUEST_PAYMENT;
    const isPrivileged = process.isPrivileged(requestTransition);

    onInitiateOrder(
      fnParams,
      processAlias,
      storedTx.id,
      requestTransition,
      isPrivileged
    ).then(order => {
      // Store the returned transaction (order)
      persistTransaction(order, pageData, storeData, setPageData, sessionStorageKey);
    });

    return orderPromise;
  };

  //////////////////////////////////
  // Step 2: send initial message //
  //////////////////////////////////
  const fnSendMessage = fnParams => {
    const orderId = fnParams?.id;
    return onSendMessage({ id: orderId, message });
  };

  /////////////////////////////////
  // Call each step in sequence //
  ////////////////////////////////

  return fnRequest(orderParams).then(res => fnSendMessage({...res}))
};
};
```

- Import and use _loadInitialData_ instead of
  _loadInitialDataForStripePayments_ in _CheckoutPage.js_.

```jsx
if (getProcessName(data) !== INQUIRY_PROCESS_NAME) {
  // Fetch speculateTransition for transactions that include bookings or purchases
  loadInitialData({
    pageData: data || {},
    fetchSpeculatedTransaction,
    config,
  });
}
```

### 4. Hide/remove Stripe related pages

If you are not using Stripe, you should remove or at least hide the
pages that are meant for managing the information saved to Stripe. These
pages are
[StripePayoutPage](https://github.com/sharetribe/web-template/tree/main/src/containers/StripePayoutPage)
and
[PaymentMethodsPage](https://github.com/sharetribe/web-template/tree/main/src/containers/PaymentMethodsPage).
Both of these pages are accessible through the account settings so we
want to remove them from both navigation component and route
configuration.

Changes to `LayoutWrapperAccountSettingsSideNav`

```diff
        name: 'PasswordChangePage',
      },
    },
-    {
-      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.paymentsTabTitle" />,
-      selected: currentTab === 'StripePayoutPage',
-      id: 'StripePayoutPageTab',
-      linkProps: {
-        name: 'StripePayoutPage',
-      },
-    },
-    {
-      text: <FormattedMessage id="LayoutWrapperAccountSettingsSideNav.paymentMethodsTabTitle" />,
-      selected: currentTab === 'PaymentMethodsPage',
-      id: 'PaymentMethodsPageTab',
-      linkProps: {
-        name: 'PaymentMethodsPage',
-      },
-    },
  ];

  return <LayoutWrapperSideNav tabs={tabs} />;
```

Changes to `routeConfiguration.js`

```diff
-export const ACCOUNT_SETTINGS_PAGES = [
-  'ContactDetailsPage',
-  'PasswordChangePage',
-  'StripePayoutPage',
-  'PaymentMethodsPage',
-];
+export const ACCOUNT_SETTINGS_PAGES = ['ContactDetailsPage', 'PasswordChangePage'];
```

### Extra: Removing unused exports

This is not a mandatory step to do but if you want to clean up the code
you can go through the `components/index.js` and `containers/index.js`,
and remove the Stripe components. After this, you should go through the
whole codebase and remove all the references to these components. We
have tried to follow the naming pattern where Stripe related components
have `Stripe` in their name but there are a couple of exceptions like
`PaymentMethodsPage`. All these components should be removed also from
`examples.js`.

Stripe related components:

- StripeBankAccountTokenInputField
- StripeConnectAccountStatusBox
- StripePaymentAddress
- StripePayoutPage
- PaymentMethodsPage
- PaymentMethodsForm
- StripePaymentForm
- StripeConnectAccountForm

You can also remove Stripe script form
[public/index.html](https://github.com/sharetribe/web-template/blob/main/public/index.html#L171).

## Removing payments

If you want to remove payments completely from your marketplace, there
are even more things to consider. Again it depends a lot on your
use-case what kind of changes are needed. If you e.g. want to add a
transaction process with free bookings or purchases, you need to build
the conditional logic for showing pricing components when needed and
hiding them when not. If you want to build the marketplace completely
without payments, you most likely want to hide all the references to
listing price.

### More changes to the transaction process

Remove the actions related to payments, e.g.
`:action/privileged-set-line-items` and `:action/calculate-full-refund`
in the default processes. Read more about actions in the
[transaction process actions refrence article.](/references/transaction-process-actions/)
Remember to also update email templates that contain pricing
information.

### Edit API calls in client app's server

You will need to edit the API calls in your client app's server. If
there are no payments used, there is most likely no need for calculating
line items, so we can remove `transactionLineItems` function calls from
API endpoints. Depending on your use case, you may or may not want to
use the privileged transitions at all. However, in case you are updating
e.g. transaction protected data, it is a good practice to do that safely
in the template's backend.

### Other code changes

Especially if you are removing the payment completely from your
marketplace, you should also go through all these pages to hide or
remove the parts related to payments.

- ListingPage, CheckoutPage, TransactionPage: Remove or hide
  `OrderBreakdown` component when the transaction is free
- EditListingPage: remove pricing tab from `EditListingWizard`
- SearchPage: remove price filter & edit `ListingCard` so that it
  doesn't show the listing price
