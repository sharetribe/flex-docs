---
title: Enable Mapbox
slug: how-to-set-up-mapbox-for-ftw
updated: 2023-01-01
category: ftw-search
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

## Assign the access token to an environment variable

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
[map configurations article](/ftw/configure-maps/) to learn more about
the specific configurations you can adjust for maps in your marketplace.
