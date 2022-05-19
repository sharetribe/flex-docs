---
title: How to set up Mapbox for FTW
slug: how-to-set-up-mapbox-for-ftw
updated: 2019-07-04
category: ftw-search
ingress:
  By default, Flex Template for Web (FTW) uses Mapbox for showing
  interactive maps. This guide will help you in creating a Mapbox
  account and setting up an account token in the FTW environment
  configuration.
published: true
---

## 1. Generate a Mapbox access token

[Sign up to Mapbox](https://account.mapbox.com/auth/signup/) and go to
the [account page](https://account.mapbox.com/). Then copy the
`Default public token`.

If you wish to create a new one, click `+ Create a token`, give it a
name and make sure all Public scopes are selected. Create the token and
copy its value.

You can make access tokens in your web applications more secure by
adding URL restrictions. When you add a URL restriction to a token, that
token will only work for requests that originate from the URLs you
specify. See the Mapbox documentation for
[URL restrictions](https://docs.mapbox.com/accounts/overview/tokens/#url-restrictions).

## 2. Setup the application to use the access token

The application uses the `REACT_APP_MAPBOX_ACCESS_TOKEN` environment
variable for the token value. For local development, you can add the
variable in the Gitignored `.env` file in the project root:

```bash
REACT_APP_MAPBOX_ACCESS_TOKEN=my-access-token-here
```

## 3. Setup common locations to reduce typing

The location autocomplete input in the landing page and the topbar can
be configured to have specific locations shown by default when the user
focuses on the input and hasn't yet typed in any searches. This reduces
the typing required for common searches and also reduces the need to use
Mapbox geolocation API that much.

This is enabled by default but it can be changed via the environment
variable:

```bash
REACT_APP_DEFAULT_SEARCHES_ENABLED=true
```

The default locations are described in
[src/default-location-searches.js](https://github.com/sharetribe/flex-template-web/blob/master/src/default-location-searches.js).

The same environment variable also shows "current location" suggestion,
which will make the browser to ask user's current location. This is a
fast way to search listings nearby. You can specify whether to use the
current location from
[src/config.js](https://github.com/sharetribe/flex-template-web/blob/master/src/config.js).
Search for variables: `suggestCurrentLocation` and
`currentLocationBoundsDistance`.

## Optional: check rare default configurations

Mapbox geocoding API doesn't always return bounding boxes for locations.
Without bounding box SearchMap component can't adjust zoom level right
for that particular place. Therefore there are default bounding boxes
defined to different place types in the Mapbox specific geocoder:

[src/components/LocationAutocompleteInput/GeocoderMapbox.js](https://github.com/sharetribe/flex-template-web/blob/master/src/components/LocationAutocompleteInput/GeocoderMapbox.js).

## Optional: Restrict location autocomplete to specific country or countries

If your marketplace works only in a specific country or countries it
might be a good idea to limit the location autocomplete to those
countries. You can specify whether to use the limitation from
[src/config.js](https://github.com/sharetribe/flex-template-web/blob/master/src/config.js).
Search for variable `countryLimit` and uncomment the line to make it
active. Provide the country or countries in an array using
[ISO 3166 alpha 2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
format (eg. GB, US, FI). If there are multiple values, separate them
with commas.

## Changing the map providers

It is possible to use Google Map instead of the default map provider.
Read more in the
[How to use Google Maps in FTW](/ftw/how-to-use-google-maps-in-ftw/)
guide.

### How to use other map providers

The default map setup of FTW uses library called
[mapbox-gl-js](https://docs.mapbox.com/mapbox-gl-js/api/). It supports
quite many other map providers too. Thus, if you wish to use a map
provider other than Google Maps or Mapbox, first check if the map
provider you are considering is supporting this library. If they are,
the change might be quite easy. Note: if you change the map tile
provider you should also change geocoding API too (i.e. the API endpoint
for `LocationAutocompleteInput` component).
