import React from 'react';
import styled from 'styled-components';

import { baselineBreakpoint } from '../../brand-components';
import { Link } from '../../components';
import Logo from './Logo';
import Menu from './Menu';

const logoHeight = 26;
const logoWidth = 140;
const logoWidthSmall = 23;
const logoSidePaddingSmall = 23;
const logoSidePaddingLarge = 36;

const Wrapper = styled.section`
  display: flex;
  background-color: ${props => props.theme.backgroundColorRaised};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
`;

const HomeLink = styled(Link)`
  flex-shrink: 0;
  width: ${logoWidthSmall + 2 * logoSidePaddingSmall}px;
  overflow: hidden;

  @media (min-width: ${baselineBreakpoint}px) {
    width: ${logoWidth + 2 * logoSidePaddingLarge}px;
  }
`;

const TopbarLogo = styled(Logo)`
  margin-top: 17px;
  margin-bottom: 17px;
  margin-left: ${logoSidePaddingSmall}px;
  width: ${logoWidth}px;
  height: ${logoHeight}px;

  // Hide the "developers" text on mobile
  path:nth-child(2) {
    display: none;
  }

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: 23px;
    margin-bottom: 23px;
    margin-left: ${logoSidePaddingLarge}px;
    path:nth-child(2) {
      display: inline;
    }
  }
`;

const TopbarMenu = styled(Menu)`
  margin-left: auto;
`;

const Topbar = props => {
  const { activePath, ...rest } = props;
  return (
    <Wrapper {...rest}>
      <HomeLink to="/">
        <TopbarLogo />
      </HomeLink>
      <TopbarMenu activePath={activePath} />
    </Wrapper>
  );
};

export default Topbar;
