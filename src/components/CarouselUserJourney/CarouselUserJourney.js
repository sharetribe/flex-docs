import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG1 from './user-journey-landingpage.png';
import IMG2 from './authentication-page.png';
import IMG3 from './edit-listing-availability.png';
import IMG4 from './edit-listing-description.png';

const CarouselUserJourney = props => {
  return (
    <Carousel {...props} maxWidth="375px">
      <Slide imgSrc={IMG1} imgAlt="asdf">
        <h3>Landing page</h3>
        <p>Providers in the Saunatime marketplace list their saunas through a listing creation wizard. The wizard is accessed from the top bar's "Add your sauna" call to action. </p>
      </Slide>
      <Slide imgSrc={IMG2} imgAlt="asdf">
        <h3>Authentication page</h3>
        <p>Users must first login to create listings, or signup to create an account. Saunatime asks for the user's email, first and last name, and password. Signing up accepts the marketplace's terms.</p>
      </Slide>
      <Slide imgSrc={IM4} imgAlt="asdf">
        <h3>Listing creation wizard - Description</h3>
        <p>Listings are created through the listing creation wizard. In Saunatime, the wizard includes seven steps. Providers first enter identifying information about the listing: the title and description, as well as searchable fields like the sauna category, price per night, and location. </p>
      </Slide>
      <Slide imgSrc={IMG3} imgAlt="asdf">
        <h3>Listing creation wizard - Availability</h3>
        <p>After sharing the details of their sauna, providers are asked to set the listing's availability calendar.</p>
        <p>Providers can block unavailable dates in this view. If the provider is editing an already existing listing, they can also see which dates are already booked.</p> 
      </Slide>
    </Carousel>
  );
};

export default CarouselUserJourney;
