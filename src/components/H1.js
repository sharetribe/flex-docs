import styled, { css } from 'styled-components';

import fonts from '../fonts';
import { baselineBreakpoint } from '../config';

const h1Styles = css`
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
    font-size: 60px;
    line-height: 64px;
    letter-spacing: -1.5px;

    // Offset baseline
    top: 2px;
  }
`;

const H1 = styled.h1`
  ${h1Styles}
`;
H1.styles = h1Styles;

export default H1;
