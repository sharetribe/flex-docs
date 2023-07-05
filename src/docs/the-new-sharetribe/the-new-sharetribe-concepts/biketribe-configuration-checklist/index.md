---
title: Biketribe configuration checklist
slug: biketribe-configuration-checklist
updated: 2023-07-05
category: the-new-sharetribe-concepts
ingress: Review Biketribe defaults and how to change them
published: true
---

Building your marketplace with The New Sharetribe typically starts by modifying
Biketribe, your example marketplace. Learn more about Biketribe’s
default configurations and what to modify to turn Biketribe into your
marketplace.

## What is Biketribe

Biketribe is a fictional peer-to-peer marketplace for renting bikes in
Finland. Users list their bikes for rent or book bikes for daily
rentals.

Biketribe serves as a marketplace example to help you get started
building your marketplace. You will modify the Biketribe theme using
no-code tools to setup your custom marketplace. Then, you can go Live or
use code to fully customize your marketplace.

![biketribe_search_page](./search_page-grid_layout-landscape.png)


### Biketribe users

Biketribe is a peer to peer marketplace. Users are usually individuals.
Users can book a bike rental or offer their bikes for rent (i.e. a user
can be both a customer and provider), so the signup form does not
distinguish user roles. Users sign up with an email and password, and by
agreeing to the marketplace terms and conditions.

![biketribe-user_profile_seller](./biketribe-user_profile-seller.png)

_Every Biketribe user creates a profile to list or book bikes._

### Biketribe listings

Providers list bikes for rent. They use a listing creation wizard to add
their bike listing to the platform. The wizard asks them details about
their bikes: Description, Availability (listing wizard sections). To
publish their listing, providers must add information about the bank
account where they want to receive earnings, if they have not done so
already.

![biketribe_listing_daily](./biketribe-listing_daily-buyer.png)
_Biketribe customers book bikes per day starting from the listing page._

### Biketribe transactions and reviews

Customers request to rent a bike by entering their payment details on a
checkout page. Providers must respond to the request within 3 days. Once
they accept, the customer’s card is charged and funds are transferred to
the marketplace. After the booking period ends, funds are transferred to
the provider’s bank account and paid out. Both sides can review each
other. During the transaction, customers and providers can exchange
messages freely.

![biketribe_booking_inbox-seller](./biketribe-booking_daily_inbox-seller.png)

_After a booking is made, the customer and provider can interact
directly and see details of their transaction in their Inbox._

### Biketribe content

Biketribe content includes static pages and microcopy. Biketribe’s
static pages are the Landing page, About page, Terms of use, and Privacy
policy. The Landing page is the most Biketribe-specific page.
Biketribe’s microcopy, which covers the words or phrases the marketplace
uses in buttons, help texts, or error messages, is mostly generic,
except for the term “bike.”

![biketribe_microcopy](./biketribe-listing_daily_microcopy.png)
_Examples of microcopy visible on the listing page._

## What to modify

The first step to building your marketplace is modifying Biketribe
default configurations that do not apply to your marketplace. You can
modify these with no-code tools from
Console. Console is your
operator backend for configuring your marketplace without code and
viewing and managing your marketplace data, like users or listings.

The following checklist provides an overview of every configuration in
Biketribe that you should review. Certain defaults, like the marketplace
name and logo, will definitely need to be changed. Others, like the
transaction process, can be kept if they work for you.

In any case, the exhaustive checklist provides an opportunity to learn
more about the no-code tools at your disposal.

### Visual appearance

Modify the default brand and style in Biketribe to match your
marketplace.

- Apply your branding by changing the default images and marketplace
  colours. Edit in Console or
  learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-add-good-looking-logos-and-images/).
- Change the default background image and social media images. Edit in
  Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-add-good-looking-logos-and-images/).
- Change the logo. Edit in
  Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-add-good-looking-logos-and-images/).
- Generate a new favicon. Edit in
  Console or learn more in
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-add-good-looking-logos-and-images/).

### Content and microcopy

Biketribe uses language about bikes. Build your own messaging in the
following steps.

- Change the microcopy in your marketplace. Edit in
  Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-use-microcopy-editor).
- Change your marketplace landing page. Edit in
  Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-edit-content-pages-in-console).
- Update your Terms of Service and Privacy Policy. Edit in
  Console or learn more in
  [the documentation](https://www.sharetribe.com/docs/the-new-sharetribe/free-templates).
- Update the footer. Edit in
  Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/how-footer-works).

### Listings

Biketribe providers list their bikes. Update the listing page, search
page, and listing wizard to suit what your providers are offering on
your marketplace.

- Change your listing fields. Configure in
  Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/listing-fields).
- Change your listing layout. Configure in
  Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/listing-page-image-layouts).
- Change your search filters. Configure in
  Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/how-search-works).
- Change your search page layout. Configure in
  Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/search-page-layout-options).

### Transactions

Biketribe customers rent per day. If your marketplace transaction is
different, then make these changes.

- Update your listing types. Configure in
  Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/what-are-listing-types).
- Choose your transaction process. Configure in
  Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/understanding-transaction-settings).

## Go Live and customize further

Once you have completed these changes, it's time to review your
marketplace. If you are ready to launch to your first users, then you
need to set up a Live environment. You can do this by going to your environments, select live, and choose subscription plan. And now, you're live. 
