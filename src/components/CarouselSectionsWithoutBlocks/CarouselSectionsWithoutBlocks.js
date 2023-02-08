import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG1 from './hero-style.png';
import IMG2 from './info-style.png';
import IMG3 from './link-style.png';

const CarouselSectionsWithoutBlocks = props => {
  return (
    <Carousel {...props} maxWidth="600px">
      <Slide imgSrc={IMG1} imgAlt="Hero style section"></Slide>
      <Slide imgSrc={IMG2} imgAlt="Info style section"></Slide>
      <Slide imgSrc={IMG3} imgAlt="Link style section"></Slide>
    </Carousel>
  );
};

export default CarouselSectionsWithoutBlocks;
