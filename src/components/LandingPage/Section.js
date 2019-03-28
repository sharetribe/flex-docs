import React from 'react';
import styled from 'styled-components';

import { baselineSmall, baselineLarge, baselineBreakpoint } from '../../config';
import { P, Ul, Li, H5, Link, Box } from '../../components';

export const SectionHeadingLink = props => {
  const { to, children } = props;
  return (
    <H5 as="h3">
      <Link neutral to={to}>
        {children}
      </Link>
    </H5>
  );
};

// NOTE: custom font size
export const SectionDescription = styled(P).attrs({
  small: true,
})`
  margin-top: ${baselineSmall}px;

  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.08px;

  // Offset baseline
  top: 1px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${2 * baselineLarge}px;

    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0px;

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

// NOTE: custom line height
const SectionLi = styled(Li).attrs({
  small: true,
})`
  line-height: 30px;

  // Offset baseline
  top: 3px;

  @media (min-width: ${baselineBreakpoint}px) {
    line-height: 32px;

    // Offset baseline
    top: 2px;
  }
`;

export const SectionLink = props => {
  const { children, ...rest } = props;
  return (
    <SectionLi>
      <Link {...rest}>
        <Arrow />
        {children}
      </Link>
    </SectionLi>
  );
};

export const SectionLinks = styled(Ul)`
  margin-top: ${2 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${3 * baselineLarge}px;
  }
`;

export const Section = Box;

export default Section;
