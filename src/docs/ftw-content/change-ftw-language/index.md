---
title: How to change microcopy language
slug: how-to-change-ftw-language
updated: 2023-09-04
category: ftw-content
ingress:
  This guide describes how to change the language used in the Sharetribe
  Web Template.
published: true
---

If you want the template to use a language that is not supported by
default, a new language-specific microcopy file needs to be added and
the messages in it need to be translated. This article walks you through
the steps required to to that.

## Creating a new microcopy file

1. Copy the default `src/translations/en.json` English microcopy file
   into some other file, for example `it.json` for Italian.

2. Change the messages in the new microcopy file to the desired
   language.

<info>

We will add a few other language files available in
[src/translations/](https://github.com/sharetribe/web-template/tree/master/src/translations)
directory for you to start customizing microcopy.

</info>

Even if you use [hosted microcopy](/ftw/hosted-microcopy/) to manage
your marketplace texts, it is still important to have a built-in
language-specific microcopy file in the template as well, so that the
application can show meaningful messages for any keys missing from the
Sharetribe Console microcopy asset.

## Changing the microcopy used in the template

Once you have the microcopy file in place:

1. In `config/configDefault.js`, change the `locale` variable value to
   match the new locale (the name of the new microcopy file, without the
   extension), for example:

```js
localization: {
 locale: 'it',
 ...
}
```

2. If you are using a non-english locale with moment library, you should
   import time specific formatting rules for that locale:

```js
import 'moment/locale/it';
```

<info>

If you are using a template that supports code-splitted locale imports
(i.e. after this commit), you can technically skip this second step.

However, for performance reasons, we recommend adding the rows below in
_src/app.js_ before _const MomentLocaleLoader_:

```
   import 'moment/locale/it';
   const hardCodedLocale = process.env.NODE_ENV === 'test' ? 'en' : 'it';
```

</info>

4.  Point `messagesInLocale` to correct .json file, for example:

```js
import messagesInLocale from './translations/it.json';
```

It is also recommended to change _en.json_ translations. That way,
accidentally deleted keys in dynamic hosted microcopy (in Console) won't
cause the default English translations to be rendered in your custom
client app.

## Changing the microcopy used in tests

Also, in case you will translate the application and develop it forward
it is wise to change the microcopy file that the tests use. Normally
tests are language agnostic as they use microcopy keys as values.
However, when adding new microcopy you can end up with missing microcopy
keys in tests. To change the microcopy file used in tests change the
`messages` variable in
[src/util/test-helpers.js](https://github.com/sharetribe/web-template/blob/master/src/util/test-helpers.js)
to match your language in use, for example:

```js
import messages from '../translations/it.json';
```

## Developing the Sharetribe Web Template into a multilanguage marketplace

If you intend to modify the template to handle multiple languages, it is
good to note that the template is by default configured to run in single
language mode, so a multilanguage marketplace requires custom
development. For multiple languages, you basically have two approaches
for that custom development.

The first option is to create two versions of the client app, one for
Language 1 and one for Language 2. They can both point to the same
Marketplace API i.e. share the same listings, users, transaction
processes etc. If you have a very location-specific marketplace with
different locations mainly in different languages, this might be a good
approach, because you can then target your UI, branding and localization
more closely to the target area.

Another option is to customize a single client app to provide multiple
languages. For instance, you could import several language files in
`src/app.js` and select which one you are going to use by modifying
`src/routeConfiguration.js`, so that all the paths include a ”locale”
variable. E.g. `/about` could be changed to `/:locale/about` to capture
paths like `/fr/about`. In this case, it is useful to save the user's
language preference to the extended data.

Read more about having
[a multilanguage marketplace on top of Sharetribe](/concepts/microcopy/#can-i-have-a-multilanguage-marketplace).
