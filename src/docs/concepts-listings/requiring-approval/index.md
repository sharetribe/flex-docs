---
title: Requiring approval for new listings
slug: requiring-approval
updated: 2024-08-09
category: concepts-listings
ingress:
  Sharetribe allows you to require operator approval for new listings
  before they are published. This article explains the feature and
  describes how to take listing approval into use in Sharetribe Console.
published: true
---

## Listing approval

By default, listings in Sharetribe are published as soon as their author
clicks the "publish" button. However, you can also set new listings to
require approval before they are published. When the feature is enabled,
new listings only get published once an operator has reviewed and
approved them.

This feature can be used e.g. for checking that the listing is suitable
for the marketplace. On marketplaces where providers have limitations to
the number of listings they can post, this feature is useful for
allowing certain providers to only post a certain number of listings.

Only new listings are queued for operator review. In other words, if a
listing has already been approved and the provider edits the listing
content, it will not require further approval. This is important to keep
in mind if you use the feature to review content on the marketplace.

At the moment, there is no way to "decline" listing approval. If the
listing requires editing to adhere to your marketplace standards, you
can contact the provider with your suggestions on how to improve the
listing.

Approving a listing does not trigger an automatic email notification.
However, you can for instance
[set up Zapier](https://www.sharetribe.com/help/en/articles/8529941#h_e678e79410)
to listen to events where a listing's state goes from `pendingApproval`
to `published` and send a message.

## Managing listing approval in Sharetribe Console

Listing approval can be enabled in your
[Sharetribe Console](https://console.sharetribe.com/general), under
Build > General. Listing approval is disabled by default.

![Listing approval toggle](listing-approval-toggle.png 'Listing approval is toggled in Build > General')

When your marketplace has listings requiring approval, you can see them
in your Sharetribe Console Listings view. A listing requiring approval
has a badge indicating its state.

![Listing approval badge](pending-approval-badge.png 'Listings pending approval show a badge')

When you click open the listing, the bottom of the listing panel shows a
button to approve the listing.

![Listing approval button](pending-approval-button.png 'Operator can approve listings in Sharetribe Console')

## Approving listings through Integration API

In addition to Sharetribe Console, an operator can also create an
integration to approve listings through the
[Integration API](/introduction/getting-started-with-integration-api/)
through the endpoint
[integration_api/listings/approve](https://www.sharetribe.com/api-reference/integration.html#approve-listing).

If, for instance, your marketplace allows non-premium users to post two
listings and premium users to post five listings, you could create an
Integration API script that automatically approves the listing if the
user has unused listing quota.

## Elements indicating listing approval in Sharetribe Web Template

The Sharetribe Web Template shows UI elements related to pending
listings by default.

When a user publishes a listing on a marketplace that requires operator
approval, the listing state is set as `pendingApproval`. Listings in
`pendingApproval` state are shown with a banner that lets the provider
know that their listing is pending approval. The listing is not yet
shown to other users.

![Banner indicating that listing is pending approval](pending-approval-banner.png 'The template application shows a banner on the listing by default')

When the provider navigates to their Manage Listings page, listings
pending approval are shown with an overlay indicating the listing's
state.

![Listing card overlay](pending-approval-your-listings.png 'Listings pending approval are shown with an informative overlay')
