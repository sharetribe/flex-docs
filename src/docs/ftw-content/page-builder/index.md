---
title: Page builder
slug: page-builder
updated: 2022-08-01
category: ftw-content
ingress:
  This article introduces how FTW uses the new content management system
  to generate static pages.
published: true
---

Flex's new page builder feature allows users to add and edit content
through Flex Console. Once you have created content through the Console,
you can query it through the Asset Delivery API, which returns the data
structured as JSON. Version X of FTW introduces new features that create
static pages from these page data assets.

Note: Currently, this feature is only available for the landing page.

## Page asset data structure

The default asset schema has the following levels of information (in the
first release of this feature, page schemas can't be modified) :

- The page asset (the whole piece of JSON data retrieved from the Asset
  Delivery API)
- Sections (a page asset contains an array of sections)
- Block (sections may contain an array of blocks)

TODO: Example of page asset data JSON with sections and blocks

## Fetching page asset data

The page asset file stores the content and structure of the data that is
used to render static pages. FTW retrieves the page asset data through
the Asset Delivery API, using the fetchPageAssets function. Asset names
and loadData calls are defined in page-specific duck files (see
LandingPage.duck.js).

TODO: Code blocks

## How data flows in FTW / PageBuilder

In version X, FTW introduces a new component called the PageBuilder. The
PageBuilder reads the page asset data and uses it to generate a static
content page. The prop pageAssetsData gets passed to the PageBuilder
component in page-level files, which contains instructions on rendering
the page content.

The pageAssetsData is a denormalized JSON asset containing an array of
sections. If sections are present, the pageBuilder calls the
SectionBuilder to render the content of the sections.

Sections may also include arrays of blocks. If blocks are present, the
SectionBuilder component will use the BlockBuilder component to render
the block content.

TODO: Graph that shows data flow(?)

Data is finally passed to the Field component, which validates and
sanitizes any data. The Field component uses the Primitive components to
render the data. Most primitives are just wrappers for built-in React
elements. They make it easy to style and add extra features to similar
components.

The MarkdownProcessor component is used to render fields with type:
markdown.

TODO: Code blocks

## Section and block builder

There are multiple sections:

- Article, carousel, columns, features
- Section builder renders the correct component based on the sectionType
- How to add a new section component
- Block builder only includes one block type at the moment

## Fallback pages

FTW allows you to define fallback data if loading the page asset data
fails. You can specify a fallback page in page-level components, e.g. in
the LandingPage.js file.

TODO: code example of fallback page

## Options

You can use the options prop to extend built-in sections, blocks and
fields.

Todo: ask Vesa for more details on this and add examples

## Extending the pageBuilder

It's also possible to create custom section types, block types and
fields. You might want to do so if you are using the pageBuilder to
create custom pages that get their content from somewhere else than the
Asset Delivery API.

TODO: Example on how to extend
