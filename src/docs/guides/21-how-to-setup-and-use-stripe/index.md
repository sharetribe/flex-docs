---
title: How to set up and use Stripe
slug: how-to-set-up-and-use-stripe
updated: 2019-02-04
category: guides
ingress:
  To enable payments and receive commissions in your marketplace, you
  need a free Stripe account. This guide will help you in creating a
  Stripe account and adding Stripe API keys to Console and Flex Template
  for Web.
published: true
---

## 1. Create and confirm your free Stripe account

[Register to Stripe](https://dashboard.stripe.com/register). After
filling the form you will be asked the question _"How do you want to get
started with Stripe?"_. You can click _"Skip for now"_ link in the
bottom of the page to get directly to Stripe dashboard. Remember to
confirm your email address after the registration.

As you will receive money from your users via your Stripe account, you
have to provide some details such as your address and your bank account.
In the Stripe dashboard, click the Activate your account link in the
left menu and complete all the fields according to the instructions. The
activation form varies based on your country.

![Activate Stripe account](./activate-account.png)

## 2. Enable Stripe Connect in your platform

Sharetribe uses the Stripe Connect features with
[custom accounts](https://stripe.com/docs/connect/accounts#custom-accounts).

- Click the Connect left menu item.
- Click the Get started button.
- Now you should see your Connect dashboard. From the left sidebar, go
  to Connect / Settings
- Make sure that _"Custom accounts are available for your platform."_ is
  shown.

![Stripe Connect](./connect.png)

## 3. Get your API keys from Stripe and add them to your Sharetribe marketplace

- Click _"Developers"_ → _"API Keys"_ in the left menu item.
- In the section _"Standard API keys"_ you will see two keys:
  publishable key and secret key. The publishable key (with prefix
  **pk**) is one used in frontend application e.g. FTW and secret key
  (with prefix **sk**) is the one you need to add to Console. If you
  want to use test data make sure the value of the key is eg.
  **pk*test***\<somethinghere\> and not **pk*live***\<somethinghere\>

**Note:** If you want to use test data in development make sure that
"View test data" toggle is on. This way no real money will be used. In
production make sure that the toggle is off.

![Get API keys from Stripe](./api-keys.png)

## 4. Add your Stripe secret API key to Console

- Log in to Console and go to "Build" -> "Payments"
- In the section "Stripe configuration" paste your secret key to "Stripe
  secret key" field and save the changes

![Add Stripe secret key to Console](./add-stripe-to-console.png)

## 5. Add you Stripe publishable key to FTW

In your client app, you need to use Stripe publishable key, when you create accountTokens or call other Stripe API endpoints. If you are using Flex Template for Web, calls to Stripe API are already there, but you need to add the Stripe publishable key to your `.env` file. You can do this by running
`yarn run config` or editing the file directly in a text editor.

Read more about configurations in FTW from
[Getting started with FTW](/getting-started-with-ftw/#configuration)

## 6. Testing the payments

**Note:** When testing Stripe, make sure you are using the test API
keys. To ensure that make sure the keys have prefix **sk_test** and **pk_test**.
When checking the Stripe dashboard, make sure "View test data" toggle is
on!

Stripe provides test numbers for bank accounts, credit cards etc.
Specific numbers are also provided for triggering different conditions
(e.g. card declined or expired) so testing different error scenarios is
also possible. See Stripe documentation for
[testing with Connect](https://stripe.com/docs/connect/testing).

## 7. Optional: Adding new country to supported Stripe countries

By default FTW already supports most of the countries that are available
when using Stripe custom accounts (linkki Stripen docs). If you are not
sure if your country is already supported, please contact to Stripe
support before proceeding.

1. Add a new country to `stripe-config.js` file (use other country
   configurations as an example). See Stripe documentation for
   [minimum verification requirements](https://stripe.com/docs/connect/required-verification-information)
   and
   [bank account format](https://stripe.com/docs/connect/payouts#formats).

2. Add new translation keys to translation file you are using (e.g.
   `translations/en.json`). Add at least
   `PayoutDetailsForm.countryNames.COUNTRYCODE` and
   `PayoutDetailsForm.companyTaxIdLabel.COUNTRYCODE` keys but there
   might be also other keys needed.

3. If you add new fields or you want to edit the existing ones, see
   `forms/PayoutDetailsForm` and the subcomponents in the folder. E.g.
   to enable personal ID number field you need to add the new country in
   `forms/PayoutDetailsForm/PayoutDetailsPersonalDetails.js` file where
   showing the ID number field is handled.
