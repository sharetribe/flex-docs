import styled from 'styled-components';

import { foregroundColor, baselineBreakpoint } from './config';

const Li = styled.li`
  line-height: 24px;
  font-size: 16px;
  color: ${foregroundColor};

  /* Baseline alignment */
  position: relative;
  @media (min-width: ${baselineBreakpoint}px) {
    bottom: 2px;
  }
`;

export default Li;
