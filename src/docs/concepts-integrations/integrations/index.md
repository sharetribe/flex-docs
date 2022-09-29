---
title: Introduction to integrations in Flex
slug: integrations-introduction
updated: 2022-10-05
category: concepts-integrations
ingress:
  Flex allows integrations to a vast range of third party tools and
  solutions. These tools can be integrated to Flex either using Zapier
  or the Flex Integration API.
published: true
---

Integrations in Flex refer to third-party solutions and tools that
communicate with the Flex marketplace to either retrieve information and
take action outside Flex, or trigger actions within Flex. A lot of
features that are not natively available in Flex can be integrated to
your marketplace solution with varying degrees of complexity.

[Integrations](https://www.sharetribe.com/docs/operator-guides/features/#integrations)

- Examples of integrations
- Integration tools (integration API, events & zapier)
  - Integration API allows operators to modify all marketplace data
  - One aspect of Integration API is events – everything that happens in
    a Flex marketplace triggers an event, and you can create very
    complex integrations by reacting to those events in a reasonable way
- High-level portrayals of specific integrations
  - Hotjar: add tracking script and modify csp
  - [Sendbird](https://sendbird.com/) user-to-user chat app: add their
    [UI kit](https://sendbird.com/docs/uikit/v3/react/overview) and
    [SDK](https://sendbird.com/docs/chat/v4/javascript/overview),
    implement a component, initialise a user id for the user when they
    first use the chat and save it in the user's private data, stylise
    the UI component
  - Add your marketplace users to a Mailchimp mailing list and connect
    with your community:
    [Zapier template](https://zapier.com/shared/add-a-new-user-in-your-marketplace-to-a-mailchimp-audience/412d7744a23855ce00941567a619c7ffb7652335)
  - Send SMS to providers when they have a pending booking request:
    [Zapier template](https://zapier.com/shared/send-a-text-message-to-the-provider-for-each-new-booking-in-a-flex-marketplace/10df518e77541354c78dd1c524cf28f59c774aaf)
  - Voucherify – TODO create a proof of concept with line item handling
    (cooldown?)
  - Payment gateway integration –
    [how-to article](/how-to/how-to-integrate-3rd-party-payment-gateway/)
- Levels of integration ⇒ how intertwined will your systems be – the
  full complexity depends on both the Flex side and the other tool side
  i.e. something can be fairly easy to add to Flex but complex to build
  on the 3rd party tool side.
  - Very simple: calling 3rd party APIs and SDKs from your client
    application, e.g. uploading files to external storage and attaching
    their URLs to listing extended data, or adding a messaging tool;
    adding a script to your client app cf Hotjar analytics
  - Fairly simple: adding an endpoint to your client app server that
    calls a 3rd party API, then calls Integration API to take action in
    Flex, and returns certain information (e.g. enabling downloadable
    products)
  - Very to fairly simple: listening to Flex events using Zapier and
    taking action in another Zapier-connected application
  - Fairly simple to complex: Listening to Flex events using your own
    polling tool and taking action within Flex, e.g. payment gateway
    integrations.
  - Complex: Synchronizing Flex and a parallel system to update each
    other when any changes happen in either solution (e.g. calendar
    integration, Shopify)

## Zapier integrations

With our Zapier integration, you can connect your Flex marketplace with
more than 3,000 other web apps with just a few clicks. You can then
build "Zaps", which are automated workflows or sequences of actions that
get kicked off by a trigger. An event in one app can set in motion an
action in a second app and another action in a third app etc.

Once you’ve created a Zapier account and connected your Flex marketplace
account, you can use nine different events in your marketplace as a
trigger for actions in other apps. Zapier can also perform "search
actions" in your marketplace data about users, listings or transactions.

Together this allows you to create complex workflows based on things
happening in your marketplace. A new booking or order can trigger the
sending of a text message with Twilio. A new user sign-up can set into
action a campaign of drip emails in Mailchimp. A new listing can be
automatically posted to any of your marketplace’s social accounts. And
so much more.
