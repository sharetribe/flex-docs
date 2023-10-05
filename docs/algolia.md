# Algolia configuration

Dev Docs uses
[Algolia DocSearch v3](https://docsearch.algolia.com/docs/what-is-docsearch/).
The search UI is a React component imported through the @docsearch/react
package. You can find it in Search.js. The styling of the UI component
is in GlobalStyle.js.

The Algolia Crawler scrapes Dev Docs once a week. You can find the
configuration here: https://crawler.algolia.com/admin/

At time of writing, the Algolia Docsearch documentation isn't very
comprehensive. You can find comments in the crawler configuraton that
explain how it works.

## Documentation structure

The Crawler records all h1, h2 and h3 tags found in the documentation.
To ensure good search accuracy, it's important that articles use good
HTML semantics. The tags should reflect the hierarchy of information on
each page.

> Use only a single h1 tag on each page. Subheadings h4, h5 and h6 are
> ignored by the search (you can still use them, but don't use them to
> semantically structure information that should be found via search)

## Write good and descriptive headings

- Headings should be descriptive
- Avoid using numbering in headings
- Use multiple headings on each page!
