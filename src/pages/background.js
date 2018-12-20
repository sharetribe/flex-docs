import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { categories } from '../config';
import { ArticleIndexPage } from '../components';

const query = graphql`
  query BackgroundIndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "background" } } }
      sort: { fields: fileAbsolutePath, order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            date
            ingress
          }
        }
      }
    }
  }
`;

const category = 'background';

const BackgroundPage = () => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const edges = data.allMarkdownRemark
          ? data.allMarkdownRemark.edges
          : [];
        const articles = edges.map(edge => {
          return edge.node.frontmatter;
        });
        return (
          <ArticleIndexPage
            title={categories[category].label}
            category={category}
            articles={articles}
          />
        );
      }}
    />
  );
};

export default BackgroundPage;
