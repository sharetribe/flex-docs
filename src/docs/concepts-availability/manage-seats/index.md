---
title: Manage seats
slug: manage-seats
updated: 2021-10-18
category: concepts-availability
ingress:
  You can manage the capacity of an event or a rental space within a
  specific time frame with seats.
published: true
---

In Flex, you can manage the capacity of an event or space within a
specific timeframe with seats. Seats is a fundamental feature for
marketplaces that provide events, rentals, or services that can be
booked by multiple people at the same time. Seats allow you to define
the specific number of people that book the same time slot in an event,
space, or service.

If there are seats available in a specific time slot, the listing can
still be booked by as many people as seats are available. Once all the
seats are taken, the time slot becomes unavailable.

This article describes seat management on a high level. If you want to
learn how to manage seats from a technical perspective, visit the API
references for
[Marketplace API](https://www.sharetribe.com/api-reference/marketplace.html)
or
[Integration API](https://www.sharetribe.com/api-reference/integration.html).

## How do you define the available seats for a listing?

You define the available seats for any given time slot of a listing via
the
[availability plan or availability exceptions](/operator-guides/concepts/#availability-plan--availability-exception)
of a listing. If the number of seats is set to 0, the listing will not
be available at that time.

In our Sharetribe Web Template, the default seat availability of any
particular bookable listing is one. Providers set the availability plan
and exceptions of their listing during listing creation. Users determine
when their listing is available and when it’s not within the timeframes
your marketplace offers: hourly, daily, or custom length. When modifying
the template, you or your developers can enable more than one seat per
time slot, either in general or for specific dates and times.

If your marketplace listings happen at a specific time or place instead
of at a repeated interval (e.g. concerts or events), you can set the
listing availability to be blocked by default. Providers can then create
availability exceptions to open availability for the day(s) of their
event and the desired number of seats. To set availability as blocked by
default, you need to set an availability plan with 0 seats across the
board.

Some examples:

- You can set multiple available spaces for the same sauna for every
  night.
- You can set available beds in a hostel room.
- You can set the maximum number of people that can participate in a
  yoga class depending on the day.
- You can determine the number of screens that can participate in an
  online cooking class.

## How do you decrease the available seats of a listing?

Most of the time, a listing's available seats will decrease through
bookings via transactions. The
[booking-related transaction process actions](/references/transaction-process-actions/#bookings)
allow defining your transaction process so that when a transaction is
initiated, a seat reservation is made as well. This prevents your users
from booking more seats than are available.

If the transaction completes, the seats are removed from the listing’s
or timeslot’s availability. If the transaction is cancelled, the seats
are released and other users will be able to book them. Find out more
about
[availability related transaction actions](/references/transaction-process-actions/#bookings).

You can also connect your Flex marketplace with third-party systems to
further manage seats. If bookings are made through another system, you
can sync this information using the Integration API and adjust listing
availability plans accordingly or override the plan with an exception.

Finally, providers could manually reduce the number of seats or block
their availability entirely for a specific time slot (date or hour)
directly from the marketplace interface. Similar to how they would
determine their initial availability.

Finally, providers could manually adjust their inventory directly from
the marketplace interface. Similar to how they would add inventory.

## Can listings be searched by available spots?

Yes! Listing search can be modified so that available seats are taken
into account. It's possible to search for listings that have desired
number of seats available on specific dates or times. For example:

- Find listings that have 2 seats available on next Friday.
- Find listings that have 5 seats available for two hours some time next
  week.

If a marketplace uses availability-based listing search, then listings
that don’t have enough spots available will be automatically filtered
out, even though they are available for a lower number of people in the
same timeframe.

## Can I manage stock or inventory of a listing with seats?

If you are looking to manage the stock or inventory of a listing, you
should take a look at
[stock management in Flex](/concepts/inventory-management/).
