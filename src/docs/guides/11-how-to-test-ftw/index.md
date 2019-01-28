---
title: How to test FTW
slug: how-to-test-ftw
updated: 2019-01-28
category: guides
ingress:
  This guide describes how to use the test setup in Flex Template for
  Web (FTW).
published: true
---

The test setup is based on the `create-react-app` test setup and is
using the [Jest testing framework](https://facebook.github.io/jest/).
For reference, see the
[testing section](https://facebook.github.io/create-react-app/docs/running-tests)
in the `create-react-app` documentation.

## Running tests

To start the test watcher that automatically updates when files change,
run

    yarn test

If you want to run the tests once and not start the watcher, run

    CI=true yarn test

Note that this also runs the linter.

## Jest

To learn more about testing with Jest, read the following documentation:

- [Getting Started](https://facebook.github.io/jest/docs/getting-started.html)
- [Tutorial - React](https://facebook.github.io/jest/docs/tutorial-react.html)
- [Tutorial - Async](https://facebook.github.io/jest/docs/tutorial-async.html)
- [Snapshot Testing](https://facebook.github.io/jest/blog/2016/07/27/jest-14.html)
  blog post
- [API Reference](https://facebook.github.io/jest/docs/api.html) lists
  the global environment with the available functions and the assertion
  matchers
