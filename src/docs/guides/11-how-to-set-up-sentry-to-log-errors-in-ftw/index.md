---
title: How to set up Sentry to log errors in FTW
slug: how-to-set-up-sentry-to-log-errors-in-ftw
updated: 2019-01-25
category: guides
ingress:
  This guide documents how to use Sentry to log errors in Flex Template
  for Web (FTW).
published: true
---

FTW supports error logging with [Sentry](https://sentry.io/) out of the
box provided that required environment variables are set in place. Other
logging solutions can also be used but the Sentry client comes already
strapped into application.

## Configure the Sentry DSN variable

To enable the Sentry error logging a DSN, _Data Source Name_ has to be
provided as an environment variable. Browser and Node environments both
use the same `REACT_APP_SENTRY_DSN` variable.

The DSN key can be aquired from the Sentry project settings. To test it
in your local environment it can be passed for example to the
`yarn run dev-server` command:

    REACT_APP_SENTRY_DSN='<sentry-dsn>'  yarn run dev-server

If the Sentry DSN key is not provided the template app will log errors
to the console. The logging and Sentry setup is implemented in
[src/util/log.js](https://github.com/sharetribe/flex-template-web/blob/master/src/util/log.js)
and
[server/log.js](https://github.com/sharetribe/flex-template-web/blob/master/server/log.js)
so refer to those files to change the external logging service or the
logging logic in general.


## Optional: Configure source map retrieval

By default Sentry fetches the source maps for minified javascript files.
However, this might now work in case some sort of authentication, e.g.
basic auth, is required to reach your application. To circumvent this a
security token can be configured to Sentry. Sentry then adds this token
to the source maps request header so that the server hosting the
marketplace can then be configured to let those requests access the
source maps.

For basic auth the security token can be configured as follows:

In _Project > Settings > General > Client Security_ set the following
values

- **Security token** - `Basic <your username:password in Base 64>`
- **Security token header** - `Authorization`
