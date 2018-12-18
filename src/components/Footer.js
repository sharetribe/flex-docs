import React from 'react';
import styled from 'styled-components';

import { baselineBreakpoint, A } from '../brand-components';

const Wrapper = styled.div`
  padding: 24px;
  background-color: ${props => props.theme.backgroundColorSecondary};
  color: ${props => props.theme.textColorSecondary};

  @media (min-width: ${baselineBreakpoint}px) {
    padding: 56px 24px 88px 24px;
  }
`;

const Content = styled.div`
  max-width: ${props => props.theme.pageMaxWidth}px;
  margin-left: auto;
  margin-right: auto;
`;

const Copyright = styled.p`
  // Reset default styles
  margin: 0;

  // Font
  font-family: CircularStd-Book;
  letter-spacing: -0.08px;
  line-height: 24px;
  font-size: 14px;

  // Enable baseline offset
  position: relative;

  // Offset baseline
  top: 1px;

  @media (min-width: ${baselineBreakpoint}px) {
    top: -1px;
  }
`;

const Footer = props => {
  return (
    <Wrapper {...props}>
      <Content>
        <Copyright>
          ©{' '}
          <A neutral href="https://www.sharetribe.com">
            Sharetribe
          </A>{' '}
          2019.
        </Copyright>
      </Content>
    </Wrapper>
  );
};

export default Footer;
