---
title: Update your email templates to use email texts
slug: update-email-texts
updated: 2024-05-17
category: how-to-content
ingress:
  Sharetribe email notifications support using hosted assets to modify
  the email texts. This article explains how to take this feature into
  use for marketplaces started before this feature was released.
published: true
---

Since 10/2023, new marketplaces have supported modifying email texts in
Console without modifying the email template code. If your marketplace
was started before that, there are some changes you need to make in your
email templates to take this feature into use.

## Transaction process notifications

The easiest way to take these changes into use is to update your
transaction process, or its notifications, to the
[newest version](https://github.com/sharetribe/web-template/tree/main/ext/transaction-processes).

If your marketplace transaction processes and notifications have a lot
of customizations, you may need to update the notifications manually to
use the translations syntax. In that case, you’d need to evaluate
whether the manual work is worth the effort.

### How to update your transaction process notifications manually

1. Before <html> in each template, add the following lines

```handlebars
  {{set-translations (asset "content/email-texts.json")}}
  {{set-locale (asset "general/localization.json" "locale" "en_US")}}
  {{set-timezone transaction.listing.availability-plan.timezone}}
```

2. Replace the text elements with the usage of the `{{t}}` helper with
   the following syntax:

```html
<!-- original message -->
<p>{{ marketplace.name }} fee</p>

<!--  becomes {{t "templatename.messagekey" "fallbackmessage" variableName1=variableValue1 variableName2=variableValue2... }} -->

<p>
  {{t "BookingNewRequest.MarketplaceFeeLabel" "{marketplaceName} fee"
  marketplaceName=marketplace.name}}
</p>
```

3. For the subject line files, you also need to set translations and
   replace the existing syntax with the `{{t}}` helper

```
## original message
{{transaction.customer.display-name}} has requested to book {{transaction.listing.title}}

## becomes
## {{set-translations (asset "content/email-texts.json")}}
## {{t "templatename.messagekey" "fallbackmessage" variableName1=variableValue1 variableName2=variableValue2...}}
{{set-translations (asset "content/email-texts.json")}}{{t "BookingNewRequest.Subject" "{customerDisplayName} requested to book {listingTitle}" customerDisplayName=transaction.customer.display-name listingTitle=transaction.listing.title}}
```

4. Add the email text keys and values to the email texts editor. You can
   use variables defined for the corresponding key within the
   translation helper function.

```json
{
...,
 "BookingNewRequest.MarketplaceFeeLabel": "{marketplaceName} fee",
 "BookingNewRequest.Subject": "{customerDisplayName} requested to book {listingTitle}",
...
}
```

Do note that transaction process updates, including notification
updates, only apply for transactions started with the updated process.
In other words, email texts are not applied to transactions started with
a process that does not have these changes.

## Built-in email notifications

You can update your built-in email notifications from
[this repository](https://github.com/sharetribe/built-in-email-templates).
As with transaction process notifications, if you have a lot of
customizations, you might need to update the notifications manually to
use the translations syntax, and you’d need to evaluate whether the
manual work is worth the effort.

### How to update your built-in notifications manually

1. Before <html> in each template, add the following lines

```handlebars
  {{set-translations (asset "content/email-texts.json")}}
  {{set-locale (asset "general/localization.json" "locale" "en_US")}}
```

2. Replace the text elements with the usage of the `{{t}}` helper with
   the following syntax:

```html
<!-- original message -->
<h1>Hi {{recipient.first-name}}, welcome to {{marketplace.name}}!</h1>

<!-- becomes {{t "templatename.messagekey" "fallbackmessage" variableName1=variableValue1 variableName2=variableValue2... }} -->
<h1>
  {{t "UserJoined.Greeting" "Hi {firstName}, welcome to
  {marketplaceName}!" firstName=recipient.first-name
  marketplaceName=marketplace.name}}
</h1>
```

3. For the subject line files, you also need to set translations and
   replace the existing syntax with the {{t}} helper

```
## original message
Welcome to {{marketplace.name}}

## becomes
## {{set-translations (asset "content/email-texts.json")}}
## {{t "templatename.messagekey" "fallbackmessage" variableName1=variableValue1 variableName2=variableValue2...}}

{{set-translations (asset "content/email-texts.json")}}{{t "UserJoined.Subject" "Welcome to {marketplaceName}" marketplaceName=marketplace.name}}
```

4. Add the email text keys and values to the email texts editor. You can
   use variables defined for the corresponding key within the
   translation helper function.

```json
{
...,
  "UserJoined.Greeting": "Hi {firstName}, you are welcome to {marketplaceName}!",
  "UserJoined.Subject": "Welcome to {marketplaceName}",
...
}
```

With the built-in templates, it is extra important to first test your
changes in Dev or Test before applying them to Live, because the changes
are applied immediately and they are not reversible.

Similarly to transaction process notifications, though, any changes to
the new-message template are applied only on transactions started after
the changes – all transactions started before the changes continue to
use the new-message template that was active when the transaction was
initiated.
