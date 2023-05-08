---
title: Keyword search
slug: keyword-search
updated: 2023-04-24
category: operator-guides-listings
ingress:
  You can enable Keyword search from [the Listing Search settings page
  in Console](link to the console listing search page).
published: true
---

The search matches the keywords parameter to text content of a listing.
The listing attributes that are matched in keyword search by default are
the Listing title and description. However, you can define new custom
Free text listing fields to be added to the the keyword search
parameters

## How are the search results found and sorted?

When a user performs a search, we sort the results based on their
relevance to that specific search term. We use our own algorithm to
decide the relevance. You can read
[the technicalities here](https://www.sharetribe.com/docs/concepts/how-the-listing-search-works/#keyword-search).
In short:

Keywords matched in the Listing title will be more relevant than in
description. Keywords match in the description are more relevant than
listing fields Full word matches are considered more relevant than
partial matches. Characters with accents and other diacritical marks get
converted into characters without accents or marks.

## How to add custom fields to the Keyword search results?

When you create [a new Custom Listing Field](LINK TO adding listing
field articles), if the listing field is a Free Text type of field, you
can enable the option to include the field in the keyword search.

## How can I change the default text displayed in the search bar?

You can do that easily with [the Microcopy editor](link to microcopy
editor article). Find the “TopbarSearchForm.placeholder” and the
“LocationSearchForm.placeholder” keys and replace the text there for
your own. The default text is “Search bikes…”

## Can I have both keyword and location search available in the same marketplace?

Not by default. You can only use one of them at the same time. If you
want to be able to use both, you will need to self host the platform.
