import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG_TRANSACTION_PROCESS_PREAUTH from './txn-process-preauthorized.png';
import IMG_REQUESTED from './transaction-page-requested.png';
import IMG_REQUEST from './transaction-page-request.png';
import IMG_NOTIFICATION from './txn-preauthorized-notification.png';

const CarouselTxnProcessUX = props => {
  return (
    <Carousel {...props} maxWidth="480px">
      <Slide imgSrc={IMG_TRANSACTION_PROCESS_PREAUTH} imgAlt="A transaction where the customer has paid">
        <h3>A paid transaction waiting approval</h3>
        <p>
          According to the graph, this user interaction, or transaction, has reached the preauthorized state. The next possible steps are to accept or decline the transaction. If nothing is done, the transaction will expire automatically.The transaction can transition to an accepted or declined state. 
        </p>
      </Slide>
      <Slide imgSrc={IMG_REQUESTED} imgAlt="Provider view">
        <h3>What the provider sees</h3>
        <p>
          Here we see what a transaction in a preauthorized state looks like in Saunatime. Specifically, we are in the inbox of the transaction’s provider. The buyer has just made a request to book our sauna.
        </p>
        <p>
          As our transaction process determines, the provider has  three options: they can accept the booking (moving the transaction to  accepted) or decline it (moving the transaction to declined). They can also not do anything, and the transaction will move to the declined state in the transaction process. 
        </p>
      </Slide>
      <Slide imgSrc={IMG_REQUEST} imgAlt="Customer view">
        <h3>What the customer sees</h3>
        <p>
          This is what the customer’s inbox looks like at the same time. The buyer can message the provider, but they have no way to transition the transaction. Our graph clarifies why this is: preauthorized state does not expect any customer initiated transitions. 
        </p>
      </Slide>
      <Slide imgSrc={IMG_NOTIFICATION} imgAlt="Notification sent">
        <h3>Notification sent</h3>
        <p>
          When the transaction transitions to the preauthorized state, the provider gets a notification email, to let them know that there is a transaction pending approval or rejection. This email template can be modified to suit your needs.  
        </p>
      </Slide>
    </Carousel>
  );
};

export default CarouselTxnProcessUX;
