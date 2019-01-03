/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { categories } = require('./src/config');

const dev = process.env.NODE_ENV === 'development';

const allowedCategories = Object.keys(categories);

// Uncomment to warn about circular dependencies.
//
// const CircularDependencyPlugin = require('circular-dependency-plugin');

// exports.onCreateWebpackConfig = ({
//   stage,
//   rules,
//   loaders,
//   plugins,
//   actions,
// }) => {
//   actions.setWebpackConfig({
//     plugins: [
//       new CircularDependencyPlugin({
//         exclude: /\.cache|node_modules/,
//         cwd: process.cwd(),
//       }),
//     ],
//   });
// };

exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    console.log(`\n`, fileNode.relativePath);
  }
};

const createArticle = (createPage, edge) => {
  const { fileAbsolutePath, frontmatter } = edge.node;
  const { title, slug, date, category, ingress, private } = frontmatter;
  if (!title) {
    throw new Error(`title missing from file: ${fileAbsolutePath}`);
  }
  if (!slug) {
    throw new Error(`slug missing from file: ${fileAbsolutePath}`);
  }
  if (!date) {
    throw new Error(`date missing from file: ${fileAbsolutePath}`);
  }
  if (!category) {
    throw new Error(`category missing from file: ${fileAbsolutePath}`);
  }
  if (!ingress) {
    throw new Error(`ingress missing from file: ${fileAbsolutePath}`);
  }
  if (!allowedCategories.includes(category)) {
    throw new Error(
      `Unknown category: ${category} in file: ${fileAbsolutePath}. Category should be one of: ${allowedCategories.join(
        ', '
      )}`
    );
  }
  if (!dev && private) {
    console.log(`Ignoring private article: ${fileAbsolutePath}`);
    return Promise.resolve(null);
  }
  return createPage({
    path: `${category}/${slug}`,
    component: path.resolve(`./src/templates/ArticlePageTemplate.js`),

    // Context will be exposed as variables in the GraphQL query, e.g. $category
    context: { slug, category },
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
              slug
              date
              category
              ingress
              private
            }
          }
        }
      }
    }
  `).then(result => {
    return Promise.all(
      result.data.allMarkdownRemark.edges.map(e => createArticle(createPage, e))
    );
  });
};
