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
  SectionHeading,
  SectionDescription,
  SectionLinks,
  SectionLink,
  SectionExternalLink,
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
    margin-left: ${props => props.theme.contentPaddingLarge}px;
    margin-right: ${props => props.theme.contentPaddingLarge}px;
  }
`;

export const IntroDescription = styled(P)`
  margin-top: ${3 * baselineSmall}px;
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${2 * baselineLarge}px;
    margin-left: ${props => props.theme.contentPaddingLarge}px;
    margin-right: ${props => props.theme.contentPaddingLarge}px;
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
    margin-left: ${props => props.theme.contentPaddingLarge}px;
    margin-right: ${props => props.theme.contentPaddingLarge}px;

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
    margin-left: ${props => props.theme.contentPaddingLarge}px;
    margin-right: ${props => props.theme.contentPaddingLarge}px;
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
    grid-column-gap: 112px;
  }
`;

const StyledSection = styled(Section)`
  display: flex;
  flex-direction: column;
`;

const StyledSectionDescription = styled(SectionDescription)`
  @media (min-width: ${baselineBreakpoint}px) {
    margin-bottom: auto;
  }
`;

const CategoriesHeading = styled(H6)`
  margin-top: ${5 * baselineSmall}px;
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${10 * baselineLarge}px;
    margin-left: ${props => props.theme.contentPaddingLarge}px;
    margin-right: ${props => props.theme.contentPaddingLarge}px;
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
          <A href="https://www.sharetribe.com/products/flex/roadmap/">
            <UiText id="LandingPage.introRoadmapLink" />
          </A>
          {'.'}
        </IntroDescription>
        <CategoriesHeading as="h2">
          <UiText id="LandingPage.categoriesHeading" />
        </CategoriesHeading>
        <Grid>
          {/* INTRODUCTION */}
          <StyledSection>
            <SectionHeading>
              <UiText id="LandingPage.introduction.title" />
            </SectionHeading>
            <StyledSectionDescription>
              <UiText id="LandingPage.introduction.description" />
            </StyledSectionDescription>
            <SectionLinks>
              <SectionLink to="/introduction/introducing-flex/">
                <UiText id="LandingPage.introduction.introductionFlex" />
              </SectionLink>
              <SectionLink to="/introduction/getting-started-with-ftw-daily/">
                <UiText id="LandingPage.introduction.gettingStarted" />
              </SectionLink>
            </SectionLinks>
          </StyledSection>

          {/* TUTORIAL */}
          <StyledSection>
            <SectionHeading>
              <UiText id="LandingPage.tutorial.title" />
            </SectionHeading>
            <StyledSectionDescription>
              <UiText id="LandingPage.tutorial.description" />
            </StyledSectionDescription>
            <SectionLinks>
              <SectionLink to="/tutorial/introduction/">
                <UiText id="LandingPage.tutorial.introduction" />
              </SectionLink>
            </SectionLinks>
          </StyledSection>

          {/* CONCEPTS */}
          <StyledSection>
            <SectionHeading>
              <UiText id="LandingPage.concepts.title" />
            </SectionHeading>
            <StyledSectionDescription>
              <UiText id="LandingPage.concepts.description" />
            </StyledSectionDescription>
            <SectionLinks>
              <SectionLink to="/concepts/how-the-listing-search-works/">
                <UiText id="LandingPage.concepts.search" />
              </SectionLink>
              <SectionLink to="/concepts/payments-overview/">
                <UiText id="LandingPage.concepts.payments" />
              </SectionLink>
              <SectionLink to="/concepts/transaction-process/">
                <UiText id="LandingPage.concepts.transactionProcess" />
              </SectionLink>
            </SectionLinks>
          </StyledSection>

          {/* FLEX DESIGN TOOLKIT */}
          <StyledSection>
            <SectionHeading>
              <UiText id="LandingPage.designToolkit.title" />
            </SectionHeading>
            <StyledSectionDescription>
              <UiText id="LandingPage.designToolkit.description" />
            </StyledSectionDescription>
            <SectionLinks>
              <SectionLink to="/design-toolkit/what-are-user-journeys/">
                <UiText id="LandingPage.designToolkit.userJourney" />
              </SectionLink>
            </SectionLinks>
          </StyledSection>
        </Grid>

        <CollectionsHeading as="h2">
          <UiText id="LandingPage.collectionsHeading" />
        </CollectionsHeading>
        <GettingStartedSection>
          <div>
            <SectionHeading>
              <UiText id="LandingPage.bestPicks.heading" />
            </SectionHeading>
            <SectionDescription>
              <UiText id="LandingPage.bestPicks.description" />
            </SectionDescription>
          </div>
          <Ul>
            <SectionLink to="/ftw-introduction/how-to-customize-ftw/">
              <UiText id="LandingPage.bestPicks.gettingStartedWithFTW" />
            </SectionLink>
            <SectionLink to="/ftw/customization-checklist/">
              <UiText id="LandingPage.bestPicks.ftwCustomizationChecklist" />
            </SectionLink>
            <SectionLink to="/how-to/extend-listing-data-in-ftw/">
              <UiText id="LandingPage.bestPicks.extendListingData" />
            </SectionLink>
            <SectionLink to="/how-to/how-to-customize-pricing/">
              <UiText id="LandingPage.bestPicks.customizePricing" />
            </SectionLink>
            <SectionLink to="/how-to/change-transaction-process-in-ftw/">
              <UiText id="LandingPage.bestPicks.changeTransactionProcess" />
            </SectionLink>
            <SectionLink to="/introduction/getting-started-with-flex-cli/">
              <UiText id="LandingPage.bestPicks.gettingStartedWithFlexCLi" />
            </SectionLink>
            <SectionLink to="/introduction/getting-started-with-integration-api/">
              <UiText id="LandingPage.bestPicks.gettingStartedWithIntegrationsAPI" />
            </SectionLink>

            <SectionExternalLink href="https://www.sharetribe.com/api-reference/">
              <UiText id="LandingPage.bestPicks.apiReference" />
            </SectionExternalLink>
          </Ul>
        </GettingStartedSection>

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
