---
title: Create a collection of articles
slug: articles
updated: 2022-09-29
category: how-to-content
ingress:
  With the Flex Pages feature, you can build static pages on your marketplace directly from Flex Console. This how-to guide shows how to create a blog-style suite of interlinked articles on your marketplace.
published: true
---

- Flex Pages allows you to create different types of static content
  - different sections useful for different kinds of pages: article, feature, columns

- Some marketplaces want to have a blog
  - SEO
  - teaching their users about the marketplace niche
  - linking to social media etc.
  - for both of these functionalities, a Pages based suite of static articles works as well as a blog => if you want to have them published in a reverse chronological order and allow commenting etc. in the style of classic blogs, you will need to do some custom development

  ## Decide your article content
    - e.g. a cottage rental marketplace could have articles on
      - the history of cottages
      - lakeside, seaside or inland
      - back to basics or full amenities => electricity, running water etc.
      - why rent out your cottage to others
      - why hire a cottage for your vacation
      - cottage rental etiquette
      - woollen socks and mosquito spray i.e. what to pack for a cottage trip
      - cottage cooking favorites => grilled sausages and fireside s'mores
      - ... and so forth

For the best reader experience, you want to have articles that can be linked to at least two or three other articles within your article base. You can start with e.g. half a dozen article topics, but you can aim for 15-20 articles in total. That will allow the user the experience of having more than enough to read, while not requiring you to keep writing forever. 

## Build your pages

- Add page and page id => this will become the URL /p/page-id
- Add sections
  - template => article
  - add title => page title + section title
- Add blocks to add images, youtube videos etc. 

## Link to other pages

- built pages
  - /p/history
  - /p/packing-list
  - /p/amenities

- You can link the pages to each other
  - either using the button UI
  - or using Markdown

- Check your results on your marketplace site

## Share on social media
- meta og tags can be tested with Facebook sharing debugger => how does your article look when it is shared on different socials
