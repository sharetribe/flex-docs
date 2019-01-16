import React from 'react';
import styled from 'styled-components';

import {
  baselineBreakpoint,
  baselineSmall,
  baselineLarge,
  grid,
} from '../../config';
import { P, H1, MainLayout, UiText } from '../../components';
import ArticleIndex from './ArticleIndex';

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
    font-size: 48px;
    line-height: 64px;
    letter-spacing: -1.2px;

    margin-top: ${14 * baselineLarge}px;
    margin-left: ${props =>
      props.theme.contentPaddingLarge + grid.sideMargin}px;
    margin-right: ${props =>
      props.theme.contentPaddingLarge + grid.sideMargin}px;

    // Offset baseline
    top: -1px;
  }
`;

const Count = styled.span`
  color: #007dff;
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

const Index = styled(ArticleIndex)`
  margin-top: ${7 * baselineSmall}px;
  margin-left: ${grid.smallGap}px;
  margin-right: ${grid.smallGap}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${9 * baselineLarge}px;
  }
`;

const ArticleIndexPage = props => {
  const { category, articles } = props;
  const title = UiText.fn(`ArticleIndexPage.${category}.title`);
  const description = UiText.fn(`ArticleIndexPage.${category}.description`);
  return (
    <MainLayout
      title={title}
      description={description}
      activeCategory={category}
    >
      <Content>
        <Heading>
          {title} <Count>{articles.length}</Count>
        </Heading>
        <Description>{description}</Description>
        <Index pathPrefix={`/${category}/`} articles={articles} />
      </Content>
    </MainLayout>
  );
};

export default ArticleIndexPage;
