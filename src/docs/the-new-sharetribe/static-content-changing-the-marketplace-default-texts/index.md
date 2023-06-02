---
title: Static Content- Modifying the Footer.
slug: changing-the-marketplace-default-texts
updated: 2023-06-01
category: the-new-sharetribe-tutorial
ingress:
  Most copy texts in your marketplace can be modified via the [Microcopy
  editor](link to microcopy editor article). However, many of them don’t
  need to be changed at all.
published: true
noindex: true
---

In this tutorial, we’ll just browse over the basic usage of Microcopy
editor and change the basic test that will allow you to have a Sauna
rental marketplace. If you want to read more,
[check out this article about Microcopy editor](https://www.sharetribe.com/docs/operator-guides/how-to-use-microcopy-editor/).
We’ll make the changes in two ways: specific instructions to change a
key and general.

1. Changing the **“List your bike”** text that shows in your marketplace
   top bar.
2. Changing all text containing the word **“bike”** for the word
   **“sauna”** in bulk.

In Console, go to **Build → Content → Microcopy editor.**

## Changing a specific text

In this step, we will replace the call to action text that showcases in
the top bar

![replacing the CTA](./replacingCTA.png)

Within the Microcopy page, go into the editor window. You can use Ctrl +
F (on Windows) or Cmd + F (on Mac) to search for a specific text, but
that will only return the next available match, depending on the
location of your cursor on the text. Try searching for the text **“List
your bike”**

You will notice that there are 4 different ”List your bike” options.
Their corresponding keys are **“TopbarDesktop.createListing”**,
**“EditListingPage.titleCreateListing”**, **“Footer.toNewListingPage”**,
and **“TopbarMobileMenu.newListingLink”**. Each one of these keys
corresponds to a different place where the text **“List your bike”** is
displayed in your marketplace.

Make the following change:

- Change only the one corresponding to the key
  **“TopbarDesktop.createListing”**. This will change the text in the
  top bar link to create a new listing. Other **“List your bike”** texts
  in your marketplace will not be changed for now.

Make sure to save your changes once you are done.

## Changing a specific word in the marketplace

You can manually find and replace the text bike within the Microcopy
editor Page in Console. However, that will be time-consuming. There is a
simpler way to do this.

Copy the entire content of the Microcopy editor JSON file and paste it
into a simple text editor. You can use Atom, Sublimetext, or the basic
editor available on your computer, like Notepad or TextEdit. All of
these editors have a find function and a replace function. Use the find
and replace function of the editor and find the word **“bike”** and
replace it with the word **“sauna.”** Most editors also have a function
to **“replace all.”** If possible, use that function.

After you are done, copy the entire text and paste it into the Microcopy
editor, and then save the content.

You can learn more about the microcopy editor and how to use it here:
https://www.sharetribe.com/docs/operator-guides/how-to-use-microcopy-editor/.
