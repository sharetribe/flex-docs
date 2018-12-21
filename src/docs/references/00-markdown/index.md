---
title: Markdown reference
slug: markdown
date: 2018-12-04
category: references
ingress: This reference article showcases the supported Markdown syntax.
skills: open mind, content editing, language
readingTime: 5 mins at a time!
---

## Horizontal line

A Horizontal line can be added with `---` in its own line.

---

## Headings

There are six levels of headings. H1 **should not be used within an article**
since that is reserved for the article title defined in the metadata.

# H1 level heading

## H2 level heading

### H3 level heading

#### H4 level heading

##### H5 level heading

###### H6 level heading

---

## Text

Paragraphs work as expected. You can add **bold**, _italic_, or ~~strike
through~~ emphasis for text and `quote` around inline code.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse elit mi,
tempus ac turpis vitae, interdum facilisis urna. Nulla euismod ante vitae velit
maximus vestibulum. Sed id lorem non augue porttitor vehicula. Fusce molestie
elementum suscipit. Suspendisse ac felis pretium, blandit dui id, condimentum
felis. Suspendisse commodo elementum augue sit amet commodo. Integer sit amet
diam in quam viverra pulvinar quis vitae mi. Donec est nunc, lobortis vitae
risus a, congue pharetra quam. Nulla ut iaculis nunc. Nullam massa odio,
volutpat eget felis ac, congue ultrices lectus. Donec gravida erat et laoreet
aliquet. Nunc a dui nisi. Aliquam quis efficitur mauris. Vivamus in pretium
velit. Proin id leo interdum, imperdiet velit ut, hendrerit odio.

Aenean augue nulla, viverra et purus ut, vulputate tincidunt lacus. Etiam
feugiat bibendum velit in pellentesque. Quisque non metus eget risus luctus
maximus id et massa. Sed id vulputate ligula. Donec in placerat ante. Nunc ut
dolor ultrices, faucibus mi in, ultricies ex. In volutpat condimentum vehicula.
Vestibulum ut nisl id eros sollicitudin finibus. Class aptent taciti sociosqu ad
litora torquent per conubia nostra, per inceptos himenaeos. Nam interdum libero
vel est volutpat, lobortis varius lorem hendrerit. Maecenas mi risus, accumsan
sodales ultricies et, ornare eget turpis. Mauris sed libero non mi tempus rutrum
vel non odio.

Praesent tincidunt ipsum et diam eleifend mattis. Duis semper, justo quis
faucibus porta, lacus lectus tincidunt sapien, nec laoreet velit purus et nunc.
Suspendisse quis massa eu urna ultricies tempor a mattis dui. Pellentesque et
sem nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
per inceptos himenaeos. Suspendisse potenti. Integer vel elit commodo, volutpat
erat eget, convallis ligula. Mauris ut porta dui.

---

## Lists

- **`ENV_VAR1`**

  Explanation for first env var

- **`ENV_VAR2`**

  Explanation for first env var

Unordered list:

- list item 1
- list item 2
- list item 3

Unordered list with sub list:

- Lorem ipsum dolor sit amet, consectetur adipiscing elit.

  Suspendisse elit mi, tempus ac turpis vitae, interdum facilisis urna.

  Nulla euismod ante vitae velit maximus vestibulum. Sed id lorem non augue
  porttitor vehicula. Fusce molestie elementum suscipit. Suspendisse ac felis
  pretium, blandit dui id, condimentum felis. Suspendisse commodo elementum
  augue sit amet commodo. Integer sit amet diam in quam viverra pulvinar quis
  vitae mi. Donec est nunc, lobortis vitae risus a, congue pharetra quam. Nulla
  ut iaculis nunc. Nullam massa odio, volutpat eget felis ac, congue ultrices
  lectus. Donec gravida erat et laoreet aliquet. Nunc a dui nisi. Aliquam quis
  efficitur mauris. Vivamus in pretium velit. Proin id leo interdum, imperdiet
  velit ut, hendrerit odio.

- list item 2

  list item 2 extra line

  - sub item 2 1
  - sub item 2 2
  - sub item 2 2

- list item 3

Ordered list:

1. numbered item 1
1. numbered item 2
1. numbered item 3

---

## Literal HTML

Using literal HTML within Markdown files should be minimized since the styles
are most likely missing for uncommon elements.

There is one clear case where literal links are useful, however. If you want to
have sections that can be linked to, you can add a heading with an id and use
that id in an internal link.

<h2 id="literal-h2-html-element">This is a h2 heading in HTML</h2>

**TODO:** make sections linkable automatically

---

## Links

Here's a link: https://www.sharetribe.com/

