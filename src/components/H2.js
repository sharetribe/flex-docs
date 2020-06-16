import styled, { css } from 'styled-components';

import { baselineBreakpoint } from '../config';

const h2Styles = css`
  // Reset default styles
  margin: 0;

  // Font

  font-size: 30px;
  line-height: 36px;
  letter-spacing: -0.75px;

  // Color
  color: ${props => props.theme.headingColor};

  // Enable baseline offset
  position: relative;

  // Offset baseline
  top: 1px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 48px;
    line-height: 64px;
    letter-spacing: -1.2px;

    // Offset baseline
    top: -1px;
  }
`;

const H2 = styled.h2`
  ${h2Styles}
`;
H2.styles = h2Styles;

export default H2;
