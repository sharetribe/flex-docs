---
title: Listings in Flex
slug: listings-overview
updated: 2022-06-06
category: concepts-listings
ingress:
  Flex powers online marketplaces, and listings are at the core of any marketplace. This article explains the different aspects of listings in Flex.
published: true
---

- listing lifecycle
  - draft
  - pending approval => link to article
  - published
  - closed
  - deleted
  - tracking listing events, it's useful to also pay attention to the state of the listing in the event => FTW templates update the draft listing several times before publishing it or setting it to pending approval
- listings can be searched
  - one of the most powerful features of Flex is the listing search.
  - default search by price, keywords, origin, bounds, availability, stock et cetera
  - custom search by extended data
    - need to set a search schema so that Flex knows to index the attribute
    - public data and metadata
- extended data can also be used to differentiate between different types of listings
  - e.g. service listing with availability vs product listing with stock
  - or user profile listing where you can only contact the provider vs item listing that can be booked or purchased

