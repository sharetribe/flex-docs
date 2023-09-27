---
title: Social logins & SSO
slug: social-logins-and-sso
updated: 2020-12-16
category: concepts-users-and-authentication
ingress:
  Sharetribe allows your users to authenticate themselves using a 3rd
  party identity provider.
published: true
---

This document gives an overview of how different login solutions work
with Sharetribe. To find guidance on how to implement login using a
specific service, refer to the following how-to guides:

- [Enable Facebook login](/how-to/enable-facebook-login/)
- [Enable Google login](/how-to/enable-google-login/)
- [Enable OpenID Connect login](/how-to/enable-open-id-connect-login/)
- [How to set up OpenID Connect proxy in Sharetribe Web Template](/how-to/setup-open-id-connect-proxy/)

<plan tier='extend' feature="Using identity providers">
</plan>

## Using a third party identity provider

In addition to username and password based authentication, Sharetribe
allows marketplace users to authenticate using a third party identity
provider. An identity provider can be used to authenticate the user when
a new user account is created or when a user logs into the marketplace
to a previously created account.

A general overview of using a third party identity provider when logging
in or creating a user is as follows:

[![Auth flow using a 3rd party identity provider](auth-flow.png 'Auth flow using a 3rd party identity provider')](/background-assets/sso-auth-flow-large.png)

The different actors in the diagram above are:

- **Browser** The Sharetribe Web Template React application running in
  user's browser
- **Template backend** Sharetribe Web Template Node application that
  runs on a server
- **Identity provider** A service that provides user authentication, for
  example, Facebook
- **Sharetribe API** Sharetribe Marketplace or Auth API

Details on the requests in the diagram above:

**1.-4.** This is standard OAuth2/OpenID Connect login flow. This part
may differ depending on the identity provider that is being used but the
flow is usually like this:

- the user is redirected to the identity provider to provide their
  credentials
- an authorization code is returned from the identity provider
- the template backend sends a request to the identity provider to trade
  the code for a token.

What token is obtained depends on the identity provider and protocol in
use.

**5.1** Invokes `/current_user/create_with_idp` endpoint in Sharetribe
Marketplace API. The token obtained from steps 1.-4. is passed here
among a few other details. Returns a current user entity.

**5.2** Invokes `/auth_with_idp` endpoint in Sharetribe Auth API. The
token obtained from steps 1.-4. is passed here among a few other
details. Returns access and refresh tokens.

**6.** Validates the token passed in as a parameter in 5.1 or 5.2.
Depending on the identity provider in use, this may or may not include a
request to the identity provider.
