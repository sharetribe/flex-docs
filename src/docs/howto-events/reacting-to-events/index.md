---
title: Reacting to events
slug: reacting-to-events
updated: 2023-10-24
category: how-to-events
ingress:
  This guide demonstrates how to build an integration that reacts to
  events that happen in your Sharetribe marketplace, using the
  Sharetribe Integration API.
published: true
---

One of the main purposes of [events](/references/events/) in Sharetribe
is to allow building integrations that programatically react to changes
and actions in a marketplace. In this guide, we will show how to use the
Sharetribe Integration API to continuously query events efficiently. We
will also demonstrate how to interpret the event data to detect actions,
using publishing a listing as an example.

<plan tier="extend" feature="Access to Integration API and events"></plan>

This guide assumes that you have already set up a Sharetribe Integration
API application and have a Node.js app with the
[Integration API SDK](/concepts/js-sdk/) ready. If you have not yet used
the Sharetribe Integration API, follow the
[Getting started with the Integration API](/introduction/getting-started-with-integration-api/)
guide first and you will be ready to proceed with this guide.

In this guide we will cover the following main topics:

- querying events via the Integration API, using filters to receive only
  relevant events
- using event data to determine the change that happened
- understanding event sequence IDs and using them to correctly query for
  new events
- understanding at-least-once and at-most-once types of event processing

## Querying events

