import React, { Component } from 'react';
import styled from 'styled-components';

const MenuButton = styled.button`
  height: 100%;
  width: 60px;
`;

class MobileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }
  render() {
    // TODO: show menu in modal when clocked open
    return (
      <MenuButton
        onClick={e => console.log('MobileMenu click')}
        {...this.props}
      >
        Menu
      </MenuButton>
    );
  }
}

export default MobileMenu;
