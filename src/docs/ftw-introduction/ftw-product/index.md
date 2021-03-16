---
title: FTW product
slug: ftw-product
updated: 2021-03-11
category: ftw-introduction
ingress:
  This article introduces FTW-product and what's different compared to
  FTW-daily and FTW-hourly.
published: true
---

FTW-product is a new Flex Template for Web. It's build with product
marketplaces in mind.

## Differences in directory structure

With this template, we decided to take more out of the possibilities
that code-splitting made possible. FTW-daily and FTW-hourly were created
before code-splitting was possible, and pushing most of the components
to a specific components directory (_src/components/_) made sense. It
was a clear place where customizers could start looking for a components
they wanted to customize. This setup also improved developer experience
a bit since it allowed us to use index file to export all those
components:

```js
import { Avatar, Button, Logo } from ‘../../components’;
```

The alternative is to import everything one-by-one, which can be a
pretty long list of imports.

```js
Import Avatar from ‘../../components/Avatar/Avatar.js’;
Import Button from ‘../../components/Button/Button.js’;
Import Logo from ‘../../components/Logo/Logo.js’;
```

Code-splitting changed the dynamics of this setup a bit. Everything that
is imported through a single file, is likely to end up into a main
code-chunk. That means that everything in that file is going to slow
down page rendering - when the page is fully loaded. That also affects
search engine optimization (SEO).

With FTW-product, we have decided to move certain page-specific files
under page-directories. Here are some of the relevant changes in the
directory structure:

- **src/config/**: Generic configuration files are moved to this
  directory
- **src/routing**: Route configuration and UI components related to
  routing are moved to this directory
- UI components that are only used in a single page or within a more
  complex component are nested within that page or component

TODO: add other notable changes here

## Differences in transaction process

## Managing stock

## Shipping the product

## Handling time zones
