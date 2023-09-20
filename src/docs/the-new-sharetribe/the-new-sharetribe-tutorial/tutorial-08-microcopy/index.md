---
title: Tutorial step 8 – Decide your vocabulary
slug: tutorial-08-microcopy
updated: 2023-09-20
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

In Biketribe, when it comes to what is being offered and by whom, we'd
like the user interface to talk about "bikes" and "bike owners".

In the world of user interfaces, such terminology scattered here and
there is referred to as "Microcopy". The New Sharetribe comes with an
editor that allows you to edit any texts in your user interface.

Let's start by navigating to "Content → Microcopy".

### Changing the text of a specific link

In the top bar of your marketplace, there's a link that says "Post a new
listing". We'd like this word to say "List your bike". Let's find the
word. Click the editor and hit Ctrl + F (on Windows) or Cmd + F (on Mac)
to open the search. Type "Post" to the search.

Searching once only returns the first instance. You'll notice that
"Post" is mentioned in several different places in the user interface.
Each of these has its own corresponding "key" that describes where the
text is displayed:

- “TopbarDesktop.createListing”
- “EditListingPage.titleCreateListing”
- “TopbarMobileMenu.newListingLink”

When editing, you should not change the key. Instead, you should change
the value that comes after the key. For all these keys, the default
value is "Post a new listing". Replace this with "List your bike" in all
these.

Save changes.

### Changing a specific word everywhere in the user interface

It can be convenient to do multiple changes at once to a document.
However, a word of warning: remember how we mentioned in the previous
chapter that "When editing, you should not change the key."? In some
cases, some words may appear both in the texts as well as the keys.
Before doing any kind of "replace all" operation, you should quickly go
through the document and make sure that the word you are replacing is
not present in the key values. If it is, you need to make sure that you
do the changes only to the texts, not the keys.

That being said, if there is a word that you want to replace in all
sections of the site, you can do an operation that quickly changes all
instances of that text. To do this, select all of the text in the editor
(click the editor and hit "CTRL + A" in Windows or "CMD + A" in Mac),
copy it, and paste it to your favorite text editor. Then, do a "replace
all" operation that finds every occurrence of the word you're looking
for with the target word.

After you are done, copy the entire text and paste it into the Microcopy
editor, and then save the content.

### Next: footer

Now the language in your marketplace is all about bikes. There's one
more step before we're done: linking everything we've built together
through the footer.
[Go to Step 9: Edit the footer](/the-new-sharetribe/tutorial-footer/).
