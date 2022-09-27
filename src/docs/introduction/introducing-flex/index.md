---
title: Introducing Flex
slug: introducing-flex
updated: 2019-11-21
category: introduction
ingress:
  Overview of how Sharetribe Flex works, and how you can build your
  online marketplace platform using it.
published: true
---

## Introduction

Sharetribe Flex is a complete solution for building a powerful online
marketplace for rentals, services, events or experiences. Flex provides
you with all the necessary marketplace infrastructure out of the box. At
the same time, because of its headless architecture, Flex gives you
total freedom to customize your user experience.

This makes Flex the fastest and most affordable way to build a unique
platform that adapts to the entire lifecycle of your business. As your
business grows, Flex takes care of running and scaling your backend —
allowing you to focus on the unique value of your platform.

## Flex Components

![Flex customer architecture](./flex-customer-architecture.png)

### Your marketplace UI

Your marketplace user interface (UI), also known as the "front end", is
what your users see and interact with. They use the UI to sign up to
your platform as well as to post, find, book, and pay for listings.
Whether a web-based UI, a mobile application, or both, the user
interface is the face of your solution. That's why you have total
control over it.

You can decide fully things like which fonts and colors to use in your
user interface, what kind of pages or views there should be, and how
those should be laid out. There are no limits to what you can do in
terms of visual design.

[Flex Templates for Web](/introduction/getting-started-with-ftw-daily/)
(FTW) are web templates that implement a full-feature marketplace
experiences powered by Flex. You can choose between three templates:

- [FTW-daily](https://github.com/sharetribe/ftw-daily): a rental
  marketplace with daily bookings
- [FTW-hourly](https://github.com/sharetribe/ftw-hourly): a service
  marketplace with time-based bookings
- [FTW-product](https://github.com/sharetribe/ftw-product): a product
  marketplace with stock management

With a Flex Template for Web, you can get started with your marketplace
UI straight away: just download the latest FTW version and start
customizing it for your marketplace. There are no limits to how much you
can customize the template. You can freely design the user interactions
and alter the look and feel of your marketplace. You can also integrate
any web analytics or customer service solutions directly into your UI.

Your users won't see Sharetribe mentioned anywhere. The web address is
your own domain, the email notifications get sent from your email
address, and the entire user experience is fully tailored to match your
brand.

If you prefer to start from scratch, you can build your own UI on top of
Flex's Marketplace API yourself. For instance, if you want to build a
mobile application for your marketplace, you will need to build a fully
custom user interface. You can also have several UI applications for the
same marketplace, so the user can manage their listings and transactions
on a native mobile app as well as on the web.

### The Marketplace API

The Marketplace API is how your UI connects to the Flex services. It's
an HTTP interface with a design influenced by the
[JSON API specification](https://jsonapi.org/) and the
[CQRS pattern](https://martinfowler.com/bliki/CQRS.html). The
Marketplace API allows you to implement all the standard marketplace
functionality that Flex supports.

Sharetribe handles running and scaling the Marketplace API. To take full
advantage of this, you should design your Marketplace UI to point a
majority of the traffic directly to the Marketplace API. For example,
Flex Template for Web only handles the initial page load when a user
opens their browser. After that, FTW lets the client application
(Single-page application) talk directly with the Marketplace API, and
the API powers all further interactions.

To learn more about the capabilities of the Marketplace API and Flex,
visit the [API reference documentation](/concepts/api/).

### Flex JavaScript SDK

[The Flex JavaScript SDK](/concepts/js-sdk/) is a small JavaScript
library that helps you with integrating the Marketplace API. It handles
tasks like authentication and session management and makes it easy to
use correct data types with the API. Using the Flex JS SDK is not
required, but if you are working with JavaScript, we strongly encourage
you to have a look.

### Console

[Console](https://flex-console.sharetribe.com/) is where you to manage
all your marketplace data, such as users, listings and transactions.
Console also offers tools to develop your marketplace, for example, an
editor for email templates. Console is accessed via a web UI that we
provide out of the box. Think of it as an admin interface you never have
to build!

### Flex CLI

Flex CLI (Command-line interface) is a tool for changing your
marketplace's advanced configurations such as transaction processes and
email templates.

See the
[Getting started with Flex CLI](/introduction/getting-started-with-flex-cli/)
tutorial for more information.

## Is Flex the right fit for you?

Now you know roughly what Flex is all about. Next, it's time to evaluate
[whether Flex is the right fit for your specific marketplace idea](/introduction/is-flex-right-for-you/).
