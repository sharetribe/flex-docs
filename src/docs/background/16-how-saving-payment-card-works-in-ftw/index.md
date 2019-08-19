---
title: How saving payment card works in FTW?
slug: save-payment-card
updated: 2019-08-22
category: background
ingress: Overview of how saving payment card works with Sharetribe Flex.
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
  [Setup Intent](https://www.sharetribe.com/api-reference/index.html#stripe-setup-intents)
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
