---
title: Modify booking time intervals in FTW-hourly
slug: modify-time-intervals
updated: 2022-08-29
category: how-to-listing
ingress:
  This guide describes how to modify booking time intervals in
  FTW-hourly
published: true
---

- availability time slots come from the API as a continuous stretch, and
  the client template splits them into bookable increments
- the default behavior is to have one hour booking intervals
- this how-to guide illustrates a use case where you can book listings
  in 30 minute increments.

## Set booking length to 30 minutes

- to start off, you'll want to create a constant for the time slots

```js
const timeSlotMinutes = 30;
```

- the default version uses moment.startOf('hour') to round the time
  slots
- However, since we're dealing with minutes, we'll need to
  - replace the startOf('hour') function call with a custom rounding
    extension function
- This rounding function rounds to sharp hours when the time slot
  minutes value is a factor of an hour, e.g. 15, 20 or 30 minutes. For
  other time slot minutes, the rounding may or may not match with a
  sharp hour.

```js
/**
 * Rounding extension function for moment.js. Rounds the Moment provided by the context
 * to the start of the specified time value in the specified units. Rounds to sharp hours
 * when the value is a factor of an hour (e.g. 10, 15, 20, 30 minutes).
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

```diff
export const findNextBoundary = (timeZone, currentMomentOrDate) =>
   moment(currentMomentOrDate)
     .clone()
     .tz(timeZone)
-    .add(1, 'hour')
-    .startOf('hour')
+    .add(timeSlotMinutes, 'minutes')
+    .startOfDuration(timeSlotMinutes, 'minutes')
     .toDate();
```

For listings with an hourly price, the function
calculateQuantityFromHours determines the correct quantity as a decimal
of full hours. However, if you want to set a price per minute, you will
need to modify calculateQuantityFromHours as well.

## Use a time slot longer than 30 minutes

If your Flex application has longer time slots than 30 minutes, you will
need to extend the previous steps to a more complex approach to make
sure the time slots show up correctly

- calculate rounding with the time slot and a full hour i.e. 60 minutes
  to get time slots aligning with sharp hours

- previous example contains the variable 'rounding' => let's add that
- since using the timeslotminutes value might cause issues in rounding,
  we determine the correct rounding minute amount by calculating the
  greatest common factorial using the Euclidean algorithm. If the
  default time slot is 30 minutes and the first slot is 75 minutes, the
  rounding factorial is 15.

```js
const timeSlotMinutes = 45;
const hourMinutes = 60;

/**
 * Calculate the greatest common divisor (gcd) of first timeslot length
 * and general timeslot length to determine rounding value using
 * the Euclidean algorithm (https://en.wikipedia.org/wiki/Euclidean_algorithm).
 */
const gcd = (a, b) => {
  return a ? gcd(b % a, a) : b;
};

/**
 * Define the rounding value.
 * If the first time slot is shorter than general time slot,
 * swap the parameters around so that the first parameter is the shorter one
 */
const rounding = gcd(timeSlotMinutes, hourMinutes);
```

- add isFirst param to findNextBoundary, and use the default time slot
  to all cases except isFirst to accommodate for rounding.

```diff
- export const findNextBoundary = (timeZone, currentMomentOrDate) =>
-   moment(currentMomentOrDate)
+ export const findNextBoundary = (
+   timeZone,
+   currentMomentOrDate,
+   isFirst = false
+ ) => {
+   const increment = isFirst ? 0 : timeSlotMinutes;
+   return moment(currentMomentOrDate)
      .clone()
      .tz(timeZone)
-     .add(timeSlotMinutes, 'minutes')
-     .startOfDuration(timeSlotMinutes, 'minutes')
+     .add(increment, 'minutes')
+     .startOfDuration(rounding, 'minutes')
      .toDate();
+ }
```

- pass `isFirst` params to the first findNextBoundary function so it's
  used to determine the correct time increments for the time slots. Also
  use millisecondAfterStartTime to account for rounding.

```diff
-   const millisecondBeforeStartTime = new Date(startTime.getTime() - 1);
+   const millisecondAfterStartTime = new Date(startTime.getTime() + 1)

    return findBookingUnitBoundaries({
-     currentBoundary: findNextBoundary(timeZone, millisecondBeforeStartTime),
+     // add isFirst param to determine first time slot handling
+     currentBoundary: findNextBoundary(timeZone, millisecondAfterStartTime, true),
      startMoment: moment(startTime),
      endMoment: moment(endTime),
```

## Add separate handling for first timeslot

- Sometimes, there are cases where you want to have a basic length for a
  booking and then different lengths for subsequent time slots. For
  instance, a 75 minute private yoga class with the option to extend it
  for 45 minutes at a time. In those cases, you need to create different
  handling for the first time slot, i.e. the first start and end
  boundaries.

```js
const timeSlotMinutes = 45;
const firstSlotMinutes = 75;

/**
 * Define the rounding value.
 * If the first time slot is shorter than general time slot,
 * swap the parameters around so that the first parameter is the shorter one
 */
const rounding = gcd(timeSlotMinutes, firstSlotMinutes);
```

- determine the increment to add based on isStart and isFirst

```diff
export const findNextBoundary = (
  timeZone,
  currentMomentOrDate,
  isFirst = false,
+ isStart = false
) => {
- const increment = isFirst ? 0 : timeSlotMinutes;
+ const increment = !isFirst
+   ? timeSlotMinutes   // Use the default booking length for non-first slots
+   : !isStart
+   ? firstSlotMinutes  // Use the first booking length for first end boundary
+   : 0;                // Use 0 for first start boundary
  return moment(currentMomentOrDate)
    .clone()
    ...
};
```

- Pass isStart from getStartHours to getSharpHours

```diff
- export const getSharpHours = (intl, timeZone, startTime, endTime) => {
+ export const getSharpHours = (intl, timeZone, startTime, endTime, isStart = false) => {
    if (!moment.tz.zone(timeZone)) {
...
    return findBookingUnitBoundaries({
-     currentBoundary: findNextBoundary(timeZone, millisecondAfterStartTime, true)
+     // add isFirst and isStart params to determine first time slot handling
+     currentBoundary: findNextBoundary(timeZone, millisecondAfterStartTime, true, isStart),
      startMoment: moment(startTime),

```

- by default, getStartHours and getEndHours basically retrieve the same
  list, but getStartHours slices off the last entry and getEndHours
  slices off the first entry
  - fix getStartHours handling => remove enough entries from the end so
    that the first time slot can be booked even from the last start
    moment

```diff
export const getStartHours = (intl, timeZone, startTime, endTime) => {
- const hours = getTimeSlotBoundaries(intl, timeZone, startTime, endTime);
+ const hours = getTimeSlotBoundaries(intl, timeZone, startTime, endTime, true);

- return hours.length < 2 ? hours : hours.slice(0, -1);
+ // Remove enough start times so that the first slot length can successfully be
+ // booked also from the last start time
+ const removeCount = Math.ceil(firstSlotMinutes / timeSlotMinutes)
+ return hours.length < 2 ? hours : hours.slice(0, -removeCount);
};
```

- fix getEndHours handling => return the full list since first entry is
  determined in the findNextBoundary function

```diff
  export const getEndHours = (intl, timeZone, startTime, endTime) => {
-   const hours = getSharpHours(intl, timeZone, startTime, endTime);
+   return getSharpHours(intl, timeZone, startTime, endTime);
  };
```
