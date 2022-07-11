---
title: First customization
slug: first-edit
updated: 2022-07-11
category: tutorial-branding
ingress:
  Begin customizing your marketplace by custom styling and introducing
  your own branding.
published: true
---

## Marketplace styles

Custom styling is a good starting point to introduce your own branding
and remove design choices made for example marketplace, Saunatime.

FTW templates have most of the styling tied to component directories,
but there are 2 files that define custom media queries, default CSS (CSS
Properties, element styles, and global css classes):

```shell
└── src
    └── styles
        ├── customMediaQueries.css
        └── marketplaceDefaults.css
```

<extrainfo title="I have a propertySets.css file. What is that?">

```shell
└── src
    └── styles
        └── propertySets.css
```

In the previous versions of FTW templates, there has been also a third
file: propertySets.css. This file contained CSS Property Sets that could
be applied to component styles with `@apply` syntax. However, W3C
decided not to include that feature in future CSS syntax and the
postcss-apply plugin was deprecated in the process.

So, if you have an older FTW template (earlier than FTW-daily v9,
FTW-hourly v11, or FTW-product v10), you might have this file in your
codebase. If you start using sharetribe-scripts v6.0.0 you need to
consider migrating away from that since it contains code that is
deprecated in v6.0.0 of sharetribe-scripts.

Read more from the pull request in FTW-daily:
https://github.com/sharetribe/ftw-daily/pull/1531

</extrainfo>

## Changing CSS variables

The most important file is **marketplaceDefaults.css**, where you can
find CSS variable `--marketplaceColor` and its two variants.

```css
/* ================ Colors ================ */

--marketplaceColor: #38a70a;
--marketplaceColorLight: #ff4c38;
--marketplaceColorDark: #8c291e;
```

Our marketplace for summer cottages could use green color as its
branding, so we'll change these color codes a bit:

```css
--marketplaceColor: #2f880a;
--marketplaceColorLight: #39a10c;
--marketplaceColorDark: #287209;
```

The darker and lighter color variants are mainly used for effects like
color change when the cursor is hovering on top of a button.

After you save the file, the development server will compile the modules
and serve the updated app on your local development environment
(http://localhost:3000) Assuming, that you have development server
running (i.e. **`yarn run dev`**).

You should notice that some text and background-colors were changed to
green.

![Hero section after changing the marketplace color](./marketplace-color-changed.png)

**Congratulations!** You have made your first customization.

It's time to change the Saunatime image on the landing page.<br />
[› Go to the next article](/tutorial/change-image-assets/)
