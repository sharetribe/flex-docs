import React from 'react';
import styled from 'styled-components';

import { fonts, P, Ul, H5 } from '../../brand-components';
import { baselineSmall, baselineLarge, baselineBreakpoint } from '../../config';
import { Link, SecondaryBox } from '../../components';

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

export const SectionDescription = styled(P)`
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

const SectionLi = styled.li`
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
    margin-top: ${4 * baselineLarge}px;
  }
`;

export const Section = SecondaryBox;

export default Section;
