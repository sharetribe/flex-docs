import styled from 'styled-components';

import { foregroundColor, baselineBreakpoint } from './config';

const baseHeadingStyles = `
  margin: 0;
  font-weight: bold;
  color: ${foregroundColor};
`;

export const H1 = styled.h1`
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

export const H2 = styled.h2`
  ${baseHeadingStyles}
  line-height: 24px;
  font-size: 24px;

  /* Baseline alignment */
  position: relative;
  top: 3px;
`;

export const H3 = styled.h3`
  ${baseHeadingStyles}
  line-height: 24px;
  font-size: 24px;

  /* Baseline alignment */
  position: relative;
  top: 3px;
`;

export const H4 = styled.h4`
  ${baseHeadingStyles}
  line-height: 24px;
  font-size: 24px;

  /* Baseline alignment */
  position: relative;
  top: 3px;
`;

export const H5 = styled.h5`
  ${baseHeadingStyles}
  line-height: 24px;
  font-size: 24px;

  /* Baseline alignment */
  position: relative;
  top: 3px;
`;

export const H6 = styled.h6`
  ${baseHeadingStyles}
  line-height: 24px;
  font-size: 24px;

  /* Baseline alignment */
  position: relative;
  top: 3px;
`;
