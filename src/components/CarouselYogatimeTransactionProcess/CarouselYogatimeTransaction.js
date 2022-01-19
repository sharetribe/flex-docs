import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG_LISTING from './listing-page.png';
import IMG_CHECKOUT from './checkout-page.png';
import IMG_COMPLETED from './booking-completed.png';
import IMG_INBOX from './inbox-provider.png';
import IMG_REQUEST from './booking-request.png';
import IMG_ACCEPTED from './request-accepted.png';
import IMG_REVIEW from './leave-review.png';

const CarouselYogatimeTransaction = props => {
  return (
    <Carousel {...props} maxWidth="480px">
      <Slide imgSrc={IMG_LISTING} imgAlt="Yogatime Listing page">
        <h3>Listing page</h3>
        <p>
         Teachers are booked via their profile listings. First, customers select suitable dates and times from the calendar on the right hand side, which shows the sauna's calendar availability. The price is calculated based on the length of the booking. To continue, users must press "Request to book". 
        </p>
      </Slide>
      <Slide imgSrc={IMG_CHECKOUT} imgAlt="Yogatime Checkout Page">
        <h3>Checkout Page</h3>
        <p>
          On the checkout page, customers enter their payment card and billing details. They can also send a message to the provider. The transaction process starts when a customer sends the request. The payment is preauthorized and the provider is notified of the request via an email. 
        </p>
      </Slide>
      <Slide imgSrc={IMG_COMPLETED} imgAlt="Yogatime Transaction Page">
        <h3>Transaction Page</h3>
        <p>
          The transaction page is visible to the customer and provider after a booking request. It shows the current status of the transaction - whether the booking is requested, accepted, declined, or expired. The customer and provider can also message. The transaction page can be accessed from the user's Inbox. 
        </p>
      </Slide>
            <Slide imgSrc={IMG_INBOX} imgAlt="Yogatime Inbox Page, Provider's view">
        <h3>Inbox Page</h3>
        <p>
          The Inbox is clicked into via the top bar. Every received booking appears in the "Teaching" inbox, while every made booking appears in the "Bookings" inbox. 
        </p>
      </Slide>
            <Slide imgSrc={IMG_REQUEST} imgAlt="Yogatime Booking request, provider’s view">
        <h3>Booking request, provider’s view</h3>
        <p>
          The provider sees transaction requests after the customer submits them. The provider can choose to accept or decline the request. If the provider does not react to the request within 7 days, it automatically expires. 
        </p>
      </Slide>
            <Slide imgSrc={IMG_ACCEPTED} imgAlt="Yogatime Booking accepted, provider’s view">
        <h3>Booking accepted, provider’s view</h3>
        <p>
          The transaction page displays the latest status of the booking. When a provider accepts a booking, the customer's credit card is charged and held on Stripe account until the booking is completed. Accepted booking can only be cancelled by marketplace operators in Yogatime. Cancelled booking will be fully refunded.
        </p>
      </Slide>
            <Slide imgSrc={IMG_COMPLETED} imgAlt="Yogatime Booking completed, provider’s view">
        <h3>Booking completed, provider’s view</h3>
        <p>
          A transaction is automatically completed after the reserved booking period ends. The provider's earnings minus Yogatime’s 10% commission are paid out to their bank account. The users are prompted to review each other when a booking is completed.
        </p>
      </Slide>
            <Slide imgSrc={IMG_REVIEW} imgAlt="Yogatime leave a review, provider’s view">
        <h3>Leave a review, provider’s view</h3>
        <p>
          Both the customer and provider can review each other in the 7 days following a completed booking. Reviews are not posted until each party has completed their review, or when the 7-day review period has ended. Posted reviews are shown on the listing page and on the user profile. 
        </p>
      </Slide>

    </Carousel>
  );
};

export default CarouselYogatimeTransaction;
