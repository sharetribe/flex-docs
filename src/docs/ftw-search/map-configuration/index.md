---
title: Map configurations
slug: configure-maps
updated: 2023-01-01
category: ftw-search
ingress:
  This article discusses configuration settings for maps, with which you
  can customize the appearance and functionality of the maps in your
  marketplace.
published: true
---

## Configure default locations

You can configure the search field on the landing page to show the user
a predefined list of locations from which to search. Enabling this
feature can make searching for common locations faster for your users
and reduce the need to call the Mapbox Geolocation API.

![A screenshot of the search bar in Sharetribe Web Template](location.png)

This feature is not enabled by default. To enable it, you need to add
the locations to the
[configDefaultLocationSearches.js](https://github.com/sharetribe/web-template/blob/main/src/config/configDefaultLocationSearches.js#L14)
file.

To disable the first result on the list to search for the user's
"Current location", you can change the configuration variable
[`suggestCurrentLocation` in the configMaps.js file](https://github.com/sharetribe/web-template/blob/main/src/config/configMaps.js#L23)
to false. The
[`currentLocationBoundsDistance`](https://github.com/sharetribe/web-template/blob/main/src/config/configMaps.js#L27)
variable (found in the same file) defines the distance in meters for
calculating the bounding box around the current location.

For a more detailed guide on how to change the default locations, refer
[to the tutorial](http://localhost:8000/tutorial/change-default-locations/).

## Configure fallback bounding boxes

The Mapbox Geocoding API does not always return a bounding box with the
results. The
[SearchMap](https://github.com/sharetribe/web-template/blob/main/src/containers/SearchPage/SearchMap/SearchMap.js)
component needs a bounding box to adjust the zoom level of the map when
displaying a location.

Suppose the Geocoding API does not return a bounding box. In that case,
the map uses the default values defined in
[GeocoderMapbox.js](https://github.com/sharetribe/web-template/blob/main/src/components/LocationAutocompleteInput/GeocoderMapbox.js).
The configuration specifies a default distance to generate the bounding
box with for all different Mapbox Geocoding
[data types](https://docs.mapbox.com/api/search/geocoding/#data-types).

## Restrict location autocomplete to specific country or countries

If your marketplace works only in a specific country or countries it
might be a good idea to limit the location autocomplete to those
countries. You can specify whether to use the limitation in
[config/configMaps.js](https://github.com/sharetribe/web-template/blob/main/src/config/configMaps.js#L48).
Search for variable `countryLimit` and uncomment the line to make it
active. Provide the country or countries in an array using
[ISO 3166 alpha 2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
format (eg. GB, US, FI). If there are multiple values, separate them
with commas.

## How to use other map providers

The default map setup of the template uses library called
[mapbox-gl-js](https://docs.mapbox.com/mapbox-gl-js/api/). It supports
quite many other map providers too. Thus, if you wish to use a map
provider other than Google Maps or Mapbox, first check if the map
provider you are considering is supporting this library. If they are,
the change might be quite easy. Note: if you change the map tile
provider you should also change geocoding API too (i.e. the API endpoint
for `LocationAutocompleteInput` component).
