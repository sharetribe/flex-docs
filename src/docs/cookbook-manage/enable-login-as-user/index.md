---
title: Enable Login as user
slug: enable-login-as-user
updated: 2020-06-01
category: cookbook-manage
ingress:
  This article guides you how to take into use the Login as user feature
  that allows an operator to log into their marketplace as one of the
  marketplace users
published: true
---

The _Login as user_ feature allows marketplace operators to log into
their marketplace as a specific user of the marketplace. This helps
operators to experience their marketplace as their users do and to find
out what is wrong when their users are reporting problems. The feature
also comes in handy when a marketplace user asks for help with managing
their data and listings. However, note that when logged in as another
user **it is not possible to modify Stripe account details, send
messages, or initiate or transition transactions**.

**NOTE:** In order to enable the Login as user feature you will need to
be running at least version 4.2.0 of ftw-daily or 6.2.0 of ftw-hourly.
Alternatively you will need to perform the modifications described in
this guide to your marketplace website.

## How the Login as user feature works

As context, here's a quick description of the technical implementation
of how the Login as user works to make it easier to understand the
changes it requires. The authentication flow uses the _authorization
code_ grant type defined in the OAuth2. Console works as an
_authorization server_ that issues an authorization code for FTW. FTW
then uses this code to obtain an access token from Auth API. The access
token is valid for 30 minutes and it does not come with a refresh token.
The token can be used as a normal token obtained with a password login
excluding updating payment information, sending messages, and initiating
or transitioning transactions. The image below describes the
authentication flow in more detail.

![Authentication flow](authentication-flow.png)

**Note:** Remember to make sure that the `REACT_APP_CANONICAL_ROOT_URL`
value configured in your marketplace website matches the marketplace URL
configured in Console as the value will be used to redirect back to your
marketplace and the value is validated in console when issuing an
authorization code.

## Applying the changes to your marketplace website

The easiest way to take the feature into use is to merge the latest
changes from the FTW projects. The required version to have is 4.2.0
with ftw-daily and 6.2.0 with ftw-hourly.

In case merging upstream changes is not a reasonable solution, the
changes can also be applied manually.

### Update the Flex SDK and auth handling in FTW

Version 1.9.0 of the Flex JavaScript SDK is required. Make sure that the
dependency looks as follows in your `package.json` file.

```javascript
"sharetribe-flex-sdk": "^1.9.0",
```

With the updated SDK auth state handling can be changed to utilize a new
auth info attribute returned by the SDK. Update the `authenticated`
function in the top part of the `src/ducks/Auth.duck.js` file as
follows:

```javascript
const authenticated = authInfo =>
  authInfo && authInfo.isAnonymous === false;
```

### Add required endpoints to the FTW server

In order to handle the authentication flow, FTW needs to implement two
server-side endpoints: `/api/initiate-login-as` and `/api/login-as`. To
add them to the Node server, copy `server/apiRouter.js`,
`server/api/initiate-login-as.js`, and `server/api/login-as.js` files
from the FTW daily repository:

https://github.com/sharetribe/ftw-daily/tree/master/server

Then add the following line into your `server/index.js` file, above the
main `app.get('*' (req, res) => {` route declaration:

```javascript
app.use('/api', apiRouter);
```

Now you can log into the marketplace from Console's user view.

### Show a banner when logged in as a user

The endpoints of the previous section enable the Login as user feature.
However, this will not notify the operator in any way that they are
logged in as a user and have a limited set of actions in their use. The
Flex template applications ftw-daily and ftw-hourly provide such a
banner. The changes for showing the banner are a bit more complex what
is required for adding the endpoints described above so in order to show
a notification to an operator it is advised to pull upstream updates.
However, in case that is not a viable option the notification banner
changes to the FTWs are in
[this PR](https://github.com/sharetribe/ftw-daily/pull/1259) and can be
applied from there as one sees best.

## Troubleshooting

Having trouble enabling the Login as user feature? Check that you have
the following in order.

### Authentication fails with message: Failed to authorize as a user, error: <error message>

Double check that the `REACT_APP_CANONICAL_ROOT_URL` environment
variable of your marketplace website matches the Marketplace URL you
have configured in Console.

### Authentication fails with message: Unable to authenticate as a user

Have you updated the SDK to the latest version?

### Login session drops unexpectedly

The access token obtained with the Login as user authentication flow is
valid only for 30 minutes. If you could not finish what you had in mind
during that time you can always login as the user again.
