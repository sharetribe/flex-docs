---
title: Transaction process actions
slug: transaction-process-actions
updated: 2021-09-16
category: references
ingress:
  This reference article lists all the available actions and their
  configuration options.
published: true
---

A transaction process contains transitions and each transition defines
an ordered list of 0 or more actions. Actions are instructions for the
transaction engine and define what happens when a transition is
executed. The ordering of the actions matters because they are executed
in the given order.

This is a reference for all the available actions with their
preconditions, parameters, and configuration options. With
**parameters** we mean values that are sent in the API calls to the
actions, and with **configuration options** we mean the options that are
set for the actions in the `process.edn` file. To learn more, see the
[Transaction process format](/references/transaction-process-format/)
reference article.

## Actions

### Transaction initialization

#### :action.initializer/init-listing-tx

**NOTE**: this action is implicit and must not be in the process
description.

Initialize a new transaction from a listing.

**Preconditions**:

- Listing with the given ID must exist
- Listing must have an author
- Customer (actor of the transaction) must be a valid user
- Author and customer must not be the same user

**Parameters**:

- `listingId`, UUID, mandatory

**Configuration options**: -

### Pricing

#### :action/privileged-set-line-items

Defines transaction price and breakdown. Sets given line items and
calculates totals for each line item and for the entire transaction.

Existing line items will be removed.

**Preconditions**: -

**Parameters**:

- `lineItems`: Collection of line items (max 50). Each line items has
  following fields:
  - `code`: string, mandatory, indentifies line item type (e.g.
    "line-item/cleaning-fee"), maximum length 64 characters.
  - `unitPrice`: money, mandatory
  - `lineTotal`: money
  - `quantity`: number
  - `percentage`: number (e.g. 15.5 for 15.5%)
  - `seats`: number
  - `units`: number
  - `includeFor`: array containing strings "customer" or "provider",
    default ["customer" ":provider" ]

Line item must have either `quantity` or `percentage` or both `seats`
and `units`.

`lineTotal` is calculated by the following rules:

- If `quantity` is provided, the line total will be
  `unitPrice * quantity`.
- If `percentage` is provided, the line total will be
  `unitPrice * (percentage / 100)`.
- If `seats` and `units` are provided the line item will contain
  `quantity` as a product of `seats` and `units` and the line total will
  be `unitPrice * units * seats`.

`lineTotal` can be optionally passed in. Will be validated against
calculated line total.

`includeFor` defines commissions. Customer commission is added by
defining `includeFor` array `["customer"]` and provider commission by
`["provider"]`.

`payinTotal` is calculated by the action and added to the transaction.
`payinTotal` equals to the sum of customer commission line totals and
other non-commission line totals. Must be zero or positive. _Note:_ Some
line-item configurations are not supported by the default Stripe payment
actions. If you use Stripe payment actions, payinTotal needs to be
greater than zero, and greater than or equal to payoutTotal. For more
details, refer to Stripe action documentation.

`payoutTotal` is calculated by the action and added to the transaction.
`payoutTotal` equals to the sum of provider commission line totals and
other non-commission line totals. Must be zero or positive.

Only one currency is allowed accross all fields defining money.

**Configuration options**: -

#### :action/calculate-tx-customer-commission

**Deprecated**: use `:privileged-set-line-items` to have full control of
the calculation and the line items

Calculates the customer commission, sets the transaction payin amount
and adds a `:line-item/customer-commission` line-item.

Subsequent executions will create new line items instead of modifying
the existing one. Commission calculations are based on
transaction/totalPrice and will accumulate the payinTotal. For example,
a total price of 100 EUR and two consequtive 10 % customer commissions
will result in an 120 EUR payin.

**Preconditions**:

- Transaction must have a total price
- All currencies must match the listing currency
- Min and max commissions need to be in correct order, i.e, min needs to
  be smaller than max

**Parameters**: -

**Configuration options**:

- `commission`: decimal, mandatory. Acts as a multiplier on the
  transaction total, e.g. `0.1M` for a 10% commission.
- `min`: a map with keys `:amount` and `:currency`, optional. Acts as a
  minimum commission, e.g. {:amount 2M, :currency "EUR"} for a 2EUR
  minimum.
- `max`: a map with keys `:amount` and `:currency`, optional. Acts as a
  maximum commission, e.g. {:amount 20M, :currency "EUR"} for a 20EUR
  maximum.

Where:

- `amount`, decimal, mandatory. The value of a monetary unit. A decimal
  followed with a `M`, e.g. 10M.
