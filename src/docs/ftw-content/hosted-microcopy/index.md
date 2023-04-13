---
title: Hosted microcopy with Asset Delivery API
slug: hosted-microcopy
updated: 2022-06-14
category: ftw-content
ingress:
  This article describes how hosted microcopy work in Flex Template for
  Web (FTW).
published: true
---

Starting from 2022-05, FTW template microcopy can be managed both in the
built-in microcopy files and in Flex Console. This article describes how
the FTW template uses the hosted microcopy and merges it with the
built-in microcopy

_**Note:** If you want to implement this feature into your pre-v8.5
FTW-daily template, you can see the necessary modifications in the PRs
for [ftw-daily](https://github.com/sharetribe/ftw-daily/pull/1510). Read
more:_

- _[Microcopy in Flex](/concepts/microcopy/)_
- _[How built-in microcopy works in the FTW templates](/ftw/how-to-change-ftw-bundled-microcopy/)_

<extrainfo title="FTW-hourly and FTW-product versions with hosted microcopy">
In FTW-hourly, hosted microcopy are available in v10.5. In FTW-product, they are available in v9.2.
</extrainfo>

## Hosted microcopy

**Hosted microcopy** is microcopy that the marketplace operator can edit
in Flex Console. The client app then needs to fetch it using the Asset
Delivery API.

It is good to note that even if the operator adds some hosted microcopy
using Flex Console, the FTW template still needs to have a built-in
microcopy file for the microcopy keys that do not have a value in the
hosted asset. That way, the UI can still render something meaningful for
the parts of the page that the operator has not modified.

FTW templates have specified hosted microcopy as part of the app-wide
configuration in _src/config.js_. This hosted microcopy lives in a file
called `content/translations.js`, since language-specific microcopy
files make it fairly easy to translate the FTW template to languages
other than the default English.

```js
// CDN assets for the app. Configurable through Flex Console.
// Currently, only translation.json is available.
const appCdnAssets = {
  translations: 'content/translations.json',
};
```

In addition, FTW templates have added a new global Redux file
(_src/ducks/hostedAssets.duck.js_), which exports a Redux Thunk function
called **fetchAppAssets**. This is the function that actually makes the
calls to the Asset Delivery API.

There are two ways to fetch microcopy assets using Asset Delivery API:
by version or by alias.

#### Fetching microcopy by version

All assets are identifiable by their version, and versions are
immutable. Therefore if you fetch assets by version, they can be cached
for an extended period of time. Read more about
[caching assets](/references/assets/#asset-data-caching). When fetching
microcopy by version, it is cached for an extended period of time, which
helps to avoid unnecessary data loading. Since Asset Delivery API sets
Cache-Control header for these responses, the browser knows to cache
these responses on its own.

Hosted assets are versioned as a
[whole asset tree](/references/assets/#asset-versioning) - a bit similar
to how Git works. Individual asset files might have not changed when the
whole version has changed and this might cause
[HTTP redirects](https://www.sharetribe.com/api-reference/asset-delivery-api.html#http-redirects).
Since FTW templates use Flex SDK, the response always contains the data
for the requested asset, even if the asset has not changed in the
specified version.

```js
sdk.assetByVersion({
  path: 'content/translations.json',
  version: '<some-hash-string>',
});
```

#### Fetching microcopy by alias

In addition to fetching assets by version, you can fetch them by a
specific alias instead of a version. Currently, microcopy can be fetched
with the alias _latest_, which returns the most recently updated version
of the microcopy file. The response also contains the version
information for the most recent asset, so that subsequent fetches can be
done based on asset version.

When fetching by alias, the cache time is a few seconds for the dev
environment and up to 5 minutes for the live environment. In other
words, it can take up to 5 minutes for microcopy updates to be visible
in a live environment. These cache times are subject to change.

```js
sdk.assetByAlias({
  path: 'content/translations.json',
  alias: 'latest',
});
```

## How production build works with hosted microcopy

This setup is in use if you run **_yarn start_** in your host
environment or **_yarn run dev-server_** on your local machine.

1. Export **fetchAppAssets** from _src/index.js_ to make it available
   for the server.
2. SSR: initialize the store

   ```shell
   └── server
       └── dataLoader.js
   ```

   ```js
   let translations = {};
   const store = configureStore({}, sdk);
   return store.dispatch(fetchAppAssets(config.appCdnAssets));
   ```

3. SSR: **fetchAppAssets** thunk fetches the latest version of
   _content/translations.json_ asset by using _latest_ alias with
   **sdk.assetByAlias**
   - This ensures that the server-side rendering has the most recent
     version of asset to render the page
4. SSR: make a **loadData** call if the route specifies it and

   ```js
     .then(fetchedAssets => {
       translations = fetchedAssets?.translations?.data || {};
       return Promise.all(dataLoadingCalls);
   })
   ```

5. SSR: asset **version** is saved to the store and passed to the
   browser through the _preloadedState_.

   - Server-side rendering must match with client-side rendering when
     browser hydrates the server-side rendered content.
   - To ensure that client-side rendering has the same version of
     microcopy, the asset version is passed (through preloaded state) to
     front end.
   - Note: FTW does not pass the microcopy itself from the server to
     browser. The reason is that if browser fetches the versioned asset
     file directly, it can leverage browser's cache. So, every page
     load, after the initial one, will use the _translation.json_ file
     from the browser's local cache.

   ```js
     .then(() => {
       return { preloadedState: store.getState(), translations };
     })
   ```

6. SSR: call **renderApp** function, which renders the <_ServerApp>_ in
   _src/app.js_

   - Hosted microcopy from Asset Delivery API is passed as props to
     _ServerApp_.

   ```shell
   └── server
       └── renderer.js
   ```

   ```js
   // Render the app with given route, preloaded state, hosted microcopy.
   const { head, body } = renderApp(
     requestUrl,
     context,
     preloadedState,
     translations,
     collectWebChunks
   );
   ```

   ```shell
   └── src
       └── app.js
   ```

   ```js
   <ServerApp
     url={url}
     context={serverContext}
     helmetContext={helmetContext}
     store={store}
     hostedTranslations={hostedTranslations}
   />
   ```

- Hosted microcopy is then merged with the default microcopy in
  _ServerApp_ component.
  ```jsx
  export const ServerApp = props => {
    const { url, context, helmetContext, store, hostedTranslations = {} } = props;
    setupLocale();
    HelmetProvider.canUseDOM = false;
    return (
      <IntlProvider
        locale={config.locale}
        messages={{ ...localeMessages, ...hostedTranslations }}
        textComponent="span"
      >
    {/* etc. */}
  ```

7. Browser: initialize the store with a preloaded state
   - The asset version that the SSR used, is included in that preloaded
     state
8. Browser: **fetchAppAssets** thunk fetch assets using asset version:
   calls **sdk.assetByVersion**.
9. Browser: make **loadData** call
10. Browser: hydrate the _<ClientApp>_ and pass microcopy as props.

- Hosted microcopy is merged with default microcopy in _ClientApp_
  component.
  ```js
  <ClientApp store={store} hostedTranslations={translations} />
  ```

## How development build works with hosted microcopy

This is setup is in use if you run **_yarn run dev_** on local machine.

1. Browser: initialize the store
2. Browser: **fetchAppAssets** thunk fetches assets using _latest_ alias
   by calling **sdk.assetByAlias**
   - Because SSR is not available to fetch the latest version of the
     asset files, this call needs to be made from browser.
3. Browser: make **loadData** call
4. Browser: render the `<ClientApp>` and pass microcopy as props.

## Read more

If you want to read more, here are some pointers:

- [Asset Delivery API](/references/assets/)
- [Short intro to SSR](/ftw/how-routing-works-in-ftw/#a-brief-introduction-to-ssr)
