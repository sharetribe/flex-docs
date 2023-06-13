---
title: How to setup Stripe for payments on your marketplace
slug: how-to-stripe
updated: 2023-06-01
category: the-new-sharetribe-useful-information
ingress:
  Learn how to setup Stripe to power payments and commissions in your
  marketplace
published: true
noindex: true
---

Stripe is a payment processor. Your marketplace uses Stripe’s Connect
platform to power payments on your marketplace, including processing
buyer payment cards, charging your commission, paying out earnings
directly to seller bank accounts, seller onboarding, KYC, and more.

To get it working, you'll need a free Stripe account, configure a few
settings in your Stripe Dashboard, get your API keys from Stripe, and
add them to [Console when you go Live.](GOINGLIVEARTICLE)

Follow the instructions closely and it will work smoothly!

# 1. Create and confirm your free Stripe account

Creating a Stripe account is free and you can delete it anytime. If you
already have a Stripe account (for another project), it's better to
create a new one to avoid any interference.

Note that right now, once you have configured your Stripe account in
your Sharetribe marketplace, you won't be able to change it to another
one. You can always update all details (bank account, account name...)
in your Stripe dashboard but using another new account later isn't
possible for the time being.

- Go to https://dashboard.stripe.com/register
- Fill in the required fields, then create your Stripe account
- You can skip the first question by clicking "Skip for now" if you do
  not know
- Go to your email to confirm your account. Check your email inbox and
  look for a confirmation email sent from Stripe (by support@stripe.com)
  named “Confirm your Stripe email address!”
- Click the confirmation link in this email and log in with your
  credentials.

Your Stripe account is now confirmed! Let’s proceed.

# 2. Activate your Stripe account

As you will receive money from your users via your Stripe account, you
have to provide some details such as your address and your bank account.
This data is secured by Stripe and won't be shared with anyone. This
process is called “Activating” your account.

- Log in to your Stripe account and click the Activate your account link
  in the top menu. ![stripe-1](./stripe-1.png)
- Complete all the fields according to the instructions and set _Your
  website_ to your marketplace custom domain when asked.
  - It's OK to activate your account as an individual, you don't need a
    company ID. For example, in the US, it's okay to use your personal
    name and SSN in place of an EIN. You can read more about signing up
    without a tax ID or employer ID number from Stripe
    [here.](https://support.stripe.com/questions/signing-up-for-a-us-stripe-account-without-a-tax-id-or-employer-id-number)
  - The activation form varies based on your country, so select that
    first!
- Once completed, click "Activate account".

Your Stripe account may still need to be reviewed by Stripe. It's
automatic, and it should be a very quick process. You may need to
provide additional information in order to verify your identity if a red
banner appears on your Stripe dashboard. ![stripe-2](./stripe-2.png)
Once the review is completed, your dashboard will say "Your account is
now active". ![stripe-3](./stripe-3.png)

Good job! Now you need to enable Connect in your platform so your
sellers can add their bank details in their settings.

# 3. Enable Stripe Connect and Stripe Connect Onboarding on your platform

Sharetribe uses the Stripe Connect features with Custom Accounts. These
enable your sellers to process payments through your marketplace and let
you earn a commission on these sales. These next steps describe how to
enable Stripe Connect.

**This step is important. Without it, providers will not be able to
receive money and buyers will not be able to start any transaction.**

- Click Connect in the top bar. Then "Get started".
  ![stripe-4](./stripe-4.png)
- Answer "Platform or marketplace" when prompted about the type of
  integration you would like to build. Your integration is already
  included with your Sharetribe marketplace, but Stripe still needs this
  information to learn more about your business - At this point, Stripe
  may have to review your account. If that's the case, you may consult
  our
  [guide on how to complete the Connect Review](https://www.sharetribe.com/docs/how-to/stripe-connect-platform-review/)
  process for help. ![stripe-5](./stripe-5.png)

After a few seconds, or after the review process, you should see your
Connect dashboard. Let’s finalize the Connect setup now.

- From the top bar, go to Settings (the gear icon) then Settings under
  the Connect heading. ![stripe-6](./stripe-6.png)
- Make sure that Custom is enabled in the Account types section then
  click on "Manage" for Custom. There should be a blue tick next to
  "Custom", as shown in the screenshot below

![stripe-7](./stripe-7.png)

- Turn on "Allow Stripe to collect bank account information of
  authenticated users" with the toggle, then save
  ![stripe-8](./stripe-8.png)
- Back on the https://dashboard.stripe.com/settings/connect page, scroll
  down to the "Branding" section. There, add your marketplace and
  business name, its logo and icon, and its colors. Then save. This
  information will brand the form sellers use to add their payout
  details and complete KYC on your marketplace.
  ![stripe-9](./stripe-9.png)

Great, Stripe is configured! Last step is to get your API keys and input
them into Console.

# 4. Get your API keys from Stripe and add them to your Console

API keys are some text strings that link your Sharetribe marketplace
with your Stripe account, so you can manage payments in your
marketplace.

First, get your API keys from Stripe.

- Click "Developers" → "API Keys" in the top bar menu.

![stripe-10](./stripe-10.png)

- Make sure that you are **not using test data.** If this is the case,
  switch the View test data toggle. Test API keys will not work in your
  Sharetribe marketplace. ![stripe-11](./stripe-11.png)

- Copy the value from the Publishable key row, from the Token column. It
  should look like pk_live_somelongrandomvaluelikeVqFze9etc
  ![stripe-12](./stripe-12.png)
- Share this value with Sharetribe during the
  [going Live process.](LINKTOGOINGLIVE)

- Go back to your Stripe account, in the API tab and click the Reveal
  live key token button.

![stripe-13](./stripe-13.png)

- A new window will pop up with the Secret key.
- Copy the value of the Secret key. It should look like
  sk_live_somelongrandomvaluelike0Rx3jvetc - Note that ou won't be able
  to see the key again after this. Make sure you copy it and save it
  somewhere safe and private. ![stripe-14](./stripe-14.png)
- Paste that value in your Console->Build->Payments
  ![stripe-15](./stripe-15.png)

That's it! You have now connected your Stripe account and are ready to
receive payments in your marketplace!
