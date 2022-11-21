---
title: Change transaction process setup in combined template
slug: change-transaction-process-in-ftw
updated: 2022-11-22
category: how-to-transaction-process
ingress:
  This guide describes how to customize the combined template to use
  another transaction process.
published: true
---

The combined template defines four transaction processes by default:
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

The [src/config/configTransaction.js](todo: link) file lists the
transaction processes actively used by the template, so you need to add
a configuration for a new transaction process. You can either comment
out the previous active process definitions (if you only want to use the
new process) or leave them as they are (if you want to allow using
multiple processes in the same application).

```js
{
  type: 'negotiated-nightly-booking',
  label: 'Negotiated nightly booking',
  process: 'negotiated-nightly-booking',
  alias: 'release-1',
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

Supported transaction processes are also defined in the files in the
**src/transactions** folder. In all cases, you will need to update the
**transaction.js** file to include your new process definition.

```shell
└── src
    └── transactions
        └── transaction.js
        ...

```

In addition to updating the process name to your **transaction.js**
file, you will need to make sure the application has an accurate
representation of the different transitions and states in your new
transaction process. The transitions and states for the existing
processes are defined in the **transactionProcessBooking.js** and
**transactionProcessProduct.js** files in the same **src/transactions**
folder.

If you are replacing e.g. the default booking process with a new booking
process that has different transitions and states, you can modify the
existing **transactionProcessBooking.js** file to correspond to the new
process. If you are creating a parallel booking process and want to
allow providers to choose between two processes for their listings, you
will need to create a new transaction process file and import it in
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
        [transitions.ENQUIRE]: states.ENQUIRY,
        [transitions.REQUEST_PAYMENT]: states.PENDING_PAYMENT,
      },
    },
    [states.ENQUIRY]: {
      on: {
        [transitions.REQUEST_PAYMENT_AFTER_ENQUIRY]: states.PENDING_PAYMENT,
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

If you have different states in your state graph description, you might
need to adjust the helper functions accordingly.

For example, if you have a state `STATE_CANCELED_BY_CUSTOMER`, you might
need a new helper function to figure out if a transaction has reached
that state.

```js
export const txIsCanceledByCustomer = tx =>
  getTransitionsToState(STATE_CANCELED_BY_CUSTOMER).includes(
    txLastTransition(tx)
  );
```

> Note: Only transitions are included to transaction entity since all
> the actions that happen during the process are tied to transitions not
> states. Read more about the
> [transaction process](/concepts/transaction-process/).

## 3. Update all the components that import util/transaction.js

The biggest task is to ensure that all the views know how to handle this
new transaction process. You should _check all the components that
import `transaction.js` file_. The easiest way is to find in all the
files for a string: `from '../../util/transaction'`. However, you should
anyway pay attention to these components:

- `InboxPage`
- `TransactionPanel`
- `ActivityFeed`
- `CheckoutPage`

Those components are tied closely to the different states a transaction
might be in. Remember to test the whole transaction process thoroughly.
