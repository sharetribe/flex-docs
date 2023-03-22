---
title: Flex environments
slug: flex-environments
updated: 2023-03-06
category: concepts-development
ingress:
  What are Flex environments and the differences the three types have.
published: true
---

Flex environments are instances of your own marketplace, but with
different functions. When you first create a Flex account, you have two
environments: Test and Dev. When you are ready to go live, we will
create a third environment: Live.

The environment can be changed from the dropdown in the left corner of
the topbar. Those who have access to multiple organizations can see the
organization dropdown on the right.

// TODO Update screenshot of env selection

<info>

**Organization** and **environment** are terms that are used to
communicate which Flex marketplace you are looking at in Console.

**Organization**: An entity that is created when you first create an
account. This is where you can invite other admin users to work with. An
organization can include multiple environments for different purposes,
but only one live environment.

**Environment**: A marketplace instance within your organization which
can be created for different purposes. There are three different types
of environments: dev, test, and live. You can access them all with the
same Flex account.

</info>

## Environment types

The three environments in Flex each have their own specific purpose.
Each environment should also have its own dedicated client application,
which also follows the purpose of the environment.

### Dev environment

The dev environment is for development purposes. This is where building
your marketplace happens and where you can test the build
functionalities in peace by using test users and
[test credit cards with Stripe](/how-to/set-up-and-use-stripe/).

Even after launching your marketplace, you can continue building new
features in the dev environment without causing disruptions to your test
or live marketplaces. Note that you should not onboard real users or
listings to the dev environment, as they cannot be moved into the live
environment.

### Test environment

The test environment works as a preview environment for Live. Whereas
the dev environment is meant for the developer to make code changes, the
Test environment is meant to reflect the Live environment as accurately
as possible.

Therefore, whenever the development team wants to publish their code
changes, they will test and review them in Dev first, and then copy them
to Test and Live at the same time.

The operator can make no-code changes in the Test environment, and copy
them to Live without needing the developer to intervene. Because Test
and Live are identical, the operator can trust that their changes made
in Test show up correctly when published to Live.

Note that you should not onboard real users or listings to the test
environment, as they cannot be moved into the live environment.

### Live environment

Live environment is where the business happens: here you can onboard
your real customers and listings, and your customers can make real money
transactions.

When the necessary development has been done and your marketplace is
ready for onboarding real users, you can initiate the live environment
setup from Console. This is also the point when you start paying the
Flex subscriptions (see more information about
[Flex pricing](https://www.sharetribe.com/products/flex/#pricing)).

## Workflow between the three environments

In a nutshell, the workflow between the environments is that changes
flow from Dev to Test to Live:

- code changes are made and reviewed in Dev, and get pushed from Dev to
  Test and Live
- no-code changes are made in Test, and get pushed from Test to Live.

[Graph](https://whimsical.com/biketribe-visuals-VvUyPRAiA61oxbdi69Md99)

Code changes include

- client application development, updated through your code repository
- transaction process changes, updated through Flex CLI
- search schema changes, updated through Flex CLI
- asset schema changes, updated through Flex CLI // TODO Check whether
  Dynamic Console is live when Biketribe is published!

No-code changes include

- Microcopy changes in Flex Console
- Pages changes in Flex Console

We recommend that you keep Test and Live environments identical as much
as possible. In other words, push any code changes from Dev to Test and
Live at the same time before making further no-code changes in Test.
This will ensure that your Test environment accurately works as a
preview environment for Live.

## Additional development environments

Depending on your development flow, you might need additional dev
environments for your organization, e.g. for Quality Assurance (QA) or
automated testing. We can include additional environments to your paid
subscription at a price of \$49 per month per environment. To include
additional development environments in your subscription, contact Flex
Support!
