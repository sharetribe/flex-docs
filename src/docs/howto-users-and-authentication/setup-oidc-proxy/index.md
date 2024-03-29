---
title: How to set up OpenID Connect proxy in Sharetribe Web Template
slug: setup-open-id-connect-proxy
updated: 2023-10-24
category: how-to-users-and-authentication
ingress:
  In this guide, we'll take a look at the process of setting up OpenID
  Connect (OIDC) proxy to Sharetribe Web Template. This allows you to
  add support for identity providers that Sharetribe doesn't natively
  support. In this example, we are building the proxy implementation for
  LinkedIn.
published: true
---

The OpenID Connect (OIDC) support in Sharetribe allows you to integrate
login solutions that do not necessarily implement OpenID Connect. The
idea is to build a suitable login flow in Sharetribe Web Template and
wrap that login information into an OpenID Connect ID token that can be
used to validate user login in Sharetribe. With this approach, the
template will serve as an identity provider towards Sharetribe.

Sharetribe verifies the ID token by

- fetching the JSON Web Key that is hosted by your template server, and
- using that to unsign the token.

A consequence of this is that the JSON Web Key needs to be publicly
available. This means that the proxy setup will not work directly in
localhost. To test out the LinkedIn login, you should e.g.
[deploy your template changes to Render](/tutorial/deploy-to-render/).

In this guide, we'll integrate LinkedIn login to Sharetribe by using
Sharetribe Web Template as an OIDC proxy to Sharetribe.

<warning>

