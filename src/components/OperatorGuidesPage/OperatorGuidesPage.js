import React from 'react';
import styled from 'styled-components';

import {
  baselineBreakpoint,
  baselineSmall,
  baselineLarge,
  grid,
} from '../../config';
import { P, H1, MainLayout, UiText } from '../../components';
import OperatorGuidesArticleIndex from './OperatorGuidesArticleIndex';

const Content = styled.div`
  max-width: ${props =>
    props.theme.pageContentMaxWidth + 2 * grid.sideMargin}px;
  margin-left: auto;
  margin-right: auto;

  padding-bottom: ${4 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    padding-bottom: ${4 * baselineLarge}px;
  }
`;

const Heading = styled(H1)`
  margin-top: ${7 * baselineSmall}px;
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${10 * baselineLarge}px;
    margin-left: ${props =>
      props.theme.contentPaddingLarge + grid.sideMargin}px;
    margin-right: ${props =>
      props.theme.contentPaddingLarge + grid.sideMargin}px;
  }
`;

const Count = styled.span`
  color: #007dff;
  margin-top: ${3 * baselineSmall}px;
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${2 * baselineLarge}px;
    margin-left: ${props =>
      props.theme.contentPaddingLarge + grid.sideMargin}px;
    margin-right: ${props =>
      props.theme.contentPaddingLarge + grid.sideMargin}px;
  }
`;

const Description = styled(P)`
  margin-top: ${3 * baselineSmall}px;
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${2 * baselineLarge}px;
    margin-left: ${props =>
      props.theme.contentPaddingLarge + grid.sideMargin}px;
    margin-right: ${props =>
      props.theme.contentPaddingLarge + grid.sideMargin}px;
  }
`;

const Index = styled(OperatorGuidesArticleIndex)`
  margin-top: ${7 * baselineSmall}px;
  margin-left: ${grid.smallGap}px;
  margin-right: ${grid.smallGap}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${9 * baselineLarge}px;
  }
`;

/**
 * Converts a hyphen-separated string to camel case. TODO: move to util files
 *
 * @param {string} str - The hyphen-separated string to be converted.
 * @returns {string} - The camel case representation of the input string.
 */
const camelize = str => {
  const arr = str.split('-');
  const capitalize = (item, index) =>
    index > 0 ? item.charAt(0).toUpperCase() + item.slice(1) : item;

  return arr.map(capitalize).join('');
};

/**
 * Orders the data array based on the order of ids in the sortingArray.
 * Returns a new array with the data sorted. Used to ensure that the categories displayed
 * on the Operator Guides page and Pilot Day pages are not alphabetically ordered but
 * adhere to the order defined in config-site-structure.js
 *
 * @param {Array} sortingArray - The array specifying the desired order of ids. See below, we pass the sortingArray.subcategories value here
 * @param {Array} data - The array to be sorted based on the order of ids.
 * @returns {Array} - A new array with the data sorted according to the sortingArray.
 */
const orderCategories = (sortingArray, data) => {
  // Create a map to store the index of each id in sortingArray
  const indexMap = new Map();

  sortingArray.forEach((item, index) => {
    indexMap.set(item.id, index);
  });

  // Sort the copied data array based on the index of ids in sortingArray
  const sortedData = [...data].sort(
    (a, b) => indexMap.get(a.title) - indexMap.get(b.title)
  );

  return sortedData;
};

const OperatorGuidesPage = props => {
  const { category, noPrefix, data, sortingArray, noIndex } = props;
  const title = UiText.fn(`ArticleIndexPage.${category}.title`);
  const description = UiText.fn(`ArticleIndexPage.${category}.description`);
  const articleCountDescriptor = UiText.fn(`ArticleIndexPage.articleCount`);
  const pathPrefixMaybe = noPrefix ? {} : { pathPrefix: `/${category}/` };

  const sortedData = orderCategories(sortingArray.subcategories, data);

  const articleList = sortedData.map((entry, index) => {
    const title = UiText.fn(`Sidebar.${camelize(entry.title)}`);
    return (
      <Index
        {...pathPrefixMaybe}
        articles={entry.edges}
        title={title}
        key={index}
      />
    );
  });
  return (
    <MainLayout
      noIndex={noIndex}
      title={title}
      description={description}
      activeCategory={category}
    >
      <Content>
        <Heading>{title}</Heading>
        <Count>
          {sortedData.reduce((acc, cur) => cur.edges.length + acc, 0)}{' '}
          {articleCountDescriptor}
        </Count>
        <Description>{description}</Description>
        {articleList}
      </Content>
    </MainLayout>
  );
};

export default OperatorGuidesPage;
