---
title: How to set up Mapbox for FTW
slug: how-to-set-up-mapbox-for-ftw
updated: 2019-01-10
category: guides
ingress:
  By default, Flex Template for Web (FTW) uses Mapbox for showing interactive
  maps. This guide will help you in creating a Mapbox account and setting up an
  account token in the FTW environment configuration.
---

## 1. Generate a Mapbox access token

[Sign up to Mapbox](https://www.mapbox.com/signup/) and go to the
[account page](https://www.mapbox.com/account/). Then copy the
`Default public token`.

If you wish to create a new one, click `+ Create a token`, give it a name and
make sure all Public scopes are selected. Create the token and copy its value.

Read more about
[access tokens and consider rotating them](https://www.mapbox.com/help/how-access-tokens-work/).

## 2. Setup the application to use the access token

The application uses the `REACT_APP_MAPBOX_ACCESS_TOKEN` environment variable
for the token value. For local development, you can add the variable in the
Gitignored `.env` file in the project root:

```
REACT_APP_MAPBOX_ACCESS_TOKEN=my-access-token-here
```

### Optional: check rare default configurations

Mapbox geocoding API doesn't always return bounding boxes for locations. Without
bounding box SearchMap component can't adjust zoom level right for that
particular place. Therefore there are default bounding boxes defined to
different place types in the Mapbox specific geocoder:

[src/components/LocationAutocompleteInput/GeocoderMapbox.js](https://github.com/sharetribe/flex-template-web/tree/master/src/components/LocationAutocompleteInput/GeocoderMapbox.js).

## Changing the map providers

It is possible to use Google Map instead of the default map provider. Read more
from the
[Google Maps setup guide](https://github.com/sharetribe/flex-template-web/blob/master/docs/google-maps.md).

### How to use other map providers

The default map setup of FTW uses library called
[mapbox-gl-js](https://www.mapbox.com/mapbox-gl-js/api/). It supports quite many
other map providers too. Thus, if you wish to use a map provider other than
Google Maps or Mapbox, first check if the map provider you are considering is
supporting this library. If they are, the change might be quite easy. Note: if
you change the map tile provider you should also change geocoding API too (i.e.
the API endpoint for `LocationAutocompleteInput` component).
