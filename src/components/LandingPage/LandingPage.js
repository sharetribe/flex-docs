import React from 'react';
import styled from 'styled-components';

import {
  baselineSmall,
  baselineLarge,
  baselineBreakpoint,
  grid,
} from '../../config';
import { H1, H6, P, A, Ul, MainLayout, UiText } from '../../components';
import Section, {
  SectionHeadingLink,
  SectionDescription,
  SectionLinks,
  SectionLink,
} from './Section';

const Content = styled.div`
  max-width: ${props =>
    props.theme.pageContentMaxWidth + 2 * grid.sideMargin}px;
  margin-left: auto;
  margin-right: auto;
`;

export const IntroHeading = styled(H1)`
  margin-top: ${7 * baselineSmall}px;
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${10 * baselineLarge}px;
    margin-left: ${5 * baselineLarge + grid.sideMargin}px;
    margin-right: ${5 * baselineLarge + grid.sideMargin}px;
  }
`;

export const IntroDescription = styled(P)`
  margin-top: ${3 * baselineSmall}px;
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${2 * baselineLarge}px;
    margin-left: ${5 * baselineLarge + grid.sideMargin}px;
    margin-right: ${5 * baselineLarge + grid.sideMargin}px;
  }
`;

const HeadingBr = styled.br`
  display: none;

  @media (min-width: 470px) {
    display: block;
  }
  @media (min-width: ${baselineBreakpoint}px) {
    display: none;
  }
  @media (min-width: 900px) {
    display: block;
  }
`;

const IntroBr = styled.br`
  display: none;

  @media (min-width: 1070px) {
    display: block;
  }
`;

// NOTE: custom font size
const Paragraph = styled(P).attrs({
  small: true,
})`
  margin-top: ${3 * baselineSmall}px;
  margin-bottom: ${11 * baselineSmall}px;
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;

  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.08px;

  // Offset baseline
  top: 1px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${7 * baselineLarge}px;
    margin-bottom: ${13 * baselineLarge}px;
    margin-left: ${5 * baselineLarge + grid.sideMargin}px;
    margin-right: ${5 * baselineLarge + grid.sideMargin}px;

    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0px;

    // Offset baseline
    top: -2px;
  }
`;

const CollectionsHeading = styled(H6)`
  margin-top: ${4 * baselineSmall}px;
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${12 * baselineLarge}px;
    margin-left: ${5 * baselineLarge + grid.sideMargin}px;
    margin-right: ${5 * baselineLarge + grid.sideMargin}px;
  }
`;

const GettingStartedSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: ${2 * baselineSmall}px;

  margin-top: ${2 * baselineSmall}px;
  margin-left: ${grid.smallGap}px;
  margin-right: ${grid.smallGap}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${3 * baselineLarge}px;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 139px;
  }
`;

const CategoriesHeading = styled(H6)`
  margin-top: ${5 * baselineSmall}px;
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${10 * baselineLarge}px;
    margin-left: ${5 * baselineLarge + grid.sideMargin}px;
    margin-right: ${5 * baselineLarge + grid.sideMargin}px;
  }
`;

const Grid = styled.div`
  margin-top: ${2 * baselineSmall}px;
  margin-left: ${grid.smallGap}px;
  margin-right: ${grid.smallGap}px;
  display: grid;
  grid-row-gap: ${grid.smallGap}px;
  grid-column-gap: ${grid.smallGap}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${3 * baselineLarge}px;
    grid-row-gap: ${grid.largeGap}px;
    grid-column-gap: ${grid.largeGap}px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }
