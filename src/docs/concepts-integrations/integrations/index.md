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

## Flex integration tools

There are several ways to approach integrating third party tools to your
Flex marketplace. Which tool you choose within Flex depends on the
requirements of the third party tool you choose, and on the complexity
of the integration you are looking to create.

### Client application

The simplest integration tool is your client application. Since you have
full control over your marketplace client app, you can add analytics and
tracking tools such as Hotjar, or messaging tools such as Sendbird or
Intercom, directly into your client app code.

The FTW templates include a Node.js/Express server by default. Some
third party integrations require a secure context, or influence pricing,
such as Voucherify or other promotion integrations. For these types of
integrations, you can use the FTW server to create endpoints or other
logic in a secure way.

### Integration API

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
separate backend application. Here, too, the FTW server is an excellent
place to build your Integration API logic without revealing sensitive
information to the public web in your browser client code.

### Events

In addition to direct endpoints to marketplace resources, Integration
API also exposes events. The majority of activity on your marketplace
triggers events – users and listings created and updated, transactions
transitioned, and so forth. You can review
[the full list of supported event types](/references/events/#supported-event-types).

By listening to events, you can build flows where third party solutions
take action either in Flex or within the solutions themselves. You can
read more about
[reacting to events in Flex](https://www.sharetribe.com/docs/how-to/reacting-to-events/).

### Zapier

Sharetribe has also built a
[Zapier integration](/how-to/set-up-and-use-zapier/) to facilitate
integrating third-party tools to Flex. The Zapier integration works by
harnessing a subset of Flex events and allowing operators to connect any
of the other 5000+ tools and solutions that also have a Zapier
integration.

The Flex Zapier integration makes it easier to take action in your
favorite business tools, e.g. Hubspot, MailChimp and others, based on
your Flex marketplace activity. If you need to take action in Flex based
on activity in other solutions, however, you will need to use the
Integration API since Zapier cannot currently perform operations within
Flex.

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
different levels of complexity:

**Simple integrations:**

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

**More complex integrations**

- Listening to Flex events using your own polling tool and taking action
  within Flex

  - use cases: partial or complete payment gateway integrations

- Synchronizing Flex and a parallel system to update each other when any
  changes happen in either solution
  - use cases: calendar integration, Shopify

## Examples of specific integrations

### Hotjar analytics

[Hotjar](https://www.hotjar.com/) is an analytics tool for websites that
allows you to collect user activity heatmaps, feedback, and user
behavior recordings, among other features.

- Add a
  [tracking script to the client application](/ftw/how-to-set-up-analytics-for-ftw/#custom-analytics-libraries)
- Add custom CSP directives to
  [/server/csp.js](https://github.com/sharetribe/ftw-daily/blob/master/server/csp.js)

### Mailchimp email list

[Mailchimp](https://mailchimp.com/) is an email marketing and
automations tool that you can use to communicate directly with your
marketplace users. Since Mailchimp uses Zapier, integrating Flex and
Mailchimp is straightforward:

- Use the
  [sample Zapier template](https://zapier.com/shared/add-a-new-user-in-your-marketplace-to-a-mailchimp-audience/412d7744a23855ce00941567a619c7ffb7652335)
  for adding new users to your Mailchimp mailing lists.

### Twilio SMS

[Twilio](https://www.twilio.com/) is a communications platform that
offers multiple channels of communicating with your marketplace users,
including SMS and WhatsApp messages, calls and video. Twilio has a
Zapier integration, so you can use Zapier to trigger actions in Twilio
tools with no coding.

- Follow the
  [Flex video guide](/how-to/set-up-and-use-zapier/#how-to-build-a-text-message-integration-in-sharetribe-flex-using-twilio-and-zapier)
  to send providers a SMS message whenever their listing gets booked.

### Sendbird user-to-user chat app

In Flex, messages between users are always related to transactions. If
you want to allow more complex messaging flows between users, you can
integrate a user-to-user chat tool such as
[Sendbird](https://sendbird.com/). The initial integration is fairly
simple to implement, and the eventual complexity depends on the use
cases you want to cover.

- Add their [UI kit](https://sendbird.com/docs/uikit/v3/react/overview)
  and [SDK](https://sendbird.com/docs/chat/v4/javascript/overview)
- Implement and stylise a UI chat component
- Initialise a Sendbird user id for the user when they sign up to Flex,
  and save it in the user's private data so it can be used whenever they
  log in.

### Voucherify discount coupons

[Voucherify](https://www.voucherify.io/) is a promotions tool that
allows you to create, validate and redeem discount coupons, gift cards,
automatic discounts and other promotional offers. The initial
integration is fairly straightforward to implement, and the eventual
complexity depends on the use cases you want to cover.

- Create an account in Voucherify and create your own codes or use the
  existing ones
- Add [Voucherify SDK](https://docs.voucherify.io/docs/sdks)
- Create a helper file in the server that contains functions to validate
  and redeem a code using the Voucherify SDK
- Add an input element to ListingPage.js for the discount code
- Pass the discount code to line item calculation and to CheckoutPage
  (in a similar way to
  [this pricing tutorial](/tutorial/customize-pricing-tutorial/))
- Add a logic to lineItems.js that adds a discount line item with the
  correct percentage or amount if the code is valid.
  - You will need to decide whether the discount line item is included
    for both customer and provider (in which case the provider receives
    a decreased payout) or only for the customer (in which case the
    marketplace receives a decreased commission).
- Validate the code in endpoints for transaction-line-items,
  initiate-privileged and transition-privileged and pass the validation
  result to lineItems function
- Only redeem the code when initiating or transitioning the transaction
  without speculation

### Google Calendar synchronised with Flex availability calendar

If you run a booking marketplace, you may want to allow providers to
synchronize their own
[Google Calendar](https://developers.google.com/calendar) to their
listing's Flex availability calendar. That way, providers do not need to
add availability exceptions manually to Flex, and they will be able to
see any bookings in their own calendar without needing to visit the
marketplace. Like all two-way integrations, this is a complex one, and
you will need to specify the use cases you want to cover to determine
the full complexity of the integration.

- Google provides
  [Calendar API](https://developers.google.com/calendar/api) to modify
  calendar events
- You can set up
  [push notifications](https://developers.google.com/calendar/api/guides/push)
  to track changes on the Google side
- Authenticate your Flex app to get information and make changes on
  behalf of the user in Google Calendar
- Whenever a booking gets created or updated in Flex, update the
  provider's Google Calendar accordingly
  - You can do this either by creating custom endpoints in your client
    app server that call the Flex APIs as well as Calendar APIs
  - Or you can listen to Flex events and call the Calendar APIs on
    relevant events
- You can
  [watch the provider's Google Calendar](https://developers.google.com/calendar/api/v3/reference/events/watch),
  and whenever a new event is created or an existing one is removed,
  create or remove an
  [availability exception](https://www.sharetribe.com/api-reference/integration.html#availability-exceptions)
  in Flex to prevent other customers from booking that specific time
  slot.

### Payment gateway integration

Integrating a third-party payment gateway, such as
[Paypal Commerce Platform](https://www.paypal.com/us/business/platforms-and-marketplaces)
or [Stripe Billing](https://stripe.com/en-gb/billing), is a complex and
extensive integration. Even when you follow our high-level guide on
integrating a payment gateway, you will need to do a lot of your own
investigating and testing, as well as collaborate closely with the
support team of the payment gateway provider you have chosen.

- Contact the support team of the payment gateway tool you intend to
  use, and make sure you are eligible for their service.
- Get familiar with our how-to article on
  [integrating a third-party payment gateway to Flex](/how-to/how-to-integrate-3rd-party-payment-gateway/).