Here's a link with a separate text and a hover title:
[sharetribe.com](https://www.sharetribe.com/ 'click to open link')

Also an [internal link](/).

Here's an internal link to the
[#literal-h2-html-element](#literal-h2-html-element) in this document.

---

## Block quotes

Here is a simple quote:

> simple block quote

Block quotes can have several lines or even nested block quotes.

> block quote line 1
>
> block quote line 2 with **emphasis**
>
> > nested block quote

---

## Code blocks

This is an indented code block:

    console.log('foobar');

This is a JavaScript code block:

```javascript
console.log('this is a test:', { key: [1, 'str', false] });
```

---

## Images

Images can be placed in the article directory and imported with a relative link.
Responsive versions are automatically created with maximum width defined in the
`gatsby-config.js` file.

Here is an example screenshot of Saunatime with an alt text:

![Saunatime screenshot alt text](./saunatime.png)

Note that images also break the baseline alignment since the height is dynamic.

---

## Tables

Tables should not be usually used since they don't work well on mobile. If you
still insist, you can have them, but they won't quite be aligned to the baseline
:(

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| don't    | use      | tables   |
| unless   | you      | know     |
| what     | you're   | doing    |

---

## Formatting Markdown files with Prettier

Run

    yarn run format-docs

to format all Markdown files within `src/`.

---

# Static pages

If you want to create simple pages that just show static content without need
for data fetches, you can create a static page.

Steps for creating a static page:

1.  [Create a new folder under `src/containers/`](#1-creating-a-new-folder)
2.  [Create a new JavaScript file using the same name.](#2-creating-a-javascript-file)
3.  [Create a new CSS file using the same name.](#3-creating-a-css-file)
4.  [Write the content to a JavaScript file (i.e. AboutPage.js in our example).](#4-creating-the-component)
5.  [Write the style rules to CSS file (i.e. AboutPage.css in our example).](#5-adding-some-styles-to-the-css-file)
6.  [Add the newly created page component to `src/containers/index.js`](#6-adding-the-component-to-the-component-directory)
7.  [Add the newly created page to `src/routeConfiguration.js`](#7-adding-a-route-to-the-page)

## 1. Creating a new folder

Create a new folder under `src/containers/` with the name of your static page.
E.g. "about" page should be named as `AboutPage`.

## 2. Creating a JavaScript file

Create a new JavaScript file using the folder name. The path should look like
`src/containers/AboutPage/AboutPage.js`.

## 3. Creating a CSS file

Create a new CSS file using the folder name. The path should look like
`src/containers/AboutPage/AboutPage.css`.

## 4. Creating the component

Template for a single column static page (AboutPage.js): (We'll go through this
line-by-line below.)

```jsx
import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  ExternalLink,
} from '../../components';

import css from './AboutPage.css';
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
            <ExternalLink href="https://google.com">Go to Google</ExternalLink>
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
[JSX](https://reactjs.org/docs/introducing-jsx.html) to create components and
pages. Therefore, we need to import React to our new component which is done in
the first line.

```jsx
import React from 'react';
```

In the second line we are importing two containers:

- `StaticPage`: helps in creating static pages
- `TopbarContainer`: creates our Topbar component and fetches the data it needs.

```jsx
import { StaticPage, TopbarContainer } from '../../containers';
```

After that we need to import some components:

- `LayoutSingleColumn` and wrappers that it needs to position content
- `Footer` component (to be added inside LayoutWrapperFooter)
- `NamedLink` makes it easier to point to different pages inside the application
- `ExternalLink` can be used to link outside the application. It creates a
  normal `<a>`link with extra attributes
  `target="_blank" rel="noopener noreferrer"` that add some security to these
  outbound links.

`LayoutSingleColumn` (and other layouts like LayoutSideNavigation) need to
understand what the content is about. Therefore, different parts of the page
need to be wrapped with specific components - in this case:
`LayoutWrapperTopbar`, `LayoutWrapperMain`, and `LayoutWrapperFooter`.

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

Then we need to import styles and possible other files from current folder. With
CSS we are using [CSS Modules](https://github.com/css-modules/css-modules) to
tackle possible classhes of different class names.
[Read more.](#5-creating-the-css-file)

```jsx
import css from './AboutPage.css';
```

Then we also import an image which is used later
(`<img src={image} alt="My first ice cream." />`).

```jsx
import image from './path/to/image.png';
```

Then after all the imports we are finally getting into phase were we define the
component. `const AboutPage = props => { return <div></div>}` defines a
component called AboutPage with content defined in return part. This is a
[functional component](https://reactjs.org/docs/components-and-props.html).

In the template above we are using StaticPage component with some attributes:

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
- `title="About"` creates `<title>About</title>` element to `<head>` section of
  the page. (That title is also used in OpenGraph meta tags). You could also add
  `description="This is about page description"`
- Then we have `schema` tag that defines some data for search engines in JSON-LD
  format. Check [schema.org](http://schema.org/docs/full.html) for more
  information.

Inside `StaticPage` component we define layout (`LayoutSingleColumn`) and add
other components inside semantic content wrappers so that the layout is able to
understand where to render those blocks.

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
      <ExternalLink href="https://google.com">Go to Google</ExternalLink>
    </div>
  </LayoutWrapperMain>
  <LayoutWrapperFooter>
    <Footer />
  </LayoutWrapperFooter>
</LayoutSingleColumn>
```

And as a final step we need to export the component.
`export default AboutPage;`. See more from
[babeljs.org](https://babeljs.io/learn-es2015/#ecmascript-2015-features-modules)

## 5. Adding some styles to the CSS file

Here's an example what your AboutPage.css file could look like:

```css
@import '../../marketplace.css';

.root {
  padding: 24px;

  /* Use CSS variable imported from marketplace.css */
  background-color: var(--marketplaceColor);
}
```

## 6. Adding the component to the component directory

New component needs to be added to `src/containers/index.js` file or if it's a
presentational component (not page or form) it should be inside components
folder and therefore added to `src/components/index.js`

Inside that index.js you need to add line
`export { default as AboutPage } from './AboutPage/AboutPage';`. This helps
other parts of the app to import new components easily with
`import { AboutPage } from '../../components'`.

## 7. Adding a route to the page

As a last step you need to add the newly created static page to the routing.
This can be done in `src/routeConfiguration.js`.

Inside routeConfiguration function you should add a URL path, a page name (it
should not conflicting with other pages), and the component itself.

Add it as first to the list of imported pages in alphabetical order (2nd line):

```jsx
import {
  AboutPage,
  AuthenticationPage,
  CheckoutPage,
```

and after that add the route configuration to your newly created page: (In this
example we created about page so '/about' would work well as a path.)

```javascript
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage,
    },
```

## Read more

We are using several libraries in this example. If you want to read more, here's
some pointers:

- [ES2015](https://babeljs.io/learn-es2015/): imports, exports, arrow functions
- [React](https://reactjs.org/): for creating components
- [JSX](https://reactjs.org/docs/introducing-jsx.html): for getting HTML-like
  markup syntax for own components
- [CSS Modules](https://github.com/css-modules/css-modules)
- [React Router](https://reacttraining.com/react-router/web/guides/philosophy):
  routing inside the application.

---

# Environment configuration variables

The following configuration variables can be set to control the Flex template
app behaviour. Most of them have defaults that work for development environment.
For production deploys most should be set.

| Variable                                  | Description                                                                                                             |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| REACT_APP_MAPBOX_ACCESS_TOKEN             | See: [Integrating to map providers](./map-providers.md)                                                                 |
| REACT_APP_GOOGLE_MAPS_API_KEY             | See: [Google Maps API key](./google-maps.md) (Alternative map provider)                                                 |
| REACT_APP_SHARETRIBE_SDK_CLIENT_ID        | Client ID (API key). You will get this from the Sharetribe team.                                                        |
| REACT_APP_STRIPE_PUBLISHABLE_KEY          | Stripe publishable API key for generating tokens with Stripe API. Use test key (prefix pk*test*) for development.       |
| REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY | The currency used in the Marketplace as ISO 4217 currency code. For example: USD, EUR, CAD, AUD, etc.                   |
| REACT_APP_CANONICAL_ROOT_URL              | Canonical root url of the marketplace. Needed for social media sharing and SEO optimization.                            |
| NODE_ENV                                  | Node env. Use 'development' for development and 'production' for production.                                            |
| PORT                                      | Port for server to accept connections.                                                                                  |
| REACT_APP_ENV                             | A more fine grained env definition than NODE_ENV. Is used for example to differentiate envs in logging.                 |
| REACT_APP_SHARETRIBE_USING_SSL            | Redirect HTTP to HTTPS?                                                                                                 |
| SERVER_SHARETRIBE_TRUST_PROXY             | Set when running the app behind a reverse proxy, e.g. in Heroku.                                                        |
| REACT_APP_PUBLIC_SENTRY_DSN               | See: [Error logging with Sentry](./sentry.md)                                                                           |
| SERVER_SENTRY_DSN                         | See: [Error logging with Sentry](./sentry.md)                                                                           |
| REACT_APP_CSP                             | See: [Content Security Policy (CSP)](./content-security-policy.md)                                                      |
| BASIC_AUTH_USERNAME                       | Set to enable HTTP Basic Auth                                                                                           |
| BASIC_AUTH_PASSWORD                       | Set to enable HTTP Basic Auth                                                                                           |
| REACT_APP_GOOGLE_ANALYTICS_ID             | See: [Google Analytics](./analytics.md)                                                                                 |
| REACT_APP_AVAILABILITY_ENABLED            | Enables availability calendar for listings.                                                                             |
| REACT_APP_DEFAULT_SEARCHES_ENABLED        | Enables default search suggestions in location autocomplete search input.                                               |
| REACT_APP_SHARETRIBE_SDK_BASE_URL         | The base url to access the Sharetribe Flex Marketplace API. FTW uses the correct one by default so no need to set this. |

## Defining configuration

When the app is started locally with `yarn run dev` or `yarn run dev-server`,
you can set environment variables by using the (gitignored) `.env` file. The
repository contains a template file `.env-template` with default configuration.
Just copy that as `.env` and edit as necessary.

In production, it's recommended that you set the configuration via env variables
and do not deploy an .env file. The client application will only be packaged
with env variables that start with REACT_APP. This way server secrets don't end
up in client bundles.

**With deploys note that the configuration options are bundled in the client
package at build time.** The configuration of the build environment must match
run environment for things to work consistently. To apply changes to
configuration values client bundle must be rebuilt. Just restarting the server
is not enough.
