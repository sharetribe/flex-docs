---
title: What are listing types
slug: what-are-listing-types
updated: 2023-04-24
category: operator-guides-listings
ingress:
  Understanding lsiting types, how to create and use them.
published: true
---


Listings describe the products and services offered by your providers. Listing type determines how customers interact with the listing. Are they purchasing a physical product from an inventory, making a calendar booking, or sending an inquiry as a free message? If they are making a booking, does it happen on an hourly or a daily basis? If they're purchasing a product, can they buy multiple products of the same type in one go, or is every product unique? These are examples of choices you make when setting your listing type.

Listing type affects also the data that is collected from the provider when creating the listing. For example, if the customer is booking from a calendar, the provider needs to determine times that are available for booking. If a physical product is bought from an inventory, the provider needs to set how many items they have in stock, and decide if they offer pick-up or shipping as delivery options.

In addition to listing types, you can affect the data collected from the provider when creating a listing by adding custom fields.

## How to create a Listing type? 

When creating a Listing type, you need to define the title of the Listing type settings and the Transaction settings. 

### Listing type settings
These are two fields that define the Listing type, one outward facing; the Title, and the other internal; the ID.

 - Listing type title: this is the name of the Listing type. It will be displayed to the users of your marketplace in different locations. You should add a descriptive title. 

 - Listing type ID: this is a unique identifier not shown to your users. It is used to distinguish this Listing type from others in your Console. It can be used during custom development for the same distinguishing purpose. 

## Transaction settings
Transaction settings define several important aspects of how your marketplace works. You have two options available by default: Calendar booking or buying and selling products. 

Transaction settings impact what information providers must fill out when creating their listing. They also impact how buyers initiate a transaction on the listing page. 

 - Calendar booking: allows providers to set their availability in the listing creation form. Allows buyers to initiate transactions based on the corresponding availability. Perfect for most rental and service marketplaces. [Read more](LINK TO THE CALENDAR BOOKING IN THE OTHER ARTICLE).

 - Buying and selling products: allows providers to set the price of a unit and define how many units they can provide. Allows buyers to purchase those listings. Perfect for product marketplaces (and in some other types of marketplaces). [Read more](LINK TO THE stock setting IN THE OTHER ARTICLE).

Finally, transaction settings determine the transaction process used in your marketplace. The transaction process maps out how a transaction happens between a customer and provider, including payment, payout, and reviews. You can learn more about the transaction process here.
Can I edit or delete an existing Listing type?

You can make changes to an existing listing type or delete one, but this is not recommended if you created listings with the listing type that you want to keep open. Those listings will retain the settings of the old version of the listing type. For example, if your listing type earlier had calendar booking as its transaction process, and you change the transaction process to product selling, the old listings will still display a calendar. 

Once a listing has been created, its listing type can no longer be changed. If you want to make changes to a listing type or delete a listing type, it's recommended to close any open listings that were created with the old version of the listing type. You can close listings from the Listings tab in the Manage section.

## Can I have multiple Listing types?

Currently you can only configure one listing type in Console. If you self-host your marketplace, you can bypass this limitation with custom development and have several listing types available in the same marketplace. In the future, it will be possible to configure multiple listing types directly in Console.

