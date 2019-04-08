---
title: How to set up Content Security Policy (CSP) for FTW
slug: how-to-set-up-csp-for-ftw
updated: 2019-01-25
category: guides
ingress:
  This guide describes how to set up CSP for Flex Template for Web
  (FTW).
published: true
---

According to
[MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP):

> Content Security Policy (CSP) is an added layer of security that helps
> to detect and mitigate certain types of attacks, including Cross Site
> Scripting (XSS) and data injection attacks. These attacks are used for
> everything from data theft to site defacement or distribution of
> malware.

By default the CSP is disabled in FTW. By turning it on, the default
whitelist in
[server/csp.js](https://github.com/sharetribe/flex-template-web/blob/master/server/csp.js)
works with the all the URLs and tools that come with the application.

## Turn on the CSP

The CSP is configured using the `REACT_APP_CSP` environment variable.

Possible values:

- not set: disabled
- `REACT_APP_CSP=report`: Enabled, but policy violations are only
  reported
- `REACT_APP_CSP=block`: Enabled. Policy violations are reported and
  requests that violate the policy are blocked

If error logging with Sentry is enabled (See the
[How to set up Sentry to log errors in FTW ](/guides/how-to-set-up-sentry-to-log-errors-in-ftw/)
guide), the reports are sent to Sentry. Otherwise the reports are just
logged in the backend.


## Optional: Extend the policy

If you want to whitelist new sources (for example adding a new external
analytics service) and keep the CSP enabled, you should add the domains
to the white list in
[server/csp.js](https://github.com/sharetribe/flex-template-web/blob/master/server/csp.js).

The easiest way to do this is to first turn on the policy in report mode
and then see what policy violations are logged to the browser developer
console or to the backend policy violation report URL.


## Resources

To understand what CSP is and how browsers work, here are some
resources:

- https://content-security-policy.com/
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
- https://ponyfoo.com/articles/content-security-policy-in-express-apps
- https://helmetjs.github.io/docs/csp/
