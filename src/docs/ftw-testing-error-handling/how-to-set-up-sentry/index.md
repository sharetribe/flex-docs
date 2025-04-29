---
title: Log errors with Sentry
slug: how-to-set-up-sentry
updated: 2023-10-24
category: template-testing-error-handling
ingress:
  This guide documents how to use Sentry to log errors in the Sharetribe
  Web Template
published: true
---

## Error logging

The Sharetribe Web Template supports error logging with
[Sentry](https://sentry.io/) out of the box, provided that the required
environment variables are set in place. Other logging solutions can also
be used but the Sentry client comes already strapped into application.

### Configure the Sentry DSN variable

To enable the Sentry error logging a _Data Source Name_ (DSN), has to be
provided as an environment variable. The browser and Node environments
both use the same `REACT_APP_SENTRY_DSN` variable.

You can acquire the DNS key from your Sentry project settings. To test
it in your local environment, you can either assign it to the
`REACT_APP_SENTRY_DSN` environment variable through the .env file or
when running the `yarn run dev-server` command:

```bash
REACT_APP_SENTRY_DSN='<sentry-dsn>'  yarn run dev-server
```

The template will log all errors to the console if you do not configure
the Sentry DNS key. You can find all code associated with error logging
and Sentry in
[src/util/log.js](https://github.com/sharetribe/web-template/blob/master/src/util/log.js)

### Configure logging with basic access authentication

By default, Sentry fetches the source maps for minified javascript
files. However, that might not work if authentication, such as
[basic access authentication](/tutorial/deploy-to-render/#enable-http-basic-access-authentication),
is enabled. If you want to enable logging to Sentry while having basic
access authentication enabled, you can pass Sentry a security token.
Sentry then adds this token to the source maps request header, which
allows the server to let those requests access the source maps.

To enable logging while having basic access authentication enabled, you
can configure the security token in the Sentry dashboard by navigating
to:

_**Project > Settings > General > Client Security**_

Set the following values:

- Security token - Basic <your username:password in Base 64>
- Security token header - Authorization
