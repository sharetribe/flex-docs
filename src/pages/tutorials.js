import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { dev } from '../config';
import { ArticleIndexPage } from '../components';

const query = graphql`
  query TutorialsIndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "tutorials" } } }
      sort: { fields: fileAbsolutePath, order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            updated
            ingress
            private
          }
        }
      }
    }
  }
`;

const category = 'tutorials';

const TutorialsPage = () => {
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

export default TutorialsPage;
