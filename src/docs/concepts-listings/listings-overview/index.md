---
title: Listings in Flex
slug: listings-overview
updated: 2022-06-06
category: concepts-listings
ingress:
  Flex powers online marketplaces, and listings are at the core of any
  marketplace. This article explains the different aspects of listings
  in Flex.
published: true
---

On a Flex marketplace, listings represent the items, facilities or
services that users buy and sell or book and offer. Using extended data,
listings can be modified to cover several different kinds of
marketplaces.

## Listing lifecycle

Between being created and deleted, listings go through several different
states. Depending on the listing's state, they are either returned with
the public Listing endpoints or they are only available to the listing's
author.

When tracking [listing events](TODO) through the [Integration API](TODO), it is important to also pay attention to the state of the listing. For instance, in the default FTW template implementation the listing is created as draft and then goes through several updates in the draft state before it is published. In other words, to catch the correct listing event, it is useful to filter by both event type and listing state.

### Draft

When a listing is first created, it is created in **state: draft**.
Draft listings are not returned by the [listings/query](TODO) endpoint,
but they are visible to the author and through Flex Console. Draft
listings can be published using the [own_listings/publish_draft](TODO)
endpoint.

### Pending approval

If the marketplace
[requires listing approval for new listings](/concepts/requiring-approval/),
a draft listing does not get published directly when the
[own_listings/publish_draft](TODO) is called. Instead, it moves into
**state: pendingApproval**. The operator can then approve the listing in
Flex Console or, if the approval is dependent on e.g. an extended data
attribute, through the
[listing approval Integration API endpoint](https://www.sharetribe.com/api-reference/integration.html#approve-listing).
A use case for this would be e.g. a marketplace where non-paid members
can publish one listing and paid members can publish unlimited listings
– an integration could check whether the user has a `premium: true` flag
in their metadata and approve the listing accordingly.

### Published

Published listings are returned by [listings/query](TODO) and
[listings/show](TODO) endpoints.

After a listing has been published, it can still be modified by the
author. Even if the marketplace has listing approval enabled, modifying
listings after they are published does not set them back to the
**pendingApproval** state. This means that the listing approval feature
can not fully be used to moderate e.g. listing content, but rather the
number of listings each user has active on the marketplace.

### Closed

A listing can be closed by both the author and the marketplace operator. A closed listing is not returned by the [listings/query](TODO) and [listings/show](TODO) endpoints, but it is still returned by the [own_listings/query](TODO) and [own_listings/show](TODO) endpoints, i.e. it is visible to the author. Both author and marketplace operator can also [open the listing](TODO) after it has been closed i.e. set its state back to published.

### Deleted

Listings in Flex can only be deleted by the operator in Flex Console. In addition, if the author's user account is deleted, all their listings are marked deleted as well. Listing deletion is permanent. Deleted listings don't get returned by any listing endpoints. If a marketplace user has transactions related to a deleted listing, however, the deleted listing can be returned as an included related resource with no other data than the listing id and `deleted: true`. 



- listings can be searched
  - one of the most powerful features of Flex is the listing search.
  - default search by price, keywords, origin, bounds, availability,
    stock et cetera
  - custom search by extended data
    - need to set a search schema so that Flex knows to index the
      attribute
    - public data and metadata
- extended data can also be used to differentiate between different
  types of listings
  - e.g. service listing with availability vs product listing with stock
  - or user profile listing where you can only contact the provider vs
    item listing that can be booked or purchased
