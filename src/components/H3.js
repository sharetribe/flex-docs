import styled, { css } from 'styled-components';

import fonts from '../fonts';
import { baselineBreakpoint } from '../config';

const h3Styles = css`
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
    font-size: 36px;
    line-height: 48px;
    letter-spacing: -0.8px;

    // Offset baseline
    top: 3px;
  }
`;

const H3 = styled.h3`
  ${h3Styles}
`;
H3.styles = h3Styles;

export default H3;
