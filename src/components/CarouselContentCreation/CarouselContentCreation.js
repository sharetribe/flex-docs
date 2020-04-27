import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG1 from './user-journey-landingpage.png';

const CarouselContentCreation = props => {
  return (
    <Carousel {...props} maxWidth="375px">
      <Slide imgSrc={IMG1} imgAlt="asdf">
        <h3>Testing1</h3>
        <p>Lorem ipsum1</p>
      </Slide>
      <Slide imgSrc={IMG1} imgAlt="asdf">
        <h3>Testing2</h3>
        <p>Lorem ipsum2</p>
        <p>Lorem ipsum2</p>
      </Slide>
      <Slide imgSrc={IMG1} imgAlt="asdf">
        <h3>Testing3</h3>
        <p>Lorem ipsum3</p>
        <p>Lorem ipsum3</p>
        <p>Lorem ipsum3</p>
      </Slide>
      <Slide imgSrc={IMG1} imgAlt="asdf">
        <h3>Testing4</h3>
        <p>Lorem ipsum4</p>
      </Slide>
    </Carousel>
  );
};

export default CarouselContentCreation;
