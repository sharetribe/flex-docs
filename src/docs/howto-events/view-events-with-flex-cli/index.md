---
title: View events with Sharetribe CLI
slug: view-events-with-sharetribe-cli
updated: 2023-10-24
category: how-to-events
ingress:
  This guide shows you how to query and view events data using
  Sharetribe CLI. Events tell you the change history of marketplace data
  resources and allow observing noteworthy events.

skills: basic command line, text editing
published: true
---

Sharetribe CLI (Command-line interface) is a tool for examing and
changing your marketplace's advanced configurations such as transaction
processes and email templates.

This guide expects that you have already installed Sharetribe CLI and
are logged in with your API key. If not, it's recommended to first read
the tutorial
[Getting started with Sharetribe CLI](/introduction/getting-started-with-sharetribe-cli/).

In this guide, we will learn how the events of a marketplace can be
queried using Sharetribe CLI, how we can inspect events in more detail
as well as combine Sharetribe CLI with other tools to further process
the event data.

In Sharetribe, events represent changes in marketplace data resources
such as listings, users and transactions. An event captures a single
change in marketplace data, e.g. a user being created or a listing being
updated. Events can be further analyzed to interpret them as logical
actions such as a listing being published, a message being sent or a
user having changed their email address by looking into what were the
changed data fields. To learn more about events, have a look at the
[Events](/references/events/) reference.

## Querying events

The command for querying events using Sharetribe CLI is `events`.

```bash
$ flex-cli help events
Get a list of events.

USAGE
  $ flex-cli events

OPTIONS
  --after-seqid=SEQUENCE_ID               Show events with sequence ID larger than (after) the specified.
  --after-ts=TIMESTAMP                    Show events created after the given timestamp, e.g. '--after-ts 2020-10-10' or '--after-ts 2020-10-10T10:00.000Z'
  --before-seqid=SEQUENCE_ID              Show events with sequence ID smaller than (before) the specified.
  --before-ts=TIMESTAMP                   Show events created before the given timestamp, e.g. '--before-ts 2020-11-15' or '--before-ts 2020-11-15T12:00.000Z'
  --filter=EVENT_TYPES                    Show only events of given types, e.g. '--filter listing/updated,user'.
  --json                                  Print full event data as one JSON string.
  --json-pretty                           Print full event data as indented multi-line JSON string.
  --related-resource=RELATED_RESOURCE_ID  Show events that are related to a specific resource ID.
  --resource=RESOURCE_ID                  Show events for a specific resource ID only.
  --seqid=SEQUENCE_ID                     Get only the event with the given sequence id.
  -l, --limit=NUMBER                      Show given number of events (default and max is 100). Can be combined with other parameters.
  -m, --marketplace=MARKETPLACE_ID        marketplace identifier
```

Events command supports various ways to query events. Querying without
any of the additional parameters lists the 100 latest events for your
marketplace:

```
$ flex-cli events -m my-marketplace-dev

Seq ID   Resource ID                           Event type                     Created at local time   Source           Actor
3391589  5fca1e5b-2004-4479-a68c-dfc8a03083b8  availabilityException/created  2020-12-04 1:32:43 PM   marketplace-api  jane@example.com
3391590  5fca1e5c-eda8-4f54-ac30-ee7fe1010d11  availabilityException/created  2020-12-04 1:32:44 PM   marketplace-api  jane@example.com
3462923  5dfb4a42-8937-47b5-b482-44679828939c  user/updated                   2020-12-07 3:17:30 PM   console          joe@example.com
3471843  5fce8536-61f5-4c85-8160-61b1799d256f  user/updated                   2020-12-07 9:45:38 PM   marketplace-api  joe@example.com
3471856  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/created                2020-12-07 9:47:19 PM   marketplace-api  joe@example.com
3471857  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:47:28 PM   marketplace-api  joe@example.com
3471858  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:47:38 PM   marketplace-api  joe@example.com
3471859  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:47:53 PM   marketplace-api  joe@example.com
3471860  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:47:56 PM   marketplace-api  joe@example.com
3471863  5fce8728-0f15-46e4-8ee2-c4955e0cc079  availabilityException/created  2020-12-07 9:48:56 PM   marketplace-api  joe@example.com
3471864  5fce872f-4081-4ca7-a40d-6eb2b003dcc2  availabilityException/created  2020-12-07 9:49:03 PM   marketplace-api  joe@example.com
3471865  5fce8730-c750-4427-bc58-09f685cc0b03  availabilityException/created  2020-12-07 9:49:04 PM   marketplace-api  joe@example.com
3471866  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:49:11 PM   marketplace-api  joe@example.com
3471873  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:50:35 PM   marketplace-api  joe@example.com
3471875  5fce8536-61f5-4c85-8160-61b1799d256f  user/updated                   2020-12-07 9:50:52 PM   marketplace-api  joe@example.com
3471890  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:53:15 PM   marketplace-api  joe@example.com
...
```

