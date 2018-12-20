import React from 'react';
import styled from 'styled-components';

import {
  baselineBreakpoint,
  baselineSmall,
  baselineLarge,
  H1,
} from '../../brand-components';
import { categories } from '../../config';
import { MainLayout, Breadcrumb } from '../../components';
import LastUpdated from './LastUpdated';
import MarkdownHtml from './MarkdownHtml';

const Content = styled.article`
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-left: ${props => props.theme.contentPaddingLarge}px;
    margin-right: ${props => props.theme.contentPaddingLarge}px;
  }
`;

const CrumbWrapper = styled.div`
  margin-top: ${4 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${9 * baselineLarge}px;
  }
`;

const Crumb = styled(Breadcrumb)`
  @media (min-width: ${baselineBreakpoint}px) {
    display: inline;
  }
`;

const Updated = styled(LastUpdated)`
  color: ${props => props.theme.textColorSecondary};

  // Font
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.07px;

  // Offset baseline
  top: -1px;

  @media (min-width: ${baselineBreakpoint}px) {
    display: inline;
    font-size: 14px;
    line-height: 32px;
    letter-spacing: -0.08px;

    // Offset baseline
    top: 3px;

    margin-left: 7px;
    ::before {
      content: '•';
      margin-right: 7px;
    }
  }
`;

const Heading = styled(H1)`
  margin-top: ${3 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${3 * baselineLarge}px;
  }
`;

const ArticlePage = props => {
  const { title, date, category, html } = props;
  return (
    <MainLayout title={title} activeCategory={category}>
      <Content>
        <CrumbWrapper>
          <Crumb
            links={[
              { path: '/', label: 'Docs' },
              { path: `/${category}`, label: categories[category].label },
              { label: title },
            ]}
          />
          <Updated date={date} />
        </CrumbWrapper>
        <Heading>{title}</Heading>
        <MarkdownHtml html={html} />
      </Content>
    </MainLayout>
  );
};

export default ArticlePage;
