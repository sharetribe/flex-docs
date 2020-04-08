---
title: How saving a payment card works in FTW
slug: save-payment-card
updated: 2019-09-06
category: cookbook-payments
ingress:
  An overview of how the Flex Template for Web functionality for storing
  payment cards works.
published: true
---

## Introduction

When a customer first comes to the marketplace and books a listing,
there are several form fields the user needs to fill: expiration month,
card verification code (CVC), card holder's name and possibly other
billing details. To improve user experience for returning customers,
it's good to have an option to save payment card details for future
bookings. If there is an existing payment card available, the user can
just click the "Send request" button to complete checkout page.

From that point forward, the typical case is that customer pays upfront
(aka makes an
[on-session](https://stripe.com/docs/payments/cards/reusing-cards#charging-on-session)
payment). In practice, a preauthorization is created: the money is
reserved, but not yet moved to Stripe. When a provider accepts the
request, the preauthorization is captured (i.e. the payment is charged
from the card and money moved to Stripe and held on the connected
account of the provider until payout). The actual payout happens when
the transaction completes.

Payment card needs also be saved for off-session payments if those are
in use. They are automatic one-time payments that happen when the user
is not interacting with your application. You can read more about
off-session payments from a separate
[article](/background/off-session-payments-in-transaction-process).

> Note: saving payment card was added to FTW in version v3.3.0.

## Saving card details

There are 2 ways to save payment card details:

- saving cards details without making an initial payment
- saving cards details after a payment

The former of those can be done in payment methods page (profile menu ->
account settings -> payment methods), but you can also save payment card
details on the checkout page when making a one-time payment.

> Note: currently, it is only possible to save one card, which becomes
> the default payment method. I.e. if there is already one payment card
> saved, your only option is to replace the card with a new one.

### Saving cards without making an initial payment

If the user has no existing default payment card, `PaymentMethodsPage`
component will show just a form to save payment card details:

![Payment methods page](payment-methods-page.png 'Payment methods page without default payment method.')

If there is a default payment methods saved, user will see a dropdown
instead, where the current default method is selected. There are two
options the user can do: replace the current payment card (it's an
option inside the dropdown) or delete the current payment card.

![Payment methods page saved card](payment-methods-page-saved-card.png 'Payment methods page with default payment method.')

Under the hood, saving a new payment method needs to complete following
steps:

- Create Stripe
  [Setup Intent](https://www.sharetribe.com/api-reference/marketplace.html#stripe-setup-intents)
  through Flex API to obtain the client secret.
- Call `stripe.handleCardSetup` with the client secret
  - `stripe.handleCardSetup` will handle user actions like 3D Secure
    authentication
- Save payment method:
  - Create a new Stripe Customer if needed and attach the new payment
    method to `stripeCustomer` entity.
  - There's no replace or update option for `defaultPaymentMethod`
    entity. To replace a payment card, one needs to remove previous card
    first and then add a new payment method.

### Saving cards after a payment

If the user doesn't have a default payment card saved, or if she is
making a one-time payment with a different payment card, there's an
option (checkbox) to save the new payment card as the default payment
method.

![One-time payment and saving card details for future use](one-time-payment.png 'One-time payment and saving card details for future use')

If the default payment method exists, user needs to select one-time
payment first and then she is able to replace the default card.

![Pay with one-time payment card](pay-with-new-one-time-card.png 'Pay with one-time payment card')

**Under the hood, there are few changes made to the Payment Intents
checkout flow:**

- We need to know if the user has already saved a default payment
  method:
  - Fetch `currentUser` entity with
    `stripeCustomer.defaultPaymentMethod` relationship
- Show correct form fields:
  - If there's a default payment method saved: show SavedCardDetails
    component. That component allows you to also select one-time payment
    instead (and optionally replace the current default payment method
    with this new payment card). If there's no default payment method
    saved, one-time payment form is shown on its own.
  - One-time payment needs card details, card holder's name etc. and
    optional permission to save card details for future bookings.
- In `request-payment` transition, a new parameter needs to be passed if
  card details are saved at the same time: `setupPaymentMethodForSaving`
- `stripe.handleCardPayment` call, `confirm-payment` transition and the
  call to send initial message are handled as before
- Save the payment method if user has given permission to do that:
  - Create a `stripeCustomer` entity for the current user if needed.
  - Attach the created payment method to `stripeCustomer` entity.

> Note: Even if the call to save payment method fails, one-time payment
> itself has succeeded. Therefore, it is better to forward user to
> `TransactionPage` anyway.

### Getting permission to save a card

Once you set up your payment flow to properly save a card with the
Payment Intents or Setup Intents API, Stripe will mark any subsequent
off-session payment as a merchant-initiated transaction to reduce the
need to authenticate. Merchant-initiated transactions require an
agreement (also known as a “mandate”) between you and your customer.
Read more about needed permissions from
[Stripe's documentation](https://stripe.com/docs/payments/cards/reusing-cards#mandates).

## Charging Saved Cards

If the user has a default payment method and she chooses to use it to
book a listing, there are couple of changes needed:

- The id of Stripe's payment method needs to be sent to Flex API as
  `paymentMethod`, when requesting payment.
- `stripe.handleCardPayment`: Stripe Elements (card) is not needed if
  the default payment method is used.

## Saving Payment Card with PaymentIntents payment flow

Here's the description of complete call sequence on CheckoutPage.

**Note: PaymentIntents flow needs transaction process change as
described in doc:**

[Enable Payment Intents if you are using an old version of FTW](/cookbook-payments/enable-payment-intents/)

### Initial data for Checkout:

Check if the user has already saved a default payment method. Fetch
currentUser entity with `stripeCustomer.defaultPaymentMethod`
relationship. In FTW, we call a thunk function:
[`fetchCurrentUser` in CheckoutPage.duck.js](https://github.com/sharetribe/flex-template-web/blob/master/src/containers/CheckoutPage/CheckoutPage.duck.js#L302).

Behind the scenes, this is essentially the following call:

```js
sdk.currentUser.show({
  include: ['stripeCustomer.defaultPaymentMethod'],
});
```

### StripePaymentForm changes - show correct form fields:

If there's a default payment method saved: show SavedCardDetails
component. That component allows you to also select one-time payment
instead (and optionally replace the current default payment method with
this new payment card). If there's no default payment method saved,
one-time payment form is shown on its own. One-time payment needs card
details, card holder's name etc. and optional permission to save card
details for future bookings.

### Submit StripePaymentForm

After submitting `StripePaymentForm`, there are up to 5 calls in
sequence (to Flex and Stripe APIs):

###### Step 1.

```js
sdk.transactions
  .initiate({ processAlias, transition: 'transition/request-payment', ...})
```

What happens behind the scene:

- API creates PaymentIntent against Stripe API and returns
  stripePaymentIntentClientSecret inside transaction's protectedData.
- Booking is created at this step - so, availability management will
  block dates for conflicting bookings.
- Automatic expiration happens in 15 minutes, if process is not
  transitioned to 'transition/confirm-payment' before that.
- After this call, created transaction is saved to session storage in
  FTW (or existing enquiry tx is updated).

**When you intend to save card details**, a new parameter needs to be
passed if card details are saved at the same time:
`setupPaymentMethodForSaving`

```js
sdk.transactions.initiate({
  processAlias,
  transition: 'transition/request-payment',
  params: {
    listingId,
    bookingStart,
    bookingEnd,
    setupPaymentMethodForSaving: true,
  },
});
```

**When you are using previously saved payment card**, the id of Stripe's
payment method needs to be sent to Flex API as `paymentMethod`, when
requesting payment.

```js
sdk.transactions.initiate({
  processAlias,
  transition: 'transition/request-payment',
  params: {
    listingId,
    bookingStart,
    bookingEnd,
    paymentMethod: stripePaymentMethodId,
  },
});
```

> Note: params might be different in different transaction process
> graphs.

Check
[`initiateOrder` thunk function](https://github.com/sharetribe/flex-template-web/blob/master/src/containers/CheckoutPage/CheckoutPage.duck.js#L171)
and related
[`orderParams`](https://github.com/sharetribe/flex-template-web/blob/master/src/containers/CheckoutPage/CheckoutPage.js#L373)
from FTW.

###### Step 2.

```js
stripe.handleCardPayment(stripePaymentIntentClientSecret, [
  card,
  paymentParams,
]);
```

> Note: card (StripeElement), and paymentParams are not needed when
> using previously saved payment card. FTW handles this in
> [`handleCardPayment` thunk function](https://github.com/sharetribe/flex-template-web/blob/master/src/ducks/stripe.duck.js#L657).

Stripe's frontent script checks if PaymentIntent needs extra actions
from customer. Some payments might need Strong Customer Authentication
(SCA). In practice, Stripe's script creates a popup (iframe) to card
issuers site, where 3D secure v2 authentication flow can be completed.

###### Step 3.

```js
sdk.transactions.transition({
  id: transactionId,
  transition: 'transition/confirm-payment',
  params,
});
```

Inform Marketplace API, that PaymentIntent is ready to be captured after
possible SCA authentication has been requested from user. FTW does that
in
[`confirmPayment` thunk call](https://github.com/sharetribe/flex-template-web/blob/master/src/containers/CheckoutPage/CheckoutPage.duck.js#L206)

###### Step 4.

```js
sdk.messages.send({ transactionId: orderId, content: message });
```

FTW sends an initial message to transaction if customer has added a
message.

###### Step 5.

As a final step, we need to save the payment method, if customer has
selected the "Save for later use" checkbox. So, this is relevant if user
has selected onetime payment - instead of making a charge from the
previously saved credit card.

On FTW, we call
[savePaymentMethod function](https://github.com/sharetribe/flex-template-web/blob/master/src/ducks/paymentMethods.duck.js#L200)
that creates stripe customer and adds updates default payment method.

There are 3 different scenarios, which require different calls to Flex
API:

**1. No StripeCustomer entity connected to Flex API:**

```js
sdk.stripeCustomer.create(
  { stripePaymentMethodId },
  { expand: true, include: ['defaultPaymentMethod'] }
);
```

FTW:
[`dispatch(createStripeCustomer(stripePaymentMethodId))`](https://github.com/sharetribe/flex-template-web/blob/master/src/ducks/paymentMethods.duck.js#L136)

**2. Current user has already defaultPaymentMethod - 2 calls:**

```js
=> sdk.stripeCustomer.deletePaymentMethod({}, { expand: true })
=> sdk.stripeCustomer.addPaymentMethod({ stripePaymentMethodId }, { expand: true })
```

FTW:
[`dispatch(updatePaymentMethod(stripePaymentMethodId))`](https://github.com/sharetribe/flex-template-web/blob/master/src/ducks/paymentMethods.duck.js#L181)

**3. Current user has StripeCustomer entity connected, but no
defaultPaymentMethod:**

```js
=> sdk.stripeCustomer.addPaymentMethod({ stripePaymentMethodId }, { expand: true })
```

FTW:
[`dispatch(addPaymentMethod(stripePaymentMethodId))`](https://github.com/sharetribe/flex-template-web/blob/master/src/ducks/paymentMethods.duck.js#L151)

After these steps, customer is redirected to inbox and the ball is
thrown to Provider to accept or decline the booking.
