import styled, { css } from 'styled-components';

import { foregroundColor, baselineBreakpoint } from './config';

const baseHeadingStyles = `
  margin: 0;
  font-weight: bold;
  color: ${foregroundColor};
`;

const h1Styles = css`
  ${baseHeadingStyles}
  line-height: 48px;
  font-size: 36px;

  /* Baseline alignment */
  position: relative;
  top: 5px;
  @media (min-width: ${baselineBreakpoint}px) {
    top: 3px;
  }
`;

export const H1 = styled.h1`
  ${h1Styles}
`;
H1.styles = h1Styles;

const h2Styles = css`
  ${baseHeadingStyles}
  line-height: 24px;
  font-size: 24px;

  /* Baseline alignment */
  position: relative;
  top: 3px;
`;

export const H2 = styled.h2`
  ${h2Styles}
`;
H2.styles = h2Styles;

const h3Styles = css`
  ${baseHeadingStyles}
  line-height: 24px;
  font-size: 24px;

  /* Baseline alignment */
  position: relative;
  top: 3px;
`;

export const H3 = styled.h3`
  ${h3Styles}
`;
H3.styles = h3Styles;

const h4Styles = css`
  ${baseHeadingStyles}
  line-height: 24px;
  font-size: 24px;

  /* Baseline alignment */
  position: relative;
  top: 3px;
`;

export const H4 = styled.h4`
  ${h4Styles}
`;
H4.styles = h4Styles;

const h5Styles = css`
  ${baseHeadingStyles}
  line-height: 24px;
  font-size: 24px;

  /* Baseline alignment */
  position: relative;
  top: 3px;
`;

export const H5 = styled.h5`
  ${h5Styles}
`;
H5.styles = h5Styles;

const h6Styles = css`
  ${baseHeadingStyles}
  line-height: 24px;
  font-size: 24px;

  /* Baseline alignment */
  position: relative;
  top: 3px;
`;

export const H6 = styled.h6`
  ${h6Styles}
`;
H6.styles = h6Styles;
