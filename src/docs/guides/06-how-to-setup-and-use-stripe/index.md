---
title: How to set up and use Stripe
slug: how-to-set-up-and-use-stripe
updated: 2019-03-27
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
filling the form you will be asked the question "How do you want to get
started with Stripe?". You can click "Skip for now" link at the bottom
of the page to get directly to Stripe dashboard. Remember to confirm
your email address after the registration.

As you will receive money from your users via your Stripe account, you
have to provide some details such as your address and your bank account.
In the Stripe dashboard, click the "Activate your account" link in the
left menu and fill in all the fields according to the instructions. The
activation form varies based on your country.

![Activate Stripe account](./activate-account.png)

---

## 2. Enable Stripe Connect in your platform

Sharetribe uses the Stripe Connect features with
[custom accounts](https://stripe.com/docs/connect/accounts#custom-accounts).

Note! If you're based in The United States, Stripe will need to review
your platform account before you get access. See
[this article](https://help.sharetribe.com/sharetribe-go-payments-and-transactions/online-payments-with-stripe/how-to-apply-for-stripe-connect-review-us-accounts-only)
to learn how to apply for Stripe Connect review.

If you're in any another country, follow these instructions to enable
Stripe Connect:

- Click the _Connect_ left menu item.

![Stripe connect](./stripe-connect.png)

- Click the _Get started_ button.

![Get started](./stripe-get-started.png)

- After a few seconds, you should see your Connect dashboard. From the
  left sidebar, go to _Settings_ then _Connect settings_, at
  https://dashboard.stripe.com/settings

![Connect settings](./stripe-connect-settings.jpg)

- Make sure that _Custom_ is enabled in the _Account types_ section

![Custom enabled](./stripe-custom-enabled.jpg)

Great! You now have to get your API keys and input them into your
marketplace.

---

## 3. Get your API keys from Stripe and add them to your Sharetribe marketplace

- Click the _Developers_ left menu item and go to _Developers_ → _API
  Keys_.
- In the section "Standard API keys" you will see two keys: publishable
  key and secret key. The publishable key (with prefix **pk**) is one
  used in frontend application (e.g. Flex Template for Web) and secret
  key (with prefix **sk**) is the one you need to add to Console. If you
  want to use test data make sure the value of the key is eg.
  **pk_test**\<somethinghere\> and not **pk_live**\<somethinghere\>

**Note:** If you want to use test data in development make sure that
"View test data" toggle is on. This way no real money will be used. In
production make sure that the toggle is off.

![Get API keys from Stripe](./api-keys.png)

---

## 4. Add your Stripe secret API key to Console

- Log in to Console and go to _Build_ → _Payments_
- In the section _Stripe configuration_ paste your secret key to "Stripe
  secret key" field and save the changes.

![Add Stripe secret key to Console](./add-stripe-to-console.png)

---

## 5. Add you Stripe publishable key to your client application

In your client application, you need to use Stripe publishable key, when
you create accountTokens or call other Stripe API endpoints. If you are
using Flex Template for Web, calls to Stripe API are already there, but
you need to add the Stripe publishable key to your `.env` file. You can
do this by running `yarn run config` or editing the file directly in a
text editor.

Read more about configurations in FTW from
[Getting started with FTW](/tutorials/getting-started-with-ftw/#configuration)

---

## 6. Test the Stripe account in Flex Template for Web

If you are using Flex Template for Web (FTW) here is some instructions
how you can test you Stripe account.

**Note:** When testing Stripe, make sure you are using the test API
keys. To ensure that make sure the keys have prefix **sk_test** and
**pk_test**. When checking the Stripe dashboard, make sure "View test
data" toggle is on!

### Test adding payout details

Every provider needs to add payout details to their account before they
are able to publish listings. Stripe provides test values for
[identity verification](https://stripe.com/docs/connect/testing#identity-verification)
and [bank numbers](https://stripe.com/docs/connect/testing#payouts). In
FTW you can add payout details for the account in _Account Settings_ →
_Payments_. After filling the form you should see a new account when you
go to Stripe Dashboard and to _Connect_ → _Accounts_.

**Note:** After payout details are saved they can not be edited directly
from FTW so you might need to create multiple accounts for testing
purposes.

The form of the bank number and other required information depends on
which country you have chosen. For example, most of the countries in
Europe use IBAN form which is asked in one field. However, for example
in Hong Kong clearing code, branch code and bank account number are all
needed.

![Hong Kong bank number](bank-number-hk.png)

It's also good to know that in FTW these are all separate fields but in
Stripe clearing code and branch code are mapped together as routing
number.

![Stripe bank numbers](stripe-bank-numbers.png)

With company accounts, Stripe might require information of every person
that owns at least 25% of the company or exercise significant control
over your company. This requirement is country specific. For more
information, see
[Stripe support](https://support.stripe.com/questions/owners-and-directors).

> Note: if a company/provider doesn't include enough owners to cover
> most of the shares, you might need to manually state that there are no
> more persons that own 25% or more.

![Add more owners alert](stripe-add-more-owners-alert.png)

### Test checkout

Stripe provides various
[test card numbers](https://stripe.com/docs/testing#cards) for testing
the checkout. There are also test numbers for
[specific responses and errors](https://stripe.com/docs/testing#cards-responses)
so e.g. testing different error scenarios is possible.

![Checkout](checkout.png)

---

## 7. Advanced: Adding new country to supported Stripe countries

By default FTW already supports most of the countries that are available
when using
[Stripe custom accounts](https://stripe.com/docs/connect/accounts#custom-accounts).
If you are not sure if your country is already supported, please contact
to Stripe support before proceeding.

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
