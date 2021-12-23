---
title: Enable time-based bookings into use
slug: enable-time-based-bookings-into-use
updated: 2021-12-23
category: cookbook-transaction-process
ingress:
  Time-based bookings and availability management enable low level fine
  tuning of possible booking models for listings.
published: true
---

## 1. Process change

To get started, the transaction process needs to be updated to support
time-based bookings. The required change is to add a `type` parameter
with value `time` to the `create-pending-booking` action. The process
also needs to be a unit-based process as calculating the quantity of
booked items based on the length of a time-based booking is not
supported.

Using Flex CLI, you can customise your transaction process. You should
have something like the following in your `process.edn` file:

```clojure
{:name :transition/request-payment,
 :actor :actor.role/customer,
 :actions
 [{:name :action/create-pending-booking,
   :config {:type :time}}
 {:name :action/privileged-set-line-items}
  {:name :action/stripe-create-payment-intent}],
 :to :state/pending-payment}
{:name :transition/request-payment-after-enquiry,
 :actor :actor.role/customer,
 :actions
 [{:name :action/create-pending-booking,
   :config {:type :time}}
 {:name :action/privileged-set-line-items}
  {:name :action/stripe-create-payment-intent}],
 :from :state/enquiry,
 :to :state/pending-payment}
```

To learn more about how to change the transaction process using Flex
CLI, see the
[Getting started with Flex CLI](/flex-cli/getting-started-with-flex-cli/)
tutorial.

## Option 1: Use a new Flex template FTW-hourly (recommended)

With the time-based transaction process, you can use
[FTW-hourly](https://github.com/sharetribe/ftw-hourly), a Flex Template
that supports time-based availability out of the box.
[Learn more about FTW-hourly](/ftw-introduction/ftw-hourly/).

## Option 2: Implement time-based availability in your own frontend application

If you choose to implement time-based availability in your own frontend
application (e.g. if your client app is created on top of FTW-daily)
there are couple of things you need to consider.

### Time-based availability plans

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
          {dayOfWeek: 'mon', seats: 3, startTime: '09:00', endTime: '17:00'},
          {dayOfWeek: 'tue', seats: 3, startTime: '09:00', endTime: '17:00'},
          {dayOfWeek: 'wed', seats: 3, startTime: '09:00', endTime: '11:00'},
          {dayOfWeek: 'wed', seats: 1, startTime: '12:30', endTime: '16:30'},
          {dayOfWeek: 'thu', seats: 3, startTime: '09:00', endTime: '17:00'},
          {dayOfWeek: 'fri', seats: 3, startTime: '09:00', endTime: '17:00'},
          {dayOfWeek: 'sat', seats: 8, startTime: '10:00', endTime: '15:00'},
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
[the API documentation](https://www.sharetribe.com/api-reference/marketplace.html#ownlisting-availability-plan).

**Note**: FTW-daily uses a day-based booking process and its
availability plan is not made editable. All the schedule-entries in the
[EditListingAvailabilityPanel](https://github.com/sharetribe/flex-template-web/blob/master/src/components/EditListingAvailabilityPanel/EditListingAvailabilityPanel.js)
component is set to "available" (`seats: 1`). FTW-hourly has edistable
availability plan.

As for creating time-based bookings, they are created just like any
other booking. The only limitations for start and end times are that the
end needs to be after the start and they both need to be divisible by 5
minutes.

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

For inspiration, see also the
[FTW-hourly](https://github.com/sharetribe/ftw-hourly) implementation.

### Time zone

With time-based bookings time zones play a larger role than with night-
and day-based ones. This is the case especially if your marketplace
operates on multiple time zones and there are listings that could be
booked from a different time zone as the one in which the listing is
located. In this case it could come in handy to take into account the
listing's
[availability plan time zone](https://www.sharetribe.com/api-reference/marketplace.html#listing-resource-format).
This way it is possible to implement the booking so that when the
booking takes place the customer and provider will have a shared
understanding when the booking starts.
