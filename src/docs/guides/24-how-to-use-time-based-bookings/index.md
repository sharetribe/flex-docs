---
title: How to take time-based bookings into use
slug: how-to-take-time-based-bookings-into-use
updated: 2019-04-18
category: guides
ingress:
  Time-based bookings and availability management enable low level fine
  tuning of possible booking models for listings.
published: true
---

## 1. Process change

To get started, the transaction process needs to be updated to support
time-based bookings. The required change is to add a `type` parameter
with value `time` to the `create-booking` action. The process also needs
to be a unit-based process as calculating the quantity of booked items
based on the length of a time-based booking is not supported. In order
to update your process to match these requirements,
[contact the Sharetribe support](mailto:flex-support@sharetribe.com) and
ask that this adjustment is made to your process.

> Note that filtering a listings query by availability is not yet
> available when using time-based bookings and availability. When taking
> time-based availability into use, you should remove the date filter
> from search page. See
> [the listings query endpoint reference documentation](https://www.sharetribe.com/api-reference/#query-listings)
> for more information.

## 2. Time-based availability plans

Listings that are intended to be booked using the time-based booking
type need to have a time-based availability plan. If a time-based
availability plan is not provided for a listing, the Flex API defaults
to a day-based plan, which will not allow time-based bookings.
Therefore, a time-based plan is required for time-based listings.

The availability plan is passed as parameter to the API when a listing
is created or updated. The following code passes a time-based
availability plan to the API using the
[Flex JavaScript SDK](https://github.com/sharetribe/flex-sdk-js):

<!-- prettier-ignore -->
```js
sdk.ownListings
  .create(
    {
      title: 'Cyclocross bike',
      description: 'A steady gravel grinder',
      geolocation: new LatLng(40.64542, -74.08508),
      availabilityPlan: {
        type: 'availability-plan/time',
        timezone: 'America/New_York',
        entries: [
          {dayOfWeek: 'mon', seats: 1, startTime: '09:00', endTime: '17:00'},
          {dayOfWeek: 'tue', seats: 1, startTime: '09:00', endTime: '17:00'},
          {dayOfWeek: 'wed', seats: 1, startTime: '09:00', endTime: '11:00'},
          {dayOfWeek: 'wed', seats: 1, startTime: '12:30', endTime: '16:30'},
          {dayOfWeek: 'thu', seats: 1, startTime: '09:00', endTime: '17:00'},
          {dayOfWeek: 'fri', seats: 1, startTime: '09:00', endTime: '17:00'},
          {dayOfWeek: 'sat', seats: 1, startTime: '10:00', endTime: '15:00'},
        ],
      },
      publicData: {
        address: {
          city: 'New York',
          country: 'USA',
          state: 'NY',
          street: '230 Hamilton Ave',
        },
        category: 'road',
        gears: 22,
        rules: 'This is a nice, bike! Please, be careful with it.',
      },
      price: new Money(2290, 'USD'),
      images: [new UUID('5caede66-e4e2-4f5b-90e4-9e3f58fc7fd8')],
    },
    {
      expand: true,
      include: ['images'],
    }
  )
  .then(response => {
    // handle response
  });
```

For more information about the plan attributes, see
[the API documentation](https://www.sharetribe.com/api-reference/#ownlisting-availability-plan).
By default the Flex Template for Web (FTW) defines a day-based plan for
all listings in the
[EditListingAvailabilityPanel](https://github.com/sharetribe/flex-template-web/blob/master/src/components/EditListingAvailabilityPanel/EditListingAvailabilityPanel.js)
component.

As for creating time-based bookings, they are created just like any
other booking. The only limitations for start and end times are that the
end needs to be after the start and they both need to be divisible by 5
minutes.

## 3. A few things to consider

### Transaction processes and listing availability plans

A time-based availability plan needs to be explicitly declared for a
listing as the booking type depends on the transaction process like
[section 1.](#1-process-change) mentioned. However, listings are not
tied to any process so the availability plan needs to be defined in the
listing itself.

### User interface changes for time-based bookings

To effectively use time-based bookings, a user interface is required for
managing the availability plan and exceptions of a listing and for
defining the booking length.

At the moment, Flex Template for Web (FTW) does not provide an example
user interface for initiating a booking shorter than one day or for
managing time-based availability exceptions or plans. Thus, in order to
use time-based bookings, you will need to implement these parts of the
user interface yourself.

In the future, we plan to ship a template app that covers time-based
bookings too.

### Timezone

With time-based bookings timezones play a larger role than with night-
and day-based ones. This is the case especially if your marketplace
operates on multiple timezones and there are listings that could be
booked from a different timezone as the one in which the listing is
located. In this case it could come in handy to store the listing's
timezone into [public data](/references/extended-data/). This way it is
possible to implement the booking so that when the booking takes place
the customer and provider will have a shared understanding when the
booking starts.
