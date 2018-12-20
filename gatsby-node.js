/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

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
            }
          }
        }
      }
    }
  `).then(result => {
    return new Promise((resolve, reject) => {
      result.data.allMarkdownRemark.edges.forEach(edge => {
        const { fileAbsolutePath, frontmatter } = edge.node;
        const { title, slug, date, category, ingress } = frontmatter;
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
        const categories = ['tutorials', 'guides', 'references', 'background'];
        if (!categories.includes(category)) {
          throw new Error(
            `Unknown category: ${category} in file: ${fileAbsolutePath}`
          );
        }
        createPage({
          path: `${category}/${slug}`,
          component: path.resolve(`./src/templates/ArticlePageTemplate.js`),

          // Context will be exposed as variables in the GraphQL query, e.g. $category
          context: { slug, category },
        });
        resolve();
      });
    });
  });
};
