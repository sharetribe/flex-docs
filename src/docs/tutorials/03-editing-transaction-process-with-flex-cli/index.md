---
title: Edit transaction process with Flex CLI
slug: edit-transaction-process-with-flex-cli
updated: 2019-10-23
category: tutorials
ingress:
  This tutorial shows you how to edit transaction process with Flex CLI.
  You will learn how to pull process definition, make a small change to
  it and push the change.
skills: basic command line, text editing
published: true
---

Flex CLI (Command-line interface) is a tool for changing your
marketplace's configurations such as transaction processes and email
templates.

This tutorial expects that you have already installed Flex CLI and are
logged in with your API key. It's recommended to first read the tutorial
[Getting started with Flex CLI](/tutorials/getting-started-with-flex-cli/). If you haven't read [how transaction processes work in Flex](/background/transaction-process/), it's a good idea to do that before starting this tutorial.

In this tutorial we change the marketplace commission percantage. After
we've made the change, we'll push the updated transaction process
version and update the existing alias.

Let's get started!

## Pull existing process

<asciinema recording-id="271991"></asciinema>

The first thing to do is to list all the existing processes with CLI
command `process list`.

Remember to include your marketplace ident to the command with the
`--marketplace <marketplace ident here>` options or the short version
`-m <your marketplace ident here>`:

```bash
flex-cli process list -m my-test-marketplace
```

From the list of processes, pick the one that you want to edit. In this
tutorial we'll use process `preauth-nightly-booking`, version 1.

We can pull the process with the `process pull` command. Let's see the
options that the command needs:

```bash
flex-cli help process pull
```

We can see that required options are:

- `--path` the path where the process is saved
- `--process` name of the process
- `--version` or `--alias`. Process version or alias pointing to the
  version that we want to pull
- `--marketplace` the marketplace

Pull the process and save it to `process` directory:

```bash
flex-cli process pull --process preauth-nightly-booking --version 1 --path process -m my-test-marketplace
```

See what's inside the `process` directory:

```bash
ls process
```

(Windows users: use `dir` instead of `ls`)

You can see that there are two items in the directory:

- `process.edn` file, which defines the transaction process
- `templates` directory, which contains all the transaction email
  templates for this process

Next, we're going to edit the process description, but before that...

## A word about edn format

The process description uses a format called **edn**. At first glance it
may seem a bit odd if you haven't seen edn before, but fear not! On
closer look you'll recognize many similarities with JSON format.

Here's a small example of edn:

```clojure
;; This is a comment. Comments in edn start with ";;"
;;

{:number 1 ;; a number, for example `1`, `2.2`, `-500`, `1.23456M`
           ;; (where `M` denotes that exact precision is desired)
 :string "This is a string"
 :boolean true ;; or false
 :keyword :this-is-a-keyword
 :namespaced-keyword :namespaced/keyword
 :vector [1, "abc", false] ;; same as "array" in JSON
 :map {:first-name "John",
       :last-name "Doe",
       :age 55} ;; same as "object" in JSON
}
```

Keywords are used heavily in the process description syntax as keys in
maps as well as enum values. Keywords start with a `:` but are otherwise
similar to strings. Keywords can have a namespace, in which case they
are called qualified keywords, or be plain (unqualified). The part
before `/` is the namespace. So for example, `:actor.role/customer` is a
keyword in the namespace `actor.role`.

Commas (`,`) in edn are optional and often omitted, but can be used for
clarity.

Now that you know the basics of the edn format, let's edit the
`process.edn` file!

## Change the commission

Open the `process.edn` in your favorite editor.

_(To get proper syntax highlighing, you may need to install a plugin to
your editor. edn is subset of Clojure, so a Clojure plugin will give you
proper edn highlighting.)_

From the `process.edn` file, you'll find a map with a key
`:transitions`. The value of the `:transitions` key is a vector of
transition in your marketplace. Each transition contains values for keys
like `:name`, `:actor`, `:actions`, `:to` and `:from`.

To change the commission percentage of the transaction process, we need
to find the transaction where the commission is calculated. The
commission is calculated by an action named
`:action/calculate-tx-provider-commission` (or
`:action/calculate-tx-customer-commission` if customer commission is in
use). In a default `:preauth-nightly-booking` process, the commission in
calculated in transitions `:transition/request-payment` and
`:transition/request-payment-after-enquiry`.

