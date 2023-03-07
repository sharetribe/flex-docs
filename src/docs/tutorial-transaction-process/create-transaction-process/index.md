---
title: Create a new transaction process
slug: create-transaction-process
updated: 2021-12-16
category: tutorial-transaction-process
ingress:
  This guide describes how to create a new transaction process and how
  to take it into use in the Sharetribe Web Template.
published: true
---

## Create a transaction process

In this tutorial, we'll create a new transaction process for the
CottageDays marketplace. It will be a nightly booking process in
contrast to the default daily process.

In addition, we will also add a new decline transition for the operator,
and update the client app to use the new process.

### Clone Flex example processes repository

Writing a _process.edn_ file and the email templates from scratch is a
fairly tedious task. We'll make our life a bit easier by cloning the
Flex example processes repository :

```shell
git clone https://github.com/sharetribe/flex-example-processes.git
```

And then we move to that directory:

```shell
cd flex-example-processes/
```

There are several processes listed in
[that directory](https://github.com/sharetribe/flex-example-processes).
The one we are going to use as a basis for our new process is
_default-booking_.

### Create a new process

To get up and running with Flex CLI, see the
[Getting started with Flex CLI](/introduction/getting-started-with-flex-cli/)
guide in Flex Docs.

Let's see what the subcommand `help` gives us about `process create`:

```shell
$ flex-cli help process create
create a new transaction process

USAGE
  $ flex-cli process create

OPTIONS
  --path=LOCAL_PROCESS_DIR          path to the directory where the process.edn file is
  --process=PROCESS_NAME            name for the new process that is created
  -m, --marketplace=MARKETPLACE_ID  marketplace identifier
```

So, if we would like to create a new process, we need to specify a path
to the local directory. That directory should contain process definition
(process.edn file) and templates subdirectory containing correct email
templates for the email notifications defined in that process. We
already have those since we cloned the _flex-example-processes_
repository.

Then we just need to define a name to that process and specify the
marketplace environment, where the new process should be created. We'll
use _"cottagedays-nightly-booking"_. Our final command for the
_cottagedays-test_ marketplace would look like this:

```shell
flex-cli process create --path=./default-booking --process=cottagedays-nightly-booking --marketplace=cottagedays-test
```

<info>

You need to modify the command to use your own test marketplace ID,
which you can find in Flex Console.

</info>

After executing that command, you can go to the Flex Console (Build ->
Transaction processes tab) and see that the
_"cottagedays-nightly-booking"_ process is there.

// TODO UPDATE SCREENSHOT!
![CottageDays nightly booking process created.](./cottagedays-nightly-booking-process.png)

### Create process alias

The process is created, but we still can't reference that process from
our client app, since it doesn't have process alias set. We can create
an alias for our new process with Flex CLI command:

```shell
flex-cli process create-alias --process=cottagedays-nightly-booking --version=1 --alias=release-1 --marketplace=cottagedays-test
```

With that command, we are creating a new alias _"release-1"_ and point
it to the previously created process and its version 1.

After that you should see the alias in the Console:<br />
`cottagedays-nightly-booking/release-1`.

At this point, we have essentially just copied the default process under
a different name.

## Modify transaction process

One transition that should be considered carefully is the operator's
ability to cancel a transaction. If the operator needs to cancel a
transaction in a certain state, there needs to be a transition defined
for it in the transaction process. Let's add a new operator transition
to the process.

### Pull the existing transaction process

Before we modify our transaction process, it's better to ensure that we
have most the up-to-date version of the process. You can fetch any
process version with flex-cli:

```shell
flex-cli process pull --process=cottagedays-nightly-booking --alias=release-1 --path=./cottagedays-nightly-booking --marketplace=cottagedays-test
```

Now, we can open the _process.edn_ file from the new directory with a
text editor and inspect it a bit. You can get familiar with edn format
by reading our
[reference document](/references/transaction-process-format/#the-edn-format)
about it.

There's one existing cancel transition defined for operator in that
file. That cancel transition can be called when the transaction is in
the state: **accepted**.

```clojure
  {:name :transition/cancel,
   :actor :actor.role/operator,
   :actions
   [{:name :action/calculate-full-refund}
    {:name :action/stripe-refund-payment}
    ;; Keep this action last in the list of actions for
    ;; the transition
    {:name :action/cancel-booking}],
   :from :state/accepted,
   :to :state/cancelled}

```

Let's add another similar transition there:

```clojure
  {:name :transition/decline-preauthorized-by-operator,
   :actor :actor.role/operator,
   :actions
   [{:name :action/calculate-full-refund}
    {:name :action/stripe-refund-payment}
    ;; Keep this action last in the list of actions for
    ;; the transition
    {:name :action/decline-booking}],
   :from :state/preauthorized,
   :to :state/declined-by-operator}
```

With this configuration, we are creating a new transition called
_:transition/decline-preauthorized-by-operator_ for the operator.
Because it's called before the provider has accepted the booking, it's
using _:action/decline-booking_ instead of _:action/cancel-booking_.
Otherwise, the actions are the same as in _:transition/cancel_. We
calculate refunds and refund the payment through Stripe. If you want to
see all the actions that are possible in a transaction process, you can
read this document:
[Transaction process actions](/references/transaction-process-actions/).

<info>

In the preauthorized state, the money hasn't left the customer's bank
account. There is just a cover reservation made for the future capture
of the payment. This is done to avoid an insufficient funds error.
Stripe can hold this preauthorization for 7 days and, therefore, we have
an automatic expiration in the preauthorized state.

<br/>

In these decline and expire transitions,
**:action/stripe-refund-payment** releases the cover reservation, but if
it's called after the payment is captured, it will refund the payment.
And to be more specific, then both transfers are reversed:

<br/>

1. Commission (aka application fee) is returned from platform account to
   the provider.
2. Then full payment is returned from the provider's account to the
   customer.

</info>

The operator can call this transition from Console (from transaction
card's _Timeline_ column) or alternatively through Integration API. This
transition is only possible when a transaction is in the
**preauthorized** state. The last line
`:to :state/declined-by-operator}`, creates actually a new state called
**declined-by-operator**. It is going to be one of the final states for
any transactions since there's no transition away from that state.

### Push a new transaction process

Updating a transaction process is a similar process than creating a new
one. This time we use _push_ command:

```shell
flex-cli process push --process=cottagedays-nightly-booking --path=./cottagedays-nightly-booking --marketplace=cottagedays-test
```

And if you go to Console, you notice that there's a new version (2)
created of the _cottagedays-nightly-booking_ process. However, the alias
is still pointing to the first version. We need to update the alias too:

```shell
flex-cli process update-alias --alias=release-1 --process=cottagedays-nightly-booking --version=2 --marketplace=cottagedays-test
```

Now, if you open the process graph from the Flex Console, you'll see
that the new transition and state are visible in the updated version of
the process.

// TODO: UPDATE SCREENSHOTS

![Updated process.](./updated-process.png)

Here's a screenshot of the transaction card in the Flex Console. It
shows a transaction in the preauthorized state - the decline link for
the marketplace operator is on the right-side column.

![Operator's decline transition in Console.](./decline-preauthorized-by-operator.png)

## Update client app

After we have changed the transaction process, we also need to take the
new process into use in our client app.

In this tutorial, we assume that we don't need to care about ongoing
transactions. It is important to consider this before taking a new
process version into use. When a transaction is created, it is tied to
the version of the process that was in use at that time. Therefore, you
might need to update your client app, so that it supports several
different process versions.

### Update configTransaction.js

```shell
└── src
    └── config
        └── configTransaction.js
```

The **configTransaction.js** file details an array of configurations for
the marketplace transaction experience. By default, only one of the
configurations is active, and the rest of them are commented out. We
will change the active configuration from the default daily booking
version to the nightly booking one.

To make those changes, you will need to comment the first configuration
and uncomment the second one. In addition, you can update the process
attribute of the nightly booking configuration to use the new process
that features the operator cancel transition.

```js

export const transactionTypes = [
  // {
  //   type: 'daily-booking',
  //   label: 'Daily booking',
  //   process: 'flex-booking-default-process',
  //   alias: 'release-1',
  //   unitType: 'day',
  // },
  {
    type: 'nightly-booking',
    label: 'Nightly booking',
    process: 'cottagedays-nightly-booking',
    alias: 'release-1',
    unitType: 'night',
  },
```

### Update transaction.js and transactionProcessBooking.js

The web app needs to understand how the connected transaction process
works and, therefore, the process graph is actually duplicated in the
current version of the template.

```shell
└── src
    └── util
        └── transactionProcessBooking.js
```

So, we also need to make the transaction process change there.

```js
export const OPERATOR_ACTIONS_PROCESS_NAME = 'cottagedays-nightly-booking';
...
const PROCESSES = [
  ...
  {
    name: OPERATOR_ACTIONS_PROCESS_NAME,
    alias: 'release-1',
    process: bookingProcess,
    unitTypes: [NIGHT],
  },
];
```

**Step 1**: Create a new transition to the **transitions** object:
`TRANSITION_DECLINE_BY_OPERATOR`.

```diff
export const transitions = {
  ...
// When the provider accepts or declines a transaction from the
// SalePage, it is transitioned with the accept or decline transition.
  ACCEPT: 'transition/accept',
  DECLINE: 'transition/decline',

+ DECLINE_BY_OPERATOR = 'transition/decline-preauthorized-by-operator',
  ...
```

**Step 2**: Create a new state to the **states** object:
`STATE_DECLINED_BY_OPERATOR`.

```diff
export const states = {
...
  DECLINED: 'declined',
+ DECLINED_BY_OPERATOR: 'declined-by-operator',
```

**Step 3**: Update the process graph.<br /> Variable _stateDescription_
contains the same process graph in _Xstate_ format. As a first thing,
you could also update the id of the graph.

The mandatory change is that we need to add the new state and transition
into that process description:

```diff
export const graph = {
  // id is defined only to support Xstate format.
  // However if you have multiple transaction processes defined,
  // it is best to keep them in sync with transaction process aliases.
+ id: 'cottagedays-nightly-booking/release-1',
...
  [states.PREAUTHORIZED]: {
    on: {
      [transitions.DECLINE]: states.DECLINED,
+     [transitions.DECLINE_BY_OPERATOR]: states.DECLINED_BY_OPERATOR,
      [transitions.EXPIRE]: states.DECLINED,
      [transitions.ACCEPT]: states.ACCEPTED,

```

**Step 4**: Update relevant helper functions.

- _isRelevantPastTransition_ needs to be updated

```js
// Check if a transition is the kind that should be rendered
// when showing transition history (e.g. ActivityFeed)
// The first transition and most of the expiration transitions made by system are not relevant
export const isRelevantPastTransition = transition => {
  return [
    transitions.ACCEPT,
    transitions.CANCEL,
    transitions.COMPLETE,
    transitions.CONFIRM_PAYMENT,
    transitions.DECLINE,
    transitions.DECLINE_BY_OPERATOR,
    transitions.EXPIRE,
    transitions.REVIEW_1_BY_CUSTOMER,
    transitions.REVIEW_1_BY_PROVIDER,
    transitions.REVIEW_2_BY_CUSTOMER,
    transitions.REVIEW_2_BY_PROVIDER,
  ].includes(transition);
};
```

- _isBookingProcess_ also needs to be updated – we need to add the new
  process name to the list used to determine booking processes.

```diff

export const isBookingProcess = processName => {
  const latestProcessName = resolveLatestProcessName(processName);
  const processInfo = PROCESSES.find(process => process.name === latestProcessName);
+ return [BOOKING_PROCESS_NAME, OPERATOR_ACTIONS_PROCESS_NAME].includes(processInfo?.name);
};

```

There is also a relevant transaction process state helper in one other
file: **InboxPage.stateDataBooking.js**.

```shell
└── src
    └── containers
        └── InboxPage
            └── InboxPage.stateDataBooking.js
```

This file contains a state data mapper that checks the state of the
transaction and injects additional data that is needed in the
corresponding container for each state. Since our new state behaves very
similarly to the default state **declined**, we can determine the
necessary chances by checking how **states.DECLINED** is handled in this
file.

```diff
// Get UI data mapped to specific transaction state & role
export const getStateDataForBookingProcess = (txInfo, processInfo) => {
...
  return new ConditionalResolver([processState, transactionRole])
...
    .cond([states.DECLINED, _], () => {
      return { processName, processState, isFinal: true };
    })
+   .cond([states.DECLINED_BY_OPERATOR, _], () => {
+     return { processName, processState, isFinal: true };
...
```

<info>

Another container with a similar state data mapper is TransactionPage,
but it does not have a specific handling for the **declined** state by
default, so we do not need to make any changes to
**TransactionPage.stateDataBooking.js**.

</info>

### Add microcopy strings

A lot of microcopy strings in Sharetribe Web Template are transaction
process specific. In other words, when you create a new transaction
process, you will also need to add microcopy for the relevant keys in
the new process.

In this case, you can locate the microcopy keys and values that
reference **default-booking** and duplicate them for the new process,
for example:

```diff
  "CheckoutPage.default-booking.title": "Complete booking",
+ "CheckoutPage.cottagedays-nightly-booking.title": "Complete booking",
```

<info>

To keep showing the line items on your email notifications, you will
need to replace

<br/>

```html
{{#eq "line-item/day" code}}
```

with

<br/>

```html
{{#eq "line-item/night" code}}
```

in your email notification templates. The next step in the tutorial
deals with updating email notifications.

The email templates that list the full line items in the default
transaction process are

- `new-booking-request` (to provider)
- `booking-request-accepted` (to customer)
- `money-paid` (to provider)

</info>

---

And that's it. We have created a new process, added a new transition
there and modified our client app to work with the new process.
