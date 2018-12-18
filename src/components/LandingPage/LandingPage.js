import React from 'react';
import styled from 'styled-components';

import {
  baselineSpacing,
  baselineSmall,
  baselineLarge,
  baselineBreakpoint,
  H1,
  H4,
  P,
  Ul,
  Li,
} from '../../brand-components';
import { SingleColumnLayout } from '../../layouts';
import { Link, SecondaryBox } from '../../components';

const gapSmall = 2 * baselineSmall;
const gapLarge = 4 * baselineLarge;
const gridSideMargin = gapSmall;

const IntroWrapper = styled.div`
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-left: ${props => props.theme.contentPaddingLarge + gridSideMargin}px;

    // Leave less right margin to fit heading nicely viewport 768px wide.
    margin-right: ${gridSideMargin}px;
  }
`;

const MainHeading = styled(H1)`
  margin-top: ${8 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${5 * baselineSpacing}px;
  }
`;

const Block = styled.span`
  display: block;
`;

const Intro = styled(P)`
  margin-top: ${3 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${3 * baselineLarge}px;
  }
`;

const Grid = styled.div`
  margin-top: ${7 * baselineSmall}px;
  margin-bottom: ${11 * baselineSmall}px;
  margin-left: ${gridSideMargin}px;
  margin-right: ${gridSideMargin}px;
  display: grid;
  grid-row-gap: ${gapSmall}px;
  grid-column-gap: ${gapSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${9 * baselineLarge}px;
    margin-bottom: ${13 * baselineLarge}px;
    grid-row-gap: ${gapLarge}px;
    grid-column-gap: ${gapLarge}px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }
`;

const Description = styled(P)`
  margin: ${baselineSpacing}px 0;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.09px;

    // Offset baseline
    top: -2px;
  }
`;

const BoxLinks = styled(Ul)``;

const ArrowIcon = props => {
  // stroke="#0080FF"
  return (
    <svg width="17" height="10" viewBox="0 0 17 10" {...props}>
      <g
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.28 4.75H1.214M11.68 1l3.6 3.75-3.6 3.75" />
      </g>
    </svg>
  );
};

const Arrow = styled(ArrowIcon)`
  stroke: currentColor;
  margin-right: 8px;
`;

const BoxLink = props => {
  const { children, ...rest } = props;
  return (
    <Li>
      <Link {...rest}>
        <Arrow />
        {children}
      </Link>
    </Li>
  );
};

const LandingPage = props => {
  const { articleCounts } = props;
  return (
    <SingleColumnLayout>
      <IntroWrapper>
        <MainHeading>
          <Block>Sharetribe Flex</Block>
          <Block>Developer documentation</Block>
        </MainHeading>
        <Intro>
          Sharetribe Flex is the fastest and most affordable way to set up a
          powerful marketplace platform that is uniquely yours. To see what
          features we are building or planning to build, see the Updates page
          and the Flex Roadmap.
        </Intro>
      </IntroWrapper>
      <Grid>
        <SecondaryBox>
          <H4 as="h2">
            <Link neutral to="/tutorials">
              Tutorials
            </Link>
          </H4>
          <Description>
            Get started in learning about the product with hands-on tutorials
            for developers.
          </Description>
          <BoxLinks>
            <BoxLink to="/tutorials/getting-started">Getting Started</BoxLink>
            <BoxLink to="/tutorials">
              All tutorials ({articleCounts.tutorials})
            </BoxLink>
          </BoxLinks>
        </SecondaryBox>
        <SecondaryBox>
          <H4 as="h2">
            <Link neutral to="/guides">
              How-to Guides
            </Link>
          </H4>
          <Description>Specific step-by-step guides for solving </Description>
          <BoxLinks>
            <BoxLink to="/guides/how-to">How to...</BoxLink>
            <BoxLink to="/guides">All guides ({articleCounts.guides})</BoxLink>
          </BoxLinks>
        </SecondaryBox>
        <SecondaryBox>
          <H4 as="h2">
            <Link neutral to="/references">
              Reference
            </Link>
          </H4>
          <Description>Technical reference to the tooling.</Description>
          <BoxLinks>
            <BoxLink to="/references/api">API Reference</BoxLink>
            <BoxLink to="/references">
              All reference ({articleCounts.references})
            </BoxLink>
          </BoxLinks>
        </SecondaryBox>
        <SecondaryBox>
          <H4 as="h2">
            <Link neutral to="/background">
              Background
            </Link>
          </H4>
          <Description>
            Explanations and background information for important concepts and
            design decisions behind the product.
          </Description>
          <BoxLinks>
            <BoxLink to="/background/concepts">Important concepts</BoxLink>
            <BoxLink to="/background/architecture">
              Sharetribe Flex architecture
            </BoxLink>
            <BoxLink to="/styleguide">Styleguide</BoxLink>
            <BoxLink to="/notfoundpage">Not Found Page</BoxLink>
            <BoxLink to="/background">
              All background articles ({articleCounts.background})
            </BoxLink>
          </BoxLinks>
        </SecondaryBox>
      </Grid>
    </SingleColumnLayout>
  );
};

export default LandingPage;
