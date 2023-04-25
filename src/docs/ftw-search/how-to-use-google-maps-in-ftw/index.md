---
title: Enable Google Maps
slug: how-to-use-google-maps-in-ftw
updated: 2023-01-01
category: ftw-search
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
[How to set up Mapbox](/ftw/how-to-set-up-mapbox-for-ftw/) guide.

</info>

## Enable Google Maps in your marketplace

To enable Google Maps in your marketplace, you will need a Google
Account. In addition, in order to enable the required Google APIs, you
will need to enter your billing details.

### Generate a Google Maps API key

Go to the
[Google Maps JavaScript API V3 Reference](https://developers.google.com/maps/documentation/javascript/reference),
and click on "Get started" button in the top bar, and follow the
instructions. Save the key for later.

<warning>

Make sure to follow
[API security best practices](https://developers.google.com/maps/api-security-best-practices)
with your Google Maps API keys. For example, restricting your API key to
your client app URL will prevent unauthorised use that would impact your
billing.

</warning>

### Enable Google APIs

Follow the instructions in the
[Getting started](https://developers.google.com/maps/documentation/javascript/places#GetStarted)
section of the Places library documentation to enable using the Google
Places API Web Service. You will also need to enable the Maps Static API
and Maps JavaScript API.

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
[map configurations article](ftw/configure-maps/) to learn more about
the specific configurations you can adjust for maps in your marketplace.
