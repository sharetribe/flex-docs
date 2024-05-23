---
title: How to add a new Stripe country
slug: add-new-stripe-countries
updated: 2024-05-17
category: how-to-payments
ingress:
  By default, the Sharetribe Web Template already supports most
  countries supported by Stripe. This guide will help you in adding new
  countries to the template.
published: true
---

<info>

This article has been updated. You can find instructions for setting up
your Stripe account
[in our Help Center](https://www.sharetribe.com/help/en/articles/8413086-how-to-set-up-stripe-for-payments-on-your-marketplace).

</info>

## Adding new country to supported Stripe countries

By default, the template already supports most of the countries that are
available when using
[Stripe custom accounts](https://stripe.com/docs/connect/accounts#custom-accounts).
If you are not sure if your country is already supported, please contact
to Stripe support before proceeding.

1. Add a new country to
   [`configStripe.js`](https://github.com/sharetribe/web-template/blob/main/src/config/configStripe.js)
   file (use other country configurations as an example). See Stripe
   documentation for
   [minimum verification requirements](https://stripe.com/docs/connect/required-verification-information)
   and
   [bank account format](https://stripe.com/docs/connect/payouts#formats).

2. Add new marketplace text keys to the marketplace text file you are
   using (e.g. `translations/en.json`). Add at least
   `PayoutDetailsForm.countryNames.COUNTRYCODE` and
   `PayoutDetailsForm.companyTaxIdLabel.COUNTRYCODE` keys but there
   might be also other keys needed.

3. If you add new fields or you want to edit the existing ones, see
   `forms/PayoutDetailsForm` and the subcomponents in the folder. E.g.
   to enable personal ID number field you need to add the new country in
   `forms/PayoutDetailsForm/PayoutDetailsPersonalDetails.js` file where
   showing the ID number field is handled.

### Exceptions related to Brazil, India, and Hungary Stripe support

The Sharetribe Web Template does not support Brazil (BR), India (IN) and
Hungary (HU), even though all three countries are mentioned as available
Stripe countries in
<a href="https://stripe.com/docs/connect/accounts#custom-accounts">Stripe's
documentation</a>. If you want to support one of these three regions,
you will need to do a fair amount of customization on top of the default
Sharetribe setup.

<ul>
  <li> The Sharetribe transaction engine uses manual payouts, which are <a href="https://stripe.com/docs/payouts#manual-payouts">not supported for Brazil and India</a>.</li>
  <li>India has restrictions on <a href="https://support.stripe.com/questions/stripe-india-support-for-marketplaces">cross-border payments</a>.</li>
  <li>Stripe treats the Hungarian currency HUF as a <a href="https://stripe.com/docs/currencies#special-cases">zero-decimal currency for payouts</a>. This means that even though the Sharetribe engine can create charges in two-decimal amounts (e.g. HUF 20.38), payouts can only be created in integer amounts evenly divisible by 100 (e.g. HUF 20.00). Additionally, if Stripe needs to do currency conversions from another currency to HUF, the resulting amount may have decimals which can cause the payout to fail.</li>
</ul>
