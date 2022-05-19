import React from 'react';
import styled, { css } from 'styled-components';

import {
  baselineBreakpoint,
  baselineSmall,
  baselineLarge,
  siteStructure,
} from '../../config';
import { findParentCategories } from '../../util/navigation';

import { Link } from '../../components';

const Bar = styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
  background-color: ${props => props.theme.sidebarNavBorderColorActive};
  width: 4px;
  height: calc(100% - ${baselineSmall}px);
  position: absolute;
  top: 1px;
  left: 0;

  @media (min-width: ${baselineBreakpoint}px) {
    height: calc(100% - ${baselineLarge}px);
  }
`;

// Sidebar's article title is a link
// If you click it, you are redirected to that article.
const ArticleLink = props => {
  const { className, children, path, active } = props;
  return (
    <Link className={className} neutral to={`/${path}`}>
      <Bar active={active} />
      {children}
    </Link>
  );
};

const activeLinkStyles = css`
  color: ${props => props.theme.sidebarNavColorLinkActive};
`;

const hoverLinkStyles = css`
  color: ${props => props.theme.sidebarNavColorLinkHover};

  > div {
    display: block;
    background-color: ${props => props.theme.sidebarNavColorLinkHover};
  }
`;

const StyledArticleLink = styled(ArticleLink)`
  display: block;
  font-size: 15px;
  line-height: 24px;
  padding: ${props =>
    props.depth && props.depth === 2
      ? '5px 24px 1px 36px'
      : '5px 24px 1px 48px'};

  color: ${props => props.theme.sidebarNavColorLink};

  ${props => (props.active ? activeLinkStyles : '')};

  &:visited {
    > span {
      color: ${props =>
        props.active
          ? props.theme.sidebarNavColorLinkActive
          : props.theme.sidebarNavColorLinkVisited};
    }
  }

  &:hover {
    ${hoverLinkStyles}
  }

  &:focus {
    outline: none;
    ${hoverLinkStyles}
    color: ${props =>
      props.active
        ? props.theme.sidebarNavColorLinkActive
        : props.theme.sidebarNavColorLinkHover};
    > div {
      background-color: ${props =>
        props.active
          ? props.theme.sidebarNavBorderColorActive
          : props.theme.sidebarNavColorLinkHover};
    }
  }

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 15px;
    line-height: 24px;
    padding: ${props =>
      props.depth && props.depth === 2
        ? '0px 24px 0px 48px'
        : '0px 24px 0px 60px'};
  }

  @media (min-width: 1024px) {
    width: 100%;
  }
`;

const ListItem = props => {
  const { className, children, active, ...rest } = props;
  return (
    <li className={className} {...rest}>
      {children}
    </li>
  );
};

const StyledListItem = styled(ListItem)`
  position: relative;
  display: block;
  width: 100%;
  padding-bottom: ${baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    padding-bottom: ${baselineLarge}px;

    // Offset baseline
    top: -1px;
  }
`;

// Sidebar's article title is a link
// If you click it, you are redirected to that article.
const ArticleListItem = props => {
  const { id, slug, title, active } = props;
  return (
    <StyledListItem key={slug} active={active} id={id}>
      <StyledArticleLink {...props}>{title}</StyledArticleLink>
    </StyledListItem>
  );
};

const StyledUL = styled.ul`
  @media (min-width: ${baselineBreakpoint}px) {
    padding: ${props =>
      props.depth && props.depth === 2 ? '8px 0 0 0' : '0 0 0 0'};
  }
`;

const findMainCategory = category => {
  const path = findParentCategories(category, siteStructure) || [];
  return path.length > 0 ? path[path.length - 1] : null;
};

const ArticleList = props => {
  const { articleGroup, activeArticle, depth } = props;
  const articles =
    articleGroup && articleGroup.articles ? articleGroup.articles : [];
  const hasArticles = articles.length > 0;

  return hasArticles ? (
    <StyledUL depth={depth}>
      {articles.map(article => {
        const { title, slug } = article;
        const category = articleGroup.category;
        const mainCategory = findMainCategory(category) || category;
        const path = `${mainCategory}/${slug}/`;
        const active =
          activeArticle &&
          activeArticle.category === category &&
          activeArticle.slug === slug;

        return (
          <ArticleListItem
            key={slug}
            id={`li_${category}_${slug}`}
            path={path}
            title={title}
            slug={slug}
            active={active}
            depth={depth}
          />
        );
      })}
    </StyledUL>
  ) : null;
};

export default ArticleList;
