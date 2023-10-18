---
title: Hosted marketplace texts with Asset Delivery API
slug: hosted-marketplace-texts
updated: 2023-01-01
category: template-content
ingress:
  This article describes how hosted marketplace texts work in the
  Sharetribe Web Template.
published: true
---

Marketplace texts can be managed both in the built-in marketplace text
files and in Sharetribe Console. This article describes how the template
uses the hosted marketplace texts and merges them with the built-in
marketplace texts.

## Hosted marketplace texts

**Hosted marketplace texts** refer to the texts that the marketplace
operator can edit in Sharetribe Console. The client app then needs to
fetch it using the Asset Delivery API.

It is good to note that even if the operator adds some hosted
marketplace texts using Sharetribe Console, the template still needs to
have a built-in marketplace text file for the marketplace text keys that
do not have a value in the hosted asset. That way, the UI can still
render something meaningful for the parts of the page that the operator
has not modified.

The template specifies the path to the hosted marketplace texts as part
of the app-wide configuration in
[_config/configDefault.js_](https://github.com/sharetribe/web-template/blob/main/src/config/configDefault.js#L78).
These hosted marketplace texts live in a file called
_content/translations.js_, since language-specific marketplace text
files make it fairly easy to translate the template to languages other
than the default English.

```js
// CDN assets for the app. Configurable through Sharetribe Console.
// Currently, only translation.json is available.
const appCdnAssets = {
  translations: 'content/translations.json',
};
```

In addition, the template has a global Redux file
(_src/ducks/hostedAssets.duck.js_), which exports a Redux Thunk function
called **fetchAppAssets**. This is the function that actually makes the
calls to the Asset Delivery API.

There are two ways to fetch marketplace text assets using Asset Delivery
API: by version or by alias.

#### Fetching marketplace texts by version

All assets are identifiable by their version, and versions are
immutable. Therefore if you fetch assets by version, they can be cached
for an extended period of time. Read more about
[caching assets](/references/assets/#asset-data-caching). When fetching
marketplace texts by version, the result is cached for an extended
period of time, which helps to avoid unnecessary data loading. Since
Asset Delivery API sets Cache-Control header for these responses, the
browser knows to cache these responses on its own.

Hosted assets are versioned as a
[whole asset tree](/references/assets/#asset-versioning) - a bit similar
to how Git works. Individual asset files might have not changed when the
whole version has changed and this might cause
[HTTP redirects](https://www.sharetribe.com/api-reference/asset-delivery-api.html#http-redirects).
Since the template uses Sharetribe SDK, the response always contains the
data for the requested asset, even if the asset has not changed in the
specified version.

```js
sdk.assetByVersion({
  path: 'content/translations.json',
  version: '<some-hash-string>',
});
```

#### Fetching marketplace texts by alias

In addition to fetching assets by version, you can fetch them by a
specific alias instead of a version. Currently, the marketplace text
asset can be fetched with the alias _latest_, which returns the most
recently updated version of the marketplace text file. The response also
contains the version information for the most recent asset, so that
subsequent fetches can be done based on asset version.

When fetching by alias, the cache time is a few seconds for the dev
environment and up to 5 minutes for the live environment. In other
words, it can take up to 5 minutes for marketplace text updates to be
visible in a live environment. These cache times are subject to change.

```js
sdk.assetByAlias({
  path: 'content/translations.json',
  alias: 'latest',
});
```

## How production build works with hosted marketplace texts

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
     marketplace texts, the asset version is passed (through preloaded
     state) to front end.
   - Note: The template does not pass the marketplace text asset itself
     from the server to browser. The reason is that if browser fetches
     the versioned asset file directly, it can leverage browser's cache.
     So, every page load, after the initial one, will use the
     _translation.json_ file from the browser's local cache.

   ```js
     .then(() => {
       return { preloadedState: store.getState(), translations };
     })
   ```

6. SSR: call **renderApp** function, which renders the <_ServerApp>_ in
   _src/app.js_

   - Hosted marketplace text file from Asset Delivery API is passed as
     props to _ServerApp_.

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

- Hosted marketplace texts are then merged with the default marketplace
  texts in _ServerApp_ component.
  ```jsx
  export const ServerApp = props => {
    const { url, context, helmetContext, store, hostedTranslations = {}, hostedConfig = {} } = props;
    const appConfig = mergeConfig(hostedConfig, defaultConfig);
    HelmetProvider.canUseDOM = false;
    return (
      <Configurations appConfig={appConfig}>
        <IntlProvider
          locale={appConfig.localization.locale}
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
10. Browser: hydrate the _<ClientApp>_ and pass marketplace texts as
    props.

- Hosted marketplace texts are merged with default marketplace texts in
  _ClientApp_ component.

  ```js
  <ClientApp store={store} hostedTranslations={translations} hostedConfig={hostedConfig} />,

  ```

## How development build works with hosted marketplace texts

This is setup is in use if you run **_yarn run dev_** on local machine.

1. Browser: initialize the store
2. Browser: **fetchAppAssets** thunk fetches assets using _latest_ alias
   by calling **sdk.assetByAlias**
   - Because SSR is not available to fetch the latest version of the
     asset files, this call needs to be made from browser.
3. Browser: make **loadData** call
4. Browser: render the `<ClientApp>` and pass marketplace texts as
   props.

## Read more

If you want to read more, here are some pointers:

- [Asset Delivery API](/references/assets/)
- [Short intro to SSR](/template/how-routing-works-in-template/#a-brief-introduction-to-ssr)
