import React from 'react';
import styled from 'styled-components';

import { baselineBreakpoint } from '../../config';

const StyledBurger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 60px;
  height: 60px;
  padding: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 18px;
    height: 2px;
    background: ${({ isOpen }) => (isOpen ? '#0D0C1D' : '#666')};
    border-radius: 1px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
      transform: ${({ isOpen }) =>
        isOpen ? 'translateX(10px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }

  @media (min-width: ${baselineBreakpoint}px) {
    width: 79px;
    height: 72px;
    padding: 27px 27px 27px 36px;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const Burger = props => {
  const { isOpen, setIsOpen } = props;
  return (
    <StyledBurger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Burger;
