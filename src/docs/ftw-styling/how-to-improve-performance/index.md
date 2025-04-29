---
title: Performance and page speed
slug: how-to-improve-performance
updated: 2025-04-24
category: template-styling
ingress:
  This guide describes ways to improve and understand the load times and
  rendering performance of your marketplace.
published: true
---

When we think about page speed, there are two different scenarios that
we need to address:

- The speed of the initial page load and possible reloads after that
- The speed of changing the page within Single page application (SPA)

The first one is usually a slower process. A browser needs to load all
the HTML, CSS, JavaScript, and images - then it needs to understand and
execute those files, calculate the layout, paint components and finally
composite the whole view. The initial page load is the slowest since
consequent reloads will benefit from caching.

SPAs can improve from that since they don't necessarily need to download
any more JavaScript, HTML, or CSS - already downloaded JavaScript might
be enough to render consequent pages when a user navigates to another
page. Most of the time, SPAs fetch data for that page.

These two UX scenarios might also conflict with each other. If all the
JavaScript is in one big bundle, page changes within a SPA are fast.
However, downloading and evaluating a big JavaScript file slows initial
page rendering. Even though users rarely experience the full initial
page load speed when they use a SPA like the Sharetribe Web Template, it
is good to keep track of that speed. Especially since that is what
search engine bots monitor, it might affect your page rank.

Read more about
[website performance](https://developers.google.com/web/fundamentals/performance/why-performance-matters/).

- [Measuring page performance](#measuring-page-performance)
- [Optimize image sizes](#optimize-image-sizes)
- [Lazy load off-screen images and other components](#lazy-load-off-screen-images-and-other-components)
- [Use sparse attributes](#use-sparse-attributes)

## Measuring page performance

You can use different online tools measure page performance.
[Lighthouse](https://developers.google.com/web/tools/lighthouse/) and
[PageSpeed Insights](https://pagespeed.web.dev/) are both popular tools
to check rendering performance.

Note that as the template is a single page application, a lot of the
data associated with the application is loaded on the initial page load.
This initial page load is also what is used for the Performance metric
in Lighthouse and PageSpeed Insights. However, a Single Page Application
is very fast after the initial page load, as most of the data needed to
access consequent pages are already cached in the browser. While
performance metrics can be a valuable tool to debug performance issues,
they rarely consider users' subsequent actions on a website, operating
under the assumption that users will only visit a single page on the
website.

We recommend using
[code-splitting](/template/code-splitting-in-template/) to improve
initial page load times. You can further optimise performance by moving
components only used on specific pages to page directories (with page
directories being the directories you can find under `src/containers/`).
Code located in the `src/components` directory is loaded into the
`main.bundle.js` file served to the client on the initial page load.

## Optimize static image sizes

If your page contains static images (e.g. images that are not served
through Sharetribe), you should check that the image size is no bigger
than the size it is rendered in. Adjusting image dimensions is the first
step, but you should also consider image quality, advanced rendering
options, and possibly serving those images from a CDN instead of from
within your web app. This doesn't apply to images uploaded using
Console; these images are optimized by our image delivery service.

## Lazy load off-screen images and other components

Another way of dealing with images is to lazy load those images that are
not visible inside an initially rendered part of the screen. Lazy
loading these off-screen images can be done with a helper function:
`lazyLoadWithDimensions` (from _util/contextHelpers/_). For an example
how to use the helper function, see the
[ListingCard component](https://github.com/sharetribe/web-template/blob/main/src/components/ListingCard/ListingCard.js#L41).

## Use sparse attributes

Another way to reduce the amount of data that is fetched from API is
sparse attributes. This is a feature is not fully leveraged in the
template, but it is created to reduce unnecessary data and speed up
rendering. You can read more from
[Marketplace API reference for sparse attributes](https://www.sharetribe.com/api-reference/#sparse-attributes).

## Use code splitting

Code splitting is enabled with Loadable Components and by default
route-based splits are made through _src/routing/routeConfiguration.js_.
If you want to improve performance, you should prefer subcomponents
inside page-directories instead of adding more code to shared components
directory. Those components end up to main chunk file that is downloaded
on each page (when full page-load is requested).

You can read more
[in the code splitting article](/template/code-splitting-in-template/).

## Caching

In some cases, introducing a basic caching mechanism on the server can
help improve performance by avoiding repeated API calls for every
request. The Sharetribe Web Template includes a lightweight example of
this kind of caching in the sitemap generation logic.

This caching uses an in-memory store with a time-to-live (TTL) value to
keep data fresh for a set amount of time (in this case, one day):

```js
const ttl = 86400; // 1 day in seconds

const createCacheProxy = ttl => {
  const cache = {};
  return new Proxy(cache, {
    get(target, property) {
      const cachedData = target[property];
      if (
        cachedData &&
        Date.now() - cachedData.timestamp < ttl * 1000
      ) {
        return cachedData;
      }
      return {
        data: null,
        timestamp: cachedData?.timestamp || Date.now(),
      };
    },
    set(target, property, value) {
      target[property] = { data: value, timestamp: Date.now() };
    },
  });
};

const cache = createCacheProxy(ttl);
```

This cache object can be used to temporarily store data like API
responses or generated content. When a request is made, the server
checks if the data is already cached and still valid and if so, it
serves it instantly, skipping an call to the API. Keep in mind this
approach works best for read-heavy, low-volatility data (such as content
pages), and is not suitable for storing critical or user-specific data.
