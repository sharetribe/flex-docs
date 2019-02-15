---
title: How to sanitize user-generated content in FTW
slug: how-to-sanitize-user-generated-content-in-ftw
updated: 2019-02-15
category: guides
ingress:
  This guide describes how to sanitize user-generated content on Flex
  Template for Web (FTW).
published: true
---

User-generated content (UGC) is a big source of Cross-Site Scripting
(XSS) vulnerabilities so one should pay attention to it.

By default,
[React DOM escapes any values embedded in JSX](https://reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks)
before rendering them. This makes customization a bit more
straightforward from XSS perspective.

However, there are other XSS vulnerabilities to consider. User-generated
content should be validated if passed to component props. For example,
`href` attribute in `<a>` tag could potentially contain XSS attack
vector since it allows JavaScript execution like
`href="javascript:alert('An XSS vulnerability found.')"`.

## First things first: set up Content Security Policy

One of the most advanced safety measures in modern browsers is Content
Security Policy (CSP). When it is used, it helps to detect and mitigate
certain types of attacks, including XSS and data injection attacks. Read
more from our documentation on
[how to set up Content Security Policy](/guides/how-to-set-up-csp-for-ftw/)

## Sanitize user-generated content when updating entities

We have added an example of how user-generated content could be
sanitized when entities are queried and updated to Redux store. Those
examples can be found from the utility file
[src/util/sanitize.js](https://github.com/sharetribe/flex-template-web/blob/master/src/util/sanitize.js).

You should modify those sanitize functions (e.g. `sanitizeUser`) to
include any extendedData you have created for your marketplace. This is
important if the data is used as a props/attribute in components (e.g.
`<div attr=...ESCAPE UNTRUSTED DATA BEFORE PUTTING HERE...>content`). As
stated before, using it inside JSX components (e.g.
`<div>{publicData.saunaRules}</div>`) is handled by React DOM.

Those sanitize functions are used by default in `src/util/data.js`.
There is an `updatedEntities` function, which is called before
marketplace entities are saved to Redux store.

However, you should note that `updateEntities` is called when something
is added to the marketplaceData section of Redux store. So, it might not
include all the places where entities are queried from Marketplace API.
In addition, you might also want to use sanitization directly in UI
components - for example, you could sanitize `href` prop in
`<ExternalLink>` component.

## Other things to consider

It is a good practice to use wrapper components around elements that
might need extra safety measures. It makes it easier to add those extra
measures if needed in the future. For example, instead of `<a>`
component, we recommend using `<ExternalLink>` component when you want
to link outside of your web app. It adds a `noopener` handling for
external links (since `target="_blank"` attribute is
[vulnerable for XSS](https://mathiasbynens.github.io/rel-noopener/)).

There is also Field\* components around <input> elements (e.g.
FieldTextInput) since FTW uses Final Form. Those could be used in a
similar fashion to validate content or just format it before saving.

## Resources

- [How to set up Content Security Policy](/guides/how-to-set-up-csp-for-ftw/)
- [JSX prevents injection attacks](https://reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks)
- [OWASP XSS prevention cheat sheet](<https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet.md>)
- https://mathiasbynens.github.io/rel-noopener/
