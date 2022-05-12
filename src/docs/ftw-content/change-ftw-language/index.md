---
title: How to change FTW translation language
slug: how-to-change-ftw-language
updated: 2022-05-15
category: ftw-content
ingress:
  This guide describes how to change the language used in the Flex Template for Web (FTW) application
published: true
---

If you want the template to use a language that is not supported by
default, a new translation file needs to be added and the messages in it
need to be translated:

## Creating a new translation file

1. Copy the default `src/translations/en.json` English translations file
   into some other file, for example `it.json` for Italian.

2. Change the messages in the new translations file to the desired
   language.

> Note: we already have a few other language files available in
> [src/translations/](https://github.com/sharetribe/flex-template-web/tree/master/src/translations)
> directory for you to start customizing translations.

## Changing the translations used in FTW

Once you have the translations file in place:

1. In `src/config.js`, change the `locale` variable value to match the
   new locale (the name of the new translations file, without the
   extension), for example:

```js
const locale = 'it';
```

2. In `src/app.js`, change the React Intl import to point to the correct
   `react-intl` locale, for example:

```js
import localeData from 'react-intl/locale-data/it';
```

3. If you are using a non-english locale with moment library, you should
   also import time specific formatting rules for that locale:

```js
import 'moment/locale/it';
```

4.  Point `messagesInLocale` to correct .json file, for example:

```js
import messagesInLocale from './translations/it.json';
```

## Changing the translation used in tests

Also, in case you will translate the application and develop it forward
it is wise to change the translations file that the tests use. Normally
tests are language agnostic as they use translation keys as values.
However, when adding new translations you can end up with missing
translation keys in tests. To change the translation file used in tests
change the `messages` variable in
[src/util/test-helpers.js](https://github.com/sharetribe/flex-template-web/blob/master/src/util/test-helpers.js)
to match your language in use, for example:

```js
import messages from '../translations/it.json';
```

## Developing FTW into a multilanguage marketplace

If you intend to modify the FTW template to handle multiple languages,
it is good to note that the FTW templates are by default configured to
run in single language mode, so a multilanguage marketplace requires
custom development. For multiple languages, you basically have two
approaches for that custom development.

The first option is to create two versions of the client app, one for
Language 1 and one for Language 2. They can both point to the same
Marketplace API i.e. share the same listings, users, transaction
processes etc. If you have a very location-specific marketplace with
different locations mainly in different languages, this might be a good
approach, because you can then target your UI, branding and localization
more closely to the target area.

Another option is to customize a single client app to provide multiple
languages. For instance, you could import several language files in
`src/app.json` and select which one you are going to use by modifying
`src/routeConfiguration.js`, so that all the paths include a ”locale”
variable. E.g. `/about` could be changed to `/:locale/about` to capture
paths like `/fr/about`. In this case, it is useful to save the
user's language preference to the extended data.

Read more about having [a multilanguage marketplace on top of Flex](/concepts/translations/#can-i-have-a-multilanguage-marketplace).