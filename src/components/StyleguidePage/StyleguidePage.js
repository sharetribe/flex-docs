import React from 'react';
import styled from 'styled-components';

import { baselineSpacing, baselineBreakpoint } from '../../config';
import { MainLayout, Ul, H6 } from '../../components';

import Colors from './Colors';
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

const SectionHeading = styled(H6)`
  margin: ${baselineSpacing}px 0;
`;

const StyleguidePage = () => (
  <MainLayout title="Styleguide" noIndex={true}>
    <Sections>
      <Section>
        <SectionHeading>Headings</SectionHeading>
        <Headings />
      </Section>
      <Section>
        <SectionHeading>Paragraphs</SectionHeading>
        <Paragraphs />
      </Section>
      <Section>
        <SectionHeading>Colors</SectionHeading>
        <Colors />
      </Section>
      <Section>
        <SectionHeading>Links</SectionHeading>
        <Links />
      </Section>
      <Section>
        <SectionHeading>Lists</SectionHeading>
        <Lists />
      </Section>
      <Section>
        <SectionHeading>Other</SectionHeading>
        <Other />
      </Section>
    </Sections>
  </MainLayout>
);

export default StyleguidePage;
