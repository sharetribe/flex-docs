---
title: JavaScript SDKs
slug: js-sdk
updated: 2023-10-24
category: concepts-api-sdk
ingress: Information on our SDKs and where to find our SDK documentation
published: true
---

## Documentation

Find our SDK documentation here:

- [Sharetribe SDK for JavaScript Documentation](https://sharetribe.github.io/flex-sdk-js/)
- [Sharetribe Integration SDK for JavaScript Documentation](https://sharetribe.github.io/flex-integration-sdk-js/)

## Features

The SDKs are the easiest way to interact with Sharetribe Marketplace API
and the Sharetribe Integration API.

They handle authentication, renewing authentication tokens and
serializing and deserializing data to and from JavaScript data
structures. Using the SDKs allows you to focus on building your
marketplace front-end instead of implementing boilerplate to communicate
with the API.

The main SDK features are:

- Promise-based asynchronous API.
- Universal: Runs in any JavaScript environment, including Node.js,
  browser and React Native (experimental).
- Predictable mapping from SDK methods to API endpoints.
- Types to represent UUID, money, geolocation, etc. with automatic
  serialization and deserialization.
- Easy authentication.

## Sharetribe SDK for JavaScript

The Marketplace API is meant to handle all the interactions the end
users of your marketplace take part in e.g. signing up, managing
listings and transactions. You should be using the Marketplace API when
building your marketplace UI, such as a web client or a mobile app.

The Marketplace API only provides data that an individual user should
have access to; this means that the API doesn’t allow access to other
users’ private data, transactions or messages. The SDK provides a
convenient way to access the Marketplace API endpoints without needing
to configure custom API calls.

You can access all the JS SDK documentation at:

https://sharetribe.github.io/flex-sdk-js/

## Sharetribe Integration SDK for JavaScript

In contrast to the Marketplace API, the Integration API reveals the
entire marketplace data. The Integration API is meant for trusted secure
applications to access. You might be running such an application in your
own backend systems or as a 3rd party integration. The Integration API
is well suited for integrations with your own or 3rd party systems,
custom reporting and custom tooling for operators managing the
marketplace.

<plan tier="extend" feature="Access to Integration SDK"></plan>

You can access all the JS SDK documentation at:

https://sharetribe.github.io/flex-integration-sdk-js/
