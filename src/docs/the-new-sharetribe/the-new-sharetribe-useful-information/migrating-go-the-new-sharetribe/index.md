---
title: Migrating from Sharetribe Go to The New Sharetribe
slug: migrating-go-the-new-sharetribe
updated: 2023-06-30 
category: the-new-sharetribe-useful-information
ingress:
  Migrate your Go marketplace data with Sharetribe’s help to continue growing your marketplace on The New Sharetribe
published: true
noindex: true
---

The Sharetribe team can migrate your marketplace data from Sharetribe Go to The New Sharetribe so that you can continue to grow your marketplace and take advantage of the new capabilities offered by The New Sharetribe. This document describes how a migration works, what data is migrated, and the steps to completing a successful migration.

## What does it mean to migrate from Go to The New Sharetribe?

Migrating from Go to The New Sharetribe describes moving your marketplace from running on Sharetribe Go to running on The New Sharetribe. After completing a migration, your users visit your marketplace at the same URL as before, with the same accounts, and view the same data, but now will be doing so on software supported by The New Sharetribe instead of Sharetribe Go. 

The migration has several steps detailed below. Overall, you will work with the Sharetribe team to run a test migration during your building period on The New Sharetribe. This practice run helps make sure we are on the same page and allows you to configure your New Sharetribe marketplace using test data relevant to your use case. After you are done building and are ready to migrate your marketplace to The New Sharetribe, then we run a Live migration together. Our team transfers your data so that your users can start using your New Sharetribe powered marketplace. We also inactivate your Go marketplace to ensure all your marketplace action happens on your New Sharetribe marketplace from then on. 

## What data is migrated? 

### Listings:

- Title
- Description
- Price (as an number amount)
- Location
- Images
- Listing fields 
- Category or subcategory 
- Custom fields created in Go  
- Shipping data for marketplaces offering shipping 
- Shipping price 
- Shipping options: Pickup and/or Delivery 

_Listing comments are not migrated. Listing order types and listing availability are transformed during the migration to suit how The New Sharetribe works. The transformation is described below._

### User profiles:

- First name
- Last name
- Display name
- Primary email address
- Password hashes (so user can use same credentials to login)
- Profile image
- Phone number 
- Stripe accounts used for payouts to sellers 

_Migrated profiles do not include username, custom user field data,
followers, email preferences or social login credentials. Also note that
since The New Sharetribe does not support PayPal out of the box, no PayPal information
is migrated._

_If your users used Facebook, Google or LinkedIn to sign up in your Go
marketplace, they will still be able to log in to their existing
accounts with these in your New Sharetribe marketplace, if their Facebook,
Google or LinkedIn email address matches the email address in your
marketplace. The first time they log in to their existing account in
your new marketplace with a social login, the login provider will ask
them for the same permissions it asked when they originally signed up._

### Reviews:

- Grade (thumbs up/down) converted to 5 point scale (stars)
- Text

### Transactions:

_Past transactions and messages are not migrated._

### Static page content

