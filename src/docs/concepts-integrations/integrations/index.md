---
title: Introduction to integrations in Flex
slug: integrations-introduction
updated: 2022-10-05
category: concepts-integrations
ingress:
  Flex allows integrations to a vast range of third party tools and
  solutions. These tools can be integrated to Flex by using Zapier, the
  Flex Integration API, or the client application.
published: true
---

Integrations in Flex refer to third-party solutions and tools that
communicate with the Flex marketplace to either retrieve information and
take action outside Flex, or trigger actions within Flex. A lot of
features that are not natively available in Flex can be integrated to
your marketplace solution with varying degrees of complexity.

[Integrations](https://www.sharetribe.com/docs/operator-guides/features/#integrations)

## Flex integration tools

There are several ways to approach integrating third party tools to your
Flex marketplace. The simplest integration tool is your client
application. Since you have full control over your marketplace client
app, you can for instance add analytics and tracking tools such as
Hotjar directly into your client app code.

If you want to create an integration where the third party solution
listens to, or takes action on, the Flex marketplace data, you will
likely need to use the Integration API. Where Marketplace API is meant
for everyday marketplace interactions, Integration API provides
operators powerful access to all marketplace data and activity. Through
Integration API, operators can enable third party tools to create and
update listings, update users, and manage transactions, bookings and
stock reservations.

Due to its powerful nature, Integration API should only ever be used
from a secure context, such as your client application server or a
separate backend application. The FTW templates include a
Node.js/Express server, which is an excellent place to build your
Integration API logic without revealing sensitive information to the
public web in your browser client code.

In addition to direct endpoints to marketplace resources, Integration
API also exposes events. The majority of activity on your marketplace
triggers events – users and listings created and updated, transactions
transitioned, and so forth. You can review
[the full list of supported event types](/references/events/#supported-event-types).
By listening to events, you can build flows where third party solutions
take action either in Flex or within the solutions themselves.

Sharetribe has also built a
[Zapier integration](/how-to/set-up-and-use-zapier/) to facilitate
integrating third-party tools to Flex. The Zapier integration works by
harnessing a subset of Flex events and allowing operators to connect any
of the other 5000+ tools and solutions that also have a Zapier
integration. The Flex Zapier integration makes it easier to take action
in your favorite business tools, e.g. Hubspot, MailChimp and others,
based on your Flex marketplace activity. If you need to take action in
Flex based on activity in other solutions, however, you will need to use
the Integration API since Zapier cannot currently perform operations
within Flex.

## Levels of integration

The complexity of a Flex integration to a third party tool can range
from very simple to highly complex. One aspect determining the
complexity is how intertwined the two tools need to be. On the simple
end, adding a script to the client application for a tracking tool is a
trivial change, and on the complex end a full third party payment
gateway integration will likely take several weeks to implement.

The full complexity of the feature depends on the different use cases
you need to cover on each side of the integration. If you are using the
Zapier integration to listen to user events and passing the information
to Hubspot, you may still need to build complex workflows on Hubspot
side for the integration to cover your use case. Or if you want to
integrate your Flex marketplace with Shopify and synchronize listing
stock between the two platforms, you may need to cover several use cases
on both sides – adding, updating and removing listings, and handling
purchases, returns and disputes.

For illustration, here are some examples of types of integrations with
increasing levels of complexity:

### Examples of simple integrations

- Calling third party APIs and SDKs from your client application
  - use cases: uploading files to external storage, adding a messaging
    tool
- Adding a third-party script to your client application
  - use cases: integrating analytics providers
- Adding a custom endpoint in your client app server that calls a third
  party API and then updates information in Flex using Marketplace API
  or Integration API
  - use cases: enabling downloadable content in listings
- Listening to Flex events using Zapier and taking action in another
  Zapier-connected application
  - use cases: sending a text message of a new booking to providers
    using Twilio

### Examples of more complex integrations

- Listening to Flex events using your own polling tool and taking action
  within Flex
  - use cases: partial or complete payment gateway integrations
- Synchronizing Flex and a parallel system to update each other when any
  changes happen in either solution
  - use cases: calendar integration, Shopify

## Examples of specific integrations

- Hotjar:
  - add tracking script and modify csp
  - complexity: very simple
- Add your marketplace users to a Mailchimp mailing list:
  - [Zapier template](https://zapier.com/shared/add-a-new-user-in-your-marketplace-to-a-mailchimp-audience/412d7744a23855ce00941567a619c7ffb7652335)
  - complexity: fairly simple
- Send SMS to providers when they have a pending booking request:
  - [Zapier template](https://zapier.com/shared/send-a-text-message-to-the-provider-for-each-new-booking-in-a-flex-marketplace/10df518e77541354c78dd1c524cf28f59c774aaf)
  - complexity: fairly simple
- [Sendbird](https://sendbird.com/) user-to-user chat app:
  - add their
    [UI kit](https://sendbird.com/docs/uikit/v3/react/overview) and
    [SDK](https://sendbird.com/docs/chat/v4/javascript/overview),
    implement a component, initialise a user id for the user when they
    first use the chat and save it in the user's private data, stylise
    the UI component
  - complexity: fairly simple to moderate – the initial integration is
    easy to implement, and then the eventual complexity depends on the
    use cases you want to cover
- Voucherify
  - Create an account in [Voucherify](https://www.voucherify.io/) and
    create your own codes or use the existing ones
  - Add [Voucherify SDK](https://docs.voucherify.io/docs/sdks)
  - Create a helper file in the server that contains functions to
    validate and redeem a code using the Voucherify SDK
  - Add an input element to ListingPage.js for the discount code
  - Pass the discount code to line item calculation and to CheckoutPage
    (in a similar way to
    [this pricing tutorial](/tutorial/customize-pricing-tutorial/))
  - Add a logic to lineItems.js that adds a discount line item with the
    correct percentage or amount if the code is valid
  - Validate the code in endpoints for transaction-line-items,
    initiate-privileged and transition-privileged and pass the
    validation result to lineItems function
  - Only redeem the code when initiating or transitioning the
    transaction without speculation
- Google Calendar to Flex availability calendar two-way integration
  - Google providers
    [Calendar API](https://developers.google.com/calendar/api) to modify
    calendar events
  - You can set up
    [push notifications](https://developers.google.com/calendar/api/guides/push)
    to track changes on the Google side
  - Authenticate your Flex app to get information and make changes on
    behalf of the user in Google Calendar
  - Whenever a booking gets created or updated in Flex, update the
    Google Calendar accordingly
  - Whenever an event is created in Google Calendar, create an
    availability exception in Flex
  - Complexity: complex
- Payment gateway integration
  - [how-to article](/how-to/how-to-integrate-3rd-party-payment-gateway/)
  - complexity: complex
