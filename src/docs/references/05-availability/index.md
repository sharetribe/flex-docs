---
title: Listing availability management
slug: availability
updated: 2019-01-23
category: references
ingress: Reference documentation for listing availability management.
published: true
---

The listing availability management features of Flex allow providers to
define when (and when not) their listings are available for booking.
There are two different concepts related to availability management that
can be used in combination or separately:

- An **availability plan** can be defined for each listing. It comprises
  of general availability rules for each day of the week. For instance
  "available on Mondays and Thursdays".
- An **availability exception** overrides the availability plan for a
  concrete period of time. For instance "Available on 2018-11-25 and
  2018-11-26", "not available on 2018-11-30".

The availability plan and exceptions, together with booking information
can be combined to determine if a particular time range is available for
booking or not. For instance, the
[/timeslots/query](https://flex-docs.sharetribe.com/index.html#query-time-slots)
API endpoint returns availability information for future dates, taking
into account the listing's availability plan, exceptions and bookings.
In addition, your [transaction process](/background/transaction-engine/)
can automatically prevent bookings for unavailable time ranges.

## Seats

Both availability plans and availability exceptions use the concept of
_seats_ to define whether a particular time is available or not.
Currently Flex allows the number of seats to be only 0 or 1, meaning
unavailable and available for single booking, respectively. Each booking
currently consumes exactly one seat.

## Day-based availability management

Currently, day-based availability is supported, which works with both
daily and nightly bookings. For instance, an availability plan can
define that Mondays and Tuesdays are available for booking. For daily
bookings this means that dates that are a Monday or Tuesday can be
booked. For nightly bookings, this means that nights Monday-Tuesday and
Tuesday-Wednesday can be booked.

### Interpretation of availability exceptions

For day-based availability plans (currently the only supported type of
availability plan), it is recommended to create availability exceptions
with timestamps having 00:00:00 time in UTC.

Creating availability exceptions with arbitrary time is allowed, but
such exceptions are subject to the following interpretation rules in the
context of a listing with day-based availability plan:

- if the availability exception covers only partially a given date in
  UTC time zone, the availability exception is interpreted as **covering
  the entire date**
- if multiple availability exceptions cover partially a given UTC date,
  the **minimum number of seats** of all these availability exceptions
  is taken as the resulting number of available seats for that date,
  prior to taking any existing bookings into account.

#### **Example 1:**

An exception with start `2018-11-26T12:30:00.000+01` and end
`2018-11-27T10:25:00.000+01` is interpreted as if it were from
`2018-11-26T00:00:00.000Z` to `2018-11-28T00:00:00.000Z`

#### **Example 2:**

An exception with start `2018-11-26T00:30.000+01:00` and end
`2018-11-27T00:15:00.000+01:00` is interpreted as if it were from
`2018-11-25T00:00:00.000Z` to `2018-11-27T00:00:00.000Z`.

#### **Example 3:**

Given exception 1 from `2017-11-26T10:00:00.000Z` to
`2018-11-26T12:00:00.000Z` with 1 seat and exception 2 from
`2017-11-26T10:00:00.000Z` to `2018-11-26T12:00:00.000Z` with 0 seats,
this is interpreted as if single exception existed from
`2018-11-26T00:00:00.0Z` to `2018-11-27T00:00:00.000Z` with 0 seats.

## Related API endpoints

See the reference documentation for the following API endpoints for
details:

- [/own_listings/create](https://flex-docs.sharetribe.com/index.html#create-listing)
- [/own_listings/update](https://flex-docs.sharetribe.com/index.html#update-listing)
- [/availability_exceptions/\*](https://flex-docs.sharetribe.com/index.html#availability-exceptions)
- [/timeslots/query](https://flex-docs.sharetribe.com/index.html#query-time-slots)
