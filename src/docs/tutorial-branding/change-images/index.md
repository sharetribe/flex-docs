---
title: Change template images
slug: change-images
updated: 2022-07-11
category: tutorial-branding
ingress:
  Learn how to update template images such as the default background
  image, favicon and app icons.
published: true
---

## Default background image

In the [previous step](/tutorial/first-edit/), you made changes to the
CSS Properties on marketplaceDefaults.css file. This time you make
changes to global CSS classes. **`.defaultBackgroundImage`** class can
be found in there too. It is used to provide a background image for
pages such as Authentication Page for sign-up and login.

```shell
└── src
    └── styles
        └── marketplaceDefaults.css
```

```css
/* ================ Plain global CSS glasses ================ */

/* Full screen Background image located in root-folder/src/assets */
.defaultBackgroundImage {
  /* Gradient direction and overlaying the black color on top of the image for better readability */
  background: linear-gradient(
      -45deg,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.6)
    ), url('../assets/background-1440.jpg');

  /* Add loading color for the div */
  background-color: var(--matterColor);

  /* Cover the whole screen with the background image */
  background-size: cover;

  /* Align the image within the container */
  background-position: center center;

  @media (--viewportLarge) {
    border-radius: 40px;
    border: solid 36px var(--matterColorBright);
  }
}
```

<extrainfo title="I can't find it, but I have something similar in a file called propertySets.css. What is that?">

```shell
└── src
    └── styles
        └── propertySets.css
```

There you might find something like:

```css
/* Full screen Background image located in root-folder/src/assets */
--backgroundImage: {
  /* Gradient direction and overlaying the black color on top of the image for better readability */
  background: linear-gradient(
      -45deg,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.6)
    ), url('../../assets/background-1440.jpg');

  /* Add loading color for the div */
  background-color: var(--matterColor);

  /* Cover the whole screen with the background image */
  background-size: cover;

  /* Align the image within the container */
  background-position: center center;

  @media (--viewportLarge) {
    border-radius: 40px;
    border: solid 36px var(--matterColorBright);
  }
}
```

In previous versions of FTW, there has been a third CSS file:
propertySets.css. This file contains
[CSS Property Sets](https://chromestatus.com/feature/5753701012602880)
that can be applied to component styles using the `@apply`syntax.
However, W3C decided not to include that feature in future CSS syntax,
and the
[postcss-apply plugin](https://github.com/pascalduez/postcss-apply) got
deprecated in the process.

If you have an older FTW template (earlier than FTW-daily v9, FTW-hourly
v11 or FTW-product v10), you might have this file in your codebase. If
you start using sharetribe-scripts v6.0.0, you need to consider
migrating away from that since it contains code that is deprecated in
v6.0.0 of sharetribe-scripts.

Read more from
[this pull request](https://github.com/sharetribe/ftw-daily/pull/1531)
in FTW-Daily.

</extrainfo>

That **background** styling-rule refers to _background-1440.jpg_ image
in the _assets_ directory:

```shell
└── src
    └── assets
        └── background-1440.jpg
```

So, to change it, we could just save a different image as
'background-1440.jpg' to replace the default background image (or you
can add a new image and then change the filename in
`.defaultBackgroundImage` class). The image should be 1440 pixels wide
so that it doesn't look bad on retina displays.

Here's an image, we used in this tutorial:<br />
[Summer house by Markus Spiske (cropped)](/tutorial-assets/markus-spiske-summer-house-unsplash.jpg)

![CottageDays example with updated background image](./cottagedays-background-image.png)

### Images in 'assets' or Image Assets?

The FTW templates use two types of assets:

- bundled assets and
- hosted assets

Bundled assets are a part of the client application. For images, they
live in the _src/assets_ folder of the client codebase. Hosted assets,
on the other hand, are fetched from the
[Asset Delivery API](https://www.sharetribe.com/api-reference/asset-delivery-api.html).
This tutorial only focuses on bundled assets. You can
[read more about hosted assets](/references/assets/).

</extrainfo>

## Images for social media

In the same _assets_ directory, there are a couple of other images that
you should also pay attention to:

```shell
└── src
    └── assets
        ├── background-1440.jpg
        ├── saunatimeFacebook-1200x630.jpg
        └── saunatimeTwitter-600x314.jpg
```

These images (**saunatimeFacebook-1200x630.jpg** and
**saunatimeTwitter-600x314.jpg**) are used by social media sites to
generate previews when your marketplace is shared in their platforms.

The default content is Saunatime branded so these images should be
changed too:

![Preview image for Twitter](./saunatimeTwitter-600x314.jpg)

Here are two image files you could use in the context of this tutorial:

- [Facebook sharing preview graphics](/tutorial-assets/cottagedays-facebook-1200x630-by-markus-spiske.jpg)
- [Twitter sharing preview graphics](/tutorial-assets/cottagedays-twitter-600x314-by-markus-spiske.jpg)

**Steps to follow**:

1. Save those files to the assets directory
1. Find all the modules where _saunatimeFacebook-1200x630.jpg_ and
   _saunatimeTwitter-600x314.jpg_ are imported. There should be 2 files:
   - _src/components/Page/Page.js_
   - _src/containers/LandingPage/LandingPage.js_<br /> (This is an
     example of how to overwrite default sharing images per page.)
1. Change the imported asset files

<extrainfo title="Extra: how to test social media sharing?">

You can use online debuggers to check how your social media sharing
previews look like. However, the app needs to be available from the
public internet before you can use these tools:

- [Facebook sharing debugger](https://developers.facebook.com/tools/debug/)
- [Twitter card validator](https://cards-dev.twitter.com/validator)

> **Note**: You could deploy the app to Render to test these tools. We
> will cover [Render deploys](/tutorial/deploy-to-render/) later in this
> tutorial.

</extrainfo>

## Favicon and app icons

There's also a second type of generic image assets: favicon and other
app icons:

```shell
└── public
    └── static
        └── icons
            ├── android-chrome-192x192.png
            ├── android-chrome-512x512.png
            ├── apple-touch-icon.png
            ├── browserconfig.xml
            ├── favicon-16x16.png
            ├── favicon-32x32.png
            ├── favicon.ico
            ├── map-marker-32x32.png
            ├── mstile-150x150.png
            └── safari-pinned-tab.svg

```

The default favicon of FTW-daily template, Saunatime, is a flame icon:

![Favicon for Saunatime](./saunatime-favicon.png)

To change it, we need to have favicon files - or if you have a square
logo available, you can follow
[this guide article](/ftw/how-to-change-ftw-icons/) to generate those
icons.

In the context of this tutorial, we just show how to change the
favicons. You can use these files:

- [favicon.ico](/tutorial-assets/favicon.ico)
- [favicon-16x16.png](/tutorial-assets/favicon-16x16.png)
- [favicon-32x32.png](/tutorial-assets/favicon-32x32.png)

Then go to _public/static/icons/_ directory and replace the current
_favicon\*_ files with the new ones. After those files have been saved,
you should see a new favicon in the browser's tab:

![Favicon for CottageDays](./cottagedays-favicon.png)

We also want to modify the landing page to use the cottage theme. We
will do that next.<br />
[› Go to the next article](/tutorial/modify-landing-page/)