_Content and styles of the different static pages in Go are not
migrated. You should rebuild any content you created in Go using [Pages](https://www.sharetribe.com/docs/the-new-sharetribe/introducing-pages/)._ 

## When should I request a migration? 

You should request a migration when:

- You have a marketplace operating on Sharetribe Go with real user data
- You know you want to transfer your Go users and listings to The New Sharetribe. If you’d prefer to re-start your marketplace with a blank slate, then a migration is not needed.
- You have a free The New Sharetribe account 
I’m ready to migrate. What are the steps to complete a migration?
Request a migration to your Test environment from your Go marketplace
Build your New Sharetribe marketplace with your test migration data 
Take your New Sharetribe marketplace Live with your Go marketplace data
Sharetribe inactivates your Go marketplace

### 1. Request a migration to your Test environment from your Go marketplace

When you know you want to move your marketplace from Go to The New Sharetribe, contact us to request a test migration. We will copy your Go data and transfer it to your Test environment. Use the template message provided in this document to get started. 

The goal of doing a test migration is for you to be able to see what data we are migrating, to be able to make adjustments in your marketplace to suit your Go data, and to provide us with feedback on modifications we should make so that your Go data suits your New Sharetribe setup. 

Since The New Sharetribe and Go have different features, choices need to be made about how certain data should be modified during the migration process. 

For all marketplaces: 
- Go marketplaces that have multiple [order types](https://help.sharetribe.com/en/articles/1426872-get-started-with-order-types) must choose which one order type is migrated to The New Sharetribe. The New Sharetribe does not currently support multiple order types (called [listing types](https://www.sharetribe.com/docs/the-new-sharetribe/what-are-listing-types/) in The New Sharetribe) without using coding to build this feature. 
- Go marketplaces that use categories and subcategories must choose whether the category or subcategory is migrated to The New Sharetribe. The New Sharetribe does not currently support listings belonging to a category and subcategory without using coding to build this feature.
  - The default is that the subcategory is migrated to The New Sharetribe as the category. 

For marketplaces selling products: 
- What amount of stock should migrated listings take? Since The New Sharetribe has support for stock management, you need to decide how much stock existing listings from Go should have. 
  - Default is a stock of 1. Exactly one purchase of a listing can be made when stock is 1.

For marketplaces using the availability calendar: 
- When should migrated listings be available? Listings in The New Sharetribe can be booked either nightly, daily, or hourly. You need to decide when migrated listings are available after the migration, as the existing availability data from Go is not migrated. 
  - Default is that migrated listings have availability for all times and days in their calendar. Buyers can make bookings for any time and/or day. 
- What timezone should be used in your listings? Since The New Sharetribe has support for timezones, you need to decide what timezone existing listings should take. 
  - Default is UTC
- How many seats are available for a given available period in a listing? Since The New Sharetribe has support to open multiple seats or spots in an available time slot, you need to decide how many seats existing listings from Go should have. 
  - Default will be a seat of 1. Exactly one booking can be made against the timeslot when the seat is 1, just like how it works in Go. 

Note that the choices are universal currently, so it is not possible to configure one listing to take one value while a different listing takes another. For instance, if you decide that availability should be in timezone GMT, every listing will be migrated to use GMT timezone. Listing authors and admins can edit particular listings to take particular values after the migration is complete. 

### 2. Build your marketplace in Test environment
After the test migration is completed, you need to review the data transformation and use Console to create listing fields that match what you have in Go. 

Reviewing your data transformation is about understanding how your Go data changed to match the capabilities in The New Sharetribe. Though the feature set between Go and The New Sharetribe is similar, they are not entirely the same. We outlined the list of modifications that happen to your marketplaces in the previous section. Now is the time to review those modifications and ensure they are what you need. You can contact our team to request a re-run of the migration if you would like to change how your Go data is transformed during the migration. 

One thing you will need to do make sure your [listing field IDs in Console](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-add-and-edit-listing-fields/#mandatory-settings) match the listing field IDs of the migrated listings. We will tell you what those listing field IDs should be in Console during the test migration to make sure everything works smoothly. 

### 3. Take your marketplace Live 

When you are ready to switch running your marketplace on The New Sharetribe and inactivate your Go powered marketplace, then Sharetribe will facilitate migrating your real user data to your new Live environment.

To start the live migration, please subscribe from Console. Press your environment dropdown menu in the top left and select “Go Live”. Select your preferred plan, billing period, and mark “Yes” under “Do you have an existing Sharetribe Go subscription?”

From here, please [follow our going Live instructions](https://www.sharetribe.com/docs/the-new-sharetribe/going-live/#2-share-information-for-setup-with-sharetribe). Your next step is [submitting information](https://sharetribe.typeform.com/to/yKLsJryj) to Sharetribe necessary to setup your Live environment. Note that if you plan to use the same custom domain for your New Sharetribe marketplace that you used for your Go marketplace, then Sharetribe will prepare and send you unique DNS records to use during the migration. These unique records ensure there is as little downtime during the migration as possible. 

You can use the records recommended [here](https://www.sharetribe.com/docs/the-new-sharetribe/going-live/#3-configure-your-custom-domain) if you plan to use a different custom domain from your current Go custom domain. 

### 4. Sharetribe inactivates your Go marketplace

In addition to migrating your Go marketplace data to your Live
environment, our team will work with you to make sure any ongoing
transactions are completed successfully.

After you point your DNS settings to your New Sharetribe marketplace, we will make
the Go marketplace available at marketplace-name.sharetribe.com. You can
communicate to your users that, if they have ongoing transactions, they can follow how they are progressing and finish them there.

We will prepare the legacy Go marketplace so that it doesn't allow new
transactions. Your Go marketplace’s new URL will be marketplace-name.sharetribe.com. Existing users cannot post new listings, comments, or start new transactions there, though they can review any ongoing transactions. No new accounts can be created on your Go marketplace.

Legacy Go marketplaces are hosted by Sharetribe for 6 months and then shut down. 
## Start your test migration

Ready to migrate your marketplace to The New Sharetribe? You can use the email template below to request a test migration and tell us how you would like your Go data to be transformed. Replace **bold** variables in the template email below that apply to your marketplace. If you’re not sure about the right choice for you, simply get in touch with your marketplace information and we will guide you through it. 


To: hello@sharetribe.com
Subject: Requesting a test migration 

Hi Sharetribe team, 

I would like to migrate my Go marketplace data to my Test environment in The New Sharetribe. 

My marketplace information is:

Here is my Go marketplace URL: **mymarketplace.com**
My New Sharetribe organization is: **organization-name**

My choices for the migration are: 

Category: My Go marketplace uses subcategories. Please use the **subcategories or categories** in the migration. 

Listing type: My Go marketplace uses multiple order types. Please use the **order type** in the migration


Availability: My marketplace uses availability calendars. Please:
Please set the **following availability** for listings with an availability calendar. _Daily or nightly calendars define availability in terms of days, so an example instruction would be “listings have availability every weekday.” Hourly availability calendars use hours and days. “Listings have availability every weekday between 09:00 and 18:00” would be a valid request._
Please use **timezone** as the default timezone
Please use **number** as the default number of seats 

Product purchases: My marketplace includes product sales. Please: 
Please use **number** as the default available stock. 

Cheers!



