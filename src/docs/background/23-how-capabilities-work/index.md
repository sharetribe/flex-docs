---
title: How Capabilities work?
slug: how-capabilities-work
updated: 2019-12-19
category: background
ingress:
  Capabilities framework offers tools to manage regulatory aspects of
  provider onboarding. This article outlines mandatory changes to the
  framework and instructions regarding your actions on reacting to those
  changes.
published: true
---

## Introduction

Coping with regulatory environment regarding provider onboarding can
be a complex and daunting endeavour. Fulfilling these requirements
means that you need to be collecting a variety of information from
your providers in order to be able to process payments. Stripe has a
mechanism for controlling the amount of information collected from providers called
[Capabilities](https://stripe.com/docs/connect/capabilities-overview).

Capabilities are a collection of settings that can be requested for
each provider. What Capabilities are required determines what
information Stripe requires to be collected from the providers.

## Changes to Capabilities framework

Stripe is introducing mandatory changes to the Capabilities framework.
In the beginning of 2020, Stripe will enforce that Capabilities are
required for all accounts, existing and new. Stripe’s deadlines for
reacting to these changes are:
- 20th of February, 2020 for customers in the US.
- 31st of March, 2020 for the rest of the world.
- In practice, there might be small variations for these depending on the
 country and activity of the marketplace.

After requesting new Capabilities, your providers need to most likely
provide additional verification information to Stripe and you need to
update your provider onboarding and payment information updating
processes in your marketplace application.

## How should you handle the changes to Capabilities framework?

For Flex payments to operate smoothly, your accounts need to have the
`card_payments` and `transfers` Capabilities required and activated.
The `card_payments` will enable the providers to accept payments by
card and the `transfers` will allow the platform account to move money
to connected accounts. Requesting `card_payments` will enforce also
requesting the `transfers` capability.

Requesting Capabilities can be done during [Stripe
Account](https://www.sharetribe.com/api-reference/marketplace.html#stripe-account)
[create](https://www.sharetribe.com/api-reference/marketplace.html#create-stripe-account)
and
[update](https://www.sharetribe.com/api-reference/marketplace.html#update-stripe-account)
calls. Activating the Capabilities happens by providing identity
verification information to Stripe either by using [Stripe Connect
Onboarding](https://stripe.com/en-fi/connect/onboarding), or [account
tokens](https://stripe.com/docs/connect/account-tokens)
during the create and update calls. What information is required for
Capability activation is dependent on provider account and activity.
The specific information can be determined from `stripeAccountData` in
[Stripe
Account](https://www.sharetribe.com/api-reference/marketplace.html#stripe-account)
resource. The `stripeAccountData` attribute contains the related [Stripe Account
Object](https://stripe.com/docs/api/accounts/object) where the fields
`payouts_enabled` and `requirements` can provide you with valuable information.

How to implement these changes depends on when you have subscribed to Flex.

### Before 19th of December 2019

If you have subscribed to Flex before 19th of December you need to
react to the changes. We at Sharetribe have worked hard so that you
can implement the changes as smoothly as possible.

**Migration on 8th of January 2020**

We will perform a migration on 8th of January requiring for all of
your provider accounts `card_payments`, `transfers` and
`legacy_payments` capabilities and updating your marketplace's Stripe
API version to `2019-12-03`. `card_payments` and `transfers`
capabilities are required for payments to work after the above
deadlines. `legacy_payments` is a capability allowing your current
implementation to work until the deadlines.

**Your actions**

In order for you to make sure that your marketplace is ready for the
above deadlines, you need to perform the following actions:

- If you wish to use Stripe Connect Onboarding, enable it in your
 [Stripe
 Dashboard](https://dashboard.stripe.com/account/applications/settings)
- Make sure that your marketplace application is ready for the
 changes by following our how to guide for provider onboarding
- Inform your providers that they need to provide additional
 information to Stripe.

You can already start working, implementing and testing the provider
onboarding and updating processes in your marketplace application.
Before deploying these changes to production, we recommend that you
wait for the migration on 8th of January. The migration will make
implementing things simpler regarding your existing provider accounts.

### After 19th of December 2019

Your marketplace by default supports and is ready for the changes to
the Capabilities framework. In practice:

- Your marketplace is using Stripe API version `2019-12-03`
- The `card_payments` and `transfers` are required for your users by default
- The newest Flex Template for Web is using Stripe Connect Onboarding

You can continue using and developing as is, and you don't need to
react specifically to the changes.
