import styled, { css } from 'styled-components';

import { baselineSmall, baselineLarge, baselineBreakpoint } from '../config';

const styles = css`
  position: relative;
  border: none;
  margin: 0;
  height: ${2 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    height: ${2 * baselineLarge}px;
  }

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    position: absolute;
    top: ${baselineSmall}px;
    background-color: ${props => props.theme.lineColor};

    @media (min-width: ${baselineBreakpoint}px) {
      top: ${baselineLarge}px;
    }
  }
`;

const Hr = styled.hr`
  ${styles}
`;
Hr.styles = styles;

export default Hr;
