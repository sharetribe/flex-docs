import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { H1 } from '../brand-components';
import { ThreeColumnLayout } from '../layouts';
import { ArticleIndex } from '../components';

const BackgroundPage = () => {
  return (
    <StaticQuery
      query={graphql`
        query BackgroundListQuery {
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
          <ThreeColumnLayout
            title="Background Information"
            activePath="/background"
          >
            <H1>Background Information</H1>
            <ArticleIndex pathPrefix="/background/" articles={articles} />
          </ThreeColumnLayout>
        );
      }}
    />
  );
};

export default BackgroundPage;
