---
title: First customization
slug: first-edit
updated: 2021-02-12
category: tutorial-branding
ingress: Begin customizing your marketplace by custom styling and introducing your own branding.
published: true
---

## Marketplace styles

Custom styling is a good starting point to introduce your own branding
and remove design choices made for example marketplace, Saunatime.

FTW templates have most of the styling tied to component directories,
but there are 3 files that define custom media queries, default CSS
Properties, and property sets:

```shell
└── src
    └── styles
        ├── propertySets.css
        ├── customMediaQueries.css
        └── marketplaceDefaults.css
```

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
[› Go to the next article](/tutorial-branding/change-image-assets/)
