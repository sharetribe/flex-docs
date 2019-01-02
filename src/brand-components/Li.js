import styled, { css } from 'styled-components';

import { baselineBreakpoint } from './config';

const styles = css`
  // Font
  font-family: CircularStd-Book;
  font-weight: 400;
  font-style: normal;
  line-height: 24px;
  font-size: 16px;
  letter-spacing: -0.09px;

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
    letter-spacing: -0.1px;

    // Offset baseline
    top: 2px;
  }
`;

const Li = styled.li`
  ${styles}
`;
Li.styles = styles;

export default Li;
