---
title: State management and Redux
slug: ftw-redux
updated: 2023-01-01
category: ftw-data-flow
ingress:
  This article explains how the Sharetribe Web Template uses Redux for
  state management.
published: true
---

## What is Redux

The Sharetribe Web Template is single-page application (SPA) built using
React. This means that the app needs to be able to render several
different layouts (pages) depending on user interaction. State
management is essential for this process. The template needs to know if
a user has been authenticated or if it has received relevant data for
the current page, and so on.

We use [Redux](https://redux.js.org/introduction/getting-started) for
state management on the application level. You should read more about
Redux before you start modifying queries to the Flex API or creating new
Page level elements.

In the following subtopics, we assume that you know the
[basics of Redux](https://redux.js.org/basics/basic-tutorial) already.

## Container components: Pages + TopbarContainer

The Sharetribe Web Template is aware of Redux state store, but other
components and forms are purely
[presentational components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).
This makes it easier to customize UI components - you don't need to be
aware of the complexity related to Redux setup when you just want to
touch the behavior of some visual component. In those cases, you can
just head to the `src/components/` directory and you can see from there
what props are available for each component when they are rendered.

Naturally, there is a need for higher level components which fetch new
data and define what props are passed down to presentational components.
In Redux terminology, those components are called _Containers_. The
template has defined all the containers inside a directory called
`src/containers/`. It contains all the pages and a special container for
the top bar (TopbarContainer) since that is a very complex component and
it is shared with almost every page. You can read more about differences
between presentational and container components from this
[article written by Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

The actual container setup of a page level component can be found from
the bottom of the component file. For example,
`src/containers/TransactionPage/TransactionPage.js` connects itself to
Redux store with `mapStateToProps` and `mapDispatchToProps` functions:

```js
const TransactionPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(TransactionPageComponent);
```

## Duck files

Inside any `src/containers/<ComponentName>` directory, you will also
find a `<ComponentName>.duck.js` file. These files wrap all the other
page-specific Redux concepts into a single file. Instead of writing
action types, action creators and reducers in separate files (and spread
them around our directory structure), the template tries to keep pages
encapsulated. Page specific actions, store updates, and data fetches
happen inside their respective directory - just look for a file whose
name follows a pattern: `<ComponentName>.duck.js`. This pattern is just
a simple concept of adding related things into a single file. Read more
from the
[author's repository](https://github.com/erikras/ducks-modular-redux).

### Global reducers

Some reducers are needed in several pages. These global reducers are
defined inside `src/ducks/` directory with their respective `*.duck.js`
files. The most important global duck files are `user.duck.js` and
`marketplaceData.duck.js`.

## Setting up Redux

Container specific reducers are gathered and exported inside
`src/containers/reducers.js` file and global reducers are exported
respectively in a file `src/ducks/index.js`.

With those exports, we are able to create appReducer
(`src/reducers.js`):

```js
import { combineReducers } from 'redux';
import * as globalReducers from './ducks';
import * as pageReducers from './containers/reducers';

const appReducer = combineReducers({
  ...globalReducers,
  ...pageReducers,
});
```

`appReducer` is called by `createReducer` function, which is called
inside of `configureStore` function (in `src/store.js`).

This setup creates a store structure that separates container specific
state as well as global data by their reducer names. Together with Ducks
module naming schema, this means that:

- the state of the `ListingPage` can be found from `state.ListingPage`
  and
- the state of the global `user` object can be found from `state.user`.

## Advanced Redux concepts: thunks

One essential part of state management in the template is filling the
Redux store with data fetched from the Flex API. This is done with
[Redux Thunks](https://redux.js.org/advanced/async-actions#async-action-creators),
which is a Redux middleware to create asynchronous action creators.

As with every other Redux store actions, you can find Thunks inside
`*.duck.js` files. For example, fetching listing reviews can be done
with the following thunk function:

```js
export const fetchReviews = listingId => (dispatch, getState, sdk) => {
  // Make store aware of a request to fetch reviews
  dispatch(fetchReviewsRequest);
  // Fetch reviews using Flex SDK
  return sdk.reviews
    .query({
      listingId,
      state: 'public',
      include: ['author', 'author.profileImage'],
      'fields.image': ['variants.square-small'],
    })
    .then(response => {
      const reviews = denormalisedResponseEntities(response);
      // If fetch succeeds, make store aware of fetched data
      dispatch(fetchReviewsSuccess(reviews));
    })
    .catch(e => {
      // If fetch throws an error, save the error to the store (so that UI can react to it)
      dispatch(fetchReviewsError(storableError(e)));
    });
};
```

> Note: `sdk` parameter is also provided by Redux Thunk. We pass it to
> middleware in store.js: `thunk.withExtraArgument(sdk)`
