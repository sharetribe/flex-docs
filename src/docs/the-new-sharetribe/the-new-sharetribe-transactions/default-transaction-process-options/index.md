---
title: Default transaction process options
slug: default-transaction-process-options
updated: 2023-06-14
category: the-new-sharetribe-transactions
ingress:
  Illustrated guide of the options buyers and sellers have with the
  default transaction process.
published: true
---

There are two default processes available with Sharetribe: one for
hourly or daily bookings with an availability calendar, and another for
buying and selling products. All these processes are explained below in
detail, along with screenshots. Note that the processes are very
similar, so it is enough for you to read the section(s) relevant to your
own marketplace.

## Calendar Booking Process with Daily and Hourly Bookings

### 1. Booking a listing as a buyer

In Sharetribe, users can book services or items that are available for
specific time slots using the calendar booking function. This process
includes the functionality for booking a service or rental that can be
booked for one or multiple days or hours, such as a car rental or a trip
with a tour guide. In the example below, we assume that the users are
already logged in.

To make a booking, the user will (1) browse the listings and click on
the desired item or service. Then, they will (2) select their preferred
booking duration from the provided calendar, and see the price (3) for
booking the listing for those days. Once selected, they proceed by
clicking on (4) "Request to book".

The user is then taken to a separate booking page, where they are able
to choose their payment method (5) and add additional information
regarding the booking as a message (6). They also see the total price of
the booking. When they are ready, they will click on “Confirm booking
request” (7). They then get to the final page, where the booking request
is confirmed (8), and there’s the option to send further messages if
needed (9).

You can see screenshots of the different steps below.

<extrainfo title="Step 1: Buyer browsing">

![Change environments](./01-buyer-browsing.png)

</extrainfo>

<extrainfo title="Steps 2-4: Buyer looking at listing view">

![Change environments](./02-buyer-listingview.png)

</extrainfo>

<extrainfo title="Steps 5-7: Buyer on the checkout page">

![Change environments](./03-buyer-checkout.png)

</extrainfo>

<extrainfo title="Steps 8-9: Buyer after checking out">

![Change environments](./04-buyer-checkout-success.png)

</extrainfo>

### 2. Approving or rejecting the request as a seller

Once a booking request is made, the seller has the authority to approve
or reject the request. Sellers receive a notification for each booking
request both via email as well as on the marketplace as a notification,
and can review it before deciding. If the seller doesn't respond within
the specified timeframe, the booking request will expire automatically.
This ensures that buyers aren't left hanging and can quickly seek out
alternatives.

When a seller receives a booking, they will get an email notification
and see a red notification on their marketplace interface near the inbox
button (1). Within the inbox, they have the option of seeing all the
bookings and booking requests in the seller inbox (2). They can access
the newest request by clicking on it (3).

This takes them to the same kind of booking page as the buyer. Here they
can also see the price breakdown including the marketplace fee (4), and
either accept (5) or decline (6) the request. The seller can also send a
message (7) to the buyer before or after accepting/rejecting the
request.

When accepting or declining the request, the conversation thread is
updated (8). Both the seller and the buyer can still exchange messages
in the conversation thread (9).

On the buyer’s side, they will be able to see that the booking request
has been accepted(10), and continue sending messages if needed (11).

You can see the screenshots of these steps below.

<extrainfo title="Step 1: Seller notification">

![Change environments](./05-seller-notification.png)

</extrainfo>

<extrainfo title="Steps 2-3: Seller looking at their inbox">

![Change environments](./06-seller-inbox.png)

</extrainfo>

<extrainfo title="Steps 4-7: Seller looking at the transaction thread">

![Change environments](./07-seller-transactionthread.png)

</extrainfo>

<extrainfo title="Steps 8-9: Seller's transaction thread after accepting the request">

![Change environments](./08-seller-accepted.png)

</extrainfo>

<extrainfo title="Steps 10-11: Buyer's transaction thread after seller has accepted the request">

![Change environments](./09-buyer-accepted.png)

