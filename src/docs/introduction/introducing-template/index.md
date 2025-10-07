---
title: Introducing Sharetribe Web Template
slug: introducing-template
updated: 2024-02-07
category: introduction
ingress:
  Learn about the out of the box functionalities available in the
  Sharetribe Web Template and how to take them into use.
published: true
---

The Sharetribe Web Template is a customizable marketplace web
application built on top of the Sharetribe APIs. It is a great starting
point for building any type of marketplace, whether it is about rentals,
services, products, or something else. You can configure and launch your
marketplace without coding, then host the template code to add custom
features.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/2gOM61b8LJM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Customization starting point

You can configure a hosted version of the Sharetribe Web Template in
your Console's Test environment. When you first open your Test
marketplace, you start with a generic example marketplace.

You can change the default settings in Console. Change core user
experiences like search, listing creation, and transactions in Console's
Build section under the "Content" tab. For a full list of the no-code
capabilities and how to use them to customise your marketplace, please
consult our
[guide on building your marketplace](https://www.sharetribe.com/help/en/articles/8501769-how-to-build-a-marketplace-with-sharetribe).

After configuring your marketplace, you may want to install the Template
codebase on your own servers and modify the Template codebase with your
own custom features in addition to the configurations you made without
coding. Please start with
[this guide](https://www.sharetribe.com/docs/introduction/getting-started-with-web-template/)
on how to install the Template locally.

The rest of this article describes some of the out of the box
functionality available in the Sharetribe Web Template.

## Listings

The heart of the Sharetribe Web Template marketplace are listings.
Listings represent what is offered on a Sharetribe marketplace, whether
it is a product, a job, a service, rental or something else.

A few configurations make it easy to set what your listings are about.
By default, registered users can create any number of listings. Listings
are automatically published. Published listings are visible to
registered and non-registered users.

You can learn more about how listings work in Sharetribe
[here](/concepts/listings-overview/).

### Listing thumbnails and images

The template code has an easy configuration to change the aspect ratio
of the thumbnails. The Sharetribe Web Template has two main layouts for
a listing page. One layout features a single cropped image on top of the
page, which is more geared toward rentals and services. The other layout
features a full image of the item, which is designed with product
marketplaces in mind.

### Availability

Listings can feature an availability calendar. You can configure the
availability of your listings to be nightly, daily, hourly, or use fixed
time intervals. You can offer bookings using custom time increments (for
instance, 15-minute intervals). You can also customize your marketplace
to offer multiple different booking length options (for instance, hourly
and daily booking options).

Listing authors add their availability when creating their listing.
Daily and nightly availability lets them add a default weekly schedule
and easily set any exceptions to that default schedule. Hourly
availability lets listing authors set their exact schedule for every day
up to one year in advance.

Users book from the listing author's availability calendar on the
listing page.

The Sharetribe Web Template has time zone support. The listing author's
location determines the timezone of the listing, and that timezone is
saved into the listing’s availability plan. Bookings can be made for
multiple spots or seats. This feature can be added easily by modifying
the Template code.

![create-listing-per-day-availability](./create-listing-per-day-availability.png)

Read more about
[availability management in Sharetribe](/references/availability/).

### Inventory management

On the other hand, listings can be about products and offer inventory
management. The seller adds the number of items they have in stock
during product listing creation. When a customer makes a purchase, that
number is automatically reduced. The seller can manage their stock
manually by editing the listing if there are inventory changes that are
not related to transactions.

You can configure the Template so that the default inventory for
listings is always one (1). When an item is sold, its stock will
automatically go to zero. Listings with zero stock are filtered out by
default, and do not appear in search.

Read more about
[inventory management in Sharetribe](/concepts/inventory-management/).

## Search

### Keyword or location search

Two search options are available: search by keyword or by location.
Keyword search lets customers enter their queries via a search bar.
Customers can further refine their search using sorting and filtering
options available in a left-hand toolbar.

Location search lets customers type in a specific address, with listings
returned in order of their distance from the searched-for location. The
search page for location search includes a map; customers can scroll the
map to find new listings from different locations. Sorting and filtering
fields are available via a drop down menu near the top of the page.

![search-page-map-view](./search-page-map-view.png)

Learn more about how to
[configure your search settings](/template/configuration/#search-configuration).

### Browsing and filtering

You can build the filtering experience of your marketplace using
configurable extended data. Simple editing of a JSON schema allows
adding, removing, or modifying what fields are added to listings. Set
the fields’ read and write permissions depending on the needed use case,
and quickly turn listing fields into corresponding filters.

Read more about how to
[configure extended data in the Sharetribe Web Template](/template/configuration/#listing-configuration).

## Transactions

### Default booking process

Sharetribe Web Template offers transactions with calendar bookings,
where customers book time from a provider’s availability calendar. The
price they pay equals the amount of time booked multiplied by the
booking price. Customers can book by days, nights, or hours.

Providers add their availability while creating their listings. They
configure when they are available for booking, creating a calendar that
the customer can use during search and booking.

![accept-request-booking-seller](./accept-request-booking-seller.png)

### Default purchase process

You can also configure the Sharetribe Web Template to become a
marketplace for purchasing. The calendar booking is removed; purchasing
happens by selecting the number of units. Shipping is offered by
sellers, who set a fixed shipping price for the first and any subsequent
items purchased.

Units may be purchased from an available stock, which is set by the
seller. Out of stock listings cannot be purchased.

### Default negotiation process

The Sharetribe Web Template supports a reverse marketplace flow where
customers can create listings and providers can submit offers. Once the
customer and provider have agreed on a price for the transaction, the
customer then proceeds to make a payment. The default negotiation
process does not include calendar bookings or stock.

### Payments

Customers pay using credit card or debit card by entering their payment
information on the checkout page. Payments in the purchase and
negotiation default processes are captured immediately, whereas payments
with the booking default process are only captured after the provider
accepts the booking request. In either case, funds are transferred to
the marketplace’s Stripe account. The configured seller and customer
commissions are paid out to the marketplace. The remaining funds (the
seller’s earnings) are paid out to their bank account according to rules
of the transaction process.

![checkout-page](./checkout-page.png)

Learn more about
[how payments work in Sharetribe](/concepts/payments-overview/).

### Messaging

Sharetribe Web Template allows sellers and customers to send private
messages back and forth. Users can start a message thread with another
user from their profile or their listing. Users access messages in their
inbox. Each message thread also includes a timeline of different actions
taken during the transaction. Messages initiate transactions, but do not
transition a transaction from one state to another.

### Reviews

Once a transaction has completed, the customer and provider can both
leave reviews. In Sharetribe Web Template, reviews remain hidden until
either both parties have submitted their reviews or the review period
expires. This ensures that the second participant's review is not
affected by the first review. Both reviews are published to both parties
at the same time, and after the review is published it cannot be
modified anymore.

## Account management

### Signup and login

The Sharetribe Web Template allows anonymous users (i.e. users without
an account) to visit content pages, search, and browse listings. Most
every other action requires users to create an account on the signup
page with their email and password. After confirming their email, signed
up users can engage in selling, buying, or both.

Users can login to their accounts using their email and password. They
can reset their password from the login screen using their email.

Every user has a user profile page where they can add a profile picture,
their first and last name, and share a bio. In their account settings,
users can change their email address, add a phone number, change their
password, add their payout details, or add their payment info (credit or
debit card) for faster checkout.

Learn more about how
[user accounts and authentication work in Sharetribe](/concepts/users-and-authentication-in-sharetribe/).

### Seller onboarding

Before they can publish their listings or submit offers, any seller must
complete an onboarding process where they add their payout details. The
onboarding process happens through a Stripe-hosted modal, where sellers
are taken through several steps to tell your marketplace where to send
their earnings. Stripe also takes care of identity verification so that
your marketplace complies with KYC/KYB regulations.

Sellers can revisit the modal from their account settings at any point
if they need to edit their information (such as a change of address) or
provide more information to be in compliance.

![seller-onboarding-stripe-2](./seller-onboarding-stripe-2.png)

Learn more about
[handing seller onboarding on your marketplace](/concepts/providers-and-customers-on-stripe-platform/).

### Email notifications

The Sharetribe Web Template uses Sharetribe to send email notifications.
There are two types of email notifications. Built-in email notifications
relate to user account management and are sent whenever a user is
setting up their account or changing some of its settings. Transaction
process emails, meanwhile, are sent as a result of certain actions in a
transaction, such as when a new message is received. Only users with
verified email addresses receive emails.

Learn more about
[how email notifications work in Sharetribe](/concepts/email-notifications/).

## Design

The Sharetribe Web Template starts with a familiarly modern and sleek
marketplace design. Each component is built to suit multiple
screen-sizes, from desktop to mobile browser. Your email notifications
also include the same smooth style out of the box.

Branding the Sharetribe Web Template is easy with a refined styling
approach that lets you set the marketplace colors, logos, and favicons
quickly. You’ll also likely want to change your marketplace’s texts,
modify your landing page, and add essential information to your users
with Console’s editors for Marketplace texts and Pages.

Learn more about
[how content works in Sharetribe](/concepts/content-management/).

Self-hosting the Template code base lets you customize the starting
design as much as you want. Any custom design can be implemented on
Sharetribe. We offer downloadable design files to help you build your
custom design. You can find the Sharetribe Web Template design files
here.

## Customizing your own marketplace

The first step to take the Sharetribe Web Template into use is
downloading the codebase and installing the necessary development tools.
Then, check out our tutorial where you modify your marketplace's visual
and functional settings to create an entirely new marketplace.

Follow our
[getting started guide](/introduction/getting-started-with-web-template/)
for installation instructions and tutorial next steps. If you prefer to
code your own features right away, don’t hesitate to use
[our documentation](https://www.sharetribe.com/docs/) or contact
[our support team](mailto:hello@sharetribe.com) by email for help.

If you are not a developer, then you will need to hire a developer to
customize your Sharetribe marketplace with code. We recommend finding a
vetted developer from Sharetribe’s
[Expert Partner Network](https://www.sharetribe.com/experts/).
