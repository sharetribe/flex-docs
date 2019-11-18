---
title: Edit email templates with Flex CLI
slug: edit-email-templates-with-flex-cli
updated: 2019-11-18
category: tutorials
ingress:
  This tutorial shows you how to edit email templates with Flex CLI.
skills: basic command line, text editing
published: true
---

Flex CLI (Command-line interface) is a tool for changing your
marketplace's advanced configurations such as transaction processes and
email templates.

This tutorial expects that you have already installed Flex CLI and are
logged in with your API key. If not, it's recommended to first read the
tutorial
[Getting started with Flex CLI](/tutorials/getting-started-with-flex-cli/).

We also recommend that you go through the
[Edit transaction process with Flex CLI](/tutorials/edit-transaction-process-with-flex-cli/)
tutorial to understand process pulling, editing, pushing, and alias
handling on a general level.

In this tutorial we make a change to an email template that is used in
sending notifications to your marketplace users as part of your
transaction process. These transaction email template changes are also a
form of process change, and they create a new version of your process.
For email templates not part of your transaction process, see the
[Built-in email templates](https://flex-console.sharetribe.com/email-templates)
page in the Build section of Console.

## Pull existing process

To edit the transaction email templates, you need to pull an existing
process with its templates. First, let's list all the processes of our
`my-test-marketplace` marketplace:

```bash
flex-cli process list -m my-test-marketplace
```

The `process list` command prints out all the processes and their latest
versions. You want to pick the correct process and version from this
list. In this tutorial we will use the `preauth-nightly-booking`
process, version 1.

Let's pull that process version:

```bash
flex-cli process pull --process preauth-nightly-booking --version 1 --path process -m my-test-marketplace
```

This will create a `process/` directory that has all the process files
in it:

- `process.edn` file, which describes the transaction process
- `templates` directory, which contains all the transaction email
  templates for this process

## Templates directory

Let's see what we have in the `process/` directory:

![Process directory contents](./process-dir.png)

If you look at the `:notifications` key in the `process.edn` file, you
will see that the template directories and file names match the
`:template` values in the notifictions:

```clojure
:notifications
 [{:name :notification/new-booking-request,
   :on :transition/confirm-payment,
   :to :actor.role/provider,
   :template :new-booking-request}
  {:name :notification/booking-request-accepted,
   :on :transition/accept,
   :to :actor.role/customer,
   :template :booking-request-accepted}
  ,,,
  {:name :notification/review-by-customer-second,
   :on :transition/review-2-by-customer,
   :to :actor.role/provider,
   :template :review-by-other-party-published}]
```

A template for a notification is a directory that is named after the
`:template` value and contains two files:

- `TEMPLATE_NAME-subject.txt` - holds the mail Subject line template
- `TEMPLATE_NAME-html.html` - contains the template for the HTML version
  of the mail

Both parts are mandatory. All emails that are sent from the marketplace
contain both the HTML and plain text variants and the recipient's mail
client is free to choose which one to visualize and how. The text
version is automatically generated from the HTML template.

### Example

For example, the `:notification/new-booking-request` notifiction:

```clojure
{:name :notification/new-booking-request,
 :on :transition/confirm-payment,
 :to :actor.role/provider,
 :template :new-booking-request}
```

has the following template:

```
new-booking-request/
├── new-booking-request-html.html
└── new-booking-request-subject.txt
```

Note that the template name (e.g. `:new-booking-request`) doesn't have
to match the notification name (e.g.
`:notification/new-booking-request`) as you can share a template with
multiple notifications.

## Email template syntax

Templates use [Handlebars](http://handlebarsjs.com/) syntax.

Example HTML:

```handlebars
{{~#*inline "format-date"~}}
{{date date format="MMM d, YYYY"}}
{{~/inline~}}

<html>
  <body>
    {{#with transaction}}
    <h1>Please respond to a request by {{customer.display-name}}</h1>

    <p>
      Good news! {{customer.display-name}} just requested to book {{listing.title}}
      from {{> format-date date=booking.start}} to {{> format-date date=booking.end}}.
      Here's the breakdown.
    </p>

    ...

    {{/with}}

    <hr />

    <p>
      You have received this email notification because you are a member of {{marketplace.name}}.
      If you no longer wish to receive these emails, please contact {{marketplace.name}} team.
    </p>
  </body>
</html>

```

Variables within `{{ }}` are expanded and escaped, so that they are safe
to place inside HTML content. As seen above, some variables have nested
values, which can be accessed with dot `.` operator.

In the example above, the `#with` block helper is used to access
properties of the email context top level property `transaction`. So
`customer.display-name` within the `{{#with transaction}}` block will
refer to the value of `transaction.customer.display-name` in the email
context.

The template syntax supports conditionals, loops, helpers and other
constructs. For details on the Handlebars constructs and a full
description of the email context, see the
[Email templates](/references/email-templates/) reference.

## Change a template

Let's change the email template for new booking requests.

Open the `new-booking-request/new-booking-request-html.html` file in a
text editor and make a simple change:

```diff
- <h1>Please respond to a request by {{customer.display-name}}</h1>
+ <h1>Please respond to a new booking request by {{customer.display-name}}</h1>
```

When you've made the change, save the file.

## Preview your changes

You can test your changes and templates by previewing or sending a test
email using your local template files. To preview the change above:

```bash
flex-cli notifications preview --template preauth-nightly-booking/templates/new-booking-request -m my-test-marketplace
```

The command will render the given template and open a browser tab with
the output HTML:

![Email preview in a browser](./preview-browser.png)

Note the subject in the tab title. It will also output the rendered text
version to the terminal:

![Email preview in terminal](./preview-terminal.png)

You can now use your normal browser developer tooling to test changes to
the template and verify how the responsiveness of the content works.

If you want to verify the email in various email software, you can also
send the test preview email:

```bash
flex-cli notifications send --template preauth-nightly-booking/templates/new-booking-request -m my-test-marketplace
```

The email is sent to the email address of the admin user that was used
in logging in to the CLI:

![Email preview in inbox](./preview-inbox.png)

### Using custom context variables in templates

As you see from the previews above, the templates are rendered with the
fixed sample context. The `notifications preview` and
`notifications send` commands also support an optional `--context`
option that can be used to pass in a custom context JSON.

You can see the default context JSON here:
[sample-template-context.json](/sample-template-context.json)

To change the data that is used for previews, download the sample JSON
file and make edits to it:

```diff
    "customer" : {
      "id" : "ef7f40d5-da66-489a-957b-641313b68204",
      "first-name" : "Jane",
      "last-name" : "Pritchett",
-     "display-name" : "Jane P",
+     "display-name" : "Mary P",
```

You can then pass the changed context file to the preview command:

```bash
flex-cli notifications preview --template preauth-nightly-booking/templates/new-booking-request --context sample-template-context.json -m my-test-marketplace
```

Now you will see the preview with the context data that you edited:

![Email preview with custom context](./preview-context.png)

You can use the sample JSON file as a base and test how your templates
behave with different content or custom extended data etc.

## Push new version

Now that you have edited the email templates, you need to push a new
version of your process:

```bash
flex-cli process push --path process --process preauth-nightly-booking -m my-test-marketplace
```

You can see the new version in Console or using the `process list`
command:

```bash
flex-cli process list --process preauth-nightly-booking -m my-test-marketplace
```

## Update alias

As you saw from Console or from the `process list` command above, there
isn't an alias pointing to the latest process version. To allow FTW or
other apps to use the new process version through the Marketplace API,
you will need an alias to point to the version.

In the default process there is a `release-1` alias. Let's update that
to point to the new process version:

```bash
flex-cli process update-alias --process preauth-nightly-booking --alias release-1 --version 2 -m my-test-marketplace
```

To see the updated alias, run the `process list` command again:

```bash
flex-cli process list --process preauth-nightly-booking -m my-test-marketplace
```

## Summary

In this tutorial we changed an email template in an existing process. We
then pushed the changes to a new version and updated the alias to point
to that version.

This is the generic workflow to update the notification email contents
that are part of the transaction process of your marketplace.

With this and the
[Edit transaction process with Flex CLI](/tutorials/edit-transaction-process-with-flex-cli/)
tutorial, you now know how to change the transaction process and its
email templates. As a next step, you might want to read the
[Transaction process format](/references/transaction-process-format/)
reference article.
