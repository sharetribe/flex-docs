---
title: Listing availability management
slug: availability
updated: 2019-10-24
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
  "available on Mondays and Thursdays", or "available on Tuesday,
  Wednesday and Friday from 9 AM to 6 PM".
- An **availability exception** overrides the availability plan for a
  concrete period of time. For instance "Available on 2018-11-25 and
  2018-11-26", "not available on 2018-11-30".

The availability plan and exceptions, together with booking information
can be combined to determine if a particular time range is available for
booking or not. For instance, the
[/timeslots/query](https://www.sharetribe.com/api-reference/index.html#query-time-slots)
API endpoint returns availability information for future dates, taking
into account the listing's availability plan, exceptions and bookings.
In addition, your
[transaction process](/background/transaction-process/) can
automatically prevent bookings for unavailable time ranges.

## Seats

Both availability plans and availability exceptions use the concept of
_seats_ to define whether a particular time is available or not. How
many seats a booking consumes depends on the `seats` attribute of a
booking. Having 0 seats in availability means that the listing is
unavailable for bookings during that time.

## Day-based availability management

Day-based availability works with both daily and nightly bookings. For
instance, an availability plan can define that Mondays and Tuesdays are
available for booking. For daily bookings this means that dates that are
a Monday or a Tuesday can be booked. For nightly bookings, this means
that nights Monday-Tuesday and Tuesday-Wednesday can be booked.

### Interpretation of availability exceptions and bookings

For day-based availability plans, it is recommended to create
availability exceptions with timestamps having 00:00:00 time in UTC.

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

If your transaction process uses time-based bookings, the bookings are
also subject to the same interpretation rules.

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

## Time-based availability management

Time-based availability can be used with time-based bookings. Time-based
availability plans can specify one or more time intervals for each day
of the week, and specify the time zone in which these times should be
interpreted. For instance, with time-based availability it is possible
to define that the listing is available on weekdays from 9 AM to 11AM
and from 1 PM to 6 PM. More information on how to set a time-based
availability plan for a listing can be found in the
[time-based bookings guide](/guides/how-to-take-time-based-bookings-into-use/).

> **Note:** By default,
> [FTW](https://github.com/sharetribe/flex-template-web/) is using
> [day-based availability](https://www.sharetribe.com/docs/references/availability/#day-based-availability-management).
> If you are planning to use
> [time-based availability](https://www.sharetribe.com/docs/references/availability/#time-based-availability-management)
> in your marketplace, you can start with
> [FTW-time](https://github.com/sharetribe/ftw-time), a beta version of
> the template supporting time-based availability out of the box.

### Timeslots, availability plans and exceptions

Timeslots are periods of time, which are available to be booked. E.g. if
you have set a plan with 1 available seat from 7-22 on Mondays, that
means that one person can book 5 minutes 07:00 - 07:05. Then the next
customer can only book times within the range of 07:05 - 22:00 on the
same day. So, the plan creates a weekly schedule, against which
availability exceptions and bookings are making reservations.

Exceptions can be used for restricting availability on a specific day.
E.g. if you have set availability to 07 - 22 on Mondays and you add an
exception 21-22 with seat 0 on Monday 28.10.2019, the timeslots query
returns timeslot 07-21 on that day if there are no bookings.

Exceptions can also be used for expanding the availability on a specific
day. E.g. if you have set availability to 07 - 22 on Mondays and you add
an exception 22-23 with seat 1 on Monday 28.10.2019, the timeslots query
returns timeslot 07-23 on that day if there are no bookings.

For time-based plans, both availability exceptions and bookings are
interpreted literally, i.e. covering the exact time intervals determined
by their start and end times.

## Booking display times

Booking display times are a handy tool for managing listing
availability. You can use them by passing `bookingDisplayStart` and
`bookingDisplayEnd` attributes when initiating a new transaction. This
will set `displayStart` and `displayEnd` attributes correspondingly to
the booking that is related to the initiated transaction. The display
times are used alongside with the normal `start` and `end` attributes
(defined by `bookingStart` and `bookingEnd` params in a transaction
initiation request) of a booking and they can be used to present
different start and end times to the customer than actully is booked.
See
[the booking resource format](https://www.sharetribe.com/api-reference/#booking-resource-format)
for a full list of booking attributes.

#### **Example:**

A provider needs 10 minutes of preparation time before each booking.
They can pass the following params regarding booking start when
initiating a transaction:

```json
bookingStart: "2018-04-20T12:20:00.000Z",
bookingDisplayStart: "2018-04-20T12:30:00.000Z"
```

The `displayStart` attribute will now indicate that the booking starts
at _12:30_ and this can be presented to the customer. However, the
listing is booked already from _12:20_, denoted by booking's `start`
attribute. Now the listing is not available for other bookings 10
minutes before this booking starts. If another customer wishes to book
this listing earlier, their booking will end at latest 10 minutes before
this booking.

## Related API endpoints

See the reference documentation for the following API endpoints for
details:

- [/own_listings/create](https://www.sharetribe.com/api-reference/index.html#create-listing)
- [/own_listings/update](https://www.sharetribe.com/api-reference/index.html#update-listing)
- [/availability_exceptions/\*](https://www.sharetribe.com/api-reference/index.html#availability-exceptions)
- [/timeslots/query](https://www.sharetribe.com/api-reference/index.html#query-time-slots)
- [/transactions/initiate](https://www.sharetribe.com/api-reference/#initiate-transaction)
