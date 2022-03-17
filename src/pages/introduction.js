import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { dev, siteStructure } from '../config';
import { findSortingArrays } from '../util/navigation';
import { ArticleIndexPage } from '../components';

const category = 'introduction';
const sortingArray = findSortingArrays(category, siteStructure);

const query = graphql`
  query IntroductionIndexQuery {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          category: {
            in: [
              "introduction"
              "introduction-getting-started"
              "introduction-templates"
            ]
          }
        }
      }
      sort: { fields: fileAbsolutePath, order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            category
            updated
            ingress
            published
          }
        }
      }
    }
  }
`;

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

const IntroductionPage = () => {
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
          .sort(byArrayOfSlugs(sortingArray));
        return (
          <ArticleIndexPage category={category} noPrefix articles={articles} />
        );
      }}
    />
  );
};

export default IntroductionPage;
