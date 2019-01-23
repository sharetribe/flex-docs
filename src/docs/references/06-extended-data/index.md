---
title: Extended data
slug: extended-data
updated: 2019-01-23
category: references
ingress: Reference documentation for extended data.
published: true
---

*Extended data* is a set of arbitrary keys and values store with the
API resources. The values for the keys can be any valid JSON values,
including a JSON object (hash). This provides API clients with the
capability to store arbitrary structured data for the supported
resource types. Via data schema we also support querying/filtering by
the extended data for some value types.

# Types of extended data

<aside class="notice">Extended data support in API resources is work in
progress. See the <a href="index.html">API reference</a> for each resource for
information on supported extended data.</aside>

There are five types of extended data, which can be divided into two groups -
*data* and *metadata*. *Data* is written by users via the Marketplace API, while
*metadata* is written by operators via the Flex Console. Each type has different
access semantics (i.e. who is allowed to read or write the data).

## Public data

*Public data* is writable by whoever has write access to a given resource (e.g.
listing's author can write public data about the listing, a user can write
public data in their profile). Public data is readable via all API endpoints
that return the resource and by marketplace operators.

Public data can be used, for instance, to store additional information about
listings and users in order to help customers make buying decisions.

## Protected data

*Protected data* is writable and readable by whoever has write access
to a resource. It is also readable by marketplace operators. Protected
data can be revealed to all transaction parties via the marketplace
[transaction process](transaction-engine.html).

Protected data can be used to store information about listings or users that is
only made visible to a customer at a specific point in the [transaction
process](transaction-engine.html).

## Private data

*Private data* is similar to protected data, but is not intended to be
revealed via the transaction process. For instance, it can be used to
collect and store information about users or listings for marketplace
operators. It can also be used with integrations that want to store
e.g. a corresponding id in an external service.

## Public metadata

*Public metadata* is writable by marketplace operators and can be read
via all API endpoints returning the corresponding resource. Public
metadata is supported for listings and can also be used as filters
when searching via [`listings/query`](index.html#query-listings).

Public metadata is useful for example marking listings as promoted or
for linking listings with external services.

## Private metadata

<aside class="notice">This feature is not yet supported by the Marketplace
API.</aside>

*Private metadata* is only readable and writable by marketplace operators.

# Data schema

Extended data is available out of the box and can be written and read
via the Marketplace API without any prior configuration. *Data schema*
may optionally be defined for some value types of extended data. When
a schema is provided for a given extended data key, the API can use
this information to make querying the extended data possible via some
API endpoints. For instance
[`/listings/query`](index.html#query-listings) supports querying
listings by public data.
