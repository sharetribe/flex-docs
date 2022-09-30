---
title: Create a library of articles
slug: articles
updated: 2022-09-29
category: how-to-content
ingress:
  With the Flex Pages feature, you can build static pages on your
  marketplace directly from Flex Console. This how-to guide shows how to
  create a blog-style library of interlinked articles on your
  marketplace.
published: true
---

The Flex Pages allows you to create different types of static content.
Using the different content elements – article, feature, column – you
can build a wide range of different types of pages.

One use case for creating static content is to have a library of
articles related to your marketplace topic. This guide shows you how to
create an interlinked library of content using the Pages feature.

## Why an article library?

A static article library functions as a channel for
[content marketing](https://www.sharetribe.com/academy/how-to-do-local-content-marketing-for-marketplaces/).
You can educate your marketplace users and provide value,
[build a community around your marketplace](https://www.sharetribe.com/academy/turn-marketplace-community/),
as well as improve your
[marketplace SEO ranking](https://www.sharetribe.com/academy/marketplace-seo/opportunities-and-challenges/).

If you want more blog-like features on your article library, e.g.
comments, or articles displayed in a reverse chronological order, you
can add them with custom development.

## Decide your article content

The first step in building an article library is to
[decide on your content strategy](https://www.sharetribe.com/academy/marketplace-business-slows-down/#double-down-on-content),
and create an initial list of articles you will feature on your
marketplace. For instance a cottage rental marketplace could have
articles on

- The history of cottages in the marketplace location
- Types of cottages: level of amenities such as electricity and running
  water, and considerations related to each for guests and hosts
- Reasons to rent out your cottage to others
- Reasons to hire a cottage for your vacation
- Cottage rental etiquette
- Knit socks and mosquito spray i.e. what to pack for a cottage trip
- Cottage cooking favorites, such as grilled sausages and fireside
  s'mores ... and so forth

For the best reader and SEO experience, you want to have articles that
can be linked to at least two or three other articles within your
article base. You can start with e.g. half a dozen article topics, and
then build your content library as you go.

## Build your pages

[TODO: Add explanation and screenshots]

- Add page and page id => this will become the URL /p/page-id
- Add sections
  - template => article
  - add title => page title + section title
- Add blocks to add images, youtube videos etc.

## Link to other pages

We have now built three pages with the page urls

- /p/history
- /p/packing-list
- /p/amenities

[TODO: text segments for linking:]

- in amenities:
  - "For a wood-heated cottage, it makes sense to bring your woollen
    socks – even in summer, the cottage may be cool inside, and [having
    the right gear] (link to /p/packing-list) reduces the need for
    heating during the cooler months."
  - "For [older cottages] (link to /p/history), amenities will likely be
    more modest."

Follow a similar pattern in the other articles.

You can link the pages to each other

- either using the button UI
- or using Markdown

Check your results on your marketplace site

## Share on social media

The FTW template handles the article's meta tags in this way:

[TODO: explain how FTW handles meta tags]

To see how your article looks when shared on different social media
platforms, you can use the
[Facebook sharing debugger](https://developers.facebook.com/tools/debug/)
and the
[Twitter card validator](https://cards-dev.twitter.com/validator).

[TODO: Add screenshot of Facebook sharing debugger and the amenities
article]
