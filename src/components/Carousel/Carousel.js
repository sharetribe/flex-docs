import React, { useState } from 'react';
import styled from 'styled-components';

import { baselineBreakpoint } from '../../config';

import Dots from './Dots';
import { ArrowLeft, ArrowRight } from './Arrows';

const CarouselSection = styled.section`
  background-color: white;
  padding: 24px;
  margin: 48px 0;
  position: relative;
`;

const Title = styled.h6`
  && {
    margin-top: 0;
  }

  @media (min-width: ${baselineBreakpoint}px) {
    && {
      margin-top: 0;
    }
  }
`;

const SlideViewport = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Slides = styled.div`
  display: flex;
  flex-direction: row;
  width: ${props => props.slideCount * 100}%;

  transform: translateX(${props => props.translateX || '0%'});
  transition: transform ease-out 300ms;
`;

const ArrowContainer = styled.div`
  position: absolute;
  right: 24px;
  bottom: 22px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 36px;
`;

const Carousel = props => {
  const [state, setState] = useState({
    activeSlide: 0,
  });
  const { title, children, maxWidth, ...restProps } = props;
  const { activeSlide } = state;
  const slideCount = React.Children.count(children);
  const slideWidth = `${100 / slideCount}%`;
  const translateX = `${state.activeSlide * (100 / slideCount) * -1}%`;
  const handleClick = index => () => {
    setState({ activeSlide: index });
  };

  const lastSlide = slideCount - 1;
  const nextSlide = () =>
    setState({
      ...state,
      activeSlide: activeSlide === lastSlide ? 0 : activeSlide + 1,
    });

  const prevSlide = () =>
    setState({
      ...state,
      activeSlide: activeSlide === 0 ? lastSlide : activeSlide - 1,
    });

  const slideNumber = state.activeSlide + 1;
  const slideMaxWidth = maxWidth
    ? { style: { maxWidth, margin: '0 auto' } }
    : {};
  return (
    <CarouselSection {...restProps}>
      <Title>
        {title} {slideNumber}/{slideCount}
      </Title>
      <SlideViewport {...slideMaxWidth}>
        <Slides slideCount={slideCount} translateX={translateX}>
          {React.Children.map(children, child => {
            return React.cloneElement(child, { width: slideWidth });
          })}
        </Slides>
      </SlideViewport>
      <Dots
        slideCount={slideCount}
        activeSlide={state.activeSlide}
        onClick={handleClick}
      />
      <ArrowContainer>
        <ArrowLeft onClick={prevSlide} disabled={activeSlide === 0} />
        <ArrowRight onClick={nextSlide} disabled={activeSlide === lastSlide} />
      </ArrowContainer>
    </CarouselSection>
  );
};

export default Carousel;
