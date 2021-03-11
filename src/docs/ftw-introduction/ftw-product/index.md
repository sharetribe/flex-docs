---
title: FTW product
slug: ftw-product
updated: 2021-03-11
category: ftw-introduction
ingress:
  This article introduces FTW-product and what's different compared to
  FTW-daily and FTW-hourly.
published: true
---

FTW-product is a new Flex Template for Web. It's build with product
marketplaces in mind.

## Differences in directory structure

With this template, we decided to take more out of the possibilities
that code-splitting made possible. FTW-daily and FTW-hourly were created
before code-splitting was possible, and pushing most of the components
to a specific components directory (_src/components/_) made sense. It
was a clear place where customizers could start looking for a components
they wanted to customize. This setup also improved developer experience
a bit since it allowed us to use index file to export all those
components:

```js
import { Avatar, Button, Logo } from ‘../../components’;
```

The alternative is to import everything one-by-one, which can be a
pretty long list of imports.

```js
Import Avatar from ‘../../components/Avatar/Avatar.js’;
Import Button from ‘../../components/Button/Button.js’;
Import Logo from ‘../../components/Logo/Logo.js’;
```

Code-splitting changed the dynamics of this setup a bit. Everything that
is imported through a single file, is likely to end up into a main
code-chunk. That means that everything in that file is going to slow
down page rendering - when the page is fully loaded. That also affects
search engine optimization (SEO).

With FTW-product, we have decided to move certain page-specific files
under page-directories. Here are some of the relevant changes in the
directory structure:

- **src/config/**: Generic configuration files are moved to this
  directory
  - Extra configs:
    - **mainSearchType** in Topbar. It's either _'keywords'_ or
      _'location'_.
    - **searchPageVariant**: _'list'_ & _'map'_.
    - **listingPageVariant**: _'product'_ & 'TODO: hero'
  - Renamed configs:
    - **transactionProcessAlias** (in other templates:
      bookingProcessAlias)
    - **lineItemUnitType** (in other templates: bookingUnitType)
- **src/routing**: Route configuration and UI components related to
  routing are moved to this directory
- UI components that are only used in a single page or within a more
  complex component are nested within that page or component. For
  example:
  - _EditListinWizard_ is moved under _EditListinPage_
  - Search map and filters are moved under _SearchPage_
  - _TransactionPage_ got subcomponents like _ActivityFeed_,
    _ReviewModal_, _ReviewForm_, _SendMessageForm_, and
    _TransactionPanel_.
- **src/forms**: this directory was removed as there was only one form
  that was truly shared between pages: _StripeConnectAccountForm_. It's
  moved to _src/components/_.

TODO: add other notable changes here

## Differences in transaction process

FTW-product has different transaction process graph than what FTW-daily
and FTW-hourly use. Visually, the biggest changes are after checkout
page and before review period. E.g. FTW-product has dispute state there.
However, the defining difference is actually in actions: FTW-product
doesn't use bookings (and availability management of time-slots).
Instead, it has actions to deal with stock management.

Roughly, the transaction process graph looks like this:

![flex-product-default-process](./flex-product-default-process.png)

## Managing stock

Stock management is pretty straightforward. On EditListingWizard, (which
is a component to create and update listings), provider can set the
stock quantity for the listing. Under the hood, FTW-product calls API
with _`sdk.stockAdjustments/compareAndSet()`_ with the value provider is
trying to set (`newTotal`) and also the previous value (`oldTotal`). At
the time of update, if the assumed old total still matches with the
current stock, the **currentStock** entity is updated to the value
passed through with `newTotal` parameter. This check is done to prevent
race conditions, where someone orders a listing while provider is
updating its stock.

Listing entity has a relationship to "currentStock" entity - so,
currentStock info can be included listing queries. Then on ListingPage,
customer can order as many listings as there is stock left for it.

> Note: Flex API and FTW-product don't yet support listing variants (the
> stock of yellow t-shirts vs red t-shirts). So, listing variants need
> to be modelled with separate listings.

## Shipping the product

For product marketplaces, it's usually necessary to ask shipping address
from customer. FTW-product ask shipping method on ListingPage and if
'shipping' is chosen, shipping address is asked on checkout page. The
address is saved to transaction's protected data in transitions:
_request-payment_ and _request-payment-after-enquiry_.

On TransactionPage (the page opened by clicking inbox items), shipping
address or pickup address is shown to both parties of the transaction.
Provider has 2 weeks to mark the item shipped
(_transition/mark-delivered_) or the automatic expiration happens
(_transition/auto-cancel_) and customer is refunded. If needed, customer
can dispute the order from "Delivered" state.

![Dispute modal](./dispute-modal.png)

## Handling time zones

FTW-product doesn't really need to print dates and times, but we have
refactored `src/util/dates.js` so that it use moment-timezone library
and it is therefore ready to convert and render timestamps in different
time zones if needed.
