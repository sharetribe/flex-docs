import React from 'react';
import styled from 'styled-components';

import {
  baselineSmall,
  baselineLarge,
  baselineSpacing,
  baselineBreakpoint,
} from '../brand-components';
import { Link, Menu, MenuItem } from '../components';

const Wrapper = styled.section`
  display: flex;
  background-color: ${props => props.theme.backgroundColorRaised};
`;

const LogoWrapper = styled(Link)`
  flex-shrink: 0;
  width: ${12 * baselineSmall}px;
  height: ${12 * baselineSmall}px;
  background-color: orange;

  @media (min-width: ${baselineBreakpoint}px) {
    width: ${10 * baselineLarge}px;
    height: ${10 * baselineLarge}px;
  }
`;

const Logo = () => {
  // TODO: use logo SVG
  return <LogoWrapper to="/" />;
};

const TopbarMenu = styled(Menu)`
  margin-left: auto;
  margin-right: ${baselineSpacing}px;
`;

const Topbar = () => {
  return (
    <Wrapper>
      <Logo />
      <TopbarMenu>
        <MenuItem to="/tutorials">Tutorials</MenuItem>
        <MenuItem to="/guides">How-to Guides</MenuItem>
        <MenuItem to="/references">Reference</MenuItem>
        <MenuItem last to="/background">
          Background
        </MenuItem>
      </TopbarMenu>
    </Wrapper>
  );
};

export default Topbar;
