---
title: How to add static pages in FTW
slug: how-to-add-static-pages-in-ftw
updated: 2021-02-15
category: ftw-content
ingress:
  This guide describes how to add pages with static content in Flex
  Template for Web (FTW).
published: true
---

If you want to create simple pages that just show static content without
need for data fetches, you can create a static page.

## 1. Create a new folder

Create a new folder under _src/containers/_ with the name of your static
page. E.g. "about" page should be named as **AboutPage**.

## 2. Create a JavaScript file

Create a new JavaScript file using the folder name. The path should look
like _src/containers/AboutPage/AboutPage.js_.

## 3. Create a CSS file

Create a new CSS file using the folder name. The path should look like
_src/containers/AboutPage/AboutPage.module.css_.

## 4. Create the component

Template for a single column static page (AboutPage.js): (We'll go
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

import css from './AboutPage.module.css';
import image from './path/to/image.png';

const AboutPage = () => {
  return (
    <StaticPage
      className={css.root}
      title="About"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'Description of this page',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <h1>Some content</h1>
          <img src={image} alt="My first ice cream." />
          <div>
            <NamedLink name="LandingPage">Go to home page</NamedLink> or
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

export default AboutPage;
```

We are using [React](https://reactjs.org/) and
[JSX](https://reactjs.org/docs/introducing-jsx.html) to create
components and pages. Therefore, we need to import React to our new
component which is done in the first line.

```jsx
import React from 'react';
```

In the second line we import some components:

- **LayoutSingleColumn** and wrappers that it needs to position content
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
import StaticPage from '../../containers/StaticPage/StaticPage';
import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';
```

Then we need to import styles and possible other files from current
folder. With CSS we are using
[CSS Modules](https://github.com/css-modules/css-modules) to tackle
possible clashes of different class names.

```jsx
import css from './AboutPage.module.css';
```

Then we also import an image which is used later
(`<img src={image} alt="My first ice cream." />`).

```jsx
import image from './path/to/image.png';
```

Then after all the imports we are finally getting into phase were we
define the component. `const AboutPage = props => { return <div></div>}`
defines a component called AboutPage with content defined in return
part. This is a
[functional component](https://reactjs.org/docs/components-and-props.html).

In the template above we are using StaticPage component with some
attributes:

```jsx
    <StaticPage
      className={css.root}
      title="About"
      schema={{
        "@context": "http://schema.org",
        "@type": "AboutPage",
        "description": "Description of this page",
        "name": "About page",
      }}
    >
```

- `className` is JSX name for `class` attribute used in plain HTML.
- `title="About"` creates `<title>About</title>` element to `<head>`
  section of the page. (That title is also used in OpenGraph meta tags).
  You could also add `description="This is about page description"`
- Then we have `schema` tag that defines some data for search engines in
  JSON-LD format. Check [schema.org](https://schema.org/docs/full.html)
  for more information.

Inside **StaticPage** component we define layout
(**LayoutSingleColumn**) and add other components inside semantic
content wrappers so that the layout is able to understand where to
render those blocks.

```jsx
<LayoutSingleColumn>
  <LayoutWrapperTopbar>
    <TopbarContainer />
  </LayoutWrapperTopbar>
  <LayoutWrapperMain>
    <h1>Some content</h1>
    <img src={image} alt="My first ice cream." />
    <div>
      <NamedLink name="LandingPage">Go to home page</NamedLink> or
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
`export default AboutPage;`. See more from
[babeljs.org](https://babeljs.io/docs/en/learn/#modules)

## 5. Add some styles to the CSS file

Here's an example what your _AboutPage.module.css_ file could look like:

```css
/**
 * Import custom media queries for the new page.
 * FTW-template use route-based code-splitting, every page create their own CSS files.
 * This import ensures that the page and components inside will get correct media queries,
 * when the app is build.
 */
@import '../../styles/customMediaQueries.css';

.root {
  padding: 24px;

  /* Use CSS variable defined in src/styles/marketplaceDefaults.css */
  background-color: var(--marketplaceColor);
}
```

## 6. Add a route to the page

As a last step you need to add the newly created static page to the
routing. This can be done in _src/routeConfiguration.js_. (In
FTW-product the file is moved to _src/routing/routeConfiguration.js_.)

Inside routeConfiguration function you should add a URL path, a page
name (it should not conflicting with other pages), and the component
itself.

Add a new asynchronous import for the page in the beginning of the file
with other page imports:

```js
const AboutPage = loadable(() =>
  import(
    /* webpackChunkName: "AboutPage" */ './containers/AboutPage/AboutPage'
  )
);
```

and after that add the route configuration to your newly created page:
(In this example we created about page so '/about' would work well as a
path.)

```javascript
{
  path: '/about',
  name: 'AboutPage',
  component: AboutPage,
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
