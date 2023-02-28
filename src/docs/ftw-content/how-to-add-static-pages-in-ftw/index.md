---
title: How to add a static page
slug: how-to-add-static-pages-in-ftw
updated: 2023-02-14
category: ftw-content
ingress:
  This guide describes how to add a non-dynamic static page using the
  Sharetribe Web Template
published: true
---

You can create new content pages through the Console using the Pages
feature. However, sometimes you may need a static page that does not use
dynamic content. This guide walks you through the steps required to
create a static and non-dynamic content page, from where to create the
new component to how to add new routes.

You might want to do this, for instance, if

- you have a page that embeds a component that fetches its own data, or
- you want to optimise some pages for performance, so that they don't
  fetch any data.

<info>

If you do not have a specific reason to create a static page directly
into the codebase, we recommend that you create your content pages using
[Pages](/concepts/content-management/). With Pages, you can create
multiple content pages in Flex Console and render them all using
[the same components in FTW](/ftw/page-builder/).

</info>

## 1. Create a new folder

Create a new folder under _src/containers/_ with the name of your static
page. E.g. if you are creating a page for embedding your social media
feeds, it should be named **SocialMediaPage**.

Create a new JavaScript file using the folder name. The path should look
like _src/containers/SocialMediaPage/SocialMediaPage.js_.

Create a new CSS file using the folder name. The path should look like
_src/containers/SocialMediaPage/SocialMediaPage.module.css_.

## 2. Create the component

Template for a single column static page (SocialMediaPage.js): (We'll go
through this line-by-line below.)

```jsx
import React from 'react';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  ExternalLink,
} from '../../components';

import StaticPage from '../../containers/StaticPage/StaticPage';
import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';

import css from './SocialMediaPage.module.css';
import image from './path/to/image.png';

const SocialMediaPage = () => {
  return (
    <StaticPage
      className={css.root}
      title="Social media"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'SocialMediaPage',
        description: 'Description of this page',
        name: 'Social media page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <!-- You will add your embedding widgets here -->
          <div>
            <NamedLink name="LandingPage">
              Go to the home page
            </NamedLink>{' '}
            or{' '}
            <ExternalLink href="https://google.com">
              Go to Google
            </ExternalLink>
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default SocialMediaPage;
```

