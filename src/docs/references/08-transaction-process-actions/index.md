---
title: Transaction process actions
slug: transaction-process-actions
updated: 2019-10-02
category: references
ingress:
  This reference article lists all the available actions and their
  configuration options.
published: true
---

A transaction process contains transitions and each transition defines
an ordered list of 0 or more actions. Actions are instructions for the
transaction engine and define what happens when a transition is
executed. The ordering of the actions matters because they are executed
in the given order.

This is a reference for all the available actions with their
preconditions, parameters, and configuration options. With
**parameters** we mean values that are sent in the API calls to the
actions, and with **configuration options** we mean the options that are
set for the actions in the `process.edn` file. To learn more, see the
[Transaction process format](/references/transaction-process-format/)
reference article.

## Actions

### :action.initializer/init-listing-tx

**NOTE**: this action is implicit and must not be in the process
description.

Initialize a new transaction from a listing.

**Preconditions**:

- Listing with the given ID must exist
- Listing must have an author
- Customer (actor of the transaction) must be a valid user
- Author and customer must not be the same user

**Parameters**:

- `listingId`, UUID, mandatory

**Configuration options**: -

### :action/calculate-tx-customer-commission

Calculates customer commission and sets the transaction pay in amount.

**Preconditions**:

- Transaction must have a total price

**Parameters**: -

**Configuration options**:

- `commission`: decimal, mandatory. Acts as a multiplier on the
  transaction total, e.g. `0.1M` for a 10% commission.

### :action/calculate-tx-provider-commission

Calculates provider commission and sets the transaction pay out amount.

**Preconditions**:

- Transaction must have a total price

**Parameters**: -

**Configuration options**:

- `commission`: decimal, mandatory. Acts as a multiplier on the
  transaction total, e.g. `0.1M` for a 10% commission.

### :action/calculate-tx-nightly-total

**DEPRECATED**: use `:action/calculate-tx-nightly-total-price` instead

Calculates transaction total and provider commission from a nightly
booking.

### :action/calculate-tx-total

**DEPRECATED**: use `:action/calculate-tx-nightly-total-price` instead

Same as `:action/calculate-tx-nightly-total`, kept for backward
compatibility.

### :action/calculate-tx-daily-total

**DEPRECATED**: use `:action/calculate-tx-daily-total-price` instead

Calculates transaction total and provider commission from a daily
booking.

### :action/calculate-tx-daily-total-price

Calculates transaction total from a daily booking.

**Preconditions**:

- Transaction must have a booking
- Listing must have a price

**Parameters**: -

**Configuration options**: -

### :action/calculate-tx-nightly-total-price

Calculates transaction total from a nightly booking.

**Preconditions**:

- Transaction must have a booking
- Listing must have a price

**Parameters**: -

**Configuration options**: -

### :action/calculate-tx-total-daily-booking-exclude-start

Calculates transaction total from daily booking without start and end
dates. Can be used for price calculation of bookings where the boundary
dates are used for delivery and pickup.

**Preconditions**:

- Transaction must have a booking
- Listing must have a price
- Booking time must be at least three days as there needs to be one day
  between the excluded dates

**Parameters**: -

**Configuration options**: -

### :action/calculate-tx-two-units-total-price

**Deprecated**: use `:action/set-line-items-and-total` instead to have
full control of the calculation and the line items

Calculates transaction total from the quantity params and the price
multiplier configuration options.

`total = quantity1 * quantity1-price-multiplier + quantity2 * quantity2-price-multiplier`

**Preconditions**:

- Listing must have a price

**Parameters**:

- `quantity1`: non-negative integer (0, 1, 2, ...), mandatory
- `quantity2`: non-negative integer (0, 1, 2, ...), mandatory

**Configuration options**:

- `quantity1-price-multiplier`: decimal, defaults to 1.0M
- `quantity2-price-multiplier`: decimal, defaults to 1.0M

### :action/calculate-tx-unit-total-price

Calculates transaction total from given quantity and listing price.

**Preconditions**:

- Listing must have a price

**Parameters**:

- `quantity`: positive integer (1, 2, 3, ...), mandatory

**Configuration options**: -

### :action/calculate-full-refund

