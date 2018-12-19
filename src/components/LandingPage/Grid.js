import React from 'react';
import styled from 'styled-components';

import {
  baselineSmall,
  baselineLarge,
  baselineSpacing,
  baselineBreakpoint,
  P,
  Ul,
  Li,
  H4,
} from '../../brand-components';
import { categories } from '../../config';
import { Link, SecondaryBox } from '../../components';
import { gapSmall, gapLarge } from './gridConfig';

export const GridHeadingLink = props => {
  const { category } = props;
  return (
    <H4 as="h2">
      <Link neutral to={`/${category}`}>
        {categories[category].label}
      </Link>
    </H4>
  );
};

export const GridDescription = styled(P)`
  margin: ${baselineSpacing}px 0;

  @media (min-width: ${baselineBreakpoint}px) {
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

export const GridLink = props => {
  const { children, ...rest } = props;
  return (
    <Li>
      <Link {...rest}>
        <Arrow />
        {children}
      </Link>
    </Li>
  );
};

export const GridLinks = styled(Ul)``;

export const GridBox = SecondaryBox;

const Grid = styled.div`
  margin-top: ${7 * baselineSmall}px;
  margin-left: ${gapSmall}px;
  margin-right: ${gapSmall}px;
  display: grid;
  grid-row-gap: ${gapSmall}px;
  grid-column-gap: ${gapSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${9 * baselineLarge}px;
    grid-row-gap: ${gapLarge}px;
    grid-column-gap: ${gapLarge}px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }
`;

export default Grid;