</extrainfo>

### 3. Holding the payment (escrow) and payout to the seller

Sharetribe provides a secure system for payments. When a booking is
made, the payment is held in escrow until the service or item is
delivered. After the delivery, and the confirmation from the buyer, the
payment is released to the seller. This creates trust and assurance
between parties involved in the transaction.

The default transaction process captures the funds immediately from the
buyer’s credit card when they are making the booking request. The
reservation is then converted to a charge once the seller accepts the
request. The funds are then held by Stripe until the booking period has
passed, and the buyer has confirmed that the booking passed as expected.
After this, the funds are released to the seller, who will receive the
payment within 1-2 weeks.

### Operator actions

Sharetribe allows you to act on behalf of your users if needed. In the
default booking transaction process, there are four options: accepting
or declining a purchase request, and marking it as completed or
cancelled on the user’s behalf (12). Cancelling the transaction includes
refunding the Stripe payment.

These actions are taken from the Console. You need to navigate to the
transaction in question, and then choose the action from the right hand
side (13). The transaction needs to be in the appropriate stage for
these options to become available, and you need to confirm the action
you are taking through a separate window (14). Whenever you move the
transaction forward, you can see confirmation that the operation was
successful from the timeline and activity logs (15).

You can see illustrations of the process below.

<extrainfo title="Step 12 (optional): available operator actions in the transaction process">

![Change environments](./10-transaction-process-operator-actions.png)

</extrainfo>

<extrainfo title="Step 13: Choose the operator action (here, we choose 'accept')">

![Change environments](./11-operator-actions-accept.png)

</extrainfo>

<extrainfo title="Step 14: Confirm the operator action">

![Change environments](./12-operator-actions-accept-confirm.png)

</extrainfo>

<extrainfo title="Step 13 (again): Choose the operator action (here, we choose 'operator complete')">

![Change environments](./13-operator-actions-complete.png)

</extrainfo>

<extrainfo title="Step 14 (again): Confirm the operator action">

![Change environments](./14-operator-actions-complete-confirm.png)

</extrainfo>

<extrainfo title="Step 15: See the completed transitions in the timeline and activity log">

![Change environments](./15-operator-actions-operator-actions-done.png)

</extrainfo>

## Buying and Selling Products Process

### 1. Purchasing a product as a buyer

Sharetribe marketplaces can be used as product marketplaces as well. It
is possible to make purchases of different types and quantities, such as
an order of one or more t-shirts, or digital files. In the example
below, which is a bike selling marketplace, we assume that the users are
already logged in.

In cases where there's only one item in stock, a buyer can purchase it
instantly by clicking the "Buy Now" button (1). If the item only has one
delivery method, that one is chosen by default. Otherwise, users can use
a drop-down selector to choose between pickup and shipping (2). When the
buyer has chosen their delivery method and clicked on the buy now
button, the single item is then added to their shopping cart, and the
buyer can proceed to checkout.

The checkout process looks different depending on the delivery method.
If shipping was chosen, the users will see a screen where they can
select their shipping address (1), payment method (2), send additional
information as a message (3), and see the price breakdown with the
shipping cost included (4).

When using the pickup delivery method, the checkout screen is a bit
different. Here, the user will see the pickup address (5), payment
method selection (6), the option to add additional information as a
message (7), and the price breakdown (8). Here, we use the pickup
delivery method so we click on “Confirm and pay” button (9). After this,
we see the transaction page where further messages can be exchanged (10)
and we get the option to mark the bike as received (11).

The pricing of a single item stock is determined by the seller and
displayed on the listing page. A shipping fee is added to the price if
one is specified by the seller. With both pickup and shipping, buyers
can review the price on both the purchase and checkout screens before
deciding to make a purchase.

With a stock quantity of 1 in a listing, once the item has been
purchased, the listing automatically closes to prevent additional
purchases. This ensures that there are no over-sales.

You can see screenshots of the different steps below.

<extrainfo title="Steps 1-2: Buyer selecting delivery method">

