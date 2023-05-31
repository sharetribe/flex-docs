---
title: Location search
slug: location-search
updated: 2023-05-19
category: pilot-day-guides-listings
ingress: This articles explains how Location search works in Sharetribe.
published: true
---

As it's name indicates it allows your users to search within your
marketplace based on location or areas. You can enable Location search
from
[the Listing Search settings page in Console](https://flex-console.sharetribe.com/a/listings/listing-search).

Location features in Sharetribe are powered by Mapbox. You can read more
about
[setting your Mapbox account in this article](https://www.sharetribe.com/docs/ftw/how-to-set-up-mapbox-for-ftw/).
Location search allows you to use a location to find listings near that
location or within that searched area.

## How are the search results found and sorted?

If you search a specific point or address, the listings will be sorted
from the closest to the furthest from the given point that the user
searched. This is called Location search by origin.

If you search an area, the search page, will only listings that are
within the area searched for and sort the results in relation to the
center of the area searched. This is called Location search by bounds

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

You can do that easily with
[the Microcopy editor](https://www.sharetribe.com/docs/operator-guides/how-to-use-microcopy-editor/).
Find the “TopbarSearchForm.placeholder” and the
“LocationSearchForm.placeholder” keys and replace the text there for
your own. The default text is “Search bikes…”

## Can I have both keyword and location search available in the same marketplace?

Not by default. You can only use one of them at the same time. If you
want to be able to use both, you will need to self host the platform.
