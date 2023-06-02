---
title: Customizing the template
slug: how-to-customize-ftw
updated: 2023-01-01
category: ftw-introduction
ingress:
  This article helps you set up the development environment and outlines
  the best practices you should follow while developing on the
  Sharetribe Web Template.
published: true
---

## Prerequisites

When you start a new project, you should create a new Git repository for
your project and add the template repository as a remote repository.
That allows you to update your code with the latest changes from the
upstream repository. See how to set up a remote repository in the
[tutorial](/tutorial/introduction/#prerequisites).

### Create a marketplace environment

The Sharetribe Web Template is a React application built on top of the
[Marketplace API](/operator-guides/concepts/#marketplace-api). While you
can create a marketplace client application from scratch using just the
API, it requires a lot of effort and we recommend that you use a
template as a starting point for customizations.

To use the Marketplace API, you will need a client ID. You can obtain
one by creating a new Flex marketplace at
[the Sharetribe website](https://www.sharetribe.com/#start-building-with-flex).

### Check that you have the correct transaction processes in your environment

If you have created your marketplace environment prior to the 25th of
April 2023, and you are using the Sharetribe Web Template, it is good to
note that there are two new transaction processes the template uses, and
those processes may not be in your Flex marketplace by default. You can
find the transaction processes in
[/ext/transaction-processes/](https://github.com/sharetribe/web-template/tree/main/ext/transaction-processes)
in the repository.

To use the template, you will need to have the transaction processes in
your Flex environment.
[Follow these steps](https://github.com/sharetribe/web-template#take-the-new-beta-processes-into-use)
to create both processes in your environment through Flex CLI.

### Getting started with the template

If you are new to Sharetribe Flex or the Sharetribe Web Template, we
recommend reading these articles before starting to work on development:

- [Introducing Flex](/introduction/introducing-flex/)
- [What development skills are needed?](/introduction/development-skills/)
- [Getting started](/introduction/getting-started-with-web-template/)

The [tutorial introduction](/tutorial/introduction/#prerequisites) will
also walk you through creating a GitHub repository.

## Pull in the latest upstream changes

To update your project with the newest changes from the remote
repository, you need to pull these changes from the upstream remote.

<info>

Pulling the newest changes from the upstream remote might be hard or
impossible, depending on the extent of the changes you have made to the
template. The template is a starting point for development rather than
something that you should regularly update.

</info>

You should follow the [tutorial](/tutorial/introduction/) to set up a
local development environment and connect it to GitHub.

Run the following commands in a new branch.

1. Create a new branch and switch into that branch:

   ```shell
   git checkout -b updates-from-upstream
   ```

2. Fetch the latest changes from the upstream repository:

   ```shell
   git fetch upstream
   ```

3. Merge the changes to your local branch

   ```shell
   git merge upstream/main
   ```

4. Fix possible merge conflicts, commit, and push/deploy.

If you have forked the repository instead of setting a remote, see how
to
[sync a fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork).

## Installing dependecies

In your project root, install dependency libraries:

```shell
yarn install
```

## Configuring environment variables

You need to configure some environment variables before deploying or
running the template locally. You can simply run the following command
in the root of your project directory:

```shell
yarn run config
```

This command will create `.env` file and guide you trough setting up the
required environment variables.

```shell
└── .env
```

The `.env` file is the place to add your _local_ configuration. It is
ignored by Git, so you will have to add the corresponding configuration
also to your server environment. When deploying the template to Render
or Heroku, you need to configure the environment variables in the
hosting platform. See our article on deploying the template to
[Render](/tutorial/deploy-to-render/#deploy-to-render) for more
information.

See the full list of [environment variables](/ftw/ftw-env/) for more
information.

For in-app configurations, see the
[src/config directory](https://github.com/sharetribe/web-template/tree/main/src/config).

```shell
└── src
    └── config
```

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
[server/index.js](https://github.com/sharetribe/web-template/blob/main/server/index.js).

```shell
└── server
    └── index.js
```

The server is automatically restarted when changes are detected in the
[server](https://github.com/sharetribe/web-template/blob/main/server/)
directory.

<info>

This server does **not** detect changes in the frontend application
code. For that you need to rebuild the client bundle by restarting the
server manually.

</info>

## Tests

To start the test watcher, run

```shell
yarn test
```

For more information on tests, see the documentation on
[how to test the template](/ftw/how-to-test-ftw/).

## Further reading

There are many things that you should change in the default template and
many more that you can change. For more information, check the
[template customization checklist](/ftw/customization-checklist/)
documentation before publishing your site. Also see the
[tutorial](/tutorial/introduction/) and other articles in the
[Sharetribe Web Template](/ftw/) and [How-to](/how-to/) categories.
