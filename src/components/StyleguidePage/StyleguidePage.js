import React from 'react';
import styled from 'styled-components';

import { baselineSpacing, baselineBreakpoint } from '../../config';
import { MainLayout, Ul } from '../../components';

import Headings from './Headings';
import Paragraphs from './Paragraphs';
import Links from './Links';
import Lists from './Lists';
import Other from './Other';

const Sections = styled(Ul)``;

const Section = styled.li`
  padding: ${baselineSpacing}px ${props => props.theme.contentPaddingSmall}px;

  &:nth-child(even) {
    background-color: #fff;
  }

  @media (min-width: ${baselineBreakpoint}px) {
    padding: ${baselineSpacing}px ${props => props.theme.contentPaddingLarge}px;
  }
`;

const StyleguidePage = () => (
  <MainLayout title="Styleguide" noIndex={true}>
    <Sections>
      <Section>
        <Headings />
      </Section>
      <Section>
        <Paragraphs />
      </Section>
      <Section>
        <Links />
      </Section>
      <Section>
        <Lists />
      </Section>
      <Section>
        <Other />
      </Section>
    </Sections>
  </MainLayout>
);

export default StyleguidePage;
