---
title: How to remove Stripe and payments
slug: removing-stripe-and-payments
updated: 2020-07-06
category: cookbook-payments
ingress:
  In some cases, you might want to remove Stripe integrations or even all the
  payments from FTW. This article gives you a starting point for these
  customizations.
published: true
---

# Removing Stripe

In this guide, we will go through the minimum changes needed to make the booking
flow work without Stripe. Most likely you need to customize some parts (e.g.
transaction process, email templates, checkout page) more depending on your
marketplace idea. You might also want to remove e.g. unused Stripe components
from your project to clean up the code.

###1. Update the transaction process and remove Stripe related actions

You need to remove at least the following actions:

- :action/stripe-create-payment-intent
- :action/stripe-capture-payment-intent
- :action/stripe-confirm-payment-intent
- :action/stripe-create-payout
- :action/stripe-refund-charge
- :action/stripe-refund-payment

If you are using the FTW default process with strong customer authentication
(e.g. flex-default-process) you need to remove confirming the payment.
Otherwise, the transaction will get stuck. The simplest way to do this is to
remove `pending-payment` and `expire-payment` states and point `request-payment`
and `equest-payment-after-enquiry` directly to `preauthorized` state. However,
when you are building the transaction process to your marketplace it might make
sense to rename some of the states and transitions (e.g. preauthorized) so that
they make more sense in your use-case.

#### Edit util/transaction.js to reflect the changes in your transaction process

