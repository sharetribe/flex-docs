---
title: Styling and CSS
slug: how-to-customize-ftw-styles
updated: 2023-01-01
category: ftw-styling
ingress:
  This guide describes the CSS architecture used in the Sharetribe Web
  Template and how to apply changes to the styling using CSS.
published: true
---

The goal for the template was to keep stylesheets as close as possible
to plain CSS while still trying to avoid the mess that comes along with
the globally defined cascading behaviour.

To tackle this goal, we have split the styling into two levels:

- [Marketplace level styling](#marketplace-level-styling) with 3 global
  stylesheets:
  - _src/styles/**marketplaceDefaults.css**_ (contains CSS variables,
    element styles, and global CSS classes)
  - _src/styles/**customMediaQueries.css**_ (contains breakpoints for
    responsive layout)
- [Component level styling](#styling-components) using
  [CSS Modules](https://github.com/css-modules/css-modules)

## Marketplace level styling

Marketplace-level styling refers to global styles used across the
template. The stylesheets presented in this section contain variables
such as `marketplaceColor`, which defines the primary colour used in
many icons and fonts across the marketplace.

```shell
└── src
    └── styles
        ├── customMediaQueries.css
        └── marketplaceDefaults.css
```

We have created marketplace-level styling variables with
[CSS Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
(vars) and a few global CSS classes.

The concept behind
[CSS Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
is quite straightforward - they are variables that can be defined in
root-element level (`<html>`) and then used inside some CSS rule.

```css
/* in src/styles/marketplaceDefaults.css */
:root {
  --marketplaceColor: #ffff00;
}
```

```css
/* in component.module.css */
.linkToHomePage {
  color: var(--marketplaceColor);
}
```

Read more about CSS Properties from
[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

### customMediaQueries.css

Breakpoints for media queries are defined in customMediaQueries.css.

```css
@custom-media --viewportSmall (min-width: 550px);
@custom-media --viewportMedium (min-width: 768px);
@custom-media --viewportLarge (min-width: 1024px);
// etc.
```

These custom media query breakpoints can be used in a similar way as CSS
Properties. However, these variables are converted to real media queries
during build-time.

```css
@media (--viewportMedium) {
  /* CSS classes */
}
```

On a live site, the CSS file contains:

```css
@media (min-width: 768px) {
  /* CSS classes */
}
```

### marketplaceDefaults.css

This is a good place to start customizing marketplace styles. For
example, we define our color scheme here using
[CSS Property](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
variables:

```css
/* ================ Colors ================ */

--marketplaceColor: #c0392b;
--marketplaceColorLight: #ff4c38;
--marketplaceColorDark: #8c291e;

/* Used with inline CSS SVGs */
--marketplaceColorEncoded: %23c0392b;

--successColor: #2ecc71;
--successColorDark: #239954;
--failColor: #ff0000;
--attentionColor: #ffaa00;

--matterColorDark: #000000;
--matterColor: #4a4a4a;
--matterColorAnti: #b2b2b2;
--matterColorNegative: #e7e7e7;
--matterColorBright: #fcfcfc;
--matterColorLight: #ffffff;
```

Changing `--marketplaceColor: #c0392b;` to `--marketplaceColor: tomato;`
will change the default marketplace color to tomato color. (It's a
certain kind of red color.)

The `--marketplaceColorEncoded` variable holds the same value as
`--marketplaceColor` but with the _#_ URL encoded. This value can be
used to maintain a consistent color scheme with inline SVG icons.

`--successColor` (green) is used in form inputs for showing that the
input value is valid. Sometimes, submit buttons (`<PrimaryButton>`) are
also using that color to highlight the fact that user has entered valid
information to the form at hand.

Similarly `--failColor` is used to style errors and `--attentionColor`
is used to draw user's attention to certain UI components (e.g. required
form inputs, or important info in Inbox)

Our greyscale colors (for borders and background colors) are named with
prefix _"matter"_.

Similar pattern is also used to create more consistent UI components by
providing variables for box-shadows, border-radiuses, transitions, and
so on. Our current plan is to parameterize styling even more using this
concept.

