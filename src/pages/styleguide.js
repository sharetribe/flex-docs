import React from 'react';
import styled from 'styled-components';

import {
  baselineSpacing,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Ul,
  Li,
} from '../brand-components';
import { SingleColumnLayout } from '../layouts';
import { Link } from '../components';

const Example = styled.section`
  margin: ${baselineSpacing}px 0;
`;

const StyleguidePage = () => {
  return (
    <SingleColumnLayout title="Styleguide">
      <Example>
        <H1>H1</H1>
      </Example>
      <Example>
        <H2>H2</H2>
      </Example>
      <Example>
        <H3>H3</H3>
      </Example>
      <Example>
        <H4>H4</H4>
      </Example>
      <Example>
        <H5>H5</H5>
      </Example>
      <Example>
        <H6>H6</H6>
      </Example>
      <Example>
        <P>This is a paragraph</P>
      </Example>
      <Example>
        <P as="div">
          This is another paragraph, but rendered as a div element.
        </P>
      </Example>
      <Example>
        <H2>
          This is a H2 with <Link to="/styleguide">a link</Link>
        </H2>
      </Example>
      <Example>
        <P>
          This is a paragraph with <Link to="/styleguide">a link</Link>
        </P>
      </Example>
      <Example>
        <Ul withBullets>
          <Li>List item 1</Li>
          <Li>List item 2</Li>
          <Li>List item 3</Li>
        </Ul>
      </Example>
    </SingleColumnLayout>
  );
};

export default StyleguidePage;