In
[src/util/transaction.js](https://github.com/sharetribe/flex-template-web/blob/master/src/util/transaction.js)
file, there are lots of helper functions that are used to determine which state
the transaction is. This file should be updated to match the new transaction
process.
[Read more about editing transaction.js](/cookbook-transaction-process/change-transaction-process-in-ftw/#2-check-if-the-transactionjs-file-needs-to-be-updated)

Example:

```diff
     [STATE_INITIAL]: {
       on: {
         [TRANSITION_ENQUIRE]: STATE_ENQUIRY,
-        [TRANSITION_REQUEST_PAYMENT]: STATE_PENDING_PAYMENT,
+        [TRANSITION_REQUEST_PAYMENT]: STATE_PREAUTHORIZED,
       },
     },
     [STATE_ENQUIRY]: {
       on: {
-        [TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY]: STATE_PENDING_PAYMENT,
+        [TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY]: STATE_PREAUTHORIZED,
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

###2. Remove Stripe checks from EditListingWizard

In
[`EditListingWizard.js`](https://github.com/sharetribe/ftw-daily/blob/master/src/components/EditListingWizard/EditListingWizard.js)
we are checking if the provider has a Stripe account with all the required
information before we allow them to publish listings. This check is done in the
`handlePublishListing` function and needs to be removed.

```js
  handlePublishListing(id) {
    const { onPublishListingDraft} = this.props;
    onPublishListingDraft(id);
  }
```

After changing the `handlePublishListing` you can remove unused code. You also
might want to clean up `EditListingPage` and remove the Stripe related props we
pass to `EditListingWizard`.

###3. Edit ModalMissingInformation

By default,
[`ModalMissingInformation`](https://github.com/sharetribe/ftw-daily/blob/master/src/components/ModalMissingInformation/ModalMissingInformation.js)
will remind users to create a Stripe account. The same modal is used for
reminding about email verification so we should just remove the Stripe related
code from the component.

###4. Edit CheckoutPage

Removing Stripe from `CheckoutPage` is probably the most complicated task in
this list because the Strong Customer Authentication (SCA) and ability to save
payment method have added a lot of logic to the current page. We can use the
[edited version of CheckoutPage from FTW 2.17.1](/tutorial-assets/SimpleCheckoutPage.js)
as a simpler starting point.

Some of the functions on later versions of CheckoutPage.duck.js has changed so
here are the main changes done in the edited code:

- In `handleSubmit` function we only call onInitiateOrder function which
  internally decides if the transaction should be initiated or transitioned. We
  also need to handle sending the possible inital message after that.

```js
  handleSubmit(values) {
    if (this.state.submitting) {
      return;
    }

    this.setState({ submitting: true });

    const initialMessage = values.initialMessage;
    const { history, speculatedTransaction, dispatch, onInitiateOrder, onSendMessage } = this.props;

    // Create order aka transaction
    // NOTE: if unit type is line-item/units, quantity needs to be added.
    // The way to pass it to checkout page is through pageData.bookingData
    const requestParams = {
      listingId: this.state.pageData.listing.id,
      bookingStart: speculatedTransaction.booking.attributes.start,
      bookingEnd: speculatedTransaction.booking.attributes.end,
    };

    const enquiredTransaction = this.state.pageData.enquiredTransaction;
    const transactionIdMaybe = enquiredTransaction ? enquiredTransaction.id : null;

    onInitiateOrder(requestParams, transactionIdMaybe).then(params => {
      onSendMessage({ ...params, message: initialMessage })
        .then(values => {
          const { orderId, messageSuccess } = values;
          this.setState({ submitting: false });
          const routes = routeConfiguration();
          const OrderPage = findRouteByRouteName('OrderDetailsPage', routes);

          // Transaction is already created, but if the initial message
          // sending failed, we tell it to the OrderDetailsPage.
          dispatch(
            OrderPage.setInitialValues({
              initialMessageFailedToTransaction: messageSuccess ? null : orderId,
            })
          );
          const orderDetailsPath = pathByRouteName('OrderDetailsPage', routes, {
            id: orderId.uuid,
          });
          clearData(STORAGE_KEY);
          history.push(orderDetailsPath);
        })
        .catch(() => {
          this.setState({ submitting: false });
        });
    });
  }
```

- Replace `StripePaymentForm` with something else. In this example we have
  simple `bookingForm` which has input for initial message and button for
  booking.

```js
const bookingForm = (
  <FinalForm
    onSubmit={values => this.handleSubmit(values)}
    render={fieldRenderProps => {
      const { handleSubmit } = fieldRenderProps;
      return (
        <Form onSubmit={handleSubmit}>
          {showInitialMessageInput ? (
            <div>
              <h3 className={css.messageHeading}>
                <FormattedMessage id="StripePaymentForm.messageHeading" />
              </h3>

              <FieldTextInput
                type="textarea"
                id={`bookingForm-message`}
                name="initialMessage"
                label={initialMessageLabel}
                placeholder={messagePlaceholder}
                className={css.message}
              />
            </div>
          ) : null}
          <div className={css.submitContainer}>
            <PrimaryButton
              className={css.submitButton}
              type="submit"
              inProgress={this.state.submitting}
              disabled={false}
            >
              Confirm booking
            </PrimaryButton>
          </div>
        </Form>
      );
    }}
  />
);
```

###5. Hide/remove Stripe related pages

If you are not using Stripe you should remove or at least hide the pages that
are meant for managing the information saved to Stripe. These pages are
[StripePayoutPage](https://github.com/sharetribe/ftw-daily/tree/master/src/containers/StripePayoutPage)
and
[PaymentMethodsPage](https://github.com/sharetribe/ftw-daily/tree/master/src/containers/PaymentMethodsPage).
Both of these pages are accessible through the account settings so we want to
remove them from both navigation component and route configuration.

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

This is not a mandatory step to do but if you want to clean up the code you can
go through the `components/index.js`, `containers/index.js` and
`forms/indexs.js`, and remove the Stripe components. After this, you should go
through the whole codebase and remove all the references to these components. We
have tried to follow the naming pattern where Stripe related components have
`Stripe` in their name but there are a couple of exceptions like
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
[public/index.html](https://github.com/sharetribe/ftw-daily/blob/master/public/index.html#L169).

# Removing payments

If you want to remove payments completely from your marketplace, there are even
more things to consider. Again it depends a lot on your use-case what kind of
changes are needed. If you e.g. want to add the second transaction process with
free transactions you need to build the conditional logic for showing pricing
components when needed and hiding them when not. If you want to build the
marketplace completely without payments then you most likely want to hide all
the references to the listing price.

### More changes to the transaction process

Remove the actions related to payments e.g. in flex-default-process
:action/privileged-set-line-items and :action/calculate-full-refund. In older
processes this means actions related to calculating total price, commission etc.
Read more about actions from
[transaction process actions refrence article.](/references/transaction-process-actions/)
Remember also to update email templates which contain pricing information.

### Edit API calls in FTW backend

If you are using FTW-daily v6.0.0 or higher or FTW-hourly v8.0.0 or higher you
need to edit the API calls in your FTW-backend. If there are no payments used
there is most likely no need for calculating the line items so we can remove
`transactionLineItems` function calls from API endpoints. It depends on your
use-case if you want to use the privileged transitions at all but in case you
are updating e.g. transaction protected data, it's a good practice to do that
safely in the FTW-backend.

### Other code changes

Especially if you are removing the payment completely from your marketplace you
should also go through all these pages to hide or remove the parts related to
payments.

- ListingPage, CheckoutPage, TransactionPage: Remove or hide `BookingBreakdown`
  component when the transaction is free
- EditListingPage: remove pricing tab from `EditListingWizard`
- SearchPage: remove price filter & edit `ListingCard` so that it doesn't show
  the listing price
