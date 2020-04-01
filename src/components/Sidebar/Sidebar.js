import React, { useContext, useEffect } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import noScroll from 'no-scroll';

import { findCategory, findParentCategories } from '../../util/navigation';
import { siteStructure, dev } from '../../config';

import CategoryList from './CategoryList';

const query = graphql`
  query SidebarIndexQuery {
    allMarkdownRemark(sort: { fields: fileAbsolutePath, order: ASC }) {
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

// Sidebar context: this contains user preferences aka categories he/she has opened or closed
const SidebarContext = React.createContext({
  sidebarNavsIsOpen: {},
  setSidebarNavsIsOpen: () => {},
});

const Navigation = props => {
  const { className, children } = props;
  return <nav className={className}>{children}</nav>;
};

const SideNavigation = styled(Navigation)`
  background-color ${props => props.theme.backgroundColorRaised};
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.05);
  transition: all 0.05s ease-out;
  min-height: 100%;

  @media (min-width: 1024px) {
    flex-shrink: 0;
    box-shadow: none;
    position: sticky;
    margin-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    top: 0;
    height: 100vh;
    width: 100%;
    overflow-y: scroll;
  }

  :hover {
    transform: none;
    box-shadow: none;
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

const getArticles = (edges, category, siteStructure) => {
  const categoryBranch = findCategory(category, siteStructure) || {};
  const sortingArray = categoryBranch.sortingArray || [];

  const articles = edges.reduce((result, edge) => {
    const { frontmatter } = edge.node;
    return dev || frontmatter.published ? result.concat(frontmatter) : result;
  }, []);
  return sortingArray.length > 0
    ? articles.sort(byArrayOfSlugs(sortingArray))
    : articles;
};

const getGroupedArticles = data => {
  const groups = data.allMarkdownRemark
    ? [...data.allMarkdownRemark.group]
    : [];
  return groups.map(group => {
    const { fieldValue: category, totalCount: articleCount, edges } = group;
    return {
      category,
      articleCount,
      articles: getArticles(edges, category, siteStructure),
    };
  });
};

const SideBarStaticQuery = props => {
  const { sidebarNavsIsOpen, setSidebarNavsIsOpen } = useContext(
    SidebarContext
  );

  useEffect(() => {
    const category = props.activeArticle && props.activeArticle.category;

    const hasWindow = typeof window !== 'undefined';
    if (hasWindow) {
      // If activeArticle has changed, remove possible noScroll.
      // On small layouts, it is set to prevent scrolling when Sidebar is open.
      noScroll.off();
    }

    if (category) {
      const parentCategories = findParentCategories(category, siteStructure);
      parentCategories.forEach(p => {
        if (sidebarNavsIsOpen[p] === false) {
          const setCategoryOpen = setSidebarNavsIsOpen(p);

          // Navigating to article, which was previously closed manually by user.
          // Overwrite the setting.
          setCategoryOpen(null);
        }
      });
    }
    // We don't want to rerender every time sidebarNavsIsOpen changes.
    // So, for now, the exhaustive-deps warning is disabled.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.activeArticle]);

  return (
    <StaticQuery
      query={query}
      render={data => {
        return (
          <SideNavigation>
            <CategoryList
              activeArticle={props.activeArticle}
              categories={siteStructure}
              groupedArticles={getGroupedArticles(data)}
              context={SidebarContext}
              depth={1}
            />
          </SideNavigation>
        );
      }}
    />
  );
};

// This is used in Root.js, which is outside of routing.
SideBarStaticQuery.StateProvider = SidebarContext.Provider;

export default SideBarStaticQuery;
