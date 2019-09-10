---
title: How to change transaction process setup in FTW
slug: how-to-change-transaction-process-in-ftw
updated: 2019-10-03
category: guides
ingress:
  This guide describes how to customize Flex Template for Web (FTW) to
  use another transaction process.
published: true
---

The default transaction process in FTW is
`preauth-with-nightly-booking/release-1` and FTW is created to support
states and transitions defined in that process.

How the transaction process works behind the Marketplace API depends on
how you process is customised in our backend. To customise the
transaction process in the backend, you should use Flex CLI. See the
[Getting started with Flex CLI](/tutorials/getting-started-with-flex-cli/)
tutorial to get familiar with the tool.

If you have changed the transaction process in your marketplace, you
should check if your client app needs to be updated to match this
different transaction process. You can read more about how these
processes work from a background info article about the
[transaction process](/background/transaction-process/).

The following guide will help you to customise the process flow in FTW
to match the process in our backend.

## 1. Change the transaction process alias

In
[src/config.js](https://github.com/sharetribe/flex-template-web/blob/master/src/config.js),
there are two configurations that need an update: `bookingProcessAlias`
and `bookingUnitType`.

`bookingProcessAlias` should point to the correct alias. You should
check from Console which process and process version your client app
should support. All available transaction process aliases can be found
from
[Build section](https://flex-console.sharetribe.com/transaction-processes)
in Console.

`bookingUnitType` specifies what kind of bookable units the client app
is dealing with. Currently, there are 3 possible values for the unit
type: `line-item/night`, `line-item/day`, and `line-item/units`.

> Note: You should revise other configuration options too.

## 2. Check if the transaction.js file needs to be updated

In
[src/util/transaction.js](https://github.com/sharetribe/flex-template-web/blob/master/src/util/transaction.js)
file, there are lots of helper functions that are used to determine
which state the transaction is. This file should be updated to match the
new transaction process.

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
const stateDescription = {
  // id is defined only to support Xstate format.
  // However if you have multiple transaction processes defined,
  // it is best to keep them in sync with transaction process aliases.
  id: 'preauth-with-nightly-booking/release-1',

   // This 'initial' state is a starting point for new transaction
  initial: STATE_INITIAL,

  // States
  states: {
    [STATE_INITIAL]: {
      on: {
        [TRANSITION_ENQUIRE]: STATE_ENQUIRY,
        [TRANSITION_REQUEST]: STATE_PREAUTHORIZED,
      },
    },
    [STATE_ENQUIRY]: {
      on: {
        [TRANSITION_REQUEST_AFTER_ENQUIRY]: STATE_PREAUTHORIZED,
      },
    },

     [STATE_PREAUTHORIZED]: {
      on: {
        [TRANSITION_DECLINE]: STATE_DECLINED,
        [TRANSITION_EXPIRE]: STATE_DECLINED,
        [TRANSITION_ACCEPT]: STATE_ACCEPTED,
      },
    },

    [STATE_DECLINED]: {},
    [STATE_ACCEPTED]: {
      on: {
        [TRANSITION_CANCEL]: STATE_CANCELED,
        [TRANSITION_COMPLETE]: STATE_DELIVERED,
      },
    },
    // etc.
```

When adding a new state, it needs to be added to the `states` property
of `stateDescription`. Transitions from one state to another are defined
in the `on` property of a state. So, you need to add outbound
transitions there and inbound transitions to the `on` property of the
previous state(s).

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
> [transaction process](/background/transaction-process/).

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
