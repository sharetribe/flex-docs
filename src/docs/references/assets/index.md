---
title: Assets
slug: assets
updated: 2022-05-16
category: references
ingress: Reference documentation providing information on assets.
published: true
---

_Assets_ are a mechanism for defining client application configuration
data and content for a marketplace. The assets are managed by a
marketplace operator and changes relatively infrequently. Each _asset_
is an object that defines a _path_ and _content_. The path gives the
asset a name and allows organizing assets in a way similar to a file
system, where assets can be organized in directory-like structure. The
content of the asset is its data in one of the supported data types.

At present, Flex supports only JSON data as assets. Support for images
(JPEG, PNG, etc) is coming in the future.

The assets are typically edited by a marketplace operator though Flex
Console.

> **IMPORTANT** All assets are considered public and must not be used to
> store secret or otherwise sensitive information.

> **Note:** Assets are in early development. At present, Console allows
> only limited ability to manage the content of a single asset - the
> JSON document describing the [microcopy strings](/concepts/microcopy/)
> for a client application. Stay tuned for more later on!

For example, a marketplace may have assets with the following assets:

```shell
├── config
│   └── client.json
└── content
    └── translations.json
```

where `config/client.json` could contain configuration data (for
instance, UI colors, marketplace pricing settings, etc) and
`content/translations.json` could contain string microcopy data to be
used in a marketplace client application (such as one based on one of
the FTW templates).

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

To facilitate access to the latest asset data, Flex maintains a built-in
_alias_ called `latest` that always refers to the latest asset tree
version.

> **Note:** Old versions of the asset tree may be automatically deleted,
> but no sooner than 24 hours after the version gets succeeded by a
> newer one.

## Retrieving asset data

Client applications retrieve asset data through the
[Asset Delivery API](https://www.sharetribe.com/api-reference/asset-delivery-api.html).
Asset data can be access either by alias (using the built-in `latest`
alias) or by specific version.

In order to access asset data, clients need a client ID for a valid Flex
Marketplace API application. The easiest way to access assets is by
using the
[Flex SDK for JavaScript](/concepts/js-sdk/#flex-sdk-for-javascript).

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
development or production one. For production marketplaces the cache
time can be up to 5 minutes, while for development marketplaces it is
much lower. Refer to the
[Asset Delivery API reference](https://www.sharetribe.com/api-reference/asset-delivery-api.html)
for up-to-date-information. The `Cache-Control` HTTP header will always
provide correct data and client applications should observe that if
custom caching is being implemented.

> In production marketplaces, the latest asset data can be cached and it
> may take up to 5 minutes before any changes are visible to all end
> users.

## Further reading

- [Editing client application microcopy](/concepts/microcopy/)
- [Managing static page content](/concepts/content-management)
- [Asset Delivery API reference](https://www.sharetribe.com/api-reference/asset-delivery-api.html)
