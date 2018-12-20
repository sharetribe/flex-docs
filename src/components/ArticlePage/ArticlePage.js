import React from 'react';
import styled from 'styled-components';

import {
  baselineBreakpoint,
  baselineSmall,
  baselineLarge,
  Ingress,
  H1,
  H6,
  Hr,
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

const ArticleIngress = styled(Ingress)`
  margin-top: ${3 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${4 * baselineLarge}px;
  }
`;

const Info = styled.div`
  margin-top: ${3 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${3 * baselineLarge}px;
  }
`;

const contentMaxWidth = 635;

const SeparatorLine = styled(Hr)`
  margin-top: ${3 * baselineSmall}px;
  max-width: ${contentMaxWidth}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${4 * baselineLarge}px;
  }
`;

const Markdown = styled(MarkdownHtml)`
  margin-top: ${3 * baselineSmall}px;
  margin-bottom: ${props => props.theme.contentPaddingSmall}px;
  max-width: ${contentMaxWidth}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${4 * baselineLarge}px;
    margin-bottom: ${props => props.theme.contentPaddingLarge}px;
  }
`;

const ArticlePage = props => {
  const { frontmatter, html } = props;
  const { title, date, category, ingress } = frontmatter;
  return (
    <MainLayout title={title} description={ingress} activeCategory={category}>
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
        <ArticleIngress>{ingress}</ArticleIngress>
        <Info>
          <H6 as="p">Required skills: -</H6>
          <H6 as="p">Reading time: -</H6>
        </Info>
        <SeparatorLine />
        <Markdown html={html} />
      </Content>
    </MainLayout>
  );
};

export default ArticlePage;
