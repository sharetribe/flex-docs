---
title: Features
slug: features
updated: 2021-10-04
category: background
ingress:
  This article provides an overview of the most important features of
  Sharetribe Flex.
published: true
---

Flex offers a large set of features that make it very fast for you to
build your marketplace exactly the way you want. In addition, if a
specific feature you need is not listed on this page, you can often
build it yourself. If you don't spot the feature you need,
[contact Sharetribe support](mailto:flex-support@sharetribe.com) to
learn more about how to get it built.

## Users and authentication

You can allow visitors to browse products and services in your platform
without signing up. However, at the point where they want to either make
a purchase, contact another user, or list their own products or services
in your marketplace, they need to create a user account. \
 \
Flex allows an unlimited number of users to create user accounts to your
marketplace. Here are some examples of what you can do with Flex user account
functionality:

- Sign up with email and password or Open ID Connect (Facebook, Google,
  ...)
- Log in with email and password or Open ID Connect (Facebook, Google,
  ...)
- Verify email address after signup
- Change email and password
- Reset password if it's forgotten

You can store following information about each user:

- Basic user information (bio, profile picture)
- **Public data.** Data to display in the public profile of the user –
  website, social media handles, is this user a customer (buyer) or
  provider (seller), and other such information.
- **Private data.** Data displayed only to the user themselves and the
  marketplace operator (like an ID number for verification purposes,
  their preferred language, or a list of listings they have stored on
  their private wishlist)
- **Protected data.** Data that is private by default but displayed to
  other users during a transaction (like their phone number or home
  address)

[Read more about storing data about users](/references/extended-data/).

## Listings

