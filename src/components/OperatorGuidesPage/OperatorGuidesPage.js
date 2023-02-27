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

// import from util instead in here
const camelize = str => {
  const arr = str.split('-');
  const capitalize = (item, index) =>
    index > 0 ? item.charAt(0).toUpperCase() + item.slice(1) : item;

  return arr.map(capitalize).join('');
};

const OperatorGuidesPage = props => {
  const { category, articles, noPrefix, data } = props;
  const title = UiText.fn(`ArticleIndexPage.${category}.title`);
  const description = UiText.fn(`ArticleIndexPage.${category}.description`);
  <UiText id={`Sidebar.${camelize(category)}`} />;
  const articleCountDescriptor = UiText.fn(`ArticleIndexPage.articleCount`);
  const pathPrefixMaybe = noPrefix ? {} : { pathPrefix: `/${category}/` };
  console.log(articles, 'art');
  const testr = data.map((entry, index) => {
    const title = UiText.fn(`Sidebar.${camelize(entry.title)}`);
    return (
      <div key={index}>
        <Heading>{title}</Heading>
        <Index {...pathPrefixMaybe} articles={entry.edges} />
      </div>
    );
  });
  return (
    <MainLayout
      title={title}
      description={description}
      activeCategory={category}
    >
      <Content>
        <Heading>{title}</Heading>
        <Count>
          {articles.length} {articleCountDescriptor}
        </Count>
        <Description>{description}</Description>
        {testr}
      </Content>
    </MainLayout>
  );
};

export default OperatorGuidesPage;
