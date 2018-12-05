import styled, { css } from 'styled-components';

import { baselineBreakpoint } from './config';

const styles = css`
  // Font
  font-family: CircularStd-Book;
  letter-spacing: -0.1px;
  line-height: 24px;
  font-size: 16px;

  // Color
  color: ${props =>
    props.secondary ? props.theme.textColorSecondary : props.theme.textColor};

  // Enable baseline offset
  position: relative;

  // Offset baseline
  top: 0px;

  @media (min-width: ${baselineBreakpoint}px) {
    // Font
    font-size: 18px;
    line-height: 32px;

    // Offset baseline
    top: 2px;
  }
`;

const Li = styled.li`
  ${styles}
`;
Li.styles = styles;

export default Li;
