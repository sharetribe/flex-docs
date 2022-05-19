import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG1 from './landing-page.png';
import IMG2 from './search-page.png';
import IMG3 from './listing-page.png';

const CarouselDiscovery = props => {
  return (
    <Carousel {...props} maxWidth="480px">
      <Slide imgSrc={IMG1} imgAlt="Saunatime landing page.">
        <h3>Landing page</h3>
        <p>
          The landing page is designed for users to quickly learn what the
          marketplace is all about. Users search for their sauna by location,
          either in top bar or by predefined locations below the hero image.
          Users can also see all saunas through the main call to action button
          "Browse saunas".
        </p>
      </Slide>
      <Slide imgSrc={IMG2} imgAlt="Saunatime search page">
        <h3>Search page</h3>
        <p>
          Users browse listings on the search page. Listings are visible as
          cards on the left-hand side or on the right-hand side map. Saunatime
          lets users filter their sauna results via a variety of filters,
          including type (choose one), amenities (choose many), price, dates,
          and keywords.{' '}
        </p>
      </Slide>
      <Slide imgSrc={IMG3} imgAlt="Saunatime listing page">
        <h3>Listing page</h3>
        <p>
          Users can view more information about a sauna, like photos or rules,
          from the listing page. Reviews including a comment and 5-star rating
          are displayed on the listing page too.
        </p>
      </Slide>
    </Carousel>
  );
};

export default CarouselDiscovery;
