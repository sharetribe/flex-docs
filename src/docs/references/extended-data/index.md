---
title: Extended data
slug: extended-data
updated: 2019-01-23
category: references
ingress: Reference documentation for extended data.
published: true
---

_Extended data_ is a set of arbitrary keys and values stored with the
API resources. The values for the keys can be any valid JSON values,
including a JSON object (hash). This provides API clients with the
capability to store arbitrary structured data for the supported resource
types. Via search schema we also support querying/filtering by the
extended data for some value types.

## Types of extended data

**Note:** Extended data support in API resources is work in progress.
See the [API reference](/references/api/) for each resource for
information on supported extended data.

There are five types of extended data, which can be divided into two
groups - _data_ and _metadata_. _Data_ is written by users via the
Marketplace API, while _metadata_ is written by operators via the Flex
Console. Each type has different access semantics (i.e. who is allowed
to read or write the data).

### Public data

_Public data_ is writable by whoever has write access to a given
resource (e.g. listing's author can write public data about the listing,
a user can write public data in their profile). Public data is readable
via all API endpoints that return the resource and by marketplace
operators.

Public data can be used, for instance, to store additional information
about listings and users in order to help customers make buying
decisions.

### Protected data

_Protected data_ is writable and readable by whoever has write access to
a resource. It is also readable by marketplace operators. Protected data
can be revealed to all transaction parties via the marketplace
[transaction process](/background/transaction-process/).

Protected data can be used to store information about listings or users
that is only made visible to a customer at a specific point in the
[transaction process](/background/transaction-process/).

### Private data

_Private data_ is similar to protected data, but is not intended to be
revealed via the transaction process. For instance, it can be used to
collect and store information about users or listings for marketplace
operators. It can also be used with integrations that want to store e.g.
a corresponding id in an external service.

### Public metadata

_Public metadata_ is writable by marketplace operators and can be read
via all API endpoints returning the corresponding resource. Public
metadata is supported for users and listings. It can also be used as
filters when searching via
[/listings/query](https://www.sharetribe.com/api-reference/marketplace.html#query-listings).

Public metadata is useful for example marking listings as promoted or
for linking listings with external services.

### Private metadata

**Note:** This feature is not yet supported by the Marketplace API.

_Private metadata_ is only readable and writable by marketplace
operators.

## Search schema

Extended data is available out of the box and can be written and read
via the Marketplace API without any prior configuration. _Search schema_
may optionally be defined for some value types of extended data. When a
schema is provided for a given extended data key, the API can use this
information to make querying the extended data possible via some API
endpoints. For instance
[/listings/query](https://www.sharetribe.com/api-reference/marketplace.html#query-listings)
supports querying listings by public data.

Search schemas can be managed by
[Flex CLI](/flex-cli/getting-started-with-flex-cli/). With the CLI, you
can list, set and unset search schemas to listing's Public data and
Public metadata. The commands to manage search schemas are:

- `flex-cli search` List all defined data schemas
- `flex-cli search set` Set (create or update) data schema
- `flex-cli search unset` Unset data schema

You can also check out our tutorial for
[managing search schemas with Flex CLI](https://www.sharetribe.com/docs/flex-cli/manage-search-schemas-with-flex-cli/).

> **Note:** Only top-level values in extended data can have a schema.
