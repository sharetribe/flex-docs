import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { H1 } from '../brand-components';
import { ThreeColumnLayout } from '../layouts';
import { ArticleIndex } from '../components';

const query = graphql`
  query GuidesIndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "guides" } } }
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

const GuidesPage = () => {
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
          <ThreeColumnLayout title="How-to Guides" activePath="/guides">
            <H1>How-to Guides</H1>
            <ArticleIndex pathPrefix="/guides/" articles={articles} />
          </ThreeColumnLayout>
        );
      }}
    />
  );
};

export default GuidesPage;
