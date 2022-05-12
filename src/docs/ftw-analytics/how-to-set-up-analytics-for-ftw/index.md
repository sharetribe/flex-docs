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

FTW comes with built-in support for Google Analytics and supports tracking page views with customisable analytics handlers. This article explains how to enable Google Analytics and use and create custom analytics handlers.

## Configure Google Analytics

FTW has built-in support for Google Analytics. All you need to do is assign your Google Analytics Tracking ID to the environment variable `REACT_APP_GOOGLE_ANALYTICS_ID`.

> Google Analytics doesn't work in a hot-loading environment!
> The analytics script is added server-side. You can test it in your local environment by using the command `yarn run dev-server`.

### Google Analytics 4
Google recently released their new analytics service Google Analytics 4. Support for Google Universal Analytics will end on October 1, 2023. New versions of FTW provide out-of-the-box support for Google Analytics 4. 

If you're starting development on a new version of FTW and prefer to use Universal Analytics, you should look into how Analytics was implemented before [this pull request](https://github.com/sharetribe/ftw-daily/pull/1508). If you have built your marketplace on top of an older version of FTW and you want to start using Google Analytics 4, you'll need to implement the changes introduced in [this pull request](https://github.com/sharetribe/ftw-daily/pull/1508).

> New versions of FTW will expect a Tracking ID compatible with Google 
> Analytics 4. FTW expects the ID to begin with the "G-" prefix. 

#### Enhanced measurements
It is not recommended to use the Enhanced Measurements feature introduced in Google Analytics 4, which is enabled by default. The Enhanced Measurements feature injects code into link tags which can break in-app navigation in FTW. Therefore, we strongly recommend disabling the Enhanced Measurements feature when using Google Analytics 4 with FTW.

<video>
    <source src='./turn-off-enhanced-measurements.mp4' type='video/mp4'>
    <source src='./turn-off-enhanced-measurements.webm' type='video/webm'>
    <source src='./turn-off-enhanced-measurements.ogv' type='video/ogg'>
</video>

If that's not an option, you can continue to use Enhanced Measurements if you disable the *Outbound clicks* and *page changes based on browser history events* features. 

![Disable Outbound clicks](./disable.png)

### Built-in handlers

FTW includes an [event handler](https://github.com/sharetribe/ftw-daily/blob/89b9390e7235253067d0e78d9f838fbd6b07c10d/src/analytics/handlers.js#L16) that sends `page_view` events to Google Analytics. These events need to registered manually because FTW is a single-page application, meaning that in-app navigation does not render a page load. 

The Google Analytics script registers a `page_view` event automatically on every page load. The [`trackPageView`](https://github.com/sharetribe/ftw-daily/blob/89b9390e7235253067d0e78d9f838fbd6b07c10d/src/analytics/handlers.js#L16) function takes this into account and only sends a `page_view` event to Google if a page is accessed through in-app navigation.

If you'd like to track something other than page views, you can implement your custom handler using the `trackPageView` function as an example.

## Custom analytics libraries
If you choose to go with another analytics provider, you can follow these steps to import the third-party script and create a custom handler. In some cases, it might also be worth looking into npm packages instead of manually appending a third-party script.

### Add the analytics library script
If the analytics library has an external script, you can add the library script
tag to the [public/index.html](https://github.com/sharetribe/flex-template-web/blob/master/public/index.html)
file. 

In some cases, you might want to import the script during server-side rendering (SSR). That allows you to start tracking events as early as possible. To inject the script during SSR, see how the `googleAnalyticsScript` is imported in the [server/renderer.js](https://github.com/sharetribe/flex-template-web/blob/master/server/renderer.js) file. Importing the script during SSR also allows you to conditionally import the script, depending on, e.g. certain environment variables.

### Create a handler
You can create a custom handler e.g. in
[src/analytics/handlers.js](https://github.com/sharetribe/flex-template-web/blob/master/src/analytics/handlers.js).
If you want to track page views, you could create a class that implements a `trackPageView(url)`
method.

Note that the `url` parameter passed to the function might not be the same as in the URL bar of
the browser. It is the canonical form of the URL. 

> Example: the listing page URL is constructed dynamically: `l/{listing-name}/{listing-slug}`.
> The canonical from of that URL would be: `l/{listing-slug}`

This approach allows unified analytics and correct tracking of pages that can be
accessed from multiple URLs.

If your analytics library tries to access the page URL directly through the browser, you might
need to override that behavior to use the canonical URL that is given to
the method.

### Initialise the handler

Finally, you only need to initialise the handler in the `setupAnalyticsHandlers()` function in
[src/index.js](https://github.com/sharetribe/flex-template-web/blob/master/src/index.js).
