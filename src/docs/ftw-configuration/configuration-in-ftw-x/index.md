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
  - Extended data configuration and search filters
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

## Important variables
