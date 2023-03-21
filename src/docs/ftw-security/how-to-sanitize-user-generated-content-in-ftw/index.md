---
title: Sanitizing user-generated content
slug: how-to-sanitize-user-generated-content-in-ftw
updated: 2023-01-01
category: ftw-security
ingress:
  This guide describes how to sanitize user-generated content to prevent
  XSS vulnerabilities.
published: true
---

User-generated content can expose your marketplace to Cross-Site
Scripting (XSS) attacks. Therefore, it is essential to take precautions
when working with a website that allows users to generate and input
content.

By default,
[React DOM escapes any values embedded in JSX](https://reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks)
before rendering them. The feature prevents injection attacks, and it is
generally safe to embed user input in JSX.

However, there are other XSS vulnerabilities to consider. User-generated
content should be validated if passed to component props. For example,
the href attribute in a `<a>` tag could contain an XSS attack vector
since it allows JavaScript execution.

## sanitize.js

You can find a collection of functions you can use to sanitize data in
your marketplace in the
[sanitize.js file](https://github.com/sharetribe/ftw-x/blob/main/src/util/sanitize.js).
The template sanitizes user and listing data fetched from the API by
calling the
[sanitizeEntity function](https://github.com/sharetribe/ftw-x/blob/main/src/util/sanitize.js#L176).
The template calls this function when listing or user data is fetched
from the API and stored in the Redux store.

## When to sanitize user-generated content

If you add new fields to extended data, we highly recommend modifying
the sanitization functions to reflect those changes. This is
particularly important if you use extended data somewhere other than
wrapped in JSX.

Here is an example of public data wrapped in JSX, where the React DOM
handles sanitization:

```jsx
<div>{publicData.saunaRules}</div>
```

Here is an example of when you should sanitize extended data yourself:

```jsx
<div attr={publicData.saunaRules}>content).
```

Any listing extended data attributes specified through the
[configListings.js](https://github.com/sharetribe/ftw-x/blob/main/src/config/configListing.js)
file are sanitized automatically. A similar configuration does not exist
for user extended data attributes, and to sanitize that data, you will
need to update the functions in the
[sanitize.js file](https://github.com/sharetribe/ftw-x/blob/main/src/util/sanitize.js).

## Wrap external links

It is a good practice to use wrapper components around elements that
might need extra safety measures. It makes it easier to add those extra
measures if needed in the future. For example, instead of `<a>`
component, we recommend using `<ExternalLink>` component when you want
to link outside of your web app. It adds a `noopener` handling for
external links (since `target="_blank"` attribute is
[vulnerable for XSS](https://mathiasbynens.github.io/rel-noopener/)).

There is also Field\* components around `<input>` elements (e.g.
FieldTextInput) since the Sharetribe Web Template uses Final Form. Those
could be used in a similar fashion to validate content or just format it
before saving.

## Further reading

- [How to set up Content Security Policy](/ftw/how-to-set-up-csp-for-ftw/)
- [JSX prevents injection attacks](https://reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks)
- [OWASP XSS prevention cheat sheet](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.md)
- https://mathiasbynens.github.io/rel-noopener/
