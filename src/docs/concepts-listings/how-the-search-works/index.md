---
title: How the search works
slug: how-the-search-works
updated: 2019-07-17
category: concepts-listings
ingress:
  Listings search can be crucial for your marketplace to thrive.
  Providing people with the right kind of search parameters and filters
  will help the users to easily find listings relevant to their needs.
published: true
---

## Listings search in Flex

In Flex listings are searched by using the
[/listings/query](https://www.sharetribe.com/api-reference/marketplace.html#query-listings)
endpoint. This article approaches the search from two different
prespectives: keywords and location. In addition to them other search
parameters can be used to filter the search results in order to provide
relevant search content. See the API
[reference documentation](https://www.sharetribe.com/api-reference/marketplace.html#query-listings)
for a full list of search parameters.

## Keyword search

The keyword search works so that it matches the `keywords` parameter to
text content of a listing. The listing attributes that are matched in
keyword search by default are _title_ and _description_. Listing public
data fields can also be used in the keyword search by defining them to
have type `text` in the marketplace's
[listing public search schema](/references/extended-data/#search-schema).
All `text` public data fields with defined schema are indexed for
keyword search.

When the listing text content is indexed, in addition to indexing the
actual word, it is also broken into subwords, _n-grams_. For words
longer than 3 characters, n-grams of 3 and more characters are
constructed from the beginning and end of the word. So if an indexed
field contains the word _local_ in addition to the actual word the
following n-grams are indexed: _loc_, _loca_, _ocal_, and _cal_.

The search results are sorted so that a match with an actual word from
the listing always weighs more than a match with an n-gram. The order in
which matches in different fields of a listing effect the search score
is the following: _title > description > public data fields_. However,
the search score differences between the fields are substantially
smaller than the difference between a match with an actual word in the
listing and an n-gram. Listings that don't match the search keywords at
all are not included in the results.

The `keywords` parameter is a single string that is tokenized on
non-alphanumeric characters. Therefore, passing _local attractions_ as a
value for the parameter will conduct a search with two keywords: _local_
and _attractions_ and those are then matched against the listing
content. A listing will be included in the results, in case any of the
keywords match.

In order to take the keyword search into use in FTW, see the cookbooks
on
[adding keyword search to the top bar](/cookbook-search/use-keyword-search-in-topbar/)
and [modifying filters](/cookbook-search/change-search-filters-in-ftw/).

## Location search

The listings search provides two parameters to modify the search by
location: `origin` and `bounds`. `origin` parameter takes a single
location. It does not limit the results in any way but it sorts the
results from closest to the furthest from the given point. The `origin`
parameter can not be combined with `keywords`.

In order to combine location and keyword search, the `bounds` parameter
can be used. It takes north-east and south-west corners of a bounding
box that limits the returned results to that area. It does not affect
the sorting of results. The bounds can then conviniently be used to
match search results to a map view.
