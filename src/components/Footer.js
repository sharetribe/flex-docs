import React from 'react';
import styled from 'styled-components';

import { baselineSmall, baselineLarge, baselineBreakpoint } from '../config';
import fonts from '../fonts';
import { A } from '../components';

const Wrapper = styled.footer`
  background-color: ${props => props.theme.footerBackgroundColor};
  margin-top: ${9 * baselineLarge}px;
`;

const Content = styled.div`
  padding-top: ${4 * baselineSmall}px;
  padding-bottom: ${4 * baselineSmall}px;
  padding-left: ${props => props.theme.contentPaddingSmall}px;
  padding-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    padding-top: ${6 * baselineLarge}px;
    padding-bottom: ${6 * baselineLarge}px;
    padding-left: ${props => props.theme.contentPaddingLarge}px;
    padding-right: ${props => props.theme.contentPaddingLarge}px;
  }
`;

// NOTE: custom font size
const Copyright = styled.p`
  // Reset default styles
  margin: 0;

  // Font
  ${fonts['CircularStd-Book'].styles}

  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.08px;

  // Color
  color: ${props => props.theme.footerColor};

  // Enable baseline offset
  position: relative;

  // Offset baseline
  top: 1px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0px;

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
