---
title: How to change FTW UI texts and translations
slug: how-to-change-ftw-ui-texts-and-translations
updated: 2019-05-21
category: ftw-styling
ingress:
  This guide describes how to change the User Interface (UI) texts and
  translations in Flex Template for Web (FTW).
published: true
---

The Flex Template for Web supports having a single language for the UI.
Supported languages are English, French and Spanish, English being used
by default. For information about changing the language, see the
[Changing the language](#changing-the-language) section below.

We are using the [React Intl](https://github.com/yahoo/react-intl)
library to translate UI texts and to format dates, numbers, and money
values.

## The translation file

All the text translations can be found in the
[src/translations/en.json](https://github.com/sharetribe/flex-template-web/blob/master/src/translations/en.json)
file. The translation data is formatted as one JSON object with all the
translations as properties.

The key - value syntax is as follows:

```json
"<component name>.<translation key>": "<translation>"
```

For example:

```json
"ManageListingCard.viewListing": "View listing"
```

The keys are namespaced to the corresponding component. This is aligned
with the component driven paradigm that the application follows. It
might introduce duplication with same translation texts occurring
multiple times in the translation file but it also emphasizes how all
the components are independent, how a component can be used anywhere and
how modifications to a single component do not affect other components.

## Using the translations

React Intl provides multiple ways to access the translation data but the
most commonly used are the `formatMessage` function and the
`FormattedMessage` tag provided by React Intl.

To use the `formatMessage` function, component needs to be wrapped with
the `injectIntl` function which provides a render prop called `intl`.
`intl` then provides all the React Intl translation functions, like
`formatMessage`:

```js
import { intlShape, injectIntl } from 'react-intl';

const SomeComponent = props => {
  const { intl } = props;

  const translation = intl.formatMessage({
    id: 'SomeComponent.someKey',
  });

  // ...
};

SomeComponent.propTypes = {
  // from injectIntl
  intl: intlShape.isRequired,
};

export default injectIntl(SomeComponent);
```

As for the `FormattedMessage` it just needs to be imported from
`react-intl` and it takes the id prop:

```jsx
<FormattedMessage id="SomeCompoennt.someKey" />
```

Other functions and componets can be explored in the
[React Intl documentation](https://github.com/yahoo/react-intl/wiki).

## Formatting

React Intl uses the [FormatJS](https://formatjs.io/) formatters for
shaping the translation texts based on given arguments. Here are a few
examples on how to use FormatJS.

### Arguments

Pass a named argument to the format function/component. For the
following translation:

```json
"EnquiryForm.messageLabel": "Message to {authorDisplayName}",
```

Pass the author data in the `FormattedMessage` component:

```jsx
<FormattedMessage
  id="EnquiryForm.messageLabel"
  values={{ authorDisplayName: 'Jane D' }}
/>
```

Or the the `formatMessage` function:

```js
intl.formatMessage(
  { id: 'EnquiryForm.messageLabel' },
  { authorDisplayName: 'Jane D' }
);
```

### Pluralization

With pluralization a translation can be formatted to adapt to a number
argument.

```json
"ManageListingsPage.youHaveListings":
  "You have {count} {count, plural, one {listing} other {listings}}",
```

This translation takes the `count` argument and uses the `plural`, `one`
and `other` keywords to format the last word of the translation to be
_listing_ or _listings_ based on the `count`. The pluralized translation
can be used with the `FormattedMessage` component:

```jsx
<FormattedMessage
  id="ManageListingsPage.youHaveListings"
  values={{ count: 3 }}
/>
```

Or with the `formatMessage` function:

```js
intl.formatMessage(
  { id: 'ManageListingsPage.youHaveListings' },
  { count: 1 }
);
```

More formatting examples can be found from the
[FormatJS message syntax documentation](https://formatjs.io/guides/message-syntax/).

## Texts outside the translation file

A few components in the template app contain texts that are not included
in the `en.json` file, namely `AboutPage`, `PrivacyPolicy`, and
`TermsOfService`. The reason behind this is that these components only
contain static content that is laid out in more of a document format so
the translations for these texts can easily be changed and maintained in
the component files themselves.

More information about adding static content to the application can be
found in the
[How to add static pages in FTW](/ftw-styling/how-to-add-static-pages-in-ftw/)
guide.

There are few other cases where we haven't added translations directly
to the translation files:

- Labels for example filters (categories and amenities) can be found
  from `src/marketplace-custom-config.js` By default,
  [these filters are not in use](/cookbook-search/change-search-filters-in-ftw/#adding-a-new-search-filter)
  since every marketplace has its own extended data and search filters
  for them.
- [Merchant Category Codes](https://github.com/sharetribe/flex-template-web/blob/master/src/forms/PayoutDetailsForm/merchantCategoryCodesUS.js).
  Stripe requires this from US providers.
- [Country Codes](https://github.com/sharetribe/flex-template-web/blob/master/src/translations/countryCodes.js).
  Stripe API requires country as
  [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
  codes. These are used when billing address is asked in
  `StripePaymenForm` on `CheckoutPage`.

## Changing the language

If you want the template to use a language that is not supported by
default a new translation file needs to be added and the messages in it
need to be translated:

### Creating a new translation file

1. Copy the default `src/translations/en.json` English translations file
   into some other file, for example `it.json` for Italian.

2. Change the messages in the new translations file to the desired
   language.

> Note: we already have a few other language files available in
> [src/translations/](https://github.com/sharetribe/flex-template-web/tree/master/src/translations)
> directory for you to start customizing translations.

### Changing the translations used in FTW

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

### Changing the translation used in tests

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

## Managing translations

In case you have added a new language translation file and are pulling
translation updates to `en.json` from the upstream repo there is a
command line tool to help keeping the translation files in sync. Running
the following command in the project root

```bash
yarn run translate
```

will start a command line application:

![Translations CLI](./translations-cli.png)

The command line application can be used to match a translation file
against the English translations. If your new translations file follows
the `<LANG CODE>.json` naming, the CLI will pick it up automatically. In
order to improve readability, you can add the language name to the
`TARGET_LANG_NAMES` map in `scripts/translations.js` if it is not yet in
there and the CLI will use the correct name for your language instead of
the language code when prompting about translations.

In case you wish to use something else than English as the source
language, modify the `SOURCE_LANG` object in `scripts/translations.js`
to match your needs.