- `currency`, string, mandatory, The three letter currency code of a
  monetary unit, e.g. "EUR".

#### :action/calculate-tx-provider-commission

**Deprecated**: use `:privileged-set-line-items` to have full control of
the calculation and the line items

Calculates the provider commission, sets the transaction payout amount
and adds a `:line-item/provider-commission` line-item.

Subsequent executions will create new line items instead of modifying
the existing one. Commission calculations are based on
transaction/totalPrice and will accumulate the payoutTotal. For example,
a total price of 100 EUR and two consequtive 10 % provider commissions
will result in an 80 EUR payout.

Too large commission (i.e. a negative payout) will cause an error.

**Preconditions**:

- Transaction must have a total price
- All currencies must match the listing currency
- Min and max commissions need to be in correct order, i.e, min needs to
  be smaller than max

**Parameters**: -

**Configuration options**:

- `commission`: decimal, mandatory. Acts as a multiplier on the
  transaction total, e.g. `0.1M` for a 10% commission.
- `min`: a map with mandatory keys `:amount` and `:currency`, optional.
  Acts as a minimum commission, e.g. {:amount 2M, :currency "EUR"} for a
  2EUR minimum.
- `max`: a map with keys `:amount` and `:currency`, optional. Acts as a
  maximum commission, e.g. {:amount 20M, :currency "EUR"} for a 20EUR
  minimum..

Where:

- `amount`, decimal, mandatory. The value of a monetary unit. A decimal
  followed with a `M`, e.g. 10M.
- `currency`, string, mandatory, The three letter currency code of a
  monetary unit, e.g. "EUR".

#### :action/calculate-tx-customer-fixed-commission

**Deprecated**: use `:privileged-set-line-items` to have full control of
the calculation and the line items.

Calculates a fixed commission for customer, sets the transaction pay out
amount and adds a `:line-item/customer-fixed-commission` line-item.

Subsequent executions will create new line items instead of modifying
the existing one and will accumulate the `payinTotal`. For example, a
total price of 100 EUR and two consequtive 10 EUR customer fixed
commissions will result in an 120 EUR payin.

**Preconditions**:

- Transaction must have a total price
- Commission currency must match the listing currency

**Parameters**: -

**Configuration options**:

- `commission`: a map with mandatory keys `:amount` and `:currency`,
  mandatory. Acts as the fixed commission for a transaction, eg.
  `{:amount 10M :currency "EUR"}`.

Where:

- `amount`, decimal, mandatory. The value of a monetary unit. A decimal
  followed with a `M`, e.g. 10M.
- `currency`, string, mandatory, The three letter currency code of a
  monetary unit, e.g. "EUR".

#### :action/calculate-tx-provider-fixed-commission

**Deprecated**: use `:privileged-set-line-items` to have full control of
the calculation and the line items.

Calculates a fixed commission for provider, sets the transaction pay out
amount and adds a `:line-item/provider-fixed-commission` line-item.

Subsequent executions will create new line items instead of modifying
the existing one and will accumulate the `payoutTotal`. For example, a
total price of 100 EUR and two consequtive 10 EUR provider fixed
commissions will result in an 80 EUR payout.

Too large commission (i.e. a negative payout) will cause an error.

**Preconditions**:

- Transaction must have a total price
- Commission currency must match the listing currency

**Parameters**: -

**Configuration options**:

- `commission`: a map with mandatory keys `:amount` and `:currency`,
  mandatory. Acts as the fixed commission for a transaction, eg.
  `{:amount 10M :currency "EUR"}`.

Where:

- `amount`, decimal, mandatory. The value of a monetary unit. A decimal
  followed with a `M`, e.g. 10M.
- `currency`, string, mandatory, The three letter currency code of a
  monetary unit, e.g. "EUR".

#### :action/calculate-tx-nightly-total

**Deprecated**: use `:privileged-set-line-items` to have full control of
the calculation and the line items.

Calculates transaction total and provider commission from a nightly
booking.

#### :action/calculate-tx-total

**Deprecated**: use `:privileged-set-line-items` to have full control of
the calculation and the line items.

Same as `:action/calculate-tx-nightly-total`, kept for backward
compatibility.

#### :action/calculate-tx-daily-total

**Deprecated**: use `:privileged-set-line-items` to have full control of
the calculation and the line items.

Calculates transaction total and provider commission from a daily
booking.

#### :action/calculate-tx-daily-total-price

**Deprecated**: use `:privileged-set-line-items` to have full control of
the calculation and the line items

Calculates transaction total from a daily booking.

**Preconditions**:

