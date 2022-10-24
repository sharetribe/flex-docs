---
title: FTW legacy templates
slug: ftw-legacy
updated: 2022-10-30
category: ftw-legacy
ingress:
  This article describes the legacy templates deprecated on the release
  of the new FTW combined template.
published: true
---

Deprecated from src/docs/tutorial-branding/first-edit/index.md
<extrainfo title="I have a propertySets.css file. What is that?">

```shell
└── src
    └── styles
        └── propertySets.css
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

The first one (_IconLogo_) doesn't have a file extension, which means
that it's referring to **IconLogo.js** file. If you open it, you see
that it contains Scalable Vector Graphics (SVG) content inside React
component.

The other import (_LogoImage_) is referring to a normal PNG image.

_IconLogo_ is used for mobile layout and PNG is for desktop layout.
There's no real reason behind this double format setup - it is just
there to show 2 different ways to create graphics. Although, the SVG
format is a bit better choice for logo since it stays sharp when scaled
bigger.
