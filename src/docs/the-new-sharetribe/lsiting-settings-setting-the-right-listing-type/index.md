---
title: Tutorial step 4 – Adjust the listing type
slug: tutorial-listing-type
updated: 2023-06-01
category: the-new-sharetribe-tutorial
ingress:
  Listing type will determine how your users interact with each other.
published: true
noindex: true
---

_Listings_ are descriptions of the products and services available in
your marketplace. _Listing type_ determines how customers can interact
with the listing: for example, are they purchasing a physical product
from an inventory, or making a calendar booking?

For now, your marketplace can have only one listing type available at a
time. Let's adjust its settings. Click "Listing type" from the
navigation on the left and click open the default listing type "Daily
booking".

In our Sauna marketplace, we want to offer nightly bookings to allow
all-night sauna parties: you book a slot from the calendar, check in
during the evening and check out the next morning.

### Listing type label

Listing type label will become more important when it's possible to have
multiple listing types in a marketplace. For now, it's just a descriptor
for you. Let's put something descriptive.

**Type "Nightly booking"**

### Listing type ID

Listing type ID is a unique identifier that is stored to each listing
using this listing type. It can't contain spaces, and there are other
character restrictions too. In general, you should not change the ID of
an existing listing type that has listings created with it, as those
listings will retain the old ID. We don't have any sauna listings yet,
so we can proceed to change the ID.

**Type "nightly-booking"**

### Transaction process

Transaction process determines the flow of the transaction initiated
from a listing with this listing type. There are currently two options:
Calendar booking and Buying and selling products. Biketribe uses
calendar bookings, which is what we would want too.

**Keep "Calendar booking"**

If you're building a marketplace for selling products, choose "Buying
and selling products here".

### Booking unit

Next we need to determine how the calendar and booking experience works.
Options are daily, nightly and hourly bookings. We want overnight
bookings, so we'll choose "Nightly".

**Choose "Nightly"**

Now it's time to save the changes. Let's not preview the marketplace at
this point, as testing the listing type would require creating a new
transaction, and we have a few more steps to complete before that.

### Next: landing page

That's it for listing type! Next, we'll decide what data is collected
when a new listing is created.
[Go to Step 5: Create listing fields](./tutorial-listing-fields).
