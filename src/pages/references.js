import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { categories } from '../config';
import { ArticleIndexPage } from '../components';

const query = graphql`
  query ReferencesIndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "references" } } }
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

const category = 'references';

const ReferencesPage = () => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const edges = data.allMarkdownRemark
          ? data.allMarkdownRemark.edges
          : [];
        const articles = edges.map(edge => {
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

export default ReferencesPage;
