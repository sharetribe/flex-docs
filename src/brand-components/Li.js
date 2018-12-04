import styled, { css } from 'styled-components';

import { foregroundColor, baselineBreakpoint } from './config';

const styles = css`
  line-height: 24px;
  font-size: 16px;
  color: ${foregroundColor};

  /* Baseline alignment */
  position: relative;
  @media (min-width: ${baselineBreakpoint}px) {
    bottom: 2px;
  }
`;

const Li = styled.li`
  ${styles}
`;
Li.styles = styles;

export default Li;
