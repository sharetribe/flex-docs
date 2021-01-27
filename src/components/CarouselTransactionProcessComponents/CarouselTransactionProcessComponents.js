import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG_TRANSACTION_PROCESS_COMPONENTS from './transaction-components-v3.png';
import IMG_TRANSACTION_STATES from './transaction-states-v2.png';
import IMG_TRANSACTION_TRANSITIONS from './transaction-transitions-v2.png';
import IMG_TRANSACTION_ACTIONS from './transaction-actions-v2.png';
import IMG_TRANSACTION_NOTIFICATIONS from './transaction-notifications-v2.png';

const CarouselTransactionProcessComponents = props => {
  return (
    <Carousel {...props} maxWidth="480px">
      <Slide
        imgSrc={IMG_TRANSACTION_PROCESS_COMPONENTS}
        imgAlt="Transaction process components"
      ></Slide>
      <Slide imgSrc={IMG_TRANSACTION_STATES} imgAlt="Transaction states">
        <h3>Transaction States</h3>
        <p>
          States mark varying milestones in a transaction. In the default
          transaction process, for example, a transaction in the preauthorized
          state signifies that a customer has made a booking request and
          authorized a charge on their credit card.
        </p>
      </Slide>
      <Slide
        imgSrc={IMG_TRANSACTION_TRANSITIONS}
        imgAlt="Transaction transitions"
      >
        <h3>Transaction Transitions</h3>
        <p>
          Transitions change the state of a transaction. They are initiated by
          certain actors (customers, providers, operators, or the system).
        </p>
      </Slide>
      <Slide imgSrc={IMG_TRANSACTION_ACTIONS} imgAlt="Transaction actions">
        <h3>Transaction Actions</h3>
        <p>
          Actions define what happens during a transition. For instance, a
          transaction transitioning to the cancelled state in the default
          process involves three actions: <b>cancel</b> the booking reservation,{' '}
          <b>calculate</b> the full refund amount and <b>trigger</b> the refund
          payment in full.
        </p>
      </Slide>
      <Slide
        imgSrc={IMG_TRANSACTION_NOTIFICATIONS}
        imgAlt="Transaction notifications"
      >
        <h3>Transaction Notifications</h3>
        <p>
          Email notifications can be included as part of a transition. When a
          transaction transitions to the delivered state, for example, an email
          is sent to the customer prompting them to review the provider. Two
          emails are sent to the provider, one prompting them to review the
          customer and one about money being paid to their account.
        </p>
      </Slide>
    </Carousel>
  );
};

export default CarouselTransactionProcessComponents;
