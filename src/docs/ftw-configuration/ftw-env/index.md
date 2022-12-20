---
title: Template environment variables
slug: ftw-env
updated: 2021-01-21
category: ftw-configuration
ingress:
  Reference documentation for environment variables in the Sharetribe
  Web Template.
published: true
---

You can change the following environment variables to specify API
credentials or enable certain functionalities. Most have a default value
that allows you to run the template locally. However, when you are ready
to deploy your marketplace to production, you should reference this list
of environment variables.

## List of available environment variables

- **`REACT_APP_MAPBOX_ACCESS_TOKEN`**

  See the [How to set up Mapbox](/ftw/how-to-set-up-mapbox-for-ftw/)
  guide for more information.

- **`REACT_APP_GOOGLE_MAPS_API_KEY`**

  See the [How to use Google Maps](/ftw/how-to-use-google-maps-in-ftw/)
  guide for more information.

- **`REACT_APP_SHARETRIBE_SDK_CLIENT_ID`**

  Your application's client ID. You can get this from
  [Flex Console](https://flex-console.sharetribe.com/applications).

- **`SHARETRIBE_SDK_CLIENT_SECRET`**

  Your application's client secret. It's related to client ID and used
  for privileged transitions from server side. You can get this from
  [Flex Console](https://flex-console.sharetribe.com/applications).

- **`REACT_APP_STRIPE_PUBLISHABLE_KEY`**

  Stripe publishable API key for generating tokens with Stripe API. Use
  test key (prefix `pk_test_`) for development. The secret key needs to
  be added to Flex Console.

- **`REACT_APP_MARKETPLACE_ROOT_URL`**

  The root url of the marketplace. Needed for social media sharing, SEO
  optimization, and social logins. Note, that the value should not
  include a trailing slash.

- **`NODE_ENV`**

  Node env. Use 'development' for development and 'production' for
  production.

- **`PORT`**

  Port for server to accept connections.

- **`REACT_APP_ENV`**

  A more fine grained env definition than NODE_ENV. Is used for example
  to differentiate envs in logging.

- **`REACT_APP_SHARETRIBE_USING_SSL`**

  Redirect HTTP to HTTPS.

- **`SERVER_SHARETRIBE_TRUST_PROXY`**

  Set when running the app behind a reverse proxy, e.g. in Heroku or
  Render.

- **`REACT_APP_SENTRY_DSN`**

  See the
  [How to set up Sentry to log errors](/ftw/how-to-set-up-sentry/) guide
  for more information.

- **`REACT_APP_CSP`**

  See the
  [How to set up Content Security Policy (CSP)](/ftw/how-to-set-up-csp-for-ftw/)
  guide for more information.

- **`BASIC_AUTH_USERNAME`**

  Set to enable HTTP Basic Auth.

- **`BASIC_AUTH_PASSWORD`**

  Set to enable HTTP Basic Auth.

- **`REACT_APP_GOOGLE_ANALYTICS_ID`**

  See the
  [How to set up Analytics](/ftw/how-to-set-up-analytics-for-ftw/) guide
  for more information.

* **`REACT_APP_SHARETRIBE_SDK_BASE_URL`**

  The base url to access the Sharetribe Flex Marketplace API. The
  template uses the correct one by default so no need to set this.

* **`REACT_APP_FACEBOOK_APP_ID`**

  App ID of a Facebook App when Facebook login is used.

* **`FACEBOOK_APP_SECRET`**

  App secret of a Facebook App when Facebook login is used.

<info>

The template is built on top of Create React App (CRA). CRA uses
WebpackDevServer for providing Hot Module Reloading feature. In some
environments, WebpackDevServer might require configuring additional
environment variables. You should also check
[CRA's advanced configurations](https://create-react-app.dev/docs/advanced-configuration)
if you experience problems with socket ports.

</info>

## Setting environment variables

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

<warning>

Do not set environment variables with the REACT_APP prefix that you do
not want to reveal to the client. It is important to **never** publicly
reveal the client secret of the Marketplace or Integration API.

</warning>

Environment variables are bundled with the client during build time. If
you change environment variables locally or in production, you must
remember to rebuild the client bundle. In production, this means
redeploying the application. Locally, you need to rerun either
`yarn run dev` or `yarn run dev-server`.
