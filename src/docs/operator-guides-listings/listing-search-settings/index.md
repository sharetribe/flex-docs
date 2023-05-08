---
title: Listing search settings
slug: listing-search-settings
updated: 2023-04-24
category: operator-guides-listings
ingress:
  Using search is a great way to allow users to find exactly what they
  are looking for.
published: true
---

The search feature is enabled by default in all Sharetribe marketplaces.
However, you can define the type of search to support depending on your
user’s needs. You can also add filtering options to your marketplace,
this include general filter options and specific fields filters.

## Search type

Sharetribe has two different search types or search functions, keyword
and location search. You can enable either one from the [Listing Search
page of Console](LINK TO THE LISTING SEARCH PAGE IN CONSOLE). You can
read more about these features in these articles:

- [Keyword search](LINK TO KEYWORD SEARCH)
- [Location search](LINK TO LOCATION SEARCH)

### Can I have both Keyword and Location search enabled?

At the moment it is unfortunately **not possible** to have both search
functions working at the same time by default. However, this is
achievable if you host your own front end application.

### Can I enable user or transaction search?

No. At the moment it is only possible to search listings. But you can
build your marketplace experience for users to create listings as
“profiles”.

## Filters

In the Listing search settings you can also enable filters for default
fields. You can choose to Display a date range filter and Display a
Price filter.

### Date range filter

Enabling this feature will display a date range filter in the search
page. This filter allows users to define a date or a date range. From
the settings you can define how the filter behaves.

Availability mode: You can choose Partial availability or Full
availability

- Partial availability: Displays all listings that are available with at
  least some dates within the user’s selected date range, even if they
  are not available for the full range.
- Full availability: Displays listings that are available for the entire
  selected date range. Listings that are only partially available will
  not be displayed.

Date range mode: You can choose Daily availability or Nightly
availability

- Daily availability: When choosing a date or date range the start and
  end date can be the same. People could filter for one specific date.
- Nightly availability: When choosing a date range, the start date
  cannot be the same as the end date. People would need to filter for at
  least one night. From one day to the next.

## Price filter

The price filter option allows you to add a filter to the search page.
You can define the minimum and maximum range for the filter. Users can
then filter-in listings with specific price ranges. They can also
filter-out listings that are too cheap or too expensive. Make sure that
the minimum and maximum values make sense for your marketplace,
otherwise, when users use the filter, they might inadvertently filter
out listings, because of the wrong filter configuration.