The default table output mode lists a few key
[event attributes](/references/events/#event-attributes). It also shows
an email address of the actor, i.e. the person who took the action that
caused the event.

By adding the `--limit` (short version `-l`) parameter we can limit the
output to given number of events:

```bash
$ flex-cli events -l 2 -m my-marketplace-dev

Seq ID   Resource ID                           Event type                     Created at local time   Source           Actor
3391589  5fca1e5b-2004-4479-a68c-dfc8a03083b8  availabilityException/created  2020-12-04 1:32:43 PM   marketplace-api  jane@example.com
3391590  5fca1e5c-eda8-4f54-ac30-ee7fe1010d11  availabilityException/created  2020-12-04 1:32:44 PM   marketplace-api  jane@example.com
```

We can look at only certain type of events using the `--filter`
parameter:

```bash
$ flex-cli events --filter user/created,listing -m my-marketplace-dev

Seq ID   Resource ID                           Event type       Created at local time   Source           Actor
3471813  5fce8536-61f5-4c85-8160-61b1799d256f  user/created     2020-12-07 9:40:38 PM   marketplace-api
3471856  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/created  2020-12-07 9:47:19 PM   marketplace-api  joe@example.com
3471857  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated  2020-12-07 9:47:28 PM   marketplace-api  joe@example.com
...
```

Filtering accepts multiple event types separated with commas. Event
types are of the form `RESOURCE_TYPE/EVENT_SUBTYPE`. You can filter with
full event type name or by only the resource type. For more information
about supported event types, see reference for
[supported event types](/references/events/#supported-event-types).

Using the `--resource` parameter we can query only events that are for a
certain known resource:

```bash
$ flex-cli events --resource 5fce86c7-e435-4047-ab3b-dc4fee02d51d -m my-marketplace-dev

Seq ID   Resource ID                           Event type       Created at local time   Source           Actor
3471856  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/created  2020-12-07 9:47:19 PM   marketplace-api  joe@example.com
3471857  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated  2020-12-07 9:47:28 PM   marketplace-api  joe@example.com
3471858  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated  2020-12-07 9:47:38 PM   marketplace-api  joe@example.com
3471859  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated  2020-12-07 9:47:53 PM   marketplace-api  joe@example.com
3471860  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated  2020-12-07 9:47:56 PM   marketplace-api  joe@example.com
3471866  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated  2020-12-07 9:49:11 PM   marketplace-api  joe@example.com
3471873  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated  2020-12-07 9:50:35 PM   marketplace-api  joe@example.com
3471890  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated  2020-12-07 9:53:15 PM   marketplace-api  joe@example.com
```

In this case the resource ID we passed in was a listing ID. This is
useful when we want to investigate the change history of a specific
resource.

Sometimes it is useful to find events not only for a specific resource
but also for other resources related to the specific resource. That is
possible using the `--related-resource` parameter:

```bash
$ flex-cli events --related-resource 5fce86c7-e435-4047-ab3b-dc4fee02d51d -m my-marketplace-dev

Seq ID   Resource ID                           Event type                     Created at local time   Source           Actor
3471856  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/created                2020-12-07 9:47:19 PM   marketplace-api  joe@example.com
3471857  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:47:28 PM   marketplace-api  joe@example.com
3471858  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:47:38 PM   marketplace-api  joe@example.com
3471859  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:47:53 PM   marketplace-api  joe@example.com
3471860  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:47:56 PM   marketplace-api  joe@example.com
3471863  5fce8728-0f15-46e4-8ee2-c4955e0cc079  availabilityException/created  2020-12-07 9:48:56 PM   marketplace-api  joe@example.com
3471864  5fce872f-4081-4ca7-a40d-6eb2b003dcc2  availabilityException/created  2020-12-07 9:49:03 PM   marketplace-api  joe@example.com
3471865  5fce8730-c750-4427-bc58-09f685cc0b03  availabilityException/created  2020-12-07 9:49:04 PM   marketplace-api  joe@example.com
3471866  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:49:11 PM   marketplace-api  joe@example.com
3471873  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:50:35 PM   marketplace-api  joe@example.com
3471890  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:53:15 PM   marketplace-api  joe@example.com
```

In this case the resource ID is again a listing ID. The returned events
will include events about the listing itself as well as any other event
that is for a resource that has a relationship to the given listing
(such as availability exceptions, booking, transactions, and so on).
This is useful when trying to investigate the change history of a
listing's availability, the history of transactions for a given listing
or user, and so on.

Sharetribe CLI supports two different ways to look at events from the
past. We can either use the sequence ID to define a query range or we
can use timestamps matching event's created at. Sequence IDs are unique
and strictly increasing, meaning that events that occurred later in time
always have a larger sequence ID. With both options we can query either
events after a known sequence ID / time or events right before a
sequence id / time.

```bash
$ flex-cli events --after-seqid 3391593 -M my-marketplace-dev
...

$ flex-cli events --before-seqid 3462912  -m my-marketplace-dev
...

$ flex-cli events --after-ts 2020-12-05  -m my-marketplace-dev
...

$ flex-cli events --before-ts 2020-12-05T10:00.000Z  -m my-marketplace-dev
```

Timestamps can be given with date only or with the time component
included using the ISO 8601 standard format. If the time component is
omitted, it defaults to UTC midnight. Ranges are exclusive meaning that
event with sequence ID 3391593 is not included in the output produced by
the first command above but instead the output starts with the first
event after that sequence ID.

The `--filter`, `--resource` and `--limit` parameters can also be
combined with time range queries. For example, we can get the next 100
user and listing events since 7th of December 2020 with the command:

```bash
$ flex-cli events --after-ts 2020-12-07 --filter user,listing -m my-marketplace-dev
```

## Output modes and examining events in detail

In addition to the default table output mode, Sharetribe CLI supports
`--json` and `--json-pretty` modes. In the table output mode the CLI
prints only summary information about the events. This is useful when
wanting to see the big picture, which events happened and when. When you
want to look into the details of an event, you need to use a json mode.
With the filtering parameter `--seqid` we can target a single event:

```bash
$ flex-cli events --seqid 3471843 -m my-marketplace-dev --json-pretty
{
  "eventType": "user/updated",
  "createdAt": "2020-12-07T19:45:38.721Z",
  "resourceType": "user",
  "source": "source/marketplace-api",
  "resourceId": "5fce8536-61f5-4c85-8160-61b1799d256f",
  "id": "062569cb-dc3e-5a80-bde5-bb966072ecd6",
  "resource": {
    "deleted": false,
    "banned": false,
    "email": "joe@example.com",
    "profileImage": {
      "id": "5fce865b-dbc7-432a-85cc-ddb3a993eede"
    },
    "stripeConnected": false,
    "createdAt": "2020-12-07T19:40:38.902Z",
    "identityProviders": [],
    "pendingEmail": null,
    "emailVerified": true,
    "stripeAccount": null,
    "id": "5fce8536-61f5-4c85-8160-61b1799d256f",
    "marketplace": {
      "id": "5b83f0af-ed76-4fbf-9e71-e76b76c5abce"
    },
    "profile": {
      "displayName": "olli-test F",
      "firstName": "olli-test",
      "privateData": {},
      "protectedData": {},
      "bio": "Test users for event demo",
      "abbreviatedName": "oF",
      "lastName": "Foobar5",
      "publicData": {},
      "metadata": {}
    }
  },
  "auditData": {
    "userId": "5fce8536-61f5-4c85-8160-61b1799d256f",
    "adminId": null,
    "clientId": "039f4354-ccfa-4677-9395-2bf3f2294355",
    "requestId": "b43fddd6-f893-4a69-8661-ef159013019b"
  },
  "sequenceId": 3471843,
  "previousValues": {
    "profile": {
      "bio": null,
      "firstName": "Olli",
      "displayName": "Olli F",
      "abbreviatedName": "OF"
    },
    "profileImage": null
  },
  "marketplaceId": "5b83f0af-ed76-4fbf-9e71-e76b76c5abce"
}
```

The event details reveal that this user update changed the `bio`,
`firstName`, `displayName` and `abbreviatedName` for a user. For more
information about how `previousValues` records changes, see event
reference for
[resource data and previous values](/references/events/#resource-data-and-previous-values).

While `--json-pretty` is a good mode for examining the event details
manually, `--json` is the mode you want when needing to programmatically
parse the output. In `--json` mode Sharetribe CLI prints the events as
one line JSON objects.

```bash
$ flex-cli events -m my-marketplace-dev --json | less
{"eventType":"availabilityException/created","createdAt":"2020-12-04T11:32:43.794Z","resourceType":"a
{"eventType":"availabilityException/created","createdAt":"2020-12-04T11:32:44.346Z","resourceType":"a
{"eventType":"availabilityException/created","createdAt":"2020-12-04T11:32:45.524Z","resourceType":"a
{"eventType":"availabilityException/created","createdAt":"2020-12-04T11:32:49.604Z","resourceType":"a
{"eventType":"availabilityException/deleted","createdAt":"2020-12-04T11:32:50.136Z","resourceType":"a
{"eventType":"user/updated","createdAt":"2020-12-07T13:15:42.313Z","resourceType":"user","source":"so
{"eventType":"user/updated","createdAt":"2020-12-07T13:17:30.935Z","resourceType":"user","source":"so
{"eventType":"user/updated","createdAt":"2020-12-07T13:36:28.469Z","resourceType":"user","source":"so
{"eventType":"availabilityException/created","createdAt":"2020-12-07T14:27:31.243Z","resourceType":"a
{"eventType":"availabilityException/created","createdAt":"2020-12-07T14:27:31.835Z","resourceType":"a
...
```

The output can be easily parsed and transformed by using e.g. the
wonderful [jq](https://stedolan.github.io/jq/) command-line tool.

```bash
$ flex-cli events --filter listing -m my-marketplace-dev --json | jq '{sequenceId, eventType, source, changedKeys: (.previousValues // {} | keys)}'
{
  "sequenceId": 3471856,
  "eventType": "listing/created",
  "source": "source/marketplace-api",
  "changedKeys": []
}
{
  "sequenceId": 3471857,
  "eventType": "listing/updated",
  "source": "source/marketplace-api",
  "changedKeys": [
    "publicData"
  ]
}
{
  "sequenceId": 3471858,
  "eventType": "listing/updated",
  "source": "source/marketplace-api",
  "changedKeys": [
    "publicData"
  ]
}
{
  "sequenceId": 3471859,
  "eventType": "listing/updated",
  "source": "source/marketplace-api",
  "changedKeys": [
    "geolocation",
    "publicData"
  ]
}
{
  "sequenceId": 3471860,
  "eventType": "listing/updated",
  "source": "source/marketplace-api",
  "changedKeys": [
    "price"
  ]
}
{
  "sequenceId": 3471866,
  "eventType": "listing/updated",
  "source": "source/marketplace-api",
  "changedKeys": [
    "availabilityPlan"
  ]
}
{
  "sequenceId": 3471873,
  "eventType": "listing/updated",
  "source": "source/marketplace-api",
  "changedKeys": [
    "images"
  ]
}
{
  "sequenceId": 3471890,
  "eventType": "listing/updated",
  "source": "source/marketplace-api",
  "changedKeys": [
    "state"
  ]
}
```

## Live tailing events

Sharetribe CLI also offers a way to follow events live as they happen,
a.k.a. live tail them. The command to do this is `events tail`

```bash
$ flex-cli help events tail
Tail events live as they happen

USAGE
  $ flex-cli events tail

OPTIONS
  --filter=EVENT_TYPES              Show only events of given types, e.g. '--filter listing/updated,user'.
  --json                            Print full event data as one JSON string.
  --json-pretty                     Print full event data as indented multi-line JSON string.
  --resource=RESOURCE_ID            Show events for a specific resource ID only.
  -l, --limit=NUMBER                Show given number of latest events and then start tailing (default is 10 and max is 100). Can be combined with other parameters.
  -m, --marketplace=MARKETPLACE_ID  marketplace identifier
```

Live tailing accepts the same filtering parameters as the events query,
`--filter` and `--resource`. You can also pass in `--limit` to control
how many events from the past are shown before starting the live tail.
Live tailing supports all the same output modes (default table output,
`--json` and `--json-pretty`) as the events query does.

```bash
$ flex-cli events tail -m my-marketplace-dev
Starting live tail of events. Type <Ctrl>+C to quit.

Seq ID   Resource ID                           Event type                     Created at local time   Source           Actor
3471858  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:47:38 PM   marketplace-api  joe@example.com
3471859  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:47:53 PM   marketplace-api  joe@example.com
3471860  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:47:56 PM   marketplace-api  joe@example.com
3471863  5fce8728-0f15-46e4-8ee2-c4955e0cc079  availabilityException/created  2020-12-07 9:48:56 PM   marketplace-api  joe@example.com
3471864  5fce872f-4081-4ca7-a40d-6eb2b003dcc2  availabilityException/created  2020-12-07 9:49:03 PM   marketplace-api  joe@example.com
3471865  5fce8730-c750-4427-bc58-09f685cc0b03  availabilityException/created  2020-12-07 9:49:04 PM   marketplace-api  joe@example.com
3471866  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:49:11 PM   marketplace-api  joe@example.com
3471873  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:50:35 PM   marketplace-api  joe@example.com
3471875  5fce8536-61f5-4c85-8160-61b1799d256f  user/updated                   2020-12-07 9:50:52 PM   marketplace-api  joe@example.com
3471890  5fce86c7-e435-4047-ab3b-dc4fee02d51d  listing/updated                2020-12-07 9:53:15 PM   marketplace-api  joe@example.com
```

## Summary

Sharetribe CLI gives you visibility into the events that happen in your
marketplace. It supports querying events in a few different ways based
on event types, affected resource or time. It also supports following
events that happen in your marketlpace live.

Using Sharetribe CLI to examine events is a great way to see what's
happening in your marketplace and how the marketplace data has gotten to
it's current state. Looking at the events using Sharetribe CLI is also a
great way to get started with planning how to build an integration that
reacts to events as it allows you to see what kind of events happen
when, and what's the data that's recorded for each event.

For more information about events, see the following resources:

- [Events reference](/references/events/) for a detailed description on
  how events work and how they are defined.
- [Integration API reference for events](https://www.sharetribe.com/api-reference/integration.html#events)
  about how to query events via the Integration API.
- [Reacting to events](/how-to/reacting-to-events/) how-to guide guide
