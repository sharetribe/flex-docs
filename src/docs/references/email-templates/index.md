---
title: Email templates
slug: email-templates
updated: 2023-10-24
category: references
ingress:
  Reference documentation for editing built-in or transaction email
  templates.
published: true
---

Sharetribe supports customizing the contents of all the emails that are
sent from the platform.

The platform sends two types of emails:

- **built-in emails** on events like email changed or user joined
- **transaction emails** as notifications as part of the transaction
  process.

The built-in emails can be customized using the
[Built-in email template editor](https://console.sharetribe.com/advanced/email-templates)
in the Sharetribe Console. You find the editor in the Console under
Build section.

To change the transaction emails, follow the
[Edit email templates with Sharetribe CLI](/how-to/edit-email-templates-with-sharetribe-cli/)
tutorial.

## Best practices

In addition to the basic branding of the emails to follow your
marketplace brand and visual guidelines, we recommend that you follow
these best practises for email branding to avoid spam folders:

- Make the email personal, add a starting line with the name of the
  recipient and other distinct elements like the title of the listing.
- Add a common footer to the emails with basic information about your
  marketplace.
- Currently, the emails sent from the platform are purely notifications
  on actions in the marketplace, there isn't a way to unsubscribe from
  these emails, so make sure your users have given consent to receiving
  these emails when registering to the platform.
- Design your emails so that they encourage users to navigate to the
  marketplace and continue the actions there - we don't support e.g.
  responding to messages in the platform through email.

Sharetribe’s email system handles SPF (Sender Policy Framework) and DKIM
(DomainKeys Identified Mail) automatically to improve your email
deliverability.

## Handlebars

The template language used to build the email templates is called
[Handlebars](https://handlebarsjs.com/).

With Handlebars you get direct access to the HTML that will be sent to
your users. The Handlebars template defined by you will be applied to
the email `context`, that contains the data for the email, e.g.
recipient name, marketplace name and all the transaction details such as
booking dates, line items etc. if the email is related to a transaction.
The result of applying the email context to the template is the rendered
HTML that will be sent to your users.

Please read through the [Handlebars](https://handlebarsjs.com/)
documentation for more information about the templating language.

## Helpers

Sharetribe email templating supports a subset of
[Handlebars built in helpers](https://handlebarsjs.com/guide/builtin-helpers.html).

In addition to the built-in helpers, we have implemented a small set of
custom helpers that make e.g. comparisons and number formatting
possible.

The helpers may support positional parameters, hash parameters or both.

For example: `{{helper param-1 param-2 hash-param=value}}`.

Some documentation on the syntax and how to use them can be found in the
documentation for
[Handlebars expressions](https://handlebarsjs.com/guide/expressions.html).

### Built-in helpers

We support the following built-in helpers:

- `each`
- `with`
- `if`
- `unless`

Have a look at the
[Handlebars built-in helpers documentation](https://handlebarsjs.com/guide/builtin-helpers.html)
to see examples how to use them.

In addition to those, we also support
[inline partials](https://handlebarsjs.com/guide/partials.html#inline-partials).

### Custom helpers

This paragraph lists all the custom helpers we provide, including the
parameters they take and example how to use them:

Can't find a helper you are looking for? Let us know!

### `t`

> Params:
>
> - message key
> - fallback message
>
> Hash:
>
> - list of hash parameters and their respective values used with the
>   messages

Example usage:

```handlebars
{{t "BookingNewRequest.Description" "{customerDisplayName} requested to book {listingTitle}
in {marketplaceName}." customerDisplayName=customer.display-name
listingTitle=listing.title marketplaceName=marketplace.name}}
```

Inline helper that makes it possible to modify the email template texts
without making changes in the template code. This helper uses the
[ICU message format](https://unicode-org.github.io/icu/userguide/format_parse/messages/)
to render messages and parameters into a string.

The helper renders the message corresponding to the key, if the key
exists in the [email text asset](/references/assets/). If the key does
not exist, the helper renders the fallback message.

Any hash parameters used inside either message must be wrapped in single
curly brackets, and the values for those hash parameters need to be
defined after the message key and the fallback message.

### `format-text`

> Params:
>
> - message
>
> Hash:
>
> - list of hash parameters and their respective values used with the
>   messages

Example usage:

```handlebars
{{format-text "{amount,number,::.00} {currency}" amount=money.amount currency=money.currency}}
```

Inline helper that formats a text string using the
[ICU message format](https://unicode-org.github.io/icu/userguide/format_parse/messages/).
This helper works similarly to the `t` helper, but instead of accepting
a message key and a fallback message, it accepts a single string.

Any hash parameters used inside either message must be wrapped in single
curly brackets, and the values for those hash parameters need to be
defined after the message.

### `contains`

> Params:
>
> - collection
> - value

Example usage:

```handlebars
{{#contains collection value}}true{{else}}false{{/contains}}
```

Block helper that renders the block if `collection` has the given
`value`, otherwise the else block is rendered (if specified).

### `eq`

> Params:
>
> - value
> - test

Example usage:

```handlebars
{{#eq value 1}}true{{else}}false{{/eq}}
```

Block helper that renders a block if `value` is **equal to** `test`. If
an else block is specified it will be rendered when falsy.

### `inflect`

> Params
>
> - count
> - singular
> - plural

Example usage:

```handlebars
{{inflect quantity "day" "days"}}
```

Returns either the `singular` or `plural` inflection of a word based on
the given `count`.

### `date`

> Params:
>
> - time
>
> Hash:
>
> - format
> - lang: optional, default: "en-US"
> - tz: optional, default "UTC"

Example usage:

```handlebars
{{date d format="d. MMM, YYYY" lang="fi-FI" tz="Europe/Helsinki"}}
```

Renders a properly localized `time` based on the `format`, `lang` and
`tz` hash parameters.

The `format` supports
[Joda-Time formatting](https://www.joda.org/joda-time/key_format.html).

The `lang` supports [IETF BCP 47](https://tools.ietf.org/html/bcp47)
language tag strings. More info about language tags can be found in the
[W3C Internationalization article for language tags](https://www.w3.org/International/articles/language-tags/#region).
E.g. "en-US" is a valid string.

The `tz` supports
[Joda-Time timezones](https://www.joda.org/joda-time/timezones.html).

### `date-day-before`

> Params:
>
> - time
>
> Hash:
>
> - format
> - lang: optional, default `en-US`
> - tz: optional, default "UTC"

Example usage:

```handlebars
{{date-day-before d format="d. MMM, YYYY" lang="fi-FI" tz="Europe/Helsinki"}}
```

Renders a properly localized `time`, one day before the given date,
based on the `format` and `lang` hash parameters.

The `format` supports
[Joda-Time formatting](https://www.joda.org/joda-time/key_format.html).

The `lang` supports [IETF BCP 47](https://tools.ietf.org/html/bcp47)
language tag strings. More info about language tags can be found
[W3C Internationalization article for language tags](https://www.w3.org/International/articles/language-tags/#region).
E.g. "en-US" is a valid string.

The `tz` supports
[Joda-Time timezones](https://www.joda.org/joda-time/timezones.html).

### `date-transform`

> Params:
>
> - date
>
> Hash:
>
> - days

Example usage:

```handlebars
{{format-text "{date,date,::EE}" date=(date-transform date days=-1)}}
```

Can be used with the [format-text](#format-text) helper to transform a
date value to past or future days according to the `days` hash
parameter:

- negative values for transforming to the past of the date
- positive values for transforming to the future of the date

### `money-amount`

> Params:
>
> - money
>
> Hash:
>
> - lang: optional, default "en-US"

Example usage:

```handlebars
{{money-amount m lang="fi-FI"}}
```

Takes money and formats the amount according to the currency.

For example:

- EUR amounts are formatted with 2 decimals
- JPY amounts are formatted with no decimals

Does not output the currency code or symbol, only the amount.

The `lang` supports [IETF BCP 47](https://tools.ietf.org/html/bcp47)
language tag strings. More info about language tags can be found
[W3C Internationalization article for language tags](https://www.w3.org/International/articles/language-tags/#region).
E.g. "en-US" is a valid string.

### `number`

> Params:
>
> - number
>
> Hash:
>
> - lang: optional, default "en-US"
> - max-fraction-digits: optional
> - min-fraction-digits: optional

Example usage:

```handlebars
{{number n lang="fi-FI"}}
```

Formats the given `number`. `lang`, `max-fraction-digits` and
`min-fraction-digits` can be given as hash params."

The `lang` supports [IETF BCP 47](https://tools.ietf.org/html/bcp47)
language tag strings. More info about language tags can be found
[W3C Internationalization article for language tags](https://www.w3.org/International/articles/language-tags/#region).
E.g. "en-US" is a valid string.

### `url-encode`

> Params:
>
> - str

Example usage:

```handlebars
{{url-encode "Share & Tribe"}}
```

URL encodes the given string. Should be used for encoding all user
input. E.g. a link to user profile with the user name in the link should
be encoded.

### `form-encode`

> Params:
>
> - str

Example usage:

```handlebars
{{form-encode "Share & Tribe"}}
```

Encode the given string as application/x-www-form-urlencoded. Should be
used for query string components.

### `asset`

> Params:
>
> - asset path
> - (optional) JSON key or dot-separated nested keys
> - (optional) default value

The helper is used to retrieve data from assets. It can locate values
within nested fields by providing a sequence of keys, separated by dots,
to traverse the JSON structure. For example, the colour of a button in
the email template can be assigned dynamically by accessing the
`design/branding.json` asset. The use of this helper is not limited to
the branding asset – any asset data can be used in the templates.

```handlebars
{{asset "design/branding.json" "marketplaceColors.notificationPrimaryButton" "#007DF2"}}
```

In addition, in the email templates, this helper is used to define the
correct localization settings in the email templates without modifying
the template structure itself:

```handlebars
{{set-translations (asset "content/email-texts.json")}}
{{set-locale (asset "general/localization.json" "locale" "en_US")}}
```

## Editing email content

For both built-in emails and transaction process emails, you can edit
content with the email text editor under Build > Content > Email texts.

## Editing built-in emails

The built-in emails can be customized using the
[Built-in email template editor](https://console.sharetribe.com/advanced/email-templates)
in the Sharetribe Console. You find the editor in the Console under
Build section.

In addition to the code editor that allows you to edit the template, the
editor also contains a **context viewer** that shows you a sample of the
context that will be used with that particular email.

The editor also let's you to see a **preview** of the email before and
let's you **send test emails** to your own email address.

Three of the built-in email templates can be disabled via Console:

- New message
- Verify email address
- User joined

## Editing transaction emails

To understand how to change the transaction emails, see the
[Edit email templates with Sharetribe CLI](/how-to/edit-email-templates-with-sharetribe-cli/)
tutorial.

### Transaction email context

Context for transaction emails:

```json
{
  "recipient": {
    "id": "uuid",
    "first-name": "string",
    "last-name": "string",
    "display-name": "string",
    "private-data": "extended-data",
    "public-data": "extended-data",
    "protected-data": "extended-data",
    "metadata": "extended-data"
  },
  "marketplace": {
    "name": "string",
    "url": "string"
  },
  "recipient-role": "string", // either "provider" or "customer"
  "other-party": {
    "id": "uuid",
    "first-name": "string",
    "last-name": "string",
    "display-name": "string",
    "private-data": "extended-data",
    "public-data": "extended-data",
    "protected-data": "extended-data",
    "metadata": "extended-data"
  },
  "transaction": {
    "id": "uuid",
    "tx-line-items": [
      {
        "code": "string",
        "unit-price": {
          "amount": "decimal",
          "currency": "string"
        } ,
        "line-total":
        {
          "amount": "decimal",
          "currency": "string"
        } ,
        "include-for": {"any-of": ["provider", "customer"]},
        "quantity": "decimal",
        "percentage": "decimal"}
    ],
    "payout-total": {
      "amount": "decimal",
      "currency": "string"
    },
    "booking": {
      "start": "date",
      "end": "date",
      "displayStart": "date",
      "displayEnd": "date",
      "seats": "integer",
      "state": "string"
    },
    "stock-reservation": {
      "quantity": "integer",
      "state": "string"
    },
    "reviews": [
      {
        "content": "string",
        "subject": {
          "id": "uuid",
          "first-name": "string",
          "last-name": "string",
          "display-name": "string",
          "private-data": "extended-data",
          "public-data": "extended-data",
          "protected-data": "extended-data",
          "metadata": "extended-data"
        }
      }
    ],
    "provider": {
      "id": "uuid",
      "first-name": "string",
      "last-name": "string",
      "display-name": "string",
      "private-data": "extended-data",
      "public-data": "extended-data",
      "protected-data": "extended-data",
      "metadata": "extended-data"
    },
    "payin-total": {
      "amount": "decimal",
      "currency": "string"
    },
    "listing": {
      "id": "uuid",
      "title": "string,"
      "availability-plan": {
        "type": "string", // either availability-plan/time or availability-plan/day
        "timezone": "string"
      },
      "current-stock": {
        "quantity": "integer"
      },
      "private-data": "extended-data",
      "public-data": "extended-data",
      "metadata": "extended-data"
    },
    "customer": {
      "id": "uuid",
      "first-name": "string",
      "last-name": "string",
      "display-name": "string",
      "private-data": "extended-data",
      "public-data": "extended-data",
      "protected-data": "extended-data",
      "metadata": "extended-data"
    },
    "delayed-transition": {
      "run-at": "date"
    },
    "protected-data": "extended-data",
    "metadata": "extended-data"
  }
}



```

Inside the templates there are number of properties that you can utilize
when customizing the templates. What properties are available is email
specific and the following data structure describes what resources are
available for each email template.

### How to read the data structure

- The type and content of the property can be deducted from the value of
  the property. E.g.
  `{"marketplace": {"name": "string", "url": "string"}`, is an object
  with properties `name` and `url` that are strings.
- An object with property `"any-of"` describe an array of elements. For
  example, `{"any-of": ["customer", "provider"]}` is an array containing
  one of the values or both.
- Properties of type `"date"` define a date object with properties
  `"year"`, `"month"`, `"day"`, `"hours"`, `"minutes"`, `"seconds"` and
  `"milliseconds"`. It's higly recommended that you use the available
  helpers described above to display dates.
- Objects with the exact two propeties of `"amount"` and `"currency"`
  are of type money, and can be passed as is to `money-amount` helper.
- Properties of type `"extended-data"` define an extended data object.
  Properties in such an object can have any valid JSON values, including
  JSON data structures.
- The listing `availability-plan` property `timezone` is in TZ time zone
  database format, for example "Europe/Berlin". It is only available for
  plans with type `availability-plan/time`.
- Remember to traverse the context properly. For example, in
  `"transaction-transition"` `"payin-total"` is nested under
  `"transaction"`. This means that the correct way to refer to that is
  `transaction.payin-total` or using the
  [builtin **`with`** helper](https://handlebarsjs.com/guide/builtin-helpers.html#with).
