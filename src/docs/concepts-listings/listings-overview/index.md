---
title: Listings in Sharetribe
slug: listings-overview
updated: 2024-10-29
category: concepts-listings
ingress:
  Sharetribe powers online marketplaces, and listings are at the core of
  any marketplace. This article explains the different aspects of
  listings in Sharetribe.
published: true
---

On a Sharetribe marketplace, listings represent the items, facilities or
services that users buy and sell or book and offer. Using extended data,
listings can be modified to cover several different kinds of
marketplaces.

## Listing lifecycle

Between being created and deleted, listings go through several different
states. Depending on the listing's state, they are either returned with
the public Listing endpoints or they are only available to the listing's
author.

When tracking
[listing events](/references/events/#supported-event-types) through the
[Integration API](https://www.sharetribe.com/api-reference/integration.html),
it is important to also pay attention to the state of the listing. For
instance, in the default Sharetribe Web Template implementation, the
listing is created as draft, and then goes through several updates in
the draft state before it is published. In other words, to catch the
correct listing event, it is useful to filter by both event type and
listing state.

### Draft

You may want to allow users to create listings as drafts first, and then
publish them separately. To do that, you would create the listing in
**state: draft**. Draft listings are not returned by the
[listings/query](https://www.sharetribe.com/api-reference/marketplace.html#query-listings)
endpoint, but they are visible to the author and through Sharetribe
Console.

Draft listings can be published using the
[own_listings/publish_draft](https://www.sharetribe.com/api-reference/marketplace.html#publish-draft-listing)
endpoint, and they can be discarded using the
[own_listings/discard_draft](https://www.sharetribe.com/api-reference/marketplace.html#discard-draft-listing)
endpoint.

### Pending approval

If the marketplace
[requires listing approval for new listings](/concepts/requiring-approval/),
a draft listing does not get published directly when the
[own_listings/publish_draft](https://www.sharetribe.com/api-reference/marketplace.html#publish-draft-listing)
is called. Instead, it moves into **state: pendingApproval**. The
operator can then approve the listing in Sharetribe Console or, if the
approval is dependent on e.g. an extended data attribute, through the
[listing approval Integration API endpoint](https://www.sharetribe.com/api-reference/integration.html#approve-listing).
A use case for this would be e.g. a marketplace where non-paid members
can publish one listing and paid members can publish unlimited listings
– an integration could check whether the user has a `premium: true` flag
in their metadata and approve the listing accordingly.

### Published

Published listings are returned by
[listings/query](https://www.sharetribe.com/api-reference/marketplace.html#query-listings)
and
[listings/show](https://www.sharetribe.com/api-reference/marketplace.html#show-listing)
endpoints. To directly create a published listing instead of a draft,
you would need to use the
[own_listings/create](https://www.sharetribe.com/api-reference/marketplace.html#create-listing)
endpoint. Creating a published listing will follow the pending approval
rules of the marketplace – if listing approval is required, a listing
created with **own_listings/create** will be in **state:
pendingApproval** instead of **state: published**.

After a listing has been published, it can still be modified by the
author. Even if the marketplace has listing approval enabled, modifying
listings after they are published does not set them back to the
**pendingApproval** state. This means that the listing approval feature
can not fully be used to moderate e.g. listing content, but rather the
number of listings each user has active on the marketplace.

### Closed

A listing can be closed by both the author and the marketplace operator.
A closed listing is not returned by the
[listings/query](https://www.sharetribe.com/api-reference/marketplace.html#query-listings)
and
[listings/show](https://www.sharetribe.com/api-reference/marketplace.html#show-listing)
endpoints, but it is still returned by the
[own_listings/query](https://www.sharetribe.com/api-reference/marketplace.html#query-own-listings)
and
[own_listings/show](https://www.sharetribe.com/api-reference/marketplace.html#show-own-listing)
endpoints, i.e. it is visible to the author.

Both author and marketplace operator can also
[open the listing](https://www.sharetribe.com/api-reference/marketplace.html#open-listing)
after it has been closed i.e. set its state back to published. However,
if the marketplace
[restricts listing posting rights](https://www.sharetribe.com/help/en/articles/9503118-restrict-listing-posting-rights)
and the author's posting rights have been revoked, the author cannot
open closed listings.

### Deleted

Listings in Sharetribe can only be deleted by the operator in Sharetribe
Console. In addition, if the author's user account is deleted, all their
listings are marked deleted as well. Listing deletion is permanent.
Deleted listings don't get returned by any listing endpoints. If a
marketplace user has transactions related to a deleted listing, however,
the deleted listing can be returned as an included related resource with
no other data than the listing id and `deleted: true`.

## Listing extended data

Listings are one of the resource types in Sharetribe where you can add
[extended data](/references/extended-data/). This means that listings
can have custom attributes beyond the default ones that Sharetribe
offers. Extended data can be managed through Marketplace API
[own_listings](https://www.sharetribe.com/api-reference/marketplace.html#own-listings)
and Integration API
[listings](https://www.sharetribe.com/api-reference/integration.html#listings)
create and update endpoints, as well as in Sharetribe Console for
individual listings.

Two example use cases for listing extended data are custom search and
differentiating between listing types. However, listing extended data is
a powerful feature to customise listing behavior in Sharetribe, so there
are multiple use cases that can be solved with setting attributes in
listing extended data and then either passing those attributes as query
parameters or managing the client application behavior based on the
attributes.

### Custom listing search

One of the most powerful features of Sharetribe is the listing search
using the
[listings/query](https://www.sharetribe.com/api-reference/marketplace.html#query-listings)
endpoint. By default, you can query by price,
[keywords, origin,](/concepts/how-the-listing-search-works/) bounds,
availability, and stock, among others.

In addition to the default parameters, you can query listings by public
extended data attributes, i.e. public data and metadata. You will need
to
[set a search schema](/how-to/manage-search-schemas-with-sharetribe-cli/)
for the attribute so that it is indexed for search within Sharetribe,
unless the attribute has been defined as a listing field in Console.

### Different types of listings

In addition to search filtering, you can also build views that filter
listings by type.

You can for instance create service listings with
[availability and bookings](/references/availability/), as well as
product listings with [stock](/references/stock/), in the same
marketplace, and differentiate them with a **listingType** attribute in
listing extended data. With both availability and stock listings in the
same marketplace, you likely want to have separate
[transaction processes](/concepts/transaction-process/), whose
information is also saved in the listing extended data.

By passing listing type as a query parameter to the endpoint, you can
then create differentiated views for the two types of listings. Again,
using extended data as query parameters requires
[setting a search schema](/how-to/manage-search-schemas-with-sharetribe-cli/)
if the field does not have a Console-created search schema by default.

Some marketplaces want to allow filtering by entities that are not
strictly speaking listings available to be purchased. Examples include
searching by service provider, or searching for storefronts to see what
listings they offer. In these kinds of cases, it is useful to model
those elements as a new type of listing, and then determine their
behavior in the client app based on the extended data attribute.

For instance, for a service marketplace, you could model the service
provider listings as bookable profiles. You could also create a
searchable storefront listing that cannot itself be booked, and instead
it displays all the listings from that specific listing author and
allows users to contact the store.

In Sharetribe, listings can be modeled and modified to cover a range of
different use cases. If you are wondering about a use case for listings
in Sharetribe, do reach out to Sharetribe Support through the chat
widget in your Sharetribe Console and let us know. We'll be happy to
help you figure out your specific use case and give you some suggestions
for implementation.
