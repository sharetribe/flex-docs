---
title: Introduction
slug: introduction
updated: 2023-09-25
category: tutorial
ingress:
  Over the course of the tutorial, you will learn how to build a
  marketplace using the Sharetribe Web Template
published: true
---

The goal of this tutorial is to help you customise your marketplace
using the Sharetribe Web Template. You will learn how to set up a custom
app for your marketplace, and how to start working on development using
the Sharetribe Web Template.

## What are we building?

In this tutorial, we will continue modifying your Biketribe marketplace
[that you configured in the first tutorial](https://www.sharetribe.com/help/en/articles/8418029-tutorial-introduction).
We will start editing the Sharetribe Web Template, and add custom
development features to Biketribe.

The first part of this tutorial focuses on installing the template,
copying no-code changes from Test to Dev, making minor changes to the
template styles, and deploying a development environment. The second
part dives deeper into modifying the listing creation process, and the
third part focuses on editing the transaction process.

## Background knowledge

The first part of the tutorial is accessible even if you are brand new
to web development. Parts two and three increase in difficulty, and it
helps to have some background in web development.

Before you start working on the tutorial, it's good to understand a few
key concepts (a general understanding of the fundamentals should
suffice, and you'll learn a lot throughout the tutorial).

- **The Sharetribe Web Template**: a template aimed as a starting point
  for developing your marketplace application on top of Sharetribe's
  APIs. The template provides you with a fully functional marketplace
  out of the box.

- **Custom marketplace app**: an instance of the Sharetribe Web Template
  that you host in the hosting environment of your choice (e.g. Heroku
  or Render), allowing you to customise and manage the code base freely.

- **Headless**: the marketplace client app is decoupled from the
  marketplace backend. The client communicates with the backend via API.
  You can manage configurations, assets and pages in Console, and your
  client can access them using the Asset Delivery API.

- **Marketplace environment**: There are three marketplace environments:
  Test, Development, and Live (you can find these in Console). You can
  use the development environment to develop and test your marketplace.
  In the no-code tutorial, you made your changes in your Test
  environment, and you can keep using it to preview your no-code
  changes. Your Live marketplace is home to your actual live
  marketplace.

- **Flex CLI**: A command line tool that you can use to change your
  marketplace's advanced configurations, such as transaction processes
  and email templates

## Before starting the tutorial

Before continuing to the first part of this technical tutorial, complete
the
[Getting Started Guide](/introduction/getting-started-with-web-template/).
This guide will walk you through installing the template and setting up
your local development environment.

We also recommend that you create a GitHub repository for your new
marketplace. Using a GitHub repository allows you to keep track of
changes made to your code over time, making it easier to revert to
previous versions or compare different versions of your code. It also
enables collaboration among multiple developers working on the same
project, and provides a backup of your code in the cloud.

To create a GitHub repository, you will need to:

1. Create a
   [Github repository](https://help.github.com/en/github/getting-started-with-github/create-a-repo).

   <info>

   Do not initialize the repo with anything. You are importing an
   existing repository.

   </info>

1. On the command line, check your remote repositories:

   ```shell
   git remote -v
   ```

   It should print this:

   ```shell
   origin  https://github.com/sharetribe/web-template.git (fetch)
   origin  https://github.com/sharetribe/web-template.git (push)
   ```

1. Rename the Sharetribe Web Template repository (current '_origin_') as
   '_upstream_'

   ```shell
   git remote rename origin upstream
   ```

   <extrainfo title="Check what your remote repositories should print at this point">

   Check your remote repositories:

   ```shell
   git remote -v
   ```

   It should print this:

   ```shell
   upstream  https://github.com/sharetribe/web-template.git (fetch)
   upstream  https://github.com/sharetribe/web-template.git (push)
   ```

   </extrainfo>

1. Add your newly created repository as '_origin_':

   ```shell
   git remote add origin https://github.com/<your-github-account>/<the-name-of-your-new-repo>.git
   ```

   <extrainfo title="Check what your remote repositories should print at this point">

   Check your remote repositories:

   ```shell
   git remote -v
   ```

   It should print something like this:

   ```shell
   origin  https://github.com/<your-github-account>/<the-name-of-your-new-repo>.git (fetch)
   origin  https://github.com/<your-github-account>/<the-name-of-your-new-repo>.git (push)
   upstream  https://github.com/sharetribe/web-template.git (fetch)
   upstream  https://github.com/sharetribe/web-template.git (push)
   ```

   </extrainfo>

1. Push an existing repository from the command line

   ```shell
   git push -u origin main
   ```

<info>

The examples above use HTTPS remote URLs instead of SSH remote
URLs.<br /> Read more about
[remote URLs](https://help.github.com/en/github/using-git/which-remote-url-should-i-use).

</info>

Now you are ready to make code changes and save them to Github!

The first part of this tutorial starts with copying your no-code changes
from Test to Dev.<br />
[› Go to the next article](/tutorial/copy-assets/)
