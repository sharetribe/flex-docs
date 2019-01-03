import React from 'react';
import styled from 'styled-components';

import { baselineBreakpoint } from '../../brand-components';
import { categories } from '../../config';
import { UiText } from '../../components';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';

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
  const links = categories.map(category => {
    const { id } = category;
    return {
      path: `/${id}/`,
      text: UiText.fn(`Topbar.Menu.${id}.label`),
      active: activeCategory === id,
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
