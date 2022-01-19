import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG_LANDING from './landing-page.png';
import IMG_AUTH from './authentication-page.png';
import IMG_DESCRIPTION from './edit-listing-description.png';
import IMG_AVAILABILITY from './edit-listing-availability.png';
import IMG_PHOTOS from './edit-listing-photos.png';
import IMG_OWN_LISTING from './own-listing-page.png';

const CarouselYogatimeCreation = props => {
  return (
    <Carousel {...props} maxWidth="480px">
      <Slide imgSrc={IMG_LANDING} imgAlt="Yogatime landing page">
        <h3>Landing Page</h3>
        <p>
          Providers in the Yogatime marketplace create and list their profiles through a listing creation wizard. The wizard is accessed from the top bar's "Become a teacher" call to action. 
        </p>
      </Slide>
      <Slide imgSrc={IMG_AUTH} imgAlt="Yogatime authentication page">
        <h3>Authentication Page</h3>
        <p>
          Users must first login to create listings, or signup to create an account. Yogatime asks for the user's email, first and last name, and password. Anyone with a user profile can create a teacher profile listing on the marketplace. Signing up accepts the marketplace's terms. 
        </p>
      </Slide>
      <Slide imgSrc={IMG_DESCRIPTION} imgAlt="Yogatime listing creation wizard">
        <h3>Listing creation wizard - Description</h3>
        <p>
          Profile listings are created through the listing creation wizard. In Yogatime, the wizard includes seven steps. Providers first enter identifying information (they are making a profile after all). They fill in their name and bio, and then a number of filterable fields like their certification level, Yoga style(s) taught, price per hour, and location. 
        </p>
      </Slide>
      <Slide imgSrc={IMG_AVAILABILITY} imgAlt="Yogatime listing creation wizard - availability calendar">
        <h3>Listing creation wizard - Availability</h3>
        <p>
          Next providers are asked to set their availability calendar. They define a default weekly schedule. Then, they can add exceptions to this schedule: either new dates and times they are available outside the default or when they are not available during their regular hours. Providers can block unavailable dates in this view. 
        </p>
      </Slide>
      <Slide imgSrc={IMG_PHOTOS} imgAlt="Yogatime listing creation wizard - Photos and payout details">
        <h3>Listing creation wizard - Photos and payout details</h3>
        <p>
          Finally, providers can upload a few photos to display on their listing page. They must enter their bank account information to process online payments and receive payouts. Stripe Connect, Flex’s payment system, asks the provider for details related to their identity and bank information. Once approved, providers can receive payouts.
        </p>
      </Slide>
      <Slide imgSrc={IMG_OWN_LISTING} imgAlt="Yogatime listing page - own listing">
        <h3>Listing page - Own Listing</h3>
        <p>
          A teacher can view their profile by pressing “Teacher profile”. The listing page displays the information they entered. They can edit the listing following a link on top of the listing image.
        </p>
      </Slide>
    </Carousel>
  );
};

export default CarouselYogatimeCreation;
