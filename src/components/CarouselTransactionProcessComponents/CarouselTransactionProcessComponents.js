import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG_FULL_TRANSACTION_PROCESS from './full-transaction-process.png';
import IMG_TRANSACTION_STATES from './transaction-states.png';
import IMG_TRANSACTION_TRANSITIONS from './transaction-transitions.png';
import IMG_TRANSACTION_ACTIONS from './transaction-actions.png';

const CarouselTransactionProcessComponents = props => {
  return (
    <Carousel {...props} maxWidth="480px">
      <Slide imgSrc={IMG_FULL_TRANSACTION_PROCESS} imgAlt="Full transaction process">
        <h3>Transaction process</h3>
        <p>
          The graph above visualizes a transaction process called the “flex-default-process.” It closely mimics how a customer and provider transact on AirBnB. From a listing, customers can message a provider or book directly, entering their payment details and authorizing the charge on their card. Providers must then accept the request, reject the request, or let it expire. 
        </p>
        <p>
          After accepted bookings are completed, the customer and provider may review each other for a period of time. Then, the reviews are published, concluding the transaction.{' '}
        </p>
      </Slide>
      <Slide imgSrc={IMG_TRANSACTION_STATES} imgAlt="Transaction states">
        <h3>Transaction States</h3>
        <p>
          States mark varying milestones in a transaction. In the default transaction process, for example, a transaction in the preauthorized state signifies that a customer has made a booking request and authorized a charge on their credit card. 
        </p>
        <p>
          The Flex default process, for example, has a state called preauthorized. It signifies that a customer has requested to book a time from the provider’s calendar and a charge on their credit card has been preauthorized.{''}
        </p>
      </Slide>
      <Slide imgSrc={IMG_TRANSACTION_TRANSITIONS} imgAlt="Transaction transitions">
        <h3>Transaction Transitions</h3>
        <p>
        Transitions move the transaction from one state to another. They are the steps between milestones.
        </p>
        <p>
        Transitions change the state of a transaction. They are initiated by certain actors (customers, providers, operators, or the system).
        </p>
        <p>
          A transition is triggered by one or multiple actors: the customer, the provider, the operator, or time (this is known as an “automatic” actor in Flex). At this state in the transaction, the provider can transition the transaction to an accepted state. Or, the operator may cancel the booking.
        </p>
        <p>
          Transitions describe the only possible next steps, as well as who must take them, from a particular milestone. No possible transitions from a state signify the transaction’s end point.
        </p>
      </Slide>
      <Slide imgSrc={IMG_TRANSACTION_ACTIONS} imgAlt="Transaction actions">
        <h3>Transaction Actions</h3>
        <p>
          Actions define what happens during a transition. For instance, a transaction transitioning to the cancelled state in the default process involves three actions: **cancel** the booking reservation, **calculate** the full refund amount and **trigger** the payment refund in full. 
        </p>
      </Slide>
    </Carousel>
  );
};

export default CarouselTransactionProcessComponents;
