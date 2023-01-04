---
title: Legacy templates
slug: legacy-templates
updated: 2023-01-01
category: ftw-legacy
ingress:
  This article describes the Flex Templates for web that are deprecated
  on the release of the new Sharetribe Web Template.
published: true
---

## Deprecated templates

The Sharetribe Web Template replaces three separate templates that were
previously used for daily bookings
([ftw-daily](https://github.com/sharetribe/ftw-daily)), product
purchases ([ftw-product](https://github.com/sharetribe/ftw-product)),
and hourly bookings
([ftw-hourly](https://github.com/sharetribe/ftw-hourly)). The new
template combines the functionality of these three templates, allowing
you to configure it for either product bookings or hourly and daily
bookings by making simple changes to the configuration files.

If you are just beginning to develop a marketplace, we recommend that
you start with the Sharetribe Web Template. If you have already built
your marketplace on one of the legacy templates, you can still continue
use it with Sharetribe APIs and our support will continue to help you
with development related issues. In addition, you will always be able to
access the documentation for the legacy templates.

Read more about the new Sharetribe Web Template in the
[introduction article](/ftw/sharetribe-web-template/) and refer to the
legacy documentation here.

## Migrate to the Sharetribe Web Template

If you have already built a fully functional marketplace on top of one
of the deprecated templates, there is likely no need to migrate to the
new template. All templates, including the deprecated ftw-daily,
ftw-hourly and ftw-product and the new Sharetribe Web Template, are
meant to act as starting points for development. We will never introduce
breaking changes to our APIs, and all deprecated templates will remain
functional. Therefore, you should only consider migrating to the new
template if you have just started developing your marketplace or if your
existing marketplace has little to no custom features.

To view the changes introduced in the new template, you can review the
pull request for the update. This will give you a detailed look at the
specific changes and updates that have been made.
