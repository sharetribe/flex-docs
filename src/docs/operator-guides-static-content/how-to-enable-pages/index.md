---
title: How to enable Pages in Console
slug: how-to-enable-pages
updated: 2023-04-25
category: operator-guides-static-content
ingress: Enable the Pages feature in your Test environment
published: true
---

This article explains only how to enable Pages in your marketplace. If
you want to learn how to use the feature, you can read the article about
[editing Pages in Console](https://www.sharetribe.com/docs/operator-guides/how-to-edit-content-pages-in-console/)

## For marketplaces created after 2023-02-15

Log into the [Flex Console](https://console.sharetribe.com/). Switch to
the Test environment. Choose the “Build” option from the top bar, then
select “Content”. Go to the any of the default pages to start editing
the corresponding page. When you make changes within the Test
environment, you will be able to see changes right away. If you want to
use the Pages feature in Dev or Live, you would need to do further setup
with some development.

## For marketplaces created before 2023-02-15

If you created your Flex marketplace before Pages release, you can try
out Pages in your Test environment by adding a landing page to it. To
refresh your test Marketplace, you need to go to Pages in your Flex
Console and click the button “Import default pages”. You can then make
adjustments to your test Marketplace and see how they look on the page.
You can visit Pages by going to you Test environment and clicking on
"Build" and then "Content". You can follow
[this direct link to Pages in Console](https://console.sharetribe.com/content/pages/),
but bear in mind that you might need to navigate to the Test
environment.

## How to use Pages during development?

When you are developing your marketplace or you hired a developer to
help you, you should use your Test environment to build out your static
content with Pages. This environment should be connected to a Test
version of your marketplace frontend.

At the same time, you have a Dev version of your marketplace frontend
where code changes are being deployed. Once these code changes are
completed, they should be used to update the Test version of your
marketplace. This keeps your Test marketplace, which you are modifying
with no-code tools, up-to-date with the latest code-customized version
of your marketplace (the Dev marketplace).

When you are ready to go live, you will procure a Live environment and
create a Live version of your marketplace. The Live version contains
both the latest (working) code changes and the latest no-code changes.
Code changes continue to be developed in the Dev version, then deployed
to the Test and Live versions when ready. You make no code changes via
Console in the Test environment and preview them in the Test
marketplace. Once you're happy with them, you copy them to your Live
marketplace by clicking the 'Copy to live...' button.

Setting up your Dev (and Live) marketplace is a technical task requiring
development help. Developers can consult
[this guide](https://www.sharetribe.com/docs/legacy/ftw/page-builder/#how-to-take-pages-into-use-if-you-are-using-an-older-version-of-ftw)
to learn how to update existing marketplace codebases with Pages
functionality.
