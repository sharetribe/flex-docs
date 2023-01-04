---
title: How to change the default favicons
slug: how-to-change-ftw-icons
updated: 2023-01-01
category: ftw-styling
ingress:
  This guide describes how to change the favicon and application icons
  in the Sharetribe Web Template.
published: true
---

The default icons are generated using
[RealFaviconGenerator](https://realfavicongenerator.net/). You can
upload your original icon to the tool, customize the colors and themes,
and download a generated set if icons and an HTML snippet to point to
those images.

## Generate new favicons

1.  Open https://realfavicongenerator.net/

2.  Upload your original icon image

3.  Configure platform specific icons

    **Note:** Remember to set the "Theme color" in the Android Chrome
    section

4.  Configure the paths to use `/static/icons/` as the root path of the
    icons

5.  Generate the icons

6.  Unzip the favicons.zip archive and replace the default icons and
    files in
    [public/static/icons/](https://github.com/sharetribe/flex-template-web/blob/master/public/static/icons/)
    with the new icons

7.  Replace the default HTML snippet in
    [public/index.html](https://github.com/sharetribe/flex-template-web/blob/master/public/index.html)
    with the snippet from the generator.

    **Note:** Remove the manifest link from the snippet as we have a
    default manifest with extra data compared to the generated one. You
    can edit the default file as you wish.

    **Example HTML snippet:**

    ```html
    <!-- Start Favicons from https://realfavicongenerator.net/ -->
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/static/icons/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/static/icons/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/static/icons/favicon-16x16.png"
    />
    <link
      rel="mask-icon"
      href="/static/icons/safari-pinned-tab.svg"
      color="#c0392b"
    />
    <link rel="shortcut icon" href="/static/icons/favicon.ico" />
    <meta
      name="msapplication-config"
      content="/static/icons/browserconfig.xml"
    />
    <meta name="theme-color" content="#c0392b" />
    <!-- End Favicons -->
    ```
