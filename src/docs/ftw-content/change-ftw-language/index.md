---
title: How to change marketplace language
slug: how-to-change-template-language
updated: 2023-09-04
category: template-content
ingress:
  This guide describes how to change the language used in the Sharetribe
  Web Template.
published: true
---

TODO SLUG

If you want the template to use a language that is not supported by
default, a new language-specific marketplace text file needs to be added
and the messages in it need to be translated. This article walks you
through the steps required to to that.

## Creating a new marketplace text file

1. Copy the default `src/translations/en.json` English marketplace text
   file into some other file, for example `it.json` for Italian.

2. Change the messages in the new marketplace text file to the desired
   language.

<info>

We will add a few other language files available in
[src/translations/](https://github.com/sharetribe/web-template/tree/master/src/translations)
directory for you to start customizing marketplace texts.

</info>

Even if you use
[hosted marketplace texts](/template/hosted-marketplace-texts/) to
manage your marketplace texts, it is still important to have a built-in
language-specific marketplace text file in the template as well, so that
the application can show meaningful messages for any keys missing from
the Sharetribe Console marketplace text asset.

## Changing the marketplace texts used in the template

Once you have the marketplace text file in place:

1. In `config/configDefault.js`, change the `locale` variable value to
   match the new locale (the name of the new marketplace text file,
   without the extension), for example:

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
accidentally deleted keys in dynamic hosted marketplace texts (in
Console) won't cause the default English translations to be rendered in
your custom client app.

## Changing the marketplace texts used in tests

Also, in case you will translate the application and develop it forward
it is wise to change the marketplace text file that the tests use.
Normally tests are language agnostic as they use marketplace text keys
as values. However, when adding new marketplace texts you can end up
with missing marketplace text keys in tests. To change the marketplace
text file used in tests change the `messages` variable in
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
[a multilanguage marketplace on top of Sharetribe](/concepts/marketplace-texts/#can-i-have-a-multilanguage-marketplace).