In addition, this file provides default styles for plain elements like
`<body>`, `<a>`, `<p>`, `<input>`, `<h1>`, `<h2>`, and so on. There are
also some global CSS classes that components can use.

### Global CSS classes

Fonts and some other shared styles are specified in the
marketplaceDefaults.css file using global (vanilla) CSS classes. They
provide us a way to share some generic styles between components.

For example, our default font is defined as:

```css
.marketplaceDefaultFontStyles {
  font-family: var(--fontFamily);
  font-weight: var(--fontWeightMedium);
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.1px;
  /* No margins for default font */

  @media (--viewportMedium) {
    font-size: 16px;
    line-height: 32px;
  }
}
```

The new class can be used inside a component's
[CSS Module syntax](#styling-components):

```css
.tip {
  composes: marketplaceDefaultFontStyles from global;
}
```

<info>

The template app follows a pattern where the height of an element should
be divisible by **6px** on mobile layout and **8px** on bigger layouts.
This also affects line-heights of font styles.

</info>

## Fonts

You can find all font-related rule sets from the
[marketplaceDefaults.css](https://github.com/sharetribe/ftw-x/blob/main/src/styles/marketplaceDefaults.css)
file. The default font is defined in the `--fontFamily`
[CSS variable](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).
The template uses either the Mac OS system font or
[Inter](https://fonts.google.com/specimen/Inter) if any other operating
system is in use. Even though Inter is a Google Font, it gets served
through the Sharetribe CDN for performance reasons. The
[public/index.html](https://github.com/sharetribe/ftw-x/blob/main/public/index.html)
is responsible for actually loading the fonts into the application.

If you want to change the font, you must make changes to both
[marketplaceDefaults.css](https://github.com/sharetribe/ftw-x/blob/main/src/styles/marketplaceDefaults.css)
and
[public/index.html](https://github.com/sharetribe/ftw-x/blob/main/public/index.html).
If you're interested in different font-loading strategies, see these
links:

- https://www.zachleat.com/web/comprehensive-webfonts/
- https://css-tricks.com/the-best-font-loading-strategies-and-how-to-execute-them/

## Styling components

Styling a web UI is traditionally quite a messy business due to the
global nature of stylesheets and especially their cascading specificity
rule. `.card {/*...*/}` will affect every element on a web page that has
a class **"card"** - even if the different UI context would like to use
a different set of rules.

Our goal has been to create independent components that can be reused in
the UI without paying too much attention to the global CSS context. To
achieve this, we have used
[CSS Modules](https://github.com/css-modules/css-modules), which keeps
the syntax close to plain CSS, but it actually creates unique class
names to remove the problems caused by the global nature of CSS. In
practice, this means that a class with name **card** is actually renamed
as **_ComponentName_card\_\_3kj4h5_**.

To use styles defined in SectionHero.module.css, we need to import the
file into the component:

```jsx
import css from './SectionHero.module.css';
```

and then select the correct class from imported style object (in this
case **heroMainTitle**):

```jsx
<h1 className={css.heroMainTitle}>Book saunas everywhere</h1>
```

### Finding a component

Quite often one needs to find a component that is responsible for
certain UI partial in order to change the styles. In this case, the
easiest way to pinpoint a component is to open the inspector from
browser's dev tools. Right-click on top of the correct element, and
select _Inspector_, or something of the sort depending on the browser,
from the context menu.

// TODO Update screenshot + related code

![Mobile LandingPage hero title](./styling-find-component.png)

Here we have opened title on LandingPage and the styles for the
**heroMainTitle** heading:

```html
<h1 class="SectionHero_heroMainTitle__3mVNg">
  <span>Book saunas everywhere.</span>
</h1>
```

Styles are defined in a "class" called
**`SectionHero_heroMainTitle__3mVNg`**. As stated before, the first part
of a class name is actually giving us a hint about what component is
defining that style - in this case, it's _SectionHero_ and its styles
can be found from the file: **SectionHero.module.css**.

```shell
└── src
    └── containers
        └── LandingPage
            └── SectionHero
               └── SectionHero.js
               └── SectionHero.module.css
```

### Styling guidelines

We have a practice of naming the outermost class of a component as
`.root { /* styles */ }`. So, if the component is just rendering single
element it only has **.root** class, and if there's more complex inner
DOM structure needed, additional classes are named semantically.

`<SectionHero>` could contain classes named as **.root**,
**.heroMainTitle**, **.heroSubtitle**.

Some guidelines we have tried to follow:

- **Use semantic class names**<br/> They improve readability and
  decouples style changes from DOM changes.
- **Use the
  [CSS Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
  defined in marketplaceDefaults.css**<br/> and create new ones when it
  makes sense.
- **Use classes**, don't style DOM elements directly.<br/> Element
  styles are global even with CSS Modules.
- **Avoid nesting styles**.<br/> CSS Modules makes specificity rules
  unnecessary.
- **Group and comment style rules** inside declaration block if that
  improves readability.
- **Parent component is responsible for allocating space** for a child
  component (i.e. dimensions and margins).
- **Define `composes` declarations early enough** inside the declaration
  block.<br/> Be careful: rules inside those global CSS declarations
  might overwrite rules written inside the component's own class. This
  depends on the specificity given in the global (vanilla) CSS file.
- **Align text and components** to horizontal baselines. I.e. they
  should be a multiple of **_6px_** on mobile layout and **_8px_** on
  bigger screens.
- **Component height should follow baselines too**.<br/> I.e. they
  should be a multiple of **_6px_** on mobile layout and **_8px_** on
  bigger screens. _(Unfortunately, we haven't been strict with this
  one.)_

### Parent vs child

One important aspect of a component-based UI is the fact that a
component is usually only responsible for what happens inside its
outermost element boundary. In parent-child context this means that the
parent component is responsible for its own layout and therefore it
usually needs to be able to give some dimensions to its child components
(and naturally margins between them).

This creates a need for the parent to have means to pass **className**
to its child as props. One example could be a component that shows a
circle component inside itself and makes it 50px wide.

Style definitions of the (`<Circle />`) child component:

```css
.root {
  background-color: tomato;
  border-radius: 50%;
}
```

Parent component could render something like:

```jsx
<div className={css.root}>
  <Circle className={css.circleDimensions} />
</div>
```

and it uses classes:

```css
.root {
  min-width: 60px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circleDimensions {
  flex-grow: 0;
  width: 50px;
  height: 50px;
  margin: 5px;
}
```

Sometimes the child component needs to be styled even further than just
allocating space to it. If the parent component wants to change the
theme of child component there are generally two concepts available:

- Create themed components (e.g. `<PrimaryButton>`, `<SecondaryButton>`,
  `<InlineButton>`)
- Pass in a **class** property that is able to overwrite original
  styling rules.

For the latter option, we have created a prop type concept called
**_rootClassName_**. If you pass **rootClassName** through props to a
component, it will use that instead of component's own style rules
defined in **.root**. This ensures that the order of style declarations
inside final CSS bundle doesn't affect the final styles. (CSS bundle is
generated in an import order, therefore we want to avoid situations
where `<Component className="classA classB"/>` could end up overwriting
each others depending on the order they are imported.)

```jsx
import React from 'react';
import css from './MyComponent.module.css';

export const MyComponent = props => {
  const { className, rootClassName } = props;
  const classes = classNames(rootClassName || css.root, className);
  return <div className={classes}>Hello World</div>;
};
```

In some complex cases, we have also created props for overwriting some
inner classes of child components. In these cases, child component is
also replacing its own styling class with the class passed-in through
props. For example, `<LocationAutocompleteInput>` can take a prop called
**iconClassName**, which (if given) replaces **.icon** class defined
inside _LocationAutocompleteInput.module.css_.

## Using vanilla CSS

The Sharetribe Web Template does not use vanilla CSS, but it is possible
to take vanilla CSS into use just by creating CSS file that doesn't use
`*.module.css` pattern in its file name.

Read more about using vanilla CSS from
[Create React App's docs](https://create-react-app.dev/docs/adding-a-stylesheet).
