import React from 'react';
import styled from 'styled-components';

import {
  baselineSmall,
  baselineLarge,
  baselineBreakpoint,
  P,
  A,
} from '../../brand-components';
import { grid, categories } from '../../config';
import { MainLayout } from '../../components';
import { IntroHeading, IntroDescription } from './Intro';
import Grid, {
  GridBox,
  GridHeadingLink,
  GridDescription,
  GridLinks,
  GridLink,
} from './Grid';

const Block = styled.span`
  display: block;
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
  return (
    <MainLayout>
      <IntroHeading>
        <Block>Sharetribe Flex</Block>
        <Block>Developer documentation</Block>
      </IntroHeading>
      <IntroDescription>
        Sharetribe Flex is the fastest and most affordable way to set up a
        powerful marketplace platform that is uniquely yours. To see what
        features we are building or planning to build, see the Updates page and
        the Flex Roadmap.
      </IntroDescription>
      <Grid>
        {/* TUTORIALS */}
        <GridBox>
          <GridHeadingLink category="tutorials" />
          <GridDescription>{categories.tutorials.description}</GridDescription>
          <GridLinks>
            <GridLink to="/tutorials/getting-started">Getting Started</GridLink>
            <GridLink to="/tutorials">
              All tutorials ({articleCounts.tutorials || 0})
            </GridLink>
          </GridLinks>
        </GridBox>

        {/* GUIDES */}
        <GridBox>
          <GridHeadingLink category="guides" />
          <GridDescription>{categories.guides.description}</GridDescription>
          <GridLinks>
            <GridLink to="/guides">
              All guides ({articleCounts.guides || 0})
            </GridLink>
          </GridLinks>
        </GridBox>

        {/* REFERENCES */}
        <GridBox>
          <GridHeadingLink category="references" />
          <GridDescription>{categories.references.description}</GridDescription>
          <GridLinks>
            <GridLink to="/references/api">API Reference</GridLink>
            <GridLink to="/references/js-sdk">JS SDK Reference</GridLink>
            <GridLink to="/references/ftw">FTW Reference</GridLink>
            <GridLink to="/references">
              All reference ({articleCounts.references || 0})
            </GridLink>
          </GridLinks>
        </GridBox>

        {/* BACKGROUND */}
        <GridBox>
          <GridHeadingLink category="background" />
          <GridDescription>{categories.background.description}</GridDescription>
          <GridLinks>
            <GridLink to="/background/architecture">
              Sharetribe Flex overview
            </GridLink>
            <GridLink to="/background/concepts">Important concepts</GridLink>
            <GridLink to="/background">
              All background articles ({articleCounts.background || 0})
            </GridLink>
          </GridLinks>
        </GridBox>
      </Grid>
      <Paragraph>
        Missing something important? <A href="#">Let us know.</A>
      </Paragraph>
    </MainLayout>
  );
};

export default LandingPage;
