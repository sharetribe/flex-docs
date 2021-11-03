---
title: Payments in Flex
slug: payments-overview
updated: 2021-11-03
category: background
ingress:
  This article introduces how payments work in Flex in general
  and describes the default Stripe payment gateway integration
published: false
---

Flex is a full-fledged marketplace solution, complete with payment capabilities. In this article, you will learn about the Flex default payment integration, implemented with Stripe, as well as the alternatives in case you decide to not use Stripe on your marketplace.

## Marketplace payment flow

In a nutshell, a basic payment flow in a marketplace contains five significant steps:

*//TODO: In the original context, this has a graph => should it have a graph here as well?*

### Step 1: Provider onboarding
In this step, the provider connects their Flex account with the payment gateway. This is where they provide the bank details that eventually receive the money from the customers. In addition, in this step, they provide the necessary information and documents for the identity verification and Know Your Customer (KYC) requirements. These requirements vary depending on the user’s country of residence.

### Step 2: Customer checkout
Customer checkout happens when the customer initiates a transaction. At this stage, they also provide the payment information, such as their credit card number. Also, the payment will be made at this point. The payment gateway will preauthorize the money, i.e. reserve the money on the customer's credit card.

### Step 3: Provider acceptance
After the customer has checked out, the provider has the ability to either accept or reject the request. If the request is accepted, the payment will be captured, and the reserved money will be transferred from the customer's credit card to the payment gateway.

This is a step that you can combine with the customer checkout. The flow where the “provider accept” happens instantly after customer checkout is called "instant booking"[link to lower in the article] flow.

### Step 4: Customer refund
Typically, the marketplace payment flow contains a delayed payment period. This is the time between when the money is captured from the customer's credit card and when it is transferred to the provider's bank account. The payout in marketplaces usually happens after the provider has successfully provided the agreed service.

Customer refund usually happens during this delayed payment period. There are many reasons why a refund may be necessary. For example, the provider or customer may not be able to make it, or the provided service was not what was agreed.

### Step 5: Provider payout
If everything in the transaction went right and the customer received the agreed service, the money from the payment gateway will be eventually paid out to the provider.



## Stripe default integration

In the default Flex implementation, the process described above is implemented using Stripe. The integration uses (Stripe Custom Connect accounts)[https://stripe.com/docs/connect/custom-accounts] as the provider’s payout account. The customer can checkout using a payment card, and they can also save their payment method for future use.  The integration uses [Stripe destination charges](https://stripe.com/docs/connect/destination-charges) to collect the payment to the platform’s account first. Once the transaction is successfully over, the provider’s share of the payment is paid through the provider’s Custom Connect account to the bank account they provided upon onboarding.

### Default payment process with Stripe

*// TODO: Create a graph and show the full graph here*

#### 1. Provider onboarding

*// TODO: Show snippets of graph?*

In the Flex default integration, users need to have a Stripe account with a bank account set up before others can initiate transactions with them successfully. This is done by [creating a Stripe account](https://www.sharetribe.com/api-reference/marketplace.html#create-stripe-account) for the authenticated user. The [FTW templates](http://localhost:8000/cookbook-payments/provider-onboarding-and-identity-verification/) are configured to do this step out-of-the-box using [Stripe Connect Onboarding](https://stripe.com/en-fi/connect/onboarding). 

To create the account, Stripe requires verification information from the provider, and the specific types of verification information depends on the provider's country. You can check the verification requirements for your most likely marketplace provider demographics in [Stripe's own documentation](https://stripe.com/docs/connect/required-verification-information).

#### 2. Customer checkout

#### 3. Provider acceptance

#### 4. Customer refund

#### 5. Provider payout

### Modifications to the default process

### Payment methods

## FTW and Stripe

## Frequently asked questions

### Problems with Stripe
Stripe errors
Configs in order
Payout problems

### Can I use Flex and not use Stripe?

Reasons: no need for payments, or not a Stripe country etc.
You can remove Stripe
It is possible to create separate payment integrations as well
