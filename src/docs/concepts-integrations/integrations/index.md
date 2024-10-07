---
title: Introduction to integrations in Sharetribe
slug: integrations-introduction
updated: 2024-02-07
category: concepts-integrations
ingress:
  Sharetribe allows integrations with a vast range of third party tools
  and solutions. These tools can be integrated with Sharetribe by using
  Zapier, the Sharetribe Integration API, or the client application.
published: true
---

Integrations in Sharetribe refer to third-party solutions and tools that
communicate with the Sharetribe marketplace to either retrieve
information and take action outside Sharetribe, or trigger actions
within Sharetribe. A lot of features that are not natively available in
Sharetribe can be integrated with your marketplace solution with varying
degrees of complexity.

## Sharetribe integration tools

There are several ways to approach integrating third party tools with
your Sharetribe marketplace. Your integration options within Sharetribe
depend on the requirements of the third party tool you are integrating,
and on the complexity of the integration you are looking to create.

### Client application

The simplest integration tool is your client application. Since you have
full control over your marketplace client app, you can add analytics and
tracking tools such as [Hotjar](#hotjar-analytics) or
[Goole Analytics](/template/how-to-set-up-analytics-for-template/#configure-google-analytics),
or messaging tools such as [Sendbird](#sendbird-user-to-user-chat-app)
or
[Intercom](https://www.intercom.com/help/en/articles/168-install-intercom-on-your-website-to-support-and-onboard-logged-in-users),
directly into your client app code.

The Sharetribe Web Template includes a Node.js/Express server by
default. Some third party integrations, such as
[Voucherify](#voucherify-discount-coupons) or other promotion
integrations, may require a secure context. For these types of
integrations, you can use the template server to create endpoints or
other logic in a secure way.

### Integration API

If you want to create an integration where the third party solution
listens to – or takes action on – your Sharetribe marketplace, you will
likely need to use the
[Integration API](/introduction/getting-started-with-integration-api/).
Where the
[Marketplace API](/concepts/marketplace-api-integration-api/#when-to-use-the-marketplace-api)
is meant for everyday marketplace interactions, the Integration API
gives operators powerful access to all marketplace data and activity.
Through the Integration API, operators can enable third party tools to
manage users, listings, transactions, bookings, stock reservations, and
more.

Due to its powerful nature, the Integration API should **only ever be
used from a secure context**, such as your client application server or
a separate backend application. Here, too, the template server is an
excellent place to build your Integration API logic without revealing
sensitive information to the public web in your browser client code.

### Events

In addition to direct endpoints to marketplace resources, Integration
API also exposes events. The majority of activity on your marketplace
triggers events – users and listings created and updated, transactions
transitioned, and so forth. You can review
[the full list of supported event types](/references/events/#supported-event-types).

By listening to events, you can build flows where third party solutions
take action either in Sharetribe or within the solutions themselves. You
can read more about
[reacting to events in Sharetribe](https://www.sharetribe.com/docs/how-to/reacting-to-events/).

### Zapier

Sharetribe has also built a
[Zapier integration](https://www.sharetribe.com/help/en/collections/8975364) to facilitate
integrating third-party tools with Sharetribe. The Zapier integration
works by harnessing a subset of Sharetribe events and allowing operators
to connect any of the other
[5000+ tools and solutions](https://zapier.com/apps/) in the Zapier
ecosystem.

The Sharetribe Zapier integration makes it easier to take action in your
favorite business tools, such as
[Hubspot](https://zapier.com/apps/hubspot/integrations/),
[Mailchimp](https://zapier.com/apps/mailchimp/integrations/) and others,
based on your Sharetribe marketplace activity. The Sharetribe Zapier integration even allows you to [perform actions within Sharetribe](https://www.sharetribe.com/help/en/articles/8529989#h_7ccc6de359).

## Levels of integration

The complexity of a Sharetribe integration with a third party tool can
range from very simple to highly complex. One aspect determining the
complexity is how intertwined the two tools need to be. On the simple
end, adding a script to the client application for a tracking tool is a
trivial change, and on the complex end a full third party payment
gateway integration will likely take several weeks to implement.

The full complexity of the feature also depends on the different use
cases you need to cover on each side of the integration. For instance,
if you want to integrate your Sharetribe marketplace with Shopify and
synchronize listing stock between the two platforms, you will need to
cover several use cases on both sides, such as adding, updating and
removing listings, as well as handling purchases, returns and disputes.

For illustration, here are some examples of types of integrations with
different levels of complexity:

**Simple integrations:**

- Calling third party APIs and SDKs from your client application

  - use cases: uploading files to external storage, adding a messaging
    tool

- Adding a third-party script to your client application

  - use cases: integrating analytics providers

- Adding a custom endpoint in your client app server that calls a third
  party API and then updates information in Sharetribe using the
  Marketplace API or the Integration API

  - use cases: enabling downloadable content in listings

- Listening to Sharetribe events using Zapier and taking action in
  another Zapier-connected application
  - use cases: sending a text message of a new booking to providers
    using Twilio

**More complex integrations**

- Listening to Sharetribe events using your own polling tool and taking
  action within Sharetribe

  - use cases: partial or complete payment gateway integrations

- Synchronizing Sharetribe and a parallel system to update each other
  when any changes happen in either solution
  - use cases: calendar integration, Shopify

## Examples of specific integrations

### Hotjar analytics

[Hotjar](https://www.hotjar.com/) is an analytics tool for websites that
allows you to collect user activity heatmaps, feedback, and user
behavior recordings, among other features.

- Add a
  [tracking script to the client application](/template/how-to-set-up-analytics-for-template/#custom-analytics-libraries).
- Add custom CSP directives to
  [/server/csp.js](https://github.com/sharetribe/web-template/blob/main/server/csp.js).

### Mailchimp email list

[Mailchimp](https://mailchimp.com/) is an email marketing and
automations tool that you can use to communicate directly with your
marketplace users. Since Mailchimp uses Zapier, integrating Sharetribe
and Mailchimp is straightforward:

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
  [Sharetribe tutorial](https://www.sharetribe.com/help/en/articles/8788994)
  to send providers a SMS message whenever their listing gets booked.

### Sendbird user-to-user chat app

In Sharetribe, messages between users are always related to
transactions. If you want to allow more complex messaging flows between
users, you can integrate a user-to-user chat tool such as
[Sendbird](https://sendbird.com/). The initial integration is fairly
straightforward to implement, and the eventual complexity depends on the
use cases you want to cover.

- Create an account in Sendbird.
- Add the Sendbird
  [UI kit](https://sendbird.com/docs/uikit/v3/react/overview) and
  [SDK](https://sendbird.com/docs/chat/v4/javascript/overview).
- Implement and stylise a UI chat component.
- Initialise a Sendbird user id for the user when they sign up to
  Sharetribe, and save it in the user's private data so it can be used
  whenever they log in.

### Voucherify discount coupons

[Voucherify](https://www.voucherify.io/) is a promotions tool that
allows you to create, validate and redeem discount coupons, gift cards,
automatic discounts and other promotional offers. The initial
integration has a number of steps but is still fairly straightforward to
implement, and the eventual complexity depends on the use cases you want
to cover.

- Create an account in Voucherify and create your own codes or use the
  sample codes.
- Add [Voucherify SDK](https://docs.voucherify.io/docs/sdks).
- Create a helper file in the server that contains functions to validate
  and redeem a code using the Voucherify SDK.
- Add an input element to the order panel for the discount code.
- Pass the discount code to the line item calculation and to
  CheckoutPage (in a similar way to
  [this pricing tutorial](/tutorial/customize-pricing-tutorial/)).
- Validate the code in endpoints for _transaction-line-items_,
  _initiate-privileged_ and _transition-privileged_, and pass the
  validation result to _server/api-util/lineItems.js_.
- Add a logic to _server/api-util/lineItems.js_ that adds a discount
  line item with the correct percentage or amount if the code is valid.
  You will need to decide whether the discount line item is included
  - for both customer and provider, in which case the provider receives
    a decreased payout,
  - or only for the customer, in which case the marketplace receives a
    decreased commission – in this case, the discount cannot be greater
    than the marketplace commission from customer and provider combined.
- Only redeem the code once i.e. when actually initiating or
  transitioning the transaction with Marketplace API.

### Google Calendar synchronised with Sharetribe availability calendar

If you run a booking marketplace, you may want to allow providers to
synchronize their own
[Google Calendar](https://developers.google.com/calendar) to their
listing's Sharetribe availability calendar. That way, providers do not
need to add availability exceptions manually to Sharetribe, and they
will be able to see any bookings in their own calendar without needing
to visit the marketplace. Like all two-way integrations, this is a
complex one, and you will need to specify the use cases you want to
cover to determine the full complexity of the integration.

- Google provides
  [Calendar API](https://developers.google.com/calendar/api) to modify
  calendar events.
- You can set up
  [push notifications](https://developers.google.com/calendar/api/guides/push)
  to track changes on the Google side.
- Authenticate your Sharetribe app to get information and make changes
  on behalf of the user in Google Calendar.
- Whenever a booking gets created or updated in Sharetribe, update the
  provider's Google Calendar accordingly. You can do this either by
  - creating custom endpoints in your client app server that call the
    Sharetribe APIs as well as the Calendar APIs,
  - or you can listen to Sharetribe events and call the Calendar APIs on
    relevant events.
- You can
  [watch the provider's Google Calendar](https://developers.google.com/calendar/api/v3/reference/events/watch),
  and whenever a new event is created or an existing one is removed,
  create or remove an
  [availability exception](https://www.sharetribe.com/api-reference/integration.html#availability-exceptions)
  in Sharetribe to prevent other customers from booking that specific
  time slot.

### Payment gateway integration

Integrating a third-party payment gateway, such as
[Paypal Commerce Platform](https://www.paypal.com/us/business/platforms-and-marketplaces)
or [Stripe Billing](https://stripe.com/en-gb/billing), is a complex and
extensive integration. Even when you follow our high-level guide on
integrating a payment gateway, you will need to do a lot of your own
investigating and testing, as well as collaborate closely with the
support team of the payment gateway provider you have chosen.

- Contact the support team of the payment gateway tool you intend to
  use, and make sure you are eligible for their service. Some providers
  may have limitations regarding platform size or geography.
- Get familiar with our how-to article on
  [integrating a third-party payment gateway to Sharetribe](/how-to/how-to-integrate-3rd-party-payment-gateway/).
