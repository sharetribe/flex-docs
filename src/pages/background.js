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
          id
          frontmatter {
            title
            slug
            date
          }
          excerpt
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
        const articles = data.allMarkdownRemark.edges.map(edge => {
          const { id, frontmatter, excerpt } = edge.node;
          return {
            id,
            excerpt,
            ...frontmatter,
          };
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
