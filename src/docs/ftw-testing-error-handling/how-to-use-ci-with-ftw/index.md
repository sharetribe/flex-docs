---
title: Continuous integration
slug: how-to-use-ci-with-template
updated: 2023-01-01
category: template-testing-error-handling
ingress:
  This guide describes how the Continuous Integration (CI) setup works
  in the Sharetribe Web Template and how to enable it.
published: true
---

The Sharetribe Web Template provides a configuration to use
[CircleCI](https://circleci.com/) as a continuous integration server to
run tests and other scripts. Continuous integration prevents deploying
changes that break tests or fail audits.

You can use the
[.circleci/config.yml](https://github.com/sharetribe/web-template/blob/main/.circleci/config.yml)
file to configure CircleCI.

## Enabling continuous integration

Follow the
[Setting up Your Build on CircleCI](https://circleci.com/docs/2.0/getting-started/#setting-up-circleci)
instructions in the CircleCI documentation.

## Continuous integration in the Sharetribe Web Template

Enabling continuous integration will allow you to run the following
scripts:

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

The script outputs information about the dependency path that added the
package. If that information is not enough, `yarn why package-name` can
be used to get more detailed information about why the package is
installed.
