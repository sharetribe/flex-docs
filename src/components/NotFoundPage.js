import React from 'react';
import styled from 'styled-components';

import { baselineSpacing, baselineBreakpoint, H1 } from '../brand-components';
import { MainLayout, UiText } from '../components';

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
  <MainLayout title={UiText.fn('NotFoundPage.title')}>
    <Content>
      <H1>
        <UiText id="NotFoundPage.heading" />
      </H1>
    </Content>
  </MainLayout>
);

export default NotFoundPage;