LinkedIn has
[adopted the Open ID Connect framework](https://www.linkedin.com/developers/news/featured-updates/openid-connect-authentication)
for their authentication flow. Our team is investigating the
implications of this change as it relates to authenticating towards
Sharetribe.

At the moment, you can use the guide below as an illustrative guide to
integrating other non-OIDC authentication flows with Sharetribe.
However, we cannot guarantee that implementing this guide will result in
a fully functional LinkedIn login flow. We will update the contents of
this article as our investigation progresses.

</warning>

The main steps to take to achieve this are:

1. Create a login app in Linkedin
1. Configure a new identity provider and client in Sharetribe Console
1. Build LinkedIn auth flow in the template

**If you are working with one of our legacy templates and are not sure
whether using Open ID Connect proxy is enabled, take a look at our
[legacy documentation](/template/legacy-templates/).**

## A note about development environments

For OpenID Connect (OIDC) identity providers, Sharetribe supports RSA
signed ID tokens. RSA is an asymmetric signing function. Therefore, all
OIDC identity providers will need to provide their URL (also known as
_issuer location_) to Sharetribe so that public signing keys can be
fetched for ID token validation.

When using Sharetribe Web Template as an OIDC proxy, it should be served
publicly, so that Sharetribe can fetch the public signing key used to
sign ID tokens used with authentication. This means that when developing
OIDC proxy capabilities, by default, a template application running in
`localhost` can not be used as an OIDC proxy but the application should
be deployed, for example, to a staging environment.

If you want to develop this functionality complete locally, take a look
at tools like [Ngrok](https://ngrok.com/) or
[Localtunnel](https://localtunnel.github.io/www/) that allow exposing
your local ports publicly.

## Create a login app in LinkedIn

1. Head to
   [LinkedIn apps management page](https://www.linkedin.com/developers/apps/new).
   A LinkedIn account is required.
1. Click "Create app"
1. Add app name
1. Search the LinkedIn page of your marketplace business. If you do not
   have a LinkedIn page, you can create one by selecting "+ Create a new
   LinkedIn Page".
1. Fill in the URL to the privacy policy in your marketplace.
1. Add a logo.
1. Check the legal agreement and you are ready to click "Create app"
1. Navigate to the _Auth_ tab in your new app view.
1. Add a new redirect URL:
   `<your marketplace URL>/api/auth/linkedin/callback`. So for example,
   `https://www.mymarketplace.com/api/auth/linkedin/callback`
1. Make a note of the client ID and client secret. You will need these
   values later on.
1. Move to the _Products_ tab and add _Sign In with LinkedIn_ by
   clicking "Select" by the product.
1. It takes a few moments for LinkedIn to validate your app for the
   _Sign In_ product.

## Configure a new identity provider and client in Sharetribe Console

With this proxy implementation, **your Sharetribe Web Template works as
the identity provider towards Sharetribe.** Sharetribe uses your
template application to validate the ID token that wraps the LinkedIn
login information. To enable logins in Sharetribe using the OIDC proxy,
a corresponding identity provider and identity provider client need to
be configured for your marketplace in Sharetribe Console. See the
[OpenID Connect how-to guide](/how-to/enable-open-id-connect-login/) for
information on how to add a new identity provider for your marketplace.

Here's some guidance for configuring your template application as a new
identity provider and a client to be used as a proxy for LinkedIn.

### Identity provider name and ID

The identity provider ID is generated based on the name of the IdP. The
ID will be passed to the Sharetribe API when creating a user or logging
in using the proxy. When a user logs in with an identity provider, their
identity provider profile is linked to their user account and this
relationship is exposed in the
[currentUser resource](https://www.sharetribe.com/api-reference/marketplace.html#currentuser-identity-provider)
in the Sharetribe API.

If the intention is to use the Sharetribe Web Template to proxy login to
multiple services, it's advised to create a distinct identity provider
for each, and name them so that the ID indicates what is the actual
service providing the authentication. In LinkedIn's case the IdP name
could be "Template LinkedIn" or "Template LinkedIn Proxy".

### Identity provider URL

Based on this URL, Sharetribe determines the path to an OpenID Connect
discovery document (_[identity provider
URL]/.well-known/openid-configuration_) and from there on to an ID token
signing key.

In Open ID Connect terms, this is the issuer URL. In this setup, your
Sharetribe Web Template acts as the issuer towards Sharetribe, so the
URL should point to your template.

By default, the identity provider URL should be the root address of your
template application, for example, _https://example.com_ or, for default
Render URLs, _https://EXAMPLE.onrender.com_. Note, that this URL needs
to be publicly hosted so a `localhost` URL will not work.

### Client ID

When using Sharetribe Web Template as on OpenID Connect proxy, you are
in charge of generating a client ID. The value can be any randomly
generated string.

## Build LinkedIn auth flow in Sharetribe Web Template

### Sharetribe Web Template as an OpenID Connect identity provider

The Sharetribe Web Template provides a few helper functions which you
can use as a starting point in your customization. When following this
guide, you will not need to pay too much attention to them as the
crucial code is provided for you in the `linkedin.js` file below, but
it's good to be aware of them. You can find these functions in the
`api-util/idToken.js` file in your server:

```shell
└── server
    └── api-util
          └── idToken.js
          ...
```

**`createIdToken`**

Turns information fetched from a 3rd party identity provider (e.g.
LinkedIn) info a signed JSON Web Token (JWT).

This function expects three parameters: _idpClientId_, _user_ and
_options_.

- _idpClientId_ is the client id of your custom identity provider you
  have set up in Console:
- _user_ object should contain at least _firstName_, _lastName_, _email_
  and _emailVerified_ fields.
- _options_ object contains information about how the id token should be
  signed and the keys required for that. Currently, Sharetribe supports
  only RS256 signing algorithm so the _options_ object should look like
  this:

```
{ signingAlg: 'RS256', rsaPrivateKey, keyId }
```

**`openIdConfiguration`** and **`jwksUri`**

These functions can be used to serve an OpenID Connect discovery
document and JSON Web Keys that are used by Sharetribe to validate the
ID token written by your proxy implementation. Sharetribe Web Template
will automatically use these functions to expose correct endpoints when
JWT signing keys are configured.

### Generate an RSA key pair

A RSA public and private key pair is used to sign and validate an ID
token that is passed from the template application to Sharetribe during
the login/signup flow. When a user successfully logs into LinkedIn, the
template wraps the user information to an ID token that is signed with a
private key. The corresponding public key is served by the template in
`/.well-known/jwks.json` and it is fetched by Sharetribe when an ID
token is validated.

In order for the Sharetribe Web Template to operate as an OpenID Connect
identity provider, you will need to generate a RSA key pair. Both keys
need to be in PEM format.

The keys can be generated with `ssh-keygen` command line tool by running
the following commands. The first one will generate a key pair, with the
private key in PEM format and the public key in SSH public key format.
The second command will create a public key in PEM format based on the
public key file from the first command.

```
# create an RSA key pair, you can leave out the passphrase when prompted
ssh-keygen -f swt_rsa -t rsa -m PEM

# now you have two files
# swt_rsa: private key in PEM format
# swt_rsa.pub: public key in SSH public key format

# convert the public key from previous command to PEM format
ssh-keygen -f swt_rsa.pub -e -m PEM > swt_rsa_pub
```

Now you have two files: `swt_rsa` and `swt_rsa_pub` (also you have
`swt_rsa.pub` but that one you don't need). The content of the files
should look like the following:

```
# swt_rsa

-----BEGIN RSA PRIVATE KEY-----
private key
value
here
-----END RSA PRIVATE KEY-----


# swt_rsa_pub

-----BEGIN RSA PUBLIC KEY-----
public key
value
here
-----END RSA PUBLIC KEY-----
```

We will use these key values to configure your application in the next
section.

### Configure Sharetribe Web Template

Add the following environment variables:

`REACT_APP_LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET`

Set these as the client ID and client secret of your LinkedIn app.

`RSA_PRIVATE_KEY` and `RSA_PUBLIC_KEY`

The RSA key pair we created in the previous section

The keys are multi-line strings but Heroku is fine with that so you can
paste the keys in config vars as they are.

<info>

If you are using Render or some other environment that requires you to
declare environment variables through a file, wrap the RSA keys with
quotation marks `"` and escape line breaks with the newline character
`\n`. Make sure that the RSA key is defined on a single line.

</info>

`LINKEDIN_PROXY_IDP_ID`

The identifier of your identity provider that you configure to
Sharetribe. It declares that you are using your template OpenID Connect
proxy as an identity provider. Use the "IdP ID" value of an identity
provider client in Console for this variable.

`LINKEDIN_PROXY_CLIENT_ID`

The client ID of your identity provider client that you configure to
Sharetribe. Use the "Client ID" value of an identity provider client in
Console for this variable.

`KEY_ID`

The value will be used as the `kid` header in ID tokens that are passed
to Sharetribe when a user logs in with LinkedIn. It is also used as the
`kid` attribute of the JSON Web key that the proxy serves in an
endpoint. Even though using a _kid_ value in your keys is not
compulsory, we heavily recommend using it with your token and the JWK.
For example, key caching in the Sharetribe API relies heavily on it.

### Add Passport module dependency

We are using [Passport.js](http://www.passportjs.org) library for
handling the authentication with different identity providers like with
Facebook and Google. The library offers multiple authentication
strategies and there's also a strategy for Linkedin which we are going
to use in this example.

Add the following entry to the `dependencies` map in `package.json` and
run `yarn install`:

```js
"passport-linkedin-oauth2": "^2.0.0",
```

### Implement the LinkedIn login flow in Sharetribe Web Template backend

Next, let's add a new file to the template that handles authentication
to LinkedIn. You can find the complete file here:

- [linkedin.js](/tutorial-assets/linkedin.js)

Place the file in `server/api/auth` folder inside the template:

```shell
└── server
    └── api
        └── auth
            └── linkedin.js
```

The biggest difference between LinkedIn login and e.g. Facebook login
which has first-class support in Sharetribe is that we need to use
_createIdToken_ helper function to create the id token from the
information we fetched from LinkedIn. This new id token is then passed
forward to Sharetribe as _idpToken_ parameter.

```js
  createIdToken(idpClientId, user, { signingAlg: 'RS256', rsaPrivateKey, keyId })
    .then(idpToken => {
      const userData = {
        email,
        firstName,
        lastName,
        idpToken,
        from,
        defaultReturn,
        defaultConfirm,
      };
      done(null, userData);
    })
    .catch(e => console.error(e));
};
```

Now we'll need to expose login endpoints that invoke functions provided
by the `linkedin.js` file.

In `server/apiRouter.js`, add the following import:

```js
const {
  authenticateLinkedin,
  authenticateLinkedinCallback,
} = require('./api/auth/linkedin');
```

And after all the `router.*` invocations, add LinkedIn login routes:

```js
// This endpoint is called when the user wants to initiate authentication with Linkedin
router.get('/auth/linkedin', authenticateLinkedin);

// This is the route for callback URL the user is redirected after authenticating
// with Linkedin. In this route a Passport.js custom callback is used for calling
// loginWithIdp endpoint in Sharetribe API to authenticate user to Sharetribe
router.get('/auth/linkedin/callback', authenticateLinkedinCallback);
```

Finally, on the server side we need to update
`server/api/auth/createUserWithIdp.js` so that a correct IdP client ID
is passed to the Sharetribe API. In the beginning of the file resolve
the following environment variables:

```js
const LINKEDIN_PROXY_CLIENT_ID = process.env.LINKEDIN_PROXY_CLIENT_ID;
const LINKEDIN_PROXY_IDP_ID = process.env.LINKEDIN_PROXY_IDP_ID;
```

And update the logic that resolves the `idpClientId` variable:

```js
const idpClientId =
  idpId === FACEBOOK_IDP_ID
    ? FACBOOK_APP_ID
    : idpId === GOOGLE_IDP_ID
    ? GOOGLE_CLIENT_ID
    : idpId === LINKEDIN_PROXY_IDP_ID
    ? LINKEDIN_PROXY_CLIENT_ID
    : null;
```

### Add a LinkedIn login button to Sharetribe Web Template

Once we have added the authentication endpoints to the template server,
we need to add a button for LinkedIn login to the AuthenticationPage.

```shell
└── src
    └── containers
        └── AuthenticationPage
```

We can once more use the existing Google and Facebook login code as an
example an create a similar _authWithLinkedin_ function, which adds the
default URL parameters to the API call and then redirects user to the
authentication endpoint.

```js
const authWithLinkedin = () => {
  const defaultRoutes = getDefaultRoutes();
  const {
    baseUrl,
    fromParam,
    defaultReturnParam,
    defaultConfirmParam,
  } = defaultRoutes;
  window.location.href = `${baseUrl}/api/auth/linkedin?${fromParam}${defaultReturnParam}${defaultConfirmParam}`;
};
```

Then we can use the _SocialLoginButton_ component to show the option to
log in with LinkedIn to the users. Remember to add the LinkedIn related
marketplace text keys as well as LinkedIn logo too! Usually, different
identity providers have brand centers where you can find the logos and
guidelines how to use them. You can download LinkedIn logo from
[LinkedIn brand center](https://brand.linkedin.com/downloads).

```js
const linkedinButtonText = isLogin ? (
  <FormattedMessage id="AuthenticationPage.loginWithLinkedIn" />
) : (
  <FormattedMessage id="AuthenticationPage.signupWithLinkedIn" />
);
```

```js
<div className={css.socialButtonWrapper}>
  <SocialLoginButton onClick={() => authWithLinkedin()}>
    <span className={css.buttonIcon}>{LinkedinLogo}</span>
    {linkedinButtonText}
  </SocialLoginButton>
</div>
```

In the `AuthenticationPage` component, the `idp` const defines what is
presented as the name of the identity provider in the sign up confirm
page. By default, it uses the IdP ID stored in a cookie with a
capitalized first letter. In case that is not sufficient approach given
the IdP ID in use, a custom name for the identity provider can be used
by, for example, by comparing the IdP ID in the cookie to the one used
by your proxy IdP and overriding the default when suitable.

That's it! In order to integrate some other identity provider, implement
their authentication flow using Passport.js or some other method and use
the utility functions in `api-util/idToken.js` accordingly to wrap the
login information into an OpenID Connect ID token that can be used to
log in to a Sharetribe marketplace.
