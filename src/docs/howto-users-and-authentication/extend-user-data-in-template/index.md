---
title: Extend user data in Sharetribe Web Template
slug: extend-user-data-in-template
updated: 2024-04-24
category: how-to-users-and-authentication
ingress:
  This guide describes how to use extended data to expand the user data
  model in Sharetribe Web Template.
published: true
---

This guide shows you how to expand the user data model in your
marketplace. We'll have a look on how the user can be configured so that
the data gets added, and how it can then be presented.

Adding new attributes to the data model relies on
[extended data](/references/extended-data/). In Sharetribe Web Template,
starting from release
[v5.0.0](https://github.com/sharetribe/web-template/releases/tag/v5.0.0),
top-level user extended data can be configured in the
[configUser.js](https://github.com/sharetribe/web-template/blob/main/src/config/configUser.js)
file.

```shell
└── src
    └── config
        └── configUser.js
```

<info>

Settings configured in local configurations files are overridden by any
fetched via the Asset Delivery API. You can refer to
[this article](/template/hosted-and-local-configurations/) to modify the
way your template merges local and hosted configurations.

</info>

Configuring the user data this way allows you to

- declare the attribute and its possible values
- show the attribute selection inputs in the signup page and profile
  settings page, and
- optionally show public attribute values on the user's profile page

## Add a new top-level attribute

Let's extend the default user data by adding an attribute 'accessories'
to show what accessories are included. The full configuration looks like
this:

```js
{
  key: 'additionalServices',
  scope: 'public',
  schemaType: 'boolean',
  saveConfig: {
    label: 'Do you offer other services besides bike rentals?',
    displayInSignUp: true,
    isRequired: true,
    placeholderMessage: 'Select...',
  },
  showConfig: {
    label: 'Do you offer other services besides bike rentals?',
    displayInProfile: true,
  },
  // If you have defined user types in your custom code, you can limit
  // individual user fields to specific user types:
  // userTypeConfig: {
  //   limitToUserTypeIds: false,
  //   userTypeIds: ['a', 'b', 'c'],
  // },
},
```

### Declaring the attribute and its possible values

Extended data attributes in the _configUser.js_ file need to be defined,
at minimum, by **key**, by **scope**, and by **schemaType**.

```js
  key: 'additionalServices',
  scope: 'public',
  schemaType: 'boolean',
```

This attribute is defined as **public**, so it will be saved into the
user's profile as **publicData.additionalServices**. The **schemaType**
attribute determines the shape of the data being saved:

- **enum** attributes are saved as a single string value from a list of
  predefined options
- **multi-enum** attributes are saved as an array of string values from
  a list of predefined options
- **boolean** attributes are saved as **true** or **false** boolean
  values
- **long** attributes are saved as long i.e. as an 8-byte whole number
- **text** attributes are saved as a single text entry

If the schema type is **enum** or **multi-enum**, you will need to
define an array of **enumOptions** for the attribute. This allows the
user profile page and signup page to show the options when your user
creates or edits their profile.

### Configuring the profile settings page and signup page

The _ProfileSettingsPage_ and _AuthenticationPage_ are configured to
show specific inputs for specific schema types. This means that you only
need to configure how the attribute shows up in the panel.

By default, all user fields are shown on both the profile settings page
and the authentication page. If you want to hide a field from the signup
page, you will need to set **displayInSignup** as _false_.

You can separately determine the label for editing the attribute and
displaying the attribute. You can also set the attribute as required.

```js
  saveConfig: {
    label: 'Do you offer other services besides bike rentals?',
    displayInSignUp: true,
    isRequired: true,
    placeholderMessage: 'Select...',
  },
```

### Configuring the profile page

The configuration for showing top-level extended data on the profile
page is straightforward. By default, all public user config attributes
with a **showConfig.label** are shown on the user's public profile page,
but by setting **displayInProfile** to **false** on an attribute with
schema type _enum_, _long_, or _boolean_, you can hide the attribute
from the Details section on the profile page.

```js
showConfig: {
  label: 'Do you offer other services besides bike rentals?',
  displayInProfile: true,
},
```

And that is it! With this configuration, the attribute can be added to
the user's profile on authentication page or profile settings page, and
shown on the user's profile page.
