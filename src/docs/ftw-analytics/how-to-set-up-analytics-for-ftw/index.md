---
title: How to set up Analytics for FTW
slug: how-to-set-up-analytics-for-ftw
updated: 2021-04-29
category: ftw-analytics
ingress:
  This guide describes how to set up analytics for Flex Template for Web
  (FTW).
published: true
---

FTW supports tracking page views with pluggable analytics handlers.

## Configure Google Analytics ID

Google Analytics (GA) is supported by default. To enable GA, set the GA
tracker ID to the environment variable `REACT_APP_GOOGLE_ANALYTICS_ID`;

Note that the current script expects a *Universal Analytics property only*
tracking ID. If you want to use GA4, you should update the Google
Analytics scripts first.

That's it! You're good to go.

> Note: Google Analytics doesn't work in hot-loading environment! <br>
> GA script is added in server-side setup. You can test it local
> environment with `yarn run dev-server`.

## Optional: Use a custom analytics handler

If you want to add a new analytics library, you can do as follows:

### 1. Add the analytics library script

If the analytics library has an external script, add the library script
tag to the
[public/index.html](https://github.com/sharetribe/flex-template-web/blob/master/public/index.html)
file. If you need more control, see how the GA script is added in
[server/renderer.js](https://github.com/sharetribe/flex-template-web/blob/master/server/renderer.js).

### 2. Create a handler

To track page views, create a custom handler e.g. in
[src/analytics/handlers.js](https://github.com/sharetribe/flex-template-web/blob/master/src/analytics/handlers.js).
The handler should be a class that implements a `trackPageView(url)`
method.

Note that the `url` parameter might not be the same as in the URL bar of
the browser. It is the canonical form of the URL. For example, in the
listing page it doesn't have the dynamic title slug in the middle. This
allows unified analytics and correct tracking of pages that can be
accessed from multiple different URLs.

If your analytics library takes the page URL from the browser, you might
need to override that behavior to use the canonical URL that is given to
the method.

### 3. Initialise the handler

Initialise the handler in the `setupAnalyticsHandlers()` function in
[src/index.js](https://github.com/sharetribe/flex-template-web/blob/master/src/index.js).
