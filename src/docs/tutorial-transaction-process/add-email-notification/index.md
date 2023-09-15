---
title: Add a new email notification
slug: add-new-email-notification
updated: 2023-05-31
category: tutorial-transaction-process
ingress:
  Learn how to add a new email notification to the existing transaction
  process.
published: true
---

In this example, we will add a new email notification that will be sent
to the customer when their booking time is approaching. We will edit the
**saunatime-instant-booking** transaction process, which was created in
the earlier part of this tutorial.

## Fetch transaction process

Before we modify our transaction process, it's better to ensure that we
have most the up-to-date version of the process. You can fetch any
process version with flex-cli:

```shell
flex-cli process pull --process=saunatime-instant-booking --alias=release-1 --path=./saunatime-instant-booking --marketplace=saunatime-dev
```

<info>

If you already have a _saunatime-instant-booking_ directory, you can't
pull the process. You need to either change the _--path_ parameter or
use _--force_ flag at the end of the command to overwrite the existing
directory.

</info>

## Create a new email template

When the latest version of the transaction process is pulled, we can
navigate to the
[_templates_ directory](/how-to/edit-email-templates-with-flex-cli/#templates-directory).
We want to add a new directory for the new notification there.

```shell
└── saunatime-instant-booking
    └── templates
        └── booking-reminder-customer
```

### Copy the notification files

Create two files in the new directory with the following file names, and
add the linked contents:

- [booking-reminder-customer-subject.txt](/tutorial-assets/booking-reminder-customer-subject.txt)
  – contains the email message subject line template
- [booking-reminder-customer-html.html](/tutorial-assets/booking-reminder-customer-html.txt)
  – contains the template for the HTML version of the email message

Remember to follow the naming convention where the file ends with
_\*-html.html_ or _\*-subject.txt_. Otherwise, the notification files
will not work.

Templates use the
[Handlebars syntax](/references/email-templates/#handlebars) which will
be rendered as HTML when the email is sent. Handlebars enables adding
variables like recipient name, marketplace name, and transaction details
to the template. You can see all variables that are available in the
[transaction email context reference](/references/email-templates/#transaction-email-context).

At the beginning of the notification file, we define global variables
for managing email texts. After that, the email template format follows
a structure of a standard HTML document. You can add styles with CSS,
edit the structure with HTML, and add text sections and transaction
details by using variables within `{{}}`.

<extrainfo title="Add new text sections in the email template">

You can modify the text content of the emails in Flex Console. However,
if you want to add a completely new text section, you can add it using
the same helper `{{t}}` that is used across the template.

The structure of the helper is as follows:

```handlebars
{{ t
  "TemplateName.MessageKey"
  "Fallback message in case key not found"
  listingFieldVariable=listing.publicData.someListingField
}}
```

So if you want to, for instance, add a description block that refers to
the listing field "brand", you would add the following snippet:

```handlebars
{{ t
  "BookingReminder.BrandDescription"
  "You have booked a {brand} bike!"
  brand=listing.publicData.brand
}}
```

</extrainfo>

## Add new email texts in Console

The email text editor in Console allows operators to change email
template texts without code changes. Since the template we just added
has new email text content, your previews were rendered with the
template fallback values.

To allow making email text changes in this template as well, add the
following email texts into the email text editor:

```json
{
  "BookingReminder.ContactProvider": "If you have questions about your booking, you can contact {providerDisplayName} through the order page.",
  "BookingReminder.ContentForDaily": "You have booked {listingTitle} {dateStart,date,::YYYYMMMd} to {dateEnd,date,::YYYYMMMd}.",
  "BookingReminder.ContentForHourly": "You have booked {listingTitle} from {dateStart,date,::hmmaYYYYMMMd} to {dateEnd,date,::hmmaYYYYMMMd}.",
  "BookingReminder.ContentForNightly": "You have booked {listingTitle} from {dateStart,date,::YYYYMMMd} to {dateEnd,date,::YYYYMMMd}.",
  "BookingReminder.Cta": "View order details",
  "BookingReminder.Subject": "Your booking for {listingTitle} is approaching!",
  "BookingReminder.Title": "Your booking for {listingTitle} is approaching!"
}
```

## Preview your changes

Once we have created the email notification, we can preview them with
**flex-cli**. To preview the changes we just made, we can run the
command:

```shell
flex-cli notifications preview --template saunatime-instant-booking/templates/booking-reminder-customer --marketplace=saunatime-dev
```

You should see the HTML preview of the template in the address
http://localhost:3535. If you make any changes to the template, you can
refresh the browser to reload the template and render a new preview

You can also test sending the preview email:

```shell
flex-cli notifications send --template saunatime-instant-booking/templates/booking-reminder-customer --marketplace=saunatime-dev
```

<info>

The email is sent to the email address of the admin user that was used
in logging in to the CLI.

</info>

You can also modify the email texts in the Console email text editor,
and then use these same preview functionalities to see your no-code
changes.

## Update process.edn

Once we have the new notification files in place, we need to add the
notification to the **process.edn** file. In the _process.edn_ file, all
the notifications are added under the _:notifications_ key. We can use
the _booking-confirmed-customer_ notification as an example.

The _:name_ of the notification should be unique, so we use the name
_booking-reminder-customer_. We want this notification to be sent to the
customer as well, so the _:to_ parameter stays the same. We also want to
make sure that the value of _:template_ is the same as the directory we
created earlier.

We want this notification to be sent two days before the booking starts.
One way to do this would be to add a new automatic transition two days
before the booking start date, and send this notification on the .
Instead, we will use the same _confirm-payment_ transition as in
_booking-confirmed-customer_, but add an _:at_ parameter, where we can
specify the sending time more specifically.

```diff
 :notifications
  [{:name :notification/booking-confirmed-customer,
   :on :transition/confirm-payment,
   :to :actor.role/customer,
   :template :booking-confirmed-customer}
+ {:name :notification/booking-reminder-customer
+  :on :transition/confirm-payment,
+  :to :actor.role/customer
+  :template :booking-reminder-customer
+  :at {:fn/minus
+       [{:fn/timepoint [:time/booking-start]}
+        {:fn/period ["P2D"]}]}}
...
```

## Push process changes

Now that you have edited the email templates, you need to push a new
version of your process. If you have done the earlier parts of the
tutorial, this process should be already quite familiar to you. If you
need more detailed information, take a look at the
[Edit transaction process with Flex CLI tutorial](/how-to/edit-transaction-process-with-flex-cli/#validate-and-push-the-process).

Push the updated process:

```shell
flex-cli process push --process=saunatime-instant-booking --path=./saunatime-instant-booking --marketplace=saunatime-dev
```

Check version number with _process list_ command:

```shell
flex-cli process list --process=saunatime-instant-booking --marketplace=saunatime-dev
```

Update the alias to point to the latest version of the transaction
process:

```shell
flex-cli process update-alias --alias=release-1 --process=saunatime-instant-booking --version=3 --marketplace=saunatime-dev
```

## Summary

In this tutorial, you:

- Created a new email template folder
- Previewed your email template
- Added a new email notification to the transaction process
- Updated the transaction process
