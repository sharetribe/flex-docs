---
title: Understanding transaction settings
slug: understanding-transaction-settings
updated: 2023-04-24
category: operator-guides-listings
ingress:
  Transaction settings are configured when you are creating your Listing type.
published: true
---


Transaction settings impact how providers create listings, how customers initiate transactions, and how those transactions happen. This article explains in detail how these settings work. 

## What are the different Transaction Settings?

You can define 2 types of transactions: Calendar Booking and Buying and selling products. These settings define what will be asked within the listing creation (and edit) form and the options when initiating a transaction. 

### Calendar booking

Calendar booking allows providers to set their availability and for buyers to book listings based on that availability. The Booking unit defines the availability management system.

 - Daily: Listings can be booked daily. If the start date is today and the end date is tomorrow, the customer is charged for two days. It covers the whole date in the calendar, so the booking dates cannot overlap. 

 - Nightly: Listings can be booked per night. If the start date is today and the end date is tomorrow, the customer is charged for one night. It doesn’t cover the whole date in the calendar. The end date of one booking and the start date of another booking can overlap. 

 - Hourly: Customer chooses a specific start time and end time within a specific date. Booking intervals are every hour. 

### Buying and selling products

Buying and selling products allows listing providers to set a specific stock on the listing, allowing buyers to only purchase from that available stock. Buyers may purchase multiple items of the same listing if available, but they cannot purchase more than the specified quantity set in stock. You can select the type of stock management that you want to allow in the marketplace. 

 - One item: Stock quantity is always 1. If an item is sold, it is no longer available to be purchased by other buyers. Listing authors cannot re-open the listing with extra stock. This type works well for marketplaces selling unique art or pre-owned goods.
 
 - Multiple items: The listing author can determine the number of items that are in stock. Buyers can buy several of these items up to the specified stock quantity.  The listing stays available for as long as there is stock. Listing authors can add more stock to their listings at any point. Works well for commercial product-selling marketplaces.
