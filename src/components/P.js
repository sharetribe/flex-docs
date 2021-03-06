import React from 'react';
import styled, { css } from 'styled-components';

import { baselineBreakpoint } from '../config';

const normalStyles = css`
  // Reset default styles
  margin: 0;

  // Font

  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.09px;

  // Color
  color: ${props => props.theme.textColor};

  // Enable baseline offset
  position: relative;

  // Offset baseline
  top: 0px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.1px;

    // Offset baseline
    top: 6px;
  }
`;

const NormalP = styled.p`
  ${normalStyles}
`;

const smallStyles = css`
  // Reset default styles
  margin: 0;

  // Font

  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0px;

  // Color
  color: ${props => props.theme.textColorSmall};

  // Enable baseline offset
  position: relative;

  // Offset baseline
  top: 0px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0px;

    // Offset baseline
    top: -2px;
  }
`;

const SmallP = styled.p`
  ${smallStyles}
`;

const tinyStyles = css`
  // Reset default styles
  margin: 0;

  // Font

  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.07px;

  // Color
  color: ${props => props.theme.textColorTiny};

  // Enable baseline offset
  position: relative;

  // Offset baseline
  top: -1px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0px;

    // Offset baseline
    top: -1px;
  }
`;

const TinyP = styled.p`
  ${tinyStyles}
`;

/**
 * Paragraph with normal text: `<P>Lorem ipsum</P>`
 * Paragraph with small text:  `<P small>Lorem ipsum</P>`
 * Paragraph with tiny text:   `<P tiny>Lorem ipsum</P>`
 */
const P = props => {
  const { small, tiny, ...rest } = props;
  if (small) {
    return <SmallP {...rest} />;
  } else if (tiny) {
    return <TinyP {...rest} />;
  } else {
    return <NormalP {...rest} />;
  }
};

// Expose normal styles
P.styles = normalStyles;

export default P;
