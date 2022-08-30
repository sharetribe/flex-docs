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

## Add separate handling for first timeslot

- Sometimes, there are cases where you want to have a basic length for a
  booking and then different lengths for subsequent time slots. For
  instance, a 75 minute private yoga class with the option to extend it
  for 30 minutes at a time. In those cases, you need to create different
  handling for the first time slot, i.e. the first start and end
  boundaries.

- previous example contains the variable 'rounding' => let's add that
- since using the timeslotminutes value might cause issues in rounding,
  we determine the correct rounding minute amount by calculating the
  greatest common factorial using the Euclidean algorithm. If the
  default time slot is 30 minutes and the first slot is 75 minutes, the
  rounding factorial is 15.

```js
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
const rounding = gcd(timeSlotMinutes, firstSlotMinutes);
```

- determine the increment to add based on isStart and isFirst

```js
export const findNextBoundary = (
  timeZone,
  currentMomentOrDate,
  isStart,
  isFirst
) => {
  // Increment the time slot:
  const increment = !isFirst
    ? // - for non-first boundaries, use default time slot
      timeSlotMinutes
    : !isStart
    ? // - for the first end boundary, use firstSlotMinutes,
      // - and for the first start boundary, use 0 i.e. don't increment the start time value
      firstSlotMinutes
    : 0;
  return moment(currentMomentOrDate)
    .clone()
    .tz(timeZone)
    .add(increment, 'minutes')
    .startOfDuration(rounding, 'minutes')
    .toDate();
};
```

- pass `isStart` and `isFirst` params wherever the findNextBoundary
  function is used to determine the correct time increments for the time
  slots

```diff
// You can rename getSharpHours to getTimeSlotBoundaries for clarity,
// since it's no longer dealing with sharp hours. Also add the 'isStart' parameter.
- export const getSharpHours = (intl, timeZone, startTime, endTime) => {
+ export const getTimeSlotBoundaries = (intl, timeZone, startTime, endTime, isStart = false) => {
```

- remove the millisecondBeforeStartTime handling so that the increments
  and roundings get done correctly

```diff
- const millisecondBeforeStartTime = new Date(startTime.getTime() - 1);
  return findBookingUnitBoundaries({
+   // add isStart and isFirst params to determine first time slot handling
+   currentBoundary: findNextBoundary(timeZone, startTime, isStart, true),
    startMoment: moment(startTime),
    endMoment: moment(endTime),
    nextBoundaryFn: findNextBoundary,
```

```js
export const getStartHours = (intl, timeZone, startTime, endTime) => {
  // add isStart param to determine first boundary handling
  const hours = getTimeSlotBoundaries(intl, timeZone, startTime, endTime, true);
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
    const hours = getTimeSlotBoundaries(intl, timeZone, startTime, endTime);
-   return hours.length < 2 ? [] : hours.slice(1);
+   return hours.length < 1 ? [] : hours;
  };
```

## Use a single time slot longer than one hour

If your Flex application only has time slots beyond one hour, TODO
