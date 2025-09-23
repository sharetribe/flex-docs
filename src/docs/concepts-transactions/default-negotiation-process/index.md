---
title: Default negotiation process
slug: default-negotiation-process
updated: 2025-09-16
category: concepts-transaction-process
ingress:
  Sharetribe has a default negotiation transaction process that enables
  users to negotiate a price for the transaction. This article explains
  how the negotiation process works.
published: true
---

# Negotiation process overview

One of the default Sharetribe transaction processes includes price
negotiation dynamics. The same process enables both forward and reverse
transaction flows.

- **Forward transaction flow**

A forward transaction flow on a marketplace happens when the provider
posts a listing, and customers can initiate a transaction against that
listing by responding to the listing.

- **Reverse transaction flow**

A reverse transaction flow on a marketplace happens when the customer
posts a listing, and providers can initiate a transaction against that
listing by responding to the listing.

<info>

The Sharetribe Web Template supports a reverse transaction flow starting
with version [XX.XX.XX](TODO). Forward transaction flow is not supported
natively in the template at the moment.

</info>

In both forward and reverse flows, the provider provides the product or
service in question, and the customer pays for the transaction.

The _default-negotiation_ process does not include bookings or stock.
You can customize the process to include availability handling or stock
handling in addition to price negotiation. For bookings, we also offer
an example transaction process
[negotiated-booking](https://github.com/sharetribe/example-processes/blob/master/README.md#negotiated-booking)
– it is not supported by default in the Sharetribe Web Template, so you
will need to build a client-side implementation.

The default-negotiation process has two loops: the
[price negotiation loop](#price-negotiation-loop-in-default-negotiation)
and the
[change request loop](#change-request-loop-in-default-negotiation).

With all transaction process loops, including the ones in this process,
it is important to keep in mind that a single transaction can only have
a maximum of 100 transitions. This means that any implementation you
create must make sure that you restrict looping transitions after a
certain threshold, because your users should always have enough
transition quota left to finish the transaction

# Price negotiation loop in default-negotiation

The price negotiation loop happens after one of the parties has
initiated the transaction.

In a forward flow, a customer can start the transaction against the
provider's listing by requesting a quote. The provider can then make an
offer from the request, and making an offer adds line items to the
transaction. Alternatively, the provider (or operator) can reject the
quote request. The customer can also withdraw their own quote request.

In a reverse flow, a provider can start the transaction against the
customer's listing in two ways:

- the provider can inquire, which does not add line items to the
  transaction
- or the provider can make an offer, which does add line items to the
  transaction.

After this, the negotiation phase loops between two states:

- _state/offer-pending_
- _state/customer-offer-pending_

// TODO SCREENSHOT

Even though technically the parties can use the looping transitions to
negotiate the price, in practice we recommend that the participants
exchange messages to land on the offer details. That way, they don't use
up the allowed transaction quota during the price negotiation

When there is a pending offer from the provider (_state/offer-pending_),
the customer can continue the transaction in two ways: either

- accept the offer and make a payment
- or make a counter-offer and suggest new line items for the
  transaction.

The customer or operator can also end the transaction by rejecting the
offer, and the provider can withdraw their offer.

// TODO screenshot

If a customer makes a counter offer (_state/customer-offer-pending_),
the provider can continue the transaction in three ways, all of which
transition the transaction back to _state/offer-pending_:

- they can accept the customer's counter offer
- they can reject the customer's counter offer
- or they can make a new counter offer

The customer can also withdraw their counter offer, which also
transitions the transaction back to _state/offer-pending_. The only way
to end the transaction from _state/customer-offer-pending_ is the
operator transition _operator-reject-from-customer-counter-offer_

// TODO screenshot

Once the customer and provider are both happy with the offer, the
customer can initiate payment with the current line items set for the
transaction. Once the payment has been confirmed, the transaction moves
to the second main loop, which is the change request loop.

# Change request loop in default-negotiation

After the payment step, the transaction now loops between two states

- _state/delivered_
- _state/changes-requested_

The loop begins when the provider delivers the end result of the
project. The operator can also mark the end result delivered. This
transitions the transaction to _state/delivered_.

The customer and operator can now

- accept the deliverable, and transition the transaction to
  _state/completed_
- or they can request changes by transitioning the transaction to
  _state/changes-requested_

// TODO screenshot

The details of the change request will need to be discussed in messages,
since the change request transition does not have any actions to store
the change request information.

Once changes have been requested, the provider has only one transition
available – to deliver the changes and transition the transaction back
to _state/delivered_. In addition, there are multiple operator
transitions and automatic transitions at play.

- If the provider doesn't deliver the end result in 75 days from the
  payment, the transaction is automatically canceled. The operator can
  also manually cancel the transaction before the end result is
  delivered. This ends the transaction.
- Once the end result has been marked as delivered, the operator can
  cancel the transition.
- Once a customer has requested changes, the operator can cancel the
  transaction. If the change request is still pending in 75 days from
  the payment, the transaction is automatically canceled.

All of these paths transition the transaction to _state/canceled_

// TODO screenshot.

If the customer doesn't request changes, and the transaction has
remained in _state/delivered_ for 14 days, the transaction automatically
transitions to _state/completed_.

After the transaction is in _state/completed_, the participants can then
review each other similarly to other transaction processes.
