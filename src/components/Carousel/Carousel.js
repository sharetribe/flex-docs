import React, { Component, createRef } from 'react';
import styled from 'styled-components';

import { baselineBreakpoint } from '../../config';

import Dots from './Dots';
import { ArrowLeft, ArrowRight } from './Arrows';

const MINIMUM_TOUCH_DRAG = 20;

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
  backface-visibility: hidden;
  width: calc(
    ${props => props.slideCount * 100}% + ${props => props.slideCount * 24}px
  );

  transition: ${props =>
    props.useTransition ? 'transform ease-out 300ms' : 'unset'};
`;

const ArrowContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const isMouseMoveEvent = e => {
  return 'clientX' && 'clientY' in e;
};

const getNextSlide = (activeSlide, slideCount, initialX, clientX) => {
  const isMovingRight = initialX > clientX;
  const isMovingLeft = clientX > initialX;
  const isLastSlide = activeSlide === slideCount - 1;
  const isFirstSlide = activeSlide === 0;

  return isMovingRight && !isLastSlide
    ? {
        direction: 'right',
        hasNextSlide: true,
        nextSlideIndex: activeSlide + 1,
      }
    : isMovingLeft && !isFirstSlide
    ? {
        direction: 'left',
        hasNextSlide: true,
        nextSlideIndex: activeSlide - 1,
      }
    : {
        direction: null,
        hasNextSlide: false,
        nextSlideIndex: activeSlide,
      };
};

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
    };

    // We don't want rerendering happen when interactive state updates.
    this.swipeState = {
      onMove: false,
      initialX: 0,
      lastX: 0,
      direction: null,
      initialY: 0,
    };

    this.slideContainerEl = createRef();

    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.resetMoveStatus = this.resetMoveStatus.bind(this);
    this.handleMoveStart = this.handleMoveStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleMoveEnd = this.handleMoveEnd.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMove);
    window.addEventListener('mouseup', this.handleMoveEnd);
    window.addEventListener('mouseleave', this.handleMoveEnd);
    window.addEventListener('touchmove', this.handleMove);
    window.addEventListener('touchend', this.handleMoveEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMove);
    window.removeEventListener('mouseup', this.handleMoveEnd);
    window.removeEventListener('mouseleave', this.handleMoveEnd);
    window.removeEventListener('touchmove', this.handleMove);
    window.removeEventListener('touchend', this.handleMoveEnd);
  }

  nextSlide(nextIndex) {
    const slideCount = React.Children.count(this.props.children);
    const lastSlide = slideCount - 1;
    const shouldShowLastSlide = activeSlide =>
      activeSlide === lastSlide || nextIndex >= lastSlide;

    this.setState(prevState => ({
      activeSlide: shouldShowLastSlide(prevState.activeSlide)
        ? lastSlide
        : nextIndex != null
        ? nextIndex
        : prevState.activeSlide + 1,
    }));
  }

  prevSlide(prevIndex) {
    const shouldShowFirstSlide = activeSlide =>
      activeSlide === 0 || prevIndex <= 0;
    this.setState(prevState => ({
      activeSlide: shouldShowFirstSlide(prevState.activeSlide)
        ? 0
        : prevIndex != null
        ? prevIndex
        : prevState.activeSlide - 1,
    }));
  }

  resetMoveStatus() {
    this.swipeState = {
      onMove: false,
      initialX: 0,
      lastX: 0,
      direction: null,
      initialY: 0,
    };
  }

  handleMoveStart(e) {
    const isMouseMoveE = isMouseMoveEvent(e);
    const isTouchStart = e.type === 'touchstart';

    if (!this.swipeState.onMove && (isMouseMoveE || isTouchStart)) {
      const { clientX, clientY } = isMouseMoveE ? e : e.touches[0];

      this.swipeState = {
        onMove: true,
        initialX: clientX,
        initialY: clientY,
        lastX: clientX,
      };
    }
  }

  handleMove(e) {
    if (this.swipeState.onMove) {
      e.preventDefault();
      e.stopPropagation();

      const isMouseMoveE = isMouseMoveEvent(e);
      const { clientX, clientY } = isMouseMoveE ? e : e.touches[0];
      const { initialX, initialY } = this.swipeState;
      const diffX = initialX - clientX;
      const diffY = initialY - clientY;

      if (!(Math.abs(diffX) > Math.abs(diffY))) {
        // Prevent swiping up and down from moving the carousel.
        return;
      }

      const { activeSlide } = this.state;
      const slideCount = React.Children.count(this.props.children);
      const { direction, hasNextSlide } = getNextSlide(
        activeSlide,
        slideCount,
        initialX,
        clientX
      );

      if (direction) {
        this.swipeState.direction = direction;

        if (hasNextSlide) {
          const itemWidth =
            this.slideContainerEl.current.offsetWidth / slideCount;
          this.slideContainerEl.current.style.transform = `translateX(${-1 *
            itemWidth *
            activeSlide -
            diffX}px)`;
        }
      }
      this.swipeState.lastX = clientX;
    }
  }

  handleMoveEnd(e) {
    const { direction, initialX, lastX, onMove } = this.swipeState;
    const absMovement = Math.abs(initialX - lastX);

    const isTouchEnd = e.type === 'touchend';
    const isMouseEnd = e.type === 'mouseleave' || e.type === 'mouseup';
    if (!(isTouchEnd || isMouseEnd)) {
      return;
    }

    if (absMovement > MINIMUM_TOUCH_DRAG) {
      e.preventDefault();
      e.stopPropagation();
    }

    const slideCount = React.Children.count(this.props.children);

    if (onMove) {
      const itemWidth = this.slideContainerEl.current.offsetWidth / slideCount;
      const activeIndex = this.state.activeSlide;
      // We'll reset the move status,
      // since position tracking is not needed anymore.
      // (absMovement is calculated already.)
      this.resetMoveStatus();

      if (direction === 'right') {
        const canSlide = activeIndex < slideCount - 1;

        if (canSlide) {
          const nextIndex =
            absMovement > itemWidth / 4 ? activeIndex + 1 : activeIndex;
          this.nextSlide(nextIndex);
          // If the props don't change, call for nextSlide doesn't create rerendering.
          // We'll enforce that the correct position is set
          this.slideContainerEl.current.style.transform = `translateX(${nextIndex *
            itemWidth *
            -1}px)`;
        } else {
          this.slideContainerEl.current.style.transform = `translateX(${activeIndex *
            itemWidth *
            -1}px)`;
        }
      }
      if (direction === 'left') {
        const canSlide = activeIndex >= 0;

        if (canSlide) {
          const prevIndex =
            absMovement > itemWidth / 4 ? activeIndex - 1 : activeIndex;
          this.prevSlide(prevIndex);
          // If the props don't change, call for prevSlide doesn't create rerendering.
          // We'll enforce that the correct position is set
          this.slideContainerEl.current.style.transform = `translateX(${prevIndex *
            itemWidth *
            -1}px)`;
        } else {
          this.slideContainerEl.current.style.transform = `translateX(${activeIndex *
            itemWidth *
            -1}px)`;
        }
      }
      // Since we render this component outside of React's normal rendering cycle,
      // it's good to let React catch up by forcing it to rerender the component after swipe is over.
      this.forceUpdate();
    }
  }

  render() {
    const { title, children, maxWidth, ...restProps } = this.props;
    const { activeSlide } = this.state;
    const slideCount = React.Children.count(children);
    const lastSlide = slideCount - 1;
    const slideNumber = activeSlide + 1;

    // We use pixels after the slide container has been rendered once.
    // Note: the reason is that mixing pixels with percentage positioning
    // causes flickering bug in Safari. (This initial percentage-based translate
    // didn't seem to cause noticeable problems.)
    const hasSlideContainerRendered =
      this.slideContainerEl && this.slideContainerEl.current;
    const slideWidth = hasSlideContainerRendered
      ? `${this.slideContainerEl.current.offsetWidth / slideCount}px`
      : `${100 / slideCount}%`;
    const translateX = hasSlideContainerRendered
      ? `${activeSlide *
          (this.slideContainerEl.current.offsetWidth / slideCount) *
          -1}px`
      : `${activeSlide * (100 / slideCount) * -1}%`;

    const slideTranslateXMaybe = this.swipeState.onMove
      ? {}
      : { style: { transform: `translateX(${translateX})` } };

    // If max-width is given, the slide is positioned
    // in the middle of the article column.
    const slideMaxWidthMaybe = maxWidth
      ? { style: { maxWidth, margin: '0 auto' } }
      : {};

    const handleClick = index => () => {
      this.setState({ activeSlide: index });
    };

    return (
      <CarouselSection {...restProps}>
        <Title>
          {title} {slideNumber}/{slideCount}
        </Title>
        <SlideViewport {...slideMaxWidthMaybe}>
          <Slides
            ref={this.slideContainerEl}
            slideCount={slideCount}
            onTouchStart={this.handleMoveStart}
            onMouseDown={this.handleMoveStart}
            useTransition={!this.swipeState.onMove}
            {...slideTranslateXMaybe}
          >
            {React.Children.map(children, child => {
              return React.cloneElement(child, { width: slideWidth });
            })}
          </Slides>
        </SlideViewport>
        <Dots
          slideCount={slideCount}
          activeSlide={this.state.activeSlide}
          onClick={handleClick}
        />
        <ArrowContainer>
          <ArrowLeft
            onClick={() => this.prevSlide()}
            disabled={activeSlide === 0}
          />
          <ArrowRight
            onClick={() => this.nextSlide()}
            disabled={activeSlide === lastSlide}
          />
        </ArrowContainer>
      </CarouselSection>
    );
  }
}

export default Carousel;