- Transaction must have a booking
- Listing must have a price

**Parameters**: -

**Configuration options**: -

#### :action/calculate-tx-nightly-total-price

**Deprecated**: use `:privileged-set-line-items` to have full control of
the calculation and the line items

Calculates transaction total from a nightly booking.

**Preconditions**:

- Transaction must have a booking
- Listing must have a price

**Parameters**: -

**Configuration options**: -

#### :action/calculate-tx-total-daily-booking-exclude-start

**Deprecated**: use `:privileged-set-line-items` to have full control of
the calculation and the line items

Calculates transaction total from daily booking without start and end
dates. Can be used for price calculation of bookings where the boundary
dates are used for delivery and pickup.

**Preconditions**:

- Transaction must have a booking
- Listing must have a price
- Booking time must be at least three days as there needs to be one day
  between the excluded dates

**Parameters**: -

**Configuration options**: -

#### :action/calculate-tx-two-units-total-price

**Deprecated**: use `:privileged-set-line-items` to have full control of
the calculation and the line items.

Calculates transaction total from the quantity params and the price
multiplier configuration options.

`total = quantity1 * quantity1-price-multiplier + quantity2 * quantity2-price-multiplier`

**Preconditions**:

- Listing must have a price

**Parameters**:

- `quantity1`: non-negative integer (0, 1, 2, ...), mandatory
- `quantity2`: non-negative integer (0, 1, 2, ...), mandatory

**Configuration options**:

- `quantity1-price-multiplier`: decimal, defaults to 1.0M
- `quantity2-price-multiplier`: decimal, defaults to 1.0M

#### :action/calculate-tx-unit-total-price

**Deprecated**: use `:privileged-set-line-items` to have full control of
the calculation and the line items

Calculates transaction total from given quantity and listing price.

**Preconditions**:

- Listing must have a price

**Parameters**:

- `quantity`: positive integer (1, 2, 3, ...), mandatory

**Configuration options**: -

#### :action/calculate-full-refund

Calculates full refund for provider. Sets transaction pay in and pay out
amounts to zero and creates reverse line items that undo all the
previous line items.

This action must not be run more than once.

**Preconditions**: -

**Parameters**: -

**Configuration options**: -

#### :action/set-negotiated-total-price

Enables price negotiation. When the action is run for the first time it
adds a new line item that makes the transaction total to match with the
offer. Subsequent executions update the line item to match the counter
offer.

**Preconditions**: -

**Parameters**:

- `negotiatedTotal`, money, mandatory

**Configuration options**: -

#### :action/set-line-items-and-total

**Deprecated**: use `:privileged-set-line-items` to have full control of
the calculation and the line items.

Enables custom pricing. Sets given line items and calculates totals for
each line item and for the transaction.

Existing line items will be removed.

**Preconditions**: -

**Parameters**:

- `lineItems`: Collection of line items (max 50). Each line items has
  following fields:
  - `code`: string, mandatory, indentifies line item type (e.g.
    "cleaning-fee")
  - `unitPrice`: money, mandatory
  - `quantity`: number
  - `percentage`: number (e.g. 15.5 for 15.5%)
  - `seats`: number
  - `units`: number

Line item must have either `quantity` or `percentage` or both `seats`
and `units`. If `quantity` is provided, the line total will be
`unitPrice * quantity`. If `percentage` is provided, the line total will
be `unitPrice * (percentage / 100)`. If `seats` and `units` are provided
the line item will contain `quantity` as a product of `seats` and
`units` and the line total will be `unitPrice

- units \* seats`.

**Configuration options**: -

### Bookings

#### :action/create-pending-booking

Creates a new booking in `pending` state with given start and end time,
as long as the listing's availability for the given time range permits
the booking to be created. Optionally takes booking display start and
end times as well as seats.

Bookings in `pending` state make a reservation against the listing's
availability for the corresponding time slot with the given number of
seats.

**Preconditions**:

The listing must have sufficient availability for the time slot between
`bookingStart` and `bookingEnd` (exclusive).

**Parameters**:

- `bookingStart`: timestamp, mandatory.

  Used as the booking start time if the `type` is set to `:time`

  If the `type` is set to `:day`, the value is converted to UTC midnight
  and used as the booking start date.

  Marks the start of the timeslot that will be reserved in the listing's
  availability.

  Available in transaction process as `:time/booking-start` timepoint.

- `bookingEnd`: timestamp, mandatory

  Used as the booking end time if the `type` is set to `:time`

  If the `type` is set to `:day`, the value is converted to UTC midnight
  and used as the booking end date. Please note that the `bookingEnd` is
  exclusive.

  Marks the end of the timeslot that will be reserved in the listing's
  availability.

  Available in the transaction process as `:time/booking-end` timepoint.

