import React from 'react';
import styled from 'styled-components';

import { Ingress, H1, P, Hr } from '../../brand-components';
import { baselineBreakpoint, baselineSmall, baselineLarge } from '../../config';
import { MainLayout, Breadcrumb, SecondaryBox, UiText } from '../../components';
import LastUpdated from './LastUpdated';
import InfoSection from './InfoSection';
import MarkdownHtml from './MarkdownHtml';
import Toc from './Toc';

const ColumnLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const articleContentMaxWidth = 884;
const sideColumnWidth = 277;

const SideColumn = styled.div`
  display: none;
  flex-shrink: 0;

  @media (min-width: 1024px) {
    display: block;
    width: ${sideColumnWidth}px;
  }
`;

const SideNavigation = styled(SecondaryBox)`
  // SideColumn is hidden in small viewport

  @media (min-width: ${baselineBreakpoint}px) {
    box-shadow: none;
    position: sticky;
    margin-left: 12px;
    margin-top: ${6 * baselineLarge}px;
    margin-bottom: ${4 * baselineLarge}px;
    top: ${2 * baselineLarge}px;
  }
`;

const MainColumn = styled.article`
  flex-grow: 1;

  overflow-x: hidden;

  padding-left: ${props => props.theme.contentPaddingSmall}px;
  padding-right: ${props => props.theme.contentPaddingSmall}px;

  max-width: ${props =>
    articleContentMaxWidth + 2 * props.theme.contentPaddingLarge}px;

  @media (min-width: ${baselineBreakpoint}px) {
    padding-left: ${props => props.theme.contentPaddingLarge}px;
    padding-right: ${props => props.theme.contentPaddingLarge}px;
  }
`;

const CrumbWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${4 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    flex-direction: row;
    margin-top: ${10 * baselineLarge}px;
  }
`;

const Updated = styled(LastUpdated)`
  flex-shrink: 0;
  color: ${props => props.theme.textColorSecondary};

  // Font
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.07px;

  // Offset baseline
  top: -1px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 14px;
    line-height: 32px;
    letter-spacing: -0.08px;

    // Offset baseline
    top: 3px;

    padding-left: 7px;
    margin-left: auto;
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

const SeparatorLine = styled(Hr)`
  margin-top: ${3 * baselineSmall}px;
  max-width: ${props => props.theme.contentMaxWidth}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${4 * baselineLarge}px;
  }
`;

const Markdown = styled(MarkdownHtml)`
  margin-top: ${3 * baselineSmall}px;
  margin-bottom: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${4 * baselineLarge}px;
    margin-bottom: ${props => props.theme.contentPaddingLarge}px;
  }
`;

const SideNavTitle = styled(P)`
  // Side navigation hidden on small viewport

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 16px;
    line-height: 32px;
    letter-spacing: -0.09px;
  }
`;

const ArticlePage = props => {
  const { frontmatter, html, estimatedReadingTime, tableOfContents } = props;
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
            <SideNavTitle>{title}</SideNavTitle>
            <Toc path={`/${category}/${slug}/`} headings={tableOfContents} />
          </SideNavigation>
        </SideColumn>
        <MainColumn>
          <script type="application/ld+json">{ldJson}</script>
          <CrumbWrapper>
            <Breadcrumb
              links={[
                { path: '/', label: 'Docs' },
                {
                  path: `/${category}/`,
                  label: UiText.fn(`ArticlePage.${category}.breadCrumbTitle`),
                },
                { path: `/${category}/${slug}/`, label: title },
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
