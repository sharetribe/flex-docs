---
title: Tutorial step 5 – Create listing fields
slug: tutorial-05-listing-fields
updated: 2023-09-20
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
the navigation on the left. There we see an example field. Let's delete
it and create the following new fields:

- Bike brand. Is it made by Cube, GHOST, Giant, or someone else?
- Accessories. What extras are included? Is a bell, lights, lock, or
  mudguard included?
- Bike rental rules. Are there any specific things someone renting the
  bike should keep in mind?

Let's start with bike brand. Click "Add a new listing field", and click
open the newly created field.

### Field settings

#### Field label

Field label is displayed in the marketplace next to the form field.

**Write "Brand"**

#### Field ID

Field ID is a unique identifier that is stored in the data of the
listing. While the label can be changed, you should not change the field
ID after listings have been created with it, as the old listings will
retain the old ID. Field ID should not contain spaces or special
characters.

**Write "brand"**

#### Field type

Field type determines how the field works. In this case, we want each
bike to have exactly one type, and it should be chosen from a predefined
list of types.

**Choose "Select one"**

#### This field is mandatory

We want every bike to have a brand.

**Check the checkbox**

### Field options

Here we define the different options for the bike type. Click open the
first option.

#### Option label

Just like fields, options have labels.

**Write "Cube"**

#### Option value

Option value is a bit like Field ID: it's an identifier stored in the
listing data. No spaces or special characters allowed.

**Write "cube"**

Now edit the second option. For the label, put "Diamant" and for the
value "diamant".

Let's add one more option. Click "Add a new option". Add "GHOST" as the
label and "ghost" as the value.

Repeat the process for as many brands as you want to add.

### Search settings

We can create a filter for our "Select one" field for search page. Let's
do that, so people searching for GHOST bikes can filter out the rest.

**Check the checkbox**

#### Filter placement

Most important filters should be made primary, so they're always visible
in our map layout, while secondary filters can be under "More filters"
submenu. Type is very important, so let's make it primary.

**Choose "Use as a primary search filter"**

Now we have created our first custom listing field! Let's add two more.

The next one is "Accessories". This time we want one bike to have
multiple accessories. The field should not be mandatory, as some bikes
might not have any amenities. There should be a search filter, but it
can be under "More filters" menu.

- Field label: "Accessories"
- Field id: "accessories"
- Field type: "Select multiple"
- Don't check "This field is mandatory"
- Four field options: "Bell/bell", "Lights/lights", "Lock/lock", and
  "Mudguard/mudguard"
- Search settings: Check "Add a filter to Search Page"
- Filter placement: "Use as a secondary search filter"

Finally, let's add "Bike rules". This is just a freeform text field, for
example if the bike can't handle rough terrain and it should only be
driven on flat road or terrain. It's optional: a bike doesn't need to
have specific usage rules, if it does well in all situations. For free
text fields, we can't add a search filter, but we can decide whether a
free text search should search the contents of this field. In this case,
it doesn't make sense.

- Field label: "Bike rules"
- Field id: "bikeRules"
- Field type: "Select multiple"
- Don't check "This field is mandatory"
- Don't check "Include this field in keyword search."

We're done! **Remember to save the changes!**

### Next: listing search

Now that we've defined listing fields, it's time to look more into the
search experience.
[Go to Step 6: Customize listing search](/the-new-sharetribe/tutorial-listing-search/).