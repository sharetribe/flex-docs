import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { H1 } from '../brand-components';
import { ThreeColumnLayout } from '../layouts';
import { ArticleIndex } from '../components';

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

const ReferencesPage = () => {
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
          <ThreeColumnLayout title="Reference" activePath="/references">
            <H1>Reference</H1>
            <ArticleIndex pathPrefix="/references/" articles={articles} />
          </ThreeColumnLayout>
        );
      }}
    />
  );
};

export default ReferencesPage;
