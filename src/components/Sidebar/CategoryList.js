import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import fonts from '../../fonts';

import { baselineBreakpoint, siteStructure } from '../../config';

import { findParentCategories } from '../../util/navigation';
import { UiText } from '../../components';

import ArticleLinkList from './ArticleLinkList';

// Helper function.
// Transforms kebab-case to camelCase
// e.g. tutorial-branding => tutorialBranding
const camelize = str => {
  const arr = str.split('-');
  const capitalize = (item, index) =>
    index > 0 ? item.charAt(0).toUpperCase() + item.slice(1) : item;

  return arr.map(capitalize).join('');
};

// Sidebar category name works as a button
// You can click it to show more content: articles, subcategories.
const CategoryTitle = props => {
  const { className, children, depth, ...rest } = props;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};

const hoverLinkStyles = css`
  color: ${props => props.theme.sidebarNavColorTitleHover};
`;

const focusLinkStyles = css`
  color: ${props => props.theme.sidebarNavColorTitleHover};
  outline: none;
`;

const StyledCategoryTitle = styled(CategoryTitle)`
  // Reset default styles
  margin: 0;
  width: 100%;
  text-align: left;
  padding: ${props =>
    props.depth && props.depth === 1
      ? '1px 16px 5px 24px'
      : '5px 16px 1px 24px'};

  // Font
  // Note: with this font,
  // 16px font-size starts to bleed with line-height 24px;
  ${fonts['CircularStd-Book'].styles}
  font-size: ${props => (props.depth && props.depth === 1 ? 12 : 16)}px;
  line-height: 24px;
  letter-spacing: 1px;

  // Color
  color: ${props =>
    props.depth && props.depth === 1
      ? props.theme.sidebarNavColorMainCategory
      : props.theme.sidebarNavColorSubcategory};

  text-transform: ${props =>
    props.depth && props.depth === 1 ? 'uppercase' : 'none'};

  // Enable baseline offset
  position: relative;

  // Offset baseline
  top: -1px;

  &:hover {
    ${hoverLinkStyles}
  }

  &:focus {
    ${focusLinkStyles}
  }

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: ${props => (props.depth && props.depth === 1 ? 12 : 16)}px;
    line-height: 24px;

    padding: ${props =>
      props.depth && props.depth === 1
        ? '8px 16px 8px 36px'
        : '6px 16px 10px 36px'};

    // Offset baseline
    top: 0px;
  }
`;

const StyledMainCategoryTitle = styled(StyledCategoryTitle)`
  ${fonts['CircularStd-Bold'].styles}
`;

const StyledChildren = styled.div`
  opacity: ${props => (props.isOpen ? '1' : '0')};
  transform: ${props =>
    props.isOpen ? 'translateY(0px)' : 'translateY(-8px)'};
  transition: all 0.3s ease-in-out;

  @media (min-width: ${baselineBreakpoint}px) {
    padding: ${props =>
      props.depth && props.depth === 1 ? '0 0 8px 0' : '0 0 0 0'};
  }
`;

const Category = props => {
  const { sidebarNavsIsOpen, setSidebarNavsIsOpen } = useContext(props.context);
  const {
    className,
    children,
    category,
    context,
    depth,
    activeArticle,
    isOpenConfig,
    ...rest
  } = props;

  const parentCategories = activeArticle
    ? findParentCategories(activeArticle.category, siteStructure)
    : [];

  const setCategoryOpen = setSidebarNavsIsOpen(category);
  const isOpenFromAppState = sidebarNavsIsOpen[category];

  const isOpen =
    typeof isOpenFromAppState !== 'undefined'
      ? isOpenFromAppState
      : parentCategories.includes(category)
      ? true
      : typeof isOpenConfig !== 'undefined'
      ? isOpenConfig
      : true;

  const TitleComponent =
    depth && depth === 1 ? StyledMainCategoryTitle : StyledCategoryTitle;
  return (
    <li className={className} {...rest}>
      <TitleComponent onClick={() => setCategoryOpen(!isOpen)} depth={depth}>
        <UiText id={`Sidebar.${camelize(category)}`} />
      </TitleComponent>
      {isOpen ? (
        <StyledChildren isOpen={isOpen} depth={depth}>
          {children}
        </StyledChildren>
      ) : (
        <StyledChildren depth={depth} />
      )}
    </li>
  );
};

const StyledCategory = styled(Category)`
  padding: ${props =>
    props.depth && props.depth === 1 ? '0 0 12px 0' : '0 0 0 0'};

  @media (min-width: ${baselineBreakpoint}px) {
    padding: 0;
  }
`;

const CategoryList = props => {
  const {
    className,
    activeArticle,
    categories,
    groupedArticles,
    context,
    depth,
  } = props;
  return (
    <ul className={className}>
      {categories.map((n, i) => {
        const articleGroup = groupedArticles.find(g => g.category === n.id);
        const hasSubcategories = n.subcategories && n.subcategories.length > 0;

        return (
          <StyledCategory
            key={`nav_${n.id}`}
            category={n.id}
            context={context}
            depth={depth}
            activeArticle={activeArticle}
            isOpenConfig={n.isOpen}
          >
            <ArticleLinkList
              articleGroup={articleGroup}
              activeArticle={activeArticle}
              depth={depth + 1}
            />
            {hasSubcategories ? (
              <CategoryList
                activeArticle={activeArticle}
                categories={n.subcategories}
                groupedArticles={groupedArticles}
                context={context}
                depth={depth + 1}
              />
            ) : null}
          </StyledCategory>
        );
      })}
    </ul>
  );
};

const StyledCategoryList = styled(CategoryList)`
  margin: 0;
  padding-top: 2px;
  padding-bottom: 96px;

  @media (min-width: ${baselineBreakpoint}px) {
    padding-top: 40px;
    padding-bottom: 16px;
  }
`;

export default StyledCategoryList;