- `bookingDisplayStart`: timestamp, optional.

  Moment of time that is displayed to a user as a booking start time.
  Does not affect availability of the listing.

  If not given, defaults to the value of `bookingStart` (normalized to
  UTC midnight, when `type` is `:day`).

  Available in the transaction process as `:time/booking-display-start`
  timepoint.

- `bookingDisplayEnd`: timestamp, optional.

  Moment of time that is displayed to a user as a booking end time. Does
  not affect availability of the listing.

  If not given, defaults to the value of `bookingEnd` (normalized to UTC
  midnight, when `type` is `:day`).

  Available in the transaction process as `:time/booking-display-end`
  timepoint.

- `seats`, integer, optional, defaults to 1

  The number of seats that the booking reserves in the listing's
  availability.

**Configuration options**:

- `type`: enum, one of `:day`, `:time`. Defaults to `:day`. If set to
  `:day` normalizes `bookingStart` and `bookingEnd` values to midnight
  UTC.

#### :action/create-proposed-booking

Creates a new booking in `proposed` state with given start and end time,
as long as the listing's availability for the given time range permits
the booking to be created. Optionally takes booking display start and
end times as well as seats.

Bookings in `proposed` state do not affect the listing's availability,
i.e. they do not reserve the time slot, until they are accepted using
the `:action/accept-booking`.

**Preconditions**:

The listing must have sufficient availability for the time slot between
`bookingStart` and `bookingEnd` (exclusive).

**Parameters**:

- `bookingStart`: timestamp, mandatory.

  Used as the booking start time if the `type` is set to `:time`

  If the `type` is set to `:day`, the value is converted to UTC midnight
  and used as the booking start date.

  Marks the start of the timeslot that will be reserved in the listing's
  availability, if the booking is subsequently accepted.

  Available in transaction process as `:time/booking-start` timepoint.

- `bookingEnd`: timestamp, mandatory

  Used as the booking end time if the `type` is set to `:time`

  If the `type` is set to `:day`, the value is converted to UTC midnight
  and used as the booking end date. Please note that the `bookingEnd` is
  exclusive.

  Marks the end of the timeslot that will be reserved in the listing's
  availability, if the booking is subsequently accepted.

  Available in the transaction process as `:time/booking-end` timepoint.

- `bookingDisplayStart`: timestamp, optional.

  Moment of time that is displayed to a user as a booking start time.
  Does not affect availability of the listing.

  If not given, defaults to the value of `bookingStart` (normalized to
  UTC midnight, when `type` is `:day`).

  Available in the transaction process as `:time/booking-display-start`
  timepoint.

- `bookingDisplayEnd`: timestamp, optional.

  Moment of time that is displayed to a user as a booking end time. Does
  not affect availability of the listing.

  If not given, defaults to the value of `bookingEnd` (normalized to UTC
  midnight, when `type` is `:day`).

  Available in the transaction process as `:time/booking-display-end`
  timepoint.

- `seats`, integer, optional, defaults to 1

  The number of seats that the booking reserves in the listing's
  availability.

**Configuration options**:

- `type`: enum, one of `:day`, `:time`. Defaults to `:day`. If set to
  `:day` normalizes `bookingStart` and `bookingEnd` values to midnight
  UTC.

#### :action/create-booking

**DEPRECATED**: use `:action/create-pending-booking` or
`:action/create-proposed-booking` instead.

Creates a new booking in `pending` state with given start and end time.
Optionally takes booking display start and end times as well as seats.

**Preconditions**: -

**Parameters**:

- `bookingStart`: timestamp, mandatory.

  Used as the booking start time if the `type` is set to `:time`

  If the `type` is set to `:day`, the value is converted to UTC midnight
  and used as the booking start date.

  Marks the start of the timeslot that will be reserved in the listing's
  availability.

  Available in transaction process as `:time/booking-start` timepoint.

- `bookingEnd`: timestamp, mandatory

  Used as the booking end time if the `type` is set to `:time`

  If the `type` is set to `:day`, the value is converted to UTC midnight
  and used as the booking end date. Please note that the `bookingEnd` is
  exclusive.

  Marks the end of the timeslot that will be reserved in the listing's
  availability.

  Available in the transaction process as `:time/booking-end` timepoint.

