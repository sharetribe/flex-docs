---
title: FTW legacy templates
slug: ftw-legacy
updated: 2022-10-30
category: ftw-legacy
ingress:
  This article describes the legacy templates deprecated on the release
  of the new FTW combined template.
published: true
---

Deprecated from src/docs/tutorial-branding/first-edit/index.md
<extrainfo title="I have a propertySets.css file. What is that?">

```shell
└── src
    └── styles
        └── propertySets.css
```

In previous versions of FTW, there has been a third CSS file:
propertySets.css. This file contains
[CSS Property Sets](https://chromestatus.com/feature/5753701012602880)
that can be applied to component styles using the `@apply`syntax.
However, W3C decided not to include that feature in future CSS syntax,
and the
[postcss-apply plugin](https://github.com/pascalduez/postcss-apply) got
deprecated in the process.

If you have an older FTW template (earlier than FTW-daily v9, FTW-hourly
v11 or FTW-product v10), you might have this file in your codebase. If
you start using sharetribe-scripts v6.0.0, you need to consider
migrating away from that since it contains code that is deprecated in
v6.0.0 of sharetribe-scripts.

Read more from
[this pull request](https://github.com/sharetribe/ftw-daily/pull/1531)
in FTW-Daily.

</extrainfo>
