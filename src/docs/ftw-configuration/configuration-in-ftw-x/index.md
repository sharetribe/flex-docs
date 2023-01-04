---
title: Configuration variables
slug: configuration
updated: 2023-01-01
category: ftw-configuration
ingress:
  The Sharetribe Web Template has many configurations you can edit
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
- [configDefault.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/configDefault.js)
  - Change localization settings, marketplace currency and add social
    media links
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

## Branding

The
[configBranding.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/configBranding.js)
file allows you to customize the branding and appearance of your
marketplace. The configurations you can change include the marketplace's
color, logos for desktop and mobile devices, a background image, and
default images for social media sharing.

The `marketplaceColor` constant defines the primary color for your
marketplace, which is used to style various elements throughout the
site.

The `logoImageDesktopURL` and `logoImageMobileURL` constants specify the
URL for the desktop and mobile logos, respectively.

The `brandImageURL` constant specifies the URL for a background image
that is used on several pages.

The `facebookImageURL` and `twitterImageURL` constants specify the
default images for social media sharing on Facebook and Twitter,
respectively.

Keep in mind that these constants are only a small part of your
marketplace's overall branding and appearance. You may need to modify
other elements, such as CSS styles, to fully customize the appearance of
your site.

## Common configurations

The `marketplaceName` setting specifies the name of your marketplace.
This name is used in various places throughout the site, such as in
microcopy and in meta tags for SEO and social media sharing.

### Currency and pricing

The currency setting specifies the currency used in your marketplace. It
must be in ISO 4217 currency code and should match one of the currencies
listed in the currencySettings.js file.

The `listingMinimumPriceSubUnits` setting specifies the minimum price
for a listing in your marketplace, expressed in currency subunits (e.g.,
cents). A value of 0 means that there is no minimum price for listings.
Note that Stripe may charge a minimum fee that depends on factors such
as the country and currency.

### Locale

You can use the localization setting to specify the locale and the first
day of the week used in calendars. This setting contains two properties:

- `locale`: The locale of your marketplace, expressed as a language
  code. The default value is 'en' for English.

- `firstDayOfWeek`: The first day of the week in your marketplace,
  expressed as a number between `0` (Sunday) and `6` (Saturday). The
  default value is `1` for Monday.

For example, to change the locale to French, you would set the `locale`
property to `'fr'`. To change the first day of the week to Sunday, you
would set the `firstDayOfWeek` property to `0`.

### Structured data

The `siteFacebookPage`, `siteInstagramPage`, and `siteTwitterHandle`
settings in the code specify the schema.org organization metadata and
are used in the meta tags for social media sharing.

The `siteFacebookPage` setting specifies the Facebook page associated
with your marketplace or organization. The page should be expressed as a
URL (e.g., 'https://www.facebook.com/sharetribe/' or '@sharetribe').

The `siteInstagramPage` setting specifies the Instagram page associated
with your marketplace or organization. The page should be expressed as a
URL (e.g., 'https://www.instagram.com/sharetribe/').

The `siteTwitterHandle` setting specifies the Twitter handle associated
with your marketplace or organization. The handle should be expressed as
a username (e.g., '@sharetribe').

You can also specify address information to be used in your site's
structured data. The address setting contains four properties:

- `addressCountry`: The country in which your marketplace or
  organization is located, expressed as an ISO 3166-1 alpha-2 country
  code (e.g., 'FI' for Finland).
- `addressRegion`: The region or state in which your marketplace or
  organization is located (e.g., 'Helsinki').
- `postalCode`: The postal code of the location of your marketplace or
  organization (e.g., '00130').
- `streetAddress`: The street address of the location of your
  marketplace or organization (e.g., 'Erottajankatu 19 B').

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
