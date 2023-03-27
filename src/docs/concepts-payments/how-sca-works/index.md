---
title: How Strong Customer Authentication works
slug: strong-customer-authentication
updated: 2021-10-04
category: concepts-payments
ingress:
  This article gives an overview of Strong Customer Authentication, a
  way to add additional security to online payments required by European
  legislation.
published: true
---

European regulation requires
[Strong Customer Authentication (SCA)](https://stripe.com/guides/strong-customer-authentication)
for online payments from European customers.

This means that customers are sometimes asked to verify their purchases
by an additional security layer called
[3D Secure 2](https://stripe.com/gb/guides/3d-secure-2). Typically, this
means that an online payment has to be verified via a customer’s online
bank or mobile verification when conducting the payment.

The default [transaction process](/concepts/transaction-process/) of
Sharetribe Flex and the
[Sharetribe Web Template](https://github.com/sharetribe/web-template/)
offer out-of-the-box support for SCA. This article clarifies how exactly
transactions using SCA will work in the default process.

_Remember that this is just a default:_ you can make adjustments to this
process as you wish, as long as you comply with the SCA requirements
when dealing with payments by European customers.

## How payment with SCA works

From the customer's perspective, most transactions are business as
usual: they make the payment normally by entering their credit card
details, and that's it. However, on some occasions, they are presented
with a popup that requires them to connect to their online bank to
verify the transaction. The experience that follows depends on the bank
of the customer. Each bank has their own user interface for this
process. The example below is from a Finnish bank Osuuspankki.

![SCA in action](sca_op_authentication.png 'SCA in action')

At the point when the popup is presented, the transaction has already
been initiated. If your marketplace is using availability management,
the corresponding slots have been booked from the calendar of the
provider, and the provider already sees that a transaction has been
initiated if they go to their inbox. They also notice that it's still
pending payment verification.

![Pending payment](sca_pending_payment.png 'Pending payment')

By default, the provider doesn't get an email notification about the
transaction yet at this point because the payment has not yet been
completed.

The customer now has 15 minutes to verify their transaction through
their online bank. If this is done successfully, their credit card is
preauthorized normally, and the provider is notified of an incoming
booking by email.

If the customer fails to verify the transaction during the 15-minute
timeframe, the transaction is automatically moved to the state "payment
expired". At this point, the booking is canceled, and the booked dates
or time slots are freed. If the customer wanted to try the purchase
again, they'd have to initiate a new transaction. Both parties will
continue to see the expired booking in their inboxes.

![Payment expired](sca_payment_expired.png 'Payment expired')

## What to do if SCA fails?

If the customer fails to verify the transaction within the 15-minute
timeframe, it's probably a good idea that you contact the customer in
question to ask what went wrong. After all, they entered their credit
card details and pressed the button to initiate the booking request, so
they clearly want to go through with the booking. In Console, you can
easily see all the transactions that failed because a payment expired.

![Expired payment in Console](sca_console.png 'Expired payment in Console')

If you want, you can also decide to notify the provider automatically by
email if there's a failed payment. This allows the provider to go to
their inbox and send a message to the customer to help them complete the
booking.

## Should you use SCA in your marketplace?

If you want to be able to accept payments from European customers in
your marketplace, your payment process must support SCA starting from
September 14th, 2019. After this date, payments done by European credit
cards with a payment process that doesn't support SCA might fail.

Even if you don't need to accept payments from European customers, it
might still make sense for you to enable SCA for all transactions
happening in your marketplace. The reason for this is that payments that
have been successfully authenticated using 3D Secure are covered by a
_liability shift_. From
[Stripe documentation](https://stripe.com/docs/payments/3d-secure#disputed-payments):
_"Should a 3D Secure payment be disputed as fraudulent by the
cardholder, the liability shifts from you to the card issuer. These
types of disputes are handled internally, do not appear in the
Dashboard, and do not result in funds being withdrawn from your Stripe
account."_

Credit card disputes can be costly to a marketplace. If disputes are
causing you problems, enabling SCA can be a good idea.

## How to take SCA into use in your marketplace

<info>

If you created your Flex instance after July 2019, SCA is already
enabled in your marketplace. You don't need to do anything to make it
work.

</info>

If your Flex instance was created before July 2019, you will need to
update your transaction process.
[Learn more about how the transaction process supporting SCA and Stripe integration works](/concepts/payment-intents/).
If you're developing on the Sharetribe Web Template, your user interface
already supports SCA, but if you're using an old legacy template without
this feature, you will also need to update your checkout user interface.
[Learn more about how to take SCA and Payment Intents into use](/how-to/enable-payment-intents/).

If your marketplace has been processing transactions without SCA in the
past, it's a good idea to make a couple of test payments with a real
credit card before publishing the change to your users, so that you can
see the SCA payment flow in action.
