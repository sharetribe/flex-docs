---
title: Tutorial introduction
slug: introduction
updated: 2019-03-25
category: tutorial
ingress:
  This guide is designed to help you get started with customizing the
  FTW-daily template.
published: true
---

## What are we building?

In this tutorial, we start to customize FTW-daily template and turn it
into a cottage-rental marketplace called CottageDays.

The first part of this tutorial is about branding the template. However,
we will add new articles later about features that go beyond FTW-daily
template and its default behaviour.

**Part 1: Branding**<br /> Learn to make changes that are necessary to
turn Saunatime marketplace to CottageDays marketplace. At the end of
this part, we deploy CottageDays marketplace to Heroku.

**Part 2: Extend the data model**<br /> Learn how to extend listing
entity with marketplace specific data. Then we show the new info on
listing page and we also add a search filter for it.

**Part 3: Modifying the transaction process**<br /> Here, we start by
showing how to customize the pricing. Then the rest of the articles are
more focused on making modifications to the transaction process and
email notifications.

## Prerequisites

FTW-daily is created on top of [React](https://reactjs.org/),
[Redux](https://redux.js.org/), and styles are creted with
[CSS Modules](https://github.com/css-modules/css-modules). You should be
familiar with those libraries.

You should also have completed the
[Getting started guide](/introduction-getting-started/getting-started-with-ftw-daily/)
and as a result, you have the FTW-daily repository cloned to your local
development environment and the app is available in
http://localhost:3000.

After that you could set up a Github repository for code changes. You
could either
_[Fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository)
the FTW-daily repository_ or
_[create your own Github repository](https://help.github.com/en/github/getting-started-with-github/create-a-repo)_
and push your locally cloned Git repository there.

Even though the first option is easier (i.e. just click the "fork"
button in FTW-daily Github repo), the latter is the recommended approach
for the actual customization work. Here's a rough guide on how to set it
up:

1. Create a
   [Github repository](https://help.github.com/en/github/getting-started-with-github/create-a-repo).

   > **Note**: do not initialize the repo with anything. You are
   > importing an existing repository.

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

1. Rename your local default branch as **main**

   If you have cloned _FTW-daily_ or _FTW-hourly_ repository, the
   default branch is following an old Github naming pattern.

   ```shell
   git checkout master
   git branch -m master main
   ```

   _FTW-product_ uses the new naming pattern - you just need to checkout
   the correct branch.

   ```shell
   git checkout main
   ```

1) Push an existing repository from the command line

   ```shell
   git push -u origin main
   ```

   <extrainfo title="What's the difference between master and main?">

   [Git](https://git-scm.com/about) is one of the most popular version
   control systems. It creates a tree structure where each **commit**
   (of code changes) creates a new node in that tree. The default branch
   (trunk) has been traditionally called as **master**, but
   [Github](https://github.com/about) has moved away from that naming
   convention and has started to call the default branch as **main**.

   FTW-daily and FTW-hourly have been created long time before that
   naming convention changed, so they still use **master** as the name
   of the default branch. However, Github is pushing the new naming
   convention into use throughout their service and it's better if new
   repositories follow that naming pattern.

   </extrainfo>

> **Note**: the examples above, used HTTPS remote URLs instead of SSH
> remote URLs.<br /> Read more about
> [remote URLs](https://help.github.com/en/github/using-git/which-remote-url-should-i-use).

Now you are ready to make code changes and save those to Github!

The first part of this tutorial starts with changing the marketplace
color.<br /> [› Go to the next article](/tutorial-branding/first-edit/)
