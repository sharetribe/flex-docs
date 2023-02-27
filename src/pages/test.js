import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const query = graphql`
  query OperatorGuidesIndexQuery {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          category: {
            in: ["operator-guides-pages", "operator-guides-concepts"]
          }
        }
      }
      sort: {
        fields: [frontmatter___category, frontmatter___slug]
        order: [ASC, ASC]
      }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
        edges {
          node {
            frontmatter {
              title
              slug
              updated
              ingress
              published
            }
          }
        }
      }
    }
  }
`;

const testt = () => {
  return <StaticQuery query={query} render={data => {}} />;
};
export default testt;
