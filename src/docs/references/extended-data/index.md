---
title: Extended data
slug: extended-data
updated: 2021-12-15
category: references
ingress:
  Reference documentation providing information on all the different
  types of extended data.
published: true
---

_Extended data_ is a set of arbitrary keys and values stored with the
API resources. The values for the keys can be any valid JSON values,
including a JSON object (hash). This provides API clients with the
capability to store arbitrary structured data for the supported resource
types. Via search schema we also support querying, filtering, and
sorting by extended data for some value types.

## Types of extended data

**Note:** Extended data support in API resources is work in progress.
See the [API reference](/concepts/api/) for each resource for
information on supported extended data.

There are four types of extended data: _metadata_, _private data_,
_protected data_ and _public data_. Each type has different access
semantics (i.e. who is allowed to read or write the data).

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
[transaction process](/concepts/transaction-process/).

Protected data can be used to store information about listings or users
that is only made visible to a customer at a specific point in the
[transaction process](/concepts/transaction-process/).

### Private data

_Private data_ is similar to protected data, but is not intended to be
revealed via the transaction process. For instance, it can be used to
collect and store information about users or listings for marketplace
operators.

### Metadata

_Metadata_ is writable by marketplace operators and can be read via all
API endpoints returning the corresponding resource. Metadata is
supported for users and listings. It can also be used as filters when
searching via
[/listings/query in Marketplace API](https://www.sharetribe.com/api-reference/marketplace.html#query-listings),
[/listings/query in Integration API](https://www.sharetribe.com/api-reference/integration.html#query-listings)
or
[/users/query in Integration API](https://www.sharetribe.com/api-reference/integration.html#query-users).

Metadata can be used to store data about listings and users that must
only be writable by marketplace operators or through integrations to
other systems built around the Integration API and that the users
themselves must not be able to modify.

## Search schema

Extended data is available out of the box and can be written and read
via the Marketplace API, Integration API and Console without any prior
configuration. _Search schema_ may optionally be defined for some value
types of extended data. When a schema is provided for a given extended
data key, the API can use this information to make querying the extended
data possible via some API endpoints. For instance
[/listings/query](https://www.sharetribe.com/api-reference/marketplace.html#query-listings)
supports querying listings by public data or metadata.

Search schemas can be managed with
[Flex CLI](/introduction/getting-started-with-flex-cli/). With the CLI,
you can list, set and unset search schemas for listing's public data and
metadata as well as for user profile's metadata, private, protected and
public data. The commands to manage search schemas are:

- `flex-cli search` List all defined data schemas
- `flex-cli search set` Set (create or update) data schema
- `flex-cli search unset` Unset data schema

You can also check out our tutorial for
[managing search schemas with Flex CLI](/how-to/manage-search-schemas-with-flex-cli/).

> **Note:** Only top-level values in extended data can have a schema.
