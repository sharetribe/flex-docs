---
title: Filter listings with extended data
slug: filter-with-extended-data
updated: 2020-07-14
category: tutorial-extended-data
ingress:
  Make the most of extended data and learn how to use listing public
  data as a filtering query parameter in listings search.
published: true
---

## Filter search results

Listing entities can have 2 types of extended data that you can use to
filter listing queries: public data and metadata. Private data and
protected data are not revealed for listings returned with public
queries.

Adding filtering params to `sdk.listings.query` is pretty
straightforward, you just need to know the name of the extended data
field and add a correct prefix with it. The prefix can be `pub_` for
public data key or `meta_` for metadata key.

```js
sdk.listings
  .query({
    pub_view: 'lake',
  })
  .then(res => {
    // res.data contains the response data
  });
```

However, we have some ready-made filter components that can handle the
actual query on the search page.

### Prerequisites: data and its schema

Before filtering is possible, there are some prerequisites as you might
remember from the earlier tutorial article:
[Customize amenities filter](/tutorial/customize-amenities-filter/#how-to-take-the-filter-into-use).
There need to be listings with first-level keys in extended data (nested
JSON data is not supported by the Flex search engine) - and you need to
add schema to that extended data field using
[Flex CLI](/how-to/manage-search-schemas-with-flex-cli/).

In one of the previous
[tutorial article](/tutorial/add-extended-data/), we added
_"view"_ key to the listing's extended data - so the first prerequisite
is already covered. Now we add the schema for it.

```shell
flex-cli search set --key view --type enum --scope public -m my-test-marketplace
```

Basically this command says that we set a new _search index_ for the
search engine:

- `--key view`: key for this new searchable data is _amenities_.
- `--type enum`: the type is an enumeration with a single string as
  value.
- `--scope public`: key can be found from the public data section of a
  listing entity.

  Read more about [public data](/references/extended-data/).

- `-m my-marketplace-test`: your marketplace ID.

  With CottageDays test marketplace, the ID is _cottagedays-test_. You
  can check your marketplace ID from Flex Console (Build section).

### Add SingleSelectFilter component

Since our public data key has _"enum"_ as its schema type, we could use
an existing filter component: SingleSelectFilter.

To use that filter, we need to add its configurations to
_marketplace-custom-config.js_.

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

However, we actually have done that already in the
[Add extended data to listing entity](/tutorial/add-extended-data/)
article.

Just to recap, we added the following configuration to the _filters_
array:

```js
  {
    id: 'view',
    label: 'View',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_view'],
    config: {
      // Schema type is enum for SelectSingleFilter
      schemaType: 'enum',
      options: [
        { key: 'sea', label: 'Sea view' },
        { key: 'lake', label: 'Lake view' },
        { key: 'forest', label: 'Forest view' },
        { key: 'garden', label: 'Garden view' },
      ],
    },
  },
```

With that config, we are saying that this filter is using
**SelectSingleFilter** component, its query parameter is **pub_view**,
and the filter is shown as a secondary filter (i.e. user needs to click
_"More filters"_ panel open).

After that, we can go to the search page and check if the filter works.
If you are developing against localhost and using the default
development port, you can open the following URL directly:
[http://localhost:3000/s?pub_view=sea](http://localhost:3000/s?pub_view=sea)

In addition to this tutorial, there are a couple of extra articles that
you could check to read more about Extended data:

- [Extended data](/references/extended-data/)
- [Manage search schemas with Flex CLI](/how-to/manage-search-schemas-with-flex-cli/)
- [Extend listings](/how-to/extend-listing-data-in-ftw/) with
  your own data.
- [Search filters in FTW](/how-to/change-search-filters-in-ftw/)

## What you should do next?

After this tutorial, you could explore other articles in here. At least
the following articles might interest you:

- [Edit email templates](/how-to/edit-email-templates-with-flex-cli/)
- [Customize pricing](/concepts/pricing/)
- [Customize the transaction process](/concepts/transaction-process/)
