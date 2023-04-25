---
title: Code splitting
slug: how-code-splitting-works-in-ftw
updated: 2023-01-01
category: ftw-routing
ingress:
  This article explains how code splitting works in the Sharetribe Web
  Template.
published: true
---

## What is code splitting

Instead of downloading the entire app before users can use it, code
splitting allows us to split code away from one main.bundle.js file into
smaller chunks which you can then load on demand. To familiarize
yourself with the subject, you could read about code splitting from
[reactjs.org](https://reactjs.org/docs/code-splitting.html).

In practice, the template uses route-based code splitting: page-level
components use the
[Loadable Components](https://loadable-components.com/) syntax to create
[dynamic imports](https://webpack.js.org/api/module-methods/#import-1).

```js
const AboutPage = loadable(() =>
  import(
    /* webpackChunkName: "AboutPage" */ './containers/AboutPage/AboutPage'
  )
);
```

When Webpack comes across these loadable objects, it will create a new
JS & CSS chunk files (e.g. _AboutPage.dc3102d3.chunk.js_). Those
code-paths are separated from the main bundle.

### Why should you use it?

The main benefit of code splitting is reducing the code loaded for any
single page. That improves the performance, but even more importantly,
it makes it possible to add more navigational paths and page variants to
the codebase. For example, adding different kinds of ListingPages for
different listings makes more sense with code-splitting. Without code
splitting, new pages, features, and libraries would impact the app's
initial page load, and therefore SEO performance would drop too.

<info>

Remember to keep non-reusable code in page-specific directories rather
than in the src/components/ directory. This improves performance, as all
the code in the shared directory is loaded in the main chunk file that
is downloaded on each page.

</info>

## How code splitting works in practice

Open the `/about` page. You will notice several JavaScript and CSS files
loading:

- **Main chunk** (e.g. _main.1df6bb19.chunk.js_ &
  main.af610ce4.chunk.css). They contain code that is shared between
  different pages.
- [**Vendor chunk**](https://twitter.com/wSokra/status/969633336732905474)
  (Currently, it's an unnamed chunk file. e.g. _24.230845cc.chunk.js_)
- **Page-specific chunk** (e.g. _AboutPage.dc3102d3.chunk.js_)

There are several chunk files that can be loaded parallel in the first
page-load and also page-specific chunks that can be loaded in response
to in-app navigation.

Naturally, this means that during in-app navigation there are now more
things that the app needs to load: **data** that the next page needs and
**code chunk** that it needs to render the data. The latter is not
needed if the page-specific chunk is already loaded earlier.

### Preloading code chunks

Route-based code splitting means that there might be a fast flickering
of a blank page when navigation happens for the first time to a new
page. To remedy that situation, the template forces the page-chunks to
be
[preloaded](https://loadable-components.com/docs/prefetching/#manually-preload-a-component)
when the mouse is over **NamedLink**. In addition, **Form** and
**Button** components can have a property `enforcePagePreloadFor`. That
way the specified chunk is loaded before the user has actually clicked
the button or executed form submit.

### Preloadable components in route configuration

Preloadable components are defined in the routeConfigurations.js file:

```shell
└── src
    └── routing
        └── routeConfiguration.js
```

At the beginning of the file, you can find the loadable component
assigned to a constant variable. That variable is assigned to the
`component` property of the corresponding route configuration:

```js
    // const AuthenticationPage = loadable(() => import(/* webpackChunkName: "AuthenticationPage" */ './containers/AuthenticationPage/AuthenticationPage'));
    {
      path: '/signup',
      name: 'SignupPage',
      component: AuthenticationPage,
      extraProps: { tab: 'signup' },
    },
```

#### Data loading

The Sharetribe Web Template collects _loadData_ and _setInitialValues_
Redux functions from a
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

### CSS chunk changes

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

When the template receives a page-load call on server and the page is a
public one (i.e. the _"auth"_ flag is not set in route configuration),
the server will render the page into a string and returns it among HTML
code. This process has 4 main steps:

1. _server/dataLoader.js_ initializes store
2. It also figures out which route is used and fetches route
   configuration for it
3. If the configuration contains a _loadData_ function, the call is
   dispatched
4. As a consequence, the store gets populated and it can be used to
   render the app to a string.

### Build directory

The sharetribe-scripts dependency uses Webpack to build the application.
It copies the content from _public/_ directory into the _build_
directory and the Webpack build bundles all the code into files that can
be used in production mode.

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

In practice, the **renderApp** function wraps the app with
_webExtractor.collectChunks_. With that, the webExtractor can figure out
all the relevant loadable calls that the server uses for the current
page and therefore the web-versions of those chunks can be included to
rendered pages through `<script>` tags.
