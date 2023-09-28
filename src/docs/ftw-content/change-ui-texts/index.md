---
title: Change template texts
slug: how-to-change-template-ui-texts
updated: 2023-01-01
category: template-content
ingress:
  This guide gives an overview how to change the user interface texts in
  the Sharetribe Web Template.
published: true
---

The template has several types of texts that can be read in the user
interface. The most extensive group of UI texts is microcopy, but the
template also has content pages, as well as some other groups of content
that can be configured in the code base.

## Microcopy

In the Sharetribe Web Template, user-facing content is not written
directly into the source code. Instead, the source code uses

[React Intl message formatting](https://formatjs.io/docs/intl#formatmessage)
that defines keys for each meaningful piece of content, and a translator
or a content creator can then define the message (i.e. the value) for
each key in their language. Read more about how
[Sharetribe handles microcopy](/concepts/microcopy/).

By default, the template use built-in language-specific microcopy files
to show microcopy messages in the UI. However, starting in 2022-05,
operators can also modify microcopy in Sharetribe Console using hosted
microcopy assets. The built-in microcopy is merged with the hosted
microcopy in the template, so you can use both ways of managing
microcopy. Read more about how to
[modify built-in microcopy in the template](/template/how-to-change-ftw-bundled-microcopy/)
and
[how hosted microcopy work in the template](/template/hosted-microcopy/).

You may also want to change the language of the user interface entirely.
Read more about
[changing the language used in the template](/template/how-to-change-template-language/).

In addition to microcopy, there are other forms of content in the client
applications that operators may need to manage.

## Content pages

Your marketplace also has some content pages that can be modified
through Sharetribe Console. The default content pages include

- About
- Landing page
- Privacy Policy
- Terms of Service

These pages are rendered by the
[PageBuilder component](/template/page-builder/) in the template. In
addition to these default pages, you can create your own content pages
through Sharetribe Console, and
[fully manage their content](/concepts/content-management/) without code
changes. On the template side, you can modify
[how that content is displayed](/how-to/options-prop/).

## Static pages

It is possible to create fully static pages in the Sharetribe Web
Template. You might want to do this if you e.g. want to create static
content pages for performance reasons.

More information about adding static content to the application can be
found in the
[How to add static pages in the template](/template/how-to-add-static-pages/)
guide.

## Labels and countries

There are few other cases where we haven't added microcopy directly to
the microcopy files.

Labels for filters can be found in
[_config/configListing.js_](https://github.com/sharetribe/web-template/blob/main/src/config/configListing.js).

[Country codes](https://github.com/sharetribe/web-template/blob/master/src/translations/countryCodes.js)
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
