import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { dev } from '../config';
import { ArticleIndexPage } from '../components';

const query = graphql`
  query ReferencesIndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "references" } } }
      sort: { fields: fileAbsolutePath, order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            date
            ingress
            private
          }
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
        const articles = edges.reduce((result, edge) => {
          const { frontmatter } = edge.node;
          if (dev || !frontmatter.private) {
            return result.concat(frontmatter);
          } else {
            return result;
          }
        }, []);
        return <ArticleIndexPage category={category} articles={articles} />;
      }}
    />
  );
};

export default ReferencesPage;
