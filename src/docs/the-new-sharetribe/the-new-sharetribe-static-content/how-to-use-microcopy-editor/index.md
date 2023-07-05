---
title: How to use the Microcopy editor
slug: how-to-use-microcopy-editor
updated: 2022-07-05
category: the-new-sharetribe-static-content
ingress:
  The Microcopy editor lets you modify your marketplace’s microcopy in
  The New Sharetribe Console.
published: true
---

## What is microcopy

Your New Sharetribe marketplace has both content and dynamic pages.
Content pages only feature content created by you, the marketplace
operator. Landing pages, “About” pages and FAQ pages are examples of
content pages.

Dynamic pages, meanwhile, feature content created by your users. The
search page displaying listings is a dynamic page. Often, dynamic pages
offer users the ability to interact with them, such as when buyers are
selecting the length of a booking from a listing or entering their
payment information into the checkout page.

In The New Sharetribe, the term microcopy refers to short written texts scattered
around a dynamic page’s interface; button labels, error messages, and
help texts are all examples. They are textual, brief (a sentence or
two), and highly contextual.

![Examples of microcopy](./microcopy_examples.png)

_Examples of microcopy from the Biketribe listing page highlighted in
blue. Note that listing fields and search filters ("Sauna type",
"Amenities" and "Sauna rules" for example) are not editable with the
microcopy editor. An upcoming feature will introduce a dedicated feature
for editing these fields and filters in Console._

With the Microcopy editor, you can modify these texts in your New Sharetribe
Console. You can also use the Microcopy editor to translate these texts
to a new language. This article will walk you through how to set up your
Microcopy editor and make microcopy changes while building and operating
your New Sharetribe marketplace.

## Why microcopy matters

Changing your microcopy is an important part of deciding how your
marketplace works. It allows you to set the tone in which you address
your users: do you prefer to be calm and polite, warm and friendly, or
whimsical and goofy?

With microcopy, you also make key decisions about your core vocabulary.
Do you call your customers "buyers", "guests", or something else? Are
your providers perhaps called "vendors", "sellers" or "hosts"? What are
they publishing on your site – "listings", "products", "profiles",
"apartments", "bikes"? When they interact with each other on your site,
are they "booking", "buying" or "ordering"?

All these decisions affect the choices you make in your microcopy.

## How to test the Microcopy editor?

You can try out the Microcopy editor in your New Sharetribe test marketplace. After
creating a New Sharetribe account, log into Console. Ensure you are in the Test
environment.

In the left navigation sidebar, navigate to the "Content -> Microcopy". The Microcopy editor is here.

![Microcopy editor](./microcopy_editor.png)

_When you first start building your marketplace, you'll find the
microcopy in red text in the microcopy editor._

Here is a brief description of the file you are looking at:

- Each line in the document is a separate piece of microcopy. Microcopy
  pieces are generally one or two sentences and highly contextual.
- Each piece of microcopy starts and ends with a quotation mark. The end
  of the microcopy piece is signaled by a comma followed by a
  line-break.
- Each piece of microcopy uses key-value format to structure the
  information contained within. Keys are on the left and values are on
  the right. They are separated by a colon.
- Keys refer to the location or situation in the marketplace app where
  the specific piece of microcopy appears. For example, the key
  “LoginForm.emailInvalid” describes the situation when an invalid email
  is used.
- Values are the pieces of microcopy used in the particular area pointed
  to by the keys. During the use of an invalid email during login
  described by “LoginForm.emailInvalid,” the default value is “A valid
  email address is required.”
- Any text, symbols, or numbers written between quotation marks are
  valid values to use for your pieces of microcopy.
- In addition to texts, you can use tools such as simple arguments,
  pluralization, and selection to build phrases. These let you
  incorporate contextual variables like a listing title or booking
  length into your copy-texts. You can learn more about these advanced
  techniques
  [here](/concepts/microcopy/#format-for-editing-microcopy-in-console).
- You can only modify values in the editor. You cannot modify keys. Keys
  must be modified by modifying the code of your marketplace
  application.

![Example of a microcopy key-value pair](./microcopy_key_value.png)

_An example key-value pair in the Microcopy editor. Note both the key
and value are enclosed in quotation marks. A comma marks the end of the
key-value pair, followed by a line break._

### Modify frequently used pieces of microcopy

With your marketplace’s microcopy file copied into the editor, you can
use the editor to modify your marketplace’s copy-texts.

To start, we suggest going through the microcopy file in the editor.
Look at the values and see how they compare to the terminology you
decided to use in step 1. The most frequently modified pieces of
microcopy use language specific to the Template's theme "Biketribe".

Using the search functionality in the Microcopy editor is the easiest
way to find the copy-texts that need changing. Press “CMD+F” on a Mac or
“Ctrl+F” on a Windows computer to search for specific phrases from your
marketplace in the microcopy file you are editing in the Microcopy
editor.

<video>
    <source src='./changeTexts.mp4' type='video/mp4'>
    <source src='./changeTexts.webm' type='video/webm'>
    <source src='./changeTexts.ogv' type='video/ogg'>
</video>

As you work, remember to save your changes frequently. Everytime you
save, any changed copy-texts will be uploaded to your marketplace.

There are many copy-texts in your marketplace. You will likely need
several efforts in order to modify the starting texts to your desired
terminology.

### How to add or remove pieces of microcopy

So far we have changed existing microcopy, but you may also want to add
pieces of microcopy in building your marketplace. This typically happens
when you’re adding something to your Template: a new button or help
text, or even an entire new page.

Adding new microcopy happens with your developer, who must first add the
corresponding new key directly to your marketplace code. Your developer
will code the element, situation, or place where the microcopy will
exist (like a new button, for example), define its key, and then add it
to the microcopy file edited by the Microcopy editor. Once the key
exists in the microcopy file, you can copy the new key-value pair into
the Microcopy editor.

Supporting multiple languages in your marketplace is a special case of
adding microcopy. Because the Microcopy editor only works with a single
language, you cannot use it to modify multiple different languages. You
should use the editor to modify one of your supported languages.

</info>

## How to edit content on content pages

The Microcopy editor changes microcopy on your dynamic pages, which are
pages where user-generated content, such as listings, appear. To change
your content pages, like your Landing page or Terms of use,
[you should use Pages.](https://www.sharetribe.com/docs/the-new-sharetribe/how-to-edit-content-pages-in-console/)

### Digging deeper into the Microcopy editor

In this article, we learned about the Microcopy editor and the microcopy
it changes. You can use the editor to change any microcopy already in
the Template, or to change any additional microcopy added during
building your site.
