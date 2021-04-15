import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG_EXTENDED_DATA_FRONTEND_VIEW from './extended-data-frontend-view.png';
import IMG_EXTENDED_DATA_SAUNA_TYPE from './extended-data-sauna-type.png';
import IMG_EXTENDED_DATA_AMENTIES from './extended-data-amenities.png';
import IMG_EXTENDED_DATA_RULES from './extended-data-rules.png';
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
          We’ll look at three different extended data fields. We have
          highlighted in different colors in different colors: blue is for sauna
          type, red is for sauna amenities, and green is for sauna rules.
        </p>
      </Slide>

      <Slide imgSrc={IMG_EXTENDED_DATA_SAUNA_TYPE} imgAlt="Listing creation">
        <h3>Listing creation: Sauna type</h3>
        <p>
          You can define when in the listing creation process which extended
          data is collected. In Saunatime, the sauna type is a part of the
          description step. It is chosen from a dropdown of options.
        </p>
      </Slide>
      <Slide imgSrc={IMG_EXTENDED_DATA_AMENTIES} imgAlt="Listing creation">
        <h3>Listing creation: Amenities</h3>
        <p>
          The amenities and sauna rules are their own steps in the listing
          creation process. In amenities, providers choose multiple options from
          a predetermined set.
        </p>
      </Slide>
      <Slide imgSrc={IMG_EXTENDED_DATA_RULES} imgAlt="Listing creation">
        <h3>Listing creation: Sauna rules</h3>
        <p>In sauna rules, provides can write in free text.</p>
      </Slide>
      <Slide
        imgSrc={IMG_EXTENDED_DATA_CONSOLE}
        imgAlt="Listing public data in Console"
      >
        <h3>Listing public data in Console</h3>
        <p>
          This is the same listing in Console, your Flex marketplace management
          tool. You can see the corresponding public data fields highlighted
          with the same color as on the listing page.
        </p>
      </Slide>
    </Carousel>
  );
};

export default CarouselPublicExtendedData;
