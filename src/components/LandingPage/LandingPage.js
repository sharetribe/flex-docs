import React from 'react';
import styled from 'styled-components';

import { SingleColumnLayout } from '../../layouts';
import Intro, { IntroHeading, IntroDescription } from './Intro';
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

const LandingPage = props => {
  const { articleCounts } = props;
  return (
    <SingleColumnLayout>
      <Intro>
        <IntroHeading>
          <Block>Sharetribe Flex</Block>
          <Block>Developer documentation</Block>
        </IntroHeading>
        <IntroDescription>
          Sharetribe Flex is the fastest and most affordable way to set up a
          powerful marketplace platform that is uniquely yours. To see what
          features we are building or planning to build, see the Updates page
          and the Flex Roadmap.
        </IntroDescription>
      </Intro>
      <Grid>
        <GridBox>
          <GridHeadingLink to="/tutorials">Tutorials</GridHeadingLink>
          <GridDescription>
            Get started in learning about the product with hands-on tutorials
            for developers.
          </GridDescription>
          <GridLinks>
            <GridLink to="/tutorials/getting-started">Getting Started</GridLink>
            <GridLink to="/tutorials">
              All tutorials ({articleCounts.tutorials})
            </GridLink>
          </GridLinks>
        </GridBox>
        <GridBox>
          <GridHeadingLink to="/guides">How-to Guides</GridHeadingLink>
          <GridDescription>
            Specific step-by-step guides for solving{' '}
          </GridDescription>
          <GridLinks>
            <GridLink to="/guides/how-to">How to...</GridLink>
            <GridLink to="/guides">
              All guides ({articleCounts.guides})
            </GridLink>
          </GridLinks>
        </GridBox>
        <GridBox>
          <GridHeadingLink to="/references">Reference</GridHeadingLink>
          <GridDescription>Technical reference to the tooling.</GridDescription>
          <GridLinks>
            <GridLink to="/references/api">API Reference</GridLink>
            <GridLink to="/references">
              All reference ({articleCounts.references})
            </GridLink>
          </GridLinks>
        </GridBox>
        <GridBox>
          <GridHeadingLink to="/background">Background</GridHeadingLink>
          <GridDescription>
            Explanations and background information for important concepts and
            design decisions behind the product.
          </GridDescription>
          <GridLinks>
            <GridLink to="/background/concepts">Important concepts</GridLink>
            <GridLink to="/background/architecture">
              Sharetribe Flex architecture
            </GridLink>
            <GridLink to="/styleguide">Styleguide</GridLink>
            <GridLink to="/notfoundpage">Not Found Page</GridLink>
            <GridLink to="/background">
              All background articles ({articleCounts.background})
            </GridLink>
          </GridLinks>
        </GridBox>
      </Grid>
    </SingleColumnLayout>
  );
};

export default LandingPage;
