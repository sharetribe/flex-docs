import React from 'react';
import styled from 'styled-components';

const Dot = styled.button`
  padding: 4px;
  margin-right: 8px;
  cursor: pointer;
  border-radius: 50%;
  background: ${props =>
    props.active ? props.theme.activeDot : props.theme.dot};

  &:focus {
    outline: none;
  }
`;

const DotContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dots = props => {
  const { activeSlide, slideCount = 1, onClick } = props;
  const slides = [...Array(slideCount).keys()];
  return (
    <DotContainer>
      {slides.map((slide, i) => (
        <Dot key={slide} active={activeSlide === i} onClick={onClick(i)} />
      ))}
    </DotContainer>
  );
};

export default Dots;
