---
title: How to test FTW
slug: how-to-test-ftw
updated: 2019-03-27
category: guides
ingress:
  This guide describes how to use the test setup in Flex Template for
  Web (FTW).
published: true
---

The test setup is based on the `create-react-app` test setup and is
using the [Jest testing framework](https://jestjs.io/). For reference,
see the
[testing section](https://facebook.github.io/create-react-app/docs/running-tests)
in the `create-react-app` documentation.

## Running tests

To start the test watcher that automatically updates when files change,
run

```bash
yarn test
```

If you want to run the tests once and not start the watcher, run

```bash
CI=true yarn test
```

Note that this also runs the linter.

> Note: In some environments, alternative test watcher doesn't always
> work and it can die unexpectedly. If that happens to you, you might
> want to install
> [Watchman](https://facebook.github.io/watchman/docs/install.html).
> Read more about
> [this issue](https://github.com/facebook/create-react-app/issues/871).

## Jest

To learn more about testing with Jest, read the following documentation:

- [Getting Started](https://jestjs.io/docs/en/getting-started)
- [Tutorial - React](https://jestjs.io/docs/en/tutorial-react)
- [Tutorial - Async](https://jestjs.io/docs/en/tutorial-async)
- [Snapshot Testing](https://jestjs.io/blog/2016/07/27/jest-14.html)
  blog post
  - [API Reference](https://jestjs.io/docs/en/api) lists the global
    environment with the available functions and the assertion matchers
