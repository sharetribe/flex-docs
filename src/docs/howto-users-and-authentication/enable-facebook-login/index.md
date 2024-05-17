---
title: Enable Facebook login
slug: enable-facebook-login
updated: 2023-10-24
category: how-to-users-and-authentication
ingress:
  In this how-to guide we'll take a look at the process of setting up
  Facebook login for your marketplace. It will allow your users to sign
  and log in by using their Facebook accounts.
published: true
---

**If you are working with one of our legacy templates and are not sure
whether Facebook login is enabled, take a look at our
[legacy documentation](/template/legacy-templates/).**

Enabling Facebook login consists of three main steps:

- **Create a Facebook app** Facebook app is what connects your
  marketplace to Facebook and let's Facebook know that users from your
  marketplace are allowed to authenticate themselves using the Facebook
  login.
- **Create an identity provider client in Sharetribe Console** Identity
  provider (IdP) client is what let's Sharetribe know that the users of
  your marketplace are allowed to use the Facebook app you created to
  log into your marketplace.
- **Configure Sharetribe Web Template** A few attributes from the
  Facebook app will need to be configured to your Sharetribe Web
  Template so that it can perform the login flow via Facebook.

## Configure a Facebook app

The first thing to do is to create a Facebook development app for your
marketplace by following
[these steps in the Sharetribe help center](https://www.sharetribe.com/help/en/articles/9174337-how-to-enable-facebook-login#h_3848596b4d).

## Configure an identity provider client in Console

Now that your Facebook app is all set up, a corresponding _identity
provider client_ will need to be configured for your marketplace. This
will tell Sharetribe that your users will be allowed to log into your
marketplace using the Facebook app you just created. The information
stored in an IdP client is used to verify a token obtained from Facebook
when a user logs in.

An identity provider client can be configure with the following steps:

1. Go to
   [Social logins & SSO in Console](https://console.sharetribe.com/advanced/social-logins-and-sso).
2. Under _Identity provider clients_ click "+ Add new".
3. Set "Client name". This can be anything you choose, for example,
   "Facebook login". In case you need to create multiple Facebook apps,
   this will help you make a distinction between the corresponding IdP
   clients.
4. Set the _Client ID_. This value is the App ID from your Facebook app.
   You can see the value under _Settings > Basic_ in the Facebook app
   view.
5. Set the _Client secret_. This value is the App secret in your
   Facebook app. You can see the value under _Settings > Basic_ in the
   Facebook app view. You will need to authenticate to reveal the secret
   value.

The IdP client config should now look something like this:

![Add identity provider client](add-idp-client.png 'Add identity provider client')

6. Click "Add client" and your identity provider client is ready.

## Configure Sharetribe Web Template

Last step to enabling Facebook login is to configure your Sharetribe Web
Template with the values that you used to add an identity provider
client in Console. Add the following environment variables to your
template:

- **`REACT_APP_FACEBOOK_APP_ID`** The App ID of your Facebook app.
  Corresponds to _client ID_ of the identity provider in Console.
- **`FACEBOOK_APP_SECRET`** The App Secret of your Facebook app.
  Corresponds to _client secret_ of the identity provider in Console.

For more information on the template environment variables, see the
[Template environment variables](/template/template-env/) article.

That is it. Setting these environment variables will make Sharetribe Web
Template render the Facebook login button in signup and login forms.
