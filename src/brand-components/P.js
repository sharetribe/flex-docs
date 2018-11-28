import styled from 'styled-components';

import { baselineBreakpoint } from './config';

const P = styled.p`
  margin: 0;
  line-height: 24px;
  font-size: 16px;

  /* Baseline alignment */
  position: relative;
  @media (min-width: ${baselineBreakpoint}px) {
    bottom: 2px;
  }
`;

export default P;
