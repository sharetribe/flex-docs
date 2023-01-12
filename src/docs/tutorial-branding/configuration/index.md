---
title: Change configurations
slug: configurations
updated: 2020-02-28
category: tutorial-branding
ingress:
  Change marketplace configurations - change the marketplace currency to
  euro.
published: true
---

There are several files that affect the configuration of the Sharetribe
Web Template. The bottom layer consists of _environment variables_ and
_src/config_ folder.

## Environment variables

The Sharetribe Web Template has a couple of environment variables. Those
variables are more or less specific to a runtime environment. For
example, `REACT_APP_SHARETRIBE_SDK_CLIENT_ID` might be pointing to the
client ID of your Flex test-environment on localhost and on your staging
server (if you have one).

You already have set up a couple of those environment variables, when
you completed the
[Getting started with the Sharetribe Web Template](/introduction/getting-started-with-web-template/).
That happened, when you executed command:

```shell
yarn run config
```

That config script just asked a couple of mandatory variables from you
and then created a new hidden file: "**.env**". You can just open that
file with your preferred text editor:

```shell
└── .env
```

Full list of configuration variables can be found here:
[template environment variables](/ftw/ftw-env/). You can change any of
these variables _locally_ by just editing the **.env** file. Then you
need to restart the server by running `yarn run dev` again.

## Configuration files

Most configurations are defined in the different files in the
**src/config** folder.

```shell
└── src
    └── config
        └── configDefault.js
```

Some environment variables are just included in _configDefault.js_ file,
which is then imported into the components that use those variables.

However, the **configDefault.js** file also contains other variables
that are hard-coded in the file.

One of those variables is marketplace currency. To change it, you will
need to add the correct currency code. You can check the available
currencies in **src/config/settingsCurrency.js**

```diff
  // Marketplace currency.
  // The currency used in the Marketplace must be in ISO 4217 currency code. For example USD, EUR, CAD, AUD, etc. The default value is USD.
  // It should match one of the currencies listed in currencySettings.js
- currency: 'USD',
+ currency: 'EUR',
```

<extrainfo title="Why do my old listings have a wrong currency?">

If you already created listings before changing the currency, listings
using the old currency will not be bookable anymore. The Sharetribe Web
Template does not support multiple currencies and does not know how to
convert a listing's price from one currency to another.

You can just close those listings from Console.

<info>

If you want to change the currency of a production marketplace, you need
to customize your client app so that it allows providers to update the
listing's price even if the currency is wrong.

</info>

</extrainfo>

Another configuration defined in configDefault.js is **siteTitle** - and
then that variable is used in `<meta>` tags and
[webpage's schema](https://schema.org/).

```js
// Site title is needed in meta tags (bots and social media sharing reads those)
const siteTitle = 'Biketribe';
```

### Task: _Set listing's minimum price_

Let's continue our task of changing currency to euros. In the previous
chapter, we changed the currency to EUR and it is already in use when a
new listing is created.

<extrainfo title="Extra: how to import currency on a component file?">

The _configDefault.js_ file defines the currency and exports it among
other variables:

**src/components/SomeComponent/SomeComponent.js**:

1. Your component can then use the configurations by implementing the
   **useConfiguration** hook:

   ```js
   import { useConfiguration } from '../../context/configurationContext';
   ...
   const SomeComponent = props => {
    const config = useConfiguration();
   ```

2. Later in that component, the currency can be referenced from config:
   ```js
   const currency = config.currency;
   ```

</extrainfo>

If you are using some other currency besides EUR, you can read more
about checking the necessary currency configurations from
[this document](/ftw/how-to-set-up-currency-in-ftw/).

There is an additional variable set in **configDefault.js** that is
related to currency:

```js
  // Listing minimum price in currency sub units, e.g. cents.
  // 0 means no restriction to the price
  // Note: Stripe does have minimum fee that depends on country, currency, etc.
  listingMinimumPriceSubUnits: 500,
```

Stripe (the payment processor used by Flex) has a
[minimum (and maximum) charge amounts per currency](https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts).
For euros, the minimum charge amount is 50 cents at the time when this
article was written.

We need to ensure that providers don't create listings that are cheaper
than the minimum price. If the listing price is lower, Stripe will not
process the payment and the booking fails.

So, we should set the minimum price to be higher than what Stripe
charges. We need to decide a level where provider and marketplace also
get something. In this tutorial, we use €6 aka 600 cents:

```diff
// Listing minimum price in currency sub units, e.g. cents.
// 0 means no restriction to the price
// Note: Stripe does have minimum fee that depends on country, currency, etc.
- const listingMinimumPriceSubUnits = 500;
+ const listingMinimumPriceSubUnits = 600;
```

The error message, when creating a new listing
(_EditListingPricingForm_):

//TODO TAKE NEW SCREENSHOT!
![EditListingPricingForm: validation for minimum price](./minimum-price.png)

In the next article, we change the default suggestions for search
locations.<br />
[› Go to the next article](/tutorial/change-default-locations/)
