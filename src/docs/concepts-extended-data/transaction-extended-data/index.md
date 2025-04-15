---
title: Transaction extended data
slug: transaction-extended-data
updated: 2025-04-14
category: concepts-extended-data
ingress:
  Transaction extended data allows you to keep sensitive information
  stored and visible for both transaction parties, as well as add
  information related to, for example, integrations or analytics.
published: true
---

Transactions have two types of extended data. Both transaction protected
data and metadata are visible for the transaction participants and
operators. Protected data can only be updated using transaction process
actions. Transaction metadata, on the other hand, can be updated through
[a privileged transaction process action](/references/transaction-process-actions/#actionprivileged-update-metadata).
In addition, operators can update metadata either through Sharetribe
Console or using an
[Integration API endpoint for updating transaction metadata](https://www.sharetribe.com/api-reference/integration.html#update-transaction-metadata).

## Protected data is updated through the transaction process

Transaction protected data is visible to both transaction parties. It
can be updated by
[revealing the participants' protected data](/concepts/user-extended-data/#revealing-information-within-the-transaction)
to the transaction, which renders it visible within the transaction. In
addition, a transaction process can have an action to
[update transaction protected data](/references/transaction-process-actions/#actionupdate-protected-data).

Protected data can be used to store any transaction specific information
that the users are allowed to modify. Most common use cases include
customer or provider contact information, but e.g. for more complex
marketplace setups with several related transactions, any related
transaction ids can be stored in protected data.

## Metadata can be updated from trusted contexts

Transaction metadata is visible to both transaction parties, but it can
only be updated by the operator. If your marketplace has integrations to
third party services whose information is transaction specific, like
discount services, you can store information such as integration
references or discount codes or percentages in transaction metadata.
Metadata can also be used to tag transactions for analytics purposes.

You need a trusted context for updating transaction metadata – either a
privileged transition, or a secure server endpoint. You can also build a
separate application to
[listen to transaction events](/how-to/reacting-to-events/) and update
transaction metadata through the Integration API as a reaction to those
events.

## Transaction filtering in Marketplace API and Integration API

Both Marketplace API and Integration API have endpoints for querying
transactions:

- [Marketplace API /transactions/query](https://www.sharetribe.com/api-reference/marketplace.html#query-transactions)
- [Integration API /transactions/query](https://www.sharetribe.com/api-reference/integration.html#query-transactions)

To facilitate transaction querying, it is possible to filter
transactions also by extended data when calling these endpoints. That
way, you can segment your transactions by important attributes for more
fine-grained processing. To filter transactions by extended data, you
will need to
[create a search schema](/how-to/manage-search-schemas-with-sharetribe-cli/)
for the transaction.
