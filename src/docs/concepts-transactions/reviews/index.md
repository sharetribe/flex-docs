---
title: Reviews
slug: reviews
updated: 2023-10-24
category: concepts-transaction-process
ingress:
  This article introduces reviews in the Sharetribe marketplace, why
  they are important, and how they relate to the transaction process.
published: true
---

Sharetribe marketplaces use reviews to create social proof and
transparency for the marketplace. Reviews are important for all kinds of
marketplaces. Provider reviews encourage customers to order well-rated
listings, and customer reviews encourage providers to accept business
from well-rated customers.

In Sharetribe, reviews can have a rating between 1-5, as well as text
content. By default, reviews are given at the end of a transaction.

The customer reviews the transaction's listing. Since providers can have
several different listings, this way the review targets the actual
product or service received. Listing reviews give important information
about the quality of the experience and the end result that the customer
received during the transaction.

The provider reviews the customer directly. Customer reviews are crucial
in booking related marketplaces, especially ones where customers
interact with the provider directly or use a valuable resource such as
an apartment or a car.

## Reviews in a transaction process

The default Sharetribe transaction processes use a blind review process.
In other words, reviews are only published after both parties have given
their review, or after the review period has ended. This increases the
odds that the reviews are honest.

### Review related transaction process actions and transitions

Reviews are managed as a part of the transaction process using
transaction process actions.

- [:action/post-review-by-customer](/references/transaction-process-actions/#actionpost-review-by-customer)
  creates a pending review of the listing and provider.
- [:action/post-review-by-provider](/references/transaction-process-actions/#actionpost-review-by-provider)
  creates a pending review of the customer.
- [:action/publish-reviews](/references/transaction-process-actions/#actionpublish-reviews)
  publishes any reviews that have been added to the transaction by the
  time the action is executed.

The Sharetribe default transaction processes structure these actions
into different paths, depending on who posts the first review. In all
paths, the process publishes the reviews once both parties have reviewed
each other. Alternatively, any existing reviews get published after 7
days of the transaction completing, after which reviews can no longer be
added through the transaction process. This means that even if one of
the parties does not submit a review, the other review does get
published.

## Frequently asked questions

### Can reviews be removed?

Once published, reviews cannot be removed. They can, however, be
modified by the operator in Sharetribe Console > Manage >
[Reviews](https://console.sharetribe.com/reviews).

### Can I add a review after the review period has expired?

Sometimes, transaction participants want to add missing reviews after
the review period has expired. If the marketplace operators decide that
the review is relevant and honest, you can reach out to us at
[Sharetribe Support](mailto:hello@sharetribe.com) with the issue and we
can look into it.

### How can I add an average rating attribute to my listings?

Listing average ratings are not available in Sharetribe out of the box.
However, you can create a feature that listens to
[review events](/how-to/reacting-to-events/). Whenever there's a new
review event, you can then call
[Sharetribe Integration API](https://www.sharetribe.com/api-reference/integration.html)
to update the [public metadata](/references/extended-data/#metadata) of
the reviewed listing.

You can create a logic that stores the number of reviews and their
previous average in the listing's metadata, and updates these when a new
review is added. That way, you can, for instance, display the average
rating on the listing page, or use it to sort listings.
