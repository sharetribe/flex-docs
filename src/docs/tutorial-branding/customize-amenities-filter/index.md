---
title: Customize amenities filter
slug: customize-amenities-filter
updated: 2020-06-04
category: tutorial-branding
ingress:
  Change the options for amenities filter and update the search schema.
published: true
---

In the FTW-daily template, there are two example filters: _amenities_
and _category_.

![Amenities filter with Saunatime content](./default-amenities-filter.png)

In this tutorial, we change the options inside amenities filter, but the
same approach works with category filter too.

## Update Amenities filter

The configuration for the default filters on the search page can be
found from file: _marketplace-custom-config.js_

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

In that file, the filters and their configs are listed in an array:

```js
export const filters = [
```

If you find amenities from that list, you should see some basic info.
E.g. 'amenities' filter is actually of type `SelectMultipleFilter`,
which is the component that actually renders the amenities filter on
search page. In the config section, you can find `options`:

```js
{
  id: 'amenities',
  label: 'Amenities',
  type: 'SelectMultipleFilter',
  group: 'secondary',
  queryParamNames: ['pub_amenities'],
  config: {
    // Schema type options: 'enum', 'multi-enum'
    // Both types can work so that user selects multiple values when filtering search results.
    // With "enum" the functionality will be OR-semantics (Nike OR Adidas OR Salomon)
    // With "multi-enum" it's possible to use both AND and OR semantics with searchMode config.
    schemaType: 'enum',

    // Optional modes: 'has_all', 'has_any'
    // Note: this is relevant only for schema type 'multi-enum'
    // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
    searchMode: 'has_all',

    // "key" is the option you see in Flex Console.
    // "label" is set here for this web app's UI only.
    // Note: label is not added through the translation files
    // to make filter customizations a bit easier.
    options: [
      {
        key: 'towels',
        label: 'Towels',
      },
      {
        key: 'bathroom',
        label: 'Bathroom',
      },
      // other options
    ],
  },
},
```

**This _option_ syntax has two properties:**

- **key**:

  Key is saved to listing's public data when the listing is created.

  ![Console: amenities in public data](./console-amenities-public-data.png)

- **label**:

  Label is just a hard-coded string that is shown in the UI. So, there
  are no microcopy for these in _en.json_ file. It's easier to modify
  options this way - just change the content of
  _marketplace-custom-config.js_.

We want amenities to be related to our cottage-rental marketplace. We'll
use the following options:

```js
options: [
  {
    key: 'terrace',
    label: 'Terrace',
  },
  {
    key: 'bathroom',
    label: 'Bathroom',
  },
  {
    key: 'swimming_pool',
    label: 'Swimming pool',
  },
  {
    key: 'jacuzzi',
    label: 'Jacuzzi',
  },
  {
    key: 'lake_view',
    label: 'Lake view',
  },
  {
    key: 'sea_view',
    label: 'Sea view',
  },
  {
    key: 'barbeque',
    label: 'Barbeque',
  },
  {
    key: 'fireplace',
    label: 'Fireplace',
  },
];
```

After you have saved the file, you should see the following options on
the search page:

![Amenities filter with CottageDays content](./updated-amenities-filter.png)

<extrainfo title="Extra: how to remove Amenities filter?">

The answer is simple: just remove the object literal from the `filters`
array.

If you want to add more filters (of type: _enum_), you can just add more
filters configurations that use `SelectSingleFilter` or
`SelectMultipleFilter`.

For example, you could add filter for public data field `view`:

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
        { key: 'sea', label: 'Sea' },
        { key: 'lake', label: 'Lake' },
        { key: 'forest', label: 'Forest' },
        { key: 'garden', label: 'Garden' },
        { key: 'other', label: 'Other' },
      ],
    },
  },
```

Note: this assumes that you have added 'view' to the
[extended data](https://www.sharetribe.com/docs/references/extended-data/)
of the listing entity through the `EditListingFeaturesPanel` component.

Read more from the article:
[Change search filters in FTW](/how-to/change-search-filters-in-ftw/)

</extrainfo>

Then you need to create listings, which have some of these amenities
selected.

## How to take the filter into use?

Amenities filter is just an example filter component since quite many
marketplaces would need something like that. However, it is not added to
the search engine by default, because it might be that the relevant key
is not actually called _amenities_ but something different. (E.g.
_kitchenware_ could be a similar multi-enum filter for a cottage-rental
marketplace.)

If we want to make `sdk.listing.query` endpoint to understand that
listings have a new public data field, we need to add search schema for
it. Otherwise, this additional data is just gibberish to the search
engine. Search schema can be added with Flex CLI.

### Install Flex CLI

Quick start

```shell
yarn global add flex-cli
flex-cli login
```

The last command will prompt you your API key, which you need to create
in Flex Console
(_[Account > API keys](https://flex-console.sharetribe.com/api-keys)_).

Read more about
[how to install Flex CLI](/introduction/getting-started-with-flex-cli/).

### Set search schema with Flex CLI

When you have installed Flex CLI to your command line environment, we
can set the search schema for amenities public data key. Since one
listing can have multiple amenities, the schema type is **multi-enum**.

```shell
flex-cli search set --key amenities --type multi-enum --scope public -m my-marketplace-test
```

Basically this command says that we set a new _search index_ for the
search engine:

- `--key amenities`: key for this new searchable data is _amenities_.
- `--type multi-enum`: the type is an enumeration with an array of
  choices.
- `--scope public`: key can be found from the public data section of a
  listing entity.

  Read more about [public data](/references/extended-data/).

- `-m my-marketplace-test`: your marketplace ID.

  With CottageDays test marketplace, the ID is _cottagedays-test_. You
  can check your marketplace ID from Flex Console (Build section).

Read more about
[setting search schemas with Flex CLI](/how-to/manage-search-schemas-with-flex-cli/).

<extrainfo title="Extra: what about category filter?">

Category filter is similar filter than amenities, but only one
enumeration string is allowed per listing. Which is to say, that listing
can belong to only one category. So, if you decide to add _category_ key
to the search schema, you need to use type **enum** instead:

```shell
flex-cli search set --key category --type enum --scope public -m my-marketplace-test
```

</extrainfo>

---

In the next article, we add FAQ page. With that article, you learn how
to add static pages. Quite often there's a need to add more info about
how the marketplace works and adding a static page is the easiest way to
do that. <br /> [› Go to the next article](/tutorial/add-faq-page/)