- `bookingDisplayStart`: timestamp, optional.

  Moment of time that is displayed to a user as a booking start time.
  Does not affect availability of the listing.

  If not given, defaults to the value of `bookingStart` (normalized to
  UTC midnight, when `type` is `:day`).

  Available in the transaction process as `:time/booking-display-start`
  timepoint.

- `bookingDisplayEnd`: timestamp, optional.

  Moment of time that is displayed to a user as a booking end time. Does
  not affect availability of the listing.

  If not given, defaults to the value of `bookingEnd` (normalized to UTC
  midnight, when `type` is `:day`).

  Available in the transaction process as `:time/booking-display-end`
  timepoint.

- `seats`, integer, optional, defaults to 1

  The number of seats that the booking reserves in the listing's
  availability.

**Configuration options**:

- `observe-availability?`: boolean, defaults to `false`. If set to
  `true`, prevents creating new bookings if the booking time is not
  available.

- `type`: enum, one of `:day`, `:time`. Defaults to `:day`. If set to
  `:day` normalizes `bookingStart` and `bookingEnd` values to midnight
  UTC.

#### :action/accept-booking

Marks booking as accepted.

Bookings in `accepted` state make a reservation against the listing's
availability for the corresponding time slot and number of seats.

**Preconditions**:

- Transaction must have a booking
- Booking must be in either `proposed` or `pending` state
- If the booking is in proposed state, the listing must have sufficient
  availability for the time slot defined by the booking.

**Parameters**: -

**Configuration options**: -

#### :action/update-booking

Update the details of a booking - start and end times, start and end
display times and seats. If one end of a time range is given, so must be
the other.

When updated, the booking remains in the same state it was before the
update.

Note that only the given attributes are updated and ones that are left
our remain unchanged. In particular, the booking display times are NOT
updated automatically when the booking start/end time is updated.

**Preconditions**:

- Transaction must have a booking
- Booking must be in either `proposed`, `pending` or `accepted` state
- The listing must have sufficient availability for the new (updated)
  time slot defined by the booking.

**Parameters**:

- `bookingStart`: timestamp, optional, must be given if `bookingEnd` is
  given

  Used as the booking start time if the booking `type` is `:time`.

  If the booking `type` is `:day`, the value is converted to UTC
  midnight and used as the booking start date.

  Marks the start of the timeslot that will be reserved in the listing's
  availability.

  Available in transaction process as `:time/booking-start` timepoint.

- `bookingEnd`: timestamp, optional, must be given if `bookingStart` is
  given

  Used as the booking end time if the booking `type` is `:time`.

  If the booking `type` is `:day`, the value is converted to UTC
  midnight and used as the booking end date. Please note that the
  `bookingEnd` is exclusive.

  Marks the end of the timeslot that will be reserved in the listing's
  availability.

  Available in the transaction process as `:time/booking-end` timepoint.

- `bookingDisplayStart`: timestamp, optional, must be given if
  `bookingDisplayEnd` is given

  Moment of time that is displayed to a user as a booking start time.
  Does not affect availability of the listing.

  If not given, defaults to the value of `bookingStart` (normalized to
  UTC midnight, when `type` is `:day`).

  Available in the transaction process as `:time/booking-display-start`
  timepoint.

- `bookingDisplayEnd`: timestamp, optional, must be given if
  `bookingDisplayStart` is given

  Moment of time that is displayed to a user as a booking end time. Does
  not affect availability of the listing.

  If not given, defaults to the value of `bookingEnd` (normalized to UTC
  midnight, when `type` is `:day`).

  Available in the transaction process as `:time/booking-display-end`
  timepoint.

- `seats`, integer, optional

  The number of seats that the booking reserves in the listing's
  availability.

**Configuration options**:

- `type`: enum, one of `:day`, `:time`. Defaults to `:day`. If set to
  `:day` normalizes `bookingStart` and `bookingEnd` values to midnight
  UTC. The value here should match the booking type set for the action
  that created the booking earlier in the transaction process.

#### :action/cancel-booking

Cancel an accepted booking.

**Preconditions**:

- Transaction must have a booking
- Booking must be in the accepted state

**Parameters**: -

**Configuration options**: -

#### :action/decline-booking

Decline a pending or proposed booking.

**Preconditions**:

- Transaction must have a booking
- Booking must be in either `pending` or `proposed` state

**Parameters**: -

**Configuration options**: -

### Stock reservations

#### :action/create-pending-stock-reservation

Creates a new stock reservation in `pending` state with given stock, as
long as the listing's current stock permits the reservation to be
created.

A stock reservation in `pending` state decreases the listing's stock - a
stock adjustment is created having the given `stockReservationQuantity`
(with a negative sign).