Calculates full refund for provider. Sets transaction pay in and pay out
amounts to zero and creates reverse line items that undo all the
previous line items.

This action must not be run more than once.

**Preconditions**: -

**Parameters**: -

**Configuration options**: -

### :action/set-negotiated-total-price

Enables price negotiation. When the action is run for the first time it
adds a new line item that makes the transaction total to match with the
offer. Subsequent executions update the line item to match the counter
offer.

**Preconditions**: -

**Parameters**:

- `negotiatedTotal`, money, mandatory

**Configuration options**: -

### :action/set-line-items-and-total

Enables custom pricing. Sets given line items and calculates totals for
each line item and for the transaction.

Existing line items will be removed.

**Preconditions**: -

**Parameters**:

- `lineItems`: Collection of line items (max 50). Each line items has
  following fields:
  - `code`: string, mandatory, indentifies line item type (e.g.
    "cleaning-fee")
  - `unitPrice`: money, mandatory
  - `quantity`: number
  - `percentage`: number (e.g. 15.5 for 15.5%)
  - `seats`: number
  - `units`: number

Line item must have either `quantity` or `percentage` or both `seats`
and `units`. If `quantity` is provided, the line total will be
`unitPrice * quantity`. If `percentage` is provided, the line total will
be `unitPrice * (percentage / 100)`. If `seats` and `units` are provided
the line item will contain `quantity` as a product of `seats` and
`units` and the line total will be `unitPrice

- units \* seats`.

**Configuration options**: -

### :action/create-booking

Creates a new booking in state pending with given start and end time.
Optionally takes booking display start and end times as well as seats.

**Preconditions**: -

**Parameters**:

- `bookingStart`, `bookingEnd`: timestamp, mandatory
- `bookingDisplayStart`, `bookingDisplayEnd`: timestamp, optional
- `seats`, integer, optional, defaults to 1

**Configuration options**:

- `observe-availability?`: boolean, defaults to `false`. If set to
  `true`, prevents creating new bookings if the booking time is not
  available.
- `type?`: enum, one of `:day`, `:time`. Defaults to `:day`. If set to
  `:day` normalizes `bookingStart` and `bookingEnd` values to midnight
  UTC.

### :action/accept-booking

Marks booking as accepted.

**Preconditions**:

- Transaction must have a booking
- Booking must be in the pending state

**Parameters**: -

**Configuration options**: -

### :action/cancel-booking

Cancel an accepted booking.

**Preconditions**:

- Transaction must have a booking
- Booking must be in the accepted state

**Parameters**: -

**Configuration options**: -

### :action/decline-booking

Decline a pending booking.

**Preconditions**:

- Transaction must have a booking
- Booking must be in the pending state

**Parameters**: -

**Configuration options**: -

### :action/post-review-by-customer

Action for customer to post a review of provider.

The review is left in pending state. Executing `:action/publish-reviews`
will make them publicly available.

**Preconditions**:

- Transaction must not be reviewed by customer already

**Parameters**:

- `reviewRating`, integer from 1 to 5, mandatory
- `reviewContent`, written review, string, mandatory

**Configuration options**: -

### :action/post-review-by-provider

Action for provider to post a review of customer.

The review is left in pending state. Executing `:action/publish-reviews`
will make them publicly available.

**Preconditions**:

- Transaction must not be reviewed by provider already

**Parameters**:

- `reviewRating`, integer from 1 to 5, mandatory
- `reviewContent`, written review, string, mandatory

**Configuration options**: -

### :action/publish-reviews

Action to publish any reviews in the transaction.

**Preconditions**: -

**Parameters**: -

**Configuration options**: -

### :action/reveal-customer-protected-data

Merge customer protected data into transaction protected data.

**Preconditions**: -

**Parameters**: -

**Configuration options**:

- `key-mapping`: map (keyword -> keyword), optional

  Defines which keys are revealed to the transaction. Also can be used
  to rename keys so that the transaction's protected data will use
  different keys than the user's protected data does. For example,the
  following config will reveal customer's phoneNumber attribute to the
  transaction and rename it to customerPhoneNumber:

  {:key-mapping {:phoneNumber :customerPhoneNumber}}

### :action/reveal-provider-protected-data

