import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { dev, siteStructure } from '../config';
import { findCategory } from '../util/navigation';
import { OperatorGuidesPage } from '../components';

const category = 'pilot-day-guides';
const sortingArray = findCategory(category, siteStructure);

const query = graphql`
  query PilotDayGuidesIndexQuery {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          category: {
            in: [
              "pilot-day-guides-concepts"
              "pilot-day-guides-tutorials"
              "pilot-day-guides-static-content"
              "pilot-day-guides-transactions"
              "pilot-day-guides-useful-information"
              "pilot-day-guides-listings"
              "pilot-day-guides-layout"
              "pilot-day-guides-branding"
            ]
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

const PilotDayGuides = () => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        // format the data returned by the graphql query
        // to a format understood by the OperatorGuidesPage component.
        // also sort each sublist of articles
        const formatData = data.allMarkdownRemark.group.map(
          (subcategory, index) => {
            const onlyPublishedArticles = subcategory.edges.reduce(
              (result, edge) => {
                const { frontmatter } = edge.node;
                if (dev || frontmatter.published) {
                  return result.concat(frontmatter);
                } else {
                  return result;
                }
              },
              []
            );

            console.log(sortingArray.subcategories);

            // find the sortingArray of the subcategory we're currently iterating through
            const currentSortingArray = sortingArray.subcategories.find(
              n => n.id == subcategory.fieldValue
            )?.sortingArray;

            // sort subcategory articles based on the sorting array if it exists
            if (currentSortingArray) {
              onlyPublishedArticles.sort(byArrayOfSlugs(currentSortingArray));
            }

            return {
              title: subcategory.fieldValue,
              edges: onlyPublishedArticles,
            };
          }
        );

        return (
          <OperatorGuidesPage
            category={category}
            data={formatData}
            sortingArray={sortingArray}
          />
        );
      }}
    />
  );
};

export default PilotDayGuides;