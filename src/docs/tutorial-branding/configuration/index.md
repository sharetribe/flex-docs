---
title: Change currency and minimum price
slug: configurations
updated: 2023-09-25
category: tutorial-branding
ingress:
  In this tutorial section we change the marketplace currency and we set
  a minimum price for transactions.
published: true
---

There are several files that affect the configuration of the Sharetribe
Web Template. The bottom layer consists of _environment variables_ and
all the files in the _src/config_ folder. In addition to that, you can
adjust many of your marketplace settings through Console.

## Environment variables and configuration files

You make a lot of adjustments to your marketplace via environment
variables, configuration files and through Console. These configurations
are specific to the runtime environment. For example, the
`REACT_APP_SHARETRIBE_SDK_CLIENT_ID` environment variable might be
pointing to the client ID of your Flex development environment on
localhost and on your staging server (if you have one).

You already have set up a couple of those environment variables, when
you completed the
[Getting started with the Sharetribe Web Template](/introduction/getting-started-with-web-template/).
That happened, when you executed command:

```shell
yarn run config
```

That config script asked you to input all mandatory variables and then
created a new hidden file: "**.env**". You can open that file with your
preferred text editor:

```shell
└── .env
```

A full list of environment variables can be found here:
[template environment variables](/ftw/ftw-env/). You can change any of
these variables _locally_ by just editing the **.env** file. Then you
need to restart the server by running `yarn run dev` again.

You can also find a full list of configuration variables that can be
changed through the template codebase in the
[Configuration variables](/ftw/configuration/) article.

## Change the currency

Most configurations are defined in the different files in the
**src/config** folder.

```shell
└── src
    └── config
        └── configDefault.js
```

Some environment variables are imported in the
[_configDefault.js_](https://github.com/sharetribe/web-template/blob/main/src/config/configDefault.js)
file, which is then imported into the components that use those
variables.

However, the **configDefault.js** file also contains other variables
that are hard-coded in the file.

One of those variables is marketplace currency. To change it, you will
need to add the correct currency code. You can check the available
currencies in
[**src/config/settingsCurrency.js**](https://github.com/sharetribe/web-template/blob/main/src/config/settingsCurrency.js).

```diff
  // Marketplace currency.
  // The currency used in the Marketplace must be in ISO 4217 currency code. For example USD, EUR, CAD, AUD, etc. The default value is USD.
  // It should match one of the currencies listed in currencySettings.js
- currency: 'USD',
+ currency: 'EUR',
```

If you already created listings before changing the currency, listings
using the old currency will not be bookable anymore. The Sharetribe Web
Template does not support multiple currencies and does not know how to
convert a listing's price from one currency to another.

If you have existing listings in another currency, you can close those
listings through Console.

<info>

If you want to change the currency of a live marketplace, you need to
customize your client app so that it allows providers to update the
listing's price even if the currency is wrong.

</info>

<extrainfo title="Extra: how to import currency in a component file?">

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

## Summary

In this tutorial, we changed the marketplace currency. Currency needs to
be edited through the _configDefault.js_ file by changing the currency
code to the desired value.

## Further reading

- [Currency configurations](/ftw/how-to-set-up-currency-in-ftw/)
- [Environment variables](/ftw/ftw-env/)
- [Configuration variables](/ftw/configuration/)
