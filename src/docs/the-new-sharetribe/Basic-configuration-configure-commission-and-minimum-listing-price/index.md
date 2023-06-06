---
title:
  Tutorial step 7 – Configure commission and minimum transaction size
slug: tutorial-commission-tx-size
updated: 2023-06-01
category: the-new-sharetribe-tutorial
ingress:
  In this step we'll look into how you can automatically collect a
  commission from each online payment happening in your marketplace.
published: true
noindex: true
---

<<<<<<< HEAD
In order for your sellers to be able to receive payments in your
marketplace’s live environment, you need
[to configure your own Stripe account](/the-new-sharetribe/how-to-stripe/).
=======
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
[Learn more about how to set up a Stripe account and connect it to your marketplace](./how-to-stripe)

In this tutorial step, well go through the process of determining your
commission and minimum transaction size. Let's start by navigating to
"Commission".

In order for your sellers to be able to receive payments in your
marketplace’s live environment, you need
[to configure your own Stripe account](https://flex-docs-git-pilot-day-start-sharetribe.vercel.app/tutorial-rental/how-to-stripe/).
>>>>>>> 80f8935d (Lots of edits to the pilot day tutorial)

In the test environment, however, Stripe is already enabled, so you
don’t have to configure your own Stripe account. We will ignore the
steps to set up the marketplace Stripe account in this part of the
tutorial. Instead, we will focus on the other “transaction settings”.
You will still need to interact with Stripe when creating a listing and
initiating a transaction, but you don’t need to configure your own
Stripe account yet.
<<<<<<< HEAD
[Read more about setting up Stripe here](/the-new-sharetribe/how-to-stripe/).
=======
[Read more about setting up Stripe here](https://flex-docs-git-pilot-day-start-sharetribe.vercel.app/tutorial-rental/how-to-stripe/).
>>>>>>> 80f8935d (Lots of edits to the pilot day tutorial)

### Commission

Navigate to Commission.

<<<<<<< HEAD
Set the “Provider commission (%),” to 10%, by typing “10”. Save changes.
You can
[learn more about commissions here](https://www.sharetribe.com/docs/operator-guides/how-to-set-your-marketplace-commission).
=======
Currently you can only collect the commission from the provider. An
upcoming feature will allow you to charge a commission also from the
customer.
>>>>>>> 80f8935d (Lots of edits to the pilot day tutorial)

Once you set a commission percentage, this will automatically be charged
from every transaction. We believe 20% is a fair fee for Saunatime.

<<<<<<< HEAD
Go to **Build → Content → Minimum transaction size**. In the field
“Minimum Listing Price,” we’ll add 1 and save changes. You can
[learn more about the minimum listing price here](https://www.sharetribe.com/docs/operator-guides/what-is-the-minimum-transaction-size).
=======
**Write "20" in "Provider commission"**

Save changes.

## Minimum ransaction size

Navigate to "Minimum transaction size".

Stripe also collects a fee from each transaction, and it collects it
from the platform operator – in this case, you! This means that you
should not allow transactions where you lose money. A good rule of thumb
is that you should earn at least 50 cents from each transction, but 1
dollar is safer.

You can control the minimum transaction size by setting a minimum
listing price. We recommend setting a default so that your commission
from a minimum transaction is at least one dollar. In our case, that
would be five dollars. The minimum listing price is provided in cents.

**Write 500 in "Minimum listing price in cents"**

Save changes.

### Next: vocabulary

Now our marketplace is working the way we're expecting! However, there
are few more adjustments we should make before testing things. The next
one is about deciding on the words we use.
[Go to Step 8: Decide your vocabulary](./tutorial-microcopy).
>>>>>>> 80f8935d (Lots of edits to the pilot day tutorial)
