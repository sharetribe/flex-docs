---
title: Events
slug: events
updated: 2020-12-01
category: references
ingress: Reference documentation for Flex marketplace events.
published: true
---

In Flex, _events_ represent changes in marketplace data resources such
as listings, users and transactions. An event captures a single change
in marketplace data, e.g. a user being created or a listing being
updated. Events can be further analyzed to interpret them as logical
actions such as a listing being published, a message being sent or a
user having changed their email address by looking into what were the
changed data fields.

Events serve two main purposes:

1. To allow (admin) users to observe changes in marketplace data for
   auditing purposes. For example, what is the history of all changes
   for a particular listing.
2. To allow programmatically reacting to changes and logical actions in
   a marketplace.

Allowing programs to observe and react to changes enables efficiently
solving use cases such as synchronizing changes in marketplace data into
external places, e.g. a CRM, a spreadsheet or a calendar. It also allows
programs to react to logical actions as part of the marketplace flows.
For example, setting a field in user metadata can trigger an integration
to publish the user's listings.

Currently, Flex exposes events by allowing them to be queried via the
[Integration
API](https://www.sharetribe.com/api-reference/integration.html#query-events) or
viewed via [Flex CLI](/flex-cli/view-events-with-flex-cli/). Integration API
supports implementing efficient polling where only events that have happened
since last poll query are returned. This makes it possible to keep the polling
interval short enough to react to events shortly after they occur.

Flex does not retain event data forever. Flex maintains a history of all
marketplace events for 90 days in production marketplaces and for 7 days
in test and demo marketplaces.

## Event data

The event object contains data about the event itself, as well as about
the Flex resource which the event is about (`listing`, `user`,
`message`, etc), including how the resource changed.

The exact shape of the event data differ, depending on which means it is
accessed with, but the information contained is the same, regardless.

### Event attributes

Each event has the following attributes:

| Attribute           | Description                                                                                                                                                                                                                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                  | (uuid) Event ID.                                                                                                                                                                                                                                                                                                                             |
| createdAt           | (timestamp) The date and time when the event occurred in ISO 8601 format.                                                                                                                                                                                                                                                                    |
| sequenceId          | (integer) A numeric ID for the event that provides a strict total ordering of events, i.e. later events are guaranteed to have a sequence ID that is strictly larger than earlier events.                                                                                                                                                    |
| marketplaceId       | (uuid) The ID of the marketplace in which the event happened.                                                                                                                                                                                                                                                                                |
| eventType           | (string) The type of the event. See [supported event types](#supported-event-types). The event type has the form `RESOURCE_TYPE/EVENT_SUBTYPE`. E.g. `listing/created`.                                                                                                                                                                      |
| source              | (string) The Flex service from which the event originated. See [event sources](#event-sources).                                                                                                                                                                                                                                              |
| resourceId          | (uuid) The ID of the API resource that the event is about, e.g. a user or a listing ID.                                                                                                                                                                                                                                                      |
| resourceType        | (string) The type of the API resource that the event is about. This is one of the API resource types supported in the Integration API (e.g. `user`, `listing`, etc).                                                                                                                                                                         |
| resource            | (object) The value of the resource, for which the event is about, after the event occurred. For all event types except `*/deleted` events, the `resource` attribute is populated. For `*/deleted` events, `resource` is `null`. For details see the [reference for event data and previous values](#resource-data-and-previous-values).      |
| previousValues      | (object) An object describing the previous values for the event's changed resource attributes and relationships. Note that for `*/deleted` events, some of the attributes may be `null`, due to stricter data deletion requirements. For details see the [reference for event data and previous values](#resource-data-and-previous-values). |
| auditData           | (object) Data about the actor that caused the event.                                                                                                                                                                                                                                                                                         |
| auditData.userId    | (uuid) The ID of the Flex marketplace user that caused the event, if any. This attribute is set for most events that occurr in the Marketplace API and is `null` otherwise.                                                                                                                                                                  |
| auditData.adminId   | (uuid) The ID of the Flex Console admin user that caused the event. Typically set for events that occur in Console, but can be set in combination with `userId` when an admin has used the ["login as"](/cookbook-manage/enable-login-as-user) Console feature and acted on behalf of a marketplace user though the Marketplace API.         |
| auditData.requestId | (uuid) The ID of the API request that caused the event. Can be `null`. Currently this information is meaningless but might have future uses.                                                                                                                                                                                                 |
| auditData.clientId  | (uuid) The client ID of the Flex [Application](/background/applications/) that caused the event. This attribute is set if the event was caused by an API call from a Flex Marketplace API or Integration API application and is `null` otherwise.                                                                                            |

Note: these attributes are not necessarily top-level keys. Event object
data structure depends on [event's data format](#event-data-formats).

### Event sequence IDs

The event sequence IDs are guaranteed to uniquely identify an event.
They are also strictly increasing, meaning that events that happen later
always have larger sequence ID values than those that happened before
them.

These properties make the event sequence IDs the most accurate way to keep track
of which events have been already seen or processed in an application. The query
interface supports requesting events that have happened after the given sequence
ID, making the sequence ID a perfect tool for loading subsequent events in
comparison to a known ID. When querying events synchronously (e.g. via the
[Integration
API](https://www.sharetribe.com/api-reference/integration.html#query-events) or
[Flex CLI](/flex-cli/view-events-with-flex-cli/)), events are always returned in
order of their sequence IDs.

Note that, in contrast to sequence IDs, there can be multiple events
that have the exact same `createdAt` timestamp, so applications should
not use the timestamp as a strict criteria to determining event ordering
or to decide which events are processed and which are not.

### Event data formats

There are two data formats for events: **native** and **Integration
API** event data formats.

When accessed via the Integration API, the event and associated resource
data is formatted in the same way all Integration API resources are
(with `id`, `type` top-level attributes and with `relationships` object
containing the IDs of related resources). On the other hand, if the
event is viewed via Flex CLI, the event and resource data is not
normalized. Instead, it is inlined in a simplified form. We will refer
to this as _native_ event data format.

The Integration API event data format differs from the native one as
follows:

- The event object itself is structured as an API resource (with `id`,
  `type` and `attributes` keys)
- The `resource` object is structured itself as an Integration API
  resource with `id`, `attributes` and optional `relationships` keys,
  each containing the corresponding portion of resource data
- The value of relationships attributes follows the same format as
  [relationships normally do in the Integration API](https://www.sharetribe.com/api-reference/index.html#including-related-resources)

In both formats, the `previousValues` object always has the same shape
as the `resource` object.

Here are two abbreviated examples (assuming that listing's title is
updated):

#### Native event data format

```json
{
  "id": "ef98e897-5b81-49a5-aca6-01d9759df075",
  // other event keys: "eventType", "sequenceId", "createdAt", ...
  "resource": {
    "id": "5bbb2f6f-568f-470a-9949-a655e3f6ac46",
    ...
    "title": "Listing title",
    "author": {"id": "5cf4c0eb-513f-419b-a8be-bdb6c14be10a"},
    ...
  },
  "previousValues": {
    "title": "old title"
  }
}
```

#### Integration API event data format

```json
{
  "id": "ef98e897-5b81-49a5-aca6-01d9759df075",
  "type": "event",
  "attributes": {
    // other event keys: "eventType", "sequenceId", "createdAt", ...
    "resource": {
      "id": "5bbb2f6f-568f-470a-9949-a655e3f6ac46",
      "type": "listing",
      "attributes": {
        "title": "Listing title",
        ...
      },
      "relationships": {
        "author": {"data": {"id": "5cf4c0eb-513f-419b-a8be-bdb6c14be10a", "type": "user"}},
        ...
      }
    },
    "previousValues": {
      "attributes": {
        "title": "old title"
      }
    }
  }
}
```

### Resource data and previous values

The following example event data is for a `listing/updated` event
produced as a result of an API call in the Marketplace API. The data is
in native format and its `previousValues` field indicate that the
following occurred:

1. The listing `title` was updated
2. The listing `availabilityPlan` was updated
3. The `address` key in the listing's `publicData` was updated
4. The `rules` key was added to the listing's `publicData`
5. The set of listing images was updated, where 2 new images were added
   and one was removed

For examples of the Integration API event data format, see the
[Integration API reference](https://www.sharetribe.com/api-reference/integration.html#events).

```json
{
  "id": "ef98e897-5b81-49a5-aca6-01d9759df075",
  "eventType": "listing/updated",
  "sequenceId": 12345678,
  "createdAt": "2020-11-27T12:30:02.000Z",
  "marketplaceId": "9deec37c-b59c-4884-8f60-e4944335c327",
  "source": "source/marketplace-api",
  "resourceId": "5bbb2f6f-568f-470a-9949-a655e3f6ac46",
  "resourceType": "listing",
  "resource": {
    "id": "5bbb2f6f-568f-470a-9949-a655e3f6ac46",
    "title": "Peugeot eT101",
    "description": "7-speed Hybrid",
    "deleted": false,
    "geolocation": {
      "lat": 40.64542,
      "lng": -74.08508
    },
    "createdAt": "2018-03-23T08:40:24.443Z",
    "state": "published",
    "availabilityPlan": {
      "type": "availability-plan/day",
      "entries": [
        {
          "dayOfWeek": "mon",
          "seats": 1
        },
        {
          "dayOfWeek": "tue",
          "seats": 2
        }
      ]
    },
    "privateData": {
      "externalServiceId": "abcd-service-id-1234"
    },
    "publicData": {
      "address": {
        "city": "New York",
        "country": "USA",
        "state": "NY",
        "street": "230 Hamilton Ave"
      },
      "category": "road",
      "gears": 22,
      "rules": "This is a nice, bike! Please, be careful with it."
    },
    "metadata": {
      "promoted": true
    },
    "price": {
      "amount": 1590,
      "currency": "USD"
    },
    "author": { "id": "5cf4c0eb-513f-419b-a8be-bdb6c14be10a" },
    "marketplace": { "id": "9deec37c-b59c-4884-8f60-e4944335c327" },
    "images": [
      { "id": "209a25aa-e7cf-4967-89c3-0f09b2d482ff" },
      { "id": "98e11f3b-ea22-4b1b-8549-e543ae241133" },
      { "id": "ee1a647a-a751-43c7-90a4-48e94654f016" }
    ]
  },
  "previousValues": {
    "title": "old title",
    "availabilityPlan": {
      "type": "availability-plan/day",
      "entries": [
        {
          "dayOfWeek": "mon",
          "seats": 1
        }
      ]
    },
    "publicData": {
      "address": {
        "city": "New York",
        "country": "USA",
        "state": "NY",
        "street": "222 Hamilton Ave"
      },
      "rules": null
    },
    "images": [
      { "id": "98e11f3b-ea22-4b1b-8549-e543ae241133" },
      { "id": "d12b8ebc-4df8-4bd0-9231-2f05691831a4" }
    ]
  },
  "auditData": {
    "userId": "5cf4c0eb-513f-419b-a8be-bdb6c14be10a",
    "adminId": null,
    "clientId": "69ea8198-201c-48c4-a3bb-78b38e4059b0",
    "requestId": "4b66e510-22cb-47ca-953f-8a8377af2ed0"
  }
}
```

For all event types, except all `*/deleted` events, the `resource`
attribute of the event contains the full data for the corresponding API
resource **after** the event. The `resource` object contains keys
corresponding to the attributes that the Integration API resource has,
including it's `id`. For list of those attributes, see the Integration
API reference for each resource type (e.g.
[user](https://www.sharetribe.com/api-reference/integration.html#users),
[listing](https://www.sharetribe.com/api-reference/integration.html#users),
etc).

In addition, when the resource has one or more 1-to-1
[TODO relationships]() with other Integration API resources (for
instance,
[listing author](https://www.sharetribe.com/api-reference/integration.html#listing-relationships)
or
[user profileImage](https://www.sharetribe.com/api-reference/integration.html#user-relationships)),
the `resource` object also contains keys with the same names as these
relationships. The corresponding values are objects with single key `id`
and value the ID of the related resource.

However, generally 1-to-many relationships are not included in the
resource data, with one notable exception: the `images` relationship of
`listing` resources is always included.

Note that the event data is immutable. This means that if a new
attribute or relationship is added to some Integration API resource,
older events for that resource type will not include data about that
attribute or relationship.

The `previousValues` attribute holds an object describing the attributes
and/or relationships of the resource prior to the event, subject to the
following rules:

- Only the attributes or relationships affected in the event are
  included, i.e. the `previousValues` holds a subset of a resource data
  that describe the _difference_ between the resource before and after
  the event.
- Resource attribute and relationship values are given in their
  entirety, including when the value is some nested object or array
  (such as the listing's `availabilityPlan` or transaction's
  `lineItems`, for instance).
- If an attribute that did not have a value is updated, it will be
  present with `null` value in the `previousValues`.
- Extended data attributes (such as user profile's `publicData`, listing
  `metadata`, etc) are treated as collection of key-value pairs and the
  difference computation treats each top-level extended data key
  separately:
  - If a key that did not exist in the extended data was added, the key
    will be given with `null` value in the `previousValues` object.
  - If a key had different value or was removed, the entire previous
    value is given in the `previousValues` object, including when the
    value is a nested data structure.

Note that for all `*/deleted` events, some of the resources' attributes
may occasionally have `null` values in the `previousValues` object, due
to stricter data deletion requirements.

## Event sources

The following table lists all possible event sources:

| Source                 | Description                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| source/marketplace-api | The event happened through the Marketplace API.                                           |
| source/integration-api | The event happened through the Integration API.                                           |
| source/console         | The event happened through Flex Console.                                                  |
| source/admin           | The event happened as a result of a Sharetribe Flex team member action (product support). |

## Supported event types

The currently supported event types and their corresponding Integration
API resource types are:

| Event type                    | Integration API resource                                                                                   | Description                                                                           |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| listing/created               | [listing](https://www.sharetribe.com/api-reference/integration.html#listings)                              | A new listing was created.                                                            |
| listing/updated               | [listing](https://www.sharetribe.com/api-reference/integration.html#listings)                              | An existing listing was updated, including when the set of listing images is updated. |
| listing/deleted               | [listing](https://www.sharetribe.com/api-reference/integration.html#listings)                              | A listing was deleted.                                                                |
| user/created                  | [user](https://www.sharetribe.com/api-reference/integration.html#users)                                    | A new Flex marketplace user was created.                                              |
| user/updated                  | [user](https://www.sharetribe.com/api-reference/integration.html#users)                                    | An existing user was updated.                                                         |
| user/deleted                  | [user](https://www.sharetribe.com/api-reference/integration.html#users)                                    | A user was deleted.                                                                   |
| availabilityException/created | [availabilityException](https://www.sharetribe.com/api-reference/integration.html#availability-exceptions) | A new availability exception was created for a listing.                               |
| availabilityException/updated | [availabilityException](https://www.sharetribe.com/api-reference/integration.html#availability-exceptions) | An existing availability exception was updated.                                       |
| availabilityException/deleted | [availabilityException](https://www.sharetribe.com/api-reference/integration.html#availability-exceptions) | An availability exception was deleted.                                                |
| message/created               | [message](https://www.sharetribe.com/api-reference/integration.html#messages)                              | A new message was sent for a transaction.                                             |
| message/updated               | [message](https://www.sharetribe.com/api-reference/integration.html#messages)                              | An existing message was updated.                                                      |
| message/deleted               | [message](https://www.sharetribe.com/api-reference/integration.html#messages)                              | A message was deleted.                                                                |

The event type follows the format `RESOURCE_TYPE/EVENT_SUBTYPE`.

New event types may be added at any moment. Make sure your integration
handles event types not given in this list gracefully (by ignoring them,
for instance).

Note that some event types can occur even though there is currently no
support for the corresponding functionality in the Flex APIs or Flex
Console. Typically this can happen when the event was caused internally
by an administrative action of the Flex team, in which case the `source`
of the event would be `source/admin`.

## Further reading

* [Integration API reference for
  events](https://www.sharetribe.com/api-reference/integration.html#events)
* [Using Flex CLI to view event
  data](/flex-cli/view-events-with-flex-cli/)
* TODO Example application using the Integration API to access event data
