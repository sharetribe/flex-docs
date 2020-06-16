import styled, { css } from 'styled-components';

import { baselineBreakpoint } from '../config';

const h6Styles = css`
  // Reset default styles
  margin: 0;

  // Font

  // Enable baseline offset
  position: relative;

  // Color
  color: ${props => props.theme.headingColorSecondary};

  font-size: 12px;
  line-height: 18px;
  letter-spacing: 1px;
  text-transform: uppercase;

  // Offset baseline
  top: -1px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 12px;
    line-height: 24px;
    letter-spacing: 1px;

    // Offset baseline
    top: 0px;
  }
`;

const H6 = styled.h6`
  ${h6Styles}
`;
H6.styles = h6Styles;

export default H6;
