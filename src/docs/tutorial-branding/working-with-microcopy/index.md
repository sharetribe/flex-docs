---
title: Working with microcopy
slug: working-with-microcopy
updated: 2022-05-13
category: tutorial-branding
ingress: Change the UI copy-texts and implement new microcopy.
published: true
---

## Where to find copy-texts

One of the biggest mandatory tasks for a customization project is to
change the UI texts. FTW-daily is a rental marketplace for saunas - so,
there are quite many components and pages that need to change the
copy-texts.

The easiest way to modify the copy texts is through Flex Console, in
Build > Content. This page helps you modify what in Flex is known as _microcopy_ –
button labels, help texts, and other small messages that help your user
find their way around the marketplace.

![Modify marketplace texts](./microcopy_start.png)

_**Note:** Hosted assets are available in Flex and the FTW templates
starting from version v8.5. If you have an earlier version and want to
implement the feature in your template, you can see the necessary
modifications in the PR for
[ftw-daily](https://github.com/sharetribe/ftw-daily/pull/1510)._

<extrainfo title="FTW-hourly and FTW-product versions with hosted microcopy">
In FTW-hourly, hosted microcopy is available in v10.5. In FTW-product, it is available in v9.2.
</extrainfo>

When you first start building your marketplace, the JSON field in
the Microcopy section is empty, and all microcopy comes from built-in
microcopy files in the template. (We refer to these texts as microcopy,
but in the template they are in the _translations_ folder. In addition
to the default _en.json_ file, there are other languages available,
which is why the folder is titled _translations_.)

In the Microcopy section, you can see links that lead to the
microcopy folders for each FTW template repository, if you want to
[copy the relevant microcopy to Flex Console](/concepts/microcopy/#how-microcopy-are-handled-in-flex).
In this tutorial, we will not copy the full texts – instead, we will
enter only the microcopy we want to modify.

The built-in default microcopy for the FTW template can be found in this
_en.json_ file:

```shell
└── src
    └── translations
        └── en.json
```

In addition to microcopy, there are also a couple of components that
contain a huge amount of text content (e.g. **AboutPage**,
**PrivacyPolicy**, and **TermsOfService**). The content of those
components is not included in the microcopy file since they need a
free-form structure and styling. It is easier to achieve that with a
markup language (like HTML and JSX) than key-value mapping you see in
_en.json_ file:

```json
  "LocationSearchForm.placeholder": "Search saunas…",
```

In this tutorial, we change the microcopy of Hero component, but we have
another document that dives deeper into this topic:
[How to change FTW bundled microcopy](/ftw/how-to-change-ftw-bundled-microcopy/)

## Change the microcopy for Hero component

The content of microcopy file has a format, where the "key" contains a
dot notation:<br />
_`"<ComponentName>.<microcopyKey>": "<microcopyMessage>"`_

So, there are a couple of ways to find the correct microcopy key for UI
components:

- You could search for a microcopy message in the microcopy file
- You could check the name of the component and search for the component
  name in the microcopy file.

The latter option becomes easier if you use browser extension: **React
Developer Tools**.<br /> Here's a link to
[Chrome extension](https://chrome.google.com/webstore/search/React%20Developer%20Tools?hl=en).

![Hero title selected with React Developer Tools](./react_devtools_microcopy.png)

In the screenshot, the highlighted text (listing creation link) comes from a component
called **FormattedMessage**. This is a component from
[React Intl](https://github.com/formatjs/react-intl) library which FTW
templates use to embed microcopy messages to correct microcopy keys. If you
check the **props** section on the _Components_ tab of Web Inspector
(when React Developer Tools is installed), you see a row:
`id: "TopbarDesktop.createListing"`.

So, the microcopy message can be found from _en.json_ file under the
microcopy key: _TopbarDesktop.createListing_. There is also another microcopy
message that TopbarDesktop component uses. Let's change all of them:

```json
{
  "SectionHero.browseButton": "Browse cottages",
  "SectionHero.subTitle": "Book a cottage and take a break from busy city life",
  "SectionHero.title": "Choose Cottage Days"
}
```

Copy and paste the above rows, complete with the curly brackets, to the
Marketplace texts JSON field.

![Modified SectionHero microcopy in Console](./tutorial_translations.png)

When you save the file, you should soon see the changes in the hero
section on the landing page:

![Hero section with updated microcopy](./hero-with-updated-translations.png)

To get more insight into translation syntax, different language files,
and localization of dates and money values, you should check the
article:
[How to change FTW bundled microcopy](/ftw/how-to-change-ftw-bundled-microcopy/).

To learn more about how the hosted microcopy work in FTW templates, read
the article on [hosted assets in FTW](/ftw/hosted-microcopy/).

To read more about how microcopy can be modified in Flex Console, check
out the article about [microcopy in Flex](/concepts/microcopy/).

<br />

In the next article, you learn how to configure FTW-daily and change the
default currency.<br />
[› Go to the next article](/tutorial/configurations/)
