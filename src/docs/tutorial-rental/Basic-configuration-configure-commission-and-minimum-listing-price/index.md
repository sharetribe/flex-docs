---
title:
  Basic configuration - configure commission and minimum listing price.
slug: configure-commission-and-minimum-listing-price
updated: 2023-06-01
category: the-new-sharetribe
ingress:
  The New Sharetribe uses Stripe as a payment provider to handle online
  transactions. In order for your sellers to be able to receive payments
  in your marketplace’s live environment, you need [to configure your
  own Stripe account](LINK TO STRIPE CONFIGURATION ARTICLE).
published: true
---

In the test environment, however, Stripe is already enabled, so you
don’t have to configure your own Stripe account. We will ignore the
steps to set up the marketplace Stripe account in this part of the
tutorial. Instead, we will focus on the other “transaction settings”.
You will still need to interact with Stripe when creating a listing and
initiating a transaction, but you don’t need to configure your own
Stripe account yet. [Read more about setting up Stripe here](LINK TO
STRIPE CONFIGURATION ARTICLE).

## 1. Set your commission

Once you set a commission, this will automatically be charged from every
transaction. You can set a commission from Build → Content → Commission.

Set the “Provider commission (%),” to 10%, by typing “10”. Save changes.
You can [learn more about commissions here](LINK TO COMMISSION ARTICLE).

## 2. Set a Minimum Transaction size

Go to **Build → Content → Minimum transaction size**. In the field
“Minimum Listing Price,” we’ll add 1 and save changes. You can [learn
more about the minimum listing price here](LINK TO THE MINIMUM LISTING
PRICE ARTICLE).
