---
title: Sharetribe Web Template
slug: sharetribe-web-template
updated: 2023-10-24
category: template-introduction
ingress:
  This article introduces the Sharetribe Web Template and links to
  relevant resources.
published: true
---

## Introduction

[The Sharetribe Web Template](https://github.com/sharetribe/web-template)
is a React template meant to function as a starting point for the
development of your marketplace. It supports all the features available
through the Sharetribe APIs, and is easily customized. For a complete
list of features that are possible in the template, either natively or
with custom development, see the
[features article](/operator-guides/features/).

We recommend you be familiar with React, Redux and CSS Modules before
you start working on the template. Read more about
[what development skills are needed](/introduction/development-skills/)
and
[how to install and run the template locally](/introduction/getting-started-with-web-template/).

Access the
[GitHub repository for the template here](https://github.com/sharetribe/web-template).

## Technical overview

The Sharetribe Web Template is a React application built on top of a
forked version of
[Create React App (CRA)](https://create-react-app.dev/). The modified
version of CRA adds support for server-side rendering (SSR) and CSS
modules. The template also includes a Node.js server, which enables SSR
and other essential features which require communicating with the
Sharetribe APIs without allowing the client to modify the requests.

The included Node.js server enables server-side rendering, which helps
to improve search engine optimization and speed up the application's
rendering. You should consider this requirement when choosing a hosting
provider for your marketplace project. Serverless hosting platforms are
not compatible with the template, as they are not equipped to run a
server. You need to use a hosting provider that supports running a
Node.js/Express.js server to run the Sharetribe Web Template without any
issues.

For a complete overview of the technologies used in the template, read
more in the
[development skills article](/introduction/development-skills/).

## Working with the template

- Familiarize yourself with the tech stack: make sure you have a good
  understanding of the technologies and libraries that the template is
  built on, including React, Redux, and CSS Modules.

- Read the documentation: the template is well-documented, and reading
  the documentation can be a helpful way to learn more about how the
  template works and how to customize it. A good place to start is the
  [tutorial](/tutorial/introduction/).

- Start with the [configuration variables](/template/configuration/):
  the template includes a number of configuration variables that can be
  used to make quick and easy changes to the layout, branding, and
  functionality of the template. Experiment with these variables to see
  what kind of changes you can make.

- Customize the code as needed: the template is designed to be
  customizable, and you can make any desired changes to the code. There
  are no limits to how far you can customize the template. See our
  [catalog of how-to articles](/how-to/) or the
  [customization checklist](/template/customization-checklist/) for
  advice and inspiration.

## Key differences from legacy templates

Before the release of the Sharetribe Web Template, Sharetribe provided
and maintained three different templates: **ftw-daily**, **ftw-hourly**
and **ftw-product**. The Sharetribe Web Template combines the features
of the previous templates into one template and allows developers to
enable features from each using configuration variables. If you are
looking for documentation or information regarding the legacy templates,
see the [legacy templates article](/template/legacy-templates/).

The new template introduces many changes. Here is a list that details
the most important of them:

- [Configurations](/template/configuration/) allow you to make a variety
  of changes without touching code. You can toggle between different
  layouts, change search options, add new extended data fields, and much
  more.
- Handling extended data is significantly easier and can be done through
  a configuration file. For example, you can add a new extended data
  field in the configuration file, and it will render a corresponding
  input field on the listing creation page.
- Transaction process handling is fundamentally different. Introducing
  new transaction processes is more straightforward, and some of the
  work can be done through the transaction configuration file. Read more
  about how adding new transaction processes works in
  [this article](/how-to/change-transaction-process-in-template/).
- StateData.js files are responsible for handling transaction state
  data. Read more
  [about StateData](/how-to/change-transaction-process-in-template/#3-update-state-data-for-inbox-page-and-transaction-page).
