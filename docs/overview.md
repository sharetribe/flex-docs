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

When the site is built with `yarn run prod` or in Vercel, the build
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
vercel.json          # Vercel redirects and configurations
gatsby-browser.js    # Gatsby Browser API usage
gatsby-config.js     # Gatsby config
gatsby-node.js       # Gatsby Node API usage
gatsby-ssr.js        # Gatsby SSR API usage
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
  Vercel, otherwise the development mode is used locally.

- **`NODE_VERSION`**

  You can set the node version in the Vercel dashboard.
  [Vercel docs for setting the Node version](https://vercel.com/changelog/node-js-version-now-customizable-in-the-project-settings).

- **`GATSBY_VERCEL_ENV`**

  The deployment context automatically set by Vercel.

  > There are three predefined deploy contexts:
  >
  > - `production`: this context corresponds to the main site’s
  >   deployment, attached to the Git branch you set when the site is
  >   created.
  > - `preview`: this context corresponds to the previews we build for
  >   pull/merge requests.
  > - `development`: this context corresponds to the local development
  >   environment (e.g. you're using `vercel dev` to run your local)

  Out of those three, currently we use `production` for the `master`
  branch that is running the production deployment, and `deploy-preview`
  for the preview builds in PRs.

  For more information, see the
  [Vercel docs for environment variables](https://vercel.com/docs/concepts/projects/environment-variables).

- **`PRODUCTION_SITE_URL`**

  The site URL in production, **without** the `/docs` path prefix. Only
  used in the Vercle production context.

- **`GOOGLE_TAGMANAGER_ID`**

  The Google Tag Manager (GTM) ID. GTM is only enabled if the ID is
  defined and the app is running in the Vercel production context. GTM
  is used e.g. for adding Google Analytics to the site.

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

The site is not deployed in a subdirectory, but instead, nemesis proxies
traffic from www.sharetribe.com/docs/ to where Docs is deployed.
Therefore, Docs assumes it is being served within a subdirectory, and
therefore, links should and are be prefixed with `/docs`.

There has been issues with how Vercel handles the --prefix-paths flag.
Currently, docs is deployed on an older version of Vercel CLI. See the
full discussion here: https://github.com/vercel/vercel/discussions/9405

## Redirects

Redirects can be configured in the [\vercel.json](../vercel.son) file.
See the
[Vercel documentation on redirects](https://vercel.com/docs/concepts/projects/project-configuration/)
for more information.

## Deployment

Flex Docs uses [Vercel](https://www.vercel.com/) for deployment. It is a
great and a simple tool to build modern static sites. We have enabled
the [Vercel GitHub App](https://github.com/apps/vercel) to enable
preview builds for PRs and automatically deploying the `master` branch.

Seeing the build logs and doing rollbacks etc. can be done in Vercel
console:

https://vercel.com/sharetribe/flex-docs

Ask Aleksi or Boyan for access.

See the [Vercel documentation](https://www.vercel.com/docs/) for more
information on how to use Vercel for various tasks.
