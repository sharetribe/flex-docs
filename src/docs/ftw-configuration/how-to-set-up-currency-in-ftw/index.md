---
title: Currency configurations
slug: how-to-set-up-currency-in-template
updated: 2024-20-11
category: template-configuration
ingress:
  Learn how to set up and manage currency configurations in the
  Sharetribe Web Template. This guide covers changing the marketplace
  currency, overriding default settings, working with currency codes,
  and addressing challenges with multi-currency support.
published: true
---

## Change or override the marketplace currency

Versions 3.4.0 and newer of the template fetch currency data through
[assets](/references/assets/). You can change your marketplace currency
in
[Console > Build > General > Localization](https://console.sharetribe.com/a/general/localization).

If you want to override the currency information fetched using assets,
you can do so by editing the currency code in the
[configDefault.js](https://github.com/sharetribe/web-template/blob/main/src/config/configDefault.js#L20)
file.

You will also need to update the mergeCurrency function in
[configHelpers.js](https://github.com/sharetribe/web-template/blob/main/src/util/configHelpers.js#L51-L63)
to prevent the template from using the currency defined in assets.

```diff
const mergeCurrency = (hostedCurrency, defaultCurrency) => {
- const currency = hostedCurrency || defaultCurrency;
+ const currency = defaultCurrency;
  const supportedCurrencies = Object.keys(subUnitDivisors);
  if (supportedCurrencies.includes(currency)) {
    return currency;
  } else {
    console.error(
      `The given currency (${currency}) is not supported.
      There's a missing entry on subUnitDivisors`
    );
    return null;
  }
};

```

## Supported currencies

Stripe is the default payment processor in Sharetribe. If you want to
support payments using the default payment integration, please confirm
that [Stripe supports the currency](https://stripe.com/docs/currencies)
you intend to use.

If you configure your marketplace in a currency not supported by Stripe,
you can still use transaction processes without payments.

## Currency codes

The currency configuration must be in the
[ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes),
e.g. USD, EUR, CAD, AUD, etc. The default value is USD.

See a full list of currency codes of all currencies in use in the
[settingsCurrency.js](https://github.com/sharetribe/web-template/blob/f8e1ceff83f06ce62c94a66ef0b8236fa2c5c218/src/config/settingsCurrency.js#L3)
file.

## Changing listing minimum price

If you are using the newest version of The Sharetribe Web Template, you
can edit your listing minimum price through
[Console](https://console.sharetribe.com/a/transactions/minimum-transaction-size).
You need to specify the minimum price as the subunits of the currency
you are using, i.e. if you are using dollars, 500 would set the minimum
price for a listing at 5 dollars.

You can also set the value as 0, meaning there is no minimum price. We
recommend that the minimum listing price be at least the same as
[Stripe's minimum charge amount](https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts)
in the country you are operating. **If the listing price is lower than
Stripe's minimum charge amount, Stripe will not process the payment and
the transaction will fail.**

If you're not using the newest version of The Sharetribe Web Template,
or if you prefer to use local configuration files you can adjust the
`listingMinimumPriceSubUnits` variable in
[configDefault.js](https://github.com/sharetribe/web-template/blob/main/src/config/configDefault.js#L25).
The variable `listingMinimumPriceSubUnits` defines the minimum price a
customer can give a listing.

If you want to allow listings with no price, you will need to
[add a new transaction process](/how-to/change-transaction-process-in-template/)
where you have removed pricing and payment related actions.
Alternatively, you can use a transaction process without payments, such
as the inquiry process.

## Currency subunits

The
[settingsCurrency.js](https://github.com/sharetribe/web-template/blob/main/src/config/settingsCurrency.js)
file specifies an array of currency sub-units the template uses to
format currencies correctly. If the currency is a
[zero-decimal currency](https://stripe.com/docs/currencies#zero-decimal)
(e.g. JPY) it uses value 1. The template only supports currencies with
subunit divisors of 100 or smaller. While currencies with larger subunit
divisors (e.g., 1000, such as the Iraqi Dinar) could be supported, they
are not currently compatible with the existing email templates, which
assume a divisor of 100.

### Why subunits?

All API requests to Stripe expects amounts to be provided in a
currency’s smallest unit. It's also better to calculate using integers
than floats to avoid rounding errors.

## Formatting currency

Formatting money is done by using
[React Intl](https://github.com/yahoo/react-intl). The component
[`FieldCurrencyInput`](https://github.com/sharetribe/web-template/blob/main/src/components/FieldCurrencyInput/FieldCurrencyInput.js)
converts user input to a formatted message and adds the Money object to
the price attribute of a listing. All currency is formatted specified by
the value set in the
[configDefault.js](https://github.com/sharetribe/web-template/blob/main/src/config/configDefault.js#L20)
file.

## Calculating price amounts client-side

If you need to calculate the price on client app side use
[Decimal.js](https://github.com/MikeMcl/decimal.js/) library. Currently,
there are two places in the template where prices are calculated:

- [server/api-util/lineItemHelpers.js](https://github.com/sharetribe/web-template/blob/main/server/api-util/lineItemHelpers.js)

- [EstimatedCustomerBreakdownMaybe.js](https://github.com/sharetribe/web-template/blob/main/src/components/OrderPanel/EstimatedCustomerBreakdownMaybe.js)

## Supporting multiple currencies

The template is designed to be currency-agnostic, making it technically
possible to support multiple currencies. Pricing information is
associated with individual listings, allowing for potentially having
multiple listings in different currencies. However, this functionality
is not enabled by default, as multi-currency support presents several
challenges.

If you are interested in building multi-currency support, consider the
following:

1. Listings can have only one `price` attribute
   ([see API reference](https://www.sharetribe.com/api-reference/marketplace.html#listing-resource-format)).
   Storing additional currency information requires creating a duplicate
   of each listing in each supported currency, or utilising extended
   data to store additional currency and pricing information.

2. Price filtering is based on amount only and does not take the
   currency into account. This can lead into problems if you want to
   compare prices. You might have dollars and yens in the same
   marketplace. One USD is 110 JPY, so the default price filtering will
   not easily find equally priced items if they are in different
   currencies.

3. Currency conversions may cause complexity. If most of your users have
   a credit card in one currency but listings are in a different
   currency, some conversion costs will take effect.
