---
title: What development skills are needed?
slug: development-skills
updated: 2019-11-21
category: introduction
ingress:
  Building a custom marketplace with Flex requires some software
  development skills. This article explains what you need to know when
  customizing the platform.
published: true
---

You can use any technology to build a marketplace on top of the
[Marketplace API](/introduction/introducing-flex/#the-marketplace-api).
However, making a marketplace user interface (UI) from scratch requires
a lot of effort. This is why we provide the Sharetribe Web Template. It
is a polished marketplace web application that is ready for
customization.

The Sharetribe Web Template is a template web application that uses the
Marketplace API. It is built using common and modern frontend tooling,
so frontend developers should feel right at home and happy with all the
technology.

## Technologies

Here are the main technologies the Sharetribe Web Template uses:

- JavaScript: the programming language for the whole application
- CSS: styling the user interface using
  [CSS Modules](https://github.com/css-modules/css-modules)
- [React](https://reactjs.org/): library for creating user interfaces
  with components
- [Redux](https://redux.js.org/): state and data flow handling
- [React Router](https://reactrouter.com/en/main): routing
- [Final Form](https://github.com/final-form/final-form): forms
- [Express](https://expressjs.com/): server side rendering of the React
  application
- [Node.js](https://nodejs.org/): development tooling and running the
  Express server

## Customization

Depending on what needs to be customized, the required skills might vary
a lot. Simple color and image changes require only basic development
skills, but familiarity with command line tooling is helpful. Many UI
changes can be done with pure CSS knowlege.

For anything more extensive than basic look-and-feel changes,
familiarity with JavaScript, React, and crafting UIs with components is
needed. Working knowledge of frontend web development and JavaScript is
a good starting point in learning the technologies.

Check out the
[Getting started with the Sharetribe Web Template](/introduction/getting-started-with-web-template/)
tutorial to see what it takes to get the template running with a small
customization.

## Development tooling

While the Sharetribe Web Template uses Webpack, PostCSS, and various
other tools behind the scene, knowledge of these technologies is not
needed in usual customizations. Compared to a usual frontend project
with a long list of dependencies and extensive Webpack configuration
files, Sharetribe Web Template hides all this behind a
[sharetribe-scripts](https://www.npmjs.com/package/sharetribe-scripts)
NPM package.

`sharetribe-scripts` is a fork of the `react-scripts` package in the
amazing [Create React App](https://github.com/facebook/create-react-app)
tool. We have added server side rendering and CSS modules, but otherwise
all the nice things from `create-react-app` are still there.

## Getting help

If you are unsure if something is possible or how to do a certain thing
with Flex, you can contact our support:
[flex-support@sharetribe.com](mailto:flex-support@sharetribe.com). If
you are not a developer or don't have access to one, we can also help
you.

For developers doing customizations, we have an active community in
Slack. You will get access to the channel when you get an account to
[Console](/operator-guides/concepts/#console).
