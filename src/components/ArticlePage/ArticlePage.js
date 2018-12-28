import React from 'react';
import styled from 'styled-components';

import {
  baselineBreakpoint,
  baselineSmall,
  baselineLarge,
  Ingress,
  H1,
  P,
  Hr,
} from '../../brand-components';
import { categories } from '../../config';
import { MainLayout, Breadcrumb, SecondaryBox } from '../../components';
import LastUpdated from './LastUpdated';
import InfoSection from './InfoSection';
import MarkdownHtml from './MarkdownHtml';

const ColumnLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

const sideColumnWidth = 277;
const mainColumnMinWidth = 740;

const SideColumn = styled.div`
  display: none;
  flex-shrink: 0;

  @media (min-width: ${sideColumnWidth + mainColumnMinWidth}px) {
    display: block;
    width: ${sideColumnWidth}px;
    margin-right: 31px;
  }
`;

const SideNavigation = styled(SecondaryBox)`
  box-shadow: none;
  position: sticky;

  margin-left: 12px;

  margin-top: ${2 * baselineSmall}px;
  top: ${2 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${6 * baselineLarge}px;
    top: ${2 * baselineLarge}px;
  }
`;

const MainColumn = styled.article`
  flex-grow: 1;

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

const Info = styled(InfoSection)`
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
  const { frontmatter, html, estimatedReadingTime } = props;
  const { title, slug, date, category, ingress } = frontmatter;

  // Structured metadata for the article page
  //
  // See: https://developers.google.com/search/docs/data-types/article
  const ldJson = JSON.stringify({
    '@context': 'http://schema.org',
    '@type': 'TechArticle',
    dateModified: date,
    headline: title,
    description: ingress,

    // TODO: image is recommended, but we don't have a way to dig it at the moment
    //
    // image: [
    //   'http://example.com/image.jpg'
    // ]
  });

  return (
    <MainLayout title={title} description={ingress} activeCategory={category}>
      <ColumnLayout>
        <SideColumn>
          <SideNavigation>
            <P>TODO: side navigation here</P>
          </SideNavigation>
        </SideColumn>
        <MainColumn>
          <script type="application/ld+json">{ldJson}</script>
          <CrumbWrapper>
            <Crumb
              links={[
                { path: '/', label: 'Docs' },
                { path: `/${category}`, label: categories[category].label },
                { path: `/${category}/${slug}`, label: title },
              ]}
            />
            <Updated date={date} />
          </CrumbWrapper>
          <Heading>{title}</Heading>
          <ArticleIngress>{ingress}</ArticleIngress>
          <Info
            frontmatter={frontmatter}
            estimatedReadingTime={estimatedReadingTime}
          />
          <SeparatorLine />
          <Markdown html={html} />
        </MainColumn>
      </ColumnLayout>
    </MainLayout>
  );
};

export default ArticlePage;
