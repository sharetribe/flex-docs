import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG_LANDING_PAGE from './landing-page.png';
import IMG_AUTHENTICATION from './authentication-page.png';
import IMG_WIZARD_DESCRIPTION from './edit-listing-description.png';
import IMG_WIZARD_AVAILABILITY from './edit-listing-availability.png';
import IMG_WIZARD_PHOTOS from './edit-listing-photos.png';
import IMG_OWN_LISTING from './listing-page-own.png';


const CarouselUserJourney = props => {
  return (
    <Carousel {...props} maxWidth="480px">
      <Slide imgSrc={IMG_LANDING_PAGE} imgAlt="asdf">
        <h3>Landing page</h3>
        <p>Providers in the Saunatime marketplace list their saunas through a listing creation wizard. The wizard is accessed from the top bar's "Add your sauna" call to action. </p>
      </Slide>
      <Slide imgSrc={IMG_AUTHENTICATION} imgAlt="asdf">
        <h3>Authentication page</h3>
        <p>Users must first login to create listings, or signup to create an account. Saunatime asks for the user's email, first and last name, and password. Signing up accepts the marketplace's terms.</p>
      </Slide>
      <Slide imgSrc={IMG_WIZARD_DESCRIPTION} imgAlt="asdf">
        <h3>Listing creation wizard - Description</h3>
        <p>Listings are created through the listing creation wizard. In Saunatime, the wizard includes seven steps. Providers first enter identifying information about the listing: the title and description, as well as searchable fields like the sauna category, price per night, and location. </p>
      </Slide>
      <Slide imgSrc={IMG_WIZARD_AVAILABILITY} imgAlt="asdf">
        <h3>Listing creation wizard - Availability</h3>
        <p>After sharing the details of their sauna, providers are asked to set the listing's availability calendar.</p>
        <p>Providers can block unavailable dates in this view. If the provider is editing an already existing listing, they can also see which dates are already booked.</p>
      </Slide>
      <Slide imgSrc={IMG_WIZARD_PHOTOS} imgAlt="asdf">
        <h3>Listing creation wizard - Photos and payout details</h3>
        <p>The final step to publishing a listing in Saunatime is uploading photos. Providers must also enter their bank account information in their user profile to process online payments. Once their account is verified by Stripe, providers can process payment card payments and receive payouts on the marketplace.</p>
      </Slide>
      <Slide imgSrc={IMG_WIZARD_AVAILABILITY} imgAlt="asdf">
        <h3>Own listing</h3>
        <p>A user can access their published and draft listings from "My listings" in their profile. The listing page displays the information they entered. They can edit the listing following a link on top of the listing image. </p>
      </Slide>
    </Carousel>
  );
};

export default CarouselUserJourney;
