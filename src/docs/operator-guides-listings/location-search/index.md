---
title: Location search
slug: location-search
updated: 2023-04-24
category: operator-guides-listings
ingress:
  You can enable Location search from [the Listing Search settings page
  in Console](link to the console listing search page).
published: true
---

Location features in Sharetribe are powered by Mapbox. You can read more
about
[setting your Mapbox account in this article](https://www.sharetribe.com/docs/ftw/how-to-set-up-mapbox-for-ftw/).
Location search allows you to use a location to find listings near that
location.

## How are the search results found and sorted?

Location search by origin sorts the listings from the closest to the
furthest from the given point that the user searched. Location search by
bounds displays only listings that are within the area searched for and
sorts the results in relation to the center of the area searched.

## Is it possible to limit the distance from the searched point?

At the moment this is not possible. All the listings will be displayed
from the nearest and it is not possible to remove listings that are
farther than a certain distance.

## Can I use the map view even when not using location search?

Yes. Even if you are not using the location search, it is possible to
use a layout with a map. It is good to consider that marketplaces where
the map view is important tend to benefit from using location search.

## Is it possible to only display listings based on a user’s location?

Not by default.

## How can I change the default text displayed in the search bar?

You can do that easily with [the Microcopy editor](link to microcopy
editor article). Find the “TopbarSearchForm.placeholder” and the
“LocationSearchForm.placeholder” keys and replace the text there for
your own. The default text is “Search bikes…”

## Can I have both keyword and location search available in the same marketplace?

Not by default. You can only use one of them at the same time. If you
want to be able to use both, you will need to self host the platform.
