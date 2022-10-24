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
and remove design choices made for the example marketplace, Biketribe.

FTW templates have most of the styling tied to component directories,
but there is a configuration file that defines the marketplace color, as
well as a handful of default images:

```shell
└── src
    └── config
        └── configBranding.js
```

## Changing marketplace color

The configBranding.js defines a marketplace color, which then gets
generated into light and dark variants in
**src/styles/marketplaceDefaults.css**. The darker and lighter color
variants are mainly used for effects like color change when the cursor
is hovering on top of a button.

```js
// Marketplace color.
// This is saved as CSS Property: --marketplaceColor in src/app.js
// Also --marketplaceColorDark and --marketplaceColorLight are generated from this one
// by adding +/- 10% to lightness.
export const marketplaceColor = '#7c3aed';
```

Our marketplace for summer cottages could use green color as its
branding, so we'll change the main color code:

```js
export const marketplaceColor = '#2f880a';
```

After you save the file, the development server will compile the modules
and serve the updated app on your local development environment
(http://localhost:3000) Assuming, that you have development server
running (i.e. **`yarn run dev`**).

You should notice that some text and background-colors were changed to
green.

// TODO: Take new screenshot after Pages default landing page
![Hero section after changing the marketplace color](./marketplace-color-changed.png)

**Congratulations!** You have made your first customization.

It's time to change the Biketribe image on the landing page.<br />
[› Go to the next article](/tutorial/change-image-assets/)
