---
title: How to set up currency in FTW
slug: how-to-set-up-currency-in-ftw
updated: 2019-07-17
category: guides
ingress:
  Flex Template for Web (FTW) uses USD as the default currency. This
  guide will help you to change currency and edit other configurations
  related to it.
published: true
---

## 1. Change the currency

At the moment FTW uses Stripe as the only payment provider so before
changing the currency, make sure it's supported in Stripe. See the
Stripe documentation for
[supported currencies](https://stripe.com/docs/currencies).

Environment variable `REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY` is used
for the currency. For local development you can add the variable in the
Gitignored `.env` file in the project root:

```bash
REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY=your-currency
```

You can also change the configuration with the command line tool by
running

```bash
yarn run config
```

Remember to restart the application after editing the environment
variable!

**Note:** If you already created listings before changing the
currency, listings using old currency will not show the price when a new
currency is in use. Currently, FTW doesn't support changing the currency
of the listing so the price cannot be edited after the currency used in
the application is changed.

## 2. Edit listing minimum price

In the `config.js` file, search for variable
`listingMinimumPriceSubUnits` and give a minimum price in currency's
subunits (e.g. cents). By default, FTW uses value 0 which means there is
no restriction to the price but we recommend that the listing minimum
price should be at least the same amount as
[Stripe fee](https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts)
in the country you are operating. If the listing price is lower, Stripe
will not process the payment and the booking fails.

## 3. Check the currency-config.js file

See the
[currency-config.js](https://github.com/sharetribe/flex-template-web/blob/master/src/currency-config.js)
file and make sure the currency is added to the `subUnitDivisors` array.
Most common currencies are already added to the file. If the currency is
[zero-decimal currency](https://stripe.com/docs/currencies#zero-decimal)
(e.g. JPY) use value 1. Otherwise, the value is usually 100.

### Why subunits?

All API requests to Stripe expects amounts to be provided in a
currency’s smallest unit. It's also better to calculate using integers
than floats to avoid rounding errors.

## 4. Optional: Format values

Formatting money is done by using
[React Intl](https://github.com/yahoo/react-intl). Component
`FieldCurrencyInput` converts user input to a formatted message and adds
the Money object to price attribute of a listing. `currencyConfig.js`
file affects how prices are formatted by determining how the subunits
are converted to the actual unit (e.g. from cents to USD).

## 5. Optional: Calculate the price in client app side

If you need to calculate the price on client app side use
[Decimal.js](https://github.com/MikeMcl/decimal.js/) library. Currently,
there is one place in FTW where prices are calculated:
`BookingDatesForm`. See the file
[EstimatedBreakdownMaybe.js](https://github.com/sharetribe/flex-template-web/blob/master/src/forms/BookingDatesForm/EstimatedBreakdownMaybe.js)
to see how the Decimal.js library is used.

## Your Saunatime demo listings 

If you just started, you likely have a few demo Saunatime listings in your Console. These listings use EUR as their currency. Configuring a currency different than EUR will result in an error as the FTW cannot convert the currency of existing listings. You can ignore this error by closing these listings in your Console, which will remove them from the search page as well, and creating new listings.  
