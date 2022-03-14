---
title: Add a new email notification
slug: add-new-email-notification
updated: 2020-07-21
category: tutorial-transaction-process
ingress:
  Learn how to add a new email notification to the existing transaction
  process.
published: true
---

In this example, we will add a new email notification which will be sent
to the customer when a new booking request has been made. We will edit
the **cottagedays-daily-booking** transaction process which was created
in the earlier part of this tutorial.

## Fetch transaction process

Before we modify our transaction process, it's better to ensure that we
have most the up-to-date version of the process. You can fetch any
process version with flex-cli:

```shell
flex-cli process pull --process=cottagedays-daily-booking --alias=release-1 --path=./cottagedays-daily-booking --marketplace=cottagedays-test
```

> **Note**: If you already have _cottagedays-daily-booking_ directory
> you can't pull the process. You need to either change the --path
> parameter or use _--force_ flag at the end of the command to overwrite
> the existing directory.

## Create a new email template

When the latest version of the transaction process is pulled, we can
navigate to the
[_templates_ directory](/howto-messaging/edit-email-templates-with-flex-cli/#templates-directory).
We want to add a new directory for the new notification there. Because
the new notification will be somewhat similar to the existing
**new-booking-request** notification, we can use that directory as a
starting point.

### Copy the notification

You can use the following command to copy the contents of the
_new-booking-request_ directory to a new
_new-booking-request-for-customer_ directory.

```shell
cp -r new-booking-request new-booking-request-for-customer
```

### Rename notification files

Now you can see that inside _new-booking-request-for-customer_ directory
there are two files:

- _new-booking-request-subject.txt_ - holds the mail Subject line
  template
- _new-booking-request-html.html_ - contains the template for the HTML
  version of the mail

We need to rename these files to:

- _new-booking-request-for-customer-html.html_
- _new-booking-request-for-customer-subject.txt_.

Remember to follow the naming convention where the file ends with
_\*-html.html_ or _\*-subject.txt_. Otherwise, the notification files
will not work.

### Edit the notification

Because we want to send the new-booking-request-for-customer
notification as a confirmation to the customer, we want to do some small
changes to the subject line in the
_new-booking-request-for-customer-subject.txt_ file:

```diff
- {{transaction.customer.display-name}} has requested to book {{transaction.listing.title}}
+ You have requested to book {{transaction.listing.title}}
```

Next, we will edit the actual content of the email notification in the
_new-booking-request-for-customer-html.html_ file.

Templates are using
[Handlebars syntax](/references/email-templates/#handlebars) which will
be rendered as HTML when the email is sent. Handlebars enables adding
variables like recipient name, marketplace name, and transaction details
to the template. You can see all variables that are available in
[transaction email context reference](/references/email-templates/#transaction-email-context).

At the beginning of the notification file, we define helper functions
for formatting money and date values. After that, the email template
format follows a structure of a standard HTML document. You can add
styles with CSS, edit the structure with HTML, and add transaction
details by using variables within `{{}}`.

For example, the notification code could look like this:

<!-- prettier-ignore -->
```html
{{~#*inline "format-money"~}}
{{money-amount money}}
{{money.currency}}
{{~/inline~}}

{{~#*inline "format-date"~}}
{{date date format="MMM
d,YYYY" tz="Etc/UTC"}}
{{~/inline~}}

<html>
  <head>
    <style type="text/css">
      .email-title {
        color: #2f880a;
      }
    </style>
  </head>
  <body>
    {{#with transaction}}
    <h1 class="email-title">
      You have requested to book {{listing.title}}
    </h1>

    <p>
      Your booking request for {{listing.title}} from {{> format-date
      date=booking.start}} to {{> format-date date=booking.end}} is now
      waiting for provider to accept it.
    </p>

    <p>
      The request will be accepted by {{> format-date
      date=delayed-transition.run-at}}. Otherwise the request will be
      expired and the money you paid will be refunded to you. The
      provider can also decline the booking.
    </p>

    <p>
      <a href="{{marketplace.url}}/order/{{url-encode id}}/details"
        >Check the booking details here</a
      >
    </p>

    {{/with}}

    <hr />

    <p>
      You have received this email notification because you are a member
      of {{marketplace.name}}. If you no longer wish to receive these
      emails, please contact {{marketplace.name}} team.
    </p>
  </body>
</html>
```

## Preview your changes

Once we have done changes to the email notifications we can preview them
with **flex-cli**. To preview the changes we just made, we can run the
command:

```shell
flex-cli notifications preview --template cottagedays-daily-booking/templates/new-booking-request-for-customer --marketplace=cottagedays-test
```

You should see the HTML preview of the template in the address
http://localhost:3535. If you do any changes to the template, you can
refresh the browser to reload the template and render a new preview

You can also test sending the preview email:

```shell
flex-cli notifications send --template cottagedays-daily-booking/templates/new-booking-request-for-customer --marketplace=cottagedays-test
```

> **Note:** The email is sent to the email address of the admin user
> that was used in logging in to the CLI

## Update process.edn

Once we have the new notification files in place, we need to add the
notification to the **process.edn** file. In the _process.edn_ file all
the notifications are added under the _:notifications_ key. We can use
the _new-booking-request_ notification as an example again.

The _:name_ of the notification should be unique so we use the name
_new-booking-request-for-customer_. We want this notification to be sent
when _:transition/confirm-payment_ happens which is at the same time as
the provider gets new-booking-request notification. We want this
notification to be sent to customer so we choose that as an actor for
_:to_ parameter. Last, we need to make sure that the value of
_:template_ is the same as the directory we created earlier.

```diff
 :notifications
  [{:name :notification/new-booking-request
    :on :transition/confirm-payment
    :to :actor.role/provider
    :template :new-booking-request}
+  {:name :notification/new-booking-request-for-customer
+   :on :transition/confirm-payment
+   :to :actor.role/customer
+   :template :new-booking-request-for-customer}
...
```

## Push process changes

Now that you have edited the email templates, you need to push a new
version of your process. If you have done the earlier parts of the
tutorial this process should be already quite familiar to you. If you
need more detailed information take a look at the
[Edit transaction process with Flex CLI tutorial](/howto-transaction-process/edit-transaction-process-with-flex-cli/#validate-and-push-the-process).

Push the updated process:

```shell
flex-cli process push --process=cottagedays-daily-booking --path=./cottagedays-daily-booking --marketplace=cottagedays-test
```

Check version number with _process list_ command:

```shell
flex-cli process list --process=cottagedays-daily-booking --marketplace=cottagedays-test
```

Update the alias to point to the latest version of the transaction
process:

```shell
flex-cli process update-alias --alias=release-1 --process=cottagedays-daily-booking --version=3 --marketplace=cottagedays-test
```
