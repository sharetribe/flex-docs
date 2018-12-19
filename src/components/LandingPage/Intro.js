import styled from 'styled-components';

import {
  baselineSpacing,
  baselineSmall,
  baselineLarge,
  baselineBreakpoint,
  H1,
  P,
} from '../../brand-components';
import { grid } from '../../config';

export const IntroHeading = styled(H1)`
  margin-top: ${8 * baselineSmall}px;
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${5 * baselineSpacing}px;
    margin-left: ${props =>
      props.theme.contentPaddingLarge + grid.sideMargin}px;

    // Leave less right margin to fit heading nicely viewport 768px wide.
    margin-right: ${grid.sideMargin}px;
  }
`;

export const IntroDescription = styled(P)`
  margin-top: ${3 * baselineSmall}px;
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${3 * baselineLarge}px;
    margin-left: ${props =>
      props.theme.contentPaddingLarge + grid.sideMargin}px;
    margin-right: ${props =>
      props.theme.contentPaddingLarge + grid.sideMargin}px;
  }
`;
