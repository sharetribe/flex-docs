---
title: Content Security Policy
slug: how-to-set-up-csp-for-ftw
updated: 2019-01-25
category: ftw-security
ingress:
  This guide describes how to set up a Content Security Policy when
  using the Sharetribe Web Template.
published: true
---

One of the most advanced safety measures in modern browsers is Content
Security Policy (CSP). When used correctly, it helps to detect and
mitigate certain types of attacks, including XSS and data injection
attacks.

## Content Security Policy

According to
[MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP):

> Content Security Policy (CSP) is an added layer of security that helps
> to detect and mitigate certain types of attacks, including Cross Site
> Scripting (XSS) and data injection attacks. These attacks are used for
> everything from data theft to site defacement or distribution of
> malware.

By default the CSP is disabled in the Sharetribe Web Template. By
turning it on, the default whitelist in
[server/csp.js](https://github.com/sharetribe/ftw-x/blob/master/server/csp.js)
works with the all the URLs and tools that come with the application.

## Turn on the Content Security Policy

The Content Security Policy is configured using the `REACT_APP_CSP`
environment variable.

The environment value accepts three values:

- not set: disabled
- `REACT_APP_CSP=report`: Enabled, but policy violations are only
  reported
- `REACT_APP_CSP=block`: Enabled. Policy violations are reported and
  requests that violate the policy are blocked

If error logging with Sentry is enabled (See the
[How to set up Sentry to log errors ](/ftw/how-to-set-up-sentry/)
guide), the reports are sent to Sentry. Otherwise, the reports are
logged in the backend.

## Extend the policy

If you want to whitelist new sources (for example, when adding a new
external analytics service) and keep the CSP enabled, you should add the
domains to the whitelist in
[server/csp.js](https://github.com/sharetribe/ftw-x/blob/master/server/csp.js).

The easiest way to do this is to first turn on the policy in report mode
and then see what policy violations are logged by the browser's
developer console or to the backend.

## Further reading

To understand what CSP is and how browsers work, here are some
resources:

- https://content-security-policy.com/
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
- https://ponyfoo.com/articles/content-security-policy-in-express-apps
- https://helmetjs.github.io/docs/csp/
