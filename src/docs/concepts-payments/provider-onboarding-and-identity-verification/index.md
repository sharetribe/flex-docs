---
title: Providers and customers on your Stripe Platform
slug: providers-and-customers-on-stripe-platform
updated: 2024-11-27
category: concepts-payments
ingress:
  This article describes how providers and customers show up on your
  Stripe platform account.
published: true
---

## Introduction

If your marketplace handles payments through the Sharetribe Stripe
integration, your providers and customers will show up in different ways
on your Stripe platform account. The main ways this happens is through
Stripe Connect accounts and Stripe Customers.

The Sharetribe Stripe integration uses Stripe Custom Connect accounts
for providers. When a provider first creates a listing, they need to
onboard to Stripe Connect before they can receive payouts. For
customers, on the other hand, a Stripe Customer does not need to be
created by default.

## Stripe for providers: Stripe Connect Onboarding

When your marketplace handles payments, it is important to have a
provider verification process where providers can enter all necessary
and required information for them to receive payments. Provider
verification is
[a requirement from Stripe's side](https://support.stripe.com/questions/know-your-customer-obligations)
for identity verification, risk assessment, and avoiding money
laundering and other types of financial crime.

Regulatory aspects of provider onboarding can be challenging and
changing rapidly. Stripe Connect Onboarding provides ready tools for
meeting the requirements and reducing the operational complexity of
self-managing the onboarding flow and identity verification.

For both Sharetribe Web Template and custom implementations, your
marketplace will first need to set up Stripe for payments and enable
Connect Onboarding. You can review the
[instructions in our Help Center](https://www.sharetribe.com/help/en/articles/8413086-how-to-set-up-stripe-for-payments-on-your-marketplace)
for more details.

### Stripe Connect Custom Accounts

Sharetribe uses Stripe Connect with Custom Accounts as the default
payment integration. These enable your sellers to process payments
through your marketplace. Stripe Connect also has other types of
accounts, such as Standard and Express, but those are not compatible
with the Sharetribe Stripe integration.

When you use the Sharetribe Stripe integration, you need to create
Custom Connect accounts for your users through the Sharetribe
Marketplace API
[Stripe Account creation endpoint](https://www.sharetribe.com/api-reference/marketplace.html#create-stripe-account).
It is not possible to associate an existing Custom Connect account with
a Sharetribe user profile.

When you need to update the Stripe Account, you can either use the
Marketplace API
[Stripe Account updating endpoint](https://www.sharetribe.com/api-reference/marketplace.html#update-stripe-account)
or directly through
[Stripe API](https://docs.stripe.com/api/accounts/update).

### Fetching an existing Stripe Connect Account

If the provider already has a Stripe account, the
[currentUser resource](https://www.sharetribe.com/api-reference/marketplace.html#currentuser-resource-format)
has a _stripeConnected_ boolean flag set to _true._ To fetch the
provider's existing Stripe Connect account details, we can use the
Marketplace API
[Stripe Account fetch](https://www.sharetribe.com/api-reference/marketplace.html#fetch-stripe-account)
endpoint. This will allow you to alert the provider if there is some
required information missing from their Stripe Account.

Stripe account data is returned after each create and update Stripe
Account API call, so there is no need for separate fetch API call in
these cases.

After the Stripe Account has been fetched, you need to check
_requirements_ in the _stripeAccountData_ attribute, which contains the
related
[Stripe Account Object](https://stripe.com/docs/api/accounts/object). If
there are any fields in _past_due_ or _currently_due_ it means that
those fields need to be collected to keep the account enabled. In other
words, there are requirements missing. If there are no fields in
_past_due_ or _currently_due_, it means that the verification is
completed for now. It is still possible that there might be new fields
to be collected if the account reaches the next volume thresholds.

### Creating a new Stripe Connect Account

If the current user's _stripeConnected_ flag is false, the current user
does not have a Stripe account, and you need to create a new Stripe
Connect account for the user.

If you collect bank account information in the client,
[create a Stripe bank account token](https://docs.stripe.com/api/tokens/create_bank_account)
so that you can securely pass it to the Sharetribe backend.

If you collect other information in the client, such as account type
(individual vs business) or whether the user has accepted Stripe's
Connected Account Agreement,
[create a Stripe account token](https://docs.stripe.com/api/tokens/create_account)
to pass that information to the Sharetribe backend.

With the Sharetribe Marketplace API,
[create a Stripe account](https://www.sharetribe.com/api-reference/marketplace.html#create-stripe-account)
and pass any tokens you created in the previous steps to the endpoint.
The only mandatory parameter to create a Stripe Connect account through
the Marketplace API is the country of the account, and it cannot be
modified after the account has been created.

In addition to the country information, we recommend passing the
_requestedCapabilities_ parameter – the required capabilities for
payments to work in Sharetribe are _card_payments_ and _transfers_, so
you will need to define these for the account for it to work with the
Sharetribe Stripe integration. There are also other optional parameters
that you can collect in your application and pass to the endpoint. If
you don't pass these details, the necessary information will be
collected in the Stripe Connect Onboarding flow.

<info>

Currently, Stripe doesn't support updating the country of the account
after the account has been created.

</info>

The account data is returned after each create and update Stripe Account
API call, so there is no need for separate fetch API call in these
cases.

### Handling verification status – Stripe Account Links

After the Connect account exists, the user needs to complete the
onboarding. The user can also update the information related to their
Stripe Connect account by refilling the Stripe Connect Onboarding flow.
This might be necessary if there are new requirements in the user's
existing account, or if they want to for example update their contact
information.

Stripe Account Links are a mechanism for enabling your providers to
access Stripe Connect Onboarding UI. You need to
[create an account link](https://www.sharetribe.com/api-reference/marketplace.html#create-stripe-account-link)
and provide the return URLs for success and failure cases. The response
value is a URL where you can then redirect the provider to complete
their Stripe Connect Onboarding. Do note that the Account Link has an
expiration time, so you should fetch the link only when the user
indicates they want to fill out the details.

When creating the account link, you need to specify the type of the
account link. You can also pass an optional _collectionOptions_
parameter to define which requirements you want to collect at that
point. You can determine that you want your providers to fill out

- only the information that is currently required for this account
  (_fields: currently_due_)
- or also information that might become required for this account later
  if it reaches certain thresholds (_fields: eventually_due_)
- and optionally information that is not yet required for any accounts,
  but will become required in the future (_future_requirements:
  include_)

See the available values for these options in Stripe's own
documentation:

- [Account link types](https://docs.stripe.com/api/account_links/create#create_account_link-type)
- [Account link _collectionOptions_](https://docs.stripe.com/api/account_links/create#create_account_link-collection_options)

If the user returns to the success URL, it is still a good idea to check
the status of the Stripe Account again. Returning to success URL does
not automatically mean that the account has all the required
information.

### Stripe Connect Account and Onboarding in Sharetribe Web Template

The Sharetribe Web Template uses the Stripe Connect Onboarding flow by
default. You can find the practical details in our help center:

- [How adding payout details works with Stripe](https://www.sharetribe.com/help/en/articles/8857191-how-adding-payout-details-works-with-stripe)

On the code level, the Stripe Connect Account creation and Connect
Onboarding is mainly handled in the following files:

- [StripePayoutPage](https://github.com/sharetribe/web-template/tree/main/src/containers/StripePayoutPage)
- [StripeConnectAccountForm](https://github.com/sharetribe/web-template/tree/main/src/components/StripeConnectAccountForm)
- [stripeConnectAccount.duck.js](https://github.com/sharetribe/web-template/blob/main/src/ducks/stripeConnectAccount.duck.js)

<info>

In the `EditListingWizard` component, the modal with
`StripeConnectAccountForm` is shown if the user doesn't have a Stripe
Account yet or if there is some information missing from the account.
The modal will be shown only if the user is publishing the listing. This
means that users can update already published listing even if their
Stripe Account is in the restricted state but they can't publish new
listings.

</info>

### Using custom flow for Stripe provider onboarding

It's also possible to implement the onboarding flow in your own
application, if using Stripe Connect Onboarding is not an option. This
way the user will stay in your application throughout the whole
onboarding. The downside with this approach is that you are responsible
for collecting all the required information and keeping the UI
up-to-date also with the possible future changes. In general, we
strongly recommend that you always use Stripe Connect Onboarding to
onboard your providers, regardless of your front-end application.

In our older
[legacy templates](/how-to/provider-onboarding-and-identity-verification/#using-deprecated-payoutdetailsform-and-payoutdetailspage-as-a-starting-point),
Stripe onboarding was implemented with a custom flow. There are some now
deprecated components you can use as a starting point if you want to
implement your own flow. You should keep in mind that these components
will not be updated by our team since Sharetribe Web Template uses
Connect Onboarding by default.

You can find the deprecated files still from v.3.7.0

- [PayoutDetailsForm](https://github.com/sharetribe/ftw-daily/tree/v3.7.0/src/forms/PayoutDetailsForm)
- [PayoutPreferencesPage](https://github.com/sharetribe/ftw-daily/tree/v3.7.0/src/containers/PayoutPreferencesPage)
- [stripe.duck.js](https://github.com/sharetribe/ftw-daily/blob/v3.7.0/src/ducks/stripe.duck.js).

## Stripe for customers: saved payment methods

Providers always need a Stripe Connect account to receive a payout from
a transaction. For a customer, you can make a payment either with a
Stripe Customer or without one.

When you make a payment without a Stripe Customer, you create the
PaymentIntent in the Sharetribe backend transaction process without
passing payment method information to the transition. In that situation,
you then need to attach the payment method to the PaymentIntent by
making an API call to Stripe directly.

If you want to create a Stripe Customer and save the payment card as you
make the payment, you need to create the payment intent with a
_setupPaymentMethodForSaving: true_ parameter. This sets up the
PaymentIntent so that its PaymentMethod can later be attached to a
Stripe Customer.

In this flow, you

1. Create the PaymentIntent as a part of the transaction process
2. Pass the card information to Stripe API when you confirm the
   PaymentIntent
3. Use the Sharetribe API to
   [create the Stripe Customer](https://www.sharetribe.com/api-reference/marketplace.html#create-stripe-customer)
   and pass the PaymentIntent's _paymentMethodId_ as a parameter.

You can also create a Stripe Customer without handling a payment at the
same time. In that case, you need to create a
[Stripe Setup Intent](https://www.sharetribe.com/api-reference/marketplace.html#create-stripe-setup-intents)
with the Sharetribe API, and then use the setup intent to call Stripe
handleCardSetup.

Read more:

- [Using stored payment cards](/concepts/using-stored-payment-cards/)
- [How saving a payment card works in the Sharetribe Web Template](/how-to/save-payment-card/)

## Changing a marketplace's Stripe platform account

Marketplaces sometimes need to change their Stripe platform account for
one reason or another. Since Stripe Connect accounts and Stripe
Customers are both associated with your Stripe platform account, it is
not possible to change your Stripe keys if Connect accounts or Customers
exist on your marketplace. You can reach out to Sharetribe support, and
we can help you clear the Stripe Connect accounts and Customers from
your marketplace.

In practice, removing all Stripe Connect accounts and Stripe Customers
means that all payout details (bank accounts) are lost from the
marketplace users, and all providers will need to complete Stripe
onboarding again before other users can start transactions against their
listings. In addition, existing transactions that have an upcoming
Stripe related action are not able to move forward. This means that if
you need to change the Stripe keys for your Live marketplace, you will
need to either cancel in Console all ongoing transactions that have
upcoming Stripe actions, and then manage the necessary payouts and
refunds manually on your old Stripe platform for transactions that
cannot be canceled.
