import React from 'react';
import styled from 'styled-components';

import { baselineSpacing, H1, H2, P, Ul, Li } from '../brand-components';
import { SingleColumnLayout } from '../layouts';
import { Link } from '../components';

const Paragraph = styled(P)`
  margin: ${baselineSpacing}px 0;
`;

const LinksUl = styled(Ul).attrs({
  withBullets: true,
})`
  margin: ${baselineSpacing}px 0;
`;

const IndexPage = () => {
  return (
    <SingleColumnLayout>
      <H1>Sharetribe Flex developer documentation</H1>
      <Paragraph>Welcome to the docs. This is the intro.</Paragraph>
      <section>
        <H2>
          <Link to="/tutorials">Tutorials</Link>
        </H2>
        <Paragraph>
          Get started in learning about the product with hands-on tutorials for
          developers.
        </Paragraph>
        <LinksUl>
          <Li>Getting Started</Li>
          <Li>
            <Link to="/tutorials">All tutorials</Link>
          </Li>
        </LinksUl>
      </section>
      <section>
        <H2>
          <Link to="/guides">How-to Guides</Link>
        </H2>
        <Paragraph>Specific step-by-step guides for solving </Paragraph>
        <LinksUl>
          <Li>How to...</Li>
          <Li>
            <Link to="/guides">All guides</Link>
          </Li>
        </LinksUl>
      </section>
      <section>
        <H2>
          <Link to="/references">Reference</Link>
        </H2>
        <Paragraph>Technical reference to the tooling.</Paragraph>
        <LinksUl>
          <Li>API Reference</Li>
          <Li>
            <Link to="/references">All reference</Link>
          </Li>
        </LinksUl>
      </section>
      <section>
        <H2>
          <Link to="/background">Background</Link>
        </H2>
        <Paragraph>
          Explanations and background information for important concepts and
          design decisions behind the product.
        </Paragraph>
        <LinksUl>
          <Li>Important concepts</Li>
          <Li>Sharetribe Flex architecture</Li>
          <Li>
            <Link to="/background">All background articles</Link>
          </Li>
          <Li>
            <Link to="/styleguide">Styleguide</Link>
          </Li>
        </LinksUl>
      </section>
    </SingleColumnLayout>
  );
};

export default IndexPage;
