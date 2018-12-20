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
import { categories } from '../../config';
import { MainLayout, Breadcrumb } from '../../components';
import ArticleIndex from './ArticleIndex';

const Content = styled.div`
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;
  margin-bottom: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-left: ${props => props.theme.contentPaddingLarge}px;
    margin-right: ${props => props.theme.contentPaddingLarge}px;
    margin-bottom: ${props => props.theme.contentPaddingLarge}px;
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
  const { title, category, articles } = props;
  return (
    <MainLayout title={title} activeCategory={category}>
      <Content>
        <Crumb
          links={[
            { path: '/', label: 'Docs' },
            { label: categories[category].label },
          ]}
        />
        <Heading>{title}</Heading>
        <Description>{categories[category].description}</Description>
        <Separator />
        <Index pathPrefix={`/${category}/`} articles={articles} />
      </Content>
    </MainLayout>
  );
};

export default ArticleIndexPage;
