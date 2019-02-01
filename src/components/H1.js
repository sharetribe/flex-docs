import styled, { css } from 'styled-components';

import fonts from '../fonts';
import { baselineBreakpoint } from '../config';

const h1Styles = css`
  // Reset default styles
  margin: 0;

  // Font
  ${fonts['CircularStd-Bold'].styles}

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

const H1 = styled.h1`
  ${h1Styles}
`;
H1.styles = h1Styles;

export default H1;
