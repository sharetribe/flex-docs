---
title:
  Changes to Stripe provider onboarding and Stripe Capabilities
  framework
slug: stripe-provider-onboarding-and-capabilities
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

Coping with regulatory environment regarding provider onboarding can be
a complex and daunting task. Fulfilling these requirements means that
you need to be collecting a variety of information from your providers
in order to be able to process payments. Stripe has a mechanism for
controlling the amount of information collected from providers called
[Capabilities](https://stripe.com/docs/connect/capabilities-overview).

Capabilities are a collection of settings that can be requested for each
provider. What Capabilities are required determines what information
Stripe requires to be collected from the providers.

Currently, marketplaces located in the United States have used
`card_payments` Capability for their providers. Rest of the world has
`legacy_payments` enabled.

## Changes to Capabilities framework

Stripe is introducing mandatory changes to the Capabilities framework.
In the beginning of 2020, Stripe will enforce Capabilities for all
accounts, existing and new. Stripe’s deadlines for reacting to these
changes are:

- February 20th 2020 for customers in the US.
- March 31st 2020 for the rest of the world.

In practice, there might be small variations for these depending on the
country and activity of the marketplace.

After requesting new Capabilities, your providers need to most likely
provide additional verification information to Stripe and you need to
update your provider onboarding and payment information updating
processes in your marketplace application.

## How should you handle the changes to Capabilities framework?

For Flex payments to operate smoothly, your accounts need to have the
`card_payments` and `transfers` Capabilities required and activated.
`card_payments` will enable the providers to accept payments by card and
`transfers` will allow the platform account to move money to connected
accounts. Requesting `card_payments` will enforce also requesting
`transfers` Capability. Requesting Capabilities can be done during
Stripe Account
[create](https://www.sharetribe.com/api-reference/marketplace.html#create-stripe-account)
and
[update](https://www.sharetribe.com/api-reference/marketplace.html#update-stripe-account)
calls.

Activating the Capabilities happens by providing identity verification
information to Stripe. The recommended way to achieve this is by using
[Stripe Connect Onboarding](https://stripe.com/en-fi/connect/onboarding).
The Stripe Connect Onboarding will automatically ensure that all
required information is collected from providers.

However, if you wish to control the onboarding flow fully, you can
utilize [account tokens](https://stripe.com/docs/connect/account-tokens)
during the create and update calls. What information is required for
Capability activation is dependent on the provider's account and
activity. The specific information can be determined programmatically
from `stripeAccountData` in
[Stripe Account](https://www.sharetribe.com/api-reference/marketplace.html#stripe-account)
resource. The `stripeAccountData` attribute contains the related
[Stripe Account Object](https://stripe.com/docs/api/accounts/object), as
returned by Stripe's API, where the fields `payouts_enabled` and
`requirements` can provide you with valuable information.

Depending on when you have subscribed to Flex, you may need to take
action and implement changes to your marketplace's provider onboarding
flow.

### Instructions for Flex subscriptions started before December 20th 2019

If you have subscribed to Flex before December 20th 2019 you need to
react to the changes.

**Migration on January 8th 2020**

We will perform a migration on January 8th 2020 requiring
`card_payments`, `transfers` and `legacy_payments` Capabilities for all
of your provider accounts and update your marketplace's Stripe API
version to `2019-12-03`. `card_payments` and `transfers` Capabilities
are required for payments to work after the above deadline.
`legacy_payments` is a Capability allowing your current implementation
to work until the deadline.

**Your actions**

In order for you to make sure that your marketplace is ready for the
above deadline, you need to perform the following actions:

- If you wish to use Stripe Connect Onboarding, enable it in your
  [Stripe Dashboard](https://dashboard.stripe.com/account/applications/settings)
- Make sure that your marketplace application is ready for the changes
  by following our
  [how to guide for provider onboarding](/guides/provider-onboarding-and-identity-verification)
- Inform your providers that they need to provide additional information
  to Stripe. See below for instructions on how to do this.

**Informing providers**

After the migration, the information about soon to be restricted
provider accounts can be found from Stripe. By navigating to your
[Stripe Dashboard](https://dashboard.stripe.com/connect/accounts/overview)
Connect Accounts, you can list your providers that are restricted
currently and that will be restricted soon. By using the same view, you
can also export contact infromation about the providers and utilize that
to send appropriate information to them.

**Not reacting to the changes**

If you don't react to the changes, your marketplace will continue
functioning as is until the deadline. After that, the payments will
start failing for providers in your marketplace whose `card_payments`
and `transfers` Capabilities haven't been activated by providing enough
identity verification information to Stripe.

---

You can already start implementing and testing the provider onboarding
and updating processes in your marketplace application. Before deploying
these changes to production, we recommend that you wait for the
migration on January 8th. The migration will make implementing things
simpler regarding your existing provider accounts.

### Instructions for Flex subscriptions started after December 20th 2019

Your marketplace by default supports and is ready for the changes to the
Capabilities framework. In practice:

- The `card_payments` and `transfers` are required for your users
- The newest Flex Template for Web is using Stripe Connect Onboarding

You can continue using Flex API and developing your marketplace as is,
and you don't need to react specifically to the changes.
