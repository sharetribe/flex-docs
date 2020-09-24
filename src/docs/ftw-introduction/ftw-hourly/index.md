---
title: FTW hourly
slug: ftw-hourly
updated: 2019-11-21
category: ftw-introduction
ingress:
  This article introduces FTW-hourly and what's different compared to
  FTW-daily.
published: true
---

[FTW-hourly](https://github.com/sharetribe/ftw-hourly) is a Flex
Template for Web with support for time-based bookings and it's build
with service marketplaces in mind. This template introduces Yogatime - a
fictional marketplace for booking yoga classes from various yoga
teachers.

By default, FTW-hourly uses a transaction process
[preauth-unit-time-booking](https://github.com/sharetribe/flex-example-processes/tree/master/preauth-unit-time-booking)
which is a unit-based process and has value `time` in
`create-pending-booking` booking action.

> **Note:** `BookingDatesForm` and `EditListingAvailabilityForm`
> components have been removed from the template as they are heavily
> related to the day-based process. If you have started with FTW and you
> are planning to move to FTW-time, you should check if you have done
> any customization to these components.

## Handling time zones

With time-based bookings, time zones play a larger role than with night-
and day-based ones. This is the case especially if your marketplace
operates on multiple time zones and some listings could be booked from a
different time zone as the one in which the listing is located.

FTW-time introduces a new library `moment-timezone` for handling the
time zones when operating with dates. You need to use the
moment-timezone whenever you create new date objects. E.g. on
ListingPage the start and end of the month should have time zone so that
the moment-timezone library can handle e.g daylight savings.

The time zone of the listing will be saved to the listing's
[availability plan](https://www.sharetribe.com/api-reference/marketplace.html#ownlisting-availability-plan).
For that, we have a new component `FieldTimeZoneSelect` where the
provider can choose the time zone of the listing. By default, the
component will select browser's time zone.

## Booking the listing

In FTW-time, the default minimum duration of the booking is 1 hour and
the available booking times are starting on sharp hours (e.g. 9:00,
10:00, etc). Since the minimum duration of a timeslot is 5 minutes and
starting times can be customized to support different use-cases, you
might want to change the duration or timing of your timeslot-units.
Start this process from
[util/dates.js](https://github.com/sharetribe/ftw-time/blob/master/src/util/dates.js)
file. You should edit at least the `findNextBoundary`, `getSharpHours`
and `calculateQuantityFromHours` functions.

All the dates are displayed in the time zone of the listing. New
components `BookingTimeForm` and `FieldDateAndTimeInput` handle querying
the available timeslots and picking the booking start and end times.
Also, all the dates in the email templates are in the listing's time
zone. Listing's availability plan and the time zone are available in
transaction email context

![Booking panel](bookingPanel.png 'BookingPanel')

## Managing availability

In the EditListingWizard you can save and edit the listing's default
schedule. Each day can have several entries which mark bookable periods
of time. So, you can add holes to your business hours with entries like
09 - 12 and 14 - 18. You can also have days when the listing is not
available. If you want to enable bookings over the night you can set the
end time to 24.00 and start availability of the next day from 00:00.

Saving the default schedule is handled with the new
`EditListingAvailabilityPlanForm` inside `EditListingAvailabilityPanel`.
There is also a new component `FieldTimeZoneSelect` for saving the time
zone of the listing to availability plan.

![Availability plan](availabilityPlan.png 'Availability plan')

## Each provider can have only one listing

Because FTW-hourly has been build keeping the service marketplaces each
user can have only one listing by default. In Yogatime's context the
listing is handled as teacher profile. There are some changeds you need
to do to template if you want to enable multiple listings:

- Remove `allowOnlyOneListing` prop routing to `EditListingPage`
- Add link to `NewListingPage` e.g. to `Topbar`
- Add `ManageListingsPage` to routing and add link to that page e.g. to
  `UserNav`
- Change `OwnListingLink` to the link to user profile. Note that with
  `Avatar` component you can enable the profile link by removing
  `disableProfileLink` flag.

You can see all the changes we did when changing Saunatime to Yogatime
in this [pull request](https://github.com/sharetribe/ftw-time/pull/56).
