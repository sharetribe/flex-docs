---
title: Payments in Flex
slug: payments-overview
updated: 2021-11-03
category: background
ingress:
  This article introduces how payments work in Flex in general, and
  describes the default Stripe payment gateway integration
published: false
---

Flex is a full-fledged marketplace solution, complete with payment
capabilities. In this article, you will learn about the Flex default
payment integration, implemented with Stripe, as well as the
alternatives in case you decide to not use Stripe on your marketplace.

## Marketplace payment flow

In a nutshell, a basic payment flow in a marketplace contains five
significant steps:

_//TODO: In the original context, this has a graph => should it have a
graph here as well?_

### Step 1: Provider onboarding

In this step, the provider connects their Flex account with the payment
gateway. This is where they provide the bank details that eventually
receive money from the customers. In addition, in this step, they
provide the necessary information and documents for the identity
verification and Know Your Customer [(KYC)](https://en.wikipedia.org/wiki/Know_your_customer) requirements. [These
requirements vary](https://stripe.com/docs/connect/required-verification-information) depending on the user’s country of residence.

### Step 2: Customer checkout

Customer checkout happens when the customer initiates a transaction. At
this stage, they also provide the payment information, such as their
credit card number. Also, the payment will be made at this point. The
payment gateway will preauthorize the money, i.e. reserve the money on
the customer's credit card.

### Step 3: Provider acceptance

After the customer has checked out, the provider has the ability to
either accept or reject the request. If the request is accepted, the
payment will be captured, and the reserved money will be transferred
from the customer's credit card to the payment gateway.

This is a step that you can combine with the customer checkout. The flow
where the “provider accept” happens instantly after customer checkout is
called "instant booking"[link to lower in the article] flow.

### Step 4: Customer refund

Typically, the marketplace payment flow contains a delayed payment
period. This is the time between when the money is captured from the
customer's credit card and when it is transferred to the provider's bank
account. The payout in marketplaces usually happens after the provider
has successfully provided the agreed service.

Customer refund usually happens during this delayed payment period.
There are many reasons why a refund may be necessary. For example, the
provider or customer may not be able to make it, or the provided service
was not what was agreed.

### Step 5: Provider payout

If everything in the transaction went right and the customer received
the agreed service, the money from the payment gateway will be
eventually paid out to the provider.

## Stripe default integration

In the default Flex implementation, the process described above is
implemented using Stripe. The integration uses (Stripe Custom Connect
accounts)[https://stripe.com/docs/connect/custom-accounts] as the
provider’s payout account. The customer can checkout using a payment
card, and they can also save their payment method for future use. The
integration uses
[Stripe destination charges](https://stripe.com/docs/connect/destination-charges)
to collect the payment to the platform’s account first. Once the
transaction is successfully over, the provider’s share of the payment is
paid through the provider’s Custom Connect account to the bank account
they provided upon onboarding.

### Default payment process with Stripe

![Default payment flow in Flex](./automatic_confirmation_flow.png)

#### 1. Provider onboarding

In the Flex default integration, users need to have a Stripe account
with a bank account set up before others can initiate transactions with
them successfully. This is done by
[creating a Stripe account](https://www.sharetribe.com/api-reference/marketplace.html#create-stripe-account)
for the authenticated user. The
[FTW templates](http://localhost:8000/cookbook-payments/provider-onboarding-and-identity-verification/)
are configured to do this step out-of-the-box using
[Stripe Connect Onboarding](https://stripe.com/en-fi/connect/onboarding).

To create the account, Stripe requires verification information from the
provider, and the specific types of verification information depends on
the provider's country. You can check the verification requirements for
your most likely marketplace provider demographics in
[Stripe's own documentation](https://stripe.com/docs/connect/required-verification-information).

#### 2. Customer checkout

When the customer initiates a transaction in the Flex default
transaction processes, Flex creates a
[PaymentIntent](/background/payment-intents/) for the total price of the
transaction. Once the PaymentIntent is confirmed, Stripe preauthorizes
the sum from the customer's payment method. In other words, the sum does
not leave the customer's account, but it is still reserved and not
available to be used by the customer. The preauthorization is valid for
7 days, after which the preauthorization is automatically released by
Stripe, and the funds are again available to the customer. In the FTW
templates, creating and confirming the PaymentIntent are triggered at
the same customer action for the default process.

#### 3. Provider acceptance

When a customer has requested to book a listing, a provider has 6 days
to accept the booking until it expires automatically. This timeline
ensures that the Stripe preauthorization does not expire before the
provider has the opportunity to accept or reject the booking. Once the
provider accepts the booking, the PaymentIntent is captured and the
transaction sum is transferred from the customer's account to the
platform account.

In the
[FTW Product (Sneakertime)](https://github.com/sharetribe/ftw-product)
template, the default process combines customer checkout and provider
acceptance to all be triggered at the same customer action.

#### 4. Customer refund

If the customer requests a refund for one reason or another, the
operator can refund the PaymentIntent. The Flex integration with Stripe
only supports full refunds. The default integration takes into account
whether or not the PaymentIntent has already been captured from the
customer's account.

#### 5. Provider payout

Once the booking has completed successfully, the provider's payout is
paid to the bank account that is linked to their Custom Connect account.
Depending on how the
[transaction's line items](/background/pricing/#line-items) have been
defined, the platform can take a commission of the price from either the
provider, the customer, or both. The platform is also responsible for
paying all [Stripe fees](https://stripe.com/en-fi/connect/pricing)
related to the Custom Connect account usage, so the commissions must be
defined to cover those expenses as well.

It is important to note that the platform can
[hold funds on their Stripe account](https://stripe.com/docs/connect/account-balances#holding-funds)
for up to 90 days - for exceptions see the linked Stripe documentation.
In other words, the payout must be triggered no more than 90 days after
the PaymentIntent is created. This means that for booking times
exceeding 90 days, the process needs to be modified.

### Modifications to the default process

One of the strengths of Flex is that you have complete control over the
transaction process. In terms of payments, you can make parallel paths
depending on your payment strategy, and you can fine-tune the timeline
of different actions to suit your marketplace.

You can edit the transaction processes on your marketplace with
[Flex CLI](/flex-cli/edit-transaction-process-with-flex-cli/). If you
use the FTW templates, you will also need to make some
[changes in the template](cookbook-transaction-process/change-transaction-process-in-ftw/)
to enable it to use a different process. If you do make changes to a
transaction process when you already have transactions in your
environment, it is good to note that a transaction will proceed with the
transaction process it was initiated with, and changing the transaction
process of a single transaction is not possible. You can see the
transaction process related to each transaction in
[Flex Console](https://flex-console.sharetribe.com/) > Manage >
Transactions.

The transaction process also controls the automatic
[email notifications](references/email-templates/) sent at different
stages of the transaction flow. When you make changes to the transaction
process, be sure to also update the wording and logic of the
notifications for a consistent user experience for your marketplace
customers and providers.

#### Instant booking

As mentioned, the
[FTW Product (Sneakertime)](https://github.com/sharetribe/ftw-product)
template combines the customer checkout and provider acceptance steps
into a single customer action. In other words, the purchase is
automatically accepted and paid as soon as the customer clicks to pay
for the listing. The
[flex-example-processes Github repository](https://github.com/sharetribe/flex-example-processes)
contains an example of a booking process called `instant-booking` that
you can use to implement a similar flow for
[FTW Daily (Saunatime)](https://github.com/sharetribe/ftw-daily) and
[FTW Hourly (Yogatime)](https://github.com/sharetribe/ftw-hourly), as
well as any custom client application you may be using.

#### Automatic off-session payments

Another notable approach to modifying the payment timeline in Flex is
the
[off-session payment pattern](/background/off-session-payments-in-transaction-process/).
In an off-session payment, the customer checkout and provider acceptance
happen when the customer books the listing, but the payment takes place
closer to the booking start time. That way, customers can e.g. book
listings or purchase preorder products further in the future than the 90
day Stripe limitation, and they will be charged closer to the moment of
receiving the product or service they purchased.

### Payment methods

- TODO: default is card payments, but you can hook up other payment
  methods as well (link to payment methods) => chat with someone from
  Flex team to understand the payment methods article
- Saving a payment method is possible, and it is also required for the
  off-session payment pattern to work
- Currencies handled in minor units
-

## FTW and Stripe

The default Stripe integration in Flex works from any client
application. However, the FTW templates are further configured to work
hand in hand with Stripe:

- [Provider onboarding](/cookbook-payments/provider-onboarding-and-identity-verification/) is handled with Stripe Connect Onboarding. A provider cannot create listings (i.e. receive money from customers) unless they have verified their identity with Stripe, thereby making sure that the platform is always KYC compliant.
- CheckoutPage.js handles all Stripe actions related to customer checkout, including creating and confirming the payment intent, with a single button click.
- The customer can save their payment method to Flex either when purchasing a listing, or on a separate Payment Methods page.


## Frequently asked questions

### Where can I use Stripe?

- Stripe countries
- Special cases

### I'm having problems with the Stripe integration!

Stripe errors Configs in order Payout problems

### Can I use Flex and not use Stripe?

Reasons: no need for payments, or not a Stripe country etc. You can
remove Stripe It is possible to create separate payment integrations as
well

### Can I partially refund the transaction price?

- The default Flex / Stripe integration only supports fully refunding
  PaymentIntents. If you have a use case where you would need to
  implement partial refunds, it is advisable to look into partially or
  completely handling payments outside the default Stripe integration.
  You can also contact Flex Support and let us know your specific use
  case, and we may be able to recommend some avenues for you to explore!
