import React from 'react';
import styled from 'styled-components';

import { baselineSpacing, baselineBreakpoint, H1 } from '../brand-components';
import { MainLayout } from '../components';

const Content = styled.div`
  padding-top: ${baselineSpacing}px;
  padding-bottom: ${3 * baselineSpacing}px;
  padding-left: ${props => props.theme.contentPaddingSmall}px;
  padding-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    padding-left: ${props => props.theme.contentPaddingLarge}px;
    padding-right: ${props => props.theme.contentPaddingLarge}px;
  }
`;

const NotFoundPage = () => (
  <MainLayout title="Not found">
    <Content>
      <H1>Oops, page not found :/</H1>
    </Content>
  </MainLayout>
);

export default NotFoundPage;