The Integration API
[/events/query](https://www.sharetribe.com/api-reference/integration.html#query-events)
endpoint will be used at the core of this guide. In the most basic form,
a query for all available events using the SDK looks like this:

```javascript
integrationSdk.events.query();
```

In this guide, we are interested in detecting when a new listing is
published and therefore do not need to process all events that happen in
the marketplace. Instead, we can filter out only the relevant
listing-related events. Recall that the
[listing `state`](https://www.sharetribe.com/api-reference/integration.html#listing-states)
attribute indicates whether a listing is `draft` or `published` (among
other possible states) and that a new listing may become published in
one of three ways:

- a listing can be
  [created as published](https://www.sharetribe.com/api-reference/marketplace.html#create-listing)
- a listing can be created as
  [draft](https://www.sharetribe.com/api-reference/marketplace.html#create-draft-listing)
  and be
  [published](https://www.sharetribe.com/api-reference/marketplace.html#publish-draft-listing)
  separately
- in case your marketplace has the
  [listing approval feature](/concepts/requiring-approval/) on, a
  listing that is pending approval becomes published when it is approved
  by an operator

Therefore, in order to cover all cases, we need to process both
`listing/created` and `listing/updated` events. A query for only these
types of events looks like this:

```javascript
integrationSdk.events.query({
  eventTypes: 'listing/created,listing/updated',
});
```

This would still give us all events with the given types that Sharetribe
keeps in history. In practice, often we are interested in _new_ events
only. In the absense of another point of reference, it is possible to
query events starting from a given timestamp:

```javascript
const now = new Date();
const fiveMinutesAgo = new Date(now - 300000);
integrationSdk.events.query({
  createdAtStart: fiveMinutesAgo,
  eventTypes: 'listing/created,listing/updated',
});
```

Later in the guide, we will see how to use the data of events that the
application has already processed to query strictly for subsequent
events.

## Using event data to detect change

Even with the event type filtering in place, not all `listing/created`
or `listing/updated` events represent the logical change we may be
interested in (such as a listing being published for the first time). We
need to use the event [data](/references//events/#event-data) and in
particular the
[resource and previousValues](/references//events/#resource-data-and-previous-values)
to detect which events correspond to the change we want to react to.

A new listing is first published when one of these happen:

- a `listing/created` event shows that the current listing state is
  `published`
- a `listing/updated` event shows that the current listing state is
  `published` and the previous state was `draft`
- a `listing/updated` event shows that the current listing state is
  `published` and the previous state was `pendingApproval`

In code, analyzing the event data can be done like this:

```javascript
const now = new Date();
const fiveMinutesAgo = new Date(now - 300000);

const handleListingPublished = event => {
  const { resourceId, resource: listing } = event.attributes;
  const listingId = resourceId.uuid;
  const authorId = listing.relationships.author.data.id.uuid;

  // Do something about the new published listing, such as send notification,
  // synchronize data to external system, etc.
  console.log(
    `A new listing has been published: listingId ${listingId}, author ID: ${authorId}`
  );
};

const analyzeEvent = event => {
  const {
    resource: listing,
    previousValues,
    eventType,
  } = event.attributes;
  const listingState = listing.attributes.state;
  const { state: previousState } = previousValues.attributes || {};

  const isPublished = listingState === 'published';
  const isPendingApproval = listingState === 'pendingApproval';
  const wasDraft = previousState === 'draft';
  const wasPendingApproval = previousState === 'pendingApproval';

  switch (eventType) {
    case 'listing/created':
      if (isPublished) {
        handleListingPublished(event);
      }
      break;
    case 'listing/updated':
      if (isPublished && (wasPendingApproval || wasDraft)) {
        handleListingPublished(event);
      }
      break;
  }
};

integrationSdk.events
  .query({
    createdAtStart: fiveMinutesAgo,
    eventTypes: 'listing/created,listing/updated',
  })
  .then(res => {
    const events = res.data.data;

    events.forEach(analyzeEvent);
  });
```

Naturally, instead of simply logging the event, the application can be
doing something else, such as sending an email notification to a
marketplace operator, synchronising data with an external system and so
on.

## Polling events continuously using sequence IDs

In the guide so far we saw how to process events from a single query. In
practice, an application that reacts to events needs to poll for new
events continuously. In this section we will show how this is best
achieved.

In Sharetribe, each event has a unique `sequenceId` and the
[sequence IDs are strictly increasing](/references//events/#event-sequence-ids).
Moreover, the `/events/query` Integration API endpoint always returns
events sorted by their sequence IDs in ascending order. This means that
once a batch of events is processed, the sequence ID of the last event
can be used to query for strictly newer events, using the
`startAfterSequenceId`
[query parameter](https://www.sharetribe.com/api-reference/integration.html#query-events).
For example:

```javascript
// Given the sequence ID of last processed event, query only for newer events
const lastEventSequenceId = 1234;
integrationSdk.events.query({
  startAfterSequenceId: lastEventSequenceId,
  eventTypes: 'listing/created,listing/updated',
});
```

Using that knowledge, a continuous polling loop works like this:

1. start querying events from some point in time, such as the current
   timestamp
2. if there are some new events, process them and note the sequence ID
   of the last one
3. after processing the batch, wait for a time and poll again using the
   sequence ID of the last event (if there was one) or the same
   timestamp as in the original query and go to step 2.

### Persisting the last seen sequence ID

The polling loop described above works for a single execution of the
application. However, if the application is stopped and then restarted,
some events may be missed. To remedy that, the application needs to
persist somehow the sequence ID of the last processed event. How that is
achieved, depends on the particular application and available
infrastructure, but some options include:

- store the sequence ID in a local file
- store the sequence ID in some cloud storage, such as AWS S3, Azure
  Blob Storage or GCP Cloud Storage
- store the sequence ID in some database

With the sequence ID persisted, subsequent executions of the application
can resume polling events from the exactly correct point of reference
and will therefore not miss any events that may have happend in the
meantime.

### Recommended polling interval

A suitable polling interval that applications should use depend on a few
factors, including:

- how much activity there is in the marketplace
- how important it is that the events are processed without delay
- maintaining good practice when accessing the Sharetribe APIs

In most cases, a polling interval of 1-10 minutes may be completely
sufficient. In cases were more rapid reaction is required, we highly
recommend that the polling interval should not be smaller than 10-30
seconds.

Note that a single query returns up to a 100 events. If a query returns
a full page of events, there may be more events already available for
querying. In that case, a smaller timeout is acceptable, so that the
application can process all available events in a timely manner (e.g.
250-1000 ms).

### Poll loop example using local file to store state

Below is a full polling loop example, using a local file to store the
last processed event's sequence ID:

```javascript
const fs = require('fs');

// Start polloing from current time on, when there's no stored state
const startTime = new Date();

// Polling interval (in ms) when all events have been fetched.
const pollIdleWait = 300000; // 5 minutes
// Polling interval (in ms) when a full page of events is received and there may be more
const pollWait = 1000; // 1s

// File to keep state across restarts. Stores the last seen event sequence ID,
// which allows continuing polling from the correct place
const stateFile = './last-sequence-id.state';

const queryEvents = args => {
  var filter = { eventTypes: 'listing/created,listing/updated' };
  return integrationSdk.events.query({ ...args, ...filter });
};

const saveLastEventSequenceId = sequenceId => {
  // Save state to local file
  try {
    fs.writeFileSync(stateFile, sequenceId);
  } catch (err) {
    throw err;
  }
};

const loadLastEventSequenceId = () => {
  // Load state from local file, if any
  try {
    const data = fs.readFileSync(stateFile);
    return parseInt(data, 10);
  } catch (err) {
    return null;
  }
};

const handleEvent = event => {
  // detect change and handle event
  // ...

  // Then store the event's sequence ID
  saveLastEventSequenceId(event.attributes.sequenceId);
};

const pollLoop = sequenceId => {
  var params = sequenceId
    ? { startAfterSequenceId: sequenceId }
    : { createdAtStart: startTime };
  queryEvents(params).then(res => {
    const events = res.data.data;
    const fullPage = events.length === res.data.meta.perPage;
    const delay = fullPage ? pollWait : pollIdleWait;
    const lastEvent = events[events.length - 1];
    const lastSequenceId = lastEvent
      ? lastEvent.attributes.sequenceId
      : sequenceId;

    events.forEach(e => {
      handleEvent(e);
    });

    setTimeout(() => {
      pollLoop(lastSequenceId);
    }, delay);
  });
};

// Load state from local file, if any
const lastSequenceId = loadLastEventSequenceId();

// kick off the polling loop
pollLoop(lastSequenceId);
```

## At-least-once and at-most-once event processing

No system ever operates without failures and therefore applications
should account for possible failure conditions during event processing.
For instance, an API call to another system during event handling may
fail (sending notification, synchronizing state, executing other
actions, etc), or the application itself may crash due to a bug or an
issue on the host system.

An important aspect of this is what is often referred to as
_at-least-once_ and _at-most-once_ processing in message processing
systems.

Consider the following scenarios:

1. the application receives an event, records persistently its sequence
   ID and then proceeds to handle the event
2. the application receives an event, handles it fully and then records
   its sequence ID persistently

Suppose that a failure occurs during the event handling and the
application crashes. In scenario 1, when the application is restarted,
it will query for new events, skipping over the event that failed to be
handled, as its sequence ID is already stored. Depending on when exactly
the failure occurred, the event may not have been fully handled and
therefore will be left unprocessed (this is at-most-once processing). On
the other hand, in scenario 2, when the application is restarted, it
will retry handling the failed event (since the last recorded sequence
ID is that of some previous event) and potentially may process the event
a second time (that is, at-least-once processing).

The preferable strategy for an application depends on the exact event
handling logic. For example, at-least-once processing may be preferable
in any of the following situations:

- when the event processing is idempotent, meaning that processing and
  event more than once does not produce undesired side-effects
- when it is tolerrable that some events may be processed multiple times
  (e.g. when a user may receive an occasional duplicate notification)

On the other hand, at-most-once processing is preferable if processing
an event produces a side-effect that must not be repeated (such as
making a money transfer) and can not be performed safely in an
idempotent manner. In those cases, it may be desirable to handle the
failed events somehow manually and resume automatic event processing
only for subsequent events.

Note that, if events are processed in batches and only the sequence ID
of the last event in the batch is recorded, the effect of potential
failure may be amplified to affect all events in the failed batch.
Again, whether that is acceptable depends on the concrete event handling
mechanics.

Finally, _exactly-once_ processing may not be achievable in most
scenarios when idempotent operations are impossible. That is especially
true when event handling requires working across multiple systems (such
as API calls to 3rd party services). In practice, at-most-once
processing can be considered the safer choice in those cases.

## Additional resources

- A
  [full example](https://github.com/sharetribe/sharetribe-integration-api-examples/blob/master/scripts/notify-new-listings.js)
  Integration API application is available
  [in the Integration API examples](https://github.com/sharetribe/sharetribe-integration-api-examples/)
  repository
- [Reference article](/references/events/) for events
