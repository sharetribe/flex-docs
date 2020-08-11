---
title: Transaction process format
slug: transaction-process-format
updated: 2019-10-02
category: references
ingress:
  This reference article describes the format of the process.edn file
  that is used with Flex CLI to customise the transaction processes of
  your marketplace.
published: true
---

This reference guide assumes you know the basic idea and concepts, such
as states, transitions and actions, of the Flex transaction process. If
you don't, please check this
[background article about Transaction process](/background/transaction-process/)
first.

## Example process

Let's start with an example process that looks like this:

![Example process](./example-process.png)

The annotated process description for this process is as follows:

```clojure
{
 ;; Tag to set the process description format.
 ;; It's always :v3. Earlier versions are deprecated.
 :format :v3

 ;; The process graph defined as transitions between states. The states are implicitly defined by transitions.
 ;; Note that the graph has to be connected, i.e. it's a single flow with branches, not multiple graphs.
 :transitions [{
                ;; Transition name, has to be unique. Used in API calls to create and transition transactions.
                :name :transition/request-payment

                ;; Who has the permission to execute the transition. One of: :actor.role/customer, :actor.role/provider, :actor.role/operator. Operator role means that the transition is executed by a marketplace operator on Console UI.
                :actor :actor.role/customer

                ;; Privileged transitions require that they are done in a trusted context, which
                ;; typically means using special access token when calling the API.
                :privileged? true

                ;; The actions that the transaction engine executes when the transition is taken.
                :actions [{:name :action/create-booking
                           :config {:observe-availability? true}}
                          {:name :privileged-set-line-items}
                          {:name :action/stripe-create-payment-intent}]

                ;; The state to which the process transitions to when the transition is completed.
                :to :state/pending-payment

                ;; This transition doesn't have a :from state because this is an "initial transition",
                ;; i.e. a transition that is used when a new transaction is created.
                }

               {:name :transition/expire-payment

                ;; Timing for the transition. This is a delayed transition that the system automatically executes at the defined time.
                ;; For delayed transitions we don't define an :actor.
                :at {:fn/plus [{:fn/timepoint [:time/first-entered-state :state/pending-payment]}
                               {:fn/period ["PT15M"]}]}
                :actions [{:name :action/decline-booking}
                          {:name :action/calculate-full-refund}
                          {:name :action/stripe-refund-payment}]

                ;; The state from which this transition can be executed.
                :from :state/pending-payment
                :to :state/payment-expired}

               {:name :transition/confirm-payment,
                :actor :actor.role/customer
                :actions [{:name :action/stripe-confirm-payment-intent}],
                :from :state/pending-payment
                :to :state/preauthorized}

               {:name :transition/accept
                :actor :actor.role/provider
                :actions [{:name :action/accept-booking}
                          {:name :action/stripe-capture-payment-intent}]
                :from :state/preauthorized
                :to :state/accepted}

               {:name :transition/decline
                :actor :actor.role/provider
                :actions [{:name :action/decline-booking}
                          {:name :action/calculate-full-refund}
                          {:name :action/stripe-refund-payment}]
                :from :state/preauthorized
                :to :state/declined}

               {:name :transition/expire
                :at {:fn/min [{:fn/plus [{:fn/timepoint [:time/first-entered-state :state/preauthorized]}
                                         {:fn/period ["P6D"]}]}
                              {:fn/plus [{:fn/timepoint [:time/booking-end]}
                                         {:fn/period ["P1D"]}]}]}
                :actions [{:name :action/decline-booking}
                          {:name :action/calculate-full-refund}
                          {:name :action/stripe-refund-payment}]
                :from :state/preauthorized
                :to :state/declined}

               {:name :transition/complete
                :at {:fn/timepoint [:time/booking-end]}
                :actions [{:name :action/stripe-create-payout}]
                :from :state/accepted
                :to :state/delivered}

               {:name :transition/cancel
                :actor :actor.role/operator
                :actions [{:name :action/cancel-booking}
                          {:name :action/calculate-full-refund}
                          {:name :action/stripe-refund-payment}]
                :from :state/accepted
                :to :state/cancelled}]

 ;; Notifications (emails) that are sent or scheduled when a transition is completed.
 :notifications [{
                  ;; Unique name of the notification.
                  :name :notification/new-booking-request

                  ;; The transition that when completed triggers this notification.
                  :on :transition/confirm-payment

                  ;; The transaction party this notification is sent to. Options are :actor.role/provider and :actor.role/customer.
                  :to :actor.role/provider

                  ;; Name of the email template for creating the email content.
                  :template :new-booking-request}

                 {:name :notification/new-booking-request-reminder
                  :on :transition/confirm-payment
                  :to :actor.role/provider

                  ;; Timing of the notification, meaning this notification is delayed.
                  ;; If the process transitions before the timing, the notification is not sent.
                  ;; Useful e.g. for reminders before the time window to react to the transaction closes.
                  :at {:fn/min [{:fn/plus [{:fn/timepoint [:time/first-entered-state :state/preauthorized]}
                                           {:fn/period ["P5D"]}]}
                                {:fn/timepoint [:time/booking-end]}]}
                  :template :new-booking-request-reminder}

                 {:name :notification/booking-request-accepted
                  :on :transition/accept
                  :to :actor.role/customer
                  :template :booking-request-accepted}

                 {:name :notification/booking-request-declined
                  :on :transition/decline
                  :to :actor.role/customer
                  :template :booking-request-declined}]}
```

