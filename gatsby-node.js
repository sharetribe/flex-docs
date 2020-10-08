/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { categories, siteStructure } = require('./src/config');

const dev = process.env.NODE_ENV === 'development';

const flattenSubcategories = ({ id, subcategories = [] }) => {
  const subcategoryReducer = (acc, cat) => [
    ...acc,
    ...flattenSubcategories(cat),
  ];
  return subcategories.reduce(subcategoryReducer, [id]);
};

// Netlify didn't know about Array.prototype.flat()
const flatten = (array, depth = 1) => {
  const f = (acc, cur) => {
    if (Array.isArray(cur)) {
      return [...acc, ...flatten(cur, depth - 1)];
    } else {
      return [...acc, cur];
    }
  };

  return depth > 0 ? array.reduce(f, []) : array;
};

const allowedCategoryIds = flatten(
  siteStructure.map(flattenSubcategories)
).concat('operator-guides');

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
  const { title, slug, updated, category, ingress, published } = frontmatter;
  if (!title) {
    throw new Error(`title missing from file: ${fileAbsolutePath}`);
  }
  if (!slug) {
    throw new Error(`slug missing from file: ${fileAbsolutePath}`);
  }
  if (!updated) {
    throw new Error(`updated date missing from file: ${fileAbsolutePath}`);
  }
  if (!category) {
    throw new Error(`category missing from file: ${fileAbsolutePath}`);
  }
  if (!ingress) {
    throw new Error(`ingress missing from file: ${fileAbsolutePath}`);
  }
  if (!allowedCategoryIds.includes(category)) {
    throw new Error(
      `Unknown category: ${category} in file: ${fileAbsolutePath}. Category should be one of: ${allowedCategoryIds.join(
        ', '
      )}`
    );
  }
  if (!dev && !published) {
    console.log(`Ignoring private article: ${fileAbsolutePath}`);
    return Promise.resolve(null);
  }
  return createPage({
    path: `${category}/${slug}/`,
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
              updated
              category
              ingress
              published
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
