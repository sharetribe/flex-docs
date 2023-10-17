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

Having a sitemap on your marketplace helps search engines to crawl and
index your website correctly. For a traditional website, sitemaps are
relatively easy to make, because all of your routes are built in to the
application.

However, on a marketplace, it is likely that you will have listing URLs
that include dynamic data from each listing – and you still want search
engines to index those pages. Sharetribe offers API endpoints for
fetching sitemap data for
[listings](https://www.sharetribe.com/api-reference/marketplace.html#query-list-of-listings)
and
[CMS pages](https://www.sharetribe.com/api-reference/marketplace.html#query-list-of-assets).

<info>

The Sharetribe Web Template has tooling to create a dynamic sitemap by
default. Read more about the template sitemap structure and logic:
**[Sitemap in Sharetribe Web Template](/ftw/sitemap-in-template/)**

</info>

If you are creating your own custom application, you can consider
whether you want to use the same practices that the web template uses to
craft the sitemap.

## Separate sitemaps for static and dynamic content

Static content sitemaps help search engines quickly index unchanging
pages like your "About" page, while dynamic content sitemaps focus on
frequently updated or user-generated content, such as listings in your
marketplace.

For example, the Sharetribe Web Template generates three different
sub-sitemaps linked from _sitemap-index.xml_, all with slightly
different data:

- _sitemap-default.xml_ exposes public built-in pages in the template.
  Non-public routes that require authentication are disallowed in the
  _robots.txt_ file.
- _sitemap-recent-listings.xml_ exposes routes to the most recently
  created listings. The listing data is fetched from a specific
  [_sitemapData_ endpoint](https://www.sharetribe.com/api-reference/marketplace.html#query-list-of-listings).
  The endpoint returns the 10 000 most recent listings.
- _sitemap-recent-pages.xml_ exposes routes to the CMS pages created in
  Console that do not have built-in paths in the client application. The
  page data is fetched from a specific
  [_sitemapData_ endpoint](https://www.sharetribe.com/api-reference/marketplace.html#query-list-of-assets).

It is good to note that the sitemap API endpoints cache results for one
day, so sitemaps generated using the sitemap API endpoints do not update
in real time.

If your marketplace has more than 10 000 listings, you will need to
fetch the information for older listing through Integration API. Since
the Integration API
[listing query endpoint](https://www.sharetribe.com/api-reference/integration.html#query-listings)
is paginated, you will need to filter the results by e.g. the
_createdAt_ attribute to retrieve all listings.

## Caching

In addition to the API endpoint caching, the template has its own cache
for one day, so the combined cache effect can be up to two days. You can
consider what kind of caching approach would work in your client
application.

Especially on bigger sites with multiple listings, listing sitemap data
can take up to a few seconds to fetch from the SDK. Caching the results
improves the sitemap performance.

## Resources

Read more about sitemaps from Google:

- [Building a XML sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#xml)
- [Managing large sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps)
- [Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
