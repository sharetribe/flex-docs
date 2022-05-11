---
title: How to change FTW UI texts
slug: how-to-change-ftw-ui-texts
updated: 2022-05-15
category: ftw-content
ingress:
  This guide describes how to change the User Interface (UI) texts in Flex Template for Web (FTW).
published: true
---

In addition to translations, there are other forms of content in the FTW applications that operators may need to manage.

## Static pages

A few components in the FTW template app contain texts that are not included
in the `en.json` file, namely `AboutPage`, `PrivacyPolicy`, and
`TermsOfService`. The reason behind this is that these components only
contain static content that is laid out in more of a document format so
the translations for these texts can easily be changed and maintained in
the component files themselves.

More information about adding static content to the application can be
found in the
[How to add static pages in FTW](/ftw/how-to-add-static-pages-in-ftw/)
guide.

## Labels and countries

There are few other cases where we haven't added translations directly
to the translation files:

- Labels for example filters (categories and amenities) can be found
  from `src/marketplace-custom-config.js` By default,
  [these filters are not in use](/how-to/change-search-filters-in-ftw/#adding-a-new-search-filter)
  since every marketplace has its own extended data and search filters
  for them.
- [Country Codes](https://github.com/sharetribe/flex-template-web/blob/master/src/translations/countryCodes.js).
  Stripe API requires country as
  [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
  codes. These are used when billing address is asked in
  `StripePaymenForm` on `CheckoutPage`.

<extrainfo title="FTW-product has moved the location of some components">

```shell
└── src
    └── config
        └── marketplace-custom-config.js
```

</extrainfo>
