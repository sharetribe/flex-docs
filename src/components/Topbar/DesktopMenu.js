import React from 'react';
import styled, { css } from 'styled-components';

import { Ul, Li } from '../../brand-components';
import { baselineLarge, baselineBreakpoint } from '../../config';
import { Link } from '../../components';

const NavUl = styled(Ul)`
  display: flex;
  justify-content: space-around;
`;

const NavLi = styled(Li)`
  flex-shrink: 0;
  position: static;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 15px;
  }
`;

const bottomBorderWidth = 4;

const activeLinkStyles = css`
  color: ${props => props.theme.textColorActive};
  border-bottom-color: ${props => props.theme.borderColorActive};
`;

const NavLink = styled(Link).attrs({
  neutral: true,
})`
  display: block;
  border-bottom-style: solid;
  border-bottom-width: ${bottomBorderWidth}px;
  border-bottom-color: transparent;
  padding-top: ${2.5 * baselineLarge}px;
  padding-bottom: ${2.5 * baselineLarge - bottomBorderWidth}px;
  padding-left: 14px;
  padding-right: 14px;

  ${props => (props.active ? activeLinkStyles : '')}

  :hover {
    ${activeLinkStyles}
  }
`;

export const MenuItem = props => {
  const { path, active, text } = props;
  return (
    <NavLi>
      <NavLink to={path} active={active}>
        {text}
      </NavLink>
    </NavLi>
  );
};

const DesktopMenu = props => {
  const { links, ...rest } = props;
  return (
    <NavUl {...rest}>
      {links.map(link => (
        <MenuItem key={link.path} {...link} />
      ))}
    </NavUl>
  );
};

export default DesktopMenu;
