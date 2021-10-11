---
title: Automatic off-session payments in transaction process
slug: off-session-payments-in-transaction-process
updated: 2021-10-11
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

Flex API has capabilities for
[saving payment card details for future use](https://www.sharetribe.com/api-reference/marketplace.html#stripe-customer).
In addition, it is possible to configure your transaction process in
such a way that the customer is charged automatically off-session at a
certain point in time (i.e. when they are not present and interacting
with your web site or app), provided that they have saved a payment card
to their account. This allows you to charge customers closer to their
booking dates, so that the money can be held in Stripe throughout the
booking period.

Another way to use the off-session payment logic might be to create a
pre-order functionality for a product marketplace. In a pre-order
transaction flow, the provider could put their future offerings for sale
and include a delivery date well into the future. Customers could then
pre-order the items, and their card would only be charged once the
provider marks the orders as being in progress or shipped. Again, this
would allow the pre-order time to be longer than the Stripe limitation
of 90 days.

## Transaction process example

Suppose your sauna rentals marketplace should allow customers to book
saunas up to a year in advance, but the customer is only charged at a
specified moment before the booking. The figure below illustrates how a
part of your transaction process might look like. The
[flex-example-processes Github repository](https://github.com/sharetribe/flex-example-processes/)
contains
[an example transaction process](https://github.com/sharetribe/flex-example-processes/tree/master/automatic-off-session-payment)
corresponding to the flow described.

![Example transaction process with delayed payment](tx-delayed-payments.png 'Example transaction process with delayed payment')

In this example, a transaction goes as follows:

1. The customer picks the desired booking dates and initiates a
   transaction. The price of the transaction is calculated, but no
   payment is made at this point.
2. The provider verifies the request and accepts the booking.
3. At a later point in time (1 month before the booking start time in
   this example, and 1 day before the booking start in the
   [example process](https://github.com/sharetribe/flex-example-processes/tree/master/automatic-off-session-payment)),
   an attempt is made to automatically charge the customer's stored
   payment card. If the charge succeeds, the transaction continues
   onwards.
4. The automatic charge can fail for multiple reasons. If the charge
   fails, the customer (and optionally also the provider) receives an
   email notification and the customer is asked to visit the marketplace
   web site in order to pay manually.

<extrainfo title="How does creating and capturing an off-session payment work?">
In the auto-payment transition, the payment intent creation needs to be configured to use the customer's saved payment information, if it exists. When the action is configured like this, it both creates and confirms the payment intent. Therefore, only capturing the payment intent remains necessary.

```clojure
 {:name :transition/auto-payment,
   :from :state/pending-payment,
   :to :state/paid,
   :at
   {:fn/plus
    [{:fn/timepoint [:time/first-entered-state :state/pending-payment]}
     {:fn/period ["PT5M"]}]},
   :actions
   [{:name :action/stripe-create-payment-intent,
     :config { :use-customer-default-payment-method? :true }}
    {:name :action/stripe-capture-payment-intent}]}
```

</extrainfo>

It is important to note that an off-session payment can fail for various
reasons. For instance, the card could be denied due to insufficient
funds, the issuing bank may require additional authentication from the
customer (this can easily occur with European payment cards when
[Strong Customer Authentication regulation](/background/strong-customer-authentication/)
kicks in), the payment card might have expired, etc. It is therefore
always important to allow for a fall-back payment path in your
transaction process. Since only one transition from a state can be
triggered automatically, this fall-back payment path must trigger upon a
user action, as in the example.

You can build upon this example and extend it to make the payment
process more robust. For instance, in case the customer fails to pay for
the transaction within certain amount of time, you may wish to allow the
provider or marketplace operator to cancel the transaction, or allow the
provider to post a review of the customer. In addition, you may consider
disallowing customers to remove their stored payment card in your UI
implementation, if they have ongoing transactions for which they have
not yet been charged.

## Considerations about implementation in FTW templates

If you want to implement
[the example process](https://github.com/sharetribe/flex-example-processes/tree/master/automatic-off-session-payment)
in your user interface, there are multiple ways to do so. If your user
interface is based on one of the FTW templates, here are a few things
worth considering.

### Transitions and states

[Transitions and states](/tutorial-transaction-process/create-transaction-process/#update-client-app)
are used in the template as conditions for several behaviors, including
redirects and displayed content. The
[transaction resource](https://www.sharetribe.com/api-reference/marketplace.html#transaction-resource-format)
contains information about the transaction's last transition and its
timestamp.

### Separating order from payment

In the default transaction process and default FTW flow, the order is
initiated and processed on
[CheckoutPage.js](https://github.com/sharetribe/ftw-daily/blob/master/src/containers/CheckoutPage/CheckoutPage.js)
in `handlePaymentIntent()`, using
[initial values from ListingPage.js](https://github.com/sharetribe/ftw-daily/blob/master/src/containers/ListingPage/ListingPage.js)
set in `handleSubmit()` with `callSetInitialValues()`. Since the
off-session payment process separates initiating the order (i.e.
creating a booking, setting line items in a privileged transition) from
payment (creating and further processing Stripe payment intent), it is
important to pay attention to the way you want to handle that
separation.

- What happens when user clicks 'Request to book' on ListingPage.js?
- Where is the API call made to invoke the initial process transition
  that creates a booking and sets line items?

### Handling delayed manual payment

If the automatic payment succeeds, the customer does not need to take
further action on the transaction before the review process. Manual
payment, on the other hand, does require a new user flow in the FTW
template.
[CheckoutPage.js](https://github.com/sharetribe/ftw-daily/blob/master/src/containers/CheckoutPage/CheckoutPage.js)
is set up to handle payments toward Stripe, so the simplest option is
that after an automatic payment has not succeeded and the customer has
manually triggered the transition to create a payment intent, they are
redirected to CheckoutPage.js (cf.
[TransactionPage.js](https://github.com/sharetribe/ftw-daily/blob/master/src/containers/TransactionPage/TransactionPage.js)
`redirectToCheckoutPageWithInitialValues()`) to continue the process.

Pay attention to the following points when designing your user flow:

- What action does the customer take in the UI to initiate manual
  payment?
- Does the provider see whether or not the customer has paid for the
  booking?
