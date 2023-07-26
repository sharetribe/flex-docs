---
title: Tutorial step 5 – Create listing fields
slug: tutorial-listing-fields
updated: 2023-07-05
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
[determining listing type](/the-new-sharetribe/tutorial-listing-type/).

In addition to the default fields, you can add a number of custom
fields. These allow you to decide exactly what data is collected when a
listing is created. You can also create search filters based on these
fields.

Let's create some custom fields. Click "Listings → Listing fields" from
the navigation on the left. There we see several fields, but these are
very Biketribe-specific. Let's delete them all. Instead, we will create
the following new fields:

- Sauna type. Is it an Electic sauna, a Smoke sauna, or a Wooden sauna?
- Amenities. What extras are included? Are towels, swimsuits etc
  provided?
- Sauna rules. Are there any specific things someone booking the sauna
  should keep in mind?

Let's start with sauna type. Click "Add a new listing field", and click
open the newly created field.

### Field settings

#### Field label

Field label is displayed in the marketplace next to the form field.

**Write "Sauna type"**

#### Field ID

Field ID is a unique identifier that is stored in the data of the
listing. While the label can be changed, you should not change the field
ID after listings have been created with it, as the old listings will
retain the old ID. Field ID should not contain spaces or special
characters.

**Write "saunaType"**

#### Field type

Field type determines how the field works. In this case, we want each
sauna to have exactly one type, and it should be chosen from a
predefined list of types.

**Choose "Select one"**

#### This field is mandatory

We want every sauna to have a sauna type.

**Check the checkbox**

### Field options

Here we define the different options for the sauna type. Click open the
first option.

#### Option label

Just like fields, options have labels.

**Write "Electric sauna"**

#### Option value

Option value is a bit like Field ID: it's an identifier stored in the
listing data. No spaces or special characters allowed.

**Write "electricSauna"**

Now edit the second option. For the label, put "Wooden sauna" and for
the value "woodenSauna".

Let's add one more option. Click "Add a new option". Add "Smoke sauna"
as the label and "smokeSauna" as the value.

### Search settings

We can create a filter for our "Select one" field for search page. Let's
do that, so people searching for smoke saunas can filter out the rest.

**Check the checkbox**

#### Filter placement

Most important filters should be made primary, so they're always visible
in our map layout, while secondary filters can be under "More filters"
submenu. Type is very important, so let's make it primary.

**Choose "Use as a primary search filter"**

Now we have created our first custom listing field! Let's add two more.

The next one is "Amenities". This time we want one sauna to have
multiple amenities. The field should not bemandatory, as some saunas
might not have any amenities. There should be a search filter, but it
can be under "More filters" menu.

- Field label: "Amenities"
- Field id: "amenities"
- Field type: "Select multiple"
- Don't check "This field is mandatory"
- Three field options: "Towels/towels", "Jacuzzi/jacuzzi", "Wi-fi/wifi"
- Search settings: Check "Add a filter to Search Page"
- Filter placement: "Use as a secondary search filter"

Finally, let's add "Sauna rules". This is just a freeform text field.
It's optional: a sauna doesn't need to have rules. For free text fields,
we can't add a search filter, but we can decide whether a free text
search should search the contents of this field. In this case, it
doesn't make sense.

- Field label: "Sauna rules"
- Field id: "saunaRules"
- Field type: "Select multiple"
- Don't check "This field is mandatory"
- Don't check "Include this field in keyword search."

We're done! **Remember to save the changes!**

### Next: listing search

Now that we've defined listing fields, it's time to look more into the
search experience.
[Go to Step 6: Customize listing search](/the-new-sharetribe/tutorial-listing-search/).