![Change environments](./16-buyer-selecting-delivery.png)

</extrainfo>

<extrainfo title="Steps 3-6: Buyer checkout with shipping as delivery method">

![Change environments](./17-buyer-shipping-checkout.png)

</extrainfo>

<extrainfo title="Steps 5-9: Buyer checkout with pickup as delivery method">

![Change environments](./18-buyer-pickup-checkout.png)

</extrainfo>

<extrainfo title="Steps 10-11: Buyer checked out successfully">

![Change environments](./19-buyer-booking-success.png)

</extrainfo>

### 2. Processing the purchase as a seller

Once a purchase is made, sellers receive a notification both via email
as well as on the marketplace as a notification. They can review the
details and prepare the product for shipment, delivery, or pickup as
needed.

Within the inbox, sellers have the option of seeing all the purchases in
the seller inbox. They can access the newest purchase by clicking on it
(1).

This takes them to the same kind of transaction page as the buyer. Here
they can also see the price breakdown including the marketplace fee (2)
as well as shipping details, if applicable. The seller can also send a
message (3) to the buyer and mark the bike as delivered (4). After
selling the listing, the seller sees a confirmation page (5).

On the buyer’s side, they will be able to see that the purchase has been
accepted, continue sending messages if needed and mark the bike as
delivered (6). After the buyer has marked the listing as received, both
parties can write reviews (7).

You can see the screenshots of these steps below.

<extrainfo title="Step 1: Seller in their inbox">

![Change environments](./20-seller-inbox.png)

</extrainfo>

<extrainfo title="Steps 2-4: Seller at the transaction page">

![Change environments](./21-seller-transactionthread.png)

</extrainfo>

<extrainfo title="Step 5: Seller marked the bike as delivered">

![Change environments](./22-seller-delivered.png)

</extrainfo>

<extrainfo title="Step 6: Buyer sees update and marks bike as received">

![Change environments](./23-buyer-receiving.png)

</extrainfo>

<extrainfo title="Step 7: After marking the bike as delivered/received, users can leave each other a review">

![Change environments](./24-buyer-received.png)

</extrainfo>

### 3. Holding the payment (escrow) and payout to the seller

Sharetribe provides a secure system for payments. When a purchase is
made, the payment is held in escrow until the buyer marks the
transaction as completed. After the buyer does this, the payment is
released to the seller. This creates trust and assurance between parties
involved in the transaction.

The default transaction process captures the funds immediately from the
buyer’s credit card when they are making the purchase. The reservation
is then converted to a charge once the seller accepts the request. The
funds are then held by Stripe until the purchase period has passed.
After 2 days have passed from the end of the booking, the funds are
released to the seller, who will receive the payment within 1-2 weeks.

## Operator actions

Sharetribe allows you to act on behalf of your users if needed. In the
default product purchase transaction process, there are three options
(8): cancelling a transaction after it has been purchased; and either
cancelling the transaction or marking it as received after a dispute has
occurred. Cancelling the transaction includes refunding the Stripe
payment in both cases.

These actions are taken from the Console. You need to navigate to the
transaction in question, and then choose the action from the right hand
side (9). The transaction needs to be in the appropriate stage for these
options to become available, and you need to confirm the action you are
taking through a separate window (10). Whenever you move the transaction
forward, you can see confirmation that the operation was successful from
the timeline and activity logs (11).

You can see illustrations of the process below.

<extrainfo title="Step 8 (optional): available operator actions in the transaction process">

![Change environments](./25-transaction-process-operator-actions.png)

</extrainfo>

<extrainfo title="Step 9: Choose the operator action (here, we choose 'cancel')">

![Change environments](./26-operator-actions-cancel.png)

</extrainfo>

<extrainfo title="Step 10: Confirm the operator action">

![Change environments](./27-operator-actions-cancel-confirm.png)

</extrainfo>

<extrainfo title="Step 11: See the completed transition in the timeline and activity log">

![Change environments](./28-operator-actions-cancel-done.png)

</extrainfo>