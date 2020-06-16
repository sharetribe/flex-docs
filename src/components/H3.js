import styled, { css } from 'styled-components';

import { baselineBreakpoint } from '../config';

const h3Styles = css`
  // Reset default styles
  margin: 0;

  // Font

  font-size: 24px;
  line-height: 30px;
  letter-spacing: -0.3px;

  // Color
  color: ${props => props.theme.headingColor};

  // Enable baseline offset
  position: relative;

  // Offset baseline
  top: 0px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 36px;
    line-height: 40px;
    letter-spacing: -0.7px;

    // Offset baseline
    top: -1px;
  }
`;

const H3 = styled.h3`
  ${h3Styles}
`;
H3.styles = h3Styles;

export default H3;