We are using [React](https://reactjs.org/) and
[JSX](https://reactjs.org/docs/introducing-jsx.html) to create
components and pages. Therefore, we need to import React to our new
component which is done in the first line.

```jsx
import React from 'react';
```

### Import components

On the second line, we import some components:

- **LayoutSingleColumn** and the wrappers that it needs to position
  content on the page
- **Footer** component (to be added inside LayoutWrapperFooter)
- **NamedLink** makes it easier to point to different pages inside the
  application
- **ExternalLink** can be used to link outside the application. It
  creates a normal `<a>`link with extra attributes
  `target="_blank" rel="noopener noreferrer"` that add some security to
  these outbound links.

**LayoutSingleColumn** (and other layouts like LayoutSideNavigation)
need to understand what the content is about. Therefore, different parts
of the page need to be wrapped with specific components - in this case:
**LayoutWrapperTopbar**, **LayoutWrapperMain**, and
**LayoutWrapperFooter**.

```jsx
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  ExternalLink,
} from '../../components';
```

After that we are importing two containers:

- **StaticPage**: helps in creating static pages
- **TopbarContainer**: creates our Topbar component and fetches the data
  it needs.

```jsx
import StaticPage from '../../containers/ContentPage/ContentPage';
import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';
```

Then we need to import styles and possible other files from current
folder. The template uses
[CSS Modules](https://github.com/css-modules/css-modules) to scope all
class names locally to prevent conflicts.

```jsx
import css from './SocialMediaPage.module.css';
```

Then we also import an image which is used later
(`<img src={image} alt="My first ice cream." />`).

```jsx
import image from './path/to/image.png';
```

Then after all the imports we are finally getting into phase were we
define the component.
`const SocialMediaPage = props => { return <div></div>}` defines a
component called SocialMediaPage with content defined in return part.
This is a
[functional component](https://reactjs.org/docs/components-and-props.html).

### Add page schema

In the template above we are using StaticPage component with some
attributes:

```jsx
    <StaticPage
      className={css.root}
      title="Social media"
      schema={{
        "@context": "http://schema.org",
        "@type": "CollectionPage",
        "description": "Description of this page",
        "name": "Social media page",
      }}
    >
```

- `className` is JSX name for `class` attribute used in plain HTML.
- `title="Social media"` creates `<title>Social media</title>` element
  to `<head>` section of the page. (That title is also used in OpenGraph
  meta tags). You could also add
  `description="This is the description for the social media page"`
- Then we have `schema` tag that defines some data for search engines in
  JSON-LD format. Check [schema.org](https://schema.org/docs/full.html)
  for more information. You can also review
  [Google's structured data types](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
  to see if one of them fits your use case.

### Define component structure

Inside the **StaticPage** component we define layout
(**LayoutSingleColumn**) and add other components inside semantic
content wrappers so that the layout is able to understand where to
render those blocks.

```jsx
<LayoutSingleColumn>
  <LayoutWrapperTopbar>
    <TopbarContainer />
  </LayoutWrapperTopbar>
  <LayoutWrapperMain>
    <!-- You will add your embedding widgets here -->
    <div>
      <NamedLink name="LandingPage">Go to the home page</NamedLink> or{' '}
      <ExternalLink href="https://google.com">
        Go to Google
      </ExternalLink>
    </div>
  </LayoutWrapperMain>
  <LayoutWrapperFooter>
    <Footer />
  </LayoutWrapperFooter>
</LayoutSingleColumn>
```

And as a final step we need to export the component.
`export default SocialMediaPage;`. See more from
[babeljs.org](https://babeljs.io/docs/en/learn/#modules)

## Style the component

Here's an example what your _SocialMediaPage.module.css_ file could look
like:

```css
/**
 * Import custom media queries for the new page.
 * The template uses route-based code-splitting, every page create their own CSS files.
 * This import ensures that the page and components inside will get correct media queries,
 * when the app is build.
 */
@import '../../styles/customMediaQueries.css';

.pageTitle {
  text-align: center;
}

.staticPageWrapper {
  width: calc(100% - 48px);
  max-width: 1056px;
  margin: 24px auto;

  @media (--viewportMedium) {
    width: calc(100% - 72px);
    margin: 72px auto;
  }
}
```

## Add routing

As a last step you need to add the newly created static page to the
routing. This can be done in _src/routing/routeConfiguration.js_.

Inside routeConfiguration function you should add a URL path, a page
name (it should not conflicting with other pages), and the component
itself.

Add a new asynchronous import for the page in the beginning of the file
with other page imports:

```js
const SocialMediaPage = loadable(() =>
  import(
    /* webpackChunkName: "SocialMediaPage" */ './containers/SocialMediaPage/SocialMediaPage'
  )
);
```

and after that add the route configuration to your newly created page:
(In this example we created social media page so '/socialmedia' would
work well as a path.)

```javascript
{
  path: '/socialmedia',
  name: 'SocialMediaPage',
  component: SocialMediaPage,
},
```

## Read more

We are using several libraries in this example. If you want to read
more, here's some pointers:

- [ES2015](https://babeljs.io/docs/en/learn/): imports, exports, arrow
  functions
- [React](https://reactjs.org/): for creating components
- [JSX](https://reactjs.org/docs/introducing-jsx.html): for getting
  HTML-like markup syntax for own components
- [CSS Modules](https://github.com/css-modules/css-modules)
- [React Router](https://reacttraining.com/react-router/web/guides/philosophy):
  routing inside the application.
