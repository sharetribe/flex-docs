import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG_LANDING from './landing-page.png';
import IMG_SEARCH from './search-page.png';
import IMG_LISTING from './listing-page.png';

const CarouselYogatimeSearch = props => {
  return (
    <Carousel {...props} maxWidth="480px">
      <Slide imgSrc={IMG_LANDING} imgAlt="Yogatime landing page">
        <h3>Landing Page</h3>
        <p>
          The landing page tells users what the marketplace is all about.
          Customers search for providers by location, either by typing a
          location in the top bar or by clicking on predefined locations below
          the hero image. Users can also see all saunas through the main call to
          action button "Browse teachers".
        </p>
      </Slide>
      <Slide imgSrc={IMG_SEARCH} imgAlt="Yogatime search page">
        <h3>Search Page</h3>
        <p>
          Customers browse listings on the search page. Listings are visible as
          cards on the left-hand side or on the right-hand side map. Dragging
          the map updates the list of listing cards. Yogatime lets users filter
          providers with a variety of filters, including certification level
          (choose one), Yoga style (choose many), price, dates, and keywords.
        </p>
      </Slide>
      <Slide imgSrc={IMG_LISTING} imgAlt="Yogatime listing page">
        <h3>Listing Page</h3>
        <p>
          Users view detailed information about the provider on their listing
          page. Reviews including a comment and 5-star rating are displayed on
          the listing page too. Users can choose to book a time from the
          provider’s availability calendars and “Request to book.”
        </p>
      </Slide>
    </Carousel>
  );
};

export default CarouselYogatimeSearch;
