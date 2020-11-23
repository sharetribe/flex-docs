import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG_FULL_TRANSACTION_PROCESS from './full-transaction-process.png';
import IMG_TRANSACTION_STATES from './transaction-states.png';
import IMG_TRANSACTION_TRANSITIONS from './transaction-transitions.png';
import IMG_TRANSACTION_ACTIONS from './transaction-actions.png';

const CarouselTransactionProcessComponents = props => {
  return (
    <Carousel {...props} maxWidth="480px">
      <Slide imgSrc={IMG_FULL_TRANSACTION_PROCESS} imgAlt="asdf">
        <h3>Transaction process</h3>
        <p>
          The graph above visualizes one of the default Flex transaction processes.{' '}
        </p>
      </Slide>
      <Slide imgSrc={IMG_TRANSACTION_STATES} imgAlt="asdf">
        <h3>Transaction States</h3>
        <p>
          A transaction process utilizes guides how your users interact within your marketplace using a few different pieces. First of all, each milestone on the journey is known as a state. States describe where the users are along their interaction. For instance, at this stage, the transaction process may move from the preauthorized state to the declined state or to the accepted state. Transaction in the accepted state can transition to cancelled or delivered state. {''}
        </p>
      </Slide>
      <Slide imgSrc={IMG_TRANSACTION_TRANSITIONS} imgAlt="asdf">
        <h3>Transaction Transitions</h3>
        <p>
          Transitions move the transaction from one state to another. They are the steps between milestones.
        </p>
        <p>
          A transition is triggered by one or multiple actors: the customer, the provider, the operator, or time (this is known as an “automatic” actor in Flex). At this state in the transaction, the provider can transition the transaction to an accepted state. Or, the operator may cancel the booking.
        </p>
        <p>
          Transitions describe the only possible next steps, as well as who must take them, from a particular milestone. No possible transitions from a state signify the transaction’s end point.
        </p>
      </Slide>
      <Slide imgSrc={IMG_TRANSACTION_ACTIONS} imgAlt="asdf">
        <h3>Transaction Actions</h3>
        <p>
          Actions describe what happens as part of transition. For example, the transaction process allows users to transition to an delivered or cancelled state here; they may “complete” or “cancel” the transactions with the respective transition. “Complete” actions include creating payout to the provider via Stripe, the payment gateway. “Cancel” actions, on the other hand, include cancelling the booking and issuing a refund. 
        </p>
      </Slide>
    </Carousel>
  );
};

export default CarouselTransactionProcessComponents;
