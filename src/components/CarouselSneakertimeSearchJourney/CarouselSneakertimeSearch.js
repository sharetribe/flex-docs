import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG_LANDING from './landing-page.png';
import IMG_SEARCH from './search-page.png';
import IMG_LISTING from './listing-page.png';

const CarouselSneakertimeSearch = props => {
  return (
    <Carousel {...props} maxWidth="480px">
      <Slide imgSrc={IMG_LANDING} imgAlt="Sneakertime landing page">
        <h3>Landing Page</h3>
        <p>
          The landing page tells users what the marketplace is all about. Customers can search for product listings by keyword using the top bar. Or they can click on predefined categories below the hero image. Customers can also see all sneakers through the main call to action button "Browse sneakers".  
        </p>
      </Slide>
      <Slide imgSrc={IMG_SEARCH} imgAlt="Sneakertime search page">
        <h3>Search Page</h3>
        <p>
          CCustomers browse listings on the search page. Listings are visible as cards in the center of the screen. Listings can be sorted by parameters such as price. A menu of different filters, like category (choose one) or size (choose many), lets buyers narrow down results. The listing results update automatically when a new filter option is selected. 
        </p>
      </Slide>
      <Slide imgSrc={IMG_LISTING} imgAlt="'Sneakertime listing page">
        <h3>Listing Page</h3>
        <p>
          Users view detailed information about the product on the listing page. Reviews including a comment and 5-star rating are displayed on the listing page too. Users can make their product selection (delivery method, quantity) and “Buy now”. They can also access the seller’s profile page, where their other products are displayed, from the listing.
        </p>
      </Slide>
    </Carousel>
  );
};

export default CarouselSneakertimeSearch;
