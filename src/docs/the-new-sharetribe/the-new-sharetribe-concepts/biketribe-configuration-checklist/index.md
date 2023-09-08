---
title: Sharetribe configuration checklist
slug: biketribe-configuration-checklist
updated: 2023-09-08
category: the-new-sharetribe-concepts
ingress: Review the default assets and how to change them
published: true
---

Building your marketplace with The New Sharetribe typically starts by
modifying your example marketplace that has some generic assets. Learn more 
about the default configurations and what to modify to turn the generic
marketplace into one that reflects your own.

## What is the default marketplace


The default marketplace does not have a specific theme. It serves as a 
marketplace example to help you get started building your own. 
You will modify the default theme using no-code tools to setup your custom 
marketplace. Then, you can go Live or use code to fully customize your marketplace.

![default_marketplace](./default_marketplace.png)

### Default marketplace users

The default marketplace is a peer to peer marketplace. Users are usually individuals.
Users can book a listing or create one for others to book (i.e. a user
can be both a customer and provider), so the signup form does not
distinguish user roles. Users sign up with an email and password, and by
agreeing to the marketplace terms and conditions.

![post_a_listing](./post_a_listing.png)

_Users can create listings on the marketplace._

### Default listings

Providers can create generic listings. They use a listing creation wizard to 
add their listing to the platform. The wizard asks them details about
the listing, such as description and availability. To publish their listing, 
providers must add information about the bank account where they want to 
receive earnings, if they have not done so already.

![biketribe_listing_daily](./biketribe-listing_daily-buyer.png)
_Biketribe customers book bikes per day starting from the listing page._

### Transactions and reviews

Customers request to book a listing by entering their payment details on a
checkout page. Providers must respond to the request within 3 days. Once
they accept, the customer’s card is charged and funds are transferred to
the marketplace. After the booking period ends, funds are transferred to
the provider’s bank account and paid out. Both sides can review each
other. During the transaction, customers and providers can exchange
messages freely.

![biketribe_booking_inbox-seller](./biketribe-booking_daily_inbox-seller.png)

_After a booking is made, the customer and provider can interact
directly and see details of their transaction in their Inbox._

### Content

The default marketplace content includes static pages and microcopy. The
static pages are the Landing page, About page, Terms of service, and Privacy
policy. The microcopy, which covers the words or phrases the marketplace
uses in buttons, help texts, or error messages, is mostly generic,
letting you adapt it to your own marketplace's look and feel.

![biketribe_microcopy](./biketribe-listing_daily_microcopy.png)
_Examples of microcopy visible on the listing page._

## What to modify

The first step to building your marketplace is modifying the
default configurations that do not apply to your marketplace. You can
modify these with no-code tools from Console. Console is your operator
backend for configuring your marketplace without code and viewing and
managing your marketplace data, like users or listings.

The following checklist provides an overview of every configuration in
the default marketplace that you should review. You will likely need
to change most or all of the defaults, but some of the defaults, 
like the transaction process, can be kept if they work for you.

In any case, the exhaustive checklist provides an opportunity to learn
more about the no-code tools at your disposal.

### Visual appearance

Modify the default brand and style to match your
marketplace.

- Apply your branding by changing the default images and marketplace
  colours. Edit in Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-add-good-looking-logos-and-images/).
- Change the default background image and social media images. Edit in
  Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-add-good-looking-logos-and-images/).
- Change the logo. Edit in Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-add-good-looking-logos-and-images/).
- Generate a new favicon. Edit in Console or learn more in
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-add-good-looking-logos-and-images/).

### Content and microcopy

The default marketplace uses generic language that is not specific to any marketplace theme. Build your own messaging in the following steps.

- Change the microcopy in your marketplace. Edit in Console or learn
  more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-use-microcopy-editor).
- Change your marketplace landing page. Edit in Console or learn more in
  the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-edit-content-pages-in-console).
- Update your Terms of Service and Privacy Policy. Edit in Console or
  learn more in
  [the documentation](https://www.sharetribe.com/docs/the-new-sharetribe/free-templates).
- Update the footer. Edit in Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/how-footer-works).

### Listings

On the default marketplace, providers can create generic listings. Update the listing page, search
page, and listing wizard to suit what your providers are offering on your marketplace.

- Change your listing fields. Configure in Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/listing-fields).
- Change your listing layout. Configure in Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/listing-page-image-layouts).
- Change your search filters. Configure in Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/how-search-works).
- Change your search page layout. Configure in Console or learn more in
  the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/search-page-layout-options).

### Transactions

On the default marketplace, customers can rent per day. If your marketplace transaction is
different, then make these changes.

- Update your listing types. Configure in Console or learn more in the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/what-are-listing-types).
- Choose your transaction process. Configure in Console or learn more in
  the
  [documentation](https://www.sharetribe.com/docs/the-new-sharetribe/understanding-transaction-settings).

## Go Live and customize further

Once you have completed these changes, it's time to review your
marketplace. If you are ready to launch to your first users, then you
need to set up a Live environment. You can do this by going to your
environments, select live, and choose subscription plan. And now, you're
live.
