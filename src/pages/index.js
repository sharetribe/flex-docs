import React from 'react';
import styled from 'styled-components';

import {
  baselineSpacing,
  baselineBreakpoint,
  H1,
  H2,
  P,
  Ul,
  Li,
} from '../brand-components';
import { SingleColumnLayout } from '../layouts';
import { Link } from '../components';

const Grid = styled.div`
  margin-top: ${2 * baselineSpacing}px;
  display: grid;
  grid-row-gap: ${2 * baselineSpacing}px;
  grid-column-gap: ${2 * baselineSpacing}px;

  @media (min-width: ${baselineBreakpoint}px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }
`;

const Intro = styled(P)`
  margin-top: ${baselineSpacing}px;
`;

const Paragraph = styled(P)`
  margin: ${baselineSpacing}px 0;
`;

const IndexPage = () => {
  return (
    <SingleColumnLayout>
      <H1>Sharetribe Flex developer documentation</H1>
      <Intro>Welcome to the docs. This is the intro.</Intro>
      <Grid>
        <section>
          <H2>
            <Link neutral to="/tutorials">
              Tutorials
            </Link>
          </H2>
          <Paragraph>
            Get started in learning about the product with hands-on tutorials
            for developers.
          </Paragraph>
          <Ul withBullets>
            <Li>
              <Link to="/tutorials/getting-started">Getting Started</Link>
            </Li>
            <Li>
              <Link to="/tutorials">All tutorials</Link>
            </Li>
          </Ul>
        </section>
        <section>
          <H2>
            <Link neutral to="/guides">
              How-to Guides
            </Link>
          </H2>
          <Paragraph>Specific step-by-step guides for solving </Paragraph>
          <Ul withBullets>
            <Li>
              <Link to="/guides/how-to">How to...</Link>
            </Li>
            <Li>
              <Link to="/guides">All guides</Link>
            </Li>
          </Ul>
        </section>
        <section>
          <H2>
            <Link neutral to="/references">
              Reference
            </Link>
          </H2>
          <Paragraph>Technical reference to the tooling.</Paragraph>
          <Ul withBullets>
            <Li>
              <Link to="/references/api">API Reference</Link>
            </Li>
            <Li>
              <Link to="/references">All reference</Link>
            </Li>
          </Ul>
        </section>
        <section>
          <H2>
            <Link neutral to="/background">
              Background
            </Link>
          </H2>
          <Paragraph>
            Explanations and background information for important concepts and
            design decisions behind the product.
          </Paragraph>
          <Ul withBullets>
            <Li>
              <Link to="/background/concepts">Important concepts</Link>
            </Li>
            <Li>
              <Link to="/background/architecture">
                Sharetribe Flex architecture
              </Link>
            </Li>
            <Li>
              <Link to="/styleguide">Styleguide</Link>
            </Li>
            <Li>
              <Link to="/background">All background articles</Link>
            </Li>
          </Ul>
        </section>
      </Grid>
    </SingleColumnLayout>
  );
};

export default IndexPage;
