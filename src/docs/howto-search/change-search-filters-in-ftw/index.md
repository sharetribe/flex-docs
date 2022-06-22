---
title: Change search filters in FTW
slug: change-search-filters-in-ftw
updated: 2022-06-14
category: how-to-search
ingress:
  This guide describes how to change the search filters in Flex Template
  for Web (FTW).
published: true
---

The search experience can be improved by adding search filters to narrow
down the results. The filters rely on listing's indexed data.

There are 3 different UI contexts that render filters. On mobile layout,
all the filters are rendered to modal inside `SearchFiltersMobile`
component. On desktop layout, there are `SearchFiltersPrimary` for most
important filters and extra filters are put to `SearchFiltersSecondary`
panel which opens, when user clicks _"More filters"_ button.

## Filter types

The Flex template for web has different filter types:
_BookingDateRangeFilter_, _KeywordFilter_, _PriceFilter_,
_SelectSingleFilter_ and _SelectMultipleFilter_. Select single and
select multiple filters are generic in a way that they can be used to
filter search results using different kinds of data. The price, and date
range filters on the other hand are only used for filtering by price and
date range. Listings with hourly bookings can also be filtered by their
availability in a date range with an optional minimum duration. Keyword
filter is a bit special case - there is more info about it later.

_SelectSingleFilter_ and _SelectMultipleFilter_ can be used with
extended data. The _SelectSingleFilter_ can be used to filter out
listings with only one string value in related public data field. E.g.
listing's publicData attribute could contain: `category: 'smoke'`. The
related Marketplace API listing query could then be made with query
parameter: `pub_category=smoke`.

The _SelectMultipleFilter_ on the other hand can take multiple values
for a single search parameter. In this case, listing entity could
contain public data `amenities: ['towels', 'bathroom', 'jacuzzi']` and
the query parameter, to retrieve that listing among other search
results, could be `pub_amenities=has_any:jacuzzi,barbeque`.

We'll tell you more about these filters later on in this article.

## Keyword filter

Keyword filter works a bit differently than other filters. It does
filter search results, but it also sorts those results according to
strongly listing data (title, description, and possible extended data)
correlates with the search string. Currently, there is no decay function
that would map keyword match correlation with distance to `origin` and
therefore, the _origin_ param can't be used at the same time as the
_keyword_. You can read more about how the keyword search works from
related [background article](/concepts/how-the-listing-search-works/).

![Desktop filters](./keyword-search.png)

It is possible to remove location search from topbar and replace it with
the keyword search or use them together (without origin param). Here's
[a rough guide on how to do it](/how-to/use-keyword-search-in-topbar/).

> Note: search strings with only 1 or 2 letters have a longer timeout
> before the search query is made.

## Adding a new search filter

Next we'll guide you through the steps of adding a _capacity_ filter to
the marketplace.

First step for adding a new filter is to make sure that the data being
used for filtering is saved in the listing's `publicData` attribute. On
how to achieve this, please refer to the
[Extend listing data in FTW](/how-to/extend-listing-data-in-ftw/)
cookbook. Another aspect in search filters is that a
[search schema](/references/extended-data/#search-schema) needs to be
added to the data in order for API to index it for search. Adding search
schema can be done by the
[Flex CLI](/introduction/getting-started-with-flex-cli/).

Once a public data attribute is added to the listings and the data
attribute is indexed, the listing searches can be filtered by that
attribute by adding a query parameter that consists of a preceding
"pub\_" and the attribute name, so for the _capacity_ attribute the
parameter would be "pub*capacity". You might have guessed that "pub\_"
refers to public data, "meta\_" would refer to \_metadata*, which is
another type of extended data.

Further reading on public data can be found in the
[Extend listing data in FTW](/how-to/extend-listing-data-in-ftw/)
cookbook.

> **Note:** Only top-level attributes can be indexed.

### Common changes

A few common changes are required to add a select single or a select
multiple filter to desktop and mobile views.

First of all, filter configurations need to be defined in the
`marketplace-custom-config.js` file:

```shell
└── src
    └── marketplace-custom-config.js
```

<extrainfo title="FTW-product has moved config files into a different location">

```shell
└── src
    └── config
        └── marketplace-custom-config.js
```

</extrainfo>

There you need to add the capacity filter's configurations to the
`filters` array:

```js
  {
    id: 'capacity',
    label: 'Capacity',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_capacity'],
    config: {
      // Schema type is enum for SelectSingleFilter
      schemaType: 'enum',

      options: [
        { key: '1to3', label: '1 to 3' },
        { key: '4to6', label: '4 to 6' },
        { key: '7to9', label: '7 to 9' },
        { key: '10plus', label: '10 plus' },
      ],
    },
  },
```

> **Note**: you might have done this already if you followed the
> [Extend listing data in FTW](/how-to/extend-listing-data-in-ftw/)
> cookbook article.

In the above configuration, we defined filter's `id` and `label`. The
label is not modified through the microcopy file (e.g. _en.json_),
because we thought that having it here would make customizations easier.
However, you could use
`<FormattedMessage id="some.microcopy.key.here" />` component instead of
plain string if you want.

`type` configuration refers to existing filter component. The current
filters that can deal with extended data are: SelectSingleFilter, and
SelectMultipleFilter.

`group` can be 'primary' or 'secondary'. On desktop layout, primary
filters are those which are visible by default and secondary filters are
not visible. You can open secondary filters panel by clicking "More
filters" button.

`queryParamNames` is defining the query parameter key(s) that the filter
component can handle. For _SelectSingleFilter_ and
_SelectMultipleFilter_, you should use query param names that point to
Marketplace API query params. For example, if you have _"amenities"_
field in your listing's public data, the correct name for the query
parameter should be `pub_amenities`.

`config` would contain any filter specific configurations. For example,
_PriceFilter_ has price range (`min`, `max` and `step`) defined there.

As a summary, that new filter configuration in `filters` array, is
enough to render _capacity_ filter on search page. That is, if you have
_capacity_ field defined in listing's public data and that public data
has correct schema added to the search engine using
[Flex CLI](/introduction/getting-started-with-flex-cli/).

## Creating your own filter types

If you are creating new filter types note that we are using two
different types of components: popup and plain. Popup components are
rendered as primary dropdowns in the search view in
`SearchFiltersPrimary` component. Plain components are used with
`SearchFiltersMobile` and `SearchFiltersSecondary`.
_SearchFiltersSecondary_ opens sacondary filters in a distinct panel in
order to fit additional filters to the desktop search view.

To make creating new filters easier, there are two generic components:
`FilterPoup` and `FilterPlain`. These components expect that you give
form fields as child component. Check `SelectMultipleFilter` to see how
these components work.

When you have your custom filter component ready, you need to add it to
**SearchPage/FilterComponent.js**:

```shell
└── src
    └── containers
        └── SearchPage
            └── FilterComponent.js
```
