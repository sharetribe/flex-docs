import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { H1 } from '../brand-components';
import { ThreeColumnLayout } from '../layouts';
import { ArticleIndex } from '../components';

const query = graphql`
  query TutorialsIndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "tutorials" } } }
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

const TutorialsPage = () => {
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
          <ThreeColumnLayout title="Tutorials" activePath="/tutorials">
            <H1>Tutorials</H1>
            <ArticleIndex pathPrefix="/tutorials/" articles={articles} />
          </ThreeColumnLayout>
        );
      }}
    />
  );
};

export default TutorialsPage;
