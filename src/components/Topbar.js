import React from 'react';
import styled from 'styled-components';

import { baselineSpacing, Ul, Li } from '../brand-components';
import { Link } from '../components';

const Nav = styled.nav`
  background-color: #eee; // TODO: change
`;

const NavUl = styled(Ul)`
  padding: ${baselineSpacing}px 0;
  display: flex;
  justify-content: space-around;
`;

const NavLi = styled(Li)`
  flex-shrink: 0;
`;

const NavLink = props => {
  return (
    <Link
      neutral
      getProps={({ isPartiallyCurrent }) => {
        return isPartiallyCurrent
          ? {
              style: {
                textDecoration: 'underline',
              },
            }
          : null;
      }}
      {...props}
    />
  );
};

const Topbar = () => {
  return (
    <Nav>
      <NavUl>
        <NavLi>
          <Link neutral to="/">
            Home
          </Link>
        </NavLi>
        <NavLi>
          <NavLink to="/tutorials">Tutorials</NavLink>
        </NavLi>
        <NavLi>
          <NavLink to="/guides">How-to Guides</NavLink>
        </NavLi>
        <NavLi>
          <NavLink to="/references">Reference</NavLink>
        </NavLi>
        <NavLi>
          <NavLink to="/background">Background</NavLink>
        </NavLi>
      </NavUl>
    </Nav>
  );
};

export default Topbar;
