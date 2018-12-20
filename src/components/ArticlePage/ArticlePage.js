import React from 'react';
import styled from 'styled-components';

import {
  baselineBreakpoint,
  baselineSmall,
  baselineLarge,
  H1,
  P,
} from '../../brand-components';
import { categories } from '../../config';
import { MainLayout, Breadcrumb } from '../../components';
import MarkdownHtml from './MarkdownHtml';

const Content = styled.article`
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-left: ${props => props.theme.contentPaddingLarge}px;
    margin-right: ${props => props.theme.contentPaddingLarge}px;
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

const ArticlePage = props => {
  const { title, date, category, html } = props;
  return (
    <MainLayout title={title} activeCategory={category}>
      <Content>
        <Crumb
          links={[
            { path: '/', label: 'Docs' },
            { path: `/${category}`, label: categories[category].label },
            { label: title },
          ]}
        />
        <P>{date}</P>
        <Heading>{title}</Heading>
        <MarkdownHtml html={html} />
      </Content>
    </MainLayout>
  );
};

export default ArticlePage;
