---
title: How to Customize FTW
slug: how-to-customize-ftw
updated: 2019-11-21
category: guides
ingress:
  So you've decided to build your own marketplace using Flex Template
  for Web (FTW). That's awesome! This guide will help you in setting up
  your fork and describes the general workflow.
published: true
---

**Note:** If you cloned the repository like described in the
[Getting started with FTW](/tutorials/getting-started-with-ftw/)
tutorial, you probably don't want to make the customizations in that
project. Forking the repository is the recommended way to proceed.
Follow this guide for instructions.

## Getting started

If you are new to Sharetribe Flex or FTW, we recommend going through the
[Getting started](/background/getting-started/) articles:

- [Introducing Flex](/background/introducing-flex/)
- [What development skills are needed?](/background/development-skills/)
- [Getting started with FTW](/tutorials/getting-started-with-ftw/)

## Requirements

Install required tools:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

## Setup

To start a new customization project, you should create a separate Git
repository and setup the Git remotes so that you can pull in changes
from the main (upstream) repository to your custom repository.

### Fork the repository

See the [Fork a repo](https://help.github.com/en/articles/fork-a-repo)
documentation for instructions for forking a repository in GitHub.

Currently you can choose from two templates:

- [FTW-daily](https://github.com/sharetribe/ftw-daily) "Saunatime" - a
  rental marketplace with day-based bookings
- [FTW-hourly](https://github.com/sharetribe/ftw-hourly) "Yogatime" - a
  service marketplace with time-based bookings

> **Note:** By default your Flex marketplace comes with day-based
> [transaction process](https://www.sharetribe.com/docs/background/transaction-process/).
> If you want to start working with FTW-hourly, you need to change to
> the time-based process. See
> [getting started with Flex CLI](https://www.sharetribe.com/docs/tutorials/getting-started-with-flex-cli/)
> for more information.

In the directory you want to create the project in:

```bash
# clone your fork
git clone git@github.com:YOUR_USERNAME/YOUR_FORK.git

# change to the cloned directory
cd YOUR_FORK

# add FTW repository as the upstream remote
git remote add upstream git@github.com:sharetribe/ftw-daily.git
```

See also the
[Configuring a remote for a fork](https://help.github.com/en/articles/configuring-a-remote-for-a-fork)
documentation.

### Pull in latest upstream changes

If you want to update your local customization project with changes in
FTW, you should pull in changes from the upstream remote.

**Note:** Depending on the changes you've made to the template, this
might be hard/impossible depending on what has changed. You should
mainly think of FTW as being the starting point of your customization,
not something that is constantly updated as you make changes to it.

In the `master` branch (or in the branch you want to merge in the
upstream changes):

1.  Fetch the latest changes from the upstream repository:

    ```bash
    git fetch upstream
    ```

1.  Merge the changes to your local branch

    ```bash
    git merge upstream/master
    ```

1.  Fix possible merge conflicts, commit, and push/deploy.

See also the
[Syncing a fork](https://help.github.com/en/articles/syncing-a-fork)
documentation.

## Installing dependecies

In your project root, install dependencies:

```bash
yarn install
```

## Configuration

There are some mandatory configuration, and some configuration that you
most likely want to at least go through.

To get started, run:

```bash
yarn run config
```

This command will create `.env` file and guide you trough setting up the
required environment variables. The `.env` file is the place to add your
local configuration. It is ignored in Git, so you'll have to add the
corresponding configuration also to your server environment.

There are some mandatory configuration variables that are defined in the
template. See the
[FTW Environment configuration variables](/references/ftw-env/)
reference for more information.

See also the
[src/config.js](https://github.com/sharetribe/ftw-daily/blob/master/src/config.js)
file for more configuration options.

## Development

To develop the application and to see changes live, start the frontend
development server:

```bash
yarn run dev
```

**Known issues:**

- Adding/changing `import`s may not be synced properly with ESLint. You
  may see an error `Unable to resolve path to module` even though the
  module existing in right path. Restarting the server doesn't help. To
  solve the issue, you need to make a change to the file where the error
  occurs.

## Development Server

The usual way to develop the application is to use the frontend
development server (see above). However, in production you likely want
to use the server rendering setup. To develop the server rendering setup
locally, run:

```bash
yarn run dev-server
```

This runs the frontend production build and starts the Express.js server
in
[server/index.js](https://github.com/sharetribe/ftw-daily/blob/master/server/index.js)
that renders the application routes in the server. The server is
automatically restarted when there are changes in the
[server/](https://github.com/sharetribe/ftw-daily/tree/master/server)
directory.

**Note:** this server does **not** pick up changes in the frontend
application code. For that you need to build the client bundle by
restarting the server manually.

## Tests

To start the test watcher, run

```bash
yarn test
```

For more information, see the
[How to test FTW](/guides/how-to-test-ftw/) documentation.

## Customization

There are many things that you should change in the default template,
and many more that you can change. For more information, check the
[FTW customization checklist](/guides/ftw-customization-checklist/)
documentation too before publishing your site. See also
[all our guides](/guides/) for instructions for specific customizations.
