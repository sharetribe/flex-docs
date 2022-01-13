---
title: User Journey - Yogatime
slug: same-as-the-folder-directory-name
updated: 2021-01-13 <!---set the date of today---> 
category: design-files
ingress:
  User journey for Yogatime, the Flex template for booking services or renting products by the hour
published: true
---

Yogatime template is one of the Flex Templates for Web. It is a marketplace for service providers–in this example case Yoga teachers–to create profile listings advertising their teaching practice. Customers can book hourly sessions from these teachers’ availability calendars. Since Yogatime uses time based availability rather than day based availability like Saunatime, it is also a good starting point for marketplaces where bookings are made with time units smaller than days. 

Yogatime, as any typical marketplace has three distinct user journeys: 
Search: Search happens when customers search for listings on the marketplace using some combination of keywords, availability, filters, and sorting.
Listing creation: Listings are created by providers to promote a product or service they are offering, with the exception of reverse marketplaces where the customer creates listings. What information providers enter into a listing, such a price or category, is usually the basis for the customer’s search experience.
Transactions: The transaction process determines how a customer and providers interact on the marketplace, whether it is to rent, sell or interact otherwise.

In this article we’ll explore in depth how search, listing creation, and transactions work in Yogatime. 

Search Journey 

The search journey defines how users search and find listings in your marketplace. Starting on the landing page, users progressively narrow their search to find the service, rental, or product they need. Users might find what they need by searching nearby locations or via keywords. Results should be filtered by relevant criteria, like price or category.

Click through the slideshow below to see the search steps and capabilities that come with Flex out of the box with the Yogatime template.

Discovery journey slideshow: https://whimsical.com/RQKUAzFBQzXykMUMkzAPTf

Content for slideshow

Landing page

The landing page tells users what the marketplace is all about. Customers search for providers by location, either by typing a location in the top bar or by clicking on predefined locations below the hero image. Users can also see all saunas through the main call to action button "Browse teachers". 
Search page

Customers browse listings on the search page. Listings are visible as cards on the left-hand side or on the right-hand side map. Dragging the map updates the list of listing cards. Yogatime lets users filter providers with a variety of filters, including certification level (choose one), Yoga style (choose many), price, dates, and keywords. 

Listing page

Users view detailed information about the provider on their listing page. Reviews including a comment and 5-star rating are displayed on the listing page too. Users can choose to book a time from the provider’s availability calendars and “Request to book.”
Listing Creation Journey 

Sellers create listings to show what they are offering on the marketplace. Listings can advertise services, products, or rentals, or, in reverse marketplaces, they are jobs providers apply to. The information collected in a listing typically influences what parameters are available during the search journey. The unit of value that is listed also influences how a transaction journey should progress. 

Click through the slideshow below to see how providers create their Yoga teacher profiles in the Yogatime template, including listing availability and pricing. 
Content creation slideshow: https://whimsical.com/RQKUAzFBQzXykMUMkzAPTf

Content for slideshow

Landing page
Providers in the Yogatime marketplace create and list their profiles through a listing creation wizard. The wizard is accessed from the top bar's "Become a teacher" call to action. 

Authentication page
Users must first login to create listings, or signup to create an account. Yogatime asks for the user's email, first and last name, and password. Anyone with a user profile can create a teacher profile listing on the marketplace. Signing up accepts the marketplace's terms. 

Listing creation wizard - Description
Profile listings are created through the listing creation wizard. In Yogatime, the wizard includes seven steps. Providers first enter identifying information (they are making a profile after all). They fill in their name and bio, and then a number of filterable fields like their certification level, Yoga style(s) taught, price per hour, and location. 

Listing creation wizard - Availability
Next providers are asked to set their availability calendar. They define a default weekly schedule. Then, they can add exceptions to this schedule: either new dates and times they are available outside the default or when they are not available during their regular hours. 
Providers can block unavailable dates in this view. 

Listing creation wizard - Photos and payout details 
Finally, providers can upload a few photos to display on their listing page. They must also enter their bank account information to process online payments and receive payouts.Stripe Connect, the default payment and payout system available with Flex, asks the provider for personal details related to their identity and bank information. Once approved, providers can process payment card payments and receive payouts automatically on the marketplace.

Listing page - own listing
A teacher can view their profile by pressing “Teacher profile”. The listing page displays the information they entered. They can edit the listing following a link on top of the listing image. 



Transaction Process 

The transaction process defines how booking or buying events happen between the listing provider and the purchasing customer. Sharetribe Flex lets you extensively customize the rules and steps of your transaction process to govern how providers and customers capitalize on your marketplace. 


Click through the slideshow below to see how customers reserve hours from Yoga teachers’ calendars, how they pay, and how both providers and customers leave reviews after a successful transaction. 


Txn process slideshow: https://whimsical.com/RQKUAzFBQzXykMUMkzAPTf

Content for slideshow

Listing page
Teachers are booked via their profile listings. First, customers select suitable dates and times from the calendar on the right hand side, which shows the sauna's calendar availability. The price is calculated based on the length of the booking. To continue, users must press "Request to book".

Checkout page
On the checkout page, customers enter their payment card and billing details. They can also send a message to the provider. 
The transaction process starts when a customer sends the request. The payment is preauthorized and the provider is notified of the request via an email. 

Transaction page
The transaction page is visible to the customer and provider after a booking request. It shows the current status of the transaction - whether the booking is requested, accepted, declined, or expired. The customer and provider can also message. 
The transaction page can be accessed from the user's Inbox. 

Inbox
The Inbox is clicked into via the top bar. Every received booking appears in the "Teaching" inbox, while every made booking appears in the "Bookings" inbox. 


Transaction page - booking request, provider’s view
The provider sees transaction requests after the customer submits them. The provider can choose to accept or decline the request. If the provider does not react to the request within 7 days, it automatically expires. 

Transaction page -  booking accepted, provider’s view
The transaction page displays the latest status of the booking. When a provider accepts a booking, the customer's credit card is charged and held on Stripe account until the booking is completed.
Accepted booking can only be cancelled by marketplace operators in Yogatime. Cancelled booking will be fully refunded.

Transaction page -  booking completed, provider’s view
A transaction is automatically completed after the reserved booking period ends. The provider's earnings minus Yogatime’s 10% commission are paid out to their bank account. 
The users are prompted to review each other when a booking is completed.

Transaction page -  leave a review, provider’s view
Both the customer and provider can review each other in the 7 days following a completed booking. Reviews are not posted until each party has completed their review, or when the 7-day review period has ended. Posted reviews are shown on the listing page and on the user profile. 

Designing your marketplace’s user journey 

Yogatime offers a starting point for how users create listing profiles, discover providers, and transact on your custom service booking marketplace. Designing your own marketplace’s journeys helps developers understand how to modify this template starting point to build your custom marketplace. The next article guides you in creating your own user journey. 












