import React from 'react';
import styled from 'styled-components';

import { baselineBreakpoint } from '../../brand-components';
import { categories } from '../../config';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';

const menuCategories = ['tutorials', 'guides', 'references', 'background'];

const MobileMenuWrapper = styled.div`
  height: 100%;
  display: block;

  @media (min-width: ${baselineBreakpoint}px) {
    display: none;
  }
`;

const DesktopMenuWrapper = styled.div`
  display: none;

  @media (min-width: ${baselineBreakpoint}px) {
    display: block;
  }
`;

const Menu = props => {
  const { activeCategory, ...rest } = props;
  const links = menuCategories.map(category => {
    return {
      path: `/${category}`,
      text: categories[category].label,
      active: activeCategory === category,
    };
  });
  return (
    <nav {...rest}>
      <MobileMenuWrapper>
        <MobileMenu links={links} />
      </MobileMenuWrapper>
      <DesktopMenuWrapper>
        <DesktopMenu links={links} />
      </DesktopMenuWrapper>
    </nav>
  );
};

export default Menu;