There can be at most one stock reservation per transaction.

**Preconditions**:

- The transaction must not already have a stock reservation.
- The listing must have sufficient stock available.

**Parameters**:

- `stockReservationQuantity`: positive integer, mandatory.

  The quantity of stock that is reserved from a listing's stock.

**Configuration options**: -

#### :action/create-proposed-stock-reservation

Creates a new stock reservation in `proposed` state with given stock, as
long as the listing's stock permits the reservation to be created.

A stock reservation in `proposed` state does not affect the listing's
available stock, i.e. the listing's stock is not decreased by the
proposed reservation quantity until the reservation is accepted using
the `:action/accept-stock-reservation` action.

There can be at most one stock reservation per transaction.

**Preconditions**:

- The transaction must not already have a stock reservation.
- The listing must have sufficient stock available.

**Parameters**:

- `stockReservationQuantity`: positive integer, mandatory.

  The quantity of stock for the reservation.

**Configuration options**: -

#### :action/accept-stock-reservation

Mark stock reservation as accepted.

A stock reservation in `accepted` state decreases the listing's stock.
That means that if the stock reservation was previously in a `proposed`
state, a new stock adjustment is created with the quantity of the stock
reservation (with a negative sign).

**Preconditions**:

- The transaction must have a stock reservation
- The stock reservation must be in either `proposed` or `pending` state
- If the stock reservation is in `proposed` state, the listing must have
  sufficient stock so that the stock reservation can be accepted.

**Parameters**:

**Configuration options**: -

#### :action/decline-stock-reservation

Decline a pending or proposed stock reservation.

If the stock reservation was previously in a `pending` state, a new
stock adjustment is created for the listing, reversing the adjustment
that resulted from the stock reservation being created. As a result, the
stock reservation will have no net impact on the listing's available
stock.

Note: It is recommended to place this action last in the transition's
action list whenever possible.

**Preconditions**:

- The transaction must have a stock reservation
- The stock reservation must be in either `proposed` or `pending` state

**Parameters**:

**Configuration options**: -

#### :action/cancel-stock-reservation

Cancel an accepted stock reservation.

A new stock adjustment is created for the listing, reversing the
adjustment that resulted from the stock reservation being created or
accepted. As a result, the stock reservation will have no net impact on
the listing's available stock.

Note: It is recommended to place this action last in the transition's
action list whenever possible.

**Preconditions**:

- The transaction must have a stock reservation
- The stock reservation must be in `accepted` state

**Parameters**:

**Configuration options**: -

### Reviews

#### :action/post-review-by-customer

Action for customer to post a review of provider.

The review is left in pending state. Executing `:action/publish-reviews`
will make them publicly available.

**Preconditions**:

- Transaction must not be reviewed by customer already

**Parameters**:

- `reviewRating`, integer from 1 to 5, mandatory
- `reviewContent`, written review, string, mandatory

**Configuration options**: -

#### :action/post-review-by-provider

Action for provider to post a review of customer.

The review is left in pending state. Executing `:action/publish-reviews`
will make them publicly available.

**Preconditions**:

- Transaction must not be reviewed by provider already

**Parameters**:

- `reviewRating`, integer from 1 to 5, mandatory
- `reviewContent`, written review, string, mandatory

**Configuration options**: -

#### :action/publish-reviews

Action to publish any reviews in the transaction.

**Preconditions**: -

**Parameters**: -

**Configuration options**: -

### Extended data

#### :action/reveal-customer-protected-data

Merge customer protected data into transaction protected data.

**Preconditions**: -

**Parameters**: -

**Configuration options**:

- `key-mapping`: map (keyword -> keyword), optional

  Defines which keys are revealed to the transaction. Also can be used
  to rename keys so that the transaction's protected data will use
  different keys than the user's protected data does. For example,the
  following config will reveal customer's phoneNumber attribute to the
  transaction and rename it to customerPhoneNumber:

  ```
  {:key-mapping {:phoneNumber :customerPhoneNumber}}
  ```

  More than one key can be revealed at the same time:

  ```
  {:key-mapping {:phoneNumber :customerPhoneNumber
                 :address :customerAddress}}
  ```

  Renaming is optional. If you wish to keep the same key, you can repeat
  it as the value:

  ```
  {:key-mapping {:address :address}}
  ```

#### :action/reveal-provider-protected-data

Merge provider protected data into transaction protected data.

**Preconditions**: -

**Parameters**: -

**Configuration options**:

