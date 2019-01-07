import styled, { css } from 'styled-components';

import { baselineBreakpoint } from './config';

const styles = css`
  // Reset default styles
  margin: 0;

  // Font
  font-family: CircularStd-Bold, system-ui, sans-serif;
  font-weight: 600;
  font-style: normal;
  line-height: 24px;
  font-size: 18px;
  letter-spacing: -0.2px;

  // Color
  color: ${props => props.theme.textColor};

  // Enable baseline offset
  position: relative;

  // Offset baseline
  top: 0px;

  @media (min-width: ${baselineBreakpoint}px) {
    // Font
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -0.2px;

    // Offset baseline
    top: -1px;
  }
`;

const Ingress = styled.p`
  ${styles}
`;

// Expose styles
Ingress.styles = styles;

export default Ingress;
