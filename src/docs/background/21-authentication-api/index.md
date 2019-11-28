---
title: Authentication API
slug: authentication-api
updated: 2019-11-27
category: background
ingress:
  Description of the Flex Authentication API and how the
  Marketplace API and Integration API applications use it
published: true
---

## Authentication API

Both the [Marketplace API and the Integration
API](/background/marketplace-api-integration-api/) require valid *access tokens*
to be passed in every API request. Applications obtain those access tokens from
the Authentication API.

As a general rule, applications that access the Marketplace API do so by
authenticating an end user of the marketplace (via the user' username and
password), while Integration API applications authenticate using their own
credentials.

In order to access Flex APIs, you need to create an *Application* in [Flex
Console](https://flex-console.sharetribe.com/applications). Each Application has
a *client ID*. In addition, applications that access the Integration API also
have a corresponding *client secret*.

> **NOTE** The easiest way to interact with both the Marketplace API and the
> Integration API is to use our [SDKs](/references/js-sdk/). The SDKs handle
> most of the complexity regarding authentication, access, and refresh tokens.
> Below we discuss some of the underlying mechanisms and principles in the
> Authentication API.

The Authentication API is based on the [OAuth 2.0](https://oauth.net/2/)
framework.

See also the [Authentication API reference
documentation](https://www.sharetribe.com/api-reference/authentication.html)

> **IMPORTANT** The *client secret* is a secret value that must be kept safe and
> secure. Never expose your *client secret* publicly (e.g. in your web site's
> HTML or JavaScript code, in your mobile app source code, etc).

The Authentication API's main endpoint is for [issuing
tokens](https://www.sharetribe.com/api-reference/authentication.html#issuing-tokens).
Depending on whether your application is accessing the Marketplace API or the
Integration API, that endpoint requires different set of parameters and issues
different kinds of *access tokens*.

Applications request access tokens using several different *grant types*:

* `client_credentials` grant type is used by both Marketplace API and
  Integration API applications with some important differences:
  * when used by Marketplace API applications, it only requires the *client ID*
    and grants *anonymous access tokens* which can be used with any of the
    Marketplace API endpoints that provide public data about the marketplace
    (such as the
    [`/listings/`](https://www.sharetribe.com/api-reference/marketplace.html#listings)
    endpoints).
  * when used by Integration API applications, it requires both the client ID
    and the client secret and it grants access tokens that provide full access
    to the Integration API. It also provides a *refresh token* that can be used
    to obtain fresh access tokens later
* `password` grant type is used only by Marketplace API applications and allows
  to authenticate the marketplace's end users via their own *username* and
  *password*. It also provides Marketplace API applications with a *refresh
  token* that can be used to obtain fresh access tokens and can act as the end
  user's session secret.
* `refresh_token` grant type is used by both Marketplace API and Integration API
  applications and grants a fresh *access token* when given a client ID and a
  valid *refresh token*.

All access tokens that the Authentication API grants are short lived (valid for
some number of minutes). Instead of always using the main grant type repeatedly
(i.e. `password` or `client_credentials`), implementations are advised to use
the `refresh_token` grant, as refresh tokens are typically valid for much longer
period of time (days to months). This practice minimizes the risk of a long term
secret to be accidentally exposed (e.g. user's password or Integration API
application's client secret).
