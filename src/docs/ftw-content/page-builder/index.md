---
title: How the template renders content pages
slug: page-builder
updated: 2023-14-02
category: template-content
ingress:
  This article introduces how the Sharetribe Web Template uses the Pages
  feature to generate content pages.
published: true
---

The Pages feature allows you to add, edit and manage content in
Sharetribe Console. Once you have created content in Console, you can
query it through the Asset Delivery API, which returns the data
structured as JSON. The Sharetribe Web Template contains features that
automatically render content pages from Page Asset Data. This article
will walk you through the logic used to render these pages in the
template.

<extrainfo title="I am using a legacy template without Pages support">

Read more about the code-level changes introduced in the legacy FTW
templates in the release notes of
[version 10.0.0](https://github.com/sharetribe/ftw-daily/releases/tag/v10.0.0).

You can find instructions on adding the Pages capability into your
legacy template
[in our legacy documentation](https://www.sharetribe.com/docs/template/legacy-templates/).

</extrainfo>

## What are content pages

A content page is a page type that is informational by nature with text
that does not frequently change. Typical content pages that you would
have on your website would be an “About us” page, a “Frequently asked
questions” page or a “Terms of Service” page. These pages have long
sections of written text that might include images, links and videos.

In older versions of our
[legacy templates](https://www.sharetribe.com/docs/template/legacy-templates/),
the data on these content pages was hard-coded into the corresponding
page file. For instance, the content of the About Page was
[written directly into the code](https://github.com/sharetribe/ftw-daily/blob/7a2f9b0557607533097761c063f7f98d7c8bfc1a/src/containers/AboutPage/AboutPage.js)
on the AboutPage.js file. Changes to the content required editing the
code and redeploying the client application. This required content
editors to work with developers to make simple changes to the copy text
of content pages.

Sharetribe Web Template renders content pages dynamically. Content can
be managed through the Pages feature, which provides the editor with a
graphical interface to input text, videos, links and images. The
template queries the
[Asset Delivery API](https://www.sharetribe.com/api-reference/asset-delivery-api.html)
to retrieve the most recent version of the content and uses it to render
the content page. We refer to this data as
[Page Asset Data](#page-asset-data). It reflects the content’s structure
and is delivered in JSON.

On page load, the template queries the Asset Delivery API to fetch the
Page Asset Data needed to render the requested page. The data is
subsequently stored in Redux state, which triggers a component called
the PageBuilder to render the Sections, Blocks and Fields defined in the
data. The [rendering pages section](#rendering-pages) explains how this
happens in further detail.

## Page Asset Data

Page Asset Data is a machine-readable format of the data inputted
through Pages in Console. It represents the content and structure of the
content page and is divided into Sections, Blocks and Fields.

A single query to the Asset Delivery API will provide you with the Page
Asset Data of a single content page. In other words, to render both your
landing page and your FAQ page, the client will need to make two calls
to the Asset Delivery API and receive two separate JSON files. Page
Asset Data is always formatted in JSON.

Page Asset Data nests 3 levels of information:

- The Page Asset, which represents all data associated with an
  individual page
- The Page Asset can contain an array of Sections. Sections can have a
  type, and there are 4 different types available by default.
- Sections can contain an array of Blocks. Blocks can include text
  formatted in markdown.

The structure outlined above is hierarchical: Blocks are always nested
within Sections, and Sections are always nested within the Page Asset.
Both Sections and Blocks may include Fields, which are key-value pairs
encoding data such as title, ingress and background image.

- Read more: [Page asset schema](/references/page-asset-schema/)

It is up to the client application how it renders the data received
through the Asset Delivery API. Identical Page Asset Data can, for
example, be rendered using entirely different visual elements on two
different client applications.

## Rendering pages

### Routing and loadData calls

Sharetribe Web Template uses React Router to
[create routes](/template/how-routing-works-in-template/) to different
pages. This is best demonstrated through an example. When a user
navigates to the about page, it triggers the loadData function specified
in
[routeConfiguration.js](https://github.com/sharetribe/web-template/blob/main/src/routing/routeConfiguration.js#L76):

```js
  {
     path: '/privacy-policy',
     name: 'PrivacyPolicyPage',
     component: PrivacyPolicyPage,
     loadData: pageDataLoadingAPI.PrivacyPolicyPage.loadData,
   },
```

In
[legacy templates](https://www.sharetribe.com/docs/template/legacy-templates/),
no loadData function was defined for the privacy policy path, as the
page's content was hard coded. Now, as the content of the page is
fetched using an API call, a loadData function is specified in
[PrivacyPolicyPage.duck.js](https://github.com/sharetribe/web-template/blob/main/src/containers/PrivacyPolicyPage/PrivacyPolicyPage.duck.js):

```js
export const loadData = (params, search) => dispatch => {
  const pageAsset = {
    privacyPolicy: `content/pages/${ASSET_NAME}.json`,
  };
  return dispatch(fetchPageAssets(pageAsset, true));
};
```

The function uses the fetchPageAssets function to fetch the Page Asset
Data for the privacy policy page. Once the data is loaded and stored in
state, the page can be fully rendered using the data stored in Page
Assets.

### Predefined routes

Sharetribe Web Template has four predefined routes used to generate
content pages:

- [PrivacyPolicy](https://github.com/sharetribe/web-template/blob/main/src/containers/PrivacyPolicyPage/PrivacyPolicyPage.js)
- [TermsOfService](https://github.com/sharetribe/web-template/blob/main/src/containers/TermsOfServicePage/TermsOfServicePage.js)
- [LandingPage](https://github.com/sharetribe/web-template/blob/main/src/containers/LandingPage/LandingPage.js)
- [CMSPage](https://github.com/sharetribe/web-template/blob/main/src/containers/CMSPage/CMSPage.js)

The first three are defined by default in Console and can not be
removed. Therefore, there is a dedicated component in the template for
each. For any new page created through Console, a generic component
called CMSPage is used.

If we compare the loadData calls in the privacy policy page and CMSPage,
we can see that they differ slightly. The PrivacyPolicyPage.duck.js file
uses a predefined path for fetching the page asset
`content/pages/privacy-policy`

```js
import { fetchPageAssets } from '../../ducks/hostedAssets.duck';
export const ASSET_NAME = 'privacy-policy';

export const loadData = (params, search) => dispatch => {
  const pageAsset = {
    privacyPolicy: `content/pages/${ASSET_NAME}.json`,
  };
  return dispatch(fetchPageAssets(pageAsset, true));
};
```

Whereas the CMSPage uses a dynamic ID that is passed through the URL

```js
import { fetchPageAssets } from '../../ducks/hostedAssets.duck';

export const loadData = (params, search) => dispatch => {
  const pageId = params.pageId;
  const pageAsset = { [pageId]: `content/pages/${pageId}.json` };
  const hasFallbackContent = false;
  return dispatch(fetchPageAssets(pageAsset, hasFallbackContent));
};
```

The template can use hardcoded asset names for Pages included by default
in Console, as the paths are static and not subject to change. The Pages
included by default are the Landing Page, Terms of Service page and
Privacy Policy page.

The CMSPage component, on the other hand, is used to render any new
Pages created by the user, which are assigned an ID on creation.

### PageBuilder

Sharetribe Web Template uses a React component called the PageBuilder to
dynamically render content pages using Page Asset Data. You can find the
PageBuilder in the containers directory:

```shell
└── src
    └── containers
        └── PageBuilder
            └── PageBuilder.js
```

The PageBuilder component receives the Page Asset Data as a prop, and
uses it to render the content page. If no Page Asset Data is available,
it renders a fallback page.

```jsx
const PageBuilder = props => {
  const { pageAssetsData, inProgress, fallbackPage, options, ...pageProps } = props;

  if (!pageAssetsData && fallbackPage && !inProgress) {
    return fallbackPage;
  }
```

The PageBuilder will invoke the SectionBuilder component if Sections are
present in the Page Asset Data.

```jsx
const data = pageAssetsData || {};
const sectionsData = data?.sections || [];

<SectionBuilder sections={sectionsData} options={options} />;
```

Subsequently, the SectionBuilder will pass data on to the BlockBuilder
if an array of Blocks is present.

To render e.g. headers, links and images, the template defines a Field
component that is used in both the BlockBuilder and SectionBuilder.
Fields are the most granular form of data in Page Asset Data. The Field
component validates and sanitises any data before it is rendered.

## Section and Block types

Using the Pages feature in Console, you can define a section type. The
template recognises all Section types and renders each using a different
presentational component.

There are four Section types:

- Articles, meant for copy text and using a narrow one column layout
  optimized for reading
- Carousel, an image carousel consisting from images uploaded through
  Console
- Columns, content blocks rendered in a 1, 2, 3 or 4 column grid
- Features, text and media displayed side by side in alternating order

The corresponding Section component is selected using the getComponent
function in the SectionBuilder:

```js
const Section = getComponent(section.sectionType);
```

The getComponent function uses the defaultSectionComponents object to
select the correct React component:

```jsx
const defaultSectionComponents = {
  article: { component: SectionArticle },
  carousel: { component: SectionCarousel },
  columns: { component: SectionColumns },
  features: { component: SectionFeatures },
};
```

Each section component is wrapped in a SectionContainer. You can use it
to apply styling that should be present in each component.

Default components can be overridden or edited. Remember that the
changes will be global and reflected on each content page. If you want
to change a Section component on a specific page, you can use the
[options prop to override a page-level component](/how-to/options-prop/).

Blocks also have a type property. Currently, Page Asset Data only
supports a single Block type.

## Fallback pages

As the content of the page is retrieved over a network connection, it is
important to prepare for a scenario where data is unavailable due to
e.g. a network issue. The template uses fallback data if loading the
Page Asset Data through the Asset Delivery API fails. Fallback pages are
specified for page-level components and are included out of the box for
the Landing page, Terms of Service page and Privacy Policy page.

A fallback page is constructed similarly to how a dynamic content page
is. It uses the PageBuilder component, but instead of dynamically
retrieving Page Asset Data, it is given the pageAssetsData prop as a
predefined JSON asset. That data can be defined inline or in a separate
file. The fallback data should adhere to the structure and format used
in Page Asset Data.

A fallback page is defined in the same directory that the page level
component is defined in. For example, you will find the fallback page of
the Privacy Policy page under
containers/PrivacyPolicyPage/FallbackPage.js:

```shell
└── src
    └── containers
        └── PrivacyPolicyPage
            └── FallbackPage.js
```

## Maintenance mode

If the marketplace is missing some mandatory configurations, you will
see a fallback page with the title "Maintenance mode".

![Maintenance mode page](./maintenance-mode.png)

To fix the situation, make sure that you have added the following
mandatory configurations in your Console:

- [Branding](https://flex-console.sharetribe.com/a/design/branding)
- [Listing type](https://flex-console.sharetribe.com/a/listings/listing-types)
- [Listing fields](https://flex-console.sharetribe.com/a/listings/listing-fields)
- [Minimum transaction size](https://flex-console.sharetribe.com/a/transactions/minimum-transaction-size)

After you have made sure you have all these configurations added in your
Console, refresh the browser. Your marketplace should now show up with
the configurations you added.

If Maintenance mode still persists, check your browser developer tools
for further errors. You can also always reach out to our support through
the chat widget in your Console, and we will be happy to troubleshoot
the issue with you!

#### Additional tips on troubleshooting the maintenance mode error message

If your marketplace runs without issue on your local, but you see the
"maintenance mode" message on a cloud deployment (e.g., in Heroku or
Render), you should check that you have the correct Client ID set in
your environment variables. The marketplace uses the Client ID to fetch
your marketplace assets through our API.

You might also see the "maintenance mode" message if a
[Listing Field ID](/operator-guides/how-to-add-and-edit-listing-fields/#adding-a-new-field)
you've defined via Console clashes with any of the
[built-in public data fields](https://github.com/sharetribe/web-template/blob/main/src/util/configHelpers.js#L25-L33).
If this is the case, you will see a message about this when you open the
console view in your browser's developer tools tab.

## How to take Pages into use if you are using a legacy template

All Sharetribe Web Template versions support Pages. If you want to add
Pages capabilities to an older template that does not support Pages, you
can review
[the instructions in our legacy documentation](https://www.sharetribe.com/docs/legacy/template/page-builder/#how-to-take-pages-into-use-if-you-are-using-an-older-version-of-ftw).
