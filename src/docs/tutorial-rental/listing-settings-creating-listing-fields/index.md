---
title: Listing Settings - Creating listing fields.
slug: creating-listing-fields
updated: 2023-06-01
category: tutorial-rental
ingress: In this segment of the tutorial, we will be tailoring various aspects of the marketplace to align with Saunatime's listing requirements and user information preferences.  
published: true
---

Our focus will be on ensuring that users have an easy time both when listing a sauna and when browsing saunas for rent, providing all the details they would typically wish to include or discover.

## Listing fields
Go to **Build → Content → Listing fields**. On the listing fields page, select “+ Add a new listing field.”

Open the tab labeled “unknown-id” and fill in the field settings as follows:

Delete all the listings fields except the one called “Category”.

Open the Category field

### 1. Add a Category field / Edit the category field

 - Field label: Category
 - Field id: category
 - Field type: Select one 
Make this field mandatory by checking the box labeled “This field is mandatory”.
 - Field Options: 
  - Choose the first tab of the field options to open it. Set the option label to Electric Sauna and the option id as electricsauna. 
  - In the second tab of field options, set the option label to Wooden Sauna and the option id as woodensauna. 
  - Add a new option by clicking “+ Add a new option”. Set the third option label to Smoke Sauna and option id as smokesauna.
 - Search settings: check “Add a filter to Search Page”. Select the option to“Use as a primary search filter”

Save changes. 

### 2. Add listing fields

Add one more listing field. These fields will have the following settings: 

 - Field label: Sauna amenities
 - Field id: amenities
 - Field type: Select multiple
Make this field mandatory
 - Field Options: Add multiple field options. For each field option, add an option id that corresponds to the field label. Use the following field labels: 

    Towels
    Bathroom
    Own drinks allowed
    Swimming Pool
    Jacuzzi
    Own Food Allowed
    Barbeque
    Audiovisual entertainment

 - Search settings: Check the box to “Add a filter to Search Page”. Select the option to “Use as a secondary search filter,” 

Save the changes. 

### 3. Add extra optional fields
You can add the following fields. If you add them, your listings will be more complete and you can experiment with more listing field functions, but it will take a bit more time [to create a listing](https://www.sharetribe.com/docs/operator-guides/creating-your-first-listing): 

 - Field label: Sauna privacy
 - Field id: sauna-privacy
 - Field type: Select one
Don’t make this field mandatory
 - Field Options: For the field options (with a corresponding option id), add:
   - Private house/flat
   - Student building
   - Local/community owned
   - Public
 - Search settings: Don’t add a filter to the search page. 

 - Field label: Sauna capacity
 - Field id: saunacapacity
 - Field type: Free text (we’ll make this field mandatory). 
 - Search settings: Don’t check “Include this field in keyword search”.

### Save changes
You need to save the changes that you made on this page in order to activate them. If you get an error when trying to save, check the error message on the page. It should be easy to pinpoint and fix it.

