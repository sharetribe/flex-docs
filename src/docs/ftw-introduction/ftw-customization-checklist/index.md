---
title: Customization checklist
slug: customization-checklist
updated: 2023-01-01
category: ftw-introduction
ingress:
  This article provides a reference list of common customisations to aid
  you in development.
published: true
---

The Sharetribe Web Template provides a great starting point for
developing your marketplace. This article provides a reference list of
articles and guides you can use when you start customising your
marketplace's visual appearance, content and configurations.

## Visual appearance

The Sharetribe Web Template is styled as a fictional marketplace for
bicycles. To customize the default styles of the template to match your
marketplace’s brand and style, follow these steps:

- Apply your branding by
  [changing the default images and marketplace colours](/tutorial/first-edit/)
- Change the
  [default background image and social media images](/tutorial/change-images/)
- [Change the logo](/tutorial/change-logo/)
- [Generate a new favicon](/ftw/how-to-change-ftw-icons/)
- Learn more about the
  [CSS architecture in the Sharetribe Web Template](/ftw/how-to-customize-ftw-styles/)

## Content and microcopy

In addition to customizing the default styles of your marketplace, it is
also important to change the content and
[microcopy](/concepts/microcopy/) to reflect your brand and messaging.
There are several places where you can edit the content and copy texts
in your marketplace:

- Learn about [what is microcopy](/concepts/microcopy/)
- [Change the content and microcopy in your marketplace](/tutorial/working-with-microcopy/)
- Update your
  [terms of service and privacy policy page](/operator-guides/free-templates/)
- Update the footer: the
  [footer](https://github.com/sharetribe/web-template/blob/master/src/components/Footer/Footer.js)
  of your marketplace contain links and copy that will need to be
  updated.
- Update the
  [email templates](https://www.sharetribe.com/docs/concepts/email-notifications/):
  you will want to update the templates to reflect your brand and
  messaging.

## Configuration

The configuration file of your marketplace template is a valuable
resource that allows you to easily adjust a wide range of options in
your marketplace. Configuration files can be found in the
[src/config directory](https://github.com/sharetribe/web-template/tree/main/src/config).
Before you begin modifying the configuration files, it is important to
ensure that you have properly configured any environment variables that
your marketplace uses. These variables are typically used to store
sensitive information such as API keys, and must be set up correctly in
order for your marketplace to function properly.

- Configure your [environment variables](/ftw/ftw-env/). You can also
  run `yarn run config` in the root directory of the template, which
  will walk you through the setup process.
- Go through the configuration files of your marketplace following this
  guide

## Other optional changes

In addition to customizing the default styles, content and copy texts,
and configuration options of your marketplace, there are a number of
other changes you may want to make. Some of these options include:

- [Customize pricing](/tutorial/customize-pricing-tutorial/)
- Update your transaction process
- Create new static pages
- Update the routing in your marketplace
- Update
  [listing extended data](/tutorial/modify-listing-extended-data/)
- Update transaction email templates. For more information, see
  [Edit email templates with Flex CLI](/how-to/edit-email-templates-with-flex-cli/)
  tutorial and [Email templates](/references/email-templates/) reference
  article.
- Add more content pages:
  [How the templates render content pages using the PageBuilder](/ftw/page-builder/)
- Update other existing pages