When you have found the actions that calculate commission, change the
value of the `:commission` in the action `:config` to `0.3M` (which
means 30%):

```diff
 {:format :v3
  :transitions
  [{:name :transition/enquire
    :actor :actor.role/customer
    :actions []
    :to :state/enquiry}
   {:name :transition/request-payment
    :actor :actor.role/customer
    :actions [{:name :action/create-booking
               :config {:observe-availability? true}}
              {:name :action/calculate-tx-nightly-total-price}
              {:name :action/calculate-tx-provider-commission
-              :config {:commission 0.1M}}
+              :config {:commission 0.3M}}
              {:name :action/stripe-create-payment-intent}]
    :to :state/pending-payment}
   {:name :transition/request-payment-after-enquiry
    :actor :actor.role/customer
    :actions [{:name :action/create-booking
               :config {:observe-availability? true}}
              {:name :action/calculate-tx-nightly-total-price}
              {:name :action/calculate-tx-provider-commission
-              :config {:commission 0.1M}}
+              :config {:commission 0.3M}}
              {:name :action/stripe-create-payment-intent}]
    :from :state/enquiry
    :to :state/pending-payment}
```

Save the changes you've made to `process.edn` file.

## Validate and push the process

<asciinema recording-id="272227"></asciinema>

After each modification to the `process.edn` file, it's good idea to
validate that the changes are correct. The CLI command `process` can do
this:

```bash
flex-cli process --path process
```

In case the `process.edn` file is valid, you'll see a description of
your process with all the states, transitions and notifications listed.
In case the file is invalid, you'll see a validation error.

Now that we have validated the `process.edn` file we are ready to push
the changes to Flex:

```bash
flex-cli process push --path process --process preauth-nightly-booking -m my-test-marketplace
```

After the process is successfully pushed, you'll see a new process
version in
[Console](https://flex-console.sharetribe.com/transaction-processes).

Please note that pushing the changes to Flex doesn't immediately change
the way how your marketplace works. The existing transactions are still
using the old process version and the new transaction will be using the
old process as long as the existing alias is pointing to it.

So, to take the changes into use, let's update the alias!

## Update alias

<asciinema recording-id="272229"></asciinema>

First, let's see what aliases are pointing to which versions. We can do
this by using the `process list` command with the `--process` option:

```bash
flex-cli process list --process preauth-nightly-booking -m my-test-marketplace
```

You'll see a list of process versions and aliases pointing to them. The
alias always consists of two parts where the first part is the process
name and the second part is the alias name.

You'll also see that the newly created version doesn't have an alias
pointing to it. Let's change that.

In the default process, the name of the existing alias is `release-1`.
The command to update the alias is `process update-alias`:

```bash
flex-cli process update-alias --process preauth-nightly-booking --alias release-1 --version 2 -m my-test-marketplace
```

This command updates the alias `release-1` to point to
`preauth-nightly-booking` process version `2`.

To verify that the change was successful, you can rerun the
`process list` command and see that the `release-1` alias is now
pointing to the version 2.

**Be careful when updating aliases!** Updating the alias will take the
process changes in use immediately. In case you make changes where you
add/remove/rename states or transitions, updating alias may potentially
break your marketplace front-end if you haven't updated it to work with
the new process.

The commission is now changed! Next time you initiate a new transaction
with the alias `preauth-with-booking/release-1` it uses 30% commission.

## Summary

In this tutorial we pulled an existing process definition with the Flex
CLI. We changed the commission percentage to 30%, validated the process
file and pushed it back to Flex. Finally, we updated the alias to point
to the new version.

You know now how to make simple modifications to the process. Have a
look at the
[transaction process format](/references/transaction-process-format/)
reference and the
[transaction process actions](/references/transaction-process-actions/)
reference to read about all the possibilities that transaction process
engine gives to you.

As a next step, you may also to edit the transaction email templates.
[Editing email templates with Flex CLI](/tutorials/edit-email-templates-with-flex-cli/)
tutorial guides you through this process.