- `key-mapping`: map (keyword -> keyword), optional

  Defines which keys are revealed to the transaction. Also can be used
  to rename keys so that the transaction's protected data will use
  different keys than the user's protected data does. For example,the
  following config will reveal provider's phoneNumber attribute to the
  transaction and rename it to providerPhoneNumber:

  ```
  {:key-mapping {:phoneNumber :providerPhoneNumber}}
  ```

  More than one key can be revealed at the same time:

  ```
  {:key-mapping {:phoneNumber :providerPhoneNumber
                 :address :providerAddress}}
  ```

  Renaming is optional. If you wish to keep the same key, you can repeat
  it as the value:

  ```
  {:key-mapping {:address :address}}
  ```

#### :action/update-protected-data

Merge given data to the protected data of the transaction.

**Preconditions**: -

**Parameters**:

- `protectedData`: JSON object, max 50KB, optional

**Configuration options**: -

#### :action/privileged-update-metadata

Merge given data into the metadata of the transaction. This action
requires that the transition is made from a trusted context.

**Preconditions**: -

**Parameters**:

- `metadata`: JSON object, max 50KB, optional

**Configuration options**: -

### Stripe integration

#### :action/stripe-create-payment-intent

Action for creating a Stripe PaymentIntent for the transaction. This
action supports card payments or equivalent (such as using wallets like
Google Pay and Apple Pay).

Payment Intents are the main supported way to collect payments.
Transaction processes need to use them especially if they want to be
SCA-compatible.

After the PaymentIntent is created, it's ID and client secret are
temporarily accessible in the Flex transaction protected data under the
`stripePaymentIntents` key in the following form:

