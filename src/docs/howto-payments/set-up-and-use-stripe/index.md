---
title: Set up Stripe for a custom developed marketplace
slug: set-up-and-use-stripe
updated: 2024-05-17
category: how-to-payments
ingress:
  To enable payments and receive commissions in your marketplace, you
  need a free Stripe account. This guide will help you in adding Stripe
  API keys to Console and the Sharetribe Web Template.
published: true
---

<info>

This article has been updated. You can find instructions for setting up
your Stripe account
[in our Help Center](https://www.sharetribe.com/help/en/articles/8413086-how-to-set-up-stripe-for-payments-on-your-marketplace).

</info>

## Setting up Stripe for your custom developed marketplace

First,
[follow these instructions](https://www.sharetribe.com/help/en/articles/8413086-how-to-set-up-stripe-for-payments-on-your-marketplace)
to set up your Stripe account.

When setting up your marketplace for a custom developed app, you will
need to add the Stripe secret key in your Console, and your publishable
key in your custom app.

### Get your Stripe keys

First, retrieve your Stripe API keys. Click "Developers" → "API Keys" in
the top bar menu.

For your Test and Dev environments, you need to use Test keys, and for
your Live environment, you need to use Live keys.

- When the Test mode toggle is switched on, you are viewing your Test
  keys. The Test keys start with pk_test (publishable key) and sk_test
  (secret key).
- When the Test mode toggle is switched off, you are viewing your Live
  keys. The Live keys start with pk_live (publishable key) and sk_live
  (secret key).

![Test API keys in Stripe Dashboard](./stripe-test-data.png)

### Add your secret key to your Console

Next, you need to add your secret key in your Console.

- Log in to Console and go to Build > Integrations > Payments.
- In the section "Stripe configuration", add your secret key to the
  "Stripe secret key" field and save your changes.

![Add Stripe secret key](./stripe_dev_key_console.png)

### Add your publishable key to your application

In your client application, you need to use Stripe publishable key when
you are making API calls to Stripe. If you are using the Sharetribe Web
Template, the default calls to Stripe API are already there, but you
need to add the Stripe publishable key to your .env file. You can do
this by running _yarn run config_ or editing the file directly in a text
editor.

Read more about configurations in the Sharetribe Web Template in
[Template environment variables](/template/template-env/).

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
