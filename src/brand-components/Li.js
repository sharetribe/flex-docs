import styled from 'styled-components';

import { baselineBreakpoint } from './config';

const Li = styled.li`
  line-height: 24px;
  font-size: 16px;

  /* Baseline alignment */
  position: relative;
  @media (min-width: ${baselineBreakpoint}px) {
    bottom: 2px;
  }
`;

export default Li;
