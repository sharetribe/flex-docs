---
title:
  Tutorial step 7 – Configure commission and minimum transaction size
slug: tutorial-commission-tx-size
updated: 2023-09-15
category: the-new-sharetribe-tutorial
ingress:
  In this step we'll look into how you can automatically collect a
  commission from each online payment happening in your marketplace.
published: true
noindex: true
---

Your customers and providers can process payments through your
marketplace. The New Sharetribe has a built-in integration with Stripe
for handling these payments. You can automatically collect a commission
from each payment, and the remaining part will be sent automatically to
the provider.

When you're operating your marketplace in a Test mode, you can use
Sharetribe's preconfigured Stripe credentials, which means you can test
how payments work without setting up your own Stripe platform account.
Because of that, we're going to skip Stripe setup in this tutorial.
However, you do need to set up one before going live.
[Learn more about how to set up a Stripe account and connect it to your marketplace](../how-to-stripe)

In this tutorial step, we'll go through the process of determining your
commission and minimum transaction size. Let's start by navigating to
"Transactions → Commission".

In the test environment Stripe is already enabled, so you don’t have to
configure your own Stripe account. You will still need to interact with
Stripe when creating a listing and initiating a transaction, but you
don’t need to configure your own Stripe account yet.

[Read more about setting up Stripe here](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-stripe/).

## Commission

First off, navigate to the "Transactions → Commission" in Console.

Currently you can only collect the commission from the provider. An
upcoming feature will allow you to charge a commission also from the
customer.

Once you set a commission percentage, this will automatically be charged
from every transaction. We believe 20% is a fair fee for Biketribe.

**Write "20" in "Provider commission (%)"**

Save changes.

## Minimum transaction size

Navigate to "Transactions → Minimum transaction size".

Stripe also collects a fee from each transaction, and it collects it
from the platform operator – in this case, you! This means that you
should not allow transactions where you lose money. A good rule of thumb
is that you should earn at least 50 cents from each transaction.

You can control the minimum transaction size by setting a minimum
listing price. We recommend setting a default so that your commission
from a minimum transaction is at least one dollar. In our case, that
would be five dollars. The minimum listing price is provided in cents.

In the field “Minimum listing price in cents” we’ll add 500 and save
changes. You can
[learn more about the minimum listing price here](https://www.sharetribe.com/docs/the-new-sharetribe/what-is-the-minimum-transaction-size).

**Write 500 in "Minimum listing price in cents"**

Save changes.

## Next: vocabulary

Now our marketplace is working the way we're expecting! However, there
are few more adjustments we should make before testing things. The next
one is about deciding on the words we use.
[Go to Step 8: Decide your vocabulary](/the-new-sharetribe/tutorial-microcopy/).
