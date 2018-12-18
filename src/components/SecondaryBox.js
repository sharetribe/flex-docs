import styled from 'styled-components';

import {
  baselineSmall,
  baselineLarge,
  baselineBreakpoint,
} from '../brand-components';

const SecondaryBox = styled.section`
  padding-top: ${3 * baselineSmall}px;
  padding-bottom: ${5 * baselineSmall}px;
  padding-left: ${props => props.theme.contentPaddingSmall}px;
  padding-right: ${props => props.theme.contentPaddingSmall}px;

  background-color ${props => props.theme.backgroundColorRaised};
  border-radius: 6px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.05);

  @media (min-width: ${baselineBreakpoint}px) {
    padding-top: ${4 * baselineLarge}px;
    padding-bottom: ${5 * baselineLarge}px;
    padding-left: ${props => props.theme.contentPaddingLarge}px;
    padding-right: ${props => props.theme.contentPaddingLarge}px;
  }
`;

export default SecondaryBox;
