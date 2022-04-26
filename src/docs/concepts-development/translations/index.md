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

```js
  // ListingPage.js uses the variable to identify the message
  const bookingSubTitle = intl.formatMessage({ id: 'ListingPage.bookingSubTitle' });
...
  // The wording of the message is defined separately
  "ListingPage.bookingSubTitle": "Start by choosing your dates.",
...
  // This makes it possible to have several translations for a single variable
  "ListingPage.bookingSubTitle": "Empieza escogiendo las fechas.",

```

Starting from XXXX-XX, marketplace operators can modify the wording of
the translations in Flex Console. This means that operators can make
changes to the marketplace texts without the need for code changes. In
addition, the same translations can now be used from several different
client applications, making it easier to make centralized changes.

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

<extrainfo title="Create multiple translation assets">
If your marketplace has several languages that you would like to modify outside the codebase, you can create specific assets for each language and implement them in your client application in a similar way as the Console editable one. Since only one translation asset can be modified in Flex Console, you will need to use Flex CLI to create and modify the assets.
</extrainfo>

When the asset has been created, you will need to fetch the translations
to the client application. If you already have versions of your asset,
you will use `sdk.assetByVersion`, and if not, you will use
`sdk.assetByAlias`. TODO: CLARIFY!!

## Translation format for editing translations in Console.

A translation using the
[ICU message syntax](https://unicode-org.github.io/icu/userguide/format_parse/messages/)
can, at its simplest, consist of a phrase.

```js
const translations = {
  en: {
    "ListingPage.bookingSubTitle": "Start by choosing your dates."
  },
  es: {
   "ListingPage.bookingSubTitle": "Empieza escogiendo las fechas.",
  }
}
...

const bookingSubTitle = intl.formatMessage({ id: 'ListingPage.bookingSubTitle' });
```

### Simple argument

In addition, the format supports passing parameters as arguments to the
translation string. Passing a
[simple argument](https://formatjs.io/docs/core-concepts/icu-syntax/#simple-argument)
allows showing context-specific information as a part of the translation
string.

```js
const translations = {
  en: {
    "ListingPage.bookingTitle": "Book {title}",
  },
  es: {
    "ListingPage.bookingTitle": "Reservar {title}",
  }
}
...
// For a listing titled "Small cottage", the message will read "Book Small cottage" in English
// and "Reservar Small cottage" in Spanish.
const bookingTitle = intl.formatMessage({
  id="ListingPage.bookingTitle"
  values={{ title: listing.title }}
});

```

### plural

One important factor in creating natural translations is handling
pluralization in a text. The ICU format makes it possible to define
different wordings for singular and plural options.

```js
/* When you use plural in the translation string, you will need to specify
- the variable determining which option to use (here: 'count')
- the pattern we are following (here: 'plural')
- the options matching each alternative you want to specify (here: 'one' – there could be several options specified)
- an 'other' option that gets used when none of the specified alternatives matches
*/
const translations = {
  en: {
    "ManageListingsPage.youHaveListings": "You have {count} {count, plural, one {listing} other {listings}}",
  },
  es: {
    "ManageListingsPage.youHaveListings": "Tienes {count} {count, plural, one {anuncio} other {anuncios}}",
  }
}
...
  // When we pass 'count' as a value, the formatting determines which translation option, 'one' or the default,
  // is used in the final message string.
  const heading = (
    <FormattedMessage
      id="ManageListingsPage.youHaveListings"
      values={{ count: pagination.totalItems }}
    />

  // If pagination.totalItems === 1, the message reads "You have 1 listing" / "Tienes 1 anuncio".
  // For any other number, including zero, the message reads "You have X listings" / "Tienes X anuncios".
)
```

Since different languages have different pluralization rules,
pluralization is defined per language. You can see the full list of
pluralization arguments (`zero`, `one`, `two`, `few` etc.) in the
[ICU syntax documentation](https://formatjs.io/docs/core-concepts/icu-syntax/#plural-format).

### select

In addition to pluralization options, you can build logic to the
translation strings using
[select formatting](https://formatjs.io/docs/core-concepts/icu-syntax/#select-format).

```js
/* When you use `select` in the translation string, you will need to specify
- the variable determining which option to use (here: 'actor')
- the pattern we are following (here: 'select')
- the options matching each alternative you want to specify (here: 'you' – there could be several options specified)
- an 'other' option that gets used when none of the specified alternatives matches
*/
const translations = {
  en: {
    "TransactionPage.bookingAccepted": "{actor, select, you {You accepted the booking request.} other {{otherUsersName} accepted the booking request.}}",
  }
}
...
// actor: 'you', 'system', 'operator', or display name of the other party
const actor = 'you';

// For { actor: 'you', otherUsersName: 'Riley' }, the message will read "You accepted the booking request.".
// For any other values of 'actor', the message would read "Riley accepted the booking request."
const bookingAccepted = intl.formatMessage(
  { id="TransactionPage.bookingAccepted" },
  { actor, otherUsersName }
);

```

You can use select for cases where you have a predetermined list of
options you will encounter that require different translation strings.

## Can I have a multilanguage marketplace?

- Technically, having several translation files does enable using a
  single application for multiple languages
- Translations in Console only support one language, however you can
  create other translation assets through Flex CLI
- However, listings will most likely have only one language, unless you
  require that providers enter the listing information in multiple
  languages
- For FTW, if you have several geographies where your marketplace is
  active, you can deploy multiple applications and define the language
  per application
- Alternatively, in FTW you can define the language in the URL of the
  page so that the template's server-side rendering can handle the
  language changes
