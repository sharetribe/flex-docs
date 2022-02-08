---
title: Transaction process time expressions
slug: transaction-process-time-expressions
updated: 2022-02-08
category: references
ingress:
  This reference article describes the time expressions used in the
  transaction process.
published: true
---

Time expressions can be used both with transitions and notifications to
delay the execution. The Flex transaction engine exposes a set of
timepoints that you can tie delays to as well as a small set of
functions to further control the exact timing. The basic structure of a
time expression is a map from function name to a list (vector) of
function parameters:
`{:fn/function-name [function-param1 function-param2]}`. For example:
`{fn/timepoint [:time/booking-end]`.

When a delayed transition or notification is scheduled, it will execute
at the resulting time. However, if the transition moves forward before
the scheduled moment, the operation is automatically cancelled. This way
you can send a reminder notification or schedule an automatic
cancellation after a certain time period that will be executed only in
the case that nobody takes action before that. Also, if the scheduled
time is in the past the operation will execute immediately. By wrapping
the time expression with `:fn/ignore-if-past` you can instead ignore
operations when the scheduled time is in the past.

Note that your transaction process can have several automatic
transitions _scheduled_ for a state, but only one automatic transition
_executed_ for a state. You may have e.g. one automatic transition
scheduled to execute 1 day after first entering the state, and another
scheduled to execute 7 days before a booking starts. The transaction
that gets executed is the one whose time point is matched first.
However, if the first transition fails for some reason, no further
automatic transitions get executed from the state.

To learn more how to use time expression in the transaction process, see
the
[Transaction process format](/references/transaction-process-format/)
reference article.

## Time functions

| Fn                   | Arguments                                | Description                                                                                                                                                           | Example                                                                                           |
| -------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `:fn/timepoint`      | timepoint name + timepoint args (if any) | Returns the timestamp of a timepoint in the process.                                                                                                                  | `{:fn/timepoint [:time/first-entered-state :state/state-name]}`                                   |
| `:fn/period`         | Period expression, string                | A timespan that can be added or substracted.                                                                                                                          | `{:fn/period ["PT15M"]}`                                                                          |
| `:fn/min`            | Two or more timestamps.                  | Returns the smallest (earliest) of all given timestamps.                                                                                                              | `{:fn/min [{:fn/timepoint [:time/booking-start]} {:fn/timepoint [:time/booking-display-start]}]}` |
| `:fn/plus`           | A timestamp + 1 or more timespans        | Returns the timestamp with all the timespans added to it.                                                                                                             | `{:fn/plus [{:fn/timepoint [:time/booking-start]} {:fn/period "P1D"}]}`                           |
| `:fn/minus`          | A timestamp + 1 or more timespans        | Returns the timestamp with all the timespans substracted from it.                                                                                                     | `{fn/minus [{:fn/timepoint [:time/booking-end]} {:fn/period "P2D"}]`:}                            |
| `:fn/ignore-if-past` | A timestamp                              | Returns the given timestamp as is unless it's in the past, in which cases returns nothing. Returning nothing from a time expression cancels scheduling the operation. | `{:fn/ignore-if-past [{:fn/timepoint [:time/booking-start]}]}`                                    |

The time functions can be nested freely.

## Period expressions

The function `:fn/period` accepts an ISO 8601 duration as string. For
more about the ISO 8601 duration format see:
https://en.wikipedia.org/wiki/ISO_8601#Durations

## Timepoints

| Timepoint                     | Arguments                   | Description                                                                                                                                      | Example                                                                  |
| ----------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `:time/tx-initiated`          | -                           | The timestamp for when the transaction was initiated.                                                                                            | `{:fn/timepoint [:time/tx-initiated]}`                                   |
| `:time/first-entered-state`   | State name as keyword.      | The timestamp when the process entered the given state for the first time. Processes may contain loops so a state can be entered multiple times. | `{:fn/timepoint [:time/first-entered-state :state/state-name]}`          |
| `:time/first-transitioned`    | Transition name as keyword. | The timestamp when the process executed the given transition successfully for the first time.                                                    | `{:fn/timepoint [:time/first-transitioned :transition/transition-name]}` |
| `:time/booking-start`         | -                           | The booking start timestamp.                                                                                                                     | `{:fn/timepoint [:time/booking-start]}`                                  |
| `:time/booking-end`           | -                           | The booking end timestamp.                                                                                                                       | `{:fn/timepoint [:time/booking-end]}`                                    |
| `:time/booking-display-start` | -                           | The booking display start timestamp.                                                                                                             | `{:fn/timepoint [:time/booking-start]}`                                  |
| `:time/booking-display-end`   | -                           | The booking display end timestamp.                                                                                                               | `{:fn/timepoint [:time/booking-end]}`                                    |

A booking always has start and end times. You may optionally specify
display start and display end times via transition parameters. Start and
end times are used by all actions that automatically calculate prices
based on booking length. The automatic availability management also
relies on start and end times. The display versions of the start and end
times are just for showing to users in the UI but you can additionally
use them in time expressions and transaction email templates. Finally,
if display times are not specified via transition params they default to
booking start and end times.
