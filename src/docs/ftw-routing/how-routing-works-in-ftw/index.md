---
title: How routing works in FTW
slug: how-routing-works-in-ftw
updated: 2021-02-12
category: ftw-routing
ingress:
  This article explains how the routing setup works in Flex Template for
  Web (FTW).
published: true
---

FTW uses [React Router](https://reacttraining.com/react-router/web) for
creating routes to different pages. React Router is a collection of
navigational components that allow single-page apps to create routing as
a part of the normal rendering flow of the React app. So, instead of
defining on the server what gets rendered when a user goes to URL
_"somemarketplace.com/about"_, we just catch all the path combinations
and let the app define what page gets rendered.

## React Router setup

### Route configuration

FTW has a quite straightforward routing setup - there's just one file
you need to check before you link to existing routes or start creating
new routes to static pages: _routeConfiguration.js_.

There we have imported all the page-level components dynamically using
[Loadable Components](https://loadable-components.com/). In addition,
there's a configuration that specifies all the pages that are currently
used within FTW:

```shell
└── src
    ├── routeConfiguration.js
    └── Routes.js
```

<extrainfo title="FTW-product has routeConfiguration.js and Routes.js files in a different location">

```shell
└── src
    └── routing
        ├── routeConfiguration.js
        └── Routes.js
```

</extrainfo>

```js
const AboutPage = loadable(() =>
  import(
    /* webpackChunkName: "AboutPage" */ './containers/AboutPage/AboutPage'
  )
);
const AuthenticationPage = loadable(() =>
  import(
    /* webpackChunkName: "AuthenticationPage" */ './containers/AuthenticationPage/AuthenticationPage'
  )
);
// etc..

// Our routes are exact by default.
// See behaviour from Routes.js where Route is created.
const routeConfiguration = () => {
  return [
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: AuthenticationPage,
      extraProps: { tab: 'login' },
    },
    {
      path: '/signup',
      name: 'SignupPage',
      component: AuthenticationPage,
      extraProps: { tab: 'signup' },
    },
    //...
  ];
};

export default routeConfiguration;
```

In the example, path `/login` renders _AuthenticationPage_ component
with prop **tab** set to 'login'. In addition, this route configuration
has the name: 'LoginPage'.

> Routes use exact path matches in FTW. We felt that this makes it
> easier to understand the connection between a path and its routed view
> aka related page component.
> [Read more.](https://reactrouter.com/web/api/Route/exact-bool)

There are a couple of extra configurations you can set. For example
`/listings` path leads to a page that lists all the listings provided by
the current user:

```js
{
  path: '/listings',
  name: 'ManageListingsPage',
  auth: true,
  authPage: 'LoginPage', // the default is 'SingupPage'
  component: ManageListingsPage,
  loadData: pageDataLoadingAPI.ManageListingsPage.loadData,
},
```

Here we have set this route to be available only for the authenticated
users (`auth: true`) because we need to know whose listings we should
fetch. If a user is unauthenticated, he/she is redirected to LoginPage
(`authPage: 'LoginPage'`) before the user can see the content of the
_"ManageListingsPage"_ route.

There's also a _loadData_ function defined. It is a special function
that gets called if a page needs to fetch more data (e.g. from the
Marketplace API) after redirecting to that route. We'll open up this
concept in the [Loading data](#loading-data) section below.

In addition to these configurations, there's also a rarely used
_setInitialValues_ function that could be defined and passed to a route:

```js
{
  path: '/l/:slug/:id/checkout',
  name: 'CheckoutPage',
  auth: true,
  component: CheckoutPage,
  setInitialValues: pageDataLoadingAPI.CheckoutPage.setInitialValues,
},
```

This function gets called when some page wants to pass forward some
extra data before redirecting a user to that page. For example, we could
ask booking dates on ListingPage and initialize CheckoutPage state with
that data before a customer is redirected to CheckoutPage.

Both _loadData_ and _setInitialValues_ functions are part of Redux data
flow. They are defined in page-specific SomePage.duck.js files and
exported through _src/containers/pageDataLoadingAPI.js_.

### How FTW renders a route with routeConfiguration.js

The route configuration is used in _src/app.js_. For example,
**ClientApp** defines **BrowserRouter** and gives it a child component
(**Routes**) that gets the configuration as _routes_ property.

Here's a simplified _app.js_ code that renders client-side FTW app:

```jsx
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import routeConfiguration from './routeConfiguration';
//...
export const ClientApp = props => {
  return (
    <BrowserRouter>
      <Routes routes={routeConfiguration()} />
    </BrowserRouter>
  );
};
```

_Routes.js_ renders the navigational **Route** components. **Switch**
component renders the first _Route_ that matches the location.

```jsx
import { Switch, Route } from 'react-router-dom';
//...

const Routes = (props, context) => {
  //...
  return (
    <Switch>
      {routes.map(toRouteComponent)}
      <Route component={NotFoundPage} />
    </Switch>
  );
```

Inside _Routes.js_, we also have a component called
_RouteComponentRenderer_, which has four important jobs:

- Calling loadData function, if those have been defined in
  _src/routeConfiguration.js_. This is an asynchronous call, a page
  needs to define what gets rendered before data is complete.
- Reset scroll position after location change.
- Dispatch location changed actions to Redux store. This makes it
  possible for analytics Redux middleware to listen to location changes.
  For more information, see the
  [How to set up Analytics for FTW](/ftw/how-to-set-up-analytics-for-ftw/)
  guide.
- Rendering of the page-level component that the Route is connected
  through the configuration. Those page-level components are Loadable
  Components. When a page is rendered for the first time, the code-chunk
  for that page needs to be fetched first.

## Linking

Linking is a special case in SPA. Using HTML `<a>` tags will cause
browser to redirect to given **"href"** location. That will cause all
the resources to be fetched again, which is a slow and unnecessary step
for SPA. Instead, we just need to tell our router to render a different
page by adding or modifying the location through the browser's history
API.

### NamedLink and NamedRedirect

React Router exports a couple of
[navigational components](https://reacttraining.com/react-router/web/api/Link)
(e.g. `<Link to="/about">About</Link>`) that could be used for linking
to different internal paths. Since FTW is a template app, we want all
the paths to be customizable too. That means that we can't use paths
directly when redirecting a user to another Route. For example, a
marketplace for German customers might want to customize the LoginPage
path to be `/anmelden` instead of `/login` - and that would mean that
all the _Links_ to it would need to be updated.

This is the reason why we have created names for different routes in
_src/routeConfiguration.js_. We have a component called
`<NamedLink name="LoginPage" />` and its _name_ property creates a link
to the correct Route even if the path is changed in
routeConfiguration.js. Needless to say that those names should only be
used for internal route mapping.

More complex example of _NamedLink_

```jsx
// Link to LoginPage:
<NamedLink name="LoginPage" />log in</NamedLink>

// Link to ListingPage with path `l/<listing-uuid>/<listing-title-as-url-slug>/`:
<NamedLink name="ListingPage" params={{ id: '<listing-uuid>', slug: '<listing-title-as-url-slug>' }}>some listing</NamedLink>

// Link to SearchPage with query parameter: bounds
<NamedLink name="SearchPage" to={{ search: '?bounds=60.53,22.38,60.33,22.06' }}>Turku city</NamedLink>
```

_NamedLink_ is widely used in FTW, but there are some cases when we have
made a redirection to another page if some data is missing (e.g.
CheckoutPage redirects to ListingPage, if some data is missing or it is
old). This can be done by rendering a component called
**NamedRedirect**, which is a similar wrapper for the
[Redirect component](https://reacttraining.com/react-router/web/api/Redirect).

### ExternalLink

There's also a component for external links. The reason why it exists is
that there's a
[security issue](https://mathiasbynens.github.io/rel-noopener/) that can
be exploited when a site is linking to external resources.
**ExternalLink** component has some safety measures to prevent those. We
recommend that all the external links are created using _ExternalLink_
component instead of directly writing `<a>` anchors.

```jsx
// Bad pattern: <a href="externalsite.com">External site</a>
// Recommended pattern:
<ExternalLink href="externalsite.com">External site</ExternalLink>
```

## Loading data

If a page component needs to fetch data, it can be done as a part of
navigation. A page-level component has a related modular Redux file with
a naming pattern: PageName.duck.js. To connect the data loading with
navigation, there needs to be an exported function called _loadData_ in
that file. That function returns a Promise, which is resolved when all
the asynchronous Redux Thunk calls are completed.

For example, here's a bit simplified version of _loadData_ function on
ListingPage:

```js
export const loadData = (params, search) => dispatch => {
  const listingId = new UUID(params.id);

  return Promise.all([
    dispatch(showListing(listingId)), // fetch listing data
    dispatch(fetchTimeSlots(listingId)), // fetch timeslots for booking calendar
    dispatch(fetchReviews(listingId)), // fetch reviews related to this listing
  ]);
};
```

Note: **loadData** function needs to be separately mapped in
routeConfiguration.js and to do that those data loading functions are
collected into pageDataLoadingAPI.js file.

```shell
└── src
    └── containers
        └── pageDataLoadingAPI.js
```

## Loading the code that renders a new page

FTW templates use route-based code splitting. Different pages are split
away from the main code bundle and those page-specific code chunks are
loaded separately when the user navigates to a new page for the first
time.

This means that there might be a fast flickering of a blank page when
navigation happens for the first time to a new page. To remedy that
situation, FTW templates have forced the page-chunks to be
[preloaded](https://loadable-components.com/docs/prefetching/#manually-preload-a-component)
when the mouse is over **NamedLink**. In addition, **Form** and
**Button** components can have a property
`enforcePagePreloadFor="SearchPage"`. That way the specified chunk is
loaded before the user has actually clicked the button or executed form
submit.

Read more about
[code-splitting](/ftw/how-code-splitting-works-in-ftw/).

## Analytics

It is possible to track page views to gather information about
navigation behaviour. Tracking is tied to routing through _Routes.js_
where _RouteRendererComponent_ dispatches `LOCATION_CHANGED` actions.
These actions are handled by a global reducer (_Routing.duck.js_), but
more importantly, _analytics.js_ (a Redux middleware) listens to these
changes and sends tracking events to configured services.

```shell
└── src
    ├── Routes.js
    ├──analytics
    |  └── analytics.js
    └── ducks
        └── Routing.duck.js
```

<extrainfo title="FTW-product has moved Routes.js under routing directory">

```shell
└── src
    ├── routing
    |  └── Routes.js
    ├──analytics
    |  └── analytics.js
    └── ducks
        └── Routing.duck.js
```

</extrainfo>

For more information, see the
[How to set up Analytics for FTW](/ftw/how-to-set-up-analytics-for-ftw/)
guide.

## A brief introduction to SSR

Routing configuration is one of the key files to render any page on the
server without duplicating routing logic. We just need to fetch data if
_loadData_ is defined on page component and then use
`ReactDOMServer.renderToString` to render the app to string (requested
URL is a parameter for this render function).

So, instead of having something like this on the Express server:

```js
app.get('/about', handleAbout);
```

We basically catch every path call using `*` on _server/index.js_:

```js
app.get('*', (req, res) => {
```

and then we ask our React app to

1.  load data based on current URL (and return this preloaded state from
    Redux store)
2.  render the correct page with this preloaded state (renderer also
    attaches preloadedState to HTML-string to hydrate the app on the
    client-side)
3.  send rendered HTML string as a response to the client browser

```js
dataLoader
  .loadData(req.url, sdk /* other params */)
  .then(preloadedState => {
    const html = renderer.render(req.url /* and other params */);
    //...
    res.send(html);
  });
```
