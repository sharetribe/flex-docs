import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { dev } from '../config';
import tutorialsSortingArray from '../docs/tutorial/order-config';
import { ArticleIndexPage } from '../components';

const query = graphql`
  query TutorialIndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "tutorial" } } }
      sort: { fields: fileAbsolutePath, order: ASC }
    ) {
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
`;

const category = 'tutorial';

const byArrayOfSlugs = sortingArray => (a, b) => {
  const indexA = sortingArray.indexOf(a.slug);
  const indexB = sortingArray.indexOf(b.slug);

  // If sorting array doesn't contain slug,
  // we'll push it to the end of the array.
  const defaultPlacement = sortingArray.length;
  const i1 = indexA > -1 ? indexA : defaultPlacement;
  const i2 = indexB > -1 ? indexB : defaultPlacement;

  return i1 - i2;
};

const TutorialPage = () => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const edges = data.allMarkdownRemark
          ? data.allMarkdownRemark.edges
          : [];
        const articles = edges
          .reduce((result, edge) => {
            const { frontmatter } = edge.node;
            if (dev || frontmatter.published) {
              return result.concat(frontmatter);
            } else {
              return result;
            }
          }, [])
          .sort(byArrayOfSlugs(tutorialsSortingArray));
        return <ArticleIndexPage category={category} articles={articles} />;
      }}
    />
  );
};

export default TutorialPage;
