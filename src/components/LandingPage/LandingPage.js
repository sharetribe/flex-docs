import React from 'react';
import styled from 'styled-components';

import {
  baselineSmall,
  baselineLarge,
  baselineBreakpoint,
  P,
  A,
} from '../../brand-components';
import { grid } from '../../config';
import { MainLayout, UiText } from '../../components';
import { IntroHeading, IntroDescription } from './Intro';
import Grid from './Grid';
import {
  GridBox,
  GridHeadingLink,
  GridDescription,
  GridLinks,
  GridLink,
} from './Section';

const Content = styled.div`
  max-width: ${props =>
    props.theme.pageContentMaxWidth + 2 * grid.sideMargin}px;
  margin-left: auto;
  margin-right: auto;
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

const Paragraph = styled(P)`
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
    margin-left: ${props =>
      props.theme.contentPaddingLarge + grid.sideMargin}px;
    margin-right: ${props =>
      props.theme.contentPaddingLarge + grid.sideMargin}px;

    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.09px;

    // Offset baseline
    top: -2px;
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
          <P>
            <UiText id="LandingPage.introParagraph1" />
            <IntroBr />
            <UiText id="LandingPage.introParagraph2" />{' '}
            <A href="https://www.sharetribe.com/flex/roadmap">
              <UiText id="LandingPage.introRoadmapLink" />
            </A>
            {'.'}
          </P>
        </IntroDescription>
        <Grid>
          {/* TUTORIALS */}
          <GridBox>
            <GridHeadingLink category="tutorials">
              <UiText id="LandingPage.tutorials.title" />
            </GridHeadingLink>
            <GridDescription>
              <UiText id="LandingPage.tutorials.description" />
            </GridDescription>
            <GridLinks>
              <GridLink to="/tutorials/getting-started-with-ftw/">
                <UiText id="LandingPage.tutorials.gettingStartedFtw" />
              </GridLink>
              <GridLink to="/tutorials/">
                <UiText id="LandingPage.tutorials.all" /> (
                {articleCounts.tutorials || 0})
              </GridLink>
            </GridLinks>
          </GridBox>

          {/* GUIDES */}
          <GridBox>
            <GridHeadingLink category="guides">
              <UiText id="LandingPage.guides.title" />
            </GridHeadingLink>
            <GridDescription>
              <UiText id="LandingPage.guides.description" />
            </GridDescription>
            <GridLinks>
              <GridLink to="/guides/">
                <UiText id="LandingPage.guides.all" /> (
                {articleCounts.guides || 0})
              </GridLink>
            </GridLinks>
          </GridBox>

          {/* REFERENCES */}
          <GridBox>
            <GridHeadingLink category="references">
              <UiText id="LandingPage.references.title" />
            </GridHeadingLink>
            <GridDescription>
              <UiText id="LandingPage.references.description" />
            </GridDescription>
            <GridLinks>
              <GridLink to="/references/api/">
                <UiText id="LandingPage.references.api" />
              </GridLink>
              <GridLink to="/references/js-sdk/">
                <UiText id="LandingPage.references.sdk" />
              </GridLink>
              <GridLink to="/references/ftw/">
                <UiText id="LandingPage.references.ftw" />
              </GridLink>
              <GridLink to="/references/">
                <UiText id="LandingPage.references.all" /> (
                {articleCounts.references || 0})
              </GridLink>
            </GridLinks>
          </GridBox>

          {/* BACKGROUND */}
          <GridBox>
            <GridHeadingLink category="background">
              <UiText id="LandingPage.background.title" />
            </GridHeadingLink>
            <GridDescription>
              <UiText id="LandingPage.background.description" />
            </GridDescription>
            <GridLinks>
              <GridLink to="/background/overview/">
                <UiText id="LandingPage.background.overview" />
              </GridLink>
              <GridLink to="/background/concepts/">
                <UiText id="LandingPage.background.concepts" />
              </GridLink>
              <GridLink to="/background/development-skills//">
                <UiText id="LandingPage.background.developmentSkills" />
              </GridLink>
              <GridLink to="/background/">
                <UiText id="LandingPage.background.all" /> (
                {articleCounts.background || 0})
              </GridLink>
            </GridLinks>
          </GridBox>
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
