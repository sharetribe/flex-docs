---
title: Markdown reference
slug: markdown
updated: 2018-12-04
category: references
ingress: This reference article showcases the supported Markdown syntax.
skills: open mind, content editing, language
readingTime: 5 mins at a time!
published: false
---

## Horizontal line

A Horizontal line can be added with `---` in its own line.

---

## Headings

There are six levels of headings. H1 **should not be used within an
article** since that is reserved for the article title defined in the
metadata.

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

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
elit mi, tempus ac turpis vitae, interdum facilisis urna. Nulla euismod
ante vitae velit maximus vestibulum. Sed id lorem non augue porttitor
vehicula. Fusce molestie elementum suscipit. Suspendisse ac felis
pretium, blandit dui id, condimentum felis. Suspendisse commodo
elementum augue sit amet commodo. Integer sit amet diam in quam viverra
pulvinar quis vitae mi. Donec est nunc, lobortis vitae risus a, congue
pharetra quam. Nulla ut iaculis nunc. Nullam massa odio, volutpat eget
felis ac, congue ultrices lectus. Donec gravida erat et laoreet aliquet.
Nunc a dui nisi. Aliquam quis efficitur mauris. Vivamus in pretium
velit. Proin id leo interdum, imperdiet velit ut, hendrerit odio.

Aenean augue nulla, viverra et purus ut, vulputate tincidunt lacus.
Etiam feugiat bibendum velit in pellentesque. Quisque non metus eget
risus luctus maximus id et massa. Sed id vulputate ligula. Donec in
placerat ante. Nunc ut dolor ultrices, faucibus mi in, ultricies ex. In
volutpat condimentum vehicula. Vestibulum ut nisl id eros sollicitudin
finibus. Class aptent taciti sociosqu ad litora torquent per conubia
nostra, per inceptos himenaeos. Nam interdum libero vel est volutpat,
lobortis varius lorem hendrerit. Maecenas mi risus, accumsan sodales
ultricies et, ornare eget turpis. Mauris sed libero non mi tempus rutrum
vel non odio.

Praesent tincidunt ipsum et diam eleifend mattis. Duis semper, justo
quis faucibus porta, lacus lectus tincidunt sapien, nec laoreet velit
purus et nunc. Suspendisse quis massa eu urna ultricies tempor a mattis
dui. Pellentesque et sem nulla. Class aptent taciti sociosqu ad litora
torquent per conubia nostra, per inceptos himenaeos. Suspendisse
potenti. Integer vel elit commodo, volutpat erat eget, convallis ligula.
Mauris ut porta dui.

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

  Nulla euismod ante vitae velit maximus vestibulum. Sed id lorem non
  augue porttitor vehicula. Fusce molestie elementum suscipit.
  Suspendisse ac felis pretium, blandit dui id, condimentum felis.
  Suspendisse commodo elementum augue sit amet commodo. Integer sit amet
  diam in quam viverra pulvinar quis vitae mi. Donec est nunc, lobortis
  vitae risus a, congue pharetra quam. Nulla ut iaculis nunc. Nullam
  massa odio, volutpat eget felis ac, congue ultrices lectus. Donec
  gravida erat et laoreet aliquet. Nunc a dui nisi. Aliquam quis
  efficitur mauris. Vivamus in pretium velit. Proin id leo interdum,
  imperdiet velit ut, hendrerit odio.

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

Using literal HTML within Markdown files should be minimized since the
styles are most likely missing for uncommon elements.

There is one clear case where literal links are useful, however. If you
want to have sections that can be linked to, you can add a heading with
an id and use that id in an internal link.

<h2 id="literal-h2-html-element">This is a h2 heading in HTML</h2>

**NOTE:** With literal section headers, the header autolinking doesn't
work.

---

## Links

Here's a link: https://www.sharetribe.com/

Here's a link with a separate text and a hover title:
[sharetribe.com](https://www.sharetribe.com/ 'click to open link')

Also an
[internal link to another article](/background/concepts/#extended-data).

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
const map = fn => xs => {
  return xs.reduce((acc, x) => {
    return acc.concat(fn(x));
  }, []);
};
```

This is a JSX code block:

```jsx
const RelativeTime = props => {
  const { date, ...rest } = props;
  const { relativeTime } = useRelativeTime(date);
  const isoString = date.toISOString();
  return (
    <time title={isoString} dateTime={isoString} {...rest}>
      {relativeTime}
    </time>
  );
};
```

Note that running `yarn run format-docs` to format Markdown files also
formats the code blocks with Prettier.

---

## Images

Images can be placed in the article directory and imported with a
relative link. Responsive versions are automatically created with
maximum width defined in the `gatsby-config.js` file.

Here is an example screenshot of Saunatime with an alt text:

![Saunatime screenshot alt text](./saunatime.png)

Note that images also break the baseline alignment since the height is
dynamic.

---

## Tables

Tables should not be usually used since they don't work well on mobile.
If you still insist, you can have them, but they won't quite be aligned
to the baseline :(

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
