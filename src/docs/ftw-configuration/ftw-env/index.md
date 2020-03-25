---
title: FTW Environment configuration variables
slug: ftw-env
updated: 2019-01-25
category: ftw-configuration
ingress:
  Reference documentation for environment variables in Flex Template for
  Web (FTW).
published: true
---

The following configuration variables can be set to control the Flex
template app behaviour. Most of them have defaults that work for
development environment. For production deploys most should be set.

## Variables

- **`REACT_APP_MAPBOX_ACCESS_TOKEN`**

  See the
  [How to set up Mapbox for FTW](/guides/how-to-set-up-mapbox-for-ftw/)
  guide for more information.

- **`REACT_APP_GOOGLE_MAPS_API_KEY`**

  See the
  [How to use Google Maps in FTW](/guides/how-to-use-google-maps-in-ftw/)
  guide for more information.

- **`REACT_APP_SHARETRIBE_SDK_CLIENT_ID`**

  Your application's client ID. You can get this from
  [Flex Console](https://flex-console.sharetribe.com/applications).

- **`REACT_APP_STRIPE_PUBLISHABLE_KEY`**

  Stripe publishable API key for generating tokens with Stripe API. Use
  test key (prefix `pk_test_`) for development. The secret key needs to
  be added to Flex Console.

- **`REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY`**

  The currency used in the Marketplace as ISO 4217 currency code. For
  example: USD, EUR, CAD, AUD, etc.

- **`REACT_APP_CANONICAL_ROOT_URL`**

  Canonical root url of the marketplace. Needed for social media sharing
  and SEO optimization.

- **`NODE_ENV`**

  Node env. Use 'development' for development and 'production' for
  production.

- **`PORT`**

  Port for server to accept connections.

- **`REACT_APP_ENV`**

  A more fine grained env definition than NODE_ENV. Is used for example
  to differentiate envs in logging.

- **`REACT_APP_SHARETRIBE_USING_SSL`**

  Redirect HTTP to HTTPS?

- **`SERVER_SHARETRIBE_TRUST_PROXY`**

  Set when running the app behind a reverse proxy, e.g. in Heroku.

- **`REACT_APP_SENTRY_DSN`**

  See the
  [How to set up Sentry to log errors in FTW](/guides/how-to-set-up-sentry-to-log-errors-in-ftw/)
  guide for more information.

- **`REACT_APP_CSP`**

  See the
  [How to set up Content Security Policy (CSP) for FTW](/guides/how-to-set-up-csp-for-ftw/)
  guide for more information.

- **`BASIC_AUTH_USERNAME`**

  Set to enable HTTP Basic Auth.

- **`BASIC_AUTH_PASSWORD`**

  Set to enable HTTP Basic Auth.

- **`REACT_APP_GOOGLE_ANALYTICS_ID`**

  See the
  [How to set up Analytics for FTW](/guides/how-to-set-up-analytics-for-ftw/)
  guide for more information.

- **`REACT_APP_AVAILABILITY_ENABLED`**

  Enables availability calendar for listings.

- **`REACT_APP_DEFAULT_SEARCHES_ENABLED`**

  Enables default search suggestions in location autocomplete search
  input.

- **`REACT_APP_SHARETRIBE_SDK_BASE_URL`**

  The base url to access the Sharetribe Flex Marketplace API. FTW uses
  the correct one by default so no need to set this.

## Defining configuration

When the app is started locally with `yarn run dev` or
`yarn run dev-server`, you can set environment variables by using the
(gitignored) `.env` file. You can edit the basic variables via
`yarn run config` or by editing directly the `.env` file. Some variables
can be edited only in the .env file. The repository contains a template
file `.env-template` with default configuration.

In production, it's recommended that you set the configuration via env
variables and do not deploy an `.env` file. The client application will
only be packaged with env variables that start with `REACT_APP`. This
way server secrets don't end up in client bundles.

**With deploys note that the configuration options are bundled in the
client package at build time.** The configuration of the build
environment must match run environment for things to work consistently.
To apply changes to configuration values client bundle must be rebuilt.
Just restarting the server is not enough.
