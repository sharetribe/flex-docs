---
title: How to manage hosted and local configurations
slug: hosted-and-local-configurations
updated: 2023-06-01
category: ftw-configuration
ingress:
  The Sharetribe Web Template has both local and asset-based
  configurations available. Learn how to combine both types of
  configurations.
published: true
---

The Sharetribe Web Template has a number of configurations that can be
used to customise the template with low code effort. Starting in version
XX-XX, the template can also use [asset-based](/references/assets/)
configurations, if they are defined in Flex Console.

Some configurations are mandatory to define in Flex Console, such as
logo, listing types, listing fields, and minimum transaction size. Those
configurations are read from the hosted assets in the template by
default. This means that if you want to, for instance, add a listing
type with a custom transaction process, or add a custom listing field in
the template code, you will need to modify how configurations get merged
in the template.

## How configurations are merged in the template

The template uses a function [mergeConfig]() in
_src/util/configHelpers.js_ to handle the configurations.

```shell
└── src
    └── util
        └── configHelpers.js
```

```jsx
export const mergeConfig = (configAsset = {}, defaultConfigs = {}) => {
  // defaultConfigs.listingMinimumPriceSubUnits is the backup for listing's minimum price
  const listingMinimumPriceSubUnits =
    getListingMinimumPrice(configAsset.transactionSize) ||
    defaultConfigs.listingMinimumPriceSubUnits;

  return {
    // Use default configs as a starting point for app config.
    ...defaultConfigs,

    // Overwrite default configs if hosted config is available
    listingMinimumPriceSubUnits,

    // Analytics might come from hosted assets at some point.
    analytics: mergeAnalyticsConfig(
      configAsset.analytics,
      defaultConfigs.analytics
    ),

    // Branding configuration comes entirely from hosted assets,
    // but defaults to values set in defaultConfigs.branding for
    // marketplace color, logo, brandImage and Facebook and Twitter images
    branding: mergeBranding(
      configAsset.branding,
      defaultConfigs.branding
    ),

    // Layout configuration comes entirely from hosted assets,
    // but defaultConfigs is used if type of the hosted configs is unknown
    layout: mergeLayouts(configAsset.layout, defaultConfigs.layout),

    // Listing configuration comes entirely from hosted assets
    listing: mergeListingConfig(configAsset, defaultConfigs),

    // Hosted search configuration does not yet contain sortConfig
    search: mergeSearchConfig(
      configAsset.search,
      defaultConfigs.search
    ),

    // Map provider info might come from hosted assets. Other map configs come from defaultConfigs.
    maps: mergeMapConfig(configAsset.maps, defaultConfigs.maps),

    // Include hosted footer config, if it exists
    // Note: if footer asset is not set, Footer is not rendered.
    footer: configAsset.footer,

    // Check if all the mandatory info have been retrieved from hosted assets
    hasMandatoryConfigurations: hasMandatoryConfigs(configAsset),
  };
};
```

Within the _mergeConfig_ function, each different configuration category
has a separate merge function.

For example, let's take a look at how to modify the _mergeListingConfig_
function to include listing types from both hosted asset based
configurations and local configurations.

```jsx
const mergeListingConfig = (hostedConfig, defaultConfigs) => {
  // Listing configuration is splitted to several assets in Console
  const hostedListingTypes = hostedConfig.listingTypes?.listingTypes;
  const hostedListingFields = hostedConfig.listingFields?.listingFields;
  const hostedListingConfig =
    hostedListingTypes && hostedListingFields
      ? {
          listingTypes: restructureListingTypes(hostedListingTypes),
          listingFields: restructureListingFields(hostedListingFields),
        }
      : null;

  const { listingTypes = [], listingFields = [], ...rest } =
    hostedListingConfig || defaultConfigs.listing;
  const listingTypesInUse = getListingTypeStringsInUse(listingTypes);

  return {
    ...rest,
    listingFields: validListingFields(listingFields, listingTypesInUse),
    listingTypes: validListingTypes(listingTypes),
    enforceValidListingType:
      defaultConfigs.listing.enforceValidListingType,
  };
};
```

By default, this function first creates a _hostedListingConfig_ object
from the hosted asset listing configurations. It then uses the hosted
config to determine listing types and listing fields, and only refers to
default config if neither listing types nor listing fields exist in the
hosted asset.

## Example: use both hosted and local configs for listing types

Let's say you want to use multiple listing types – one for regular
bookings, defined in Flex Console, and one for
[negotiated bookings](https://github.com/sharetribe/flex-example-processes/tree/master/negotiated-booking),
defined in the template.

First, follow the directions in the process README.md to configure the
template to use the new process. Then, make the following modifications
to the _mergeListingConfig_ function:

```diff
const mergeListingConfig = (hostedConfig, defaultConfigs) => {
...
- const { listingTypes = [], listingFields = [], ...rest } =
-   hostedListingConfig || defaultConfigs.listing;
+ const { listingFields = [], ...rest } = hostedListingConfig || defaultConfigs.listing;
+
+ const listingTypes = [
+   ...hostedListingConfig.listingTypes,
+   ...defaultConfigs.listing.listingTypes,
+ ];
...
```

With this change, you are still retrieving listing fields and other
configurations primarily from hosted configurations, and using default
configurations only as a fallback. However, listing types now combine
both hosted asset and default config listing types.
