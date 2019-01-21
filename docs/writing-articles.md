# Writing articles for Flex Docs

This document is for people adding articles or editing article contents in the
Flex Docs site.

## Choosing the correct category

The category hierarchy of the Flex Docs site is heavily based on the great
[What nobody tells you about documentation](https://www.divio.com/blog/documentation/)
article. The article divides a documentation site to four categories:

- **Tutorials**

  > A tutorial:
  >
  > - is **learning-oriented**
  > - allows the newcomer to get started
  > - is a lesson
  >
  > _Analogy: teaching a small child how to cook_

- **How-to Guides**

  > A how-to guide:
  >
  > - is **goal-oriented**
  > - shows how to solve a specific problem
  > - is a series of steps
  >
  > _Analogy: a recipe in a cookery book_

- **Explanation** (Background)

  > An explanation:
  >
  > - is **understanding-oriented**
  > - explains
  > - provides background and context
  >
  > _Analogy: an article on culinary social history_

- **Reference**

  > A reference guide:
  >
  > - is **information-oriented**
  > - describes the machinery
  > - is accurate and complete
  >
  > _Analogy: a reference encyclopaedia article_

Another way to visualize the separation from the article:

![Categories](./images/categories.png)

It is important to understand the difference between these categories
(especially between tutorials and guides), so at least glancing through the
article is strongly recommended when adding articles to the Flex Docs site.

The important things to remember are:

- What is the goal of the article?
- What is the target audience of the article?
- What should be included in the article?
- What should **not** be included in the article?
- How should the article be structured?

## Adding the article file

The articles are located in [src/docs](../src/docs). There is a directory for
each category, and a directory for each article. The order of the article
directories in the category defines the order of the articles in the category
page of the site.

By convention, the article directories are named as `<number>-article-slug`
where the number defines the alphanumeric order of the directories. Feel free to
rename the article directories if the order needs to change in the site.

Within an article directory there should be a `index.md` file that has the
article content. There can be other files that the index file includes, such as
images.

## Adding article frontmatter metadata

Every article should start with a metadata section called frontmatter. It is
written in [YAML](https://yaml.org/) and separated from the article content with
`---`.

There are several frontmatter fields in use:

- `title` (**required**): title of the article
- `slug` (**required**): the URL slug of the article (see the
  [Article URL](#article-url) section below)
- `updated` (**required**): date when article was last modified
- `category` (**required**): category of the article
- `ingress` (**required**): ingress text for the article
- `skills` (**optional**): Comma separated list of skills that are required to
  achieve the goal of the article. When this is defined, the skills are shown in
  the article info section in the beginning of the article page.
- `readingTime` (**optional**): When defined, a Medium-style reading time is
  shown in the article info section.

  Possible values:

  - empty/missing: nothing is shown
  - predefined text: that text is shown
  - `estimate`: the [reading-time](https://github.com/ngryman/reading-time)
    library is used to estimate a reading time in minutes

- `published` (**optional**, `true` or `false`): by default articles are **not**
  published. They need to be explicitly published to show up in the site. In dev
  mode also unpublished articles are shown.

If some of the required fields are missing or have an invalid value, the
application will throw an error. See the server logs to understand what the
problem is.

## Article URL

The URL to the article is constructed from the `category` and the `slug` in the
article frontmatter. The final URL will be:

```
https://www.sharetribe.com /docs         /background / introducing-flex /
| domain                   | path prefix | category  | slug             | trailing slash
```

Note that the path prefix will not be used when the application is running
locally with `yarn run dev`.

If the article URL needs to change, a redirect should be added to the
[\_redirects](../_redirects) file. One example would be changing the slug when
the title changes to get better SEO credit.

Checking the redirects file when adding a new article also avoids problems with
"reserved" URLs.

## Editing the article content

Articles are written in [Markdown](https://en.wikipedia.org/wiki/Markdown).
Articles are parsed using the
[gatsby-transformer-remark](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark)
plugin. Under the hood, the plugin uses [remark](https://remark.js.org/).

All possible Markdown syntax is parsed and rendered as HTML in the site, but
nice styles are only defined for a subset of all the possible syntax. See the
[Markdown reference article](../src/docs/references/00-markdown/index.md) to see
what's possible and how everything renders in the dev server.

### Internal links

Extra note must be added for links within the article content that point to
pages within the Flex Docs site. Because the production environment is running
within the `/docs` path prefix and the development server is just running in the
localhost root `/`, the internal links **should not have the `/docs` prefix**.
That is added automatically.

Internal links should also always have the trailing slash to avoid extra
redirects.

## Automatic formatting

The article content can be nicely formatted using the `yarn run format-docs`
command that runs the Markdown files through [Prettier](https://prettier.io/).

## Making a PR and previewing the content

It is strongly recommended to make a
[Pull Request](https://help.github.com/articles/about-pull-requests/) (PR) in
GitHub when adding a new article or when editing an already existing article.
This enables a review of changes by someone else, and previewing the changes in
the application before publishing them to production site.

We have an integration in GitHub that shows a link to the preview site of the
code in the PR running in the production environment:

![PR integrations](./images/pr-integrations.png)

The "Details" link in the deploy preview line goes to the site preview where the
article can be seen running in the proper environment.

This integration also enables making article additions and edits possible using
only GitHub.

## Publishing an article

To publish an article, change the `published` field to `true` in the article
frontmatter and merge the article PR. The `master` branch is automatically
deployed to production.
