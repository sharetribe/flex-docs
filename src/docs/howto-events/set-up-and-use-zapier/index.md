---
title: Set up and use Zapier
slug: set-up-and-use-zapier
updated: 2023-12-01
category: how-to-events
ingress:
  This guide demonstrates how to connect Sharetribe to Zapier, gives a
  brief overview of the events and information made available to Zapier,
  and finally the possibilities a working Zapier integration holds.
published: true
---

## What is Zapier and why should you use it?

Your Sharetribe marketplace is built on top of APIs, which makes it
possible for your marketplace app to talk to other web applications.
Building third-party integrations is a great way to bring new features
to your marketplace, but until now, it still required advanced coding
skills to connect two apps.

With Zapier, you can connect your Sharetribe marketplace with more than
3,000 other web apps with just a few clicks. You can then build "Zaps",
which are automated workflows or sequences of actions that get kicked
off by a trigger. An event in one app can set in motion an action in a
second app and another action in a third app etc.

Once you’ve created a Zapier account and connected your Sharetribe
marketplace account, you can use nine different events in your
marketplace as a trigger for actions in other apps. Zapier can also
perform "search actions" in your marketplace data about users, listings
or transactions.

Together this allows you to create complex workflows based on things
happening in your marketplace. A new booking can trigger the sending of
a text message with Twilio. A new user sign-up can set into action a
campaign of drip emails in Mailchimp. A new listing can be automatically
posted to any of your marketplace’s social accounts. And so much more.

## Connecting Zapier to Sharetribe

<info>

The videos below mention Sharetribe Flex, which has since their
publication become just Sharetribe.

</info>

<iframe width="560" height="315" src="https://www.youtube.com/embed/zUp4eZufKsk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

To take Zapier into use and connect it to Sharetribe, you need:

- **An account at Zapier**. There is a free trial, but eventually, based
  on your usage, you may need a paid plan at Zapier.
- **A Client ID and a Client Secret for the Integration API**, which you
  need to authorize Zapier to connect to your Sharetribe account. You
  can create a Client ID and a Client Secret by adding a new application
  in Console > Build > Applications.
- **An account for each third-party app you’d like to connect with.**

### 1. Register a Zapier-account