```json
{
  "default": {
    "stripePaymentIntentId": "pi_1EXSEzLSea1GQQ9x5PnNTeuS",
    "stripePaymentIntentClientSecret": "pi_1EXSEzLSea1GQQ9x5PnNTeuS_secret_xxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

Client applications can use the PaymentIntent client secret in order to
handle payment and confirm the PaymentIntent client-side. The
`stripePaymentIntents` key is removed from the protected data once the
`:action/stripe-confirm-payment-intent` is used.

**Preconditions**:

- The transaction must already have pricing information (i.e. payin and
  payout totals) calculated.
- The calculated payin must be greater than zero
- The calculated payin must be greater than or equal to the payout
- If `:use-customer-default-payment-method?` is set `true`, customer
  must have Stripe Customer and default payment method set.

**Parameters:**

- `paymentMethod`, string, optional. Stripe PaymentMethod ID of payment
  method to be used in the payment. If not given, client is responsible
  for attaching a PaymentMethod to the PaymentIntent via e.g. Stripe.js
  SDK.
- `setupPaymentMethodForSaving`, boolean, optional. If set to true, the
  PaymentIntent is created in such a way so that the PaymentMethod used
  in the payment can be later attached to a Stripe Customer. Otherwise,
  the PaymentMethod (if new) can not be used in any other way again
  after the payment. After payment is done via the transaction process,
  the client can use Marketplace API operations
  `/stripe_customer/add_payment_method` or `/stripe_customer/create` to
  attach the payment method to a Customer or create a new Customer if
  one didn't exist.

**Configuration options:**

- `:use-customer-default-payment-method?`, boolean, optional. If set to
  `true`, the payment intent is created using the Customer's default
  payment method and it is created as an off-session payment in Stripe
  (i.e. customer not present). Intended to be used in transitions where
  customer is not present (i.e. delayed transitions, or ones triggered
  by operator or provider). This tells Stripe to attempt to exempt the
  payment from SCA. However, the bank in question may still require
  authentication. If the bank requires authentication from the customer,
  or declines the charge for any reason, the Stripe API call will fail
  and the transition using this action will fail. The action also
  automatically confirms the payment intent, i.e.
  `:action/stripe-confirm-payment-intent` must not be included in this
  or subsequent transitions.

#### :action/stripe-create-payment-intent-push

Action for creating a Stripe Payment Intent for use with synchronous
push payment methods. The following payment methods are supported:

- Alipay
- Bancontact
- EPS
- giropay
- iDEAL
- Przelewy24

After the PaymentIntent is created, it's ID and client secret are
temporarily accessible in the Flex transaction protected data under the
`stripePaymentIntents` key in the following form:

```json
{
  "default": {
    "stripePaymentIntentId": "pi_1EXSEzLSea1GQQ9x5PnNTeuS",
    "stripePaymentIntentClientSecret": "pi_1EXSEzLSea1GQQ9x5PnNTeuS_secret_xxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

Client applications can use the PaymentIntent client secret in order to
handle payment client-side. Typically that involes using Stripe.js SDK
to attach a payment method and handle the bank redirect where the
customer confirms the payment. The `stripePaymentIntents` is removed
from the protected data once the `:action/stripe-confirm-payment-intent`
is used.

**IMPORTANT** Payments with synchronous push payment methods are
captured and made in full immediately when confirmed by the customer via
their bank or app and unlike card payments there is no preauthorization
stage. After the payment is made, it can only be reversed with a full
refund using the `:action/stripe-refund-payment`. Unlike cancelling a
preauthorization, creating a full refund does not refund Stripe's own
payment processing fees to the Stripe platform account. Therefore, it is
recommended that the transaction process takes that into account.
Typically, this means that the transaction process is some form of
"instant booking" where provider does not need to accept the booking at
all, or alternatively a process where the provider accepts the booking
before the payment is made.

**Preconditions**:

- The transaction must already have pricing information (i.e. payin and
  payout totals) calculated.
- The calculated payin must be greater than zero
- The calculated payin must be greater than or equal to the payout

**Parameters:**

- `paymentMethodTypes`, array of strings, mandatory. List of payment
  method types that are allowed to be used to complete this payment
  intent. Must be one or more of the following: `alipay`, `bancontact`,
  `eps`, `giropay`, `ideal`, `p24`.
- `paymentMethod`, string, optional. Stripe PaymentMethod ID of payment
  method to be used in the payment. If not given, client is responsible
  for attaching a PaymentMethod to the PaymentIntent via e.g. Stripe.js
  SDK.

**Note** that the allowed payment method types are passed as transition
parameters. If implementations wish to strictly validate which payment
methods are allowed to fulfill a payment, use a privileged transition
and validate the set of allowed payment methods in your server.

**Configuration options:** -

#### :action/stripe-confirm-payment-intent

Action for confirming payment intent that is in pending state.

If the payment intent was created with
`:action/stripe-create-payment-intent` (a card payment), a
preauthorization is placed on the card. The payment then can be captured
in full by using `:action/stripe-capture-payment-intent` or the
preauthorization can be released by using
`:action/stripe-refund-payment`.

**IMPORTANT** On the other hand, payments with synchronous push payment
methods (created with `:action/stripe-create-payment-intent-push`) are
captured and made in full immediately when confirmed by the customer via
their bank or app and unlike card payments there is no preauthorization
stage. After the payment is made, it can only be reversed with a full
refund using `:action/stripe-refund-payment`. Unlike cancelling a
preauthorization, creating a full refund does not refund Stripe's own
payment processing fees to the Stripe platform account. Therefore, it is
recommended that the transaction process takes that into account.
Typically, this means that the transaction process is some form of
"instant booking" where provider does not need to accept the booking at
all, or alternatively a process where the provider accepts the booking
before the payment is made.

**Preconditions**:

- Transaction must have a payment created with
  `:action/stripe-create-payment-intent` or
  `:action/stripe-create-payment-intent-push`.

**Parameters:** -

**Configuration options:** -

#### :action/stripe-capture-payment-intent

Action for capturing a confirmed Stripe PaymentIntent. If the
PaymentIntent was created with
`:action/stripe-create-payment-intent-push`, the PaymentIntent is
captured automatically already when the payment is confirmed and this
action will have no effect.

**Preconditions:**

- Transaction must have a payment that has been confirmed with
  `:action/stripe-confirm-payment-intent`
- Provider must have connected Stripe account

**Parameters:** -

**Configuration options:** -

#### :action/stripe-create-payout

Create pay out to external bank account. The managed account must have
sufficient available balance.

**Preconditions**:

- Transaction must have pay-out value set
- Transaction must have a Stripe transfer

**Parameters**: -

**Configuration options**: -

#### :action/stripe-refund-charge

**DEPRECATED**: same as `:action/stripe-refund-payment`, use that
instead

#### :action/stripe-refund-payment

Refund (in full) a Stripe payment. Supports both cancelling a
PaymentIntent that has not yet been captured, as well as issuing a
Stripe refund for the charge if the PaymentIntent was captured.

**Preconditions**:

- The transaction must have a payment created with either
  `:action/stripe-create-payment-intent` or
  `:action/stripe-create-payment-intent-push`
- The transaction must not yet have passed through a transition using
  `:action/stripe-create-payout`

**Parameters**: -

**Configuration options**: -

### Testing

#### :action/fail

Action that always fails. Useful for testing.

**Preconditions**: -

**Parameters**: -

**Configuration options**: -
