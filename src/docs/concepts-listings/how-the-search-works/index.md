---
title: How the listing search works
slug: how-the-listing-search-works
updated: 2023-10-24
category: concepts-listings
ingress:
  Listings search can be crucial for your marketplace to thrive.
  Providing people with the right kind of search parameters and filters
  will help the users to easily find listings relevant to their needs.
published: true
---

## Listings search in Sharetribe

In Sharetribe, listings are searched by using the
[/listings/query](https://www.sharetribe.com/api-reference/marketplace.html#query-listings)
endpoint. Sharetribe has a powerful listing search engine, which can
find listings based on multiple criteria:

- **Geolocation.** The search can be used to display only listings that
  are within a provided radius from certain coordinates. Read more about
  [location search below](#location-search).
- **Free text.** The search can be used to find listings that have a
  [certain keyword](#keyword-search) provided by the user. The search
  can find from listing title and description. You can also choose to
  index some public data fields so the search finds from them as well.
- **Price.** It's possible to filter out listings with too high or too
  low price.
  - e.g. show only listings between $20 and $100:
    `sdk.listings.query({ price: "2000,10000" })`
- **Availability.** It's possible to filter out listings that have
  insufficient availability during a given time range. Works together
  with seats so that you can filter for availability with minimum number
  of seats. It is also possible to filter by required minimum duration
  of availability for the given time range.
  - e.g. show only listings available for October 22-29, 2022:
    `sdk.listings.query({ availability: "full", start: "Sat Oct 22 2022 01:00:00 GMT+0100", end: "Sat Oct 29 2022 01:00:00 GMT+0100" })`
- **Stock.** It's possible to show all listings or only listings with
  positive stock.
  - e.g. show only listings with at least one item in stock:
    `sdk.listings.query({ minStock: 1 })`
- **Custom filter: any value.** Any number of custom filters can be
  added. "Any value" filters out listings that don't have the given
  value (or any of a set of given values) in their public data.
  - e.g. show only listings from public data with condition 'used':
    `sdk.listings.query({ pub_condition: "used" })`
- **Custom filter: all values**. Filters out listings that don't have
  all values in a given set. A typical use case is choosing among
  "amenities": an apartment must have both balcony and floor heating in
  their public data to be displayed in the search.
  - e.g. show only listings that have both balcony and floor heating:
    `sdk.listings.query({ pub_amenities: "has_all:balcony,floorHeating" })`
- **Custom numeric filter.** Filters out listings that don't have a
  certain numeric value in their public data. For example, you might
  want to build a slider filter for the skill level of the user, ranging
  from 0 to 10.
  - e.g. show only listings for user skill levels 4-7:
    `sdk.listings.query({ pub_userSkillLevel: "4,7" })`
- **Sorting.** Listing sorting order can be customized per query.
  Sorting is supported by one or more of: listing price, listing
  creation time, or any numeric attribute in the listing's public data
  or metadata.
  - e.g. sort listings for user skill level:
    `sdk.listings.query({ ...params, sort: "pub_userSkillLevel" })`

This article approaches the search from two different perspectives:
keywords and location. See the API
[reference documentation](https://www.sharetribe.com/api-reference/marketplace.html#query-listings)
for a full list of search parameters. Do note that for all search
parameters, you will need to create a
[search schema](/how-to/manage-search-schemas-with-sharetribe-cli/) so
that the data is indexed correctly for search.

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

In order to take the keyword search into use in the Sharetribe Web
Template, you need to
[change the configuration files](/template/configuration/#search-configuration).

## Location search

The listings search provides two parameters to modify the search by
location: `origin` and `bounds`. `origin` parameter takes a single
location. It does not limit the results in any way but it sorts the
results from closest to the furthest from the given point. The `origin`
parameter can not be combined with `keywords`.

In order to combine location and keyword search, the `bounds` parameter
can be used. It takes north-east and south-west corners of a bounding
box that limits the returned results to that area. It does not affect
the sorting of results. The bounds can then conveniently be used to
match search results to a map view.

## How about user search?

The Sharetribe Marketplace API does not have an endpoint for querying
users. This is because listings are modeled as the focus of the
marketplace. If you do, however, want to implement a search
functionality for users, you have a few options.

### Users as listings

When modifying your listing creation flow, you can model the listings as
service provider profiles. This means that the user entity is distinct
from the user's service provider entity. You can then use the default
listing search to query the service provider profiles with all the query
options described above.

### Custom user search endpoint in the template server

The Sharetribe Integration API does have an endpoint for querying users.
However,
[using the Integration API safely requires a trusted context](/concepts/marketplace-api-integration-api/#when-to-use-the-integration-api),
such as the template application server.

<warning>

Never use Integration API from browser code! Integration API can only be
securely used in server environments.

</warning>

In addition, the Integration API
[/users/query](https://www.sharetribe.com/api-reference/integration.html#query-users)
endpoint returns not only public user information but also non-public
information.

This means that if you do want to use the Integration API user query,
you need to create a custom server endpoint in the template's server
that calls the Integration API endpoint and **only returns the user's
public information** – public data and metadata – back to the browser.
Otherwise, you risk revealing sensitive user information to everyone who
visits your marketplace site.

That said, the Integration API query has fewer filtering and sorting
options than the Marketplace API listing query, so for any level of
complexity in your user search we recommended using the "users as
listings" approach.
