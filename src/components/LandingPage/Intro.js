import styled from 'styled-components';

import {
  baselineSpacing,
  baselineSmall,
  baselineLarge,
  baselineBreakpoint,
  H1,
  P,
} from '../../brand-components';
import { gridSideMargin } from './gridConfig';

export const IntroHeading = styled(H1)`
  margin-top: ${8 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${5 * baselineSpacing}px;
  }
`;

export const IntroDescription = styled(P)`
  margin-top: ${3 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${3 * baselineLarge}px;
  }
`;

export const Intro = styled.div`
  margin-left: ${props => props.theme.contentPaddingSmall}px;
  margin-right: ${props => props.theme.contentPaddingSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-left: ${props => props.theme.contentPaddingLarge + gridSideMargin}px;

    // Leave less right margin to fit heading nicely viewport 768px wide.
    margin-right: ${gridSideMargin}px;
  }
`;

export default Intro;
