---
title: Introduction
slug: introduction
updated: 2019-01-28
category: tutorial
ingress: This guide describes how to customize the FTW-daily template.
published: true
---

## What Are We Building?

In this tutorial, we start to customize FTW-daily template and turn it
into a cottage-rental marketplace called CottageDays.

There will be two major parts in this tutorial:

**Part 1: branding**<br /> Learn to make changes that are necessary turn
Saunatime marketplace to CottageDays marketplace. At the end of this
part, we deploy CottageDays marketplace to Heroku.

**Part 2: beyond FTW-daily template**<br /> Part 2 goes beyond initial
features of FTW-daily repository. You learn how to extend listing
entities with your own data, modify email templates and modify the
transaction process.

> **Note**: Part 2 is not yet ready.

## Prerequisites

You should have completed the
[Getting started guide](/introduction/getting-started-with-ftw-daily/)
and as a result, you should have cloned the FTW-daily repository to your
local development environment and have the app available in
http://localhost:3000.

Then you should set up Github repository for code changes. You could
either
_[Fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository)
the FTW-daily repository_ or
_[create your own Github repository](https://help.github.com/en/github/getting-started-with-github/create-a-repo)_
and push your local Git repository there.

Even though the first option is easier (just click the "fork" button in
FTW-daily Github repo), the latter is the recommended approach for the
actual customization work. Here's a rough guide on how to set it up:

1. Create a
   [Github repository](https://help.github.com/en/github/getting-started-with-github/create-a-repo).

1. On the command line, check your remote repositories:

   ```shell
   git remote -v
   ```

   It should print this:

   ```shell
   origin  https://github.com/sharetribe/ftw-daily.git (fetch)
   origin  https://github.com/sharetribe/ftw-daily.git (push)
   ```

1. Rename the FTW-daily repository (current '_origin_') as '_upstream_'

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
   upstream  https://github.com/sharetribe/ftw-daily.git (fetch)
   upstream  https://github.com/sharetribe/ftw-daily.git (push)
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
   upstream  https://github.com/sharetribe/ftw-daily.git (fetch)
   upstream  https://github.com/sharetribe/ftw-daily.git (push)
   ```

   </extrainfo>

1. Push an existing repository from the command line

   ```shell
   git push -u origin master
   ```

> **Note**: the examples above, used HTTPS remote URLs instead of SSH
> remote URLs.<br /> Read more about
> [remote URLs](https://help.github.com/en/github/using-git/which-remote-url-should-i-use).

Now you are ready to make code changes and save those to Github!
