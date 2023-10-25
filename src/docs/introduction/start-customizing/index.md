---
title: Start customizing your marketplace
slug: introduction-to-customizing
updated: 2023-10-25
category: introduction
ingress:
  When you want to start customizing your marketplace, you need to take
  some steps. Learn what to take into consideration when starting custom
  development
published: true
---

When you start customizing your marketplace with code, you may want to
continue working on the same web template that powers your hosted
marketplace, or you may want to develop a fully custom application. Both
options are possible, and there are some considerations for both
approaches.

## General custom development guidelines

Whichever custom development approach you choose, here are some key
points that apply to all custom development.

### Get familiar with the Sharetribe APIs

Your marketplace basic functions are available through the **Marketplace
API**.

Your no-code configurations are available through the public **Asset
Delivery API**.

Integration and analytics capabilities are available server-side through
**Integration API**.

Authentication to Marketplace API and Integration API happens through
the **Authentication API**.

Access to the Sharetribe APIs in the live environment is available in
the Extend plan.

The Marketplace API, Asset Delivery API, and Integration API are also
accessible through JavaScript SDKs.

- [Read more about Marketplace API and Integration API](/concepts/marketplace-api-integration-api/)
- [Read more about Asset Delivery API](/references/assets/)
- [Read more about Authentication API](/concepts/authentication-api/)
- [Read more about Sharetribe JavaScript SDKs](/concepts/js-sdk/)
- [Read more about Sharetribe pricing](https://www.sharetribe.com/pricing/)

### Get familiar with Sharetribe environments

Your marketplace has three environments – Test, Dev, and (eventually)
Live. We recommend that you only do development work in Dev, and keep
Test and Live identical in terms of code.

Each marketplace environment connects to the corresponding client app
through a Marketplace API application, i.e. a client id and a client
secret. This means that when you call the Marketplace API or Asset
Delivery API, the correct marketplace environment is determined by the
client id set in your app.

- [Read more about Sharetribe environments](/concepts/sharetribe-environments/)
- [Read more about Sharetribe applications](/concepts/applications/)

### Get familiar with hosting your application

When you custom develop your marketplace, you also need to host your own
application. When starting your custom development, it is enough to host
your custom codebase for the Dev environment. When you want to publish
your code, you will also need to host a client application for the Test
and Live environments.

When you have a hosted application set up for your custom client, you
can change the Marketplace URL in your Console > Build > General view to
point to the URL of your custom client. That way, the Sharetribe backend
uses the correct URL for e.g. adding links to emails sent through the
Sharetribe backend.

## Custom developing with the Sharetribe Web Template

If you want to continue developing your marketplace based on the
Sharetribe-hosted client app, you can use the Sharetribe Web Template as
your starting point. Sharetribe Web Template is an open-source version
of the code that powers your Sharetribe-hosted marketplace.

- [Read more about the Sharetribe Web Template](/introduction/introducing-template/)

The template uses the TODO SDK to connect to the Marketplace API and
Asset Delivery API. The SDK also handles authentication towards
Marketplace API, and shares the user's login between the browser and the
server.

- [Read more about the TODO SDK](https://sharetribe.github.io/flex-sdk-js/)

To get started with the template, you need to clone the Sharetribe Web
Template repository and set it up with your marketplace client id and
secret. The template uses your no-code configurations, fetched with the
SDK, to render a marketplace that looks similar to your
Sharetribe-hosted marketplace. You can then continue to custom develop
features in your cloned codebase.

- [Read more about getting started with the Sharetribe Web Template](/introduction/introducing-template/)

The Sharetribe Web Template repository contains the starting point for
your development work. To maintain version control of your own
development work, you need to create your own remote repository for your
cloned version of the template.

The tutorial guides you through some common features that you can modify
in the Sharetribe Web Template to custom develop your marketplace. We
recommend that you check it through for an overview on the different
customizations that are possible with the Sharetribe Developer Platform.

- [Read the tutorial and learn about setting up a remote repository for your cloned codebase](/tutorial/introduction/)

To share your changes online, you will need to deploy the template. Note
that to deploy the template, for any marketplace environment (Dev, Test,
or Live), your deployment service needs to be able to run a NodeJS
server.

- [Read more about template deployment](/template/how-to-deploy-template-to-production/)

## Custom developing with your own client application

You can also create a fully custom client application for your
marketplace.

We currently do not have a tutorial focusing on non-Sharetribe Web
Template development. However, we recommend that you check through the
template tutorial for an overview on what customizations are possible
with the Sharetribe Developer Platform.

- [Read the tutorial](/tutorial/introduction/)

When deciding on the stack for your custom client application, it is
good to note that to fully use the features of the Sharetribe Developer
Platform, you need some kind of a server environment. Features requiring
a server include:

- using SSO and identity providers
- Integration API – it provides full access to your marketplace, so it
  must never be used from a browser environment
- privileged transitions, including custom pricing
- logging in as a user from Console

* [Read more about using SSOs with a Sharetribe marketplace](/concepts/social-logins-and-sso/)
* [Read more about Integration API security](https://github.com/sharetribe/integration-api-examples#warning-usage-with-your-web-app--website)
* [Read more about privileged transitions](/concepts/privileged-transitions/)
* [Read more about Login as user](/how-to/enable-login-as-user/)
