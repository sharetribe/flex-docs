import React from 'react';
import styled from 'styled-components';

import {
  baselineSmall,
  baselineLarge,
  baselineBreakpoint,
  grid,
} from '../config';
import fonts from '../fonts';
import { A } from '../components';

const Wrapper = styled.div`
  background-color: ${props => props.theme.backgroundColorSecondary};
  color: ${props => props.theme.textColorSecondary};
`;

const Content = styled.div`
  padding-top: ${4 * baselineSmall}px;
  padding-bottom: ${4 * baselineSmall}px;
  padding-left: ${props => props.theme.contentPaddingSmall}px;
  padding-right: ${props => props.theme.contentPaddingSmall}px;

  margin-left: auto;
  margin-right: auto;

  max-width: ${props =>
    props.theme.pageContentMaxWidth + 2 * grid.sideMargin}px;

  @media (min-width: ${baselineBreakpoint}px) {
    padding-top: ${7 * baselineLarge}px;
    padding-bottom: ${11 * baselineLarge}px;
    padding-left: ${props =>
      props.theme.contentPaddingLarge + grid.sideMargin}px;
    padding-right: ${props =>
      props.theme.contentPaddingLarge + grid.sideMargin}px;
  }
`;

const Copyright = styled.p`
  // Reset default styles
  margin: 0;

  // Font
  ${fonts['CircularStd-Book'].styles}
  letter-spacing: -0.08px;
  line-height: 24px;
  font-size: 14px;

  // Enable baseline offset
  position: relative;

  // Offset baseline
  top: 1px;

  @media (min-width: ${baselineBreakpoint}px) {
    letter-spacing: -0.09px;
    font-size: 16px;

    // Offset baseline
    top: -2px;
  }
`;

const Footer = props => {
  const currentYear = new Date().getFullYear();
  return (
    <Wrapper {...props}>
      <Content>
        <Copyright>
          ©{' '}
          <A neutral href="https://www.sharetribe.com">
            Sharetribe
          </A>{' '}
          {currentYear}.
        </Copyright>
      </Content>
    </Wrapper>
  );
};

export default Footer;
