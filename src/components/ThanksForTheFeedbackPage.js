import React from 'react';
import styled from 'styled-components';

import {
  baselineSpacing,
  baselineBreakpoint,
  H1,
  P,
} from '../brand-components';
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

const Paragraph = styled(P)`
  margin-top: ${baselineSpacing}px;
`;

const ThanksForTheFeedbackPage = () => (
  <MainLayout
    title={UiText.fn('ThanksForTheFeedbackPage.title')}
    noIndex={true}
  >
    <Content>
      <H1>
        <UiText id="ThanksForTheFeedbackPage.heading" />
      </H1>
      <Paragraph>
        <UiText id="ThanksForTheFeedbackPage.text" />
      </Paragraph>
    </Content>
  </MainLayout>
);

export default ThanksForTheFeedbackPage;
