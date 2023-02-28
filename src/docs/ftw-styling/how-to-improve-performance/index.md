---
title: Performance and page speed
slug: how-to-improve-performance
updated: 2023-01-01
category: ftw-styling
ingress:
  This guide describes ways to improve the loading and rendering
  performance of your marketplace.
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

- [Check page performance](#check-page-performance)
- [Optimize image sizes](#optimize-image-sizes)
- [Lazy load off-screen images and other components](#lazy-load-off-screen-images-and-other-components)
- [Use sparse attributes](#use-sparse-attributes)

## Check page performance

The first step is, of course, to start measuring performance.
[Lighthouse](https://developers.google.com/web/tools/lighthouse/) is a
good tool to check rendering performance. At least check those pages
that are visible to unauthenticated users (e.g. landing page, search
page, listing page, about page and other content pages).

Lighthouse will give you some tips about how to improve performance and
other aspects that website developers should think about.

## Optimize static image sizes

If your page contains static images (e.g. images that are not served
through Sharetribe), you should check that the image size is no bigger
than the size it is rendered in. Adjusting image dimensions is the first
step, but you should also consider image quality, advanced rendering
options, and possibly serving those images from a CDN instead of from
within your web app.

**Optimization checklist**:

- Make sure that the image's actual dimensions match the dimensions of
  the DOM element.
- Lighthouse suggests that image compression level should be 85% or
  lower. [Read more](https://web.dev/uses-optimized-images/)
- A good rule-of-thumb is that use JPEG for images and photos, where PNG
  is better for graphics, such as logos, graphs and illustrations.
- If you are using JPEG images, think about saving them as progressive
  JPEGs.
  [Read more](https://cloudinary.com/blog/progressive_jpegs_and_green_martians) +
  [Photoshop guide](https://helpx.adobe.com/photoshop-elements/using/optimizing-images-jpeg-format.html)
- If you are using PNG images, consider running them through PNG
  optimizers to reduce file size. There are plenty of options available,
  one example is [TinyPNG.com](https://tinypng.com)
- Think about serving images and other static assets from a CDN.
  [Read more.](https://www.smashingmagazine.com/2017/04/content-delivery-network-optimize-images/)

## Lazy load off-screen images and other components

Another way of dealing with images is to lazy load those images that are
not visible inside an initially rendered part of the screen. Lazy
loading these off-screen images can be done with a helper function:
`lazyLoadWithDimensions` (from _util/contextHelpers/_). For an example
how to use the helper function, see the
[ListingCard component](https://github.com/sharetribe/ftw-x/blob/main/src/components/ListingCard/ListingCard.js#L41).

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
[in the code splitting article](/ftw/how-code-splitting-works-in-ftw/).
