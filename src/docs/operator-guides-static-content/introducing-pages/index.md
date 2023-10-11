---
title: Introducing Pages
slug: introducing-pages
updated: 2023-04-01
category: operator-guides-static-content
ingress:
  The latest Sharetribe Flex feature introduces a powerful no-code
  interface that gives you full control over your marketplace’s content.
published: true
---

Pages add the ability to build, edit, and manage your marketplace’s
content pages directly from Console. Content pages like a Landing page
or About page can now be modified without developer input. Pages’
deployment workflow lets you create and review content changes in
development mode before making them available in your live marketplace.

<iframe width="560" height="315" src="https://www.youtube.com/embed/pkMKt1-L09w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## What you can do with Pages

Pages lets you create and edit content pages without code in Flex. On
your marketplace, content pages are pages featuring content created by
you, the marketplace operator. Landing pages, “About” pages, FAQs or
blog posts are all examples of content pages.

There are various use cases for content pages. The most obvious one is
to provide informational content about how your marketplace works to
your users. In addition, you might use Pages to create alternative
landing pages for various user groups, for search engine optimization
(SEO) or paid advertising purposes, or even create a simple blog.

Any Flex marketplace starts with 4 default pages: the About page, the
Landing page, the Privacy policy page, and Terms of use page. Pages lets
you edit these default pages, but, with the exception of the About Page,
they cannot be removed. In addition to the default pages, you can add
and edit any number of custom content pages.

## How Pages works

You can use Pages from Console's Build section. You can try it
immediately in the Flex Test environment, or use it to create your
content after setting up your own marketplace app. Start editing the
default content pages, or build your own! Read more about
[enabling Pages in your marketplace](https://www.sharetribe.com/docs/operator-guides/how-to-enable-pages/).

Each content page is built using a combination of sections and blocks.
Sections define the different content areas and their layout. Blocks
contain the information presented in a section. Blocks are made up of
multiple different types of content, like texts, Youtube videos or
images.

The content you create displays in your marketplace frontend. It is laid
out using the default Flex design. If you want your content to follow a
different design, a developer can make the necessary modifications. A
future release will also allow developers to add more types of sections
and blocks, which will make it possible to create a wider variety of
content pages.

While your marketplace is in development, use Pages in the Test
environment to build out your content.

When your marketplace is launched and you have a Live environment,
continue to use the Test environment to make changes to your published
marketplace content and preview how they look in your Test site. When
ready, you copy finished changes from your Test environment to your Live
environment and live marketplace application.

![carousel-example](./carousel-example.png)

_An example carousel section from the starting Landing page. The default
code of the marketplace application renders carousels and all content
created using Pages following a standard design. Developers can change
this design anytime._

## How to get started with Pages

Use Pages to create and edit your marketplace content when building your
Flex marketplace. The first step to building your marketplace requires
setting up the Sharetribe Web Template. This is a technical task that
requires coding knowledge. If you are not a developer or do not yet have
a developer on your team, you should hire a Flex Expert to help you
build your marketplace.

Once your own version of the Template is set up, you can start building
and editing your content pages in Console. Log into Console, navigate to
your Test environment, pick the “Build” section from your top bar,
select “Content” from the sub-menu, then select “Pages” from the left
side menu. You should now see your default content pages (the About
page, the Landing page, the Terms of use page, and the Policy page)
ready for editing, or you can create your own page.

![pages-homescreen](./pages-homescreen.png)

_Pages home screen shows all your marketplace’s content pages. Pages
starts with a prebuilt About page, Landing page,Terms of use page, and
Privacy Policy page. We recommend editing those pages to suit your
marketplace as you start building._

### Further guides

To start, you may want to focus on editing your Landing page. This will
be the first page most of your users see, so you want it to look great
and clearly articulate your value proposition. Check out our guide on
how to
[edit your landing page](https://www.sharetribe.com/docs/operator-guides/how-to-edit-content-pages-in-console/)
to get started .

If you want to create a new page,
[the tutorial on how to build an FAQ page](https://www.sharetribe.com/docs/operator-guides/how-to-create-an-faq-page/)
offers step-by-step instructions to get start

Not sure you’re ready to start developing yet? Then try Pages out
without any code setup using the Test marketplace Biketribe! After
creating a Flex account, log into
[Console](https://console.sharetribe.com/) and follow the same steps to
navigate to Pages (Build->Content), but make sure you are in your
[Test environment](https://www.sharetribe.com/docs/operator-guides/concepts/#environments_.)
Marketplaces created before February, 15th, 2023 will need to “Import
default pages” to their Test environment to start making changes.

Marketplaces built or being built on Flex before February, 15th, 2023
need to modify their frontend marketplace code to take Pages into use.
Developers can consult
[this guide](https://www.sharetribe.com/docs/legacy/ftw/page-builder/#how-to-take-pages-into-use-if-you-are-using-an-older-version-of-ftw)
to learn how to update existing marketplace codebases with Pages
functionality.

For more technical information on how Pages work, read more about
[Flex's content management system](https://www.sharetribe.com/docs/concepts/content-management/).
