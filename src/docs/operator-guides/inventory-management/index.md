---
title: Inventory management
slug: inventory-management
updated: 2021-10-01
category: operator-guides
ingress:
  Learn how you can use the stock API resources to manage your listings inventory
published: false
---

In Flex, you can manage inventory via the stock API resources. With the stock API resources, you can determine the available inventory of any given listing as well as add to and subtract from it. Additions to stock will mostly be determined by providers, as they restock the items they sell. Stock subtractions, on the other hand, will mostly happen as part of transactions, as buyers on your marketplace make purchases.

This article describes the stock API resources on a high level. If you want to read a more technical article about the feature, [click here](https://www.sharetribe.com/docs/references/stock/). 

## How do you determine initial inventory or increase the inventory?

With stock API resources, you add inventory through a stock adjustment. This is a call that you make through one of our APIs that lets your Flex marketplace know that you have increased your inventory. This can be done through the marketplace UI or a third-party integration.

## How do you remove or decrease inventory?

Most of the time, your inventory will decrease because people purchase units via transactions. Stock API resources connect with the necessary actions in the transaction process so that when a transaction is initiated, a stock reservation is made as well. This prevents your users from purchasing more units than are available. 

If the transaction completes, the purchased units are removed from the inventory permanently. If the transaction is cancelled, the units are released back to the inventory and other users will be able to purchase them. Find out more about transactions actions [here](https://www.sharetribe.com/docs/references/transaction-process-actions/#stock-reservations).

You can also connect your Flex marketplace with third-party systems to further manage stock. If units are bought through another site or system, you can sync this information with the Integration API and adjust your stock accordingly.

Finally, providers could manually adjust their inventory directly from the marketplace interface. Similarly to how they would add inventory. 

## Can listings be closed automatically when there is no stock left?

Yes! Furthermore, even if you don’t have a system in place that would close the listings automatically, users will not be able to purchase more units than are available, giving you peace of mind that no double-reservations of the same stock will happen. 

## How to manage the number of seats or spaces for an event or a class?

If you are looking to manage the number of spaces in an event, you should take a look at our seats feature. With seats, you can manage the number of available spaces in a given event at a given time. Seats are tied to booking availability. You can learn more about the feature [here](LINK TO A SEATS MINI ARTICLE MAYBE?).