Merge provider protected data into transaction protected data.

**Preconditions**: -

**Parameters**: -

**Configuration options**:

- `key-mapping`: map (keyword -> keyword), optional

  Defines which keys are revealed to the transaction. Also can be used
  to rename keys so that the transaction's protected data will use
  different keys than the user's protected data does. For example,the
  following config will reveal provider's phoneNumber attribute to the
  transaction and rename it to providerPhoneNumber:

  {:key-mapping {:phoneNumber :providerPhoneNumber}}

### :action/update-protected-data

Merge given data to the protected data of the transaction.

**Preconditions**: -

**Parameters**:

- `protectedData`: JSON object, max 50KB, optional

**Configuration options**: -

### :action/stripe-create-payment-intent

Action for creating a Stripe Payment Intent for the transaction.

Payment Intents are the main supported way to collect payments.
Transaction processes need to use them especially if they want to be
SCA-compatible.

**Preconditions**:

- The transaction must already have pricing information (i.e. pay-in and
  pay-out totals) calculated.
- If `:use-customer-default-payment-method?` is set `true`, customer
  must have Stripe Customer and default payment method set.

**Parameters:**

- `paymentMethod`, string, optional. Stripe PaymentMethod ID of payment
  method to be used in the payment. If not given, client is responsible
  for attaching a PaymentMethod to the PaymentIntent via e.g. Stripe.js
  SDK.
- `setupPaymentMethodForSaving`, boolean, optional. If set to true, the
  PaymentIntent is created in such a way so that the PaymentMethod used
  in the payment can be later attached to a Stripe Customer. Otherwise,
  the PaymentMethod (if new) can not be used in any other way again
  after the payment. After payment is done via the transaction process,
  the client can use Marketplace API operations
  `/stripe_customer/add_payment_method` or `/stripe_customer/create` to
  attach the payment method to a Customer or create a new Customer if
  one didn't exist.

**Configurations:**

- `:use-customer-default-payment-method?`, boolean, optional. If set to
  `true`, the payment intent is created using the Customer's default
  payment method and it is created as an off-session payment in Stripe
  (i.e. customer not present). Intended to be used in transitions where
  customer is not present (i.e. delayed transitions, or ones triggered
  by operator or provider). This tells Stripe to attempt to exempt the
  payment from SCA. However, the bank in question may still require
  authentication. If the bank requires authentication from the customer,
  or declines the charge for any reason, the Stripe API call will fail
  and the transition using this action will fail. The action also
  automatically confirms the payment intent, i.e.
  `:action/stripe-confirm-payment-intent` must not be included in this
  or subsequent transitions.

### :action/stripe-capture-payment-intent

Action for capturing a confirmed Stripe PaymentIntent.

**Preconditions:**

- Transaction must have a payment that has been confirmed with
  `:action/stripe-confirm-payment-intent`
- Provider must have connected Stripe account

**Parameters:** - **Configurations:** -

### :action/stripe-confirm-payment-intent

Action for confirming payment intent that is in pending state.

**Preconditions**:

- Transaction must have a payment created with
  `:action/stripe-create-payment-intent`.

**Parameters:** - **Configurations:** -

### :action/stripe-create-payout

Create pay out to external bank account. The managed account must have
sufficient available balance.

**Preconditions**:

- Transaction must have pay-out value set
- Transaction must have a Stripe transfer

**Parameters**: -

**Configuration options**: -

### :action/stripe-refund-charge

**DEPRECATED**: same as `:action/stripe-refund-payment`, use that
instead

### :action/stripe-refund-payment

Refund (in full) a Stripe payment. Supports both cancelling a
PaymentIntent that has not yet been captured, as well as issuing a
Stripe refund for a charge if the charge was captured or if the charge
was created directly without using a PaymentIntent.

**Preconditions**:

- Transaction must have a pay in
- Transaction must have the required Stripe payment data
- Pay in must be in one of the following states: payment.in/pending,
  payment.in/preauthorized, payment.in/paid
- Transaction must have a pay out
- Pay out must not be already paid

**Parameters**: -

**Configuration options**: -

### :action/fail

Action that always fails. Useful for testing.

**Preconditions**: -

**Parameters**: -

**Configuration options**: -
