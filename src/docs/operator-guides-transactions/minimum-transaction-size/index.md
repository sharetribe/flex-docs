---
title: What is the minimum transaction size
slug: what-is-the-minimum-transaction-size
updated: 2023-04-20
category: operator-guides-transactions
ingress:
  The minimum transaction size is the lowest amount possible to transact
  through your marketplace.
published: true
---

In practice, this is enforced by determining the minimum listing price
sellers can add to their listings.

The Minimum transaction size helps you avoid losing money on small
transactions. Like most other payment gateways, Stripe will take a fee
from each payment on your marketplace. Since the Stripe fees are charged
to the marketplace and not the buyer or seller, it is important to
consider the minimum amount you are willing to process. Certain
transaction sizes in certain countries (Stripe fees are region specific)
could result in you losing money on a processed transaction.

For example, if you set the minimum listing price in your marketplace as
\$10, the seller won’t be able to list an item below this set price,
even if the expected size of the actual transaction amount would
potentially be larger.

To set your marketplace minimum listing size, go to **Build**. On the
page, click on the **Content** tab, and select **Minimum Transaction
Size**. On this page, input your **Minimum Listing Price** and **Save
Changes**.
