---
title: Keyword search
slug: keyword-search
updated: 2023-07-05
category: the-new-sharetribe-listings
ingress: This articles explains how Keyword search works in Sharetribe.
published: true
---

As it's name indicates it allows your users to search within your
marketplace based on keywords. You can enable Keyword search from the
"Listings -> Listing search" page in Console.

The search returns listings that match the keywords searched. The match
can be found in the text content of a listing. The listing attributes
that are searched for and matched in keyword search by default are the
Listing title and description. However, you can define new custom Free
text listing fields to be added to the the keyword search parameters

## How are the search results found and sorted?

Listings are sorted by their relevance to the search term. Keywords
matched in the Listing title will be more relevant than in the Listing
description. Keywords matched in the description are more relevant than
matches in listing fields. Full word matches are considered more
relevant than partial matches. Characters with accents and other
diacritical marks get converted into characters without accents or
marks.

## How to add custom fields to the Keyword search results?

When you create
[a new Custom Listing Field](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-add-and-edit-listing-fields/),
if the listing field is a Free Text type of field, you can enable the
option to include the field in the keyword search.

## How can I change the default text displayed in the search bar?

You can do that easily with
[the Microcopy editor](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-use-microcopy-editor/).
Find the “TopbarSearchForm.placeholder” and the
“LocationSearchForm.placeholder” keys and replace the text there for
your own. The default text is “Search bikes…”

## Can I have both keyword and location search available in the same marketplace?

Yes. If your marketplace uses the location search, you can choose to
display a "keyword" filter on your marketplace search page. You can
enable this from the "Listings -> Listing search" page in Console.