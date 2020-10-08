---
title: Enable Facebook login
slug: enable-facebook-login
updated: 2020-10-07
category: cookbook-social-logins-and-sso
ingress:
  This article describes the process of setting up Facebook login for
  your marketplace. It will allow your users to sign and log in by using
  their Facebook accounts.
published: true
---

A _Facebook App_ is what connects your marketplace to Facebook and let's
Facebook know that users from your marketplace are allowed to
authenticate themselves using the Facebook login.

## Configure a Facebook App

First thing to do is to create a Facebook App for your marketplace.
Create a Facebook App by following these steps:

1. Go to https://developers.facebook.com/.
2. Log in. In case you do not have a Facebook account you will need to
   sign up.
3. Click on the "My Apps" dropdown in the top right corner of the
   header.
4. Click "Create App". A popup asking "How are you using your app?"
   should appear.
5. Choose the last option: "For Everything Else".
6. Type your App Display Name. For example: "My Marketplace".
7. Enter the contact email of your choice.
8. Click "Create App ID". You may have to answer a security check.
9. Don't select a Product or Recommended Product but instead in the left
   hand menu, click "Settings" then "Basic".
10. In "App Domains", add all the domains from which you want the
    Facebook login to work, i.e. all your marketplace domains. Add the
    domains without any subdomain, for example www, so if your
    marketplace runs in https://www.mymarketplace.com, add
    mymarketplace.com.
11. Scroll all the way to the bottom and click "+ Add Platform".
12. Select "Website".
13. In "Site URL", add your full marketplace's URL with https and
    possibly www or the subdomain, for example:
    https://www.mymarketplace.com. Note that the Site URL needs to have
    the same domain that you added to App Domains, or one of them if you
    added many.
14. Click "Save Changes" at the bottom right.

Now your app basic setting should look like this:

![Facebook App settings](fb-app-settings.png 'Facebook App settings')
![Facebook Website settings](fb-website-settings.png 'Facebook Website settings')

15. In the left hand menu, click "PRODUCTS +".
16. Look up "Facebook Login" form the products list and click "Set up".
17. Select "Web" (www) in the list of options.
18. Verify that your "Site URL" is correct and click "Save" then
    "Continue".
19. You can leave the 2nd step after setting the site URL as it is and
    in the left hand menu, click "Facebook Login" then "Settings".
20. Under "Client OAuth Settings" check that the following settings are
    correct:
    - Client OAuth Login: Yes
    - Web OAuth Login: Yes
    - Force Web OAuth Reauthentication: No
    - Use Strict Mode for Redirect URIs: Yes
    - Enforce HTTPS: Yes
    - Embedded Browser OAuth Login: Yes
    - Login from devices: No
21. In the "Valid OAuth redirect URIs" field add your marketplace
    address followed by `/api/auth/facebook/callback`, for example:
    https://www.mymarketplace.com/api/auth/facebook/callback. This
    endpoint can be different if you have modified the `/api` endpoints
    in FTW.

Your Facebook login settings should now look like this:

![Facebook login settings](fb-login-settings.png 'Facebook login settings')

23. Click "Save Changes".
24. Your Facebook App is now ready for development. Note that while the
    app is in development mode only you and other app admins can use it
    to log in. When you are ready to take the app live, turn the top
    switch from "In development" to "Live" in the top bar. Confirm the
    choice when asked. You may have to select a category and/or answer a
    security check. Your app doesn't require an approval from Facebook
    so you don't have to go through the submission process. In the left
    hand menu, click "Dashboard". Your app should be public and a green
    dot should be displayed.

Your Facebook App is now created and configured. The next step is to set
up an identity provider client in Flex Console.

## Configure an identity provider client in Console

TODO: Configure IdP client in Console

## Configure FTW

Last step to enabling Facebook login is to configure FTW with the values
that you used to add an identity provider client in Console. Add the
following environment variables to FTW:

- **`REACT_APP_FACEBOOK_APP_ID`** The App ID of your Facebook App.
  Corresponds to _client ID_ of the identity provider in Console.
- **`FACEBOOK_APP_SECRET`** The App Secret of your Facebook App.
  Corresponds to _client secret_ of the identity provider in Console.

For more information on FTW environment variables, see the
[FTW Environment configuration variables](/ftw-configuration/ftw-env/)
article.

That is it. Setting these environment variables will make FTW render the
Facebook login button in signup and login forms.
