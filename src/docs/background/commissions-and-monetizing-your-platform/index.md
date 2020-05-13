---
title: Commissions and monetizing your platform
slug: commissions-and-monetizing-your-platform
updated: 2019-10-23
category: background
ingress:
  Flex provides configurable options for monetizing your platform. You
  can collect commissions from providers, customers, or both. This
  article will provide you with basic information on the mechanisms
  supported by Flex for monetizing your platform.
published: true
---

## Introduction

If you have already defined a pricing model for your marketplace, this
article will provide you with basic information on the options Flex
provides and how to take them into use.

If you need more information on how to decide the pricing, our
Marketplace Academy has
[an article](https://www.sharetribe.com/academy/how-to-set-pricing-in-your-marketplace/)
describing different pricing models and the tradeoffs behind different
options.

As a background, familiarizing with the
[transaction process](/background/transaction-process/),
[transaction process actions](/references/transaction-process-actions/),
and
[the tutorial for editing the process with flex-cli ](/flex-cli/edit-transaction-process-with-flex-cli/)
give you a good understanding of the concepts discussed in this article.
In addition, the article describing
[how to solve payout problems](/background/solving-payout-problems/)
provides valuable information about how the payment flow in Flex works.

## Percentage-based commissions

Sharetribe Flex offers two actions for setting percentage-based
commissions. These actions are called `calculate-tx-provider-commission`
and `calculate-tx-customer-commission`. These actions will calculate a
commission for your marketplace and charge them subsequently from either
provider or customer.

The percentage-based commission actions calculate the commissions from
the total price of the transaction and therefore these actions should be
last in the chain of actions calculating the price. The customer
commission is counted as an additional cost for the customer, i.e. it is
added to the payin. Consequently, the provider commission is deducted
from the set price, i.e. it reduces the payout.

You can use both actions at the same time. This means that you can
charge a part of the marketplace fees from the customer and a part from
the provider.

### Example

A marketplace willing to charge 10 % from the customer and 12 % from the
provider, would configure the actions like this:

```
:actions
[{:name :action/calculate-tx-nightly-total-price}
 {:name :action/calculate-tx-customer-commission :config {:commission 0.10M}}
 {:name :action/calculate-tx-provider-commission :config {:commission 0.12M}}]
```

For a 100 EUR listing, this would result 110 EUR payin for the customer
and a 88 EUR payout for the provider. The marketplace would receive 22
EUR minus Stripe fees.

## Limiting commissions

In addition to setting a percentage based commission, you can limit the
minimum and maximum amount for the commissions. For both of the customer
and provider actions, you can set a minimum and a maximum commission fee
with config options `min` and `max`.

### Example

```
:actions
[{:name :action/calculate-tx-nightly-total-price}
 {:name :action/calculate-tx-customer-commission :config {:commission 0.10M
                                                          :min {:amount 2M :currency "EUR"}
                                                          :max {:amount 8M :currency "EUR"}}
 {:name :action/calculate-tx-provider-commission :config {:commission 0.02M
                                                          :min {:amount 5M :currency "EUR"}
                                                          :max {:amount 10M :currency "EUR"}}}]
```

For a 100 EUR listing, this would result 108 EUR payin for the customer
and a 98 EUR payout for the provider. The marketplace would receive 10
EUR minus Stripe fees.

Since the `min` and `max` configuration options introduce the dependency
to money, they also bring certain preconditions. All the currencies of
the transaction need to match and you need to make sure that the
transaction total price will be above the minimum amount for provider
commissions since the payout can't be negative.

## Fixed commissions

Besides the percentage-based actions, Flex provides two actions for
setting a fixed commission. You can use
`calculate-tx-provider-fixed-commission` and
`calculate-tx-customer-fixed-commission` to set a fixed commission for
both, customer and provider.

### Example

```
:actions
[{:name :action/calculate-tx-nightly-total-price}
 {:name :action/calculate-tx-customer-commission :config {:commission {:amount 10.5M :currency "EUR"}}
 {:name :action/calculate-tx-provider-commission :config {:commission {:amount 15M :currency "EUR"}}]
```

For a 100 EUR listing, this would result 110.5 EUR payin for the
customer and a 85 EUR payout for the provider. The marketplace would
receive 25.5 EUR minus Stripe fees.

The currency and negative payout preconditions apply here as well. All
the currencies of the transaction need to match and you need to make
sure that the transaction total price will be above the minimum amount
for provider commissions since the payout can't be negative.

## Subscription-based model

The commission actions are the most straightforward way of monetizing
your marketplace and directly supported by Flex. However, you might want
to experience with other models depending on your business idea. For
example, subscriptions might be a good way of monetizing your
marketplace. With some tools provided by Flex combined with some manual
actions you can implement a subscription-based model.

One way to implement subscription-based marketplace would involve the
following:

1. Turn on listing approval. Our support can turn on listing approval
   after which all listing need to be approved by admins before they can
   be posted.
2. Require all providers to subscribe through
   [Chargebee](https://www.chargebee.com/),
   [Stripe billing](https://stripe.com/en-fi/billing) or similar
   service. This requires currently manual follow-ups and listing
   approvals after subscription.
