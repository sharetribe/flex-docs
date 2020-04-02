import React, { useState } from 'react';
import styled from 'styled-components';

import { baselineBreakpoint } from '../../config';
import { Link, UiText } from '../../components';
import Logo from './Logo';
import Search from './Search';
import OffScreenToggle from './OffScreenToggle';

const Wrapper = styled.header`
  display: flex;
  background-color: ${props => props.theme.backgroundColorRaised};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: ${props => (props.isSearchOpen ? '48px' : '0')};

  @media (min-width: ${baselineBreakpoint}px) {
    margin-bottom: 0;
  }
`;

const HomeLink = styled(Link)`
  // Align the logo in the center with only the logo being clickable
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-left: 24px;
  }

  @media (min-width: 1024px) {
    margin-left: 36px;
    margin-right: 0;
  }
`;

const TopbarLogo = styled(Logo)`
  width: 120px;
  height: 26px;
  margin-top: 17px;
  margin-bottom: 17px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: 23px;
    margin-bottom: 23px;
  }

  :hover {
    opacity: 0.8;
  }
`;

const TopbarSearch = styled(Search)`
  @media (min-width: ${baselineBreakpoint}px) {
    margin-right: 36px;
  }
`;

const Topbar = props => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { activeCategory, manageSidebar, ...rest } = props;
  const { isOpen, setIsOpen } = manageSidebar;
  return (
    <Wrapper isSearchOpen={isSearchOpen} {...rest}>
      <OffScreenToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      <HomeLink to="/" aria-label={UiText.fn('Topbar.homeAriaLabel')}>
        <TopbarLogo alt={UiText.fn('Topbar.logoAlt')} />
      </HomeLink>
      <TopbarSearch isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
    </Wrapper>
  );
};

export default Topbar;
