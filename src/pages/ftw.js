import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { dev, siteStructure } from '../config';
import { findSortingArrays } from '../util/navigation';
import { ArticleIndexPage } from '../components';

const category = 'ftw';
const sortingArray = findSortingArrays(category, siteStructure);

const query = graphql`
  query FTWIndexQuery {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          category: {
            in: [
              "ftw"
              "ftw-templates"
              "ftw-configuration"
              "ftw-styling"
              "ftw-routing"
              "ftw-data-flow"
              "ftw-search"
              "ftw-security"
              "ftw-testing-error-handling"
              "ftw-hosting"
              "ftw-analytics"
              "ftw-hosting"
              "ftw-performance"
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

const FTWPage = () => {
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

export default FTWPage;
