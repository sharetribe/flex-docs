import React from 'react';
import styled from 'styled-components';

import { baselineBreakpoint } from '../../brand-components';
import { Link } from '../../components';
import Menu from './Menu';
import Logo from './Logo';
import Search from './Search';

const Wrapper = styled.section`
  display: flex;
  background-color: ${props => props.theme.backgroundColorRaised};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
`;

const TopbarMenu = styled(Menu)`
  @media (min-width: ${baselineBreakpoint}px) {
    // Align the menu in the center
    margin-left: auto;
    margin-right: auto;
  }
`;

const HomeLink = styled(Link)`
  // Align the logo in the center with only the logo being clickable
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${baselineBreakpoint}px) {
    // Pull logo as the first item in desktop layout
    order: -1;

    margin-left: 36px;
    margin-right: 0;
  }
`;

const TopbarLogo = styled(Logo)`
  width: 140px;
  height: 26px;
  margin-top: 17px;
  margin-bottom: 17px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: 23px;
    margin-bottom: 23px;
  }
`;

const TopbarSearch = styled(Search)`
  @media (min-width: ${baselineBreakpoint}px) {
    margin-right: 36px;
  }
`;

const Topbar = props => {
  const { activeCategory, ...rest } = props;
  return (
    <Wrapper {...rest}>
      <TopbarMenu activeCategory={activeCategory} />
      <HomeLink to="/">
        <TopbarLogo />
      </HomeLink>
      <TopbarSearch />
    </Wrapper>
  );
};

export default Topbar;
