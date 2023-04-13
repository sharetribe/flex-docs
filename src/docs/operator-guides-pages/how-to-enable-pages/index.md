---
title: How to enable Pages in Console
slug: how-to-enable-pages
updated: 2023-02-14
category: operator-guides-pages
ingress: Enable the Pages feature for your test environment
published: true
---

This article explains only how to enable Pages in your marketplace. If
you want to learn how to use the feature, you can read the article about
[editing Pages in Console](https://www.sharetribe.com/docs/operator-guides/how-to-edit-content-pages-in-console/)

## For marketplaces created after 2023-02-15

Log into the [Flex Console](https://flex-console.sharetribe.com/).
Switch to the test environment. Choose the “Build” option from the top
bar, then select “Content”. Go to the any of the default pages to start
editing the corresponding page. When you make changes within the test
environment, you will be able to see changes right away. If you want to
use the Pages feature in Dev or Live, you would need to do further setup
with some development.

## For marketplaces created before 2023-02-15

If you created your Flex marketplace before Pages release, you can try
out Pages in your test environment by adding a landing page to it. To
refresh your test Marketplace, you need to go to Pages in your Flex
Console and click the button “Import default pages”. You can then make
adjustments to your test Marketplace and see how they look on the page.
You can visit Pages by going to you Test environment and clicking on
"Build" and then "Content". You can follow
[this direct link to Pages in Console](https://flex-console.sharetribe.com/content/pages/),
but bear in mind that you might need to navigate to the test
environment.

Note that the above lets you test the Pages feature (and follow along
our Pages documentation, including this
[FAQ tutorial](https://www.sharetribe.com/docs/operator-guides/how-to-create-an-faq-page/),
but it does not yet let you make changes to your marketplace client
app’s development or live content pages. You will need to modify your
custom marketplace’s code to connect it to the new Pages feature.
Developers can consult
[this guide](https://www.sharetribe.com/docs/ftw/page-builder/#how-to-take-pages-into-use-if-you-are-using-an-older-version-of-ftw)
to learn how to update existing marketplace codebases with Pages
functionality.

## How to enable Pages in Development or Live environments?

To enable Pages in any other environment than Test, you need some
technical implementation. If you are not a developer you would need the
help of a developer. You and them can read more about the specific steps
in
[this Page builder doc](https://www.sharetribe.com/docs/ftw/page-builder/#how-to-take-pages-into-use-if-you-are-using-an-older-version-of-ftw).
