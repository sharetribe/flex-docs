import React from 'react';
import styled from 'styled-components';

import { brandColor, baselineSpacing } from '../brand-components';
import { Link, Menu, MenuItem } from '../components';

const Wrapper = styled.section`
  display: flex;
  background-color: #eee; // TODO: change
`;

const LogoWrapper = styled(Link)`
  flex-shrink: 0;
  width: ${3 * baselineSpacing}px;
  height: ${3 * baselineSpacing}px;
  background-color: ${brandColor};
`;

const Logo = () => {
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
