import styled, { css } from 'styled-components';

import { baselineBreakpoint } from '../config';

const h4Styles = css`
  // Reset default styles
  margin: 0;

  // Font

  // Enable baseline offset
  position: relative;

  // Color
  color: ${props => props.theme.headingColor};

  font-size: 24px;
  line-height: 30px;
  letter-spacing: -0.3px;

  // Offset baseline
  top: 0px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 30px;
    line-height: 40px;
    letter-spacing: -0.5px;

    // Offset baseline
    top: 1px;
  }
`;

const H4 = styled.h4`
  ${h4Styles}
`;
H4.styles = h4Styles;

export default H4;
