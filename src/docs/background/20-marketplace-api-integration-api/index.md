---
title: Flex Marketplace API and Integration API
slug: marketplace-api-integration-api
updated: 2019-11-27
category: background
ingress:
  Description of the different Flex APIs and how to choose which one to use
published: true
---

## Introduction

Flex provides two different main APIs for interacting with the marketplace and
accessing its data: the *Marketplace API* and the *Integration API*. In
addition, Flex has also the *Authentication API*, which is used to authenticate
and obtain access credentials that are needed to access both the Marketplace API
and the Integration API.

## When to use the Marketplace API

The Marketplace API enables all the core interactions that the end users of the
marketplace participate in. These include signing up as a new user, managing
listings, engaging in transactions, messaging, etc. The Marketplace API is best
suited for building user-facing marketplace UI applications, like the
marketplace's web site or mobile apps.

With the Marketplace API, the authenticated party is always the end user and all
API calls are made in the name of that authenticated user (with the exception of
anonymous public access). Therefore, the Marketplace API allows access to the
individual user's own data and any publicly available data. This allows the
Marketplace API to be directly called from a user-controlled device or web
browser, which is the case if you are using one of the open source [template
applications](/background/concepts/#flex-templates-for-web-ftw) provided by
Sharetribe.

The Marketplace API does not provide access to any data that an individual user
should not access, such as other users' private data, transactions, or messages.

The easiest way to access the Marketplace API is to use the [Flex SDK for
JavaScript](/references/js-sdk/#flex-sdk-for-javascript). See also the
[Marketplace API reference
documentation](https://www.sharetribe.com/api-reference/marketplace.html).

## When to use the Integration API

The Integration API allows trusted secure applications to access the entire
marketplace data: all users, listings, transactions, messages, etc. Such trusted
applications are for example applications that run in your own backend systems
or applications meant to be executed by authorized marketplace operators.

> **IMPORTANT** Never expose your Integration API
> [application](/background/applications/) credentials to an untrusted device or
> application, such as end user's browser or mobile app.

The Integration API is well suited for building the following types of
applications:

* Integrations with other own or 3rd party systems, which can be stand-alone or
  work in combination with the end-user facing marketplace application and
  provide advanced features
* Custom reporting
* Custom tooling for operators managing the marketplace

The easiest way to access the Integration API is to use the [Flex Integration
SDK for JavaScript](/references/js-sdk/#flex-integration-sdk-for-javascript).
See also the [Integration API reference
documentation](https://www.sharetribe.com/api-reference/integration.html).

> **NOTE** At present, the Integration API provides API endpoints only for
> reading data. In the future, new capabilities will be added to the API that
> enable applications to create or update resources as well.

## Authentication

Both the Marketplace API and the Integration API require valid *access tokens*
to be passed in every API request. Applications obtain those access tokens from
the Authentication API.

As a general rule, applications that access the Marketplace API do so by
authenticating an end user of the marketplace (via the user' username and
password), while Integration API applications authenticate using their own
credentials.

For more details see the [Authentication API](/background/authentication-api/)
article and the [API reference
documentation](https://www.sharetribe.com/api-reference/authentication.html).
