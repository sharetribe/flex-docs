import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { dev, siteStructure } from '../../config';
import { findCategory } from '../../util/navigation';
import { OperatorGuidesPage } from '../../components';

// Instead of copy pasting this function, create it as a util function and import it

const category = 'operator-guides';
const sortingArray = findCategory('pages', siteStructure);
//old query
// const query = graphql`
//   query OperatorGuidesIndexQuery {
//     allMarkdownRemark(
//       filter: { frontmatter: { category: { in: [
//         "operator-guides-pages"
//         "operator-guides-concepts"
//         ] } } }
//       sort: {
//         fields: [frontmatter___category, frontmatter___slug]
//         order: [ASC, ASC]
//       }
//     ) {
//       edges {
//         node {
//           frontmatter {
//             title
//             slug
//             category
//             updated
//             ingress
//             published
//           }
//         }
//       }
//     }
//   }
// `;

// new
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

// const byArrayOfSlugs = sortingArray => (a, b) => {
//   const indexA = sortingArray.indexOf(a.slug);
//   const indexB = sortingArray.indexOf(b.slug);

//   // If sorting array doesn't contain slug,
//   // we'll push it to the end of the array.
//   const defaultPlacement = sortingArray.length;
//   const i1 = indexA > -1 ? indexA : defaultPlacement;
//   const i2 = indexB > -1 ? indexB : defaultPlacement;

//   return i1 - i2;
// };

const testFunction = data => {
  console.log(data.allMarkdownRemark.group, 'full data in ops guide');
  // You have the subcategory data available through siteStructure
  console.log(siteStructure.find(n => n.id == 'operator-guides'));

  data.allMarkdownRemark.group.map((group, index) => {
    console.log('title', group.fieldValue);
    console.log('articles', group.edges);
  });
  // now we need a map of the subcategory and the children of the subcategory

  // <UiText id={`Sidebar.${camelize(category)}`} />
  const d = siteStructure.map((n, i) => {
    // const groupedArticles = getGroupedArticles(data)
    // const articleGroup = groupedArticles.find(g => g.category === n.id);
    // console.log(articleGroup)
  });
};

const OGPage = () => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        testFunction(data);
        // Here you get all the articles for the first grouping
        const newEdges = data.allMarkdownRemark.group[0].edges;

        const formatData = data.allMarkdownRemark.group.map(
          (element, index) => {
            const mapped = element.edges.reduce((result, edge) => {
              const { frontmatter } = edge.node;
              if (dev || frontmatter.published) {
                return result.concat(frontmatter);
              } else {
                return result;
              }
            }, []);
            return {
              title: element.fieldValue,
              edges: mapped,
            };
          }
        );

        const articles = newEdges.reduce((result, edge) => {
          const { frontmatter } = edge.node;
          if (dev || frontmatter.published) {
            return result.concat(frontmatter);
          } else {
            return result;
          }
        }, []);

        // TODO .sort(byArrayOfSlugs(sortingArray));

        return (
          <OperatorGuidesPage
            category={category}
            articles={articles}
            data={formatData}
          />
        );
      }}
    />
  );
};

export default OGPage;
