import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG_EXTENDED_DATA_FRONTEND_VIEW from './extended-data-frontend-view.png';
import IMG_EXTENDED_DATA_SAUNA_TYPE from './extended-data-sauna-type.png';
import IMG_EXTENDED_DATA_AMENTIES from './extended-data-amenities.png';
import IMG_EXTENDED_DATA_RULES from './extended-data-rules.png';
import IMG_EXTENDED_DATA_DETAILS from './extended-data-details.png';

import IMG_EXTENDED_DATA_CONSOLE from './extended-data-console-view.png';

const CarouselPublicExtendedData = props => {
  return (
    <Carousel {...props} maxWidth="480px">
      <Slide
        imgSrc={IMG_EXTENDED_DATA_FRONTEND_VIEW}
        imgAlt="Listing public data in the frontend"
      >
        <h3>Listing public data in the frontend</h3>
        <p>
          We’ll look at a few different extended data fields. We have
          highlighted the fields in different colors: red is for bike category,
          blue is for tire size, and green is for bike brand.
        </p>
      </Slide>

      <Slide imgSrc={IMG_EXTENDED_DATA_DETAILS} imgAlt="Listing creation">
        <h3>Listing creation: Bike details</h3>
        <p>
          You can define when in the listing creation process each extended data
          attribute is collected. In this marketplace, the public data
          attributes shown on the listing page are a part of the listing
          details. You can also add separate tabs to add listing public data.
          <br />
          In addition to the attributes visible on the listing page,{' '}
          <b>listing type</b> is also saved in listing public data.
        </p>
      </Slide>
      <Slide
        imgSrc={IMG_EXTENDED_DATA_CONSOLE}
        imgAlt="Listing public data in Console"
      >
        <h3>Listing public data in Console</h3>
        <p>
          This is the same listing in Console, your Flex marketplace management
          tool. You can see the corresponding public data fields highlighted
          with the same color as on the listing creation page.
        </p>
      </Slide>
    </Carousel>
  );
};

export default CarouselPublicExtendedData;
