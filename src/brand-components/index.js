import React from 'react';
import styled from 'styled-components';

import { default as BaselineDevGridComponent } from './BaselineDevGrid';

export const backgroundColor = '#fcfcfc';

export const baselineSmall = 6;
export const baselineLarge = 8;
export const baselineSpacing = 24;
export const baselineBreakpoint = 768;

export const pageMaxWidth = 1024;

const baseHeadingStyles = `
  margin: 0;
  font-weight: bold;
`;

export const H1 = styled.h1`
  ${baseHeadingStyles}
  line-height: 48px;
  font-size: 36px;
`;

export const H2 = styled.h2`
  ${baseHeadingStyles}
  line-height: 24px;
  font-size: 24px;
`;

export const H3 = styled.h3`
  ${baseHeadingStyles}
  line-height: 24px;
  font-size: 24px;
`;

export const H4 = styled.h4`
  ${baseHeadingStyles}
  line-height: 24px;
  font-size: 24px;
`;

export const H5 = styled.h5`
  ${baseHeadingStyles}
  line-height: 24px;
  font-size: 24px;
`;

export const H6 = styled.h6`
  ${baseHeadingStyles}
  line-height: 24px;
  font-size: 24px;
`;

export const P = styled.p`
  margin: 0;
  line-height: 24px;
  font-size: 16px;
`;

export const Ul = styled.ul`
  list-style: ${props => (props.withBullets ? 'disc' : 'none')};
  margin: 0;
  padding: ${props => (props.withBullets ? '0 0 0 24px' : '0')};
`;

export const Li = styled.li`
  line-height: 24px;
  font-size: 16px;
`;

export const BaselineDevGrid = props => {
  return (
    <BaselineDevGridComponent
      baselineSmall={baselineSmall}
      baselineLarge={baselineLarge}
      baselineBreakpoint={baselineBreakpoint}
      {...props}
    />
  );
};
