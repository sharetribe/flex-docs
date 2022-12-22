---
title: Configuration variables
slug: ftw-env2
updated: 2022-10-30
category: ftw-configuration
ingress:
  The combined template has a fair amount of configurations you can edit
  through configuration files. This article explains how to change those
  configurations and what they mean.
published: true
---

There are a lot of settings you can edit and configure through
configuration files. These settings are related to branding, layout,
listings, search, maps, payment and transactions. You can find all
configuration files in the
[config directory](https://github.com/sharetribe/ftw-x/tree/main/src/config).

## Configuration files

All relevant configuration is split between the following files and the
environment variables. You can see the available environment variables
from the [template environment variables](/ftw/ftw-env/) article.

- [configBranding.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/configBranding.js)
  - Marketplace colour, logos, Facebook and Twitter media
- [configLayout.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/configBranding.js)
  - Layout or the search and listing page and aspect ratio for listing
    image variants
- [configListing.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/configListing.js)
  - You can define extended data variables and how they are displayed on
    both the listing and search page. Read more about the available
    settings in the
    [configListing.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/configListing.js)
    file.
- [configSearch.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/configSearch.js)
  - Change between keyword or location search and set default search
    filters and sorting options
- [configMaps.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/configMaps.js)
  - Choose to load maps through Google or Mapbox and location-related
    search settings
- [configStripe.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/configStripe.js)
  - The configuration that Stripe needs to function correctly
- [configTransaction.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/configTransaction.js)
  - Specify the transaction type your marketplace uses
- [configDefaultLocationSearches.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/configDefaultLocationSearches.js)
  - Specify a list of locations that are shown to the user as
    suggestions when they click on the search bar

## Layout configuration

There are three layout options that you can toggle to change how the
search page is rendered and how listing images are displayed in your
marketplace.

### Search page

The SearchPage component of the template has two layout variants: 'map'
and 'list'.

```js
// There are 2 SearchPage variants that can be used:
// 'map' & 'list'
export const searchPageVariant = 'map';
```

You can change the layout of the search page in the
[configLayout.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/configLayout.js#L9)
file by toggling the `searchPageVariant` variable between 'map' and
'list'.

The 'list' layout does not contain a map but instead, displays a grid of
listings with filters shown in the sidebar. This layout is best suited
for cases where users are interested in browsing a list of search
results rather than selecting a location on a map.

The 'map' variant of the SearchPage component displays a map next to
search results. You can use the map to select a location to search from,
allowing users to browse listings in a specific area easily. This layout
is ideal for cases where users are interested in searching for listings
within a particular location or neighborhood.

### Listing images

You can toggle between two options on how listing images are displayed
on the listing page. The 'hero-image' layout option shows a hero section
with a cropped image at the beginning of the page.

The 'full-image' layout option displays an image carousel, which renders
images using their original aspect ratio.

You can change the layout of the search page in the
[configLayout.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/configLayout.js#L9)
file by toggling the `listingPageVariant` variable between 'hero-image'
and 'full-image'.

```js
// export const listingPageVariant = 'hero-image';
export const listingPageVariant = 'full-image';
```

### Aspect ratio for listing image variants

## Search configuration

In the configSearch.js file you can change if the search bar supports
location or keyword search by toggling the `mainSearchType` variable
between 'keywords' and 'location'.

This file also allows you to configure the default filters that are not
based on [extended data](/concepts/listing-extended-data/). The default
filters are:

- Date filter
- Price filter
- Keyword filter

## Important variables