`;

const LandingPage = props => {
  const { articleCounts } = props;
  const description = UiText.fn('LandingPage.meta.description');
  return (
    <MainLayout description={description}>
      <Content>
        <IntroHeading>
          <UiText id="LandingPage.headingLine1" />
          <HeadingBr />
          <UiText id="LandingPage.headingLine2" />
        </IntroHeading>
        <IntroDescription>
          <UiText id="LandingPage.introParagraph1" />
          <IntroBr />
          <UiText id="LandingPage.introParagraph2" />{' '}
          <A href="https://www.sharetribe.com/flex/roadmap">
            <UiText id="LandingPage.introRoadmapLink" />
          </A>
          {'.'}
        </IntroDescription>
        <CollectionsHeading as="h2">
          <UiText id="LandingPage.collectionsHeading" />
        </CollectionsHeading>
        <GettingStartedSection>
          <div>
            <SectionHeadingLink to="/background/getting-started/">
              <UiText id="LandingPage.gettingStarted.heading" />
            </SectionHeadingLink>
            <SectionDescription>
              <UiText id="LandingPage.gettingStarted.description" />
            </SectionDescription>
          </div>
          <Ul>
            <SectionLink to="/background/introducing-flex/">
              <UiText id="LandingPage.gettingStarted.introducingFlex" />
            </SectionLink>
            <SectionLink to="/background/development-skills/">
              <UiText id="LandingPage.gettingStarted.devSkills" />
            </SectionLink>
            <SectionLink to="/tutorials/getting-started-with-ftw/">
              <UiText id="LandingPage.gettingStarted.ftwSetup" />
            </SectionLink>
          </Ul>
        </GettingStartedSection>
        <CategoriesHeading as="h2">
          <UiText id="LandingPage.categoriesHeading" />
        </CategoriesHeading>
        <Grid>
          {/* TUTORIALS */}
          <Section>
            <SectionHeadingLink to="/tutorials/">
              <UiText id="LandingPage.tutorials.title" />
            </SectionHeadingLink>
            <SectionDescription>
              <UiText id="LandingPage.tutorials.description" />
            </SectionDescription>
            <SectionLinks>
              <SectionLink to="/tutorials/getting-started-with-ftw/">
                <UiText id="LandingPage.tutorials.gettingStartedFtw" />
              </SectionLink>
              <SectionLink to="/tutorials/">
                <UiText id="LandingPage.tutorials.all" /> (
                {articleCounts.tutorials || 0})
              </SectionLink>
            </SectionLinks>
          </Section>

          {/* GUIDES */}
          <Section>
            <SectionHeadingLink to="/guides/">
              <UiText id="LandingPage.guides.title" />
            </SectionHeadingLink>
            <SectionDescription>
              <UiText id="LandingPage.guides.description" />
            </SectionDescription>
            <SectionLinks>
              <SectionLink to="/guides/how-to-customize-ftw/">
                <UiText id="LandingPage.guides.ftw" />
              </SectionLink>
              <SectionLink to="/guides/how-to-set-up-mapbox-for-ftw/">
                <UiText id="LandingPage.guides.mapbox" />
              </SectionLink>
              <SectionLink to="/guides/how-to-set-up-analytics-for-ftw/">
                <UiText id="LandingPage.guides.analytics" />
              </SectionLink>
              <SectionLink to="/guides/">
                <UiText id="LandingPage.guides.all" /> (
                {articleCounts.guides || 0})
              </SectionLink>
            </SectionLinks>
          </Section>

          {/* REFERENCES */}
          <Section>
            <SectionHeadingLink to="/references/">
              <UiText id="LandingPage.references.title" />
            </SectionHeadingLink>
            <SectionDescription>
              <UiText id="LandingPage.references.description" />
            </SectionDescription>
            <SectionLinks>
              <SectionLink to="/references/api/">
                <UiText id="LandingPage.references.api" />
              </SectionLink>
              <SectionLink to="/references/js-sdk/">
                <UiText id="LandingPage.references.sdk" />
              </SectionLink>
              <SectionLink to="/references/email-templates/">
                <UiText id="LandingPage.references.emailTemplates" />
              </SectionLink>
              <SectionLink to="/references/extended-data/">
                <UiText id="LandingPage.references.extendedData" />
              </SectionLink>
              <SectionLink to="/references/">
                <UiText id="LandingPage.references.all" /> (
                {articleCounts.references || 0})
              </SectionLink>
            </SectionLinks>
          </Section>

          {/* BACKGROUND */}
          <Section>
            <SectionHeadingLink to="/background/">
              <UiText id="LandingPage.background.title" />
            </SectionHeadingLink>
            <SectionDescription>
              <UiText id="LandingPage.background.description" />
            </SectionDescription>
            <SectionLinks>
              <SectionLink to="/background/introducing-flex/">
                <UiText id="LandingPage.background.introducingFlex" />
              </SectionLink>
              <SectionLink to="/background/concepts/">
                <UiText id="LandingPage.background.concepts" />
              </SectionLink>
              <SectionLink to="/background/development-skills/">
                <UiText id="LandingPage.background.developmentSkills" />
              </SectionLink>
              <SectionLink to="/background/features/">
                <UiText id="LandingPage.background.features" />
              </SectionLink>
              <SectionLink to="/background/transaction-process/">
                <UiText id="LandingPage.background.transactionProcess" />
              </SectionLink>
              <SectionLink to="/background/">
                <UiText id="LandingPage.background.all" /> (
                {articleCounts.background || 0})
              </SectionLink>
            </SectionLinks>
          </Section>
        </Grid>
        <Paragraph>
          <UiText id="LandingPage.outro" />{' '}
          <A href="https://sharetribe.typeform.com/to/CMiqus">
            <UiText id="LandingPage.outroLink" />
          </A>
        </Paragraph>
      </Content>
    </MainLayout>
  );
};

export default LandingPage;
