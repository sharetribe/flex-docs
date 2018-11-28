import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { Ul, Li } from '../brand-components';

const NavLink = props => {
  return (
    <Link
      getProps={({ isPartiallyCurrent }) => {
        return isPartiallyCurrent
          ? {
              style: {
                fontWeight: 'bold',
              },
            }
          : null;
      }}
      {...props}
    />
  );
};

const NavUl = styled(Ul)`
  padding: 2rem 0;
  display: flex;
  justify-content: space-around;
`;

const Topbar = () => {
  return (
    <nav>
      <NavUl>
        <Li>
          <Link to="/">Home</Link>
        </Li>
        <Li>
          <NavLink to="/tutorials">Tutorials</NavLink>
        </Li>
        <Li>
          <NavLink to="/guides">How-to Guides</NavLink>
        </Li>
        <Li>
          <NavLink to="/references">Reference</NavLink>
        </Li>
        <Li>
          <NavLink to="/background">Background</NavLink>
        </Li>
      </NavUl>
    </nav>
  );
};

export default Topbar;
