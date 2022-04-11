import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG_LISTING from './listing-page.png';
import IMG_CHECKOUT from './checkout-page-returning.png';
import IMG_INBOX from './inbox-page-provider.png';
import IMG_TRANSACTION_CUSTOMER from './transaction-page-customer.png';
import IMG_TRANSACTION_PROVIDER from './transaction-page-provider.png';
import IMG_REVIEW from './leave-review.png';

const CarouselSneakertimeTransaction = props => {
  return (
    <Carousel {...props} maxWidth="480px">
      <Slide imgSrc={IMG_LISTING} imgAlt="Sneakertime Listing page">
        <h3>Listing page</h3>
        <p>
          Sneakers are purchased via the product listing page. First, customers
          view and select the suitable delivery method and quantity from the
          menu on the right hand side. The price is calculated based on these
          choices. Customers press “Buy now” to proceed.
        </p>
      </Slide>
      <Slide
        imgSrc={IMG_CHECKOUT}
        imgAlt="Sneakertime Checkout Page - Returning customer"
      >
        <h3>Checkout Page, Returning Customer</h3>
        <p>
          On the checkout page, customers enter their payment card and billing
          details, and their shipping details if they need the product shipped.
          They can also send a message to the provider. The transaction process
          starts when a customer confirms and pays. The payment is captured
          immediately and the provider is notified of the sale via an email.
        </p>
      </Slide>
      <Slide imgSrc={IMG_REVIEW} imgAlt="Sneakertime Transaction Page">
        <h3>Transaction Page</h3>
        <p>
          The transaction page is visible to the customer and provider after a
          purchase is made. It shows all information related to the purchase,
          including current status, amounts paid and earned, calls to action,
          and past messages. The customer and provider can also message on this
          page. The transaction page can be accessed from the user's Inbox.
        </p>
      </Slide>
      <Slide
        imgSrc={IMG_INBOX}
        imgAlt="Sneakertime Inbox Page, Provider's view"
      >
        <h3>Inbox Page</h3>
        <p>
          The Inbox is clicked into via the top bar. “My Purchases” shows
          transactions where the user purchased sneakers and “My sales” shows
          transactions where the user sold sneakers.
        </p>
      </Slide>
      <Slide
        imgSrc={IMG_TRANSACTION_PROVIDER}
        imgAlt="Sneakertime transaction page, provider’s view"
      >
        <h3>Transaction Page - Provider’s View</h3>
        <p>
          Providers receive purchase notifications after the customer submits
          their payment details on the checkout page. If the order is shipped,
          they can mark when it’s done to notify the buyer. If the provider does
          not react to the purchase within 14 days, the purchase is
          automatically cancelled and a full refund is issued.
        </p>
      </Slide>
      <Slide
        imgSrc={IMG_TRANSACTION_CUSTOMER}
        imgAlt="Sneakertime transaction page, provider’s view"
      >
        <h3>Transaction Page - Customer’s View</h3>
        <p>
          Customers can mark orders completed, raise a dispute with the
          transaction, and message with the seller during a transaction. Marking
          the order completed triggers a payout to the provider and starts the
          review period for the product. Shipped purchases are also
          auto-completed and providers paid out two weeks after product was
          marked shipped.
        </p>
      </Slide>
      <Slide
        imgSrc={IMG_REVIEW}
        imgAlt="Sneakertime Transaction page -  leave a review, provider’s view"
      >
        <h3>Leave a Review, provider’s view</h3>
        <p>
          A transaction is automatically completed after the reserved booking
          period ends. The provider's earnings minus Yogatime’s 10% commission
          are paid out to their bank account. The users are prompted to review
          each other when a booking is completed.
        </p>
      </Slide>
    </Carousel>
  );
};

export default CarouselSneakertimeTransaction;
