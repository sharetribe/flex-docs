---
title: Add buffer time to bookings in FTW-hourly
slug: bookings-with-buffer
updated: 2022-09-02
category: how-to-listing
ingress:
  This guide describes how to modify booking times in FTW-hourly to have
  a buffer after the time slots
published: true
---

For some services booked by the hour, the provider may want to reserve a
buffer time between bookings. For instance a yoga teacher may want to
have a break between private customers, or a massage therapist may need
to clear up and restock their therapy space before the next customer
arrives. You can set your marketplace to add these kinds of buffers by
default, so providers do not need to add availability exceptions
manually.

## Add a 15 minute buffer between one hour bookings

The simplest use case for buffered bookings is having one hour slots
that are bookable at the top of the hour, and adding 15 minutes
unbookable time after each slot. To achieve that, we will use the
booking's display time attribute.

```shell
└── src
    └── containers
        └── CheckoutPage
            └── CheckoutPage.duck.js
```

### Add display end time handling

The user can select one hour booking slots on the listing page. When an
order gets initiated, we want to set the selected end time as the
display time, and a new buffered end time as the actual booking time.
This way, the booking extends over both the customer's booking time and
the buffer, so that other customers can not book over the buffer.

```diff
+ import moment from 'moment';
 ...

export const initiateOrder = (orderParams, transactionId) => (dispatch, getState, sdk) => {
   dispatch(initiateOrderRequest());
 ...
+  const bufferEnd = moment(orderParams.bookingEnd).add(15, 'minutes').toDate();
+
+  const bufferedParams = {
+    ...orderParams,
+    bookingEnd: bufferEnd,
+    bookingDisplayEnd: orderParams.bookingEnd,
+    bookingDisplayStart: orderParams.bookingStart,
+  };

   const bookingData = {
     startDate: orderParams.bookingStart,
-    endDate: orderParams.bookingEnd,
+    endDate: bufferedParams.bookingEnd,
+    displayEnd: bufferedParams.bookingDisplayEnd,
   };

   const bodyParams = isTransition
     ? {
         id: transactionId,
         transition,
-        params: orderParams,
+        params: bufferedParams,
       }
     : {
         processAlias: config.bookingProcessAlias,
         transition,
-        params: orderParams,
+        params: bufferedParams,
       };
```

We also need to modify line item calculation. By default, the
transaction's price is calculated based on the booking's start and end
moments, however in this case we want to use the display end attribute
for the price calculation.

```shell
└── server
    └── api-util
        └── lineItems.js
```

We have already passed _displayEnd_ in _bookingData_, so we just need to
add handling for it in _lineItems.js_. Since the function is used both
with and without display end time, e.g. when calling
_api/transaction-line-items_, we need to accommodate both use cases.

```diff
exports.transactionLineItems = (listing, bookingData) => {
  const unitPrice = listing.attributes.price;
- const { startDate, endDate } = bookingData;
+ const { startDate, endDate, displayEnd } = bookingData;
 ...
  const booking = {
    code: bookingUnitType,
    unitPrice,
-   quantity: calculateQuantityFromHours(startDate, endDate),
+   quantity: calculateQuantityFromHours(startDate, (displayEnd || endDate)),
    includeFor: ['customer', 'provider'],
  };
```

### Set getStartHours to return correct available start times

Finally, we need to make sure that the start time slots only show valid
start times including the buffer – if someone has booked 6pm to 7pm,
then another customer cannot book 5pm to 6pm because there is not enough
availability for both the time slot and the buffer.

```shell
└── src
    └── util
        └── dates.js
```

First, add a constant for the buffer time and a full hour.

```diff
+ export const bufferMinutes = 15;
+ const hourMinutes = 60;
```

<extrainfo title="Also use bufferMinutes constant on CheckoutPage.duck.js">
It makes sense to also use bufferMinutes constant in CheckoutPage.duck.js, so you don't have to rely on hard-coded values.

```shell
└── src
    └── containers
        └── CheckoutPage
            └── CheckoutPage.duck.js
```

```diff
  import moment from 'moment';
+ import { bufferMinutes } from '../../util/dates';

  ...
-   const bufferEnd = moment(orderParams.bookingEnd).add(15, 'minutes').toDate();
+   const bufferEnd = moment(orderParams.bookingEnd).add(bufferMinutes, 'minutes').toDate();
```

</extrainfo>

Then, fix _getStartHours_ handling. By default, start hours and end
hours are determined from the same list, so _getStartHours_ removes the
final list item to allow for a single hour between the final start and
end times.

However, when the actual booking slot is longer than the displayed one,
we need to make sure that the interval between the final start and end
times can fit a buffered booking. Therefore, instead of removing a
single start time to fit a one hour booking slot, we remove as many
start times as it takes to fit a buffered hour before the final end
time.

