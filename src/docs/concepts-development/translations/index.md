---
title: Translations in Flex
slug: translations
updated: 2022-04-26
category: concepts-development
ingress:
  This article introduces translations in Flex and how they are modified
  and edited in Flex Console and the API
published: true
---

In the FTW templates, user-facing content is not written directly into
the source code. Instead, the source code uses the
[ICU message syntax](https://unicode-org.github.io/icu/userguide/format_parse/messages/)
that defines variables for each meaningful piece of content, and a
translator or a content creator can define the specific words for the
variable in their language. The end user only sees the translator's
words, not the variable itself.

The key - value syntax is as follows:

```json
"<component name>.<translation key>": "<translation>"
```

For example:

```json
"ManageListingCard.editListing": "Edit listing"
```

The key can then be used in the code, so that the code does not need to
be changed even if the value ends up changing.

```js
// ManageListingCard.js uses the variable to identify the message
<FormattedMessage id="ManageListingCard.editListing" />
```

Starting from XXXX-XX, marketplace operators can modify the wording of
the translations in Flex Console. This means that operators can make
changes to the marketplace texts without the need for code changes. In
addition, the same translations can now be used from several different
client applications, making it easier to make centralized changes.

![Simple Console translation](./translation_simple.png)

## How translations are handled in Flex

- What is an asset?

With Console-editable translations, Flex introduces a concept of assets.
Assets are ways to define marketplace content and configurations with
JSON files without needing to include them in the client application
codebase.

For the translation version being edited in Flex Console, the asset in
question is `config/translations.json`. In other words, Flex Console has
a dedicated view – "Build" > "Content" – for modifying the
`config/translations.json` asset.

![Content view for editing translations](./translation_start.png)

You can add one or more translation key-value pairs in JSON format into
the Marketplace texts field. You can copy them from the linked
transaction resources in the FTW templates.

![Add translation key-value pairs](./translation_edit.png)

When the asset has been created, you will need to fetch the translations
to the client application. If you already have versions of your asset,
you will use `sdk.assetByVersion`, and if not, you will use
`sdk.assetByAlias`. TODO: CLARIFY!!

Read more about
[handling hosted asset translations in the FTW templates](/ftw/how-to-change-ftw-ui-texts-and-translations/).
TODO: UPDATE LINK ONCE ARTICLE IS SPLIT!

## Translation format for editing translations in Console.

A translation using the
[React Intl formatMessage formatting](https://formatjs.io/docs/intl#formatmessage)
can, at its simplest, consist of a phrase.

![Simple translation phrase](./translation_simple.png)

In the FTW template, the phrase is then passed to the UI element that
shows the value. Read more about
[using translations in the FTW templates](/ftw/how-to-change-ftw-ui-texts-and-translations/#using-the-translations).

![Simple translation phrase in UI](./translations_UI_simple.png)

### Simple argument

In addition, the format supports passing parameters as arguments to the
translation string. Passing a
[simple argument](https://formatjs.io/docs/core-concepts/icu-syntax/#simple-argument)
allows showing context-specific information as a part of the translation
string.

![Translation phrase with parameter](./translation_parameter.png)

Using the translation then requires that the code passes parameter
`listingTitle` to the element that renders the value.

![Translation phrase with parameter in UI](./translations_UI_parameter.png)

Do note that even if the translation message uses a simple argument, you
can choose to not use it. For instance, you could replace the
translation in the previous example with
`"ManageListingCard.pendingApproval": "This listing is pending admin approval and can't be booked."`.
However, if you later decide you do want to use the title, it is
recommended to double check the original translation file in your client
application to see the names of the attributes available in the message.

### plural

One important factor in creating natural translations is handling
pluralization in a text. The ICU format makes it possible to define
different wordings for singular and plural options.

![Translation phrase with pluralization defined](./translation_plural.png)

When you use plural in the translation string, you will need to specify

- the variable determining which option to use (here: `count`)
- the pattern we are following (here: `plural`)
- the options matching each alternative you want to specify (here: `one`
  – there could be several options specified)
- an `other` option that gets used when none of the specified
  alternatives matches

![Translation phrase with pluralization in UI](./translations_UI_plural.png)

Since different languages have different pluralization rules,
pluralization is defined per language. You can see the full list of
pluralization arguments (`zero`, `one`, `two`, `few` etc.) in the
[ICU syntax documentation](https://formatjs.io/docs/core-concepts/icu-syntax/#plural-format).

## Can I have a multilanguage marketplace?

Technically, having several translation files does enable using a single
application for multiple languages. However, editing translations in
Console only supports one language at a time, so you will need to modify
any other languages using the bundled translation files.

_TODO: SHOULD THIS SECTION GO TO THE FTW ARTICLE ON TRANSLATIONS?? A SEPARATE ARTICLE? ORIGINALLY A MACRO IN IC_

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
paths like `/fr/about`. In this case, you probably need to save the
user's language preference to the extended data.

The problem here is user-generated content. Even though listings and
user profiles could include both language versions by saving the content
of language-specific input fields to a listing's extended data, users
are rarely capable of providing content for several languages.

With email notifications and built-in emails, you would need to save the
user's language to extended data and then have an if-statement that
shows the correct language, for example:

```js
{{#eq recipient.private-data.language "en"}}Hello{{else}}Bonjour{{/eq}}
```