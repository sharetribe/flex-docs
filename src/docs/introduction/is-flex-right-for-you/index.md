---
title: Is Flex the right fit for you?
slug: is-flex-right-for-you
updated: 2021-09-21
category: introduction
ingress:
  The purpose of this article is to give you a general overview of
  whether Flex is a good solution for building your specific marketplace
  idea.
published: true
---

## Marketplaces

Flex is a software solution for building marketplaces. Marketplaces are
platforms that match supply and demand and typically facilitate
transactions between them. The operator of the marketplace typically
doesn't own the inventory but instead invites a large number of
providers to offer their services to their customers through the
marketplace.

Flex is not the right solution if your idea is to build an e-commerce
store for selling products. Flex is also not the right fit if your
concept is a discussion forum or a social network.

Some marketplace types are faster to build with Flex than others. We're
going to look into this next.

## Marketplaces for services, rentals and experiences

**Flex functionality has been built with specific focus on for
marketplaces for selling services, renting products or spaces, or
offering various experiences.**

These marketplaces can be either C2C ("Customer-to-Customer", also
called peer-to-peer – individuals selling to other individuals), B2C
("Business-to-Customer", businesses selling to individuals) or B2B
("Business-to-Business", businesses selling to other businesses), or any
combination of them. Your Flex marketplace can be a website or a mobile
app or even have both.

With Flex, you can build your own marketplace that is similar to, for
example, one of these popular platforms:

- [Airbnb](https://www.airbnb.com/) – short term apartment rentals (C2C,
  B2C)
- [EatWith](https://www.eatwith.com/) – book seats to dinner parties
  organized by home cooks (C2C, B2C)
- [EquipmentShare](https://www.equipmentshare.com/) – rent construction
  equipment (B2B)
- [Fiverr](https://www.fiverr.com/) – hire freelance designers,
  developers, or other knowledge workers (B2C)
- [Getaround](https://www.getaround.com/) – rent cars from people around
  you (C2C)
- [Handy](https://www.handy.com) – find a home cleaner or a handyman
  (B2C)
- [Rover.com](https://www.rover.com/) – find a pet sitter or a dog
  walker (C2C, B2C)
- [Storefront](https://www.thestorefront.com/) – rent retail space from
  other businesses (B2B)
- [Treatwell ](https://www.treatwell.co.uk/)– book appointments with
  hairdressers and beauty professionals (B2C)
- [UrbanSitter](https://www.urbansitter.com/) – find a babysitter (B2C)

Building such a platform with Flex is very fast, as you can start from
example templates – either from
[FTW-daily](https://github.com/sharetribe/ftw-daily), an example of a
rental marketplace, or from
[FTW-hourly](https://github.com/sharetribe/ftw-hourly), an example of a
service marketplace.

## Marketplaces for selling physical or digital products

You can use [FTW-product](https://github.com/sharetribe/ftw-product) for
building a marketplace for selling physical products. It has stock
management included and it asks shipping address from customer and shows
that to provider. However, it doesn't include shopping cart feature by
default. Shopping cart would require changes to payment process.

It's possible to build a marketplace that sells digital products, but
you will need to do some custom development to integrate a system for
storing these files.

## Regular marketplaces and reverse marketplaces

A typical service, rental or event marketplace has the following
workflow: first, the service providers build their profiles and list
their service offerings. The customers search the site, browse and
compare different providers, choose the one they like, book a slot from
their calendar, and pay. Alternatively, the customer might contact one
of the providers (or several of them) and start a negotiation process to
determine the final price. This is how all the 10 popular marketplaces
listed above work. Flex works great for all these use cases.

Some marketplaces have another kind of workflow, which can be called a
"reverse marketplace". Popular reverse marketplaces include
[Thumbtack](https://www.thumbtack.com/) and
[Upwork](https://www.upwork.com/).

In these marketplaces, it's the providers who do the searching. The
customers start by creating a post that describes their requirements.
The service providers browse these posts and bid on some of them. The
customer then chooses one of the bids and starts working with the
provider in question, eventually making a payment based on the invoice
they provide.

**If you're building a reverse marketplace, it's possible to achieve it
with Flex, but it takes a lot more custom development work, compared to
building a regular marketplace.** The reverse workflow is quite
different from the regular flow, and it affects the entire design of
your platform.

To learn more about the differences between regular and reverse
marketplaces, take a look at
[an article on how to design the booking flow of your service marketplace](https://www.sharetribe.com/academy/design-booking-flow-service-marketplace/).

## Country support

You can use Flex in any country around the world. However, **if you want
to use the Flex default payment system to process online payments, your
platform and all your providers need to be in one of the
[countries supported by Stripe Platform Accounts](https://stripe.com/docs/connect/custom-accounts#requirements)**.
You can have customers in countries that Stripe doesn't support, but if
providers need to receive money from your platform, they have to be in a
Stripe-supported country.

If you or some of your providers are not in a Stripe-supported country,
it's possible for you to integrate your own payment gateway to Flex.
However, this requires quite a lot of custom development work.

## Are you ready for Flex?

If you've read everything above and concluded that your marketplace
concept matches the focus of Flex, there's one more thing to consider:
are you currently at a stage where you need Flex?

You need to do some custom development work to launch your marketplace
with Flex. If you're a developer or have one in your team, you can do
this yourself. If that's not the case, you need to hire a developer to
do this work. In this case, the minimum budget for building your MVP
(Minimum Viable Platform) with Flex is around \$5,000 (and depending on
your exact requirements, the cost could be a lot more – for instance,
for reverse marketplaces the minimum is probably closer to \$10,000).
Typically, it takes 1–2 months from the day you start development to
launch your MVP.

If you're not ready to invest in hiring a developer, Flex is not the
right solution for you. Instead, you could try out Sharetribe Go, which
is free to test for the first 30 days, and after that its pricing starts
at \$79 per month. With Sharetribe Go, you can build your MVP in one
day, without technical skills. It doesn't have the same flexibility than
Flex, but in many situations, it can be a good way to get started
quickly and to
[validate your business idea.](https://www.sharetribe.com/academy/how-to-validate-your-marketplace-idea-before-building-the-platform/)

If you have already tried Sharetribe Go and concluded that it's not
enough for your needs, then it might be time to get started with Flex.
In that case, you can continue by reading about
[how to build and launch your marketplace with Flex](/introduction/how-to-build-and-launch-with-flex/).

If you have more specific questions on whether Flex can support certain
features or workflows before getting started,
[contact Sharetribe support](mailto:flex-support@sharetribe.com) or
[book a call with one of Customer Success Experts](https://calendly.com/welcome-to-flex/welcome-call?utm_campaign=ifrfy&utm_source=flex-docs)
to discuss your concept.
