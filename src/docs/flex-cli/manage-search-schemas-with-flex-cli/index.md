---
title: Manage search schemas with Flex CLI
slug: manage-search-schemas-with-flex-cli
updated: 2021-11-30
category: flex-cli
ingress:
  This tutorial shows you how to manage extended data search
  schemas with Flex CLI. With search schemas in place, you can use
  custom extended data fields as filters in your queries.
skills: basic command line, text editing
published: true
---

Flex CLI (Command-line interface) is a tool for changing your
marketplace's advanced configurations such as transaction processes and
email templates.

This tutorial expects that you have already installed Flex CLI and are
logged in with your API key. If not, it's recommended to first read the
tutorial
[Getting started with Flex CLI](/flex-cli/getting-started-with-flex-cli/).

In this tutorial, we will add data schemas for the `category` and
`amenities` public data fields for listings. And then `age` protected data
for users. New marketplaces don't have any schemas in the backend by default
since the needs of marketplaces vary.

## Extended data types and schema scopes

There are [various types of extended data](/references/extended-data/). Search
schema is scoped to a particular type of extended data and the support differs
depending on whether the schema is defined for listings or user profiles. The
following table summarizes the supported search schema scopes.

| schema-for  | Supported scopes                 |
|-------------|----------------------------------|
| listing     | public, meta, keyword            |
| userProfile | public, meta, private, protected |

> There is no API endpoint for querying users in the Marketplace API, so `userProfile` search
> schema applies only to the
> [/users/query endpoint in the Integration API](https://www.sharetribe.com/api-reference/integration.html#query-users).

All types of extended data are editable in Console by the operator, but only public
data and metadata can be seen by other marketplace users. Currently, listing
search schemas can be scoped either to public or metadata. User search schemas are
currently only available through an Integration API endpoint, so they can also be
scoped to private and protected. To see more details about extended data, see the
[Extended data](/references/extended-data/) reference.

You can store any JSON data in extended data, but only top-level keys of
certain type can have search schemas. If there is a mismatch between the
defined schema and what is stored to the extended data, the indexing
just skips those values.

## Schema types and cardinalities

| Type       | Cardinality | Example data                                              | Example query                                                                      |
| ---------- | ----------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| enum       | one         | `category: "electric"`                                    | `pub_category=electric,wood`                                                       |
| multi-enum | many        | `amenities: ["towels", "bathroom"]`                       | `pub_amenities=has_all:towels,bathroom` or `pub_amenities=has_any:towels,bathroom` |
| boolean    | one         | `hasLakeNearby: true`                                     | `pub_hasLakeNearby=true`                                                           |
| long       | one         | `distanceToLake: 30`                                      | `pub_distanceToLake=5,40`                                                          |
| text       | one         | `stoveDescription: "Modern and powerful electric stove."` | `keywords=powerful%20modern`                                                       |

Note that the scope in the examples above is `public`. Please use the correct prefix
depending on the scope of the data (`meta_` for metadata, `priv_` for private data,
`prot_` for protected data and `pub_` for public data). Also, it's worth noting
that the query parameter with a `text` schema is `keywords` which also targets
the `title` and `description` attributes of a listing. See
[Keyword search](/background/how-the-search-works/#keyword-search) for
more information.

### Providing multiple query params for a single field

You can provide multiple values in the query parameter by separating
those with a comma. The matching behavior is different for different
schema types.

With the `enum` type like the category above, when you query
`pub_category=electric,wood`, you will match listings with either
"electric" OR "wood" as the category. With the `multi-enum`, you can
control the matching mode explicitly. The query
`pub_amenities=has_all:towels,bathroom` will match listings with
"towels" AND "bathroom" in the amenities whereas the query
`pub_amenities=has_any:towels,bathroom` will match listings with either
"towels" OR "bathroom" (or both). If you don't specify the match mode in
the query (i.e. `pub_amenities=towels,bathroom`), by default we use the
has_all mathing mode (AND) for multi enums.

With the `text` type, you provide a search query, so splitting values
with a comma doesn't make sense. You will just provide a string of text
as the search query, and the query will be used as described
[in the keyword search explanation](/background/how-the-search-works/#keyword-search)
section.

With the `long` type, you can provide minimum and/or maximum values for
the filtering.

For the full query reference, see the
[/listings/query](https://www.sharetribe.com/api-reference/marketplace.html#query-listings)
endpoint API reference.

## Adding listing search schemas

FTW defines two search filters in listing public data: category and
amenities. A category is something that is selected from a dropdown of
options, so the schema type should be `enum`. A listing can have
multiple amenities that are also selected from a set of options and
stored in an array, so the schema type should be `multi-enum`.

Let's first see what search schemas we have defined:

```
$ flex-cli search -m my-test-marketplace

Schema for   Scope   Key   Type   Default value   Doc

```

Let's add the search schemas for the category and amenities:

```
$ flex-cli search set --key category --type enum --scope public -m my-test-marketplace
```

```
$ flex-cli search set --key amenities --type multi-enum --scope public -m my-test-marketplace
```

We should now see the details for these new schemas:

```
$ flex-cli search -m my-test-marketplace

Schema for   Scope   Key        Type        Default value   Doc
listing      public  amenities  multi-enum
listing      public  category   enum
```

Note that `--schema-for` option is not needed when adding schema for `listing` as `listing` is the default.

If you wish to remove a schema, you can use the `search unset` command.

## Adding user search schema

User profile search schema can be useful, if you have an Integration API application that
needs to query different sets of users, depending on some value in the user profile's extended data.
For instance, if users have age attribute stored in their protected data, you can use the
[/users/query endpoint in the Integration API](https://www.sharetribe.com/docs/references/extended-data/)
to find users of a certain age range.

Search schema for user profiles can be added as follows:

```
$ flex-cli search set --schema-for userProfile --key age --type long --scope protected -m my-test-marketplace
```

The above adds a search schema for `userProfile` with `long` type for a `key` named "age".

Querying the defined schemas now lists both the listing schemas added on the
previous step and the new user profile schema:

```
$ flex-cli search -m my-test-marketplace

Schema for   Scope      Key        Type        Default value   Doc
listing      public     amenities  multi-enum
listing      public     category   enum
userProfile  protected  age        long
```

If you wish to remove a schema, you can use the `search unset` command.

## Summary

In this tutorial, we used Flex CLI to define search schemas for our
marketplace. We used the category and amenities as examples as FTW
expects those.

For more information, see the following resources:

- [How the search works](/background/how-the-search-works/) background
  article
- [Extended data reference](/references/extended-data/)
- [/listings/query](https://www.sharetribe.com/api-reference/marketplace.html#query-listings)
  endpoint API reference
- [Extend listing data in FTW](/cookbook-data-model/extend-listing-data-in-ftw/)
- [Change search filters in FTW](/cookbook-search/change-search-filters-in-ftw/)
