import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG_LISTING_PAGE from './listing-page-calendar.png';
import IMG_CHECKOUT from './checkout-page.png';
import IMG_REQUEST from './transaction-page-request.png';
import IMG_INBOX from './inbox-page.png';
import IMG_REQUESTED from './transaction-page-requested.png';
import IMG_ACCEPTED from './transaction-page-accepted.png';
import IMG_COMPLETED from './transaction-page-completed.png';
import IMG_REVIEW from './transaction-page-review.png';

const CarouselTransactionProcess = props => {
  return (
    <Carousel {...props} maxWidth="480px">
      <Slide imgSrc={IMG_LISTING_PAGE} imgAlt="Listing page">
        <h3>Listing page</h3>
        <p>Saunas are booked via listings. First, users select suitable dates from the date picker on the right hand side, which shows the sauna's calendar availability. The price is calculated based on the length of the booking. To continue, users must press "Request to book".</p>
      </Slide>
      <Slide imgSrc={IMG_CHECKOUT} imgAlt="Checkout page">
        <h3>Checkout page</h3>
        <p>On the checkout page, customers enter their payment card and billing details. They can also send a message to the provider.</p>
        <p>The transaction process starts when a customer requests to book. The payment is preauthorized and the provider is notified of the request via an email.</p>
      </Slide>
      <Slide imgSrc={IMG_REQUEST} imgAlt="Transaction page">
        <h3>Transaction page, customer&apos;s view</h3>
        <p>The transaction page is visible to the customer and provider after a booking request. It shows the current status of the transaction - whether the booking is requested, accepted, declined, or expired. The customer and provider can also message.</p> 
        <p>The transaction page can be accessed from the user's Inbox. </p>
      </Slide>
      <Slide imgSrc={IMG1} imgAlt="Inbox page">
        <h3>IMG_INBOX</h3>
        <p>The Inbox is clicked into via the top bar. Every received booking appears in the "Hosting" inbox, while every made booking appears in the "Bathing" inbox. </p>
      </Slide>
      <Slide imgSrc={IMG_REQUESTED} imgAlt="Transaction page - booking request">
        <h3>Transaction page - booking request, provider&apos;s view</h3>
        <p>The provider's transaction view becomes visible after they receive a booking request. The provider can choose to accept or decline the request. If the provider does not react to the request within 7 days, it automatically expires.</p>
      </Slide>
      <Slide imgSrc={IMG_ACCEPTED} imgAlt="Transaction page - booking accepted">
        <h3>Transaction page - booking accepted, provider&apos;s view</h3>
        <p>The transaction page displays the latest status of the booking. When a provider accepts a booking, the customer's credit card is charged and held on Stripe account until the booking is completed.</p>
        <p>Accepted booking can only be cancelled by marketplace operators in Saunatime. Cancelled booking will be fully refunded.</p>
      </Slide>
      <Slide imgSrc={IMG_COMPLETED} imgAlt="Transaction page - booking completed, provider's viewe">
        <h3>Transaction page - booking completed, provider&apos;s view</h3>
        <p>A transaction is automatically completed after the reserved booking period ends. The provider's earnings minus Saunatime's 10% commission are paid out to their bank account.</p>
        <p>The users are prompted to review each other when a booking is completed.</p>
      </Slide>
      <Slide imgSrc={IMG_REVIEW} imgAlt="Transaction page -  leave a review, provider’s view">
        <h3>Transaction page -  leave a review, provider&apos;s view</h3>
        <p>Both the customer and provider can review each other in the 7 days following a completed booking. Reviews are not posted until each party has completed their review, or when the 7-day review period has ended. Posted reviews are shown on the listing page and on the user profile.</p>
      </Slide>
    </Carousel>
  );
};

export default CarouselTransactionProcess;
