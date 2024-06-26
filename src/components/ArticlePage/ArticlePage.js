import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  baselineBreakpoint,
  baselineSmall,
  baselineLarge,
  siteStructure,
} from '../../config';
import { findParentCategories } from '../../util/navigation';
import { categoryFromLocation } from '../../util/utils';
import {
  Ingress,
  H1,
  H6,
  MainLayout,
  Breadcrumb,
  Box,
  UiText,
} from '../../components';
import LastUpdated from './LastUpdated';
import InfoSection from './InfoSection';
import MarkdownHtml from './MarkdownHtml';
import Toc from './Toc';
import NextAndPrevArticles from './NextAndPrevArticles';
import Footer from './Footer';

// Removed this second ToC component
// import ArticleToc from './ArticleToc';

const ColumnLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const articleContentMaxWidth = 884;
const sideColumnWidth = 277;

const SideColumn = styled.aside`
  display: none;
  flex-shrink: 0;

  @media (min-width: 1024px) {
    display: block;
    width: ${sideColumnWidth}px;
  }
`;

const SideNavigation = styled(Box)`
  // SideColumn is hidden in small viewport

  @media (min-width: ${baselineBreakpoint}px) {
    box-shadow: none;
    position: sticky;
    margin-right: 12px;
    margin-top: ${6 * baselineLarge}px;
    margin-bottom: ${4 * baselineLarge}px;
    top: ${2 * baselineLarge}px;
    padding-left: 36px;
    padding-right: 36px;
  }

  :hover {
    transform: none;
    box-shadow: none;
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
    margin-top: ${5 * baselineLarge}px;
  }
`;

const Updated = styled(LastUpdated)`
  flex-shrink: 0;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${baselineLarge}px;
    margin-left: auto;
    padding-left: 7px;
  }
`;

const Heading = styled(H1)`
  margin-top: ${3 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${3 * baselineLarge}px;
  }
`;

const ArticleIngress = styled(Ingress)`
  margin-top: ${2 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${3 * baselineLarge}px;
  }
`;

const Info = styled(InfoSection)`
  margin-top: ${1 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${1 * baselineLarge}px;
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

const MobileTocWrapper = styled.section`
  margin-top: ${2 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${2 * baselineLarge}px;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const MobileToc = styled(Toc)`
  display: inline-block;
  margin-top: ${baselineSmall}px;
`;

const SideToc = styled(Toc)`
  @media (min-width: ${baselineBreakpoint}px) {
    display: inline-block;
    margin-top: ${baselineLarge}px;
  }
`;

const ContentTocHeader = styled(H6)`
  margin-top: 0;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${4 * baselineLarge}px;
  }
`;

const findMainCategory = category => {
  const path = findParentCategories(category, siteStructure) || [];
  return path.length > 0 ? path[path.length - 1] : null;
};

const ArticlePage = props => {
  const { frontmatter, htmlAst, tableOfContents } = props;
  const { title, slug, updated, category, ingress } = frontmatter;
  const mainCategory = findMainCategory(category) || category;
  const [location, setLocation] = useState(null);
  const isBrowser = typeof window !== 'undefined';

  // fetch browser location
  useEffect(() => {
    if (isBrowser) {
      setLocation(window.location);
    }
  }, [isBrowser]);

  const alternativeFooter =
    categoryFromLocation(location) === 'the-new-sharetribe';

  // Structured metadata for the article page
  //
  // See: https://developers.google.com/search/docs/data-types/article
  const ldJson = JSON.stringify({
    '@context': 'http://schema.org',
    '@type': 'TechArticle',
    dateModified: updated,
    headline: title,
    description: ingress,

    // NOTE: image is recommended, but we don't have a way to dig it at the moment
    //
    // image: [
    //   'http://example.com/image.jpg'
    // ]
  });

  return (
    <MainLayout
      noIndex={frontmatter.noindex}
      title={title}
      description={ingress}
      activeArticle={{ category, slug }}
    >
      <ColumnLayout>
        <MainColumn>
          {/* json schema won't validate if not set through dangerouslySetInnerHTML
          https://stackoverflow.com/questions/49018148/react-json-schema-double-quotes-encoding */}
          <script
            key="ldjsonmain"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: ldJson }}
          />
          <CrumbWrapper>
            <Breadcrumb
              links={[
                { path: '/', label: 'Docs' },
                {
                  path: `/${mainCategory}/`,
                  label: UiText.fn(
                    `ArticlePage.${mainCategory}.breadCrumbTitle`
                  ),
                },
                { path: `/${mainCategory}/${slug}/`, label: title },
              ]}
            />
            <Updated date={updated} />
          </CrumbWrapper>
          <Heading className="docSearch-h1">{title}</Heading>
          <ArticleIngress className="docSearch-ingress">
            {ingress}
          </ArticleIngress>
          <Info frontmatter={frontmatter} />
          <MobileTocWrapper>
            <ContentTocHeader>
              <UiText id="ArticlePage.tableOfContents" />
            </ContentTocHeader>
            <MobileToc
              path={`/${mainCategory}/${slug}/`}
              headings={tableOfContents}
              maxDepth={3}
            />
          </MobileTocWrapper>
          <Markdown className="docSearch-content" htmlAst={htmlAst} />
          <Footer altFooter={alternativeFooter} />
          <NextAndPrevArticles
            slug={slug}
            category={category}
            mainCategory={mainCategory}
          />
        </MainColumn>
        <SideColumn>
          <SideNavigation as="nav">
            <H6 as="p">
              <UiText id="ArticlePage.tableOfContents" />
            </H6>
            <SideToc
              path={`/${mainCategory}/${slug}/`}
              headings={tableOfContents}
              maxDepth={3}
            />
          </SideNavigation>
        </SideColumn>
      </ColumnLayout>
    </MainLayout>
  );
};

export default ArticlePage;
