import React from 'react';
import styled from 'styled-components';

import {
  baselineBreakpoint,
  baselineSmall,
  baselineLarge,
  P,
  H1,
  Hr,
} from '../../brand-components';
import { MainLayout, Breadcrumb, UiText } from '../../components';
import ArticleIndex from './ArticleIndex';

const Content = styled.div`
  padding-left: ${props => props.theme.contentPaddingSmall}px;
  padding-right: ${props => props.theme.contentPaddingSmall}px;
  padding-bottom: ${props => props.theme.contentPaddingSmall}px;
  margin: 0 auto;
  max-width: 800px;

  @media (min-width: ${baselineBreakpoint}px) {
    padding-left: ${props => props.theme.contentPaddingLarge}px;
    padding-right: ${props => props.theme.contentPaddingLarge}px;
    padding-bottom: ${props => props.theme.contentPaddingLarge}px;
  }
`;

const Crumb = styled(Breadcrumb)`
  margin-top: ${3 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${9 * baselineLarge}px;
  }
`;

const Heading = styled(H1)`
  margin-top: ${3 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${3 * baselineLarge}px;
  }
`;

const Description = styled(P)`
  margin-top: ${3 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${3 * baselineLarge}px;
  }
`;

const Separator = styled(Hr)`
  margin-top: ${3 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${3 * baselineLarge}px;
  }
`;

const Index = styled(ArticleIndex)`
  margin-top: ${3 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${3 * baselineLarge}px;
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
        <Crumb
          links={[
            { path: '/', label: 'Docs' },
            { path: `/${category}/`, label: title },
          ]}
        />
        <Heading>{title}</Heading>
        <Description>{description}</Description>
        <Separator />
        <Index pathPrefix={`/${category}/`} articles={articles} />
      </Content>
    </MainLayout>
  );
};

export default ArticleIndexPage;
