---
title: How to set up Analytics for FTW
slug: how-to-set-up-analytics-for-ftw
updated: 2021-05-09
category: ftw-analytics
ingress:
  This guide describes how to set up analytics for Flex Template for Web
  (FTW).
published: true
---

FTW comes with built-in support for Google Analytics, and also supports tracking page views with customisable analytics handlers. This article explains how to enable Google Analytics and how to use and create custom analytics handlers.

## Configure Google Analytics

FTW has built-in support for Google Analytics. All you need to do is assign your Google Analytics Tracking ID to the environment variable `REACT_APP_GOOGLE_ANALYTICS_ID`.

> Google Analytics doesn't work in a hot-loading environment!
> The analytics script is added server-side. You can test it in your local environment by using the command `yarn run dev-server`.

### Google Analytics 4
Google recently released their new analytics service Google Analytics 4. Support for Google Universal Analytics will end on October 1, 2023. New versions of FTW provide out-of-the-box support for Google Analytics 4. 

If you're starting development on a new version of FTW and prefer to use Universal Analytics, you should see how it has been implemented in earlier versions of FTW. On the contrary, if your marketplace is built on top of an older version of FTW and you want to start using Google Analytics 4, you'll need to implement the changes introduced in this commit.

New versions of FTW will expect a Tracking ID compatible with Google Analytics 4. The ID is expected to begin with the "G-" prefix. 

It is not recommended to use the Enhanced Measurements feature introduced in Google Analytics 4, which is enabled by default. The Enhanced Measurements feature injects code into link tags which can break in-app navigation in FTW. Therefore, we strongly recommend disabling the Enhanced Measurements feature. 

If that's not an option, you can continue to use Enhanced Measurements if you disable the Outbound clicks and page changes based on browser history events features. 

### Built-in handlers


## Custom analytics libraries


### Add the analytics library script
If the analytics library has an external script, add the library script
tag to the
[public/index.html](https://github.com/sharetribe/flex-template-web/blob/master/public/index.html)
file. If you need more control, see how the GA script is added in
[server/renderer.js](https://github.com/sharetribe/flex-template-web/blob/master/server/renderer.js).

### Create a handler
To track page views, create a custom handler e.g. in
[src/analytics/handlers.js](https://github.com/sharetribe/flex-template-web/blob/master/src/analytics/handlers.js).
The handler should be a class that implements a `trackPageView(url)`
method.

Note that the `url` parameter might not be the same as in the URL bar of
the browser. It is the canonical form of the URL. For example, in the
listing page, it doesn't have the dynamic title slug in the middle. This
allows unified analytics and correct tracking of pages that can be
accessed from multiple different URLs.

If your analytics library takes the page URL from the browser, you might
need to override that behavior to use the canonical URL that is given to
the method.

### Initialise the handler

Initialise the handler in the `setupAnalyticsHandlers()` function in
[src/index.js](https://github.com/sharetribe/flex-template-web/blob/master/src/index.js).
