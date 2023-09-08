---
title: Tutorial step 6 – Customize listing search
slug: tutorial-listing-search
updated: 2023-09-08
category: the-new-sharetribe-tutorial
ingress:
  Listing search allows your customers to discover products and services
  they need.
published: true
noindex: true
---

In the
[previous step about listing fields](/the-new-sharetribe/tutorial-listing-fields/),
we already altered the search experience by adding a custom search
filter. However, there are also some more general search configuration
options, which can be adjusted from "Listings → Listing search". Let's
go there.

### Search type

Biketribe is a location-based marketplace, so we want the customers to
start their journey by searching by location.

**Keep "Location search"**

On the listing search page, leave the search type as “Location search”.

**Keyword filter**

With location search, you can still allow customers to filter listings
and search for a specific term. Let's do that.

**Check "Display keyword filter"**

### Date range filter

Date range filter allows the customer to filter the search based on
which bikes are available at a specific time. That sounds handy for us,
so let's keep it.

**Check “Display a date range filter.”**

#### Availability mode

We can decide if the search returns all listings that have some
availability on the given date range, or only listings that have the
full date range available. In our case, we assume that people don't want
to rent a bike for too many days, so if they're using the filter for a
specific week, they probably want to see saunas that are available on at
least some of those days.

**Choose "Partial availability"**

#### Date range mode

Our bikes are available for multi-day bookings, so the filter should
also reflect that.

**Choose "Daily availability"**

### Price filter

Some people might want to filter out bikes that don't fit their budget.

**Check “Display a price filter”**

#### Price filter minimum and maximum value

We assume that no bike costs more than \$500/day.

**Write “0” in Price filter minimum value**

**Write “500” in Price filter maximum value**

All done! **Remember to save changes.**

### Next: commission and minimum transaction size

Now we're happy with how our listings work, and how they are searched.
Next, let's look into how you monetize your transactions.
[Go to step 7: Configure commission and minimum transaction size](/the-new-sharetribe/tutorial-commission-tx-size/).
