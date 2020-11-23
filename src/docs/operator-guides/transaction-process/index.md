---
title: Transaction process introduction
slug: transaction-process
updated: 2020-11-20
category: operator-guides
ingress:
  Explanation about the transaction process concept and parts
published: true
---

Your marketplace exists to connect supply and demand. You likely have a unique vision of how this connection should happen. This article will explain how to bring this unique vision  to life with Flex. 

## Introduction

Any time users connect on your Flex marketplace it’s called a transaction. At its core a Flex transaction is the interaction between two users--the provider and the customer--from beginning to end. A single transaction might include acts such as messages sent between users, the payment sent from the custom to the provider, and the reviews users leave about their experience. 

You likely want users on your marketplace to transact a certain way. For instance, you may want your providers to accept requests before confirming bookings to ensure that there is no conflict. Or, you’d prefer requests to confirm automatically because you want to prioritize speed. Perhaps you’d like both options, depending on the nature of the offered service. 

These guidelines for how you’d like users to transact are established in Flex using a transaction process. Your marketplace’s transaction process, or processes (you can have multiple different ways you’d like your users to transact) determines how your customers and providers move through their transaction. 

A transaction follows the trail established by your transaction process. It maps the steps your users will complete and the possibilities they have upon reaching each step. 

## Transaction process example 

Flex starts with a few transaction processes to make building your own easier. Click through the carousel below to see an example of a transaction process.

<transactionprocesscomponentscarousel title="Transaction process components">

</transactionprocesscomponentscarousel>

## The transaction process and your user experience (and your application// and your marketplace)

You may be wondering what a graph has to do with your marketplace, a very good question. The graph is simply a visualization of the transaction process information (the states, the transitions, and the actions) stored in your marketplace database in Flex. The transaction process is, in reality, a terse set of instructions written in a text file. You can see an example of these instructions here if you are curious.

These instructions, the transaction process, ultimately play out in the web or mobile marketplace app used by your users. 

Whenever your users transact, at whatever milestone (or state) they are in that interaction, the transaction process determines what they can do next and how it happens. 

Let’s revisit our Flex default process, this time in conjunction with the Flex Template for Web, to illustrate this connection. If you’re not sure about the Flex Template, you can read more about it [here](https://www.sharetribe.com/docs/background/concepts/#flex-templates-for-web-ftw).

<txnprocessuxcarousel title="Transaction process and your UX">

</txnprocessuxcarousel>

## Conclusion

The transaction process guides how your users transact on your marketplace. It determines where your users are in a transaction, what possible next steps they have, and how those steps are taken. The transaction process plays out in your marketplace application where your users transact. 

Now that you understand more about how the transaction process works, it’s time to create your own. Flex provides a few default processes, but you’ll likely want to modify these to capture the unique way your users will transact. This happens by creating a new transaction process.

If you’re a developer building with Flex, you can build your transaction process using the Flex CLI. 

If you’re working with a developer, then you need to communicate how you would like transactions to work so that your developer can implement the necessary steps, transitions, and actions using the transaction process.  Check out this article for a few principles to keep in mind making changes to your transaction process as a non developer. 
