import styled from 'styled-components';

import { baselineSmall, baselineLarge, baselineBreakpoint } from '../config';

const Box = styled.section`
  padding-top: ${3 * baselineSmall}px;
  padding-bottom: ${5 * baselineSmall}px;
  padding-left: ${props => props.theme.contentPaddingSmall}px;
  padding-right: ${props => props.theme.contentPaddingSmall}px;

  background-color ${props => props.theme.backgroundColorRaised};
  border-radius: 6px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.05);
  transition: all 0.05s ease-out;

  @media (min-width: ${baselineBreakpoint}px) {
    padding-top: ${4 * baselineLarge}px;
    padding-bottom: ${5 * baselineLarge}px;
    padding-left: 40px;
    padding-right: 40px;
  }

  :hover {
    box-shadow: 0 16px 32px 0 rgba(0,0,0,0.1);
    transform: scale(1.01);
  }
`;

export default Box;
