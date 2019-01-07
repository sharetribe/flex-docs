import styled, { css } from 'styled-components';

import { baselineBreakpoint } from './config';

const baseHeadingStyles = `
  // Reset default styles
  margin: 0;

  // Font
  font-family: CircularStd-Bold, system-ui, sans-serif;
  font-weight: 600;
  font-style: normal;

  // Enable baseline offset
  position: relative;
`;

const headingColor = props => {
  return props.secondary
    ? props.theme.headingColorSecondary
    : props.theme.headingColor;
};

const h1Styles = css`
  ${baseHeadingStyles}

  // Color
  color: ${headingColor};

  font-size: 26px;
  line-height: 36px;
  letter-spacing: -0.65px;

  // Offset baseline
  top: 3px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 60px;
    line-height: 64px;
    letter-spacing: -1.5px;

    // Offset baseline
    top: 2px;
  }
`;

export const H1 = styled.h1`
  ${h1Styles}
`;
H1.styles = h1Styles;

const h2Styles = css`
  ${baseHeadingStyles}

  // Color
  color: ${headingColor};

  font-size: 26px;
  line-height: 36px;
  letter-spacing: -0.65px;

  // Offset baseline
  top: 3px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 48px;
    line-height: 56px;
    letter-spacing: -1.2px;

    // Offset baseline
    top: 3px;
  }
`;

export const H2 = styled.h2`
  ${h2Styles}
`;
H2.styles = h2Styles;

const h3Styles = css`
  ${baseHeadingStyles}

  // Color
  color: ${headingColor};

  font-size: 26px;
  line-height: 36px;
  letter-spacing: -0.65px;

  // Offset baseline
  top: 3px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 36px;
    line-height: 48px;
    letter-spacing: -0.8px;

    // Offset baseline
    top: 3px;
  }
`;

export const H3 = styled.h3`
  ${h3Styles}
`;
H3.styles = h3Styles;

const h4Styles = css`
  ${baseHeadingStyles}

  // Color
  color: ${headingColor};

  font-size: 26px;
  line-height: 36px;
  letter-spacing: -0.65px;

  // Offset baseline
  top: 3px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 30px;
    line-height: 40px;
    letter-spacing: -0.5px;

    // Offset baseline
    top: 1px;
  }
`;

export const H4 = styled.h4`
  ${h4Styles}
`;
H4.styles = h4Styles;

const h5Styles = css`
  ${baseHeadingStyles}

  // Color
  color: ${headingColor};

  font-size: 26px;
  line-height: 36px;
  letter-spacing: -0.65px;

  // Offset baseline
  top: 3px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -0.2px;

    // Offset baseline
    top: -1px;
  }
`;

export const H5 = styled.h5`
  ${h5Styles}
`;
H5.styles = h5Styles;

const h6Styles = css`
  ${baseHeadingStyles}

  // Color
  color: ${headingColor};

  font-size: 10px;
  line-height: 18px;
  letter-spacing: 1px;
  text-transform: uppercase;

  // Offset baseline
  top: 0px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 12px;
    line-height: 24px;
    letter-spacing: 1px;

    // Offset baseline
    top: 0px;
  }
`;

export const H6 = styled.h6`
  ${h6Styles}
`;
H6.styles = h6Styles;
