---
title: What is the minimum transaction size
slug: what-is-the-minimum-transaction-size
updated: 2023-05-19
category: operator-guides-transactions
ingress:
  The minimum transaction size is the lowest amount possible to transact
  through your marketplace.
published: true
---

The Minimum transaction size helps you avoid losing money on small
transactions. Like most other payment gateways, Stripe will take a fee
from each payment on your marketplace. Since the Stripe fees are charged
to the marketplace and not the buyer or seller, it is important to
consider the minimum amount you are willing to process. Certain
transaction sizes in certain countries (Stripe fees are region specific)
could result in you being unable to make reliable profits on a processed
transactions.

In practice, the minimum transaction size is enforced by determining the
minimum listing price that sellers can add to their listings.

For example, if you set the minimum transaction size in your marketplace
as
$10, in practice what you are doing is setting the minimum listing price. Providers won’t be able to list an item below this set price of $10.
Even if the expected or average transaction size would larger. The
validation is done at listing creation, and not at the transaction
level.

You can set the minimum transaction size from your
[Console → Minimum transaction size page](https://console.sharetribe.com/a/transactions/minimum-transaction-size).
