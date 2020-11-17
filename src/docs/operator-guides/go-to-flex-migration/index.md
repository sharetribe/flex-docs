---
title: Migrating from Go to Flex
slug: go-to-flex-migration
updated: 2020-11-17
category: operator-guides
ingress:
  Basic information to consider when migrating from Go to Flex
published: true
---

Migrating your marketplace from Sharetribe Go to Sharetribe Flex requires two steps. The first step is building your marketplace with Flex. This usually means working with the code of the Flex Template to build your custom marketplace.

The second step is migrating your Go marketplace data. This article details how the data migration process works.

## Migrations

Migrating your Go marketplace data happens via a test migration during development and a live migration when moving to production. Our team will work with you throughout the test and live migrations to ensure a smooth transition.

### When to request a migration?

You should request a migration when:
- You have a marketplace operating on Sharetribe Go
- You know you want to transfer your Go users and listings to your Flex marketplace. If you’d prefer to re-start your community in Flex, then a migration is not needed.
- You have started developing with Flex

You will work with Sharetribe’s engineers to complete your migration, starting with the test migration. Once you are ready, please email flex-support@sharetribe.com with the subject: “Go to Flex migration”. Please include your Go marketplace URL and your Flex organization (your organization is displayed in your [Console](https://flex-console.sharetribe.com/) in the top right corner)

### What data is migrated?
- Listings:
  - Title, description
  - Location
  - Images
  - Custom fields (as listing [public data](https://www.sharetribe.com/docs/references/extended-data/))
  - Categories (as listing [public data](https://www.sharetribe.com/docs/references/extended-data/))
/* Migrated listings do not include order types or comments. In Flex, the [transaction process](https://www.sharetribe.com/docs/background/transaction-process/) determines how price is calculated. Your development should include adding data to listings that specifies the appropriate pricing actions from your Flex application if you use multiple order types in Go.

- User profiles:
  - Names, display name
  - Primary email address
  - Password hashes (so user can use same credentials to login)
  - Profile images
  - Phone numbers (as user [protected data](https://www.sharetribe.com/docs/references/extended-data/))
  - Stripe accounts
/* Migrated profiles do not include followers, email preferences or social login credentials.

- Reviews:
  - Grade (thumbs up/down) converted to 5 point scale (stars)
  - Text

- Transactions:
/* Transactions and messages are not migrated currently.

- Static page content
/* Content and styles of the different static pages are not automatically migrated. However, you can manually copy content like your terms and privacy policy and insert them in your new Flex site.

### Test Migration

A test migration sets the stage for a successful transition.Having your Go data during Flex
development gives you ample time to understand the data transformation occurring during
the migration. You will further leverage this data to adapt your customization, including
adapting your UI to display your extended data properly and creating the proper filters.
We will confirm completion of your test migration. Note that data during the test migration is
anonymized: emails, names, addresses and locations are removed or anonymized.

### Live migration
A live migration happens when you launch your Flex marketplace.. Please contact us five business days in advance of your planned launch date to ensure all required steps are completed.

You can read about the technical nitty gritty of a migration [here](https://github.com/sharetribe/turnkey2im#supported-data).

## Subscription

Going live requires a Flex subscription. In practice, this means that your current Go subscription will be updated to a Flex subscription before the migration date. You need to decide if you wish to subscribe annually (starting at $299/mo) or monthly plan (starting at $369/mo). More info can be found on the [Flex pricing page](https://www.sharetribe.com/products/flex/#pricing).

## Your Go marketplace

In addition to migrating your Go marketplace data to your production environment, our team will work with you to make sure any ongoing transactions are completed successfully.

After you point your DNS settings to your Flex instance, we will make the Go marketplace available at marketplace-name.sharetribe.com. You can communicate to your customers that if they have ongoing transactions, they can follow how they are progressing and finish them there.

We will prepare the legacy Go marketplace so that it doesn't allow new transactions. This is done with the following changes:

- Marketplace is set to invite only
- Users are disallowed to send invites
- Automatic newsletter is disabled
- Listing edits and new transactions are prevented

Your legacy Go marketplace will continue to exist on our servers.

## Information required from you to perform a live migration
When you know are five business days or more away from your launch date, please email flex-support@sharetribe.com and include the following information:

- Migration date and time (your Go marketplace will be restricted from new activity at this point; your Flex marketplace will be in production and live after this point)
- Subscription model, annual or monthly payments
- The sender email address: e.g., email@example.com
- The sender email name: e.g., The Marketplace Team.
