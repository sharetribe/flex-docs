---
title: How to set up OpenID Connect proxy in FTW
slug: setup-open-id-connect-proxy
updated: 2021-01-12
category: cookbook-social-logins-and-sso
ingress:
  In this cookbook, we'll take a look at the process of setting up
  OpenID Connect (OIDC) proxy to FTW. This allows you to add support for
  identity providers that Flex doesn't natively support. In this
  example, we are building the proxy implementation for LinkedIn.
published: true
---

The OpenID Connect (OIDC) support in Flex allows you to integrate login
solutions that do not necessarily implement OpenID Connect. The idea is
to build a suitable login flow in FTW and wrap that login information
into an OpenID Connect ID token that can be used to validate user login
in Flex. With this approach, FTW will serve as an identity provider
towards Flex.

Flex verifies the ID token by fetching the JSON Web Key that is hosted
by your FTW server and using that to unsign the token. A consequence of
this is, that the JSON Web Key needs to be publicly available. This
means that the proxy setup will not work directly in localhost. To test
out the LinkedIn login, you should e.g.
[deploy your FTW changes to Heroku](/tutorial-branding/deploy-to-heroku/).

In this guide, we'll integrate LinkedIn login to Flex by using FTW as an
OIDC proxy to Flex. The main steps to take to achieve this are:

1. Create a login app in Linkedin
1. Configure a new identity provider and client in Flex Console
1. Build LinkedIn login flow in FTW
1. Proxy the successful LinkedIn login information to Flex in OIDC
   format

**Note, that using FTW as an OpenID Connect proxy requires ftw-daily
version
[7.2.0](https://github.com/sharetribe/ftw-daily/releases/tag/v7.2.0) or
ftw-hourly version
[9.2.0](https://github.com/sharetribe/ftw-hourly/releases/tag/v9.2.0).**

## Create a login app in Linkedin

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

## Configure a new identity provider and client in Flex Console

With this proxy implementation, your FTW works as the identity provider
that Flex uses to validate the ID token that wraps the LinkedIn login
information. To enable logins in Flex using the OIDC proxy, a
corresponding identity provider and identity provider client need to be
configured for your marketplace in Flex Console. See the
[OpenID Connect cookbook](/cookbook-social-logins-and-sso/enable-open-id-connect-login/)
on for information on how to add a new identity provider for your
marketplace.

When configuring a new identity provider, make sure you use the correct
identity provider URL. Based on this URL, Flex determines the path to
OpenID Connect discovery document (_[identity provider
URL]/.well-known/openid-configuration_). If you are using e.g. Heroku,
the URL should be something like
_https://MYEXAMPLEAPP.herokuapp.com/api_.

## Build LinkedIn login flow in FTW

### FTW as an OpenID Connect identity provider

FTW-daily and FTW-hourly provide a few helper functions which you can
use as a starting point in your customization. When following this guide
you will not need to pay too much attention to them as the crucial code
is provided for you in the `linkedin.js` file below but it's good to be
aware of them. You can find these functions in the `api-util/idToken.js`
file in your server:

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
  signed and the keys required for that. Currently, Flex supports only
  RS256 signing algorithm so the _options_ object should look like this:

```
{ signingAlg: 'RS256', rsaPrivateKey, keyId }
```

**`openIdConfiguration`** and **`jwksUri`**

These functions can be used to serve an OpenID Connect discovery
document and JSON Web Keys that are used by Flex to validate the ID
token written by your proxy implementation. FTW will automatically use
these functions to expose correct endpoints when JWT signing keys are
configured.

```js
router.get('/.well-known/openid-configuration', openIdConfiguration);
router.get('/.well-known/jwks.json', jwksUri);
```

### Build LinkedIn signup flow to FTW’s backend (using passport.js)

We are using [Passport.js ](http://www.passportjs.org/) library for
handling the authentication with different identity providers like with
Facebook and Google. The library offers
[multiple strategies](http://www.passportjs.org/packages/) and there's
also a strategy for Linkedin which we are going to use in this example.

#### Environment variables

First up, we'll need to define some new environment variables.

`REACT_APP_LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET`

Set these as the client ID and client secret of your LinkedIn app.

`RSA_PRIVATE_KEY` and `RSA_PUBLIC_KEY`

The ID token is signed with RSA keys. You can, for example, use a
command line tool like _ssh-keygen_ to generate the keys. Note, that
when you save the keys to your environment variables you should replace
any line brakes with '\n'. You should also make sure that the key size
is big enough. By default, we are using RS256 algorithm to sign the
keys.

`OIDC_PROXY_IDP_ID`

The identifier of your identity provider that you configure to
Flex. It declares that you are using your FTW OpenID Connect proxy as an
identity provider. Use the "IdP ID" value of an identity provider client
in Console for this variable.

`OIDC_PROXY_CLIENT_ID`

The client ID of your identity provider client that you
configure to Flex. Use the "Client ID" value of an identity provider client
in Console for this variable.

`KEY_ID`

The value will be used as the `kid` header in ID tokens that are passed
to Flex when a user logs in with LinkedIn. It is also used as the `kid`
attribute of the JSON Web key that the proxy serves in an endpoint. Even
though using a _kid_ value in your keys is not compulsory, we heavily
recommend using it with your token and the JWK. For example, key caching
in the Flex API relies heavily on it.

#### Passport module dependency

Add the following entry to the `dependencies` map in `package.json`:

```js
"passport-linkedin-oauth2": "^2.0.0",
```

#### LinkedIn login flow

Next, let's add a new file to FTW that handles authentication to
LinkedIn. You can find the complete file here:

- [linkedin.js](/tutorial-assets/linkedin.js)

Place the file in `server/api/auth` folder inside FTW:

```shell
└── server
    └── api
        └── auth
            └── linkedin.js
```

The biggest difference between LinkedIn login and e.g. Facebook login
which has first-class support in Flex is that we need to use
_createIdToken_ helper function to create the id token from the
information we fetched from LinkedIn. This new id token is then passed
forward to Flex as _idpToken_ parameter.

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
// loginWithIdp endpoint in Flex API to authenticate user to Flex
router.get('/auth/linkedin/callback', authenticateLinkedinCallback);
```

Finally, on the server side we need to update
`server/api/auth/createUserWithIdp.js` so that a correct IdP client ID
is passed to the Flex API. In the beginning of the file resolve the
following environment variables:

```js
const OIDC_PROXY_CLIENT_ID = process.env.OIDC_PROXY_CLIENT_ID;
const OIDC_PROXY_IDP_ID = process.env.OIDC_PROXY_IDP_ID;
```

And update the logic that resolves the `idpClientId` variable:

```js
const idpClientId =
  idpId === FACEBOOK_IDP_ID
    ? FACBOOK_APP_ID
    : idpId === GOOGLE_IDP_ID
    ? GOOGLE_CLIENT_ID
    : idpId === OIDC_PROXY_IDP_ID
    ? OIDC_PROXY_CLIENT_ID
    : null;
```

#### Add LinkedIn-button to FTW

Once we have added the authentication endpoints to the FTW server, we
need to add a button for LinkedIn login to the AuthenticationPage.

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
translation keys as well as LinkedIn logo too! Usually, different
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
