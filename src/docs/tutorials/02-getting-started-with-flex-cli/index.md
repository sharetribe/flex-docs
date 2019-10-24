---
title: Getting started with Flex CLI
slug: getting-started-with-flex-cli
updated: 2019-09-10
category: tutorials
ingress:
  This tutorial shows you how to get started with the Flex CLI. You will
  learn how to log in with your API key, how to use the help command and
  other basic commands.
skills: basic command line, text editing
published: true
---

<asciinema recording-id="267478"></asciinema>

Flex CLI (Command-line interface) is a tool for changing your
marketplace's advanced configurations such as transaction processes and
email templates.

For this tutorial you should have basic knowledge of command-line and
how to run basic commands.

Let's get started!

## Install Flex CLI

Flex CLI is distributed via
[npmjs](https://www.npmjs.com/package/flex-cli). To install packages
from npmjs, you will need to download and install Node.js development
environment:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/docs/install)

When you have installed Node.js and Yarn, type the following command to
install Flex CLI:

```bash
yarn global add flex-cli
```

To verify that Flex CLI was successfully installed, run:

```bash
flex-cli
```

This command should show you the CLI version and list available
commands.

## Help

<asciinema recording-id="267479"></asciinema>

`flex-cli help` is the command to see the list of available commands:

```bash
flex-cli help
```

In order to see subcommand help, pass the command as an argument for the
`flex-cli help` command. For example, let's see help for command
`login`.

```bash
flex-cli help login
```

## Get an API key

To log in you need to have a personal API key.

To get an API key, log in to Console go to
[Account > API keys](https://flex-console.sharetribe.com/api-keys).

## Log in

<asciinema recording-id="267480"></asciinema>

After you've received [your API key](#get-an-api-key), you can log in
with `flex-cli login` command. First, let's see help for the login
command:

```bash
flex-cli help login
```

You can see that the command does not require any additional options. So
let's run it:

```bash
flex-cli login
```

The command will prompt you your API key.

After successful log in, you will be greeted by your admin email
address.

Once logged in, you can work with any marketplace that you have been granted
access to.

## List processes and process versions

<asciinema recording-id="267481"></asciinema>

Now that you have successfully logged in and know how to use the `help`
command, let's use CLI to list processes and process versions in your
marketplace.

The command to list processes is `process list`. Let's see the help
first:

```bash
flex-cli help process list
```

As you can see, the command requires `MARKETPLACE IDENT` option. You can
use either the long form `--marketplace <marketplace ident here>` or
short form `-m <marketplace ident here>`. Optionally the command takes
`--process PROCESS NAME` parameter to get detailed information about a
single process.

Let's list all the processes:

```bash
flex-cli process list -m my-test-marketplace
```

This command shows you a list of transaction processes in your
marketplace.

## Summary

In this tutorial, we installed Flex CLI, logged in using an API key and
tried some example commands. In addition, we familiarized ourselves with
the `help` command that is the main source of documentation for the Flex
CLI.

Now that we know how to list processes, the next this is to
[make a small change to the existing process](/tutorials/edit-transaction-process-with-flex-cli/).
