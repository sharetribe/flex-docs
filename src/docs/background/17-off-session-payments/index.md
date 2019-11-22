---
title: Automatic off-session payments in transaction process
slug: off-session-payments-in-transaction-process
updated: 2019-08-22
category: background
ingress:
  With off-session payments you can automatically charge your customers
  closer to their booking times. This allows for money to be held in
  Stripe throughout the booking period even when the booking is placed
  long time in advance.
published: true
---

In a typical transaction, the customer pays upfront, but the money is
held until the transaction completes (e.g. until the booking end date)
before it is paid out to the provider's bank account. Normally, the
maximum amount of time the money can be held when using Stripe payments
is 90 days. Therefore, the maximum amount of time customers can book in
advance is limited, if your transaction process follows this payment
pattern.

Flex API now has capabilities for
[saving payment card details for future use](https://www.sharetribe.com/api-reference/marketplace.html#stripe-customer).
In addition, it is now possible to configure your transaction process in
such a way, that the customer is charged automatically off-session at
certain point in time (i.e. when they are not present and interacting
with your web site or app), provided that they have saved a payment card
to their account. This allows you to charge customers closer to their
booking dates, so that the money can be held in Stripe throughout the
booking period.

## Transaction process example

Suppose your sauna rentals marketplace should allow customers to book
saunas up to a year in advance, but the customer is charged only a
certain time in advance before the booking. The figure below illustrates
how a part of your transaction process might look like.

![Example transaction process with delayed payment](tx-delayed-payments.png 'Example transaction process with delayed payment')

In this example, a transaction goes as follows:

1. The customer picks the desired booking dates and initiates a
   transaction. The price of the transaction is calculated, but no
   payment is made at this point.
2. The provider verifies the request and accepts the booking.
3. At a later point in time (1 month before the booking start time in
   the example), an attempt is made to automatically charge the
   customer's stored payment card. If the charge succeeds, the
   transaction continues onwards.
4. The automatic charge can fail for multiple reasons. If the charge
   fails, the customer and provider receive an email notification and
   the customer is asked to visit the marketplace web site in order to
   pay manually.

It is important to note that an off-session payment can fail for various
reasons. For instance, the card could be denied due to insufficient
funds, the issuing bank may require additional authentication from the
customer (this can easily occur with European payment cards when
[Strong Customer Authentication regulation](/background/strong-customer-authentication/)
kicks in), the payment card might have expired, etc. It is therefore
always important to allow for a fall-back payment path in your
transaction process.

You can build upon this example and extend it to make the payment
process more robust. For instance, in case the customer fails to pay for
the transaction within certain amount of time, you may wish to allow the
provider or marketplace operator to cancel the transaction, or allow the
provider to post a review of the customer. In addition, you may consider
disallowing customers to remove their stored payment card in your UI
implementation, if they have ongoing transactions for which they have
not yet been charged.
