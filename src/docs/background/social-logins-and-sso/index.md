---
title: Social logins
slug: social-logins-and-sso
updated: 2020-10-15
category: background
ingress:
  Flex allows your users to authenticate themselves using a 3rd party
  identity provider.
published: true
---

**Note! A the moment Facebook is the only identity provider supported by
Flex. We're working on releasing other login methods in the future.**

## Using a third party identity provider

In addition to username and password based authentication, Flex allows
marketplace users to authenticate using a third party identity provider.
An identity provider can be used to authenticate the user when a new
user account is created or when a user logs into the marketplace to a
previously created account.

A general overview of using a third party identity provider when logging
in or creating a user is as follows:

[![Auth flow using a 3rd party identity provider](auth-flow.png 'Auth flow using a 3rd party identity provider')](/background-assets/sso-auth-flow-large.png)

The different actors in the diagram above are:

- **Browser** The FTW React application running in user's browser
- **FTW backend** FTW Node application that runs on a server
- **Identity provider** A service that provides user authentication, for
  example, Facebook
- **Flex API** Flex Marketplace or Auth API

Details on the requests in the diagram above:

**1.-4.** This is standard OAuth2/OpenID Connect login flow. This part
may differ depending on the identity provider that is being used but the
flow is usually like this: user is redirected to the identity provider
to provide their credentials, an authorization code is returned, which
is traded to a token with a request to the identity provider from the
FTW backend. What token is obtained depends on the identity provider and
protocol in use.

**5.1** Invokes `/current_user/create_with_idp` endpoint in Flex
Marketplace API. The token obtained from steps 1.-4. is passed here
among a few other details. Returns a current user entity.

**5.2** Invokes `/auth_with_idp` endpoint in Flex Auth API. The token
obtained from steps 1.-4. is passed here among a few other details.
Returns access and refresh tokens.

**6.** Validates the token passed in as a parameter in 5.1 or 5.2.
Depending on the identity provider in use, this may or may not include a
request to the identity provider.

## Taking social logins into use

See the following cookbook for details on taking Facebook login into
use:
[Enable Facebook login](/cookbook-social-logins-and-sso/enable-facebook-login/).
