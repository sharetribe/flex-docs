import React from 'react';
import styled from 'styled-components';

import { baselineSpacing, Ul, Li } from '../brand-components';
import { Link } from '../components';

const NavUl = styled(Ul)`
  display: flex;
  justify-content: space-around;
`;

const NavLi = styled(Li)`
  padding: ${baselineSpacing}px 0;
  margin-right: ${props => (props.last ? 0 : `${baselineSpacing}`)}px;
  flex-shrink: 0;
`;

const NavLink = props => {
  return (
    <Link
      neutral
      getProps={({ isPartiallyCurrent }) => {
        return isPartiallyCurrent
          ? { style: { textDecoration: 'underline' } }
          : null;
      }}
      {...props}
    />
  );
};

export const MenuItem = props => {
  const { to, last, children, ...rest } = props;
  return (
    <NavLi last={last} {...rest}>
      <NavLink to={to}>{children}</NavLink>
    </NavLi>
  );
};

const Menu = props => {
  const { children, ...rest } = props;
  return (
    <nav {...rest}>
      <NavUl>{children}</NavUl>
    </nav>
  );
};

export default Menu;
