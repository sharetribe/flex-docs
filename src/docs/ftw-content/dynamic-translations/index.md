---
title: Hosted translations with Asset Delivery API
slug: hosted-translations
updated: 2022-05-11
category: ftw-content
ingress:
  This article describes how hosted translations work in Flex
  Template for Web (FTW).
published: true
---

Big picture / generic content
- Template needs to have default translations so that if operator accidentally deletes one translation key from the Console, the UI can still render something meaningful for that part of the page.

- Hosted translations are translations that operator can edit in Flex Console and client app needs to fetch them from Asset Delivery API.
  - (Is there a better name for this than "hosted translations"? Code now uses that "hostedAsset" since generic "asset might be too generic to find with search-by-typing")
  - There are 2 ways to fetch assets from Asset Delivery API
    - by version
      - `sdk.assetByVersion({ path: 'config/translation.json', version: '<some-hash-string>' })`
      - can be cached for a long time
    - by alias: 
      - `sdk.assetByVersion({ path: 'config/translation.json', alias: 'latest' })`
      - currently only 'latest' alias is available
      - has 5 minutes cache in production and 5 seconds on test environment. These cache times are subject to change.
  - We have added a new global Redux file (_src/ducks/hostedAssets.duck.js_), which exports Redux Thunk function called _fetchAppAssets_. This function actually makes the calls to the Asset Delivery API.

  - Translations are part of app-wide hosted assets that have configuration in _src/config.js_
    ```js
    // CDN assets for the app. Configurable through Flex Console.
    // Currently, only translation.json is available.
    const appCdnAssets = {
      translations: 'config/translations.json',
    };
    ```


## How production build works with hosted translations

This is setup is in use if you run ***yarn start*** in your host environment or ***yarn run dev-server*** on local machine.


1. Export **fetchAppAssets** from _src/index.js_ to make it available for the server.
2. SSR: initialize the store
    ```shell
    └── server
        └── dataLoader.js
    ```
    ```js
      let translations = {};
      const store = configureStore({}, sdk);
      return store.dispatch(fetchAppAssets(config.appCdnAssets))
    ```

3. SSR: **fetchAppAssets** thunk fetches the latest version of 'config/translations.json' asset by using 'latest' alias with `sdk.assetByAlias`
    - This ensures that the server-side rendering has the most recent version of asset to render the page
4. SSR: make a _loadData_ call if the route specifies it and 
    ```js
      .then(fetchedAssets => {
        translations = fetchedAssets?.translations?.data || {};
        return Promise.all(dataLoadingCalls);
    })
    ```

5. SSR: asset **version** is saved to the store and passed to the browser through the _"preloadedState"_.
    - Server-side rendering must match with client-side rendering when browser hydrates the server-side rendered content.
    - To ensure, that client-side rendering has the same version of translations, the asset version is passed (through preloaded state) to front end.
    - Note: we don't pass the translations from the server to browser. The reason is that if browser fetches the versioned asset file directly, it can leverage browser's cache. So, every page load, after the initial one, will use the translation.sjon file from browsers local cache.

    ```js
      .then(() => {
        return { preloadedState: store.getState(), translations };
      })
    ```

6. SSR: call `renderApp` function, which renders the `<ServerApp>` in _src/app.js_
    - Hosted translations are passed as props to it
    - Hosted translations from Asset Delivery API are merged with the default translations.

    ```shell
    └── server
        └── renderer.js
    ```

    ```js
      // Render the app with given route, preloaded state, hosted translations.
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

7. Browser: initialize the store with a preloaded state
    - The asset version that the SSR used, is included in that preloaded state
8. Browser: **fetchAppAssets** thunk fetch assets using asset version: calls `sdk.assetByVersion`.
9. Browser: make _loadData_ call
10. Browser: hydrate the `<ClientApp>` and pass translations as props.
    ```js
    <ClientApp store={store} hostedTranslations={translations} />
    ```

## How development build works with hosted translations

This is setup is in use if you run ***yarn run dev*** on local machine.

1. Browser: initialize the store
2. Browser: **fetchAppAssets** thunk fetches assets using 'latest' alias: calls `sdk.assetByAlias` 
    - Because SSR is not available to fetch the latest version of the asset files, this call needs to be made from browser. 
3. Browser: make _loadData_ call
4. Browser: render the `<ClientApp>` and pass translations as props.


## Read more

If you want to read more, here are some pointers:

- [Asset Delivery API](/references/<the-correct-link-here>/)
- [Short intro to SSR](https://deploy-preview-565--sharetribe-flex-docs-site.netlify.app/docs/ftw/how-routing-works-in-ftw/#a-brief-introduction-to-ssr)