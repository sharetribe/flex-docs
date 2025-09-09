---
title: Using stored payment cards
slug: using-stored-payment-cards
updated: 2023-10-24
category: concepts-payments
ingress:
  This article gives you a brief overview on how the Sharetribe
  functionality for storing credit and debit cards works and what are
  the different use cases for it.
published: true
---

Sharetribe allows you to store the payment card of a customer for future
purchases. Doing this provides multiple benefits: it streamlines the
checkout process for existing customers and allows you to place
additional charges to the payment card of the customer.

Sharetribe Web Template includes a checkout workflow, which offers a box
for the customer to check if they want to store their card for future
purchases. Once they've stored it, they are offered the option to use
the same card for subsequent purchases without entering the details
again.

In addition, each user has a page called "payment methods" in their
account settings. From this page, the user can store a new credit card,
delete a stored card, or replace a stored card with a new one.

[Learn how storing payment card works in Sharetribe Web Template](/how-to/save-payment-card/)

[Read API documentation on storing credit cards](https://www.sharetribe.com/api-reference/marketplace.html#stripe-customer)

## Frequently asked questions about storing payment cards

**How many payment cards can I store per customer?**

Right now you can only store one payment card per customer. If you store
a new card, the old one is replaced.

**How do I edit the details of a stored credit card?**

You can't edit the details of a stored payment card. Instead, you need
to delete the card and create a new card.

**Can I create delayed charges?**

Sometimes you might want to store the payment card details of the
customer when they make a booking, but initiate the actual charge only
later. A typical example could be booking a venue for a wedding. The
initial booking might be done a year in advance, but the charge might
happen only a bit before the event, or even after it. \
 \
It's possible for you to adjust your [transaction process](/concepts/transaction-process/)
to add a transition that attempts to automatically charge the card of the
customer at a specific point in time. [A separate article](/concepts/off-session-payments-in-transaction-process/)
describes how you can build such a process.

**Can I create extra charges to the payment card of the customer?**

Sometimes you might want to create extra charges for a stored card after
an initial purchase. For example, if a rented item is stolen or damaged
by the customer or returned late, you might want to charge the customer
extra to cover these costs.

If your marketplace uses
[Strong Customer Authentication](/concepts/strong-customer-authentication/)
to verify credit card purchases, you cannot create additional charges to
their card without allowing them to approve the charge with Strong
Customer Authentication.

If that is not the case, you can initiate additional charges directly
from your Stripe dashboard. You should always notify the customer in
question about why an extra charge was placed on their card. The
additional charges won't get displayed in Sharetribe Console. The money
from the extra charges is placed to your platform's Stripe balance, from
which it is moved to your bank account. If a payout to the provider (in
this case the owner of the item) is needed, you will need to handle it
manually from your own bank account.

**Can I enable recurring / subscription payments?**

Stripe supports
[subscriptions](https://stripe.com/docs/connect/subscriptions), which
could be used to allow your providers to charge recurring payments from
your customers. As an example, a customer might rent a storage unit from
a provider. You might want to create a subscription that automatically
charges the customer's card every month, until the customer cancels the
storage subscription.

Right now, Sharetribe doesn't offer support for Stripe subscriptions.
However, there is a workaround with custom development. Once the
customer has made the initial payment, you would send a request to your
own backend component, for instance the server of your Sharetribe Web
Template, which would then create a subscription with the stored credit
card of the customer. The subsequent subscription payments would then
not be visible in Sharetribe Console, but you could monitor them from
Stripe dashboard.
