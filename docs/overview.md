# Flex Docs overview

This documentation explains the technologies and the architecture of the
site. It also documents the available commands and how the site is
deployed.

To start coding the UI, be sure to read the
[Flex Docs coding conventions](./coding-conventions.md).

## Technologies

Here is a list of the main technologies that the project is based on:

- [Node](https://nodejs.org/): JavaScript runtime
- [Yarn](https://yarnpkg.com/): dependency handling
- [Gatsby](https://www.gatsbyjs.org/): framework and config for creating
  "static" sites
- [React](https://reactjs.org): UI components
- [styled-components](https://www.styled-components.com/): styling UI
  components
- [GraphQL](https://graphql.org/): query language for the site data and
  articles
- [Prettier](https://prettier.io/): formatting code
- [Markdown](https://en.wikipedia.org/wiki/Markdown): article content

## How the site works

The site follows a usual Gatsby site structure. To understand the
basics, the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/) is
highly recommended.

Basically the data flows in the following way:

1. A page entry point is created for each component in the
   [src/pages](../src/pages) directory
1. In [gatsby-node.js](../gatsby-node.js) all the article Markdown files
   are queried with GraphQL
1. An article page is created for each article with the
   [Gatsby Node API](https://www.gatsbyjs.org/docs/node-apis/) from the
   article data using the
   [ArticlePageTemplate](../src/templates/ArticlePageTemplate.js)
   component. Note that the article creation provides some context
   variables for the GraphQL query in the template.
1. Each category page queries the Markdown data for that category and
   renders a list of articles with the
   [ArticleIndexPage](../src/components/ArticleIndexPage/ArticleIndexPage.js)
   component
1. Each article is rendered with the
   [ArticlePage](../src/components/ArticlePage/ArticlePage.js) component

When the site is built with `yarn run prod` or in Netlify, the build
output is a bunch of static files that can be served without any dynamic
server rendering. The client side app mounts when the site starts up, so
all dynamic interactivity is still possible in the client side UI.

## Project structure

```bash
docs/                # Site internal documentation
public/              # Build output
src/                 # Site source code
├── components/      # React components
├── docs/            # Markdown articles
├── font-files/      # Font source files
├── images/          # Shared image files
├── pages/           # Gatsby page entry points
└── templates/       # Gatsby templates for page creation
.cache/              # Gatsby cache directory
.gitignore           # Files ignored in Git
.prettierrc          # Prettier configuration
_redirects           # Netlify redirects
gatsby-browser.js    # Gatsby Browser API usage
gatsby-config.js     # Gatsby config
gatsby-node.js       # Gatsby Node API usage
gatsby-ssr.js        # Gatsby SSR API usage
netlify-postbuild.sh # Script to run after Netlify build
package.json         # Dependencies etc.
yarn.lock            # Locked versions of the dependencies
```

## Development

To set up the project, follow the
[Quick start section](../README.md#quick-start) in the main README.md
file.

### Dev server

Start the dev server:

    yarn run dev

This runs the application in http://localhost:8000 and automatically
loads any changes to code or article content.

This also runs [GraphiQL](https://github.com/graphql/graphiql) in
http://localhost:8000/___graphql for querying the site data and schema.

### Prod server

Start the production server:

    yarn run prod

This builds and runs the application in http://localhost:9000/docs/ but
doesn't catch changes to any files. This is useful to test the
production setup and e.g. internal links that should have the
`/docs`path prefix.

### Code formatting

Format all JavaScript code and Markdown articles:

    yarn run format

There are more specific format scripts that the above command runs, see
the `scripts` section in [package.json](../package.json) for more
information.

## Configuration

### Environment variables

- **`NODE_ENV`** (`development` or `production`)

  The local production server started with `yarn run prod` forces on the
  production mode. Otherwise the production mode should be enabled in
  Netlify, otherwise the development mode is used locally.

- **`NODE_VERSION`**

  This sets the [Node](https://nodejs.org/) version in Netlify. The
  value can be anything that [nvm](https://github.com/creationix/nvm)
  accepts.

  For more information, see the
  [Netlify docs for setting the Node version](https://www.netlify.com/docs/continuous-deployment/#set-node-ruby-or-python-version).

- **`CONTEXT`**

  The deployment context automatically set by Netlify.

  > There are three predefined deploy contexts:
  >
  > - `production`: this context corresponds to the main site’s
  >   deployment, attached to the Git branch you set when the site is
  >   created.
  > - `deploy-preview`: this context corresponds to the previews we
  >   build for pull/merge requests.
  > - `branch-deploy`: this context corresponds to deploys from branches
  >   that are not the site’s main production branch.

  Out of those three, currently we use `production` for the `master`
  branch that is running the production deployment, and `deploy-preview`
  for the preview builds in PRs.

  For more information, see the
  [Netlify docs for deploy contexts](https://www.netlify.com/docs/continuous-deployment/#deploy-contexts).

- **`PRODUCTION_SITE_URL`**

  The site URL in production, **without** the `/docs` path prefix. Only
  used in the Netlify production context.

- **`GOOGLE_TAGMANAGER_ID`**

  The Google Tag Manager (GTM) ID. GTM is only enabled if the ID is
  defined and the app is running in the Netlify production context. GTM
  is used e.g. for adding Google Analytics to the site.

- **`DEPLOY_PRIME_URL`**

  Individual deployment URL (vs. the `PRODUCTION_SITE_URL`)
  automatically set by Netlify. This is used e.g. for deploy previews
  for PRs.

  For more information, see the
  [Netlify docs for build environment variables](https://www.netlify.com/docs/continuous-deployment/#build-environment-variables).

### `gatsby-config.js`

The [gatsby-config.js](../gatsby-config.js) file is used for configuring
all the Gatsby plugins and options. See the
[Gatsby config documentation](https://www.gatsbyjs.org/docs/gatsby-config/)
for more information.

### `src/config.js`

The [src/config.js](../src/config.js) file is the application specific
configuration file. Currently it is mainly used for style variables,
baseline config, etc.

## The `/docs` path prefix

For SEO, the site is running within a subdirectory instead of a
subdomain root. It is important to note that internal links **should not
have the `/docs` path prefix** as that is automatically added for all
the links that use the [Link](../src/components/Link.js) component.
Under the hood this component uses the
[Gatsby Link component](https://www.gatsbyjs.org/docs/gatsby-link/) that
uses the `pathPrefix` option given in `gatsby-config.js`.

Sometimes links need to be generated without the `Link` component. Then
the
[withPrefix](https://www.gatsbyjs.org/docs/gatsby-link/#prefixed-paths-helper)
prefixed path helper from Gatsby can be used. As an example, see the
schema.org metadata creation in the
[Breadcrumb](../src/components/Breadcrumb.js) component.

## Redirects

Redirects can be configured in the [\_redirects](../_redirects) file.
See the
[Netlify documentation for redirects](https://www.netlify.com/docs/redirects/)
for more information.

## Deployment

Flex Docs uses [Netlify](https://www.netlify.com/) for deployment. It is
a great and a simple tool to build modern static sites. We have enabled
the
[Netlify GitHub App](https://www.netlify.com/docs/github-permissions/)
to enable preview builds for PRs and automatically deploying the
`master` branch.

Seeing the build logs and doing rollbacks etc. can be done in the
`sharetribe-flex-docs-site` Netlify site:

https://app.netlify.com/sites/sharetribe-flex-docs-site

The credentials are in the company password manager.

See the [Netlify documentation](https://www.netlify.com/docs/) for more
information on how to use Netlify for various tasks.
