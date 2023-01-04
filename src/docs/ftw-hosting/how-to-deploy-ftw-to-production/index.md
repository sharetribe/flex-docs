---
title: Deploy to production
slug: how-to-deploy-ftw-to-production
updated: 2023-01-01
category: ftw-hosting
ingress:
  This article describes what to take into account when you deploy the
  Sharetribe Web Template to production.
published: true
---

## What is a production environment?

A production environment hosts and executes the code that runs your live
marketplace and serves it to the public internet. The version of your
marketplace intended for real-life use with real money runs in the
production environment. Typically, alongside your production
environment, you will also host another version of your client
environment: a test environment.

Having two environments is a common practice in software development.
The test environment is a clone of the production environment intended
for testing new features before being deployed to production. Once a
development team deems a feature production-ready, i.e. fit for a live
audience, they can deploy it to production. A workflow like this helps
prevent bugs and unfinished code from being released to your users.

Sharetribe Flex offers
[three different environment types](https://www.sharetribe.com/docs/concepts/flex-environments/#environment-types).
You should connect your client application with the corresponding
marketplace environment, i.e. your client environment intended for
testing should use environment variables that point to your test
environment in Flex.

## Where to host your application?

There are many hosting providers to choose from when considering where
to host your marketplace. Our official recommendation is to host your
marketplace on Heroku or Render for a hassle-free installation. However,
you are free to host your marketplace elsewhere. The Sharetribe Web
Template should be compatible with any hosting provider as long as they
allow you to run a Node.js/Express server. Many essential functions in
the template rely on a small Node.js/Express server (such as server-side
rendering, SSO and transitioning privileged transactions). Serverless
service providers such as Netlify and Vercel are unsuitable for hosting
the template as they don't allow you to host a server.

When choosing a hosting provider, you should not only consider the
cheapest option. Scalability, tools, service-level agreements and
available computing resources are examples of factors that should weigh
in when choosing a hosting provider. It is also possible that hosting
providers' prices and services may change over time, e.g.
[Heroku is discontinuing](https://techcrunch.com/2022/08/25/heroku-announces-plans-to-eliminate-free-plans-blaming-fraud-and-abuse/)
its popular free tier on October 26th, 2022.

As of the time of writing, [Render](https://www.render.com) and
[Fly.io](https://fly.io) continue to provide a free tier, which you can
use, e.g. to host a testing environment. You will have to move to a paid
plan for a production-level deployment to ensure consistent uptime and
computing resources for your marketplace. Other alternatives you can
look into include [AWS](https://aws.amazon.com/),
[Google Cloud](https://cloud.google.com/),
[Digital Ocean](https://www.digitalocean.com/) and
[Microsoft Azure](https://azure.microsoft.com/).

## Deploying to production

> If you are looking to deploy your marketplace on either Heroku or
> Render, please read our detailed deployment guides for both
> [Heroku](/ftw/how-to-deploy-ftw-to-heroku/) and
> [Render](/tutorial/deploy-to-render/#deploy-to-render).

Deploying your marketplace to production is a three-step process:

1. [Set environment variables](#environment-variables)
2. [Build the app](#building-the-app)
3. [Run the node server](#starting-the-app)

### Environment variables

For a full list of possible environment variables, see the
[Environment configuration variables](/ftw/ftw-env/) reference for more
information. To deploy your marketplace, you need to add at least the
following variables:

- **`NODE_ENV`**

Use the value 'production'.

- **`PORT`**

You must set a port if the production environment does not set one by
default. Heroku and Render define a port automatically.

- **`REACT_APP_SHARETRIBE_SDK_CLIENT_ID`**

Your client ID. You can find it in
[Flex Console](https://flex-console.sharetribe.com/applications).

- **`SHARETRIBE_SDK_CLIENT_SECRET`**

Your client secret. You can find it in
[Flex Console](https://flex-console.sharetribe.com/applications).

- **`REACT_APP_STRIPE_PUBLISHABLE_KEY`**

Stripe publishable API key for generating tokens with Stripe API. You
find it on the Stripe
[API keys](https://dashboard.stripe.com/account/apikeys) page. You will
also need to add the secret key in Flex Console.

- **`REACT_APP_MAPBOX_ACCESS_TOKEN`**

If using Mapbox, you will need to define this environment variable. Sign
up for Mapbox and go to the
[account page](https://www.mapbox.com/account/access-tokens). Then click
on `Create access token`. See the
[How to set up Mapbox for Sharetribe Web Template](/ftw/how-to-set-up-mapbox-for-ftw/)
guide for more information.

- **`REACT_APP_CANONICAL_ROOT_URL`**

This is the canonical root URL of the marketplace. For example:
`https://the-name-of-your-app.herokuapp.com`. The template uses the
canonical root URL for social media sharing and SEO optimization.

### Building the app

Running the following command builds the app for production to the build
folder. It correctly bundles React in production mode and optimizes the
build for the best performance.

```bash
yarn build
```

After this, your app is ready to be deployed.

### Start the server

To start the server, you need to run:

```bash
yarn start
```
