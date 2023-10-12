---
title: Sitemap support in Sharetribe
slug: sitemap-in-sharetribe
updated: 2023-10-12
category: concepts-development
ingress:
  This guide describes how the Sharetribe tooling supports creating a
  sitemap for your marketplace.
published: true
---

Having a sitemap on your marketplace helps search engines to process
your website correctly. For a traditional website, sitemaps are
relatively easy to make, because all of your routes are built in to the
application.

However, on a marketplace, it is likely that you will have listing URLs
that include dynamic data from each listing – and you still want search
engines to index those pages.

<info>

The Sharetribe Web Template has tooling to create a dynamic sitemap by
default. Read more about the template sitemap structure and logic:
**[Sitemap in Sharetribe Web Template](/sitemap-in-template)**

</info>

If you are creating your own custom application, you can consider
whether you want to use the same practices that the web template uses to
craft the sitemap.

## Separate sitemaps for static and dynamic content

The web template exposes three different sub-sitemaps from
_sitemap-index.xml_, all with slightly different data:

- _sitemap-default.xml_ exposes public built-in pages in the template.
  Non-public routes that require authentication are disallowed in the
  _robots.txt_ file.
- _sitemap-recent-listings.xml_ exposes routes to the most recently
  created listings. The listing data is fetched from a specific
  [_sitemapData_ endpoint](TODO API REF LINK). The endpoint returns the
  10 000 most recent listings.
- _sitemap-recent-pages.xml_ exposes routes to the CMS pages created in
  Console that do not have built-in paths in the client application. The
  page data is fetched from a specific [_sitemapData_ endpoint](TODO API
  REF LINK).

## Caching

The template caches the sitemap for one day by default. Especially on
bigger sites with multiple listings, listing sitemap data can take up to
a few seconds to fetch from the SDK. Caching the results improves the
sitemap performance.
