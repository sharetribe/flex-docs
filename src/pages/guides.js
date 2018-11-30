import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { H1 } from '../brand-components';
import { ThreeColumnLayout } from '../layouts';
import { ArticleIndex } from '../components';

const GuidesPage = () => {
  return (
    <StaticQuery
      query={graphql`
        query GuidesListQuery {
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
          <ThreeColumnLayout title="How-to Guides">
            <H1>How-to Guides</H1>
            <ArticleIndex pathPrefix="/guides/" articles={articles} />
          </ThreeColumnLayout>
        );
      }}
    />
  );
};

export default GuidesPage;
