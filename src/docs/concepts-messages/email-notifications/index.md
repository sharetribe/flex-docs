---
title: Email notifications
slug: email-notifications
updated: 2023-10-24
category: concepts-messages
ingress:
  Email notifications are messages users receive when something
  important happens on the marketplace (e.g., the user has received a
  message or a payment on the platform). Notifications get delivered via
  email.
published: true
---

Sharetribe sends email notifications to users when specific events occur
in your marketplace. There are two categories of email notifications in
Sharetribe: built-in email notifications, which relate to user account
management, and transaction process emails, which get triggered at
specific stages of transactions. For instance, an built-in email
notification gets sent when a user changes their email or password or
when they need to verify a new email address. A transaction process
email can inform the user of a successful payment or a new booking
request.

## Enable email notifications

Email notifications are automatically enabled in your test and dev
marketplaces. However, in your Live marketplace, you must
[configure outgoing email settings](/how-to/set-up-outgoing-email-settings/)
for email notifications to work.

Users will not receive email notifications until they have verified
their email address. Sharetribe does not send emails to unconfirmed
addresses to avoid people flagging those as spam emails, as that can
hurt your marketplace's ability to send mail to legitimate users.

You can disable some email notifications through Console.

## Built-in email notifications

There are ten built-in email notifications, related to end-users'
account management, permissions, and listings approval. Use the
[Console](https://console.sharetribe.com/) to manage the built-in email
notifications.

You can edit the built-in email content with the Email texts editor in
Console > Build > Content > Email texts.

You can preview and customise built-in emails using the
[Built-in email notifications editor](https://console.sharetribe.com/advanced/email-notifications)
in the Sharetribe Console. You can find the editor in Console under the
Build > Advanced > Email notifications section.

These built-in email notifications can be disabled through Console:

- Listing approved
- New message
- User approved
- User joined
- User permissions changed
- Verify email address

The email templates use the
[Handlebars template language](/references/email-templates/#handlebars).
The most prominent use of the handlebar templates is the `t` helper,
which is used to render the template content. The helper renders either
the message denoted by a message key, or a fallback message.

```
{{t "ResetPassword.MembershipParagraph" "You have received this email notification
because you are a member of {marketplaceName}. If you no longer wish to receive
these emails, please contact {marketplaceName} team." marketplaceName=marketplace.name}}
```

In each template, you can use a set of predefined context variables
(such as the name and email of the recipient). You can find all context
variables to the right of the built-in email template editor. You can
access user extended data through the context variables, if you want to
customise email content further.

You can edit the text content of email notifications in Console >
Build > Content > Email texts. You can preview the built-in emails, and
customise their structure,using the
[Built-in email template editor](https://console.sharetribe.com/email-templates)
in the Sharetribe Console. You can find the editor in the Console under
the Build > Advanced section.

The built-in email template editor does not include a visual editor, but
if you want, you can design your email in any
[WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) email editor you find
online and paste the resulting HTML into the built-in email editor. You
can then preview the email by sending it to your email address by
clicking on "preview" and pressing on the "Send a test email" button.

For more information on how to use the Handlebars to customise email
templates, see our
[reference article on email templates](/references/email-templates/#handlebars).

## Transaction notifications

Transaction notifications inform the user of events related to the
[transaction process](/concepts/transaction-process/). These
notifications usually relate to information about bookings and payments,
in contrast to built-in email notifications, which are typically
actionable and related to account management.

You can edit the content of the transaction notifications in Console >
Build > Content > Email texts. You can preview your changes, as well as
update message keys and add or delete transaction notifications, with
the
[Sharetribe CLI](/how-to/edit-transaction-process-with-sharetribe-cli/).

The
[template sub-directory](https://github.com/sharetribe/example-processes/tree/master/default-booking/templates)
in the transaction process directory contains all the transaction
notification email templates. All transaction notifications use the
[Handlebars templating language](/references/email-templates/#handlebars)
and can be edited similarly to built-in email templates.

In addition to making changes to the content of the transaction
notifications, you can change
[when email notifications get sent](/references/transaction-process-time-expressions/).
A transaction notification must always be associated with a specific
transition. When a specific transition transitions, the transaction
notification associated with it is triggered.

Read more about transaction notifications in our
[tutorial on how to add new email notifications](/tutorial/add-new-email-notification/).

## Custom notifications through Zapier

Sometimes the built-in and transaction notifications are not enough, and
you might need more control over what triggers an email. Examples
include notifying your marketplace operators when a user submits a
listing for review or sending a provider an email once their listing is
published. As neither of these actions is transaction related, you can
not trigger them as transaction notifications. Instead, you must listen
to events and trigger an email to respond to the correct event.

For building custom email notifications, we recommend connecting your
app to Zapier. You can use Zapier to listen for events in your
marketplace and react to them using different actions. Zapier also
supports sending text messages instead of emails. Read more about Zapier
in our
[Help Center](https://www.sharetribe.com/help/en/collections/8975364).

If you are unsure how to approach a Zapier integration, do not hesitate
to reach out to our support team through one of our
[official support channels](https://www.sharetribe.com/help/en/). We
will be happy to help you figure out your specific use case and give you
some suggestions for implementation.
