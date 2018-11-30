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
              slug
              category
            }
          }
        }
      }
    }
  `).then(result => {
    return new Promise((resolve, reject) => {
      result.data.allMarkdownRemark.edges.forEach(edge => {
        const { fileAbsolutePath, frontmatter } = edge.node;
        const { slug, category } = frontmatter;
        if (!slug) {
          throw new Error(`slug missing from file: ${fileAbsolutePath}`);
        }
        if (!category) {
          throw new Error(`category missing from file: ${fileAbsolutePath}`);
        }
        // TODO: validate category
        createPage({
          path: `${category}/${slug}`,
          component: path.resolve(`./src/templates/tutorial.js`),
          context: { slug, category },
        });
        resolve();
      });
    });
  });
};
