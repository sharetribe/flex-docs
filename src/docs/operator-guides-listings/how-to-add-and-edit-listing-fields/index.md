---
title: How to add and edit listing fields
slug: how-to-add-and-edit-listing-fields
updated: 2023-04-24
category: operator-guides-listings
ingress:
  You can add custom listing fields to your marketplace from the Listing fields section in Console
published: true
---

## Adding a new field
To add a new field, go to the Listing fields section of your Console account and click on the “+ Add a new custom field” link towards the bottom of the page. 

When creating the field, you have to determine the Field label, the Field ID, and the Field type. Additionally, you can determine whether the field is mandatory and whether it is used as a search parameter or a filter. 

## Mandatory settings

There are 3 mandatory options. 

 - Field label: This is the name of the field. Visible to all users of your marketplace in the listing form, the listing page, and potentially the search page.
 - Field ID: This is the unique identifier of this custom field. It cannot be changed once it has been created, but it won’t be shown to the users. However, it will be displayed in Console, within the listing card, so make sure you add something recognizable. 
 - Field type: You have to choose the type of field that you want to use: Free text, Select one, or Select multiple. For more information on these types [check out the Listing fields article](LINK TO THE BASIC LISTING FIELDS ARTICLE)

## Optional settings

You can determine whether the listing field is mandatory or not and the search settings for the field. 

 - Making a field mandatory: If you select the option to make a field mandatory, listing authors will be required to fill out the free text field or select an option of the “Select” fields before being able to continue the listing creation process. If this option is not enabled, the field can be skipped. 
 - Search settings: You can determine whether the field is used to make discovering the listing easier. Depending on the type of field, these settings would change. 

    - Free text fields: This option allows the system to index the content of the field in keyword search. 
    - Select fields: With Select fields, you can create a filter that uses all the options created as potential filters for your search page. 
You can also define the Filter visibility settings, which define whether the Filter will be a primary or a secondary filter. Learn more about filters in [the understanding filters article](LINK TO THE SEARCH AND FILTERING ARTICLE)


## Field options for Select fields

When you create a “Select” type of field, you will need to add at least one option, and this becomes part of the creation process. When creating an “Option”, you will need to define the Option label and the Option ID. 
Option label: The name of the option, displayed to users in your marketplace. 
Option ID: the unique identifier for the option. It will not be displayed publicly in the marketplace but will be used in Console (and the backend) to identify this specific option, so make it something descriptive enough. 


## Can the default listing fields be removed?

At this moment, it is not possible to remove the default listing fields, like title and description. You can, however, modify the copy text that is displayed to your users [via microcopy editor](LINK TO MICROCOPY EDITOR)
