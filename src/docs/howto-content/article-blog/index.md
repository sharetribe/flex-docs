---
title: Create a library of articles
slug: article-library
updated: 2022-12-22
category: how-to-content
ingress:
  With the Flex Pages feature, you can build static pages on your
  marketplace directly from Flex Console. This how-to guide shows how to
  create a blog-style library of interlinked articles on your
  marketplace.
published: true
---

The Flex Pages feature allows you to create different types of static
content. Using the different content elements – article, feature, column
– you can build a wide range of different types of pages.

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
- What to pack for a cottage trip
- Cottage cooking favorites, such as grilled sausages and fireside
  s'mores ... and so forth

For the best reader and SEO experience, you want to have articles that
can be linked to at least two or three other articles within your
article base. You can start with e.g. half a dozen article topics, and
then build your content library as you go.

## Build your library page and article pages

To add a page, you need to navigate to Flex Console > Content > Pages.
By default, this page contains a landing page, a terms of service page,
and a privacy policy page. Under those pages you can see a link with
text "+ Add new page...". Click this link.

![Page creation modal](create-page-modal.png 'Page creation modal')

### Build your library page

As the page id for this first page, enter "articles". This will be the
collection page where you will link all your individual articles, and
you can see the page in _[your-marketplace-url.com]/articles_.

After you create the page, you can start adding new sections.

Let's add the following sections to this main page:

- Introduction section with _article_ template. You can use this section
  to explain more about the focus of your marketplace and your article
  collection.
- Featured articles with _features_ template. You can use this section
  to highlight your most important content, best performing articles, or
  an interesting series of posts.
- List of all articles with _article_ template. You can use this section
  to list all your articles, either ordered chronologically or in some
  other way you prefer.

![Articles sections](articles-sections.png 'Articles sections')

In each section, you can define a title, ingress content, and blocks for
your copy text. After you save the changes you made, you can click the
"View page" link in the top right corner of the page editor to see your
changes.

### Build your article pages

You have now created your main article collection page. Next, you will
create a few article pages with your actual article content. If you were
creating a marketplace about cottages, you could first write articles
with the following page IDs:

- history
- packing-list
- amenities

You can create these article pages in a similar manner to how you
created the collection page. Depending on the design of your pages, you
may want to use _article_ sections for the main part of the text, and
e.g. _features_ sections to highlight quotes or other key information.

<info>

Flex currently has a limit of **100 content pages** across your
marketplace, including the pages included by default:

- Landing page
- Terms of service
- Privacy policy

</info>

## Link to other pages

Once your articles have been created, you need to link the articles to
each other.

For instance, in your article on _amenities_ you could link to the other
two articles in the following way:

```
...
For a wood-heated cottage, it makes sense to bring your woollen socks – even in summer,
the cottage may be cool inside, and [having the right gear](/p/packing-list) reduces
the need for heating during the cooler months.

For [older cottages](/p/history), amenities will likely be more modest.
...
```

The example above uses the
[Markdown](https://www.markdownguide.org/getting-started/) style of
creating links:

- The link text is wrapped in [square brackets]
- The link address is added immediately after the closing bracket in
  (curved brackets).

In addition to adding the links in the text in Markdown, you can add
links to the button elements of both blocks and sections.

![Creating an internal link button](button-ui.png 'Creating an internal link button')

## Share on social media

Once the pages are finished, you may want to modify how they are shown
when shared on social media.

By default, the Page Builder adds a basic page schema for each content
page. However, you can modify the content of this schema in the CMSPage
component.

```shell
└── src
    └── containers
        └── CMSPage
            └── CMSPage.js
```

For example, instead of the default page title and description, you may
want to show the title and ingress of your first section in the schema.

```diff
export const CMSPageComponent = props => {
  const { params, pageAssetsData, inProgress, error } = props;
  const pageId = params.pageId || props.pageId;

+ const { title, ingress  } = pageAssetsData[pageId]?.data?.sections[0];
...
  // schemaTitle is used for <title> tag in addition to page schema for SEO
- const schemaTitle = 'CMS page';
+ const schemaTitle = title?.content ?? 'CMS page';
  // schemaDescription is used for different <meta> tags in addition to page schema for SEO
- const schemaDescription = 'CMS page';
+ const schemaDescription = ingress?.content ?? 'CMS page';
  const openGraphContentType = 'website';

  // In addition to this schema for search engines, src/components/Page/Page.js adds some extra schemas
  // Read more about schema
  // - https://schema.org/
  // - https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data
  const pageSchemaForSEO = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    description: schemaDescription,
    name: schemaTitle,
  };

```

You can see the default information shared about your page by pasting a
publicly available link to the
[Facebook sharing debugger](https://developers.facebook.com/tools/debug/)
and the
[Twitter card validator](https://cards-dev.twitter.com/validator).

### Add article image to social media shares

The default page schema does not use the article image in the social
share. Instead, it uses the default marketplace sharing image. You can
see the image used for social media shares in your page's _head_ tag.

// TODO: Screenshot head tag with og:image visible

You can modify the template code to parse the images from your page
asset, however, and set them as the social media share images.

<info>

If you want to use the article images in social shares, you need to add
the images in Console with **landscape aspect ratio**. That way, the
images correspond to the specifications of e.g. Open Graph and Twitter.
The following instructions assume that your articles have at least one
landscape image in your article.

</info>

You will need to make these changes in the CMSPage.js component.

```shell
└── src
    └── containers
        └── CMSPage
            └── CMSPage.js
```

First, you need to parse the correct image variants from the page
assets. Images can only be added to blocks, so this function maps all
the block arrays from the page sections into a single array. Then, it
picks the specified variant of each image into an array.

```jsx
const cmsPageImages = (assetData, variantName) => {
  if (!assetData || !assetData[pageId]) {
    return null;
  }

  // Get the correct variants of images from the content blocks
  // of the different sections on the page.
  const imageVariants = assetData[pageId]?.data?.sections
    // First, flatMap the block arrays inside the section array into a single flat array
    .flatMap(s => s.blocks)
    // Second, pick the correct variants from the block images and add them to the imageVariants array.
    .reduce((variants, b) => {
      const { image } = b.media;
      const variant = image?.attributes?.variants[variantName] || null;

      return variant ? [...variants, variant] : variants;
    }, []);

  // Only return the imageVariants array if there are images. Otherwise return null, so that
  // the default marketplace image is used for the og tag.
  return imageVariants.length > 0 ? imageVariants : null;
};
```

You can then use the same function to get the correct image sizes for
both Facebook (i.e. Open Graph) and Twitter.

```jsx
const facebookImages = cmsPageImages(pageAssetsData, 'landscape1200');
const twitterImages = cmsPageImages(pageAssetsData, 'landscape800');
```

When you pass the images to the PageBuilder, it passes them down to the
Page.js component, which sets them into the page schema.

```diff
  return (
    <PageBuilder
      pageAssetsData={pageAssetsData?.[pageId]?.data}
      title={schemaTitle}
      description={schemaDescription}
      schema={pageSchemaForSEO}
      contentType={openGraphContentType}
      inProgress={inProgress}
+     facebookImages={facebookImages}
+     twitterImages={twitterImages}
    />
  );
```

You can now see the asset based image being used in the _head_ script
instead of the default one.

// TODO Screenshot of head element
