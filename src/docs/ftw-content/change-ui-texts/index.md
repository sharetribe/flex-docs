---
title: How to change FTW UI texts
slug: how-to-change-ftw-ui-texts
updated: 2022-05-13
category: ftw-content
ingress:
  This guide gives an overview how to change the User Interface (UI)
  texts in Flex Template for Web (FTW).
published: true
---

The FTW templates have several types of texts that can be read in the
user interface. The most extensive group of UI texts are translations,
but FTW templates also have static pages, as well as some other groups
of content that can be configured in the code base.

## Translations

In the FTW templates, user-facing content is not written directly into
the source code. Instead, the source code uses
[React Intl message formatting](https://formatjs.io/docs/intl#formatmessage)
that defines keys for each meaningful piece of content, and a translator
or a content creator can then define the message (i.e. the value) for
each key in their language. Read more about how
[Flex handles translations](/concepts/translations/).

By default, FTW templates use built-in translation files to show
translation messages in the UI. However, starting in 2022-05, operators
can also modify translations in Flex Console using hosted translation
assets. The built-in translations are merged with the hosted
translations in the template, so you can use both ways of managing
translations. Read more about how to
[modify built-in translations in FTW templates](/ftw/how-to-change-ftw-bundled-translations/)
and
[how hosted translations work in the FTW templates](/ftw/hosted-translations).

You may also want to change the language of the user interface entirely. Read more about [changing the language used in FTW](/ftw/how-to-change-ftw-language/).

In addition to translations, there are other forms of content in the FTW
applications that operators may need to manage.

## Static pages

A few components in the FTW template app contain texts that are not
included in the `en.json` file, namely `AboutPage`, `PrivacyPolicy`, and
`TermsOfService`. The reason behind this is that these components only
contain static content that is laid out in more of a document format so
the translations for these texts can easily be changed and maintained in
the component files themselves.

More information about adding static content to the application can be
found in the
[How to add static pages in FTW](/ftw/how-to-add-static-pages-in-ftw/)
guide.

## Other cases: labels and countries

There are few other cases where we haven't added translations directly
to the translation files.

Labels for filters (e.g. `categories` and `amenities` in FTW-daily) can
be found in `src/marketplace-custom-config.js` By default,
[these filters are not in use](/how-to/change-search-filters-in-ftw/#adding-a-new-search-filter),
since every marketplace has its own extended data and search filters for
them.

<extrainfo title="FTW-product has moved the location of some components">

```shell
└── src
    └── config
        └── marketplace-custom-config.js
```

</extrainfo>

[Country codes](https://github.com/sharetribe/flex-template-web/blob/master/src/translations/countryCodes.js)
are in a separate file as well. Stripe API requires country information
as
[ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
codes. These are used when billing address is asked in
`StripePaymenForm` on `CheckoutPage`.

```shell
└── src
    └── translations
        └── countryCodes.js
```
