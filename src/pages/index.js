import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { dev } from '../config';
import { LandingPage } from '../components';

const query = graphql`
  query LandingPageArticleCountQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            category
            private
          }
        }
      }
    }
  }
`;

// Compute the number of articles for each category
const counts = data => {
  return data.allMarkdownRemark.edges.reduce((result, edge) => {
    const { category, private: priv } = edge.node.frontmatter;
    if (!dev && priv) {
      return result;
    }
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
      query={query}
      render={data => {
        return <LandingPage articleCounts={counts(data)} />;
      }}
    />
  );
};
