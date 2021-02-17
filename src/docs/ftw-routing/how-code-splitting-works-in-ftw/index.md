---
title: How code splitting works in FTW
slug: how-code-splitting-works-in-ftw
updated: 2021-02-12
category: ftw-routing
ingress:
  This article explains how the code splitting setup works in Flex
  Template for Web (FTW).
published: true
---

Previously, _sharetribe-scripts_ created one
[UMD](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm)
build that was used on both server and frontend. I.e. all the code used
in the app was bundled into a single main.bundle.js file and that was
used in the web app and server.

Unfortunately, this has meant that code-splitting was not supported: it
didn't work with the UMD build due to an old bug in Webpack.

With sharetribe-scripts version _5.0.0_, we changed this behaviour:
sharetribe-scripts creates 2 different builds when `yarn run build` is
called. Basically, this means that build-time increases (including
`yarn run dev-server` call).

However, this setup makes code-splitting possible. To make this easier,
we have added [Loadable Components](https://loadable-components.com/)
library to the setup.

> **Note:** FTW-daily started using code-splitting from version _8.0.0_
> and FTW-hourly from _10.0.0_.

## What is code splitting

Instead of downloading the entire app before users can use it, code
splitting allows us to split the code from one main.bundle.js file into
smaller chunks which you can then load on demand. To familiarize
yourself with the subject, you could read about code splitting from
[reactjs.org](https://reactjs.org/docs/code-splitting.html).

In practice, FTW templates use route-based code splitting: page-level
components are now using
[Loadable Components](https://loadable-components.com/) syntax to create
[dynamic imports](https://webpack.js.org/api/module-methods/#import-1)
functionality.

```js
const AboutPage = loadable(() =>
  import(
    /* webpackChunkName: "AboutPage" */ './containers/AboutPage/AboutPage'
  )
);
```

When Webpack comes across these loadable objects, it will create a new
JS & CSS chunk files (e.g. _AboutPage.dc3102d3.chunk.js_). I.e. those
code-paths are separated from the main bundle.

Previously, (when code-splitting was not supported), when you loaded
`/about` page, you received _main.bundle.js_ & _main.bundle.css_. Those
files were pretty huge containing all the code that was needed to create
a template app and any page inside it. Loading a single file takes time
and also browsers had to evaluate the entire JS-file before it was ready
to make the app fully functional.

So, the main benefit of code splitting is to reduce the code that is
loaded for any single page. That improves the performance, but even more
importantly, it makes it possible to add more navigational paths and
page-variants to the codebase. For example, adding different kinds of
ListingPages for different types of listings makes more sense with
code-splitting. Otherwise, new pages would have a performance impact on
the initial page load and therefore SEO performance would drop too.

> Note: currently, most of the code is in shared _src/components/_
> directory and this reduces the benefits that come from code-splitting.
> In the future, we are probably going to move some components from
> there to page-specific directories (if they are not truly shared
> between different pages).

## How code splitting works in practice

If you open `/about` page, you'll notice that there are several JS & CSS
files loaded:

- **Main chunk** (e.g. _main.1df6bb19.chunk.js_ &
  main.af610ce4.chunk.css). They contain code that is shared between
  different pages.
- [**Vendor chunk**](https://twitter.com/wSokra/status/969633336732905474)
  (Currently, it's an unnamed chunk file. e.g. _24.230845cc.chunk.js_)
- **Page-specific chunk** (e.g. _AboutPage.dc3102d3.chunk.js_)
- **Runtime chunk** (e.g. _runtime-main.818a6866.js_) This one takes
  care of loading correct JS & CSS files when you navigate to another
  page inside the web app. (e.g. it loads
  _LandingPage.6fa732d5.chunk.js_ && _LandingPage.40c0bf91.chunk.css_,
  when a user navigates to the landing page.)

So, there are several chunk files that can be loaded parallel in the
first page-load and also page-specific chunks that can be loaded in
response to in-app navigation.

Naturally, this means that during in-app navigation there are now more
things that the app needs to load: **data** that the next page needs and
**code chunk** that it needs to render the data. The latter is not
needed if the page-specific chunk is already loaded earlier.

## Preloading code chunks

Route-based code splitting means that there might be a fast flickering
of a blank page when navigation happens for the first time to a new
page. To remedy that situation, FTW templates have forced the
page-chunks to be
[preloaded](https://loadable-components.com/docs/prefetching/#manually-preload-a-component)
when the mouse is over **NamedLink**. In addition, **Form** and
**Button** components can have a property
`enforcePagePreloadFor="SearchPage"`. That way the specified chunk is
loaded before the user has actually clicked the button or executed form
submit.

## Route configuration

To make the aforementioned preloading possible, the loadable component
is directly set to "component" conf in routeConfigurations.js file:

```shell
└── src
    └── routeConfiguration.js
```

```js
    // const AuthenticationPage = loadable(() => import(/* webpackChunkName: "AuthenticationPage" */ './containers/AuthenticationPage/AuthenticationPage'));
    {
      path: '/signup',
      name: 'SignupPage',
      component: AuthenticationPage,
      extraProps: { tab: 'signup' },
    },
```

### Data loading

FTW templates collects _loadData_ and _setInitialValues_ Redux functions
from
[modular Redux file](https://github.com/erikras/ducks-modular-redux)
(i.e. files that look like `<SomePageComponent>`.duck.js). This happens
in _pageDataLoadingAPI.js_:

```shell
└── src
    └── containers
        └── pageDataLoadingAPI.js
```

Then those files can be connected with routing through route
configuration.

```js
    // import getPageDataLoadingAPI from './containers/pageDataLoadingAPI';
    // const pageDataLoadingAPI = getPageDataLoadingAPI();
    {
      path: '/l/:slug/:id',
      name: 'ListingPage',
      component: ListingPage,
      loadData: pageDataLoadingAPI.ListingPage.loadData,
    },
```

## CSS chunk changes

To ensure that every page-level CSS chunk has custom media queries
included, those breakpoints are included through a separate file
(_customMediaQueries.css_) and it is imported into the main stylesheet
of every page.

```shell
└── src
    └── styles
        └── customMediaQueries.css
```

## Server-side rendering (SSR)

When FTW templates receive a page-load call on server and the page is a
public one (_"auth"_ flag is not set in route configuration), the server
will render the page into a string and returns it among HTML code. This
process has 4 main steps:

1. _server/dataLoader.js_ initializes store
2. It also figures out which route is used and fetches route
   configuration for it
3. If the configuration contains a _loadData_ function, the call is
   dispatched
4. As a consequence, the store gets populated and it can be used to
   render the app to a string.

### Build directory

Sharetribe-scripts dependency uses Webpack to build the application. It
copies the content from _public/_ directory into the _build_ directory
and the Webpack build bundles all the code into files that can be used
in production mode.

- Code for server-side rendering is saved to _build/node_ directory.
- Code for client-side rendering is saved to _build/static_ directory.
- Both builds have also a _loadable-stats.json_ file, which basically
  tells what assets different pages need.
- _server/importer.js_ exposes two
  [ChunkExtractors](https://loadable-components.com/docs/server-side-rendering/#collecting-chunks) -
  one for web and another for node build.
- _server/index.js_ requires the entrypoint for the node build, extracts
  relevant info, and passes them to _dataLoader.loadData()_ and
  _rendered.render()_ calls.
- webExtractor (ChunkExtractor for the web build) is used to collect
  those different code chunks (JS & CSS files) that the current
  page-load is going to need.

  > In practice, **renderApp** function wraps the app with
  > _webExtractor.collectChunks_. With that the webExtractor can figure
  > out all the relevant loadable calls that the server uses for the
  > current page and therefore the web-versions of those chunks can be
  > included to rendered pages through `<script>` tags.