```diff
export const getStartHours = (intl, timeZone, startTime, endTime) => {
  const hours = getSharpHours(intl, timeZone, startTime, endTime);
- return hours.length < 2 ? hours : hours.slice(0, -1);
+ const removeCount = Math.ceil((hourMinutes + bufferMinutes) / hourMinutes);
+ return hours.length < removeCount ? [] : hours.slice(0, -removeCount);
};
```

## Allow users to book buffered appointments at non-sharp hours

Having this kind of setup then means that the slots are, in practice,
bookable every two hours. If we do not want to leave extra gaps between
bookings beyond the buffer, we can set start times to repeat on the
buffer time cadence instead of hourly. That way, if someone books the 8
AM - 9 AM slot, the next available start time is 9.15 AM i.e. right
after the buffer.

In other words, we need to have start and end times at a different
cycle:

- start times at 15 minute increments i.e. customer can start their
  booking at any quarter hour, instead of at the top of the hour only
- end times at one hour increments, i.e. the customer can book one or
  more full hours only.

Time slot handling is done using a few helper functions in
src/util/dates.js

```shell
└── src
    └── util
        └── dates.js
```

- _getStartHours_ and _getEndHours_ return a list of timepoints that are
  displayed as the booking's possible start and end moments,
  respectively. They both use the same helper function _getSharpHours_
- _getSharpHours_, in turn, by default retrieves the sharp hours that
  exist within the availability time slot. It uses the
  _findBookingUnitBoundaries_ function, which is a recursive function
  that checks whether the current boundary (e.g. sharp hour) passed to
  it falls within the availability time slot.
  - If the current boundary is within the availability time slot, the
    function calls itself with the next boundary and cumulates the
    boundary results into an array.
  - If the current boundary does not fall within the availability time
    slot, the function returns the cumulated results from the previous
    iterations.
- _findBookingUnitBoundaries_ takes a _nextBoundaryFn_ parameter that it
  uses to determine the next boundary value to pass to itself.
- the function passed to _findBookingUnitBoundaries_ as _nextBoundaryFn_
  by default is _findNextBoundary_, which is what we need to modify
  first. The _findNextBoundary_ function increments the current boundary
  by a predefined value.

```js
export const findNextBoundary = (timeZone, currentMomentOrDate) =>
  moment(currentMomentOrDate)
    .clone()
    .tz(timeZone)
    .add(1, 'hour') // The default handling uses hours
    .startOf('hour') // By default, the time slot is rounded to the start of the hour
    .toDate();
```

### Add a custom rounding function for moment.js

FTW-hourly uses the [moment-timezone](https://momentjs.com/timezone/)
library to modify times and dates and convert them between the listing's
time zone and the user's time zone.

By default, the _findNextBoundary_ function uses
_moment.startOf('hour')_ to round the booking slots to the top of each
hour. However, since we are now dealing with minutes, we need to create
a custom rounding function to replace the _startOf('hour')_ function
call. When we add it to _moment.js_ using the prototype exposed through
_moment.fn_, we can chain it in the same place as the default
_startOf('hour')_ function.

This rounding function rounds to sharp hours when the buffer minutes
value is a factor of an hour, e.g. 15, 20 or 30 minutes.

```js
/**
 * Rounding function for moment.js. Rounds the Moment provided by the context
 * to the start of the specified time value in the specified units.
 * @param {*} value the rounding value
 * @param {*} unit time units to specify the value
 * @returns Moment rounded to the start of the specified time value
 */
moment.fn.startOfDuration = function(value, unit) {
  const ms = moment.duration(value, unit)._milliseconds;
  return moment(Math.floor(this / ms) * ms);
};
```

You will then need to use the new function to replace the built-in
_startOf()_ function.

We also need to calculate the increment of time to add to each time
boundary, i.e. how long are the stretches of time delineated by the
boundaries. To do that, we need an _isStart_ attribute, i.e. whether
we're dealing with start times or end times.

We also need isFirst, i.e. whether the boundary in question is the very
first one in the list. Since we're rounding to the buffer time (here: 15
minutes), we'll need to manually set the first time slot to correspond
to the start of the available time slot.

```diff
- export const findNextBoundary = (timeZone, currentMomentOrDate) =>
-   moment(currentMomentOrDate)
+ export const findNextBoundary = (
+   timeZone,
+   currentMomentOrDate,
+   isFirst,
+   isStart
+ ) => {
+   const increment = !isStart ? hourMinutes // For end time slots, add a full hour
+     : isFirst ? 0             // For the first start slot, use the actual start time
+     : bufferMinutes;          // For other start slots, use the buffer time
+
+   return moment(currentMomentOrDate)
      .clone()
      .tz(timeZone)
-     .add(1, 'hour')
-     .startOf('hour')
+     .add(increment, 'minute')
+     .startOfDuration(bufferMinutes, 'minute')
      .toDate();
+  };
```

