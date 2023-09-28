---
title: Edit transaction process with Sharetribe CLI
slug: edit-transaction-process-with-sharetribe-cli
updated: 2021-12-23
category: how-to-transaction-process
ingress:
  This tutorial shows you how to edit transaction process with
  Sharetribe CLI. You will learn how to pull process definition, make a
  small change to it and push the change.
skills: basic command line, text editing
published: true
---

Sharetribe CLI (Command-line interface) is a tool for changing your
marketplace's configurations such as transaction processes and email
templates.

<plan tier="extend" feature="Access to Sharetribe CLI"></plan>

This tutorial expects that you have already installed Sharetribe CLI and
are logged in with your API key. It's recommended to first read the
tutorial
[Getting started with Sharetribe CLI](/introduction/getting-started-with-sharetribe-cli/).
If you haven't read
[how transaction processes work in Flex](/concepts/transaction-process/),
it's a good idea to do that before starting this tutorial.

In this tutorial we extend the marketplace review period. After we've
made the change, we'll push the updated transaction process version and
update the existing alias. If you want to create a new transaction
process based on an existing one instead, you can follow these
[instructions to create a new transaction process and alias](/tutorial/create-transaction-process/#create-a-new-process)

Let's get started!

## Pull existing process

<asciinema recording-id="271991"></asciinema>

The first thing to do is to list all the existing processes with CLI
command `process list`.

Remember to include your marketplace ident to the command with the
`--marketplace <marketplace ident here>` options or the short version
`-m <your marketplace ident here>`:

```bash
flex-cli process list -m my-marketplace-dev
```

From the list of processes, pick the one that you want to edit. In this
tutorial we'll use process `default-booking`, version 1. You might have
different processes in your marketplace, so you can use those. However,
you can check the content of this default booking example process online
from
[Flex example processes](https://github.com/sharetribe/sharetribe-example-processes)
Github repository.

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
flex-cli process pull --process default-booking --version 1 --path process -m my-marketplace-dev
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

## Extend the review period

Open the `process.edn` in your favorite editor.

_(To get proper syntax highlighing, you may need to install a plugin to
your editor. edn is subset of Clojure, so a Clojure plugin will give you
proper edn highlighting.)_

From the `process.edn` file, you'll find a map with a key
`:transitions`. The value of the `:transitions` key is a vector of
transition in your marketplace. Each transition contains values for keys
like `:name`, `:actor`, `:actions`, `:to` and `:from`.

To extend the review period in the transaction process, we need to find
the transition where the review periods are defined. In the Flex default
processes, the review period length is defined in the transition
`:transition/expire-review-period`, and if one participant has already
reviewed the other, in either
`:transition/expire-provider-review-period` or
`:transition/expire-customer-review-period`. By default, the review
periods are defined as 7 days.

When you have found the transitions, change the value of the
`:fn/period` in the `:at` time expression to `["P10D"]` to extend the
review period to 10 days.

```diff
 {:format :v3
  :transitions
  [{:name :transition/inquire,
    ...
  {:name :transition/expire-review-period,
   :at
   {:fn/plus
-    [{:fn/timepoint [:time/booking-end]} {:fn/period ["P7D"]}]},
+    [{:fn/timepoint [:time/booking-end]} {:fn/period ["P10D"]}]},
   :actions [],
   :from :state/delivered,
   :to :state/reviewed}
  {:name :transition/expire-provider-review-period,
   :at
   {:fn/plus
-    [{:fn/timepoint [:time/booking-end]} {:fn/period ["P7D"]}]},
+    [{:fn/timepoint [:time/booking-end]} {:fn/period ["P10D"]}]},
   :actions [{:name :action/publish-reviews}],
   :from :state/reviewed-by-customer,
   :to :state/reviewed}
  {:name :transition/expire-customer-review-period,
   :at
   {:fn/plus
-    [{:fn/timepoint [:time/booking-end]} {:fn/period ["P7D"]}]},
+    [{:fn/timepoint [:time/booking-end]} {:fn/period ["P10D"]}]},
   :actions [{:name :action/publish-reviews}],
   :from :state/reviewed-by-provider,
   :to :state/reviewed}
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
flex-cli process push --path process --process default-booking -m my-marketplace-dev
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
flex-cli process list --process default-booking -m my-marketplace-dev
```

You'll see a list of process versions and aliases pointing to them. The
alias always consists of two parts where the first part is the process
name and the second part is the alias name.

You'll also see that the newly created version doesn't have an alias
pointing to it. Let's change that.

In the default process, the name of the existing alias is `release-1`.
The command to update the alias is `process update-alias`:

```bash
flex-cli process update-alias --process default-booking --alias release-1 --version 2 -m my-marketplace-dev
```

This command updates the alias `release-1` to point to `default-booking`
process version `2`.

To verify that the change was successful, you can rerun the
`process list` command and see that the `release-1` alias is now
pointing to the version 2.

**Be careful when updating aliases!** Updating the alias will take the
process changes in use immediately. In case you make changes where you
add/remove/rename states or transitions, updating alias may potentially
break your marketplace front-end if you haven't updated it to work with
the new process.

The review period has now been changed! Next time you initiate a new
transaction with the alias `default-booking/release-1` the review period
is 10 days.

## Summary

In this tutorial we pulled an existing process definition with the Flex
CLI. We extended the review period to 10 days, validated the process
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
[Editing email templates with Sharetribe CLI](/how-to/edit-email-templates-with-sharetribe-cli/)
tutorial guides you through this process.
