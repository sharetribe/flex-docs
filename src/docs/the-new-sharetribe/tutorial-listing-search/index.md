---
title: Tutorial step 6 – Customize listing search
slug: tutorial-listing-search
updated: 2023-06-01
category: the-new-sharetribe-tutorial
ingress:
  Listing search allows your customers to discover products and services
  they need.
published: true
noindex: true
---

In the
[previous step about listing fields](/the-new-sharetribe/tutorial-listing-fields/),
we already altered the search experience by adding custom search filter.
However, there are also some more general search configuration options,
which can be adjusted from "Listing search". Let's go there

### Search type

Saunatime is a location-based marketplace, so we want the customers to
start their journey by searchin by location.

**Keep "Location search"**

On the listing search page, leave the search type as “Location search”.

### Date range filter

Date range filter allows the customer to filter the search based on
which saunas are available at a specific time. That sounds handy for us,
so let's keep it.

** Check “Display a date range filter.”**

#### Availability mode

We can decide if the search returns all listings that have some
availability on the given date range, or only listings that have the
full date range available. In our case, we assume that people don't want
to book a sauna for multiple days, so if they're using the filter for a
specific week, they probably want to see saunas that are available on at
least some of those days.

**Choose "Partial availability"**

#### Date range mode

Our saunas are available for overnight bookings, so the filter should
also reflect that.

**Choose "Nightly availability"**

### Price filter

Some people might want to filter out saunas that don't fid their budget.

**Check “Display a price filter”**

#### Price filter minimum and maximum value

We assume that no sauna costs more than \$1000/night.

**Write “0” in Price filter minimum value**

**Write “1000” in Price filter maximum value**

All done! **Remember to save changes.**

### Next: commission and minimum transaction size

Now we're happy with how our listings work, and how they are searched.
Next, let's look into how you monetize your transactions.
[Go to step 7: Configure commission and minimum transaction size](/the-new-sharetribe/tutorial-commission-tx-size/).