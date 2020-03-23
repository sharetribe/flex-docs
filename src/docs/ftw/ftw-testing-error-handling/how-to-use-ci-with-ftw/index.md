---
title: How to use CI with FTW
slug: how-to-use-ci-with-ftw
updated: 2019-02-05
category: ftw-testing-error-handling
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

### Code formatting

```bash
yarn run format-ci
```

This command fails if there are changes in the formatting that are not
committed. Run `yarn run format` to format the code and get rid of the
error.

### Build

```bash
yarn run build
```

This command ensures that the build passes.

### Tests

```bash
yarn run test-ci
```

This command runs the tests.

### Security audit

```bash
yarn run audit
```

This command runs the security audit using `yarn audit --json` and
checks returned JSON against vulnerability exceptions defined in
`.auditrc` file at the project root. The audit checks for installed
packages with known vulnerabilities and warns about those.

The scripts outputs information about the dependency path that added the
package. If that information is not enough, `yarn why package-name` can
be used to get more detailed information about why the package is
installed.