### Add new parameters to helper functions

The _findNextBoundary_ function is called from the
_findBookingUnitBoundaries_ function, so we need to make sure the
_isStart_ and _isFirst_ parameters are passed correctly. The function
gets _findNextBoundary_ function as the _nextBoundaryFn_ parameter.

```diff
const findBookingUnitBoundaries = params => {
  const {
    cumulatedResults,
    currentBoundary,
    startMoment,
    endMoment,
    nextBoundaryFn,
    intl,
    timeZone,
+   isStart,
  } = params;

  if (moment(currentBoundary).isBetween(startMoment, endMoment, null, '[]')) {
  ...

+   // The nextBoundaryFn by definition cannot determine the first timepoint, since it
+   // is always based on a previous boundary, we pass 'false' as the 'isFirst' param
+   const isFirst = false;
+
    return findBookingUnitBoundaries({
      ...params,
      cumulatedResults: [...cumulatedResults, ...newBoundary],
-     currentBoundary: moment(nextBoundaryFn(timeZone, currentBoundary)),
+     currentBoundary: moment(nextBoundaryFn(timeZone, currentBoundary, isFirst, isStart)),
    });
  }
  return cumulatedResults;
};
```

The _findBookingUnitBoundaries_, in turn, is called from
_getSharpHours_. We need to pass the _isStart_ and _isFirst_ parameters
with the first currentBoundary definition in
_findBookingUnitBoundaries_, as well as add the _isStart_ parameter to
the _findBookingUnitBoundaries_ function call.

In addition, we need to use the actual start time instead of the one
millisecond before, which is used by default. This is necessary because
instead of adding an hour and rounding off an hour as in the default
implementation, we are now manually setting the start time to the
beginning of the available time slot.

```diff
- export const getSharpHours = (intl, timeZone, startTime, endTime) => {
+ export const getSharpHours = (intl, timeZone, startTime, endTime, isStart = false) => {
    if (!moment.tz.zone(timeZone)) {
  ...

-   const millisecondBeforeStartTime = new Date(startTime.getTime() - 1);
+   // For the first currentBoundary, we pass isFirst as true
+   const isFirst = true;

    return findBookingUnitBoundaries({
-     currentBoundary: findNextBoundary(timeZone, millisecondBeforeStartTime),
+     currentBoundary: findNextBoundary(timeZone, startTime, isFirst, isStart),
      startMoment: moment(startTime),
      endMoment: moment(endTime),
      nextBoundaryFn: findNextBoundary,
      cumulatedResults: [],
      intl,
      timeZone,
+     isStart,
    });
};

```

### Fix getStartHours and getEndHours handling

To get correct start times, we need to first pass _true_ as the
_isStart_ parameter from _getStartHours_ to _getSharpHours_.

In addition, we again need to make sure that even when selecting the
last start time, there is enough availability for the first timeslot.
Since the first time slots are now set at the buffer minute interval, we
divide the full booking time by _bufferMinutes_ to get the correct
_removeCount_ value.

```diff
export const getStartHours = (intl, timeZone, startTime, endTime) => {
- const hours = getSharpHours(intl, timeZone, startTime, endTime);
- const removeCount = Math.ceil((hourMinutes + bufferMinutes) / hourMinutes)
+ const hours = getSharpHours(intl, timeZone, startTime, endTime, true);
+ const removeCount = Math.ceil((hourMinutes + bufferMinutes) / bufferMinutes)
  return hours.length < removeCount ? [] : hours.slice(0, -removeCount);
};
```

Finally, we can simplify the end hour handling. Since the first entry is
determined in the _findNextBoundary_ function, we do not need to remove
it. Instead, we can just return the full list from _getSharpHours_.

```diff
  export const getEndHours = (intl, timeZone, startTime, endTime) => {
-   const hours = getSharpHours(intl, timeZone, startTime, endTime);
-   return hours.length < 2 ? [] : hours.slice(1);
+   return getSharpHours(intl, timeZone, startTime, endTime);
  };
```

Now, even if we have a booking from 6 AM to 7 AM with a 15 minute buffer
at the end, the next customer can start their booking at 7:15 AM.
Conversely, the previous booking can begin 4:45 AM and no later, so that
the buffered time slot can fit in before the already booked session.

![Booking start options buffered time slots](./quarter_hour_starts.png)
