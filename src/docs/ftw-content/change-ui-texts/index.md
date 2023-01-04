---
title: Change template texts
slug: how-to-change-ftw-ui-texts
updated: 2023-01-01
category: ftw-content
ingress:
  This guide gives an overview how to change the user interface texts in
  the Sharetribe Web Template.
published: true
---

The template has several types of texts that can be read in the user
interface. The most extensive group of UI texts is microcopy, but the
template also has static pages, as well as some other groups of content
that can be configured in the code base.

## Microcopy

In the Sharetribe Web Template, user-facing content is not written
directly into the source code. Instead, the source code uses
[React Intl message formatting](https://formatjs.io/docs/intl#formatmessage)
that defines keys for each meaningful piece of content, and a translator
or a content creator can then define the message (i.e. the value) for
each key in their language. Read more about how
[Flex handles microcopy](/concepts/microcopy/).

By default, the template use built-in language-specific microcopy files
to show microcopy messages in the UI. However, starting in 2022-05,
operators can also modify microcopy in Flex Console using hosted
microcopy assets. The built-in microcopy is merged with the hosted
microcopy in the template, so you can use both ways of managing
microcopy. Read more about how to
[modify built-in microcopy in the template](/ftw/how-to-change-ftw-bundled-microcopy/)
and [how hosted microcopy work in the template](/ftw/hosted-microcopy/).

You may also want to change the language of the user interface entirely.
Read more about
[changing the language used in the template](/ftw/how-to-change-ftw-language/).

In addition to microcopy, there are other forms of content in the client
applications that operators may need to manage.

## Static pages

TODO: If pages is released, remove this

A few components in the template app contain texts that are not included
in the `en.json` file, namely _AboutPage_, _PrivacyPolicy_, and
_TermsOfService_. The reason behind this is that these components only
contain static content that is laid out in more of a document format so
the copy for these texts can easily be changed and maintained in the
component files themselves.

More information about adding static content to the application can be
found in the
[How to add static pages in the template](/ftw/how-to-add-static-pages-in-ftw/)
guide.

## Labels and countries

There are few other cases where we haven't added microcopy directly to
the microcopy files.

Labels for filters can be found in
[_config/configListing.js_](https://github.com/sharetribe/ftw-x/blob/main/src/config/configListing.js).

[Country codes](https://github.com/sharetribe/ftw-x/blob/master/src/translations/countryCodes.js)
are in a separate file as well. Stripe API requires country information
as
[ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
codes. These are used when billing address is asked in
_StripePaymentForm_ on _CheckoutPage_.

```shell
└── src
    └── translations
        └── countryCodes.js
```
