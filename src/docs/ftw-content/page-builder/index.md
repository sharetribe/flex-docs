---
title: How FTW renders static pages using the PageBuilder
slug: page-builder
updated: 2022-08-01
category: ftw-content
ingress:
  This article introduces how FTW uses the Pages feature to generate static pages.
published: true
---

The Pages feature allows users to add, edit and manage content through Flex Console. Once you have created content through the Console, you can query it through the Asset Delivery API, which returns the data structured as JSON. Version X of FTW introduces features that render static pages from these page data assets.

## What are static pages

Static pages are pages that are generated dynamically using Page Asset Data retrieved from the Asset Delivery API. Page Asset Data contains all the information needed to render the content on a static page. It is a machine-readable format of the data entered through the Page Editor in Console, and it reflects the structure and formatting of the content. Page Asset Data is returned in JSON through the Asset Delivery API.

It is up to the client application how it renders the data received through the Asset Delivery API. Identical Page Asset Data can, for example, be rendered using entirely different presentational components on two different pages. 

[illustration with example of how identical data can be rendered differently using different presentational components]

## Page Asset Data

Page Asset Data always represents an individual page, i.e. to render your landing page and your FAQ page, the client will need to make two calls to the Asset Delivery API and will receive two separate JSON files. 

Page Asset Data nests 3 levels of information:

The Page Asset, which represents all data associated with an individual page
The Page Asset can contain an array of Sections. Sections can have a type, and there are 4 different types available by default.
Sections can contain an array of Blocks. There is only one type of Block and Blocks can include text formatted in markdown.

The structure outlined above is hierarchical: Blocks are always nested within Sections and Sections are always nested within the Page Asset. Both Sections and Blocks may include Fields, which are key value pairs encoding data such as title, ingress and background colour.

When read from the Page Asset Data, a Field has two key value pairs, type and content.
For example:

```js
"title": {
  "type": "heading1",
  "content": "Hello World"
}
```

Section and block data:

```js
sections={[
    {
      sectionType: 'article',
      sectionId: 'my-article-section',
      title: {
        type: 'heading1',
        content: 'Hello World!',
      },
      blocks: [
        {
          blockType: 'default-block',
          blockId: 'cms-article-section-block-1',
          text: {
            type: 'markdown',
            content: 'My article content. _Lorem ipsum_ consectetur adepisci velit',
          },
        },
      ],
    },
  ]}

```

## How FTW renders Pages

FTW uses a component called the PageBuilder to dynamically generate static pages using Page Asset Data. The PageBuilder component is a wrapper that receives the Page Asset Data as a prop, and passes data on to the SectionBuilder if sections are present in the data. Subsequently, the SectionBuilder will pass data on to the BlockBuilder if an array of Blocks are present. FTW also includes a Field component, which validates and sanitizes any data before it is rendered. The Field component uses the Primitive component to actually render the data. Most primitives are wrappers for built-in React elements, which make styling and adding extra features easier. The MarkdownProcessor component is used to render fields with type markdown.

## CMS Page TODO

Asset names and loadData calls are defined in page-specific duck files (see LandingPage.duck.js).

FTW retrieves the page asset data through the Asset Delivery API, using the fetchPageAssets function. 

## Section and Block types

Using the Page Editor in Console, you can define a section type. FTW recognises all four section types and renders each using a different presentational component. 

There are four Section types:
- Articles, meant for copy text and uses a narrow one colum layout optimized for reading
- Carousel, an image carousel consisting from images uploaded through Console
- Columns, content blocks rendered in a 1, 2, 3 or 4 column grid
- Features, text and media displayed side by side in alternating order

The corresponding Section component is selected using the getComponent function in the SectionBuilder:

```const Section = getComponent(section.sectionType);```

The getComponent function uses the defaultSectionComponents object to select the correct component:

```js
const defaultSectionComponents = {
  article: { component: SectionArticle },
  carousel: { component: SectionCarousel },
  columns: { component: SectionColumns },
  features: { component: SectionFeatures },
};
```

Each section component is wrapped in a SectionContainer. You can use it to apply styling that should be present in each component.

Default components can be overridden and edited. Keep in mind that the changes will be global and reflected on each static page. If you want to make changes to a Section component on a specific page, you can use the options prop to override a page-level component [link to how-to].

Blocks also have a type property. Currently, Page Asset Data only supports a single Block type. More Block types will be introduced in the near future.
// pageschema-update

## Define a fallback page

FTW allows you to define fallback data if loading the Page Asset Data fails. You can specify a fallback page in page-level components, e.g. in the LandingPage.js file.

A fallback page is constructed similarly to how a dynamic content page is. You need to structure it using the PageBuilder component, but instead of dynamically retrieving Page Asset Data, you pass the pageAssetsData prop a static JSON asset, which can be defined inline or in a separate file. 

TODO: code example of fallback page implementation