A listing describes a product or a service that a provider (seller) is
offering on your marketplace. (see
[concepts article](/background/concepts/#listing) for more information
on terminology used in Flex).

Here's a list of information you can store about a listing.

- Basic information (title, description)
- Geolocation
- Photos (unlimited amount)
- [Pricing](#flexible-pricing)
- [Availability](#availability-management)
- [Stock](#stock-management)
- **Public data.** Data to display publicly about the listing (category,
  custom data fields, etc).
- **Private data.** Data collected privately about a listing (can be
  used if the provider needs to provide some information to the operator
  for the listing approval process)
- **Metadata.** Metadata is visible to everyone publicly, but the
  provider can't edit it – only the operator can. A typical use case for
  metadata is that the operator can feature some listings to be
  displayed in the landing page of the marketplace, or at the top of
  search results in various categories.

[Read more about storing data about listings](/references/extended-data/).

A listing can have several different states:

- **Draft.** The provider hasn't yet published this listing, so it's
  visible only to themselves and the operator. The listing might still
  miss some essential information. Perhaps the provider started creating
  a listing but was missing high quality photos.
- **Published.** The listing is visible to all other users, and can be
  found in searches.
- **_Pending approval._** The listing is ready, but this marketplace
  requires the operator to approve each listing before they are
  published, so the listing is waiting for operator's approval before it
  is published. You can enable or disable the listing approval
  functionality for your marketplace in
  [Flex CLI](/flex-cli/getting-started-with-flex-cli/#enable-and-disable-listing-approval-functionality).
- **Closed.** The listing used to be published, but has since been
  closed, either by the provider or by the operator. The listing is
  still visible to the provider, but not discoverable via search.

If your providers are offering services like pet sitting, you might want
them to have only one listing, that acts as their "storefront", through
which customers can purchase their services. If, on the other hand,
you're building a rental marketplace where one provider might offer
multiple listings, you can allow each provider to also have a profile
page, which acts as their storefront, listing all their listings. You
can allow each provider to have as many listings as you want.

## Flexible pricing

Flex allows lots of flexibility for your providers in terms of how they
can set their pricing.

- **Add-ons.** Upsell additions on top of the regular price. Examples:
  cleaning fee, insurance, delivery.
- **Discount based on booking length.** An example: daily price is
  $20, weekly price $70, and monthly price \$200. Another example: 20%
  discount on daily rate for bookings of 5 or more days, 30% discount on
  bookings of 10 or more days, and so on.
- **Taxes.** Add any type of tax rates to the listing price and display
  them as separate line items in the receipt.
- **Offer multiple pricing packages in the same listing.** An example: a
  hairdresser offers both haircuts and hair dying.
- **Seasonal pricing.** Examples: weekends cost more than weekdays,
  summers cost more than winters, and so on.
- **Quantity discount.** For example: booking a room for two people
  costs $100, and after that each additional person costs $20 extra.
  Another example: after 5 items, additional items are \$2 cheaper each.
- **Different pricing for different groups.** An example: price per
  adult is $50/day and price per child $25/day.
- **Price negotiation.** Customer can propose a discounted price or ask
  for a quote. Provider can approve the proposal or offer a quote.
  Parties can negotiate until a consensus is reached.
- …and a lot more!

[Read more about the Flex pricing engine](/background/pricing/).

## Availability management

Each listing can have a calendar that determines when it's available. If
you're building a service marketplace, the calendar of the listing acts
as the calendar of the provider: a physiotherapist is either available
or not at any given time. If you're building a rental marketplace, the
provider might have multiple listings, with each having their own
calendar: apartment 1 is booked this weekend, but apartment 2 is still
available.

**Day-based and time-based availability**

Availability comes in two variations: day-based availability and
time-based availability. Day-based availability is simpler and
recommended, if all the rentals or services in your marketplace happen
"per day" or "per night". Time-based availability allows your providers
to determine their availability on an hourly level, or even on a five
minute level.

**Weekly default schedule and exceptions**

With both availability variations, providers can set both their weekly
schedule and exceptions to this schedule. As an example, they could say
that by default they're available from Monday to Friday from 9am to 12pm
and 1pm to 5pm, but exceptionally, they won't be available on Tuesday
next week because of a holiday, and next Saturday they are exceptionally
doing morning shift, being available from 9am to 11am.

A listing can only be booked if it is fully available during the time
range provided by the customer who is making the booking. If a booking
is made, the calendar is updated automatically, so other users can't
book the same slot.

**Multiple seats per time slot**

Both day-based and time-based availability support the ability to have
multiple seats available during a specific time slot. For instance, if
the marketplace is about booking seats for a yoga class with space for
10 people every Tuesday and Thursday, this can be accomplished by using
seats. Seats can be added both to the weekly default schedule and to the
exceptions. When seats are used, a customer can only book a certain slot
if that slot has enough seats available.

[Read more about listing availability management](/references/availability/).

## Stock management

Each listing can have a quantity of available units associated with it.
If you're building a product marketplace, the stock quantity is
typically the number of items available for purchase for each listing.
When stock management is incorporated in a transaction process, a
purchase for certain quantity of units can happen only if the listing's
available stock is sufficient.

[Read more about listing stock management](/references/stock/).

## Search engine

Flex has a powerful search engine, which can find listings based on
multiple criteria:

- **Geolocation.** The search can be used to display only listings that
  are within a provided radius from certain coordinates.
- **Free text.** The search can be used to find listings that have a
  certain keyword provided by the user. The search can find from listing
  title and description. You can also choose to index some public data
  fields (like listing category) so the search finds from them as well.
- **Price.** It's possible to filter out listings with too high or too
  low price.
- **Availability.** It's possible to filter out listings that have
  insufficient availability during a given time range. Works together
  with seats so that you can filter for availability with minimum number
  of seats. It is also possible to filter by required minimum duration
  of availability for the given time range.
- **Stock.** It's possible to show all listings or only listings with
  positive stock.
- **Custom filter: any value.** Any number of custom filters can be
  added. "Any value" filters out listings that don't have the given
  value (or any of a set of given values) in their public data. A
  typical use case is filtering by category or subcategory.
- **Custom filter: all values**. Filters out listings that don't have
  all values in a given set. A typical use case is choosing among
  "amenities": an apartment must have both balcony and floor heating in
  their public data to be displayed in the search.
- **Custom numeric filter.** Filters out listings that don't have a
  certain numeric value in their public data. For example, you might
  want to build a slider filter for the skill level of the user, ranging
  from 0 to 10.
- **Sorting.** Listing sorting order can be customized per query.
  Sorting is supported by one or more of: listing price, listing
  creation time, or any numeric attribute in the listing's public data
  or metadata.

## Transactions

The purpose of any marketplace is to facilitate transactions between its
users. In Flex, any exchange of value between a customer and a provider
is called a transaction. Transaction always has two parties (a customer
and a provider), and it's always related to a listing.

A transaction doesn't necessarily involve a payment. In its simplest
form, a transaction could mean simply a thread of free messages between
a customer and a provider. However, quite often a transaction involves a
booking (a specific slot is reserved from the calendar of a listing) or
order (an item is removed from the stock of a listing), price
calculation (the customer and provider agree on how much the customer
should pay for the service provided by the provider), and a credit card
payment. In addition, you can store _protected data_ to each
transaction, for instance if you want to ask specific details from the
customer regarding their order.

In Flex, a transaction can involve any number of steps, called
_transitions_. Each transition can be performed either by the customer,
by the provider, by the operator (for example, the operator could choose
to cancel a transaction and refund a customer if the provider doesn't
show up or hasn't sent the items), or automatically at a specific point
in time (for instance, payouts to providers are done automatically after
a booking period has been completed).

The Flex transaction engine is extremely flexible, allowing an unlimited
number of transaction process configurations. Here are some example use
cases:

- **Different types of bookings.** Book a date range, a number of hours
  on a given date, or a seat at an event.
- **Manage listing stock.** When an item is ordered, the listing stock
  changes.
- **Allow instant booking or require provider approval.** Either require
  each provider to accept a booking before charging the credit card, or
  allow _instant booking_, charging the credit card immediately when a
  customer makes a booking.
- **Collect custom data when making an order.** For example: request
  information on food allergies for each participant when booking a seat
  for a dinner party event, or ask if an item should be wrapped as a
  gift.
- **Collect custom data during the booking period.** An example: require
  the customer to provide photos of the rented vehicle before and after
  the rental period.
- **Design custom cancellation policies.** An example: if a customer
  cancels 7 days before the booking period starts, they get a full
  refund, but if they cancel later, they won't get a refund. You can
  also allow your providers to choose from multiple different policies.
- **Decide who can order.** An example: require the customer to verify
  their identity before their first order.
- ...and a lot more!

[Read more about the Flex transaction engine](/background/transaction-process/).

## Payments

Flex uses [Stripe Connect](https://stripe.com/connect) for processing
online payments between your users. The Flex payment system offers you
lots of helpful features. Here are some of them:

- **White label Know-Your-Customer process.** Create Stripe accounts to
  your providers with minimal personal information. They don't need to
  create a Stripe account for themselves, but can instead receive money
  directly to their bank accounts.
- **Preauthorize credit cards.** You can either charge the customer's
  credit card directly when they make a booking request, or preauthorize
  it, and only make the charge if the provider accepts the booking.
- **Delayed payout (escrow).** Either move the money to the provider
  immediately when a customer pays, or hold it until the booking period
  is over, and release it to the provider's bank account only after that
  (after automatically deducting your commission). You can hold money up
  to 6 months before releasing it to the provider.
- **Refunds.** If something goes wrong with the order or the customer
  wants to cancel, you can easily refund them.
- **Charge your commission.** You can charge a commission from the
  customer, the provider, or both parties. You can also set multiple
  different commission rates for different users or listing categories.
- **Automated payouts.** Your commission is automatically deposited to
  your bank account, while the rest is deposited to the bank account of
  the provider at the time of your choosing.
- **Storing payment cards and creating delayed charges.** You can store
  a payment card of the customer to make future purchases faster, or use
  the card to create delayed or additional charges.
  [Read more about using stored payment cards](/background/using-stored-payment-cards/)
- **Strong Customer Authentication.** European regulation changed in
  2019 to require support for
  [Strong customer authentication](https://stripe.com/en-fi/guides/strong-customer-authentication)
  (SCA) when European customers are making online payments. Flex
  supports SCA out of the box.

## Reviews

As a part of the transaction process, you can allow one or both parties
to review each other. A review consists of a five star rating and a text
description. You can choose to display the reviews a user has received
publicly in their profile, in the page of the listing (if the review was
about a listing), or next to search results.

By default, Flex uses a "double blind" review process. This means that
if both parties are allowed to review each other, they will see the
other party's review only once they've left a review themselves, or once
the finite review period (you can decide its length) has ended.

## Email notifications

Flex comes with a standard set of built-in email templates. These are
related to automated emails sent from your marketplace: verification
email, welcome email when a new user joins, email about resetting
password, security notifications if email address or password are
changed, and a notification when a user sends a message to another.

You can also use the transaction engine to send any email notifications
to the users. These could include invoices, notifications of new orders,
or reminders about the booking period starting. Flex offers a set of
default transactional emails out of the box, but you can easily add any
number of additional email notifications and time them exactly the way
you want. You can give multiple conditions for when each notification is
sent: for instance, you might want to send a reminder about leaving a
review 7 days after the order was delivered or the booking period ended,
but only if the user hasn't left a review yet.

You can customize the design and contents of all email notifications
freely. You can use smart variables to include user generated content,
or even personalize the templates based on who the recipient is.

[Read more about customizing email templates](/references/email-templates/).

## Multiple languages and currencies

Flex Template for Web includes default translations for English,
Spanish, French and German, but you can easily translate it to the
language of your choice. With some development work you can make your
marketplace multilingual, allowing your users to use it in the language
of their choice.

You can also use any currency you want, as long as it's in the list of
[100+ currencies supported by Stripe](https://stripe.com/docs/currencies).
With some development work, you can have your marketplace work with
multiple currencies. Remember, though, that if you're looking to process
online payments in your marketplace, your platform should be based in
one of the
[countries supported by Stripe custom accounts](https://stripe.com/docs/connect/custom-accounts#requirements)
and everyone receiving money through your marketplace should be based in
one of the [countries supported by Stripe](https://stripe.com/global).

## Custom design

You have full control over the user interface of your marketplace. You
can decide fully things like which fonts and colors to use, what kind of
pages or views there should be, and how those should be laid out. There
are no limits to what you can do in terms of visual design.

It's easy for you to get started with the design, since beautiful
[Flex Templates for Web](/introduction/getting-started-with-ftw-daily/)
offer an ideal starting point. The templates are fully responsive so
they look great both on desktop and mobile devices.

Your users won't see Sharetribe mentioned anywhere. The web address is
your own domain, the email notifications get sent from your email
address, and the entire user experience is fully tailored to match your
brand.

## SEO

[Flex Templates for Web](/introduction/getting-started-with-ftw-daily/)
are optimized for search engines by default, and you have full control
to tailor the experience the way you wish. You can decide the exact URL
structure, edit meta tags freely, and do any other optimizations you
want.

## Build a website or a mobile app

Since Flex is a "headless" marketplace solution, you can use it to build
either a website or a mobile application or both. Building a web app is
quicker today, because of
[Flex Templates for Web](/introduction/getting-started-with-ftw-daily/),
which offer a great starting point for development. A similar template
doesn't exist yet for mobile.

## Integrations

A great way to extend your marketplace is to integrate third party
services. You have full control over the code of your marketplace
website or app, so you can call third party APIs directly from there.
Once you receive information from those APIs, you can easily store it to
your users, listings or transactions. You can also bulk export data from
your marketplace to third party services in CSV format.

Some examples of integrations you might want to add:

- The map provider of your choice (Flex Template for Web offers default
  implementations for [Mapbox](https://www.mapbox.com/) and Google Maps)
- The analytics provider of your choice, like Google Analytics,
  [Hotjar](https://www.hotjar.com/), [Mixpanel](https://mixpanel.com/),
  or [Amplitude](https://amplitude.com/)
- Add Facebook pixels and other tools that help with paid acquisition
- Add a live chat tool like [Intercom](https://www.intercom.com),
  [Olark](https://www.olark.com/),
  [Zendesk Chat](https://www.zendesk.com/chat/) to talk directly to your
  users.
- Add social media sharing buttons to your favorite platforms like
  Facebook, Twitter, Instagram, Pinterest, and so on.
- Link a blog, a help center, or a community forum to your site.
- Export your data to an email marketing tool like
  [MailChimp](https://mailchimp.com/) to send beautiful newsletters.
- Do A/B testing with [Optimizely](https://www.optimizely.com/).
- ...and a lot more!

## Zapier integration

With our Zapier integration, you can connect your Flex marketplace with
more than 3,000 other web apps with just a few clicks. You can then
build "Zaps", which are automated workflows or sequences of actions that
get kicked off by a trigger. An event in one app can set in motion an
action in a second app and another action in a third app etc.

Once you’ve created a Zapier account and connected your Flex marketplace
account, you can use nine different events in your marketplace as a
trigger for actions in other apps. Zapier can also perform "search
actions" in your marketplace data about users, listings or transactions.

Together this allows you to create complex workflows based on things
happening in your marketplace. A new booking or order can trigger the
sending of a text message with Twilio. A new user sign-up can set into
action a campaign of drip emails in Mailchimp. A new listing can be
automatically posted to any of your marketplace’s social accounts. And
so much more.

## Admin console

Flex admin console allows you, the marketplace operator, to manage the
content your users create in your marketplace. Here are the features it
offers:

**Users**

- View a list of all your users,
- View the details of an individual user
- View listings, transactions and reviews of the user
- Edit user details
- Send the user an email
- Ban a user (removes them from the marketplace, without allowing them
  to sign up again)
- Export all user information to a CSV file

**Listings**

- View a list of all your listings
- View the details of an individual listing
- View transactions and reviews related to the listing
- Edit listing details
- Close a listing
- Approve a listing that is pending operator approval
- Export all listing information to a CSV file

**Transactions**

- View a list of all your transactions
- View the details of an individual transaction
- View possible next transitions of a transaction
- Read the messages between the customer and the provider related to a
  transaction
- View reviews related to a transaction
- Transition the transaction from one state to another (cancel, refund,
  etc)
- Export all transaction information to a CSV file

**Reviews**

- View a list of all your reviews
- View the details of an individual review
- View the transaction related to this review
- Export all review information to a CSV file

In addition, the Admin Console features a "Build" section, where you can
manage the information related to the structure of your marketplace.
Here are the features it offers:

- **General settings.** Change things like marketplace name and URL.
- **Transaction processes.** See a list of your
  [transaction processes](/background/transaction-process/) and view the
  details of each process.
- **Payments.** Add your Stripe keys to be able to accept online
  payments.
- **Built-in email templates.** Edit and preview the contents of your
  built-in email templates.

<!-- Docs to Markdown version 1.0β16 -->
