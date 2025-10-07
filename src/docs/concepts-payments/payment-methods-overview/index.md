---
title: Payment methods overview
slug: payment-methods-overview
updated: 2023-10-24
category: concepts-payments
ingress:
  This article provides an overview of different payment methods in
  Sharetribe.
published: true
---

## Introduction to payments in Sharetribe

Enabling customers to pay for their bookings and handle the transaction
flow efficiently is one of the most valuable features of Sharetribe.
Sharetribe leverages Stripe for payments and offers multiple different
ways for customers to pay for transactions. The following are the
currently supported payment methods, divided into two categories - pull
and push payment methods:

- Pull payment methods
  - card payments
  - similar to card payments (Google Pay, Apple Pay, Microsoft Pay)
- Push payment methods
  - Alipay
  - Bancontact
  - EPS
  - giropay
  - iDEAL
  - Przelewy24

In Stripe's terms, Sharetribe supports payment methods that have
_immediate payment confirmation_ (see the table
[in this section of Stripe's guide to payments](https://stripe.com/en-fi/payments/payment-methods-guide#2-choosing-the-right-payment-methods-for-your-business))
and that are supported by Stripe's PaymentIntents API. Mostly, these
payment methods fall under either Cards,
[Bank redirects](https://stripe.com/docs/payments/payment-methods/overview#bank-redirects),
or
[Wallets](https://stripe.com/docs/payments/payment-methods/overview#wallets)
in Stripe's classification.

<warning>

Sharetribe does not support payment methods that require the use of
Stripe's older Sources API.

</warning>

This article presents how payments flow depending on whether you use
card (or similar) payments or have enabled any other push payment
method. The article also describes the tradeoffs you need to consider in
designing the transaction process involving payments.

## Money flow in different scenarios

Understanding how money flows when using card payments or push payments
is crucial for understanding how to design the transaction process in
Sharetribe.

### Card payment flow

For card payments, the payment flow starts with a preauthorization. The
money is reserved but not yet charged from the customer's credit card.
After a charge, Stripe moves money to the provider's Connect Account
Balance in Stripe and holds it there until a payout is issued.

![Card payment flow](card-payment-flow.png 'Card payment flow in Sharetribe.')

The preauthorization is valid for seven days, after which Stripe
automatically releases it. You can use the preauthorization to configure
the transaction process to allow the provider to accept or decline the
transaction. If the provider declines the transaction, Stripe collects
no processing fees since money has not been transferred.

In the default purchase and negotiation processes, a charge is made
immediately after payment, so there is no preauthorization period. This
means that refunds can be issued only at a point where money has already
moved and the marketplace must cover Stripe fees.

The transaction process can hold money in Stripe until an explicit
payout (the hold should not exceed 90 days). The mechanism allows you to
build a transaction process where the money is in an escrow-like hold
until an explicit payout. The hold ensures some safety for the customer
as the marketplace controls the money until a payout. The process can
issue the payout in a separate transition.

### Push payment flow

For push payments, there is no preauthorization. Once the customer
confirms the payment, it gets captured automatically and a charge is
made immediately. The charge moves money immediately to the provider's
Stripe Connect account.

![Push payment flow](push-payment-flow.png 'Push payment flow in Sharetribe.')

This means that refunds can be issued only at a point where money has
already moved and the marketplace must cover Stripe fees. You should
take this into account when designing the transaction process of your
marketplace. Either declining the transaction should be disabled,
handled through availability management, or accounted for in
commissions.

The rest of the money flow is the same as with card payments and has the
same features and capabilities.

## Using different payment methods in your marketplace

### Customizing the transaction process

The
[default processes](https://github.com/sharetribe/example-processes/tree/master/)
in Sharetribe supports card payments. The general article on
[the transaction process](/concepts/transaction-process/) describes the
process in more detail.

<info>

Even though Google Pay, Apple Pay, and Microsoft Pay are similar to card
payments, they require some changes to the default implementation of
Sharetribe Web Template. To enable them in the template, you need to
follow the
[Stripe instructions on the Request Payment Button](https://stripe.com/docs/stripe-js/elements/payment-request-button).

</info>

If you wish to enable push payments, you need to adapt your transaction
process. For instance, you need to add a new transition that includes
the
[stripe-create-payment-intent-push](/references/transaction-process-actions/#actionstripe-create-payment-intent-push)
action.

Further, because push payments do not have a preauthorization phase, it
is recommended to avoid that in the transaction process and use an
_instant booking_ type of flow. The example below describes the minimum
recommended changes in the two transitions: `request-push-payment` and
`confirm-payment-instant-booking`. The example illustrates how you can
still use the preauthorization step for card payments.

![Push payment process](push-payment-process.png 'Push payment process example.')

You can find another example process with only an _instant booking_ flow
and support for both card and push payments in the
[Instant booking process](https://github.com/sharetribe/example-processes#instant-booking)
in the
[Sharetribe example transaction processes repository](https://github.com/sharetribe/example-processes).

### Handling payment methods in the client app

See
[this section in the PaymentIntents guide](/concepts/payment-intents/#required-actions-in-the-client).

## Further reading

For further reading on the subject, see the following articles that
describe how to edit the transaction process:

- [How PaymentIntents work](/concepts/payment-intents/)
- [Transaction process](/concepts/transaction-process/)
- [Action reference for Stripe integration](/references/transaction-process-actions/#stripe-integration)
- [Editing transaction process](/how-to/edit-transaction-process-with-sharetribe-cli/)
- [Changing transaction process setup in Sharetribe Web Template](/how-to/change-transaction-process-in-template/)