## The edn format

The process description in Sharetribe Flex uses a format called
[edn](https://github.com/edn-format/edn). It's quite similar to JSON but
it supports a few more primitive types, such as datetime values and
keywords, and has some extra features. The syntax is also slightly
different from JSON so it might take a bit of time to get used to.

Keywords are used heavily in the process description syntax as keys in
maps as well as enum values. Keywords start with a `:` but are otherwise
similar to strings. Keywords can have a namespace, in which case they
are called qualified keywords, or be plain (unqualified). The part
before `/` is the namespace. So for example, `:actor.role/customer` is a
keyword in the namespace `actor.role`.

## Transitions in the Marketplace API

Processes have two different types of transitions. Initial transitions
are used for creating new transactions whereas subsequent transitions
move existing transactions forward in the process. An initial transition
in the process definition has no `:from` state defined. When we render
the process graph on [Console](https://flex-console.sharetribe.com) we
show a synthetic state `state/initial` but this is not a state that is
or should be defined in the process description.

In Marketplace API initial transitions are invoked via the
[transactions/initiate](https://www.sharetribe.com/api-reference/marketplace.html#initiate-transaction)
endpoint and subsequent transitions via the
[transactions/transition](https://www.sharetribe.com/api-reference/marketplace.html#transition-transaction)
endpoint.

The API also provides endpoints for invoking transitions speculatively:
[transitions/initiate_speculative](https://www.sharetribe.com/api-reference/marketplace.html#speculatively-initiate-transaction)
and
[transactions/transition_speculative](https://www.sharetribe.com/api-reference/marketplace.html#speculatively-transition-transaction).
Speculative operations take the same parameters that the real initiate
and transition endpoints take but only simulate the effects. In other
words, no state is changed, Stripe is not really called, etc.. However,
they do run the same full validations on parameters as well as execute
the [action preconditions checks](#preconditions) and return errors in
case of failures. When the transition completes successfully, the
speculation operations also return simulated results that show how the
transaction object will look like after a real initiate or transition
operation.

## Transitions in the Integration API

It is possible to use the
[Integration API](/background/marketplace-api-integration-api/) to
invoke transitions, which are defined as having `:actor.role/operator`
as the `:actor`. This is done via the
[transactions/transition](https://www.sharetribe.com/api-reference/integration.html#transition-transaction)
endpoint. Unlike the Marketplace API, the Integration API currently does
not provide an endpoint for initiating transactions.

Similarly to the Marketplace API, the Integration API also provides an
endpoint to
[invoke transitions speculatively](https://www.sharetribe.com/api-reference/integration.html#speculatively-transition-transaction).

_**The Integration API provides a trusted context for invoking
transitions. This means that these transitions are considered
[privileged](/background/privileged-transitions/) and can utilize any of
the actions that require a trusted context.**_

## Action composition

Each transition defines an ordered list of 0 or more actions. Actions
are instructions for the transaction engine and define what happens when
a transition is executed. The ordering of the actions matters because
they are executed in the given order.

In the above example process we define a transition from
`:state/accepted` to `:state/cancelled` like this:

```clojure
{:name :transition/cancel
 :actor :actor.role/operator
 :actions [{:name :action/cancel-booking}
           {:name :action/calculate-full-refund}
           {:name :action/stripe-refund-payment}]
 :from :state/accepted
 :to :state/cancelled}
```

This means that the first action to execute is `:action/cancel-booking`
which, like you might have guessed, marks the booking associated with
the transaction as cancelled. Next we calculate a full refund and add
the information to the transaction as line items. Finally, we invoke a
payment refund via Stripe. When all of the abovementioned steps are
taken and complete successfully, the transition is completed and the
process moves to state `:state/cancelled`.

### Preconditions

Actions cannot be composed arbitrarily. Each action defines zero or more
preconditions that must be met for the action to run successfully. If
any of these are not met at the time the action is invoked, the action
will fail which in turn fails the transition. In our example above, the
`:action/cancel-booking` has a precondition that the process must
contain a booking and that booking must be in state accepted. This means
that at some earlier point in the process we must have invoked the
actions `:action/create-booking` followed by `:action/accept-booking`.
However, these could all happen during a single transition. That's a bit
contrived example but should help to understand the limits and
opportunities with composing actions.

### Parameters

Every action can define zero or more parameters. The action parameters
are passed via
[the Marketplace API](https://www.sharetribe.com/api-reference/marketplace.html#transactions)
when a transition is invoked. Some of the action parameters are
mandatory and some are optional. All the mandatory and optional
parameters of the actions together define the parameters of the
transition.

In our example process, the `:transition/request-payment` defines the
actions `action/create-booking`,
`action/calculate-tx-nightly-total-price`,
`action/calculate-tx-provider-commission` and
`action/stripe-create-payment-intent`. This means the transition
requires and accepts the following parameters defined by the
`action/create-booking`:

- `bookingStart`, `bookingEnd`: timestamp, mandatory
- `bookingDisplayStart`, `bookingDisplayEnd`: timestamp, optional

plus the following parameters defined by the
`action/stripe-create-payment-intent`:

- `paymentMethod`: string, mandatory
- `setupPaymentMethodForSaving`: boolean, optional, defaults to `false`

The other two actions, `action/calculate-tx-nightly-total-price` and
`action/calculate-tx-provider-commission`, do not define any parameters
(but they do have preconditions).

### Configuration options

Some actions support configuration options that alter their behaviour.
For example, the `action/create-booking` can optionally check if the
timeslot for the booking is available and fail in case it's not. Other
examples are the commission calculation actions that take the commission
percentage as a configuration option.

The configuration options for an action are set in the process
description via the `:config` key in the action definition:

```clojure
{
 ;; Name of the action.
 :name :action/calculate-tx-provider-commission

 ;; The configuration options map.
 ;; Can be omitted if no options need to be passed.
 :config {:commission 0.1M}}
```

You can see all the preconditions, action parameters and configuration
options for each action in the
[Transaction process actions](/references/transaction-process-actions/)
reference article.

## Time expressions and delayed transitions

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

You can see a full list of timepoints and timepoint expression functions
in the
[Transaction process time expressions](/references/transaction-process-time-expressions/)
reference article.

## Notifications

Notifications are emails that are sent as part of the transaction
process when certain transitions occur. They optionally support delays
via the `:at` key. Every notification needs to have a unique (in the
scope of the process) name and can be tied only to a single transition.
The email content of a notification is rendered using a template. These
templates can be reused between notifications. If there's two different
transitions where you want to send the same email, you can just refer to
same template in both. Notifications can be sent to the customer or to
the provider.

## Validating and inspecting a process

The flex-cli supports validating a local process description as well as
showing basic information about the process and its transitions.

To validate a process and print overall process description (when it's
valid) or validation errors:

```
flex-cli process --path my-process-dir
```

To print more details about a specific transition:

```
flex-cli process --path my-process-dir --transition transition/my-transition
```

Assuming we have stored the example process from this guide under
(./processes/guide/example/process.edn) we can inspect the
request-payment transition by running:

```text
$ flex-cli process --path processes/guide/example --transition transition/request-payment
Name
  transition/request-payment
From
  state/initial
To
  state/pending-payment
Actor
  Customer
At
  -

Actions

Name                                      Config
:action.initializer/init-listing-tx
:action/create-booking                    {:observe-availability? true}
:action/calculate-tx-nightly-total-price
:action/calculate-tx-provider-commission  {:commission 0.1}
:action/stripe-create-payment-intent

Notifications

-
```

Once you've pushed a new process version to your marketplace you can use
the
[Console process viewer](https://flex-console.sharetribe.com/transaction-processes)
to see the process graph and inspect transitions. This is currently the
only place where you can see the parameters that a given transition
requires and accepts.

## Process reference

### Process

| Key              | Type                          | Description                                                                   | Example                                               |
| ---------------- | ----------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------- |
| `:format`        | Keyword                       | Process format, always `:v3`                                                  | `:v3`                                                 |
| `:transitions`   | Vector (order doesn't matter) | A list of transitions that the process consists of. Implicitly define states. | `[{:name :transition/request-payment ...} ...]`       |
| `:notifications` | Vector (order doesn't matter) | A list of notifications for the process.                                      | `[{:name :notification/new-booking-request ...} ...]` |

### Transition

| Key            | Type            | Description                                                                                                                                                                                                                                                  | Example                                    |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `:name`        | Keyword         | Unique name for the transition. Used when invoking the transition via Marketplace API.                                                                                                                                                                       | `:transition/request-payment`              |
| `:actor`       | Keyword         | Defines who has the permission to invoke the transition. Must be one of: `:actor.role/customer`, `:actor.role/provider`, `:actor.role/operator`                                                                                                              | `:actor.role/customer`                     |
| `:actions`     | Vector          | An ordered list of actions to take when the transition is executed.                                                                                                                                                                                          | `[{:name :action/create-booking ...} ...]` |
| `:from`        | Keyword         | Name of the state from which the transition can be taken from. Left out for initial transitions.                                                                                                                                                             | `:state/pending-payment`                   |
| `:to`          | Keyword         | Name of the state to which this transition leads.                                                                                                                                                                                                            | `:state/pending-payment`                   |
| `:at`          | Time expression | Optional time expression that when given, turns the transition to a delayed transition. When using `:at` do not specify `:actor`                                                                                                                             | `{:fn/timepoint [:time/booking-end]}`      |
| `:privileged?` | Boolean         | Optionally mark the transition as [privileged](/background/privileged-transitions/). Privileged transitions can only be invoked from a trusted context and are useful when you need to ensure the transition parameters are correct or have specific values. | `true`                                     |

**Example**:

```clojure
{:name :transition/transition-name
 :actor :actor.role/customer ;; actor.role/provider or :actor.role/operator
 :actions []
 :from :state/from-state
 :to :state/to-state}
```

### Action

| Key       | Type    | Description                                              | Example                                    |
| --------- | ------- | -------------------------------------------------------- | ------------------------------------------ |
| `:name`   | Keyword | Reference to an action to use.                           | `:action/calculate-tx-provider-commission` |
| `:config` | Map     | A map from action configuration options to their values. | `{:commission 0.1M}`                       |

**Example**:

```clojure
{:name :action/calculate-tx-provider-commission
 :config {:commission 0.15M}}
```

### Notification

| Key         | Type            | Description                                                                                 | Example                                                                                              |
| ----------- | --------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `:name`     | Keyword         | Unique name for the notification.                                                           | `:notification/new-booking-request`                                                                  |
| `:on`       | Keyword         | Reference to a transition name that when completed triggers this notification.              | `:transition/confirm-payment`                                                                        |
| `:to`       | Keyword         | Recipient of the notification email. One of: `:actor.role/customer`, `:actor.role/provider` | `:actor.role/provider`                                                                               |
| `:template` | Keyword         | Refrence to an email template to render the email body for this notification.               | `:new-booking-request`                                                                               |
| `:at`       | Time expression | Optional time expression that when given turns the notification to a delayed notification.  | `{:fn/plus [{:fn/timepoint [:time/first-entered-state :state/preauthorized]} {:fn/period ["P5D"]}]}` |

**Example**:

```clojure
{:name :notification/notification-name
 :on :transition/transition-name
 :to :actor.role/customer ;; or :actor.role/provider
 :template :email-template-name}
```
