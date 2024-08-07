---
title: Enable Mapbox
slug: how-to-set-up-mapbox-for-template
updated: 2023-10-24
category: template-search
ingress:
  By default, the template uses Mapbox for showing interactive maps.
  This guide will help you create a Mapbox account and assign the access
  token to an environment variable.
published: true
---

## Generate a Mapbox access token

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

## Update the API key in Console

If you are using a version of the template
[v3.4.0](https://github.com/sharetribe/web-template/releases/tag/v3.4.0)
or newer, you can set the API key in the Sharetribe Console.

1. In Sharetribe Console, navigate to Integrations > Map

2. Select "Mapbox"

3. Paste the token into the field

4. Press "Save changes"

Read more in our article on
[how to set up Mapbox or Google Maps for location services](https://www.sharetribe.com/help/en/articles/8676185-how-to-set-up-mapbox-or-google-maps-for-location-services).

You can also choose to assign the map key to an environment variable.
However, if you enable the API key configuration through Console, the
settings in Console will overwrite the keys stored in environment
variables, assuming that you have not made changes to how the template
handles loading configurations via [assets](/references/assets/).

## Assign the access token to an environment variable

If you are using a version of the template older than
[v3.4.0](https://github.com/sharetribe/web-template/releases/tag/v3.4.0),
you need to assign the Mapbox API key to an environment variable.

The template uses the `REACT_APP_MAPBOX_ACCESS_TOKEN` environment
variable for the token value. For local development, you can add the
variable in the gitignored `.env` file in the project root:

```bash
REACT_APP_MAPBOX_ACCESS_TOKEN=my-access-token-here
```

## Further reading

Once you have enabled maps in your marketplace using your chosen map
provider, you can change the map's configuration settings. These options
allow you to change things like the default search locations and
restrict location search to specific countries. Refer to the
[map configurations article](/template/configure-maps/) to learn more
about the specific configurations you can adjust for maps in your
marketplace.
