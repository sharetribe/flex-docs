---
title: Inventory management
slug: inventory-management
updated: 2021-10-15
category: concepts-availability
ingress:
  Inventory or stock management is a key feature of many product
  marketplaces. Here’s how Flex’s stock management works.
published: true
---

In Flex, you can manage the available stock or inventory of a listing
via the stock-related features in the Marketplace API and the
Integration API. With those APIs, you can determine the available stock
(quantity) of any given listing as well as add to and subtract from it.
Additions to stock will mostly be determined by providers, as they
restock the items they sell. Stock subtractions, on the other hand, will
mostly happen as part of transactions, as buyers on your marketplace
make purchases.

This article describes the stock management features of Flex on a high
level. If you want to read a more technical article about the feature,
[click here](https://www.sharetribe.com/docs/references/stock/).

## How do you determine the initial available stock or increase the available stock of a listing?

With the stock-related APIs, you add to the available stock of a listing
by creating a
[stock adjustment](https://www.sharetribe.com/docs/background/concepts/#stock-adjustment).
This is an API call that you make through one of our APIs that lets your
Flex marketplace know that you have increased the quantity of available
stock for one of your listings. This adjustment could be done directly
through the marketplace UI or a third-party integration using the
corresponding API calls.

## How do you remove or decrease the available stock of a listing?

Most of the time, a listing's available stock will decrease because
people purchase units via transactions. The stock-related transaction
process actions allow defining your transaction process so that when a
transaction is initiated, a stock reservation is made as well, for
example. This prevents your users from purchasing more units than are
available.

If the transaction completes, the purchased units are removed from the
inventory permanently. If the transaction is cancelled, the units are
released back to the inventory and other users will be able to purchase
them. Find out more about transactions actions
[here](https://www.sharetribe.com/docs/references/transaction-process-actions/#stock-reservations).

You can also connect your Flex marketplace with third-party systems to
further manage stock. If units are bought through another site or
system, you can sync this information with the Integration API and
adjust your stock accordingly.

Finally, providers could manually adjust their inventory directly from
the marketplace interface. Similar to how they would add inventory.

## Can listings be closed automatically if there is no stock left?

Yes! This feature can be built into your Flex marketplace app with
relative ease, even though it is not part of the default template.
Furthermore, even if you don’t have a system in place that would close
the listings automatically, users will not be able to purchase more
units than are available, giving you peace of mind that no
double-purchases of the same stock will happen.

## How to manage the number of seats or spaces for an event or a class?

If you are looking to manage the number of spaces in an event, you
should take a look at the seats feature. With seats, you can manage the
number of available spaces in a given event at a given time. Seats are
tied to booking availability managment. You can learn more about the
feature
[here](https://www.sharetribe.com/docs/operator-guides/manage-seats/).