1. Go to [www.zapier.com](https://www.zapier.com) and click on “Sign up”
   in the top right corner.
2. Choose your preferred method of signing up and follow the steps until
   you reach your Zapier Dashboard.

### 2. Create a new application with credentials in Sharetribe console

1. Go to
   [Console > Build > Applications](https://console.sharetribe.com/advanced/applications).
   Click on “+Add new”.
2. Fill in a name (e.g. "Zapier") and select _Integration API_
3. Copy the Client ID and the Client Secret somewhere secure before
   closing this modal. You will not be able to see it again! The client
   secret must be kept secure. Do not share it publicly. Sharetribe team
   will never ask you for your client secret.

### 3. Connect Zapier to Sharetribe

1. In your Zapier dashboard, go to "My Apps" and click "Add Connection"
2. In the Search bar, type in "Sharetribe", and select Sharetribe from
   the results. This will open up a new pop-up window to authorize
   access to Sharetribe.
3. Here, fill in the Client ID & Client Secret from the previous step
   and click "Yes, continue".
4. If the connection is successful, you'll be returned to a screen that
   shows you that you have a connection to your marketplace.

You can now connect Sharetribe to any other app that you connect to
Zapier.

## Which events can be used as triggers in Zapier?

Currently the integration supports nine different events across three
categories:

### Listing events

- `Listing created`: sent each time a listing is created
- `Listing updated`: sent each time a listing is updated. **Please note
  that in the default listing creation flow in Sharetribe Web Template,
  a new listing goes through several updates between the first draft and
  eventual publishing**. Be sure to check out Zapier's own
  [Filter app](https://zapier.com/apps/filter/integrations) to filter
  out the relevant ones.
- `Listing deleted`: sent each time a listing is deleted

### User events

- `User created`: sent each time a user is created
- `User updated`: sent each time a user is updated
- `User deleted`: sent each time a user is deleted

### Transaction events

- `Transaction initiated`: sent each time a transaction is initiated
- `Transaction transitioned`: sent each time a transaction transitions
  from one state to the next. What this means depends a lot on your own
  transaction flow.
- `Transaction updated`: sent each time a transaction is updated without
  a transition taking place.

### Which information is sent with each event?

Each event comes with a lot of information about the event, which you
can then use in the rest of the Zap. For example, the transaction event
contains information about when it was created, the customer id, the
provider id, the listing id, the amount that was paid and many more
things. Zapier can collect that information and send it to another app
in the Zap, to send a text message, or an email, or store it in a sheet,
for example.

You can read which information is available for each event in the
[API Reference Documentation](https://www.sharetribe.com/api-reference/)
and check the "resource format" for the event. Another easy way to check
is to just test out each in Zapier and see what information Zapier is
able to collect.

It is good to note that any extended data attributes only show up in
Zapier if they are present in the resource you are testing with. For
example, if you are testing phone number handling in a user event, you
can check in [Sharetribe Console](https://console.sharetribe.com/users)
to see whether the user has a phone number defined in the first place.
Since Zapier listens to events, it is useful to start any Zapier
development work by triggering an event with the specific test data you
need, so you know that your data has the necessary attributes.

## Which actions can Zapier take in my marketplace?

The Sharetribe-Zapier integration doesn't only send events to Zapier, it
can also receive commands from Zapier to perform "search actions" in
your marketplace, based on relevant ids. There are three different
search actions:

- `Show user`: shows information about a user based on a user ID (both
  providers & buyers)
- `Show listing`: shows information about a listing based on a listing
  ID
- `Show transaction`: shows information about a transaction based on a
  transaction ID.

Additionally, each of these has so-called relationships with other data,
which you can choose to include:

- `Show user`: can include `marketplace` (the name of your marketplace),
  `profile image` (url to the user's profile image) and `stripe account`
  (of the user).
- `Show listing`: can include `marketplace`, `author` (owner of the
  listing), `currentStock`, `images` the ordered list of listing images,
  if any.
- `Show transaction`: can include `marketplace`, `listing` (that the
  transaction is about), `provider` (of the listing), `customer` (who
  initiated the transaction), `booking` (created by the transaction, if
  any), `stockReservation`, (created by the transaction, if any),
  `reviews`(of the parties in the transaction), `messages` (messages
  that the parties have sent to one another as part of the transaction,
  if any)

All of the information can again be used in the rest of the Zap, for
example to insert in an email, or a Tweet etc.

## Some examples of what you can do with Zapier and Sharetribe

The above might all sound a bit dry and theoretical, so what does this
mean in practice? Here are some ideas:

- You can build a Zap with Twilio that sends a text message to the
  provider everytime a booking is made of their listing, containing
  information about who booked it and when.
  [Here's a Zap template](https://zapier.com/shared/10df518e77541354c78dd1c524cf28f59c774aaf)
  that you can use and adjust.
- You can add a new marketplace user to a Mailchimp audience.
  ([Zap template](https://zapier.com/shared/412d7744a23855ce00941567a619c7ffb7652335))
- You can automatically send each transaction to a Google Sheet
- You can expand on the existing email notifications by building your
  own email automation for certain actions
- You can automatically post all new listings on your marketplace to
  your social channels

## Zap templates

Zap templates are ready-made Zaps with the starting trigger and the
actions already defined, which you can then take into use. It does still
require you to sign in to all the services involved in the Zap and test
the different steps.

- [Send a text message to the provider for each new booking in a Sharetribe marketplace](https://zapier.com/shared/10df518e77541354c78dd1c524cf28f59c774aaf)
- [Add a new user in your Sharetribe marketplace to a Mailchimp audience](https://zapier.com/shared/412d7744a23855ce00941567a619c7ffb7652335)
- [Send a calendar invitation to the provider when a booking happens in a Sharetribe marketplace](https://zapier.com/shared/10df518e77541354c78dd1c524cf28f59c774aaf)

## Video tutorials

<info>

The videos below mention Sharetribe Flex, which has since their
publication become just Sharetribe.

</info>

### How to connect Sharetribe to Zapier

<iframe width="560" height="315" src="https://www.youtube.com/embed/zUp4eZufKsk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### How to send information from Sharetribe to Google Sheets using Zapier

<iframe width="560" height="315" src="https://www.youtube.com/embed/C8rdoLSsxiY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### How to build a text message integration in Sharetribe using Twilio and Zapier

<iframe width="560" height="315" src="https://www.youtube.com/embed/w2Dmw1x0c3E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
