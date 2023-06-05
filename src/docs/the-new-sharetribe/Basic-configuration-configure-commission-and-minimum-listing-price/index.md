---
title:
  Tutorial step 7 – Configure commission and minimum transaction size
slug: tutorial-commission-tx-size
updated: 2023-06-01
category: the-new-sharetribe-tutorial
ingress:
  The New Sharetribe uses Stripe as a payment provider to handle online
  transactions. In this tutorial, we'll look at how to configure Stripe commission and mimimum listing price.
published: true
noindex: true
---

In order for your sellers to be able to receive payments in your marketplace’s live environment, you need [to configure your own Stripe account](https://flex-docs-git-pilot-day-start-sharetribe.vercel.app/tutorial-rental/how-to-stripe/).
  
In the test environment, however, Stripe is already enabled, so you
don’t have to configure your own Stripe account. We will ignore the
steps to set up the marketplace Stripe account in this part of the
tutorial. Instead, we will focus on the other “transaction settings”.
You will still need to interact with Stripe when creating a listing and
initiating a transaction, but you don’t need to configure your own
Stripe account yet. [Read more about setting up Stripe here](https://flex-docs-git-pilot-day-start-sharetribe.vercel.app/tutorial-rental/how-to-stripe/).

## 1. Set your commission

Once you set a commission, this will automatically be charged from every
transaction. You can set a commission from Build → Content → Commission.

Set the “Provider commission (%),” to 10%, by typing “10”. Save changes.
You can [learn more about commissions here](https://www.sharetribe.com/docs/operator-guides/how-to-set-your-marketplace-commission).

## 2. Set a Minimum Transaction size

Go to **Build → Content → Minimum transaction size**. In the field
“Minimum Listing Price,” we’ll add 1 and save changes. You can [learn
more about the minimum listing price here](https://www.sharetribe.com/docs/operator-guides/what-is-the-minimum-transaction-size).
