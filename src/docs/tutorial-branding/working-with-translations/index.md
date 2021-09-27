---
title: Working with translations
slug: working-with-translations
updated: 2020-02-28
category: tutorial-branding
ingress:
  A tutorial for changing the UI copy-texts and implementing new
  translations.
published: true
---

## Where to find copy-texts

One of the biggest mandatory tasks for customization project is to
change the UI texts. FTW-daily is a rental marketplace for saunas - so,
there are quite many components and pages that need to change the
copy-texts. We refer to copy-text as translations, since there could be
different translation files used instead of the default one: _en.json_.

Most of the translations can be found from this _en.json_ file:

```shell
└── src
    └── translations
        └── en.json
```

On top of that file, there are also a couple components that contain a
huge amount of text content (e.g. **AboutPage**, **PrivacyPolicy**, and
**TermsOfService**). The content of those components is not included in
the translation file since they need a free-form structure and styling.
It is easier to achieve that with a markup language (like HTML and JSX)
than key-value mapping you see in _en.json_ file:

```json
  "LocationSearchForm.placeholder": "Search saunas…",
```

In this tutorial, we change the translations of Hero component, but we
have another document that dives deeper into this topic:
[How to change FTW UI texts and translations](/ftw-styling/how-to-change-ftw-ui-texts-and-translations/)

## Change the translations for Hero component

The content of translation file has a format, where the "key" contains a
dot notation:<br />
_`"<ComponentName>.<translationKey>": "<translation>"`_

So, there are a couple of ways to find the correct translation for UI
components:

- You could search for a translation text
- You could check the name of the component and search it from the
  translation file.

The latter option becomes easier if you use browser extension: **React
Developer Tools**.<br /> Here's a link to
[Chrome extension](https://chrome.google.com/webstore/search/React%20Developer%20Tools?hl=en).

![Hero title selected with React Developer Tools](./react-devtools.png)

In the screenshot, the highlighted text (title) comes from a component
called **FormattedMessage**. This is a component from
[React Intl](https://github.com/formatjs/react-intl) library which FTW
templates use to embed translations to correct translation keys. If you
check the **props** section on the _Components_ tab of Web Inspector
(when React Developer Tools is installed), you see a row:
`id: "SectionHero.title"`.

So, the translation can be found from _en.json_ file under the
translation key: _SectionHero.title_. There are also 2 other
translations that SectionHero component uses. Let's change all of them:

```json
  "SectionHero.browseButton": "Browse cottages",
  "SectionHero.subTitle": "Book a cottage and take a break from busy city life",
  "SectionHero.title": "Choose Cottage Days",
```

When you save the file, you should see the changes in the hero section
on the landing page:

![Hero section with updated translations](./hero-with-updated-translations.png)

To get more insight into translation syntax, different language files,
and localization of dates and money values, you should check the
article:
[How to change FTW UI texts and translations](/ftw-styling/how-to-change-ftw-ui-texts-and-translations/).

<br />

In the next article, you learn how to configure FTW-daily and change the
default currency.<br />
[› Go to the next article](/tutorial-branding/configurations/)
