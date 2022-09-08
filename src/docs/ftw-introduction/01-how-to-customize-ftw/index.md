---
title: How to Customize FTW
slug: how-to-customize-ftw
updated: 2021-10-19
category: ftw-introduction
ingress:
  So you've decided to build your own marketplace using Flex Template
  for Web (FTW). That's awesome! This guide will help you in setting up
  your fork and describes the general workflow.
published: true
---

## Create a marketplace environment

Flex Templates for Web (FTW) are marketplace web applications built on
top of the
[Marketplace API](/operator-guides/concepts/#marketplace-api). While you
can create a marketplace client application from scratch using just the
API, it requires a lot of effort and we recommend that you use a
template as a starting point for customizations.

To use the Marketplace API, you will need a client ID. You can obtain
one by creating a new Flex marketplace at
[the Sharetribe website](https://www.sharetribe.com/#start-building-with-flex).

## Setup

To start a new customization project, you should create a separate Git
repository and setup the Git remotes so that you can pull in changes
from the main (upstream) repository to your custom repository.

### Getting started with FTW template

If you are new to Sharetribe Flex or FTW, we recommend going through
couple of articles first:

- [Introducing Flex](/introduction/introducing-flex/)
- [What development skills are needed?](/introduction/development-skills/)
- [Getting started](/introduction/getting-started-with-ftw-daily/)

The [Tutorial introduction](/tutorial/introduction/#prerequisites) will
also walk you through creating a GitHub repository.

### Choose a template

[Tutorial](/tutorial/introduction/) goes through one of the FTW
templates (FTW-daily), but that's not the only one. Currently, you can
choose from three templates:

- [FTW-daily](https://github.com/sharetribe/ftw-daily) "Saunatime" - a
  rental marketplace with day-based bookings
- [FTW-hourly](https://github.com/sharetribe/ftw-hourly) "Yogatime" - a
  service marketplace with time-based bookings
- [FTW-product](https://github.com/sharetribe/ftw-product)
  "Sneakertime" - a product marketplace with stock management.

> **Note:** By default your Flex marketplace comes with day-based
> [transaction process](/concepts/transaction-process/). If you want to
> start working with FTW-hourly, you need to change to the
> [time-based process](https://github.com/sharetribe/flex-example-processes/tree/master/flex-hourly-default-process).
> See
> [getting started with Flex CLI](/introduction/getting-started-with-flex-cli/)
> for more information.

You should follow the [tutorial](/tutorial/introduction/) to set up
local development environment and connect it to GitHub.

### Pull in the latest upstream changes

If you want to update your local customization project with changes in
FTW, you should pull in changes from the upstream remote.

> **Note:** Depending on the changes you've made to the template, this
> might be hard/impossible depending on what has changed. You should
> mainly think of FTW as being the starting point of your customization,
> not something that is constantly updated as you make changes to it.

Run the following commands in a feature branch

1. Create a new feature branch and switch into that branch:

   ```shell
   git checkout -b updates-from-upstream
   ```

1. Fetch the latest changes from the upstream repository:

   ```shell
   git fetch upstream
   ```

1. Merge the changes to your local branch

   > FTW-daily and FTW-hourly still follow old Github convention to name
   > the default branch as **master** instead of **main**.

   ```shell
   git merge upstream/master
   ```

   FTW-product uses _main_ as main branch.

   ```shell
   git merge upstream/main
   ```

1. Fix possible merge conflicts, commit, and push/deploy.

See also the
[Syncing a fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork)
documentation.

## Installing dependecies

In your project root, install dependency libraries:

```shell
yarn install
```

## Configuration

There are some mandatory configuration, and some configuration that you
most likely want to at least go through.

To get started, run:

```shell
yarn run config
```

This command will create `.env` file and guide you trough setting up the
required environment variables.

```shell
└── .env
```

The `.env` file is the place to add your _local_ configuration. It is
ignored in Git, so you'll have to add the corresponding configuration
also to your server environment. Check this
[Render config setup](/tutorial/deploy-to-render/#deploy-to-render)
article - and there's also a generic article about
[deploying to production](/ftw/how-to-deploy-ftw-to-production/).

There are some mandatory configuration variables that are defined in the
template. See the
[FTW Environment configuration variables](/ftw/ftw-env/) reference for
more information.

See also the
[src/config.js](https://github.com/sharetribe/ftw-daily/blob/master/src/config.js)
file for more configuration options.

```shell
└── src
    └── config.js
```

<extrainfo title="FTW-product has config.js file in different location">

```shell
└── src
    └── config
        └── config.js
```

</extrainfo>

## Development

To develop the application and to see changes live, start the frontend
development server:

```shell
yarn run dev
```

<extrainfo title="Extra: troubleshooting">

**Known issues:**

- Adding/changing `import`s may not be synced properly with ESLint. You
  may see an error `Unable to resolve path to module` even though the
  module exists in the right path. Restarting the server doesn't help.
  To solve the issue, you need to make a change to the file where the
  error occurs.

</extrainfo>

#### Development with the actual Node.js server

The usual way to develop the application is to use the frontend
development server (see above). However, in production you likely want
to use the server-side rendering (SSR) setup. To develop against the
actual server locally, run:

```shell
yarn run dev-server
```

This runs the frontend production build and starts the Express.js server
in
[server/index.js](https://github.com/sharetribe/ftw-daily/blob/master/server/index.js).

```shell
└── server
    └── index.js
```

The server is automatically restarted when there are changes in the
[server/](https://github.com/sharetribe/ftw-daily/tree/master/server)
directory.

> **Note:** this server does **not** pick up changes in the frontend
> application code. For that you need to rebuild the client bundle by
> restarting the server manually.

## Tests

To start the test watcher, run

```shell
yarn test
```

For more information, see the [How to test FTW](/ftw/how-to-test-ftw/)
documentation.

## Customization

There are many things that you should change in the default template,
and many more that you can change. For more information, check the
[FTW customization checklist](/ftw/customization-checklist/)
documentation too before publishing your site. See also
[tutorial](/tutorial/introduction/) and other articles in _Flex
Templates for Web_ and _Cookbook_ categories.
