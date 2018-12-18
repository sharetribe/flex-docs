import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { LandingPage } from '../components';

// Compute the number of articles for each category
const counts = data => {
  return data.allMarkdownRemark.edges.reduce((result, edge) => {
    const { category } = edge.node.frontmatter;
    if (!result[category]) {
      result[category] = 1;
    } else {
      result[category] += 1;
    }
    return result;
  }, {});
};

export default () => {
  return (
    <StaticQuery
      query={graphql`
        query LandingPageArticleCountQuery {
          allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  category
                }
              }
            }
          }
        }
      `}
      render={data => {
        return <LandingPage articleCounts={counts(data)} />;
      }}
    />
  );
};
