---
title: Sitemap in Sharetribe Web Template
slug: sitemap-in-template
updated: 2023-10-12
category: ftw-analytics
ingress:
  This guide describes how the default sitemap works in the Sharetribe
  Web Template, and how to customise it.
published: true
---

Your marketplace's sitemap helps search engines to process the correct
information on your marketplace. The Sharetribe Web Template has
built-in support for creating a sitemap (introduced in
[this change set](https://github.com/sharetribe/web-template/pull/243)),
and this article gives you some context into how sitemap generating
works in the template.

## Template sitemap structure

By default, the template generates several files related to the sitemap.
When running the template locally with _yarn run dev_, you can find
these routes on the dev server port, i.e. localhost:3500.

You can read more about the template sitemap and other resources in the
[Resources README](https://github.com/sharetribe/web-template/blob/main/server/resources/README.md).

### robots.txt

The [your-domain]**/robots.txt** file details the authenticated routes
that crawlers should avoid, and exposes the URL to the main sitemap. If
you custom develop routes that require authentication, it is a good idea
to specify them here.

### sitemap-index.xml

The [your-domain]**/sitemap-index.xml** file further exposes three
separate sub-sitemaps. This is useful because it allows you more
detailed tracking in analytics tools, and it reduces the size of each
individual sitemap.

The index and the sub-sitemaps are generated in
[server/resources/sitemap.js](https://github.com/sharetribe/web-template/blob/main/server/resources/sitemap.js).

### sitemap-default.xml

The [your-domain]**/sitemap-default.xml** file includes your
marketplace's public built-in pages.

It also includes the landing page, the terms of service page, and the
privacy policy page – these pages have specified paths in the default
template, even though their content is fetched from assets.

If you add public custom paths to your template, remember to
[add them in this sitemap](https://github.com/sharetribe/web-template/blob/main/server/resources/sitemap.js#L45)
as well. You can also add sitemap entries for some of your key searches,
e.g.

```diff
  const defaultPublicPaths = {
    landingPage: { url: '/' },
    termsOfService: { url: '/terms-of-service' },
    privacyPolicy: { url: '/privacy-policy' },
    signup: { url: '/signup' },
    login: { url: '/login' },
    search: { url: '/s' },
+   searchMountainBikes: { url: '/s?pub_category=mountainBike' }
  };
```

### sitemap-recent-listings.xml

The [your-domain]**/sitemap-recent-listings.xml** file shows the URLs
for your marketplace's most recently created listings. The listing data
is fetched from the _sdk.sitemapData.queryListings()_ endpoint, and the
endpoint returns the 10 000 most recent public listings.

The recent listing ids are mapped to the template's default canonical
listing URLs. If you make changes to the listing canonical URL
structure, be sure to make the corresponding changes to this sitemap as
well.

### sitemap-recent-pages.xml

The [your-domain]**/sitemap-recent-pages.xml** file shows the URLs for
your marketplace's asset-based pages that are shown in
_[your-domain]/p/:pathId_. The page information is fetched using the
_sdk.sitemapData.queryAssets()_ endpoint.

The default logic filters out the pages that have custom paths: landing
page, terms of service, and privacy policy. If you add public permanent
paths for asset-based pages to your template and your
_sitemap-default.xml_ file, be sure to filter them out of the SDK result
set in
[server/resources/sitemap.js](https://github.com/sharetribe/web-template/blob/main/server/resources/sitemap.js#L284)

## Sitemap caching

The template caches sitemap data
[for one day by default](https://github.com/sharetribe/web-template/blob/main/server/resources/sitemap.js#L55).
Especially on bigger sites with multiple listings, listing sitemap data
can take up to a few seconds to fetch from the SDK. Caching the results
improves the sitemap performance.

## Testing your sitemap on Google

To test your sitemap on Google, you should add Google site verification
through Sharetribe Console. After that, you can add your sitemap index
to Google Search Console. You can read more detailed instructions in
[Google's own documentation](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#addsitemap).
