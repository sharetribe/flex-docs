---
title: How to use CI with FTW
slug: how-to-use-ci-with-ftw
updated: 2019-01-29
category: guides
ingress:
  This guide describes how the Continuous Integration (CI) setup works
  in Flex Template for Web (FTW) and how to enable it.
published: true
---

FTW provides a configuration to use [CircleCI](https://circleci.com/) as
a continuous integration server to run tests and other scripts. This
ensures quality and can be forced to avoid merging changes that break
tests or fail audits.

The
[.circleci/config.yml](https://github.com/sharetribe/flex-template-web/blob/master/.circleci/config.yml)
file is used to configure CircleCI.

## 1. Enable CI

Follow the
[Setting up Your Build on CircleCI](https://circleci.com/docs/2.0/getting-started/#setting-up-your-build-on-circleci)
instructions in the CircleCI documentation.

## 2. Understand how the setup works

Currently the CI runs the following scripts:

### Code formatting: `yarn run format-ci`

This command fails if there are changes in the formatting that are not
committed. Run `yarn run format` to format the code and get rid of the
error.

### Build: `yarn run build`

This command ensures that the build passes.

### Tests: `yarn run test-ci`

This command runs the tests.
