---
title: Tutorial step 4 – Create listing fields
slug: tutorial-listing-fields
updated: 2023-06-01
category: the-new-sharetribe-tutorial
ingress:
  In this step we will decide what data is collected when a listing is
  created, and add a couple of search filters based on this data.
published: true
noindex: true
---

Listing fields refer to the form fields a provider needs to fill in when
creating a listing. Each listing has a set of default fields, like
title, description and price. The exact set of default fields is
determined by the transaction process chosen when
[determining listing type](./tutorial-listing-type).

In addition to the default fields, you can add a number of custom
fields. These allow you to decide exactly what data is collected when a
listing is created. You can also create search filters based on these
fields.

Let's create some custom fields. Click "Custom fields" from the
navigation on the left. There we see several fields, but these are very
Biketribe-specific. Let's delete them all, except "Category". You can
delete a field by clicking the three dots on the right and selecting
"Delete listing type" from the menu that opens up.

We want to keep "Category" but repurpose it to be about saunas. Open the
"Category"

### Field label

Field label is displayed in the marketplace next to the form field.

**Keep "Category"**

- Field label: Category
- Field id: category
- Field type: Select one Make this field mandatory by checking the box
  labeled “This field is mandatory”.
- Field Options:
- Choose the first tab of the field options to open it. Set the option
  label to Electric Sauna and the option id as electricsauna.
- In the second tab of field options, set the option label to Wooden
  Sauna and the option id as woodensauna.
- Add a new option by clicking “+ Add a new option”. Set the third
  option label to Smoke Sauna and option id as smokesauna.
- Search settings: check “Add a filter to Search Page”. Select the
  option to“Use as a primary search filter”

Save changes.

### 2. Add listing fields

Add one more listing field. These fields will have the following
settings:

- Field label: Sauna amenities
- Field id: amenities
- Field type: Select multiple Make this field mandatory
- Field Options: Add multiple field options. For each field option, add
  an option id that corresponds to the field label. Use the following
  field labels:

  Towels Bathroom Own drinks allowed Swimming Pool Jacuzzi Own Food
  Allowed Barbeque Audiovisual entertainment

- Search settings: Check the box to “Add a filter to Search Page”.
  Select the option to “Use as a secondary search filter,”

Save the changes.

### 3. Add extra optional fields

You can add the following fields. If you add them, your listings will be
more complete and you can experiment with more listing field functions,
but it will take a bit more time [to create a listing](LINK TO THE
CREATE A LISTING ARTICLE IN THE TUTORIAL):

- Field label: Sauna privacy
- Field id: sauna-privacy
- Field type: Select one Don’t make this field mandatory
- Field Options: For the field options (with a corresponding option id),
  add:
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

You need to save the changes that you made on this page in order to
activate them. If you get an error when trying to save, check the error
message on the page. It should be easy to pinpoint and fix it.
