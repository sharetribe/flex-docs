import React from 'react';
import styled from 'styled-components';

import { baselineBreakpoint } from '../../brand-components';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';

const menuLinks = [
  {
    path: '/tutorials',
    text: 'Tutorials',
  },
  {
    path: '/guides',
    text: 'How-to Guides',
  },
  {
    path: '/references',
    text: 'Reference',
  },
  {
    path: '/background',
    text: 'Background',
  },
];

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
  const { activePath, ...rest } = props;
  const links = menuLinks.map(link => ({
    active: link.path === activePath,
    ...link,
  }));
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
