import styled, { css } from 'styled-components';

import { foregroundColor, baselineBreakpoint } from './config';

const styles = css`
  margin: 0;
  line-height: 24px;
  font-size: 16px;
  color: ${foregroundColor};

  /* Baseline alignment */
  position: relative;
  @media (min-width: ${baselineBreakpoint}px) {
    bottom: 2px;
  }
`;

const P = styled.p`
  ${styles}
`;
P.styles = styles;

export default P;
