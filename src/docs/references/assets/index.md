---
title: Assets
slug: assets
updated: 2025-01-29
category: references
ingress: Reference documentation providing information on assets.
published: true
---

_Assets_ are a mechanism for defining client application configuration
data and content for a marketplace. The assets are managed by a
marketplace operator and change relatively infrequently. Each _asset_ is
an object that defines a _path_ and _content_. The path gives the asset
a name and allows organizing assets in a way similar to a file system,
where assets can be organized in directory-like structure. The content
of the asset is its data in one of the supported data types.

At present, Sharetribe supports only JSON data as assets. Support for
images (JPEG, PNG, etc) is coming in the future.

The assets are typically edited by a marketplace operator though
Sharetribe Console.

<warning>

All assets are considered public and must not be used to store secret or
otherwise sensitive information.

</warning>

At present, Sharetribe uses assets for managing marketplace content
without code changes:

- you can modify
  [marketplace text strings](/concepts/marketplace-texts/),
- create content [pages](/concepts/content-management/) for your
  marketplace, and
- configure your marketplace branding, layout, users, listings, search,
  footer, and transactions

For example, a marketplace may have the following assets:

```shell
├── content
│   └── translations.json
└── design
    └── branding.json
```

where `design/branding.json` could contain configuration data (for
instance, UI colors, logo, etc) and `content/translations.json` could
contain string marketplace text data to be used in a marketplace client
application (such as one based on one of the Sharetribe Web Template).

## Asset versioning

Collectively, the set of assets of a marketplace is called the _asset
tree_. Each time the data of one or more assets is changed, a new asset
is added, or an existing asset is deleted, a new version of the asset
tree is created. Old asset tree versions are never updated. In other
words, tree versions are immutable.

Each tree version, therefore, represents the exact set of assets and
their data at the time when the version was created.

The following analogy with the Git version control system may be useful
to consider: The asset tree versions are analogous to Git commit SHAs.
The entire asset tree is versioned as a whole and individual assets do
not have their own independent versions. Unlike Git, however, the asset
tree versioning does not support branching.

To facilitate access to the latest asset data, Sharetribe maintains a
built-in _alias_ called `latest` that always refers to the latest asset
tree version.

<info>

Old versions of the asset tree may be automatically deleted, but no
sooner than 24 hours after the version gets succeeded by a newer one.

</info>

## Retrieving asset data

Client applications retrieve asset data through the
[Asset Delivery API](https://www.sharetribe.com/api-reference/asset-delivery-api.html).
Asset data can be access either by alias (using the built-in `latest`
alias) or by specific version.

In order to access asset data, clients need a client ID for a valid
Sharetribe Marketplace API application. The easiest way to access assets
is by using the
[Sharetribe SDK for JavaScript](/concepts/js-sdk/#sharetribe-sdk-for-javascript).

See the
[Asset Delivery API reference](https://www.sharetribe.com/api-reference/asset-delivery-api.html)
for more information.

### Asset data caching

In order to ensure as efficient data retrieval as possible, the Asset
Delivery API response data can be cached by both the Asset CDN and the
client. Each API response comes with appropriate `Cache-Control` and
`ETag` HTTP headers automatically and caching works out of the box with
clients that support these headers (such as the end users' web
browsers).

Since asset versions are immutable, asset data that is accessed by a
specific version can be cached for extended period of time. On the other
hand, the `latest` alias is mutable and therefore asset data retrieved
by alias cannot be cached indefinitely. The cache time for access by
alias can differ depending on whether your marketplace environment is a
development or live one. For Live marketplaces the cache time can be up
to 5 minutes, while for Test and Development marketplaces it is much
lower. Refer to the
[Asset Delivery API reference](https://www.sharetribe.com/api-reference/asset-delivery-api.html)
for up-to-date-information. The `Cache-Control` HTTP header will always
provide correct data and client applications should observe that if
custom caching is being implemented.

<info>

In live marketplaces, the latest asset data can be cached and it may
take up to 5 minutes before any changes are visible to all end users.

</info>

## Available default asset files

Assets are fetched by file path. The asset files available to be fetched
by default are the following:

### General

- Localization: `/general/localization.json`
- Access control: `/general/access-control.json`

### Content

- Content pages: `/content/pages/{pageId}.json`
- Top bar: `/content/top-bar.json`
- Footer: `/content/footer.json`
- Marketplace texts: `/content/translations.json`
- Email texts: `/content/email-texts.json`

### Design

- Branding: `/design/branding.json`
- Layout: `/design/layout.json`

### Users

- User types: `/users/user-types.json`
- User fields: `/users/user-fields.json`

### Listings

- Listing types: `/listings/listing-types.json`
- Listing categories: `/listings/listing-categories.json`
- Listing fields: `/listings/listing-fields.json`
- Listing search: `/listings/listing-search.json`

### Transactions

- Minimum transaction size:
  `/transactions/minimum-transaction-size.json`

### Monetization

- Commission: `/transactions/commission.json`

### Integrations

- Map: `/integrations/map.json`
- Analytics: `/integrations/analytics.json`
- Google Search Console: `/integrations/google-search-console.json`

## Further reading

- [Editing client application marketplace texts](/concepts/marketplace-texts/)
- [Managing asset-based marketplace content](/concepts/content-management/)
- [Asset Delivery API reference](https://www.sharetribe.com/api-reference/asset-delivery-api.html)
