---
title: Getting started with Sharetribe Web Template
slug: getting-started-with-web-template
updated: 2025-04-29
category: introduction-getting-started
ingress:
  Learn how to install Sharetribe Web Template to your local development
  environment.
skills: basic command line, text editing
published: true
---

The Sharetribe Web Template is a marketplace web application built on
top of the
[Marketplace API](/introduction/introducing-sharetribe-developer-platform/#the-marketplace-api).
While you can create a marketplace purely using just the API, it
requires a significant amount of effort (both money and time) and we
recommened using the template as a starting point for customizations.

The Sharetribe Web Template is built with [React](https://reactjs.org/),
[Redux](https://redux.js.org/), and
[CSS Modules](https://github.com/css-modules/css-modules). It also
contains a small [Node.js](https://nodejs.org/en/) server, which
provides server-side rendering (SSR) for the deployed site.

The purpose of this guide is to clone and configure the Sharetribe Web
Template to your local development environment - and then get it up and
running. This guide also helps you to create accounts to Stripe and
Mapbox. Those services are needed to run the Sharetribe Web Template
app.

<info>

We recommend that you take the steps for this guide in your **Sharetribe
Console dev environment**.

**[Read more about Sharetribe environments](/concepts/sharetribe-environments/).**

</info>

## Setup a development environment

### Prerequisities

To get Sharetribe Web Template up and running, you will need to download
and install some basic development tooling:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

### Install the Sharetribe Web Template App locally

1. Open Terminal

2. [Clone](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
   the Sharetribe Web Template repository:

```bash
git clone https://github.com/sharetribe/web-template.git
```

3. Go to the cloned directory:

```bash
cd web-template/
```

<extrainfo title="Check how the directory structure should look like">

After these steps you should have a directory structure that looks like
this for Sharetribe Web Template:

```bash
   ├── ext
   │   └── transaction-processes
   ├── node_modules
   │   └── // dependencies
   ├── public
   │   ├── static
   │   ├── index.html
   │   ├── robots.txt
   │   └── 500.html
   ├── scripts
   │   ├── audit.js
   │   ├── config.js
   │   └── translations.js
   ├── server
   │   ├── api
   │   ├── api-util
   │   ├── apiRouter.js
   │   ├── apiServer.js
   │   ├── auth.js
   │   ├── csp.js
   │   ├── dataLoader.js
   │   ├── env.js
   │   ├── importer.js
   │   ├── index.js
   │   ├── log.js
   │   ├── renderer.js
   │   ├── sitemap.js
   │   └── wellKnownRouter.js
   ├── src
   │   ├── analytics
   │   ├── app.js
   │   ├── app.node.test.js
   │   ├── app.test.js
   │   ├── assets
   │   ├── components
   │   ├── config
   │   ├── containers
   │   ├── context
   │   ├── ducks
   │   ├── examples.js
   │   ├── index.js
   │   ├── reducers.js
   │   ├── routing
   │   ├── store.js
   │   ├── styles
   │   ├── transactions
   │   ├── translations
   │   └── util
   ├── CHANGELOG.md
   ├── LICENSE
   ├── README.md
   ├── package.json
   └── yarn.lock

```

</extrainfo>

4. Install dependency libraries:

```bash
yarn install
```

### Check that you have the correct transaction processes in your environment

If you have created your marketplace environment prior to the 25th of
April 2023, and you are using the Sharetribe Web Template, it is good to
note that there are two new transaction processes the template uses, and
those processes may not be in your Sharetribe marketplace by default.
You can find the transaction processes in
[/ext/transaction-processes/](https://github.com/sharetribe/web-template/tree/main/ext/transaction-processes)
in the repository.

To use the template, you will need to have the transaction processes in
your Sharetribe environment.
[Follow these steps](https://github.com/sharetribe/web-template#take-the-new-beta-processes-into-use)
to create both processes in your environment through Sharetribe CLI.

## Mandatory Integrations

The Sharetribe Web Template has 3 mandatory integrations that you need
to configure before the app is fully functional. The app obviously needs
to discuss with Sharetribe Marketplace API, but the client app also
makes direct calls to [Stripe](https://stripe.com/en-fi). Sharetribe
uses Stripe as a payment processor, and Sharetribe Web Template saves
sensitive payment information directly to it.

The third default integration is to a map provider.
[Mapbox](https://www.mapbox.com) provides location search (geocoding)
and maps for the web app.

![Mandatory integrations: Sharetribe Marketplace API, Stripe, Map provider](web-template-customizations.png)

The Sharetribe Web Template just needs 4 environment variables to make
these integrations work.

- **[`REACT_APP_SHARETRIBE_SDK_CLIENT_ID`](#sharetribe-client-id-and-client-secret)**
- **[`SHARETRIBE_SDK_CLIENT_SECRET`](#sharetribe-client-id-and-client-secret)**
- **[`REACT_APP_STRIPE_PUBLISHABLE_KEY`](#stripe-keys)**
- **[`REACT_APP_MAPBOX_ACCESS_TOKEN`](#mapbox-access-token)**

### Sharetribe client ID and client secret

To use the Marketplace API, you will need a **client ID**. You can
[sign up for your free Sharetribe account here](https://console.sharetribe.com/new).

When you get access, you will be able to log into Sharetribe Console and
check the client ID.<br /> Sharetribe Console: _Build > Advanced >
Applications_

In addition, Sharetribe Web Template uses transaction processes that
include privileged transitions. This makes it possible to customize
pricing on the Node server that's included in the template. The **client
secret** is needed to make this secure call from the template's own
server to Sharetribe API.

![Sharetribe Console: Applications tab](./console-build-application.png)

### Stripe keys

Both Sharetribe API and your client app need to be able to discuss with
Stripe API. Stripe has two different keys:

- _Secret key_ for server-side requests
- _Publishable key_ for calls from web browser

Sharetribe API uses the Stripe secret key to make payment-related
requests when a transaction moves forward. The client app needs to use
the Stripe publishable key to run the `stripe.js` script. The script has
two main functions: it has fraud detection built in, and it is also used
to save sensitive information directly to Stripe. For instance, a
customer's credit card number is saved directly to Stripe.

#### 1. Create and confirm your free Stripe account

Follow the steps outlined in
[this article](https://www.sharetribe.com/help/en/articles/8413086-how-to-set-up-stripe-for-payments-on-your-marketplace?location=conversation#h_7a65415eaa)
to get started with Stripe and set up your account.

#### 2. Enable Stripe Connect in your platform

Sharetribe uses the [Stripe Connect](https://stripe.com/docs/connect)
features with
[Custom accounts](https://stripe.com/docs/connect/accounts#custom-accounts).

[Stripe Connect](https://stripe.com/docs/connect) is used to route
payments between customers, providers (sellers), and the marketplace,
which can take a commission from transactions.

[Stripe Custom accounts](https://stripe.com/docs/connect/accounts#custom-accounts)
are created to hold the provider's account information (e.g. payout
details) on Stripe's side. A Custom Stripe account is almost completely
invisible to the account holder, but marketplace operators see the
accounts on their Stripe dashboard.

**United States**<br /> If you're based in The United States, Stripe
will need to review your platform account before you get access. See
[this article](https://docs.google.com/document/d/1AdGRFAxQkc_g9UP-IUtwAwo5eOAvGGOw2md-LjybR60/edit#heading=h.iln8r84fkuja)
to learn how to apply for Stripe Connect review.

**Other countries**<br /> If you are in any other country, follow these
instructions to enable Stripe Connect:

1. Click the **Connect** top menu item, and then click the **Get
   Started** button.

   ![Stripe connect](./stripe-connect.png)

1. Once a modal opens, select **Platform or marketplace** and click
   **Continue**.

   ![Activate Stripe Connect](./stripe-connect-activate.png)

1. Now when you click the gear icon on the top bar to go to **Settings**
   at https://dashboard.stripe.com/settings, you will see a new
   **Connect** section. Click **Settings** in that section.

   ![Connect settings](./stripe-connect-settings.png)

1. Make sure that **Custom** is enabled in the **Account types** section

   ![Custom enabled](./stripe-custom-enabled.png)

Great! You now have to get your API keys and input them into your
marketplace.

#### 3. Get your API keys from Stripe and add them to your Sharetribe marketplace

- Click the _Developers_ top menu item and go to _Developers_ → _API
  Keys_.
- In the section _"Standard keys"_ you will see two keys:
  - Publishable key
  - Secret key

The publishable key (with prefix **pk**) is one used in frontend
application (e.g. Sharetribe Web Template) and secret key (with prefix
**sk**) is the one you need to add to Console. If you want to use test
data make sure the value of the key is eg. **pk_test**\<somethinghere\>
and not **pk_live**\<somethinghere\>

<info>

If you want to use test data in development, make sure that the
_"Viewing test data"_ toggle is on. This way no real money will be used.
In production, make sure that the toggle is off.

</info>

![Get API keys from Stripe](./stripe-api-keys.png)

#### 4. Add your Stripe secret API key to Console

- Log in to Console and go to _Build_ → _Payments_
- In the section _Stripe configuration_ paste your secret key to "Stripe
  secret key" field and save the changes.

![Add Stripe secret key to Console](./add-stripe-to-console.png)

<info>

The secret key and publishable key need to match with each other. You
can't use a publishable key from a different Stripe account than the
secret key - or mix test keys and live keys.

</info>

### Mapbox Access Token

[Sign up to Mapbox](https://account.mapbox.com/auth/signup/) and go to
the [account page](https://account.mapbox.com/). Then copy the _"Default
public token"_.

![Mapbox Account Page: copy access token](mapbox-access-token.png)

If you wish to create a new one, click _"+ Create a token"_ button, give
it a name and make sure all Public scopes are selected. Create the token
and copy its value.

You can make access tokens in your web applications more secure by
adding URL restrictions. When you add a URL restriction to a token, that
token will only work for requests that originate from the URLs you
specify. See the Mapbox documentation for
[domain restrictions](https://docs.mapbox.com/help/account/tokens/#domain-restrictions).

## Add Environment Variables

Start the config script:

```bash
yarn run config
```

This command will prompt you to enter the three required environment
variables that you you collected in the previous step.

After that, it will create `.env` file to your local repository and
guide you through setting up the rest of the required environment
variables. If the `.env` file doesn't exist the application won't start.
_This `.env` file is only created for the local development
environment_.

<info>

See the [template environment variables](/template/template-env/) for
more information on the environment variables.

</info>

## Start the server

Start the development server:

```bash
yarn run dev
```

Running `yarn run dev` uses
[Webpack's dev-server](https://webpack.js.org/configuration/dev-server/)
with
[Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/).

This will automatically open `http://localhost:3000` in a browser:

![Default marketplace screenshot](./generic-landingpage.png)

<info>

The Sharetribe Web Template fetches no-code content and configurations
from the Sharetribe backend using the
[Asset Delivery API](https://www.sharetribe.com/api-reference/asset-delivery-api.html).

Read more about how no-code assets are handled between the Sharetribe
Console and the client application in our
[asset reference documentation](/references/assets/).

</info>

<info>

As you browse your marketplace and create listings, you may notice that
the search filters do not work. You can activate the filters by creating
a
[search schema](/how-to/manage-search-schemas-with-sharetribe-cli/#adding-schemas)
that corresponds to your template.

</info>

## Summary

In this tutorial, we used the Sharetribe Web Template to get a
marketplace running. Here's a summary of those installation steps:

```bash
git clone https://github.com/sharetribe/web-template.git
cd web-template/
yarn install
yarn run config
yarn run dev
```

As you can see from `http://localhost:3000`, Sharetribe Web Template is
a fully ready and polished marketplace application that is running on
top of the Marketplace API. Client app customization is in your control,
and you can change it to fit your marketplace needs. Check the
[tutorial](/tutorial/introduction/) to learn how to customize the
Sharetribe Web Template.
