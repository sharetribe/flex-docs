---
title: Change transaction process in Sharetribe Web Template
slug: change-transaction-process-in-ftw
updated: 2022-11-22
category: how-to-transaction-process
ingress:
  This guide describes how to customize Sharetribe Web Template to use a
  new transaction process.
published: true
---

Sharetribe Web Template defines four transaction processes by default:
daily bookings, nightly bookings, hourly bookings, and product sales
processes. The template is created to support states and transitions
defined in those processes.

How the transaction process works behind the Marketplace API depends on
how your process is customised in our backend. To customise the
transaction process in the backend, you should use Flex CLI. See the
[Getting started with Flex CLI](/introduction/getting-started-with-flex-cli/)
tutorial to get familiar with the tool.

If you have changed the transaction process in your marketplace, or
added a new one to use in parallel with the existing ones, you should
check if your client app needs to be updated to match this different
transaction process. You can read more about how these processes work
from a background info article about the
[transaction process](/concepts/transaction-process/).

The following guide will help you to customise the process flow in FTW
to match the process in our backend.

## 1. Add the new transaction process configuration

The
[src/config/configListing.js](https://github.com/sharetribe/web-template/blob/main/src/config/configListing.js)
file lists the listing types actively used by the template, as well as
the transaction processes related to those types. You need to add a
configuration for a new transaction process. You can either comment out
the previous active process definitions (if you only want to use the new
process) or leave them as they are (if you want to allow using multiple
processes in the same application).

```js
  {
    listingType: 'nightly-booking',
    label: 'Nightly booking',
    transactionType: {
      process: 'negotiated-booking',
      alias: 'negotiated-booking/release-1',
      unitType: 'night',
    },
```

The `alias` variable should point to the correct alias. You need to
check from Console which process and process version your client app
should support. All available transaction process aliases can be found
in the
[Build section](https://flex-console.sharetribe.com/transaction-processes)
in Console.

The `unitType` specifies what kind of units the web app is dealing with.
The client template recognises and handles four unit types by default:
**day**, **night**, **hour**, and **item**.

<info>

The Flex engine can handle other unit types besides the four default
ones. If you use a unit type outside the defaults, you need to add
custom handling for it in e.g. line item calculation, order handling,
and email templates.

</info>

## 2. Update the relevant files in src/transactions folder

Supported transaction processes are also defined in the files found in
**src/transactions** folder. In all cases, you will need to update the
**transaction.js** file to include your new process definition.

```shell
└── src
    └── transactions
        └── transaction.js
        ...

```

```js
// Then names of supported processes
export const PURCHASE_PROCESS_NAME = 'default-purchase';
export const BOOKING_PROCESS_NAME = 'default-booking';
// Add new processes with a descriptive name
export const NEGOTIATION_PROCESS_NAME = 'negotiated-booking';
```

In addition to updating the process name to your **transaction.js**
file, you will need to make sure the application has an accurate
representation of the different transitions and states in your new
transaction process. The transitions and states for the existing
processes are defined in the **transactionProcessBooking.js** and
**transactionProcessPurchase.js** files in the same **src/transactions**
folder.

If you are replacing one of the default processes (for instance the
default booking process with a new booking process with different
transitions and states), you can modify the existing
**transactionProcessBooking.js** file to correspond to the new process.
If you are creating a parallel booking process and want to allow
providers to choose between two processes for their listings, you will
need to create a new transaction process file and import it in
**transaction.js**.

The following instructions specify the steps for modifying the existing
**transactionProcessBooking.js** file, so if you do create a new one, we
recommend you replicate the existing default process file and make the
necessary changes instead of creating one from scratch.

### 2.1. Update transitions and states

If the new transaction process has different transitions and states, you
should add (or remove) those. Transition names need to map exactly with
transitions used in Marketplace API, since transitions are part of
queried transaction entities.

### 2.2. Update state graph to match the new transaction process

State graph description makes it easier to understand how the
transaction process works - but even more importantly, it makes it
easier to create utility functions which tell you if a transaction has
reached a specific state. The description format follows
[Xstate](https://xstate.js.org/docs/), which is a Finite State Machine
(FSM) library. However, the library is not used since transitions in the
actual state machine are handled by Marketplace API.

```js
export const graph = {
  // id is defined only to support Xstate format.
  // However if you have multiple transaction processes defined,
  // it is best to keep them in sync with transaction process aliases.
  id: 'default-booking/release-1',

  // This 'initial' state is a starting point for new transaction
  initial: states.INITIAL,

  // States
  states: {
    [states.INITIAL]: {
      on: {
        [transitions.INQUIRE]: states.INQUIRY,
        [transitions.REQUEST_PAYMENT]: states.PENDING_PAYMENT,
      },
    },
    [states.INQUIRY]: {
      on: {
        [transitions.REQUEST_PAYMENT_AFTER_INQUIRY]: states.PENDING_PAYMENT,
      },
    },

    [states.PENDING_PAYMENT]: {
      on: {
        [transitions.EXPIRE_PAYMENT]: states.PAYMENT_EXPIRED,
        [transitions.CONFIRM_PAYMENT]: states.PREAUTHORIZED,
      },
    },
    // etc.
```

When adding a new state, it needs to be added to the `states` property
of `graph`. Transitions from one state to another are defined in the
`on` property of a state. So, you need to add outbound transitions there
and inbound transitions to the `on` property of the previous state(s).

### 2.3. Update graph helper functions to match the new process

Since the states and transitions in your state graph description have
changed, you will need to review all the helper functions in your
transaction process file and adjust them accordingly.

For example, if you have different privileged transitions in your
process than the ones in the default process, you will need to update
the helper function to feature the correct transitions.

```js
export const isPrivileged = transition => {
  return [
    transitions.REQUEST_PAYMENT,
    transitions.REQUEST_PAYMENT_AFTER_INQUIRY,
  ].includes(transition);
};
```

<info>

Only transitions are included in the transaction entity, since all the
actions that happen during the process are tied to transitions, not
states. Read more about the
[transaction process](/concepts/transaction-process/).

</info>

## 3. Update state data for Inbox Page and Transaction Page

In addition to the transaction process file, there are two other places
where transaction process state data is handled: **InboxPage** and
**TransactionPage**. Both of those containers have files you will need
to review.

```shell
  └── src
      └── containers
          ├── InboxPage
              ├── InboxPage.stateData.js
              ├── InboxPage.stateDataBooking.js
              └── InboxPage.stateDataPurchase.js
          └── TransactionPage
              ├── TransactionPage.stateData.js
              ├── TransactionPage.stateDataBooking.js
              └── TransactionPage.stateDataPurchase.js

```

Similarly to the **src/transactions** folder, you can either modify the
existing booking or product file, or you can replicate the existing file
into a new one for modifications, depending on your use case.

In both contexts, the **...stateData.js** file compiles necessary
transaction state information being used on the page. For instance,
TransactionPage has an action button, and depending on the transaction
state and the user's role in the transaction, the button may be used to
accept, mark received, or dispute the transaction.

The **...stateData.js** file in turn imports functions from
**...stateDataBooking.js** and **...stateDataPurchase.js** to retrieve
the state data corresponding to the correct process.

```js
export const getStateData = params => {
  ...
  if (processName === PURCHASE_PROCESS_NAME) {
    return getStateDataForPurchaseProcess(params, processInfo());
  } else if (processName === BOOKING_PROCESS_NAME) {
    return getStateDataForBookingProcess(params, processInfo());
  } else {
    return {};
  }
}
```

If you have added a new process name constant besides
_BOOKING_PROCESS_NAME_ and _PURCHASE_PROCESS_NAME_, you will need to
import it in **...stateData.js**, as well as import the function it
needs to use for retrieving state data, so that your Inbox Page and
Transaction Page work correctly.

The process specific **...stateData** files (e.g.
**...stateDataBooking.js**) export a _getStateDataFor..._ function,
which conditionally resolves the necessary props based on the
transaction state and the user role. You will need to check which
changes to make in the **ConditionalResolver**, for example if there are
new states that require specific props to be returned to the page based
on the state.

If you have created a new **stateData** file (e.g.
**InboxPage.stateDataNegotiation.js**), you will need to export a
uniquely named _getStateDataFor..._ function from that file.

## 4. Add microcopy strings

A lot of microcopy strings in Sharetribe Web Template are transaction
process and state specific.

```js
...
  "InboxPage.default-booking.accepted.status": "Accepted",
  "InboxPage.default-booking.canceled.status": "Canceled",
  "InboxPage.default-booking.declined.status": "Declined",
  "InboxPage.default-booking.delivered.status": "Delivered",
...
```

This means that when you create a new transaction process, you will also
need to add microcopy for the relevant keys and states in the new
process. You can add the process specific keys either into the
[bundled microcopy files in the template](/ftw/how-to-change-ftw-bundled-microcopy/)
or through the [Flex Console Content tab](/concepts/microcopy/).

After making the necessary changes in these contexts, your new
transaction process should work as expected in the template! Be sure to
test all the steps in your transaction process carefully to make sure
that all cases show up as you would expect.
