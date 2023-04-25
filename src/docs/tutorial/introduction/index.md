---
title: Tutorial introduction
slug: introduction
updated: 2019-03-25
category: tutorial
ingress:
  This guide is designed to help you get started with customizing the
  Sharetribe Web Template.
published: true
---

## What are we building?

In this tutorial, we start to customize the Sharetribe Web Template and
turn it into a cottage rental marketplace called CottageDays.

The first part of this tutorial is about branding the template. The
second part dives deeper into modifying the transaction process
behavior.

**Part 1: Branding and customizing listings**<br /> Learn to make
changes that are necessary to turn a Biketribe marketplace into a
CottageDays marketplace. At the end of this part, we deploy CottageDays
marketplace to Render.

**Part 2: Modifying the transaction process**<br /> Here, we start by
showing how to customize the pricing. Then the rest of the articles are
more focused on making modifications to the transaction process and
email notifications.

## Prerequisites

Sharetribe Web Template is created on top of
[React](https://reactjs.org/), [Redux](https://redux.js.org/), and
styles are created with
[CSS Modules](https://github.com/css-modules/css-modules). You should be
familiar with those libraries.

You should also have completed the
[Getting started guide](/introduction/getting-started-with-web-template/)
and as a result, you have the Sharetribe Web Template repository cloned
to your local development environment and the app is available in
http://localhost:3000.

After that you could set up a Github repository for code changes. You
could either

- _[fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository)
  the FTW-daily repository_ or
- _[create your own Github repository](https://help.github.com/en/github/getting-started-with-github/create-a-repo)_
  and push your locally cloned Git repository there.

Even though the first option is easier (i.e. just click the "fork"
button in Sharetribe Web Template Github repo), the latter is the
recommended approach for the actual customization work. Here's a rough
guide on how to set it up:

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

The first part of this tutorial starts with changing the marketplace
color.<br /> [› Go to the next article](/tutorial/first-edit/)
