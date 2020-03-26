// TODO: This is not used atm.

import React, { Component } from 'react';
import styled from 'styled-components';

import { baselineSpacing } from '../../config';
import { Ul, Li, Link, UiText } from '../../components';
import Modal from './Modal';

const Icon = props => {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" {...props}>
      <g fill="#4A4A4A" fillRule="evenodd">
        <rect width="18" height="2" rx="1" />
        <rect y="5" width="18" height="2" rx="1" />
        <rect y="10" width="18" height="2" rx="1" />
      </g>
    </svg>
  );
};

const Wrapper = styled.div`
  height: 100%;
`;

const MenuButton = styled.button`
  height: 100%;
  width: 60px;
`;

const Nav = styled.nav`
  height: 100%;
  background-color: ${props => props.theme.backgroundColor};
  padding-top: ${4 * baselineSpacing}px;
`;

const NavLink = styled(Link)`
  display: block;
  padding: ${baselineSpacing}px;
  text-align: center;

  text-decoration: ${props => (props.active ? 'underline' : 'none')};
`;

const NavLi = props => {
  const { path, text, active } = props;
  return (
    <Li>
      <NavLink neutral to={path} active={active}>
        {text}
      </NavLink>
    </Li>
  );
};

class MobileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }
  render() {
    const { links, ...rest } = this.props;
    const openModal = () => {
      this.setState({ isOpen: true });
    };
    const closeModal = e => {
      e.stopPropagation();
      this.setState({ isOpen: false });
    };

    return (
      <Wrapper {...rest}>
        <MenuButton
          onClick={openModal}
          aria-label={UiText.fn('Topbar.MobileMenu.arialLabel')}
        >
          <Icon alt={UiText.fn('Topbar.MobileMenu.iconAlt')} />
        </MenuButton>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel={UiText.fn('Topbar.MobileMenu.contentLabel')}
          onClose={closeModal}
        >
          <Nav>
            <Ul>
              {links.map(link => (
                <NavLi key={link.path} {...link} />
              ))}
            </Ul>
          </Nav>
        </Modal>
      </Wrapper>
    );
  }
}

export default MobileMenu;
