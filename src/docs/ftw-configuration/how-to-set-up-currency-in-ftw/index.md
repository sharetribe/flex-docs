---
title: Currency configurations
slug: how-to-set-up-currency-in-ftw
updated: 2019-07-17
category: ftw-configuration
ingress:
  The Sharetribe Web Template uses USD as the default currency. This
  guide will help you to change the default currency and other
  currency-related settings.
published: true
---

## Change marketplace currency

Stripe is the default payment processor in Flex. If you are using the
default payment integration, please confirm that
[Stripe supports the currency](https://stripe.com/docs/currencies) you
intend to use.

You can find the currency configuration in the
[configDefault.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/configDefault.js#L20)
file. The currency configuration must be in the
[ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes),
e.g. USD, EUR, CAD, AUD, etc. The default value is USD.

<info>

If you already created listings before changing the currency, listings
using old currency will not show the price when a new currency is in
use. Currently, Flex does not support changing the currency of the
listing so the price cannot be edited after the currency used in the
application is changed.

</info>

## Edit listing minimum price

The variable `listingMinimumPriceSubUnits` defines the minimum price a
customer can give a listing. You can find that variable in
[configDefault.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/configDefault.js#L25).
You need to specify the minimum price as the subunits of the currency
you are using, i.e. if you are using dollars,
`listingMinimumPriceSubUnits: 500` would set the minimum price for a
listing at 5 dollars.

You can also set the value as 0, meaning there is no minimum price. We
recommend that the minimum listing price be at least the same as
[Stripe's minimum charge amount](https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts)
in the country you are operating. **If the listing price is lower than
Stripe's minimum charge amount, Stripe will not process the payment and
the transaction will fail.**

## Currency subunits

The
[settingsCurrency.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/settingsCurrency.js)
file specifies an array of currency sub-units the template uses to
format currencies correctly. The most common currencies are already
included in the file. If the currency is a
[zero-decimal currency](https://stripe.com/docs/currencies#zero-decimal)
(e.g. JPY) it uses value 1. Otherwise, the value is usually 100.

### Why subunits?

All API requests to Stripe expects amounts to be provided in a
currency’s smallest unit. It's also better to calculate using integers
than floats to avoid rounding errors.

## Formatting currency

Formatting money is done by using
[React Intl](https://github.com/yahoo/react-intl). The component
[`FieldCurrencyInput`](https://github.com/sharetribe/ftw-x/blob/main/src/components/FieldCurrencyInput/FieldCurrencyInput.js)
converts user input to a formatted message and adds the Money object to
the price attribute of a listing. All currency is formatted specified by
the value set in the
[configDefault.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/configDefault.js#L20)
file.

## Calculating the price client-side

If you need to calculate the price on client app side use
[Decimal.js](https://github.com/MikeMcl/decimal.js/) library. Currently,
there are two places in the template where prices are calculated:

- [server/api-util/lineItemHelpers.js](https://github.com/sharetribe/ftw-x/blob/master/server/api-util/lineItemHelpers.js)

- [EstimatedCustomerBreakdownMaybe.js](https://github.com/sharetribe/ftw-x/blob/master/src/components/OrderPanel/EstimatedCustomerBreakdownMaybe.js)

## Using multiple currencies

You can have multiple currencies inside a single marketplace, since Flex
itself is currency agnostic. There are, however, some caveats that you
need to take into account. By default, the template limits currency to a
single currency because of the caveats listed below. This just made
things simpler to develop. You can of course change currency handling in
your marketplace if you take these caveats into account.

First, a single listing can have only a single price. If you wish to
offer the same listing in two different currencies, you need to create
two listings with the same content but different currency and price,
which means storing the secondary currency price in e.g. public data.

Second, filtering by price becomes problematic. The price filtering is
based on the amount only and does not take the currency into account.
This can lead into problems if you want to compare prices. You might,
for example, have dollars and yens in the same marketplace. One USD is
110 Yen, so the default price filtering will not easily find equally
priced items if they are in different currencies.

Third, currency conversions may cause complexity. If most of your users
have a credit card in one currency but listings are in a different
currency, some conversion costs will take effect.
