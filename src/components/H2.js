import styled, { css } from 'styled-components';

import fonts from '../fonts';
import { baselineBreakpoint } from '../config';

const h2Styles = css`
  // Reset default styles
  margin: 0;

  // Font
  ${fonts['CircularStd-Bold'].styles}

  // Enable baseline offset
  position: relative;

  // Color
  color: ${props => props.theme.headingColor};

  font-size: 26px;
  line-height: 36px;
  letter-spacing: -0.65px;

  // Offset baseline
  top: 3px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 48px;
    line-height: 56px;
    letter-spacing: -1.2px;

    // Offset baseline
    top: 3px;
  }
`;

const H2 = styled.h2`
  ${h2Styles}
`;
H2.styles = h2Styles;

export default H2;
