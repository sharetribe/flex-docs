import React, { Component } from 'react';
import styled from 'styled-components';

import { baselineSpacing, Ul, Li } from '../../brand-components';
import { Modal, Link } from '../../components';

const Wrapper = styled.div`
  height: 100%;
`;

const MenuButton = styled.button`
  height: 100%;
  width: 60px;
`;

const NavUl = styled(Ul)`
  height: 100%;
  background-color: ${props => props.theme.backgroundColor};
  padding-top: ${4 * baselineSpacing}px;
`;

const NavLink = styled(Link)`
  display: block;
  padding: ${baselineSpacing}px;
  text-align: center;
`;

const NavLi = props => {
  const { path, text, active } = props;
  return (
    <Li>
      <NavLink neutral to={path}>
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
        <MenuButton onClick={openModal}>Menu</MenuButton>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Mobile navigation menu"
          onClose={closeModal}
        >
          <NavUl>
            {links.map(link => (
              <NavLi key={link.path} {...link} />
            ))}
          </NavUl>
        </Modal>
      </Wrapper>
    );
  }
}

export default MobileMenu;
