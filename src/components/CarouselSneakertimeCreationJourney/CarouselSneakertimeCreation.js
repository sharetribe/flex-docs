import React from 'react';
import { Carousel, CarouselSlide as Slide } from '../../components';

import IMG_LANDING from './landing-page.png';
import IMG_AUTH from './authentication-page.png';
import IMG_DESCRIPTION from './edit-description.png';
import IMG_DELIVERY from './edit-delivery.png';
import IMG_PHOTOS from './edit-photos.png';
import IMG_PRICING_STOCK from './edit-pricing-stock.png';
import IMG_MANAGE_LISTINGS from './manage-listings-page.png';

const CarouselSneakertimeCreation = props => {
  return (
    <Carousel {...props} maxWidth="480px">
      <Slide imgSrc={IMG_LANDING} imgAlt="Sneakertime landing page">
        <h3>Landing Page</h3>
        <p>
          Providers in the Sneakertime marketplace create and list their products through a listing creation wizard. The wizard is accessed from the top bar's "Sell your sneakers" call to action button.  
        </p>
      </Slide>
      <Slide imgSrc={IMG_AUTH} imgAlt="Sneakertime authentication page">
        <h3>Authentication Page</h3>
        <p>
          Users must first login to create listings, or signup to create an account. Sneakertime asks for the user's email, first and last name, and password. Anyone with a user profile can create listings on the marketplace.Signing up accepts the marketplace's terms.  
        </p>
      </Slide>
      <Slide imgSrc={IMG_DESCRIPTION} imgAlt="Sneakertime listing creation wizard - description">
        <h3>Listing creation wizard - Description</h3>
        <p>
          Sneaker listings are created through the listing creation wizard. In Sneakertime, the wizard includes 5 steps. Providers first enter identifying information about the product, including fre text, single select, and multi-select fields. Information in these fields is used to return relevant results during customers’ search. 
        </p>
      </Slide>
      <Slide imgSrc={IMG_PRICING_STOCK} imgAlt="Sneakertime listing creation wizard - stock">
        <h3>Listing creation wizard - Stock</h3>
        <p>
          Next providers are asked to set their product price and how many they have in stock. Customers can buy as many products as the seller makes available. Stock amounts are automatically managed based on purchases, cancellations, and inputs from the provider. 

        </p>
      </Slide>
            <Slide imgSrc={IMG_DELIVERY} imgAlt="Sneakertime listing creation wizard - Delivery">
        <h3>Listing creation wizard - Delivery</h3>
        <p>
          Providers then determine how they can deliver the product to the buyer. Sneakertime sellers can disclose a pickup location and/or determine the price they charge for shipping. The shipping price is added to the purchase amount paid by the buyer during checkout.
        </p>
      </Slide>
      <Slide imgSrc={IMG_PHOTOS} imgAlt="Sneakertime listing creation wizard - Photos and payout details">
        <h3>Listing creation wizard - Photos and payout details</h3>
        <p>
          Finally, providers can upload a few photos to display on the product page. Stripe Connect, Flex’s default payment and payout system, asks the provider for details related to their identity and bank information. Once approved, providers can process payment card payments and receive payouts automatically on the marketplace.
        </p>
      </Slide>
      <Slide imgSrc={IMG_MANAGE_LISTINGS} imgAlt="Sneakertime manage listings page">
        <h3>Manage Listings Page</h3>
        <p>
          The user can view their own listings in the “Your listings” meni, where they can see all the listings they’ve added. From this page they can see how much stock each product has, and manage stock and edit listing details.
        </p>
      </Slide>
    </Carousel>
  );
};

export default CarouselSneakertimeCreation;
