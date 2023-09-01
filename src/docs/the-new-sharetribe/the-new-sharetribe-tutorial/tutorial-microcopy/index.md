---
title: Tutorial step 8 – Decide your vocabulary
slug: tutorial-microcopy
updated: 2023-07-05
category: the-new-sharetribe-tutorial
ingress:
  In this tutorial step, we'll teach you how to use the Microcopy
  feature to modify the terminology used in your marketplace.
published: true
noindex: true
---

Different marketplaces use different words when talking about their
users and listings. Sometimes they might be "buyers" and "sellers", in
other cases "guests" and "hosts".

In Biketribe, we'd like the user interface to talk about "bikes" 
and "bike owners".

In the world of user interfaces, such terminology scattered here and
there is referred to as "Microcopy". The New Sharetribe comes with an
editor that allows you to edit any texts in your user interface.

Let's start by navigating to "Content → Microcopy".

### Changing the text of a specific link

In the top bar of your marketplace, there's a link that says "Post a new
listing". We'd like this word to say "List your bike". Let's find the
word. Click the editor and hit Ctrl + F (on Windows) or Cmd + F (on Mac)
to open the search. Type "Post" to the search.

Searching once only returns the first instance. You'll notice that "Post" 
is mentioned in several different places in the user
interface. Each of these has its own corresponding "key" that describes
where the text is displayed:

- “TopbarDesktop.createListing”
- “EditListingPage.titleCreateListing”
- “TopbarMobileMenu.newListingLink”

When editing, you should not change the key. Instead, you should change
the value that comes after the key. For all these keys, the default
value is "Post a new listing". Replace this with "List your bike" in all these.

Save changes.

### Changing a specific word everywhere in the user interface

The word "listing" is used in many other places in the user interface
besides the link we just changed. Instead of finding all of them one by
one, let's just edit the rest in bulk.

Select all of the text in the editor (click the editor and hit "CTRL +
A" in Windows or "CMD + A" in Mac), copy it, and paste it to your
favorite text editor. Then, do a "replace all" operation that finds
every occurrence of the word "listing" and replaces it with "bike".

After you are done, copy the entire text and paste it into the Microcopy
editor, and then save the content.

### Next: footer

Now the language in your marketplace is all about bikes. There's one
more step before we're done: linking everything we've built together
through the footer.
[Go to Step 9: Edit the footer](/the-new-sharetribe/tutorial-footer/).
