---
title: Enable Google Maps
slug: how-to-use-google-maps-in-template
updated: 2023-10-24
category: template-search
ingress:
  The Sharetribe Web Template offers out of the box support for Google
  Maps API for showing a map and searching locations with search
  autocompletion. This guide describes how to set up the API key for the
  API requests to work properly.
published: true
---

<info>

Note: before making the change to Google Maps, you should consider if
you are OK with their current pricing. There's a pricing calculator
available in their
[pricing page](https://cloud.google.com/maps-platform/pricing/). The
template's default map provider is Mapbox, which is often cheaper. To
use Mapbox, see the
[How to set up Mapbox](/template/how-to-set-up-mapbox-for-template/)
guide.

</info>

## Enable Google Maps in your marketplace

To enable Google Maps in your marketplace, follow the instructions at [how to set up Mapbox or Google Maps for location services](https://www.sharetribe.com/help/en/articles/8676185-how-to-set-up-mapbox-or-google-maps-for-location-services#h_81fe29e50f).

You can also choose to assign the map key to an environment variable.
However, if you enable the API key configuration through Console, the
settings in Console will overwrite the keys stored in environment
variables, assuming that you have not made changes to how the template
handles loading configurations via [assets](/references/assets/).

## Enabling Google Maps through environment variables

If you are using a version of the template older than
[v3.4.0](https://github.com/sharetribe/web-template/releases/tag/v3.4.0),
you need to assign the API key to an environment variable and enable
Google Maps by toggling an configuration variable in
[configMaps.js](https://github.com/sharetribe/web-template/blob/main/src/config/configMaps.js#L13).

### Assign the API key to an environment variable

The template uses the `REACT_APP_GOOGLE_MAPS_API_KEY` environment
variable for the key value. For local development, you can add the
variable in the gitignored `.env` file in the project root:

```bash
REACT_APP_GOOGLE_MAPS_API_KEY=my-key-here
```

### Enable Google Maps in the template

To enable Google Maps, you must toggle a configuration variable found in
[configMaps.js](https://github.com/sharetribe/web-template/blob/main/src/config/configMaps.js#L13).
This configuration variable can be one of two options: `'MAPBOX'` or
`'GOOGLE_MAPS'`. To enable Google Maps in the template, change the
variable to `'GOOGLE_MAPS'`:

```js
export const mapProvider = 'GOOGLE_MAPS';
```

## Further reading

Once you have enabled maps in your marketplace using your chosen map
provider, you can change the map's configuration settings. These options
allow you to change things like the default search locations and
restrict location search to specific countries. Refer to the
[map configurations article](/template/configure-maps/) to learn more
about the specific configurations you can adjust for maps in your
marketplace.
