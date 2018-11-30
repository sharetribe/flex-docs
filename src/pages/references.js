import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { H1 } from '../brand-components';
import { ThreeColumnLayout } from '../layouts';
import { ArticleIndex } from '../components';

const ReferencesPage = () => {
  return (
    <StaticQuery
      query={graphql`
        query ReferencesListQuery {
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
      `}
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
          <ThreeColumnLayout title="Reference">
            <H1>Reference</H1>
            <ArticleIndex pathPrefix="/references/" articles={articles} />
          </ThreeColumnLayout>
        );
      }}
    />
  );
};

export default ReferencesPage;
