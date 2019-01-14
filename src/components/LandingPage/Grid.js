import React from 'react';
import styled from 'styled-components';

import {
  fonts,
  baselineSmall,
  baselineLarge,
  baselineBreakpoint,
  P,
  Ul,
  H5,
} from '../../brand-components';
import { grid } from '../../config';
import { Link, SecondaryBox } from '../../components';

export const GridHeadingLink = props => {
  const { category, children } = props;
  return (
    <H5 as="h2">
      <Link neutral to={`/${category}/`}>
        {children}
      </Link>
    </H5>
  );
};

export const GridDescription = styled(P)`
  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${2 * baselineLarge}px;

    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.09px;

    // Offset baseline
    top: -2px;
  }
`;

const ArrowIcon = props => {
  return (
    <svg width="17" height="10" viewBox="0 0 17 10" {...props}>
      <g
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.28 4.75H1.214M11.68 1l3.6 3.75-3.6 3.75" />
      </g>
    </svg>
  );
};

const Arrow = styled(ArrowIcon)`
  stroke: currentColor;
  margin-right: 8px;
`;

const GridLi = styled.li`
  // Font
  ${fonts['CircularStd-Book'].styles}
  line-height: 30px;
  font-size: 16px;
  letter-spacing: -0.09px;

  // Enable baseline offset
  position: relative;

  // Offset baseline
  top: 3px;

  @media (min-width: ${baselineBreakpoint}px) {
    // Font
    font-size: 16px;
    line-height: 32px;
    letter-spacing: -0.09px;

    // Offset baseline
    top: 2px;
  }
`;

export const GridLink = props => {
  const { children, ...rest } = props;
  return (
    <GridLi>
      <Link {...rest}>
        <Arrow />
        {children}
      </Link>
    </GridLi>
  );
};

export const GridLinks = styled(Ul)`
  margin-top: ${2 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${4 * baselineLarge}px;
  }
`;

export const GridBox = SecondaryBox;

const Grid = styled.div`
  margin-top: ${7 * baselineSmall}px;
  margin-left: ${grid.smallGap}px;
  margin-right: ${grid.smallGap}px;
  display: grid;
  grid-row-gap: ${grid.smallGap}px;
  grid-column-gap: ${grid.smallGap}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${9 * baselineLarge}px;
    grid-row-gap: ${grid.largeGap}px;
    grid-column-gap: ${grid.largeGap}px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }
`;

export default Grid;
