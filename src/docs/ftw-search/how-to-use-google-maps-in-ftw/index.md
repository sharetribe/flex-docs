---
title: How to use Google Maps in SWT
slug: how-to-use-google-maps-in-ftw
updated: 2020-12-15
category: ftw-search
ingress:
  Sharetribe Web Template (SWT) offers out of the box support for Google
  Maps API for showing a map and searching locations with search
  autocompletion. This guide describes how to set up the API key for the
  API requests to work properly.
published: true
---

<info>

Note: before making the change to Google Maps, you should consider if
you are OK with their current pricing. There's a pricing calculator
available in their
[pricing page](https://cloud.google.com/maps-platform/pricing/). SWT's
default map provider is Mapbox, which is often cheaper. To use Mapbox,
see the
[How to set up Mapbox for SWT](/ftw/how-to-set-up-mapbox-for-ftw/)
guide.

</info>

## Generate a Google Maps API key

Go to the
[Google Maps JavaScript API V3 Reference](https://developers.google.com/maps/documentation/javascript/reference),
click on the "GET A KEY" button in the top bar, and follow the
instructions. Save the key for later.

## Enable Google Places API Web Service

Follow the instructions in the
[Getting started](https://developers.google.com/maps/documentation/javascript/places#GetStarted)
section of the Places library documentation to enable using the Google
Places API Web Service. Also Maps Static API and Maps JavaScript API
need to be enabled.

## Assign the API key to an environment variable

SWT uses the `REACT_APP_GOOGLE_MAPS_API_KEY` environment variable for
the key value. For local development, you can add the variable in the
gitignored `.env` file in the project root:

```bash
REACT_APP_GOOGLE_MAPS_API_KEY=my-key-here
```

## Setup common locations to reduce typing

The location autocomplete-input in the landing page and the topbar can
be configured to have specific locations shown by default when the user
focuses on the input and hasn't yet typed in any searches. This reduces
the typing required for common searches and also reduces the need to use
Google Maps Places API that much.

To use default searches, another environment variable needs to be set:

```bash
REACT_APP_DEFAULT_SEARCHES_ENABLED=true
```

The default locations have been described in file:
[src/default-location-searches.js](https://github.com/sharetribe/ftw-daily/blob/master/src/default-location-searches.js).

The same environment variable also shows "current location" suggestion,
which will make the browser to ask user's current location. This is a
fast way to search listings nearby. You can specify whether to use the
current location from
[src/config.js](https://github.com/sharetribe/ftw-daily/blob/master/src/config.js).
Search for variables: `suggestCurrentLocation` and
`currentLocationBoundsDistance`.

<extrainfo title="FTW-product has default-location-searches.js and config.js files in a different location">

```shell
└── src
    └── config
        ├── config.js
        └── default-location-searches.js
```

</extrainfo>

## FTW-daily & FTW-hourly: use Google Maps

If you wish to use Google Maps instead of Mapbox, you need to make some
changes to the default setup of FTW-daily and FTW-hourly.

> **Note:** FTW-product has a different setup. If you are using it, you
> can skip this chapter.

### Include Google Maps script instead of Mapbox scripts

Mapbox related scripts can be removed from index.html and instead use
Google Maps script described in comments.

_public/index.html:_

```html
<script src="%PUBLIC_URL%/static/scripts/mapbox/mapbox-sdk.min.js"></script>
<link
  href="https://api.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.css"
  rel="stylesheet"
/>
<script src="https://api.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.js"></script>
<script>
  window.mapboxgl.accessToken = '%REACT_APP_MAPBOX_ACCESS_TOKEN%';
</script>
<!--
  If Google Maps is used instead of Mapbox, you need to include Google's script instead:
  <script src="https://maps.googleapis.com/maps/api/js?key=%REACT_APP_GOOGLE_MAPS_API_KEY%&libraries=places"></script>
-->
```

### Searching with Google's geocoding API

Location search aka LocationAutocompleteInput should use Google Map
specific geocoder. The correct import is written to the comments of
LocationAutocompleteInput component.

_src/components/LocationAutocompleteInput/LocationAutocompleteInputImpl.js:_

```js
import Geocoder, {
  GeocoderAttribution,
  CURRENT_LOCATION_ID,
} from './GeocoderMapbox';
// import Geocoder, { GeocoderAttribution, CURRENT_LOCATION_ID } from './GeocoderGoogleMaps';
```

Furthermore, Google Maps states in their terms of service that Google
logo needs to be visible when using their geocoding service. It is
available as a background image below the autocomplete predictions.
However, there needs to be enough padding for that logo. You can change
the padding through `marketplaceDefaults.css`.

_src/styles/marketplaceIndex.css:_

```css
/* Google Maps needs 72px bottom padding to accommodate logo, Mapbox doesn't have one */
--locationAutocompleteBottomPadding: 8px;
```

### 5.3. Show correct map on ListingPage (Map component)

Google Maps version (containing both static and dynamic maps) can be
taken into use by importing correct map subcomponent.

_src/components/Map/Map.js:_

```js
import { StaticMap, DynamicMap, isMapsLibLoaded } from './MapboxMap';
// import { StaticMap, DynamicMap, isMapsLibLoaded } from './GoogleMap';
```

### 5.4. SearchMap.js

The most complex change is happening in SearchPage. First, you need to
import `SearchMapWithMapbox` instead of `SearchMapWithGoogleMaps`.

_src/components/SearchMap/SearchMap.js:_

Remove this:

```js
import SearchMapWithMapbox, {
  LABEL_HANDLE,
  INFO_CARD_HANDLE,
  getMapBounds,
  getMapCenter,
  fitMapToBounds,
  isMapsLibLoaded,
} from './SearchMapWithMapbox';
```

And add this instead:

```js
import SearchMapWithGoogleMaps, {
  LABEL_HANDLE,
  INFO_CARD_HANDLE,
  getMapBounds,
  getMapCenter,
  fitMapToBounds,
  isMapsLibLoaded,
} from './SearchMapWithGoogleMaps';
```

Then, in `render` method, you need to put `SearchMapWithGoogleMaps`
component into use by replacing `SearchMapWithMapbox` which is defined
inside `ReusableMapContainer`. The component with correct props is
already there in the comments:

```js
// When changing from default map provider to Google Maps, you should use the following
// component instead of SearchMapWithMapbox:
//
// <SearchMapWithGoogleMaps
//   id={id}
//   className={classes}
//   bounds={bounds}
//   center={center}
//   location={location}
//   infoCardOpen={infoCardOpen}
//   listings={listings}
//   activeListingId={activeListingId}
//   mapComponentRefreshToken={this.state.mapReattachmentCount}
//   createURLToListing={this.createURLToListing}
//   onClick={this.onMapClicked}
//   onListingClicked={this.onListingClicked}
//   onListingInfoCardClicked={this.onListingInfoCardClicked}
//   onMapLoad={this.onMapLoadHandler}
//   onMapMoveEnd={onMapMoveEnd}
//   reusableMapHiddenHandle={REUSABLE_MAP_HIDDEN_HANDLE}
//   zoom={zoom}
// />
```

**Note:** Before FTW-daily@v7.1.0 and FTW-hourly@v9.1.0, FTW templates
used _react-google-maps_ wrapper library. That library was not
maintained for a long time, so we removed it from dependencies. Instead,
Google Maps API is now used directly.

## 6. FTW-product: use Google Maps

Even though, FTW-product doesn't use maps by default, we have included
SearchPage variant with Map: SearchPageWithMap.js It's possible to take
that into use by changing configuration.

```shell
└── src
    └── config
        └── config.js
```

There you can set the main search type and which layout variant search
page uses:

```js
// Main search used in Topbar.
// This can be either 'keywords' or 'location'.
const mainSearchType = 'keywords';

// There are 2 SearchPage variants that can be used:
// 'map' & 'list'
const searchPageVariant = 'list';
```

In addition, there are more map-related configs, where the map provider
is set:

```js
const maps = {
  mapboxAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  googleMapsAPIKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,

  // SearchPage variant in use: 'MAPBOX', 'GOOGLE_MAPS'
  // Note: you need to have REACT_APP_MAPBOX_ACCESS_TOKEN or REACT_APP_GOOGLE_MAPS_API_KEY
  //       set depending on which one you use in this config.
  mapProvider: 'MAPBOX',
  //...
```

That's it!
