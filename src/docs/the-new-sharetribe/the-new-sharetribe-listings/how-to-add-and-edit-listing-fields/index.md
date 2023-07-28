---
title: How to add and edit listing fields
slug: how-to-add-and-edit-listing-fields
updated: 2023-07-05
category: the-new-sharetribe-listings
ingress:
  Adding new fields can be really intuitive. This article helps clarify
  the settings that you will encounter when adding new fields.
published: true
---

You can add custom listing fields to your marketplace from the Listing
fields section in Console.

## Adding a new field

To add a new field, go to the "Listings -> Listing fields" page of your
Console account and click on the “+ Add a new custom field” link towards
the bottom of the page.

When creating the field, you have to determine the Field label, the
Field ID, and the Field type. Additionally, you can determine whether
the field is mandatory and whether it is used as a search parameter or a
filter.

## Mandatory settings

There are 3 mandatory options.

- Field label: This is the name of the field. Visible to all users of
  your marketplace in the listing form, the listing page, and
  potentially the search page.
- Field ID: This is the unique identifier of this custom field. It
  cannot be changed once it has been created, but it won’t be shown to
  the users. However, it will be displayed in Console, within the
  listing card, so make sure you add something recognizable.
- Field type: You have to choose the type of field that you want to use:
  Free text, Select one, or Select multiple. For more information on
  these types
  [check out the Listing fields article](https://www.sharetribe.com/docs/the-new-sharetribe/listing-fields/)

## Optional settings

You can determine whether the listing field is mandatory or not and the
search settings for the field.

- Making a field mandatory: If you select the option to make a field
  mandatory, listing authors will be required to fill out the free text
  field or select an option of the “Select” fields before being able to
  continue the listing creation process. If this option is not enabled,
  the field can be skipped.
- Search settings: You can determine whether the field is used in the
  search page to make discovering the listing easier. Depending on the
  type of field, the setting that is available differs. Read more about
  [Custom field search settings](https://www.sharetribe.com/docs/the-new-sharetribe/listing-fields/#search-settings).

  - Free text fields: This extra settion allows the system to index the
    content of the field in keyword search.
  - Select fields: With Select fields (either Select one or Select
    multiple), you can create a filter that uses all the options created
    as potential filters for your search page.

  You can also define the Filter visibility settings, which determines
  whether the Filter will be a primary or a secondary filter. Learn more
  about filters in
  [this article about understanding filters](https://www.sharetribe.com/docs/the-new-sharetribe/understanding-filters)

## Field options for Select fields

When you create a “Select” type of field, you will need to add at least
one option, and this becomes part of the creation process. When creating
an “Option”, you will need to define the Option label and the Option
value.

- Option label: The name of the option, displayed to users in your
  marketplace.
- Option value: the unique identifier for the option within this field.
  It will not be displayed publicly in the marketplace but will be used
  in Console (and the backend) to identify this specific option, so make
  it something descriptive enough.

## Can the default listing fields be removed?

At this moment, it is not possible to remove the default listing fields,
like title and description. You can, however, modify the copy text that
is displayed to your users
[via microcopy editor](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-use-microcopy-editor/)
