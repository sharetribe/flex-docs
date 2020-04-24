---
title: User Journey
slug: user-journey
updated: 2020-04-22
category: design-toolkit
ingress: A user journey map illustrates the step by step process that users take to complete a task. A Flex user journey answers the question "How do users use the marketplace?"
published: true
---

Building your custom marketplace starts with defining the user journey through your marketplace; how providers and customers use your marketplace illustrates the platform you’re building. 

A user’s journey through a marketplace can be divided into three distinct processes: Content creation; Content discovery; and Transaction process. Content creation refers to the act of users—usually providers—creating listings that customers use to request a product or service. Content discovery concentrates on how customers find what they need. Finally, the transaction process stipulates how a customer and provider interact through a listing on the marketplace. 

Customer (buyer) - A user who registers to a marketplace to make purchases.
Provider (seller) - A user who sells or rents their products or services on a marketplace.

[Flex Templates for Web](/background/concepts/#flex-templates-for-web-ftw) are an efficient starting point for building your custom marketplace with Flex. They are open-sourced website applications that developers can modify per your unique requirements. The result is a custom-built marketplace without the cost or time required to build it from scratch. 	

One Flex Template for Web option depicts Saunatime, a fictional, Airbnb-style marketplace for renting saunas per day. To better understand your Flex starting point and how to customize it, let’s look at Saunatime’s content creation, content discovery, and transaction journeys in detail.


## Content Creation Journey

A marketplace is defined by its content: the types of users and listings communicate what your marketplace is all about. Listings, in particular, are crucial. They are the description of the product or service that a provider offers on the marketplace and, ultimately, serve as the initiation point for a transaction on your marketplace. Listings can take many forms, such as the storefront of a service provider, an experience itinerary, or a product page.


## Discovery Journey

The discovery journey depicts how users search and find listings in your marketplace. Starting on the landing page, users progressively narrow their search to find the service, rental, or product they need. Users might find what they need by searching nearby locations or via keywords. Results should be filtered by relevant criteria, like price or category.


## Transaction process

The transaction process concerns the booking or buying event that happens between the listing provider and the purchasing customer. Sharetribe Flex lets you extensively customize the rules and steps of your transaction process to govern how providers and customers capitalize on your marketplace. [Saunatime’s default process](https://www.sharetribe.com/docs/background/transaction-process/) mimics an Airbnb-style daily booking rental. 


## Designing your marketplace’s user journey 

As the development starting point, Saunatime’s user journeys are the default ways in which users create content, discover listings, and transact in Flex. Designing your marketplace’s journeys helps developers understand how to modify the template code to build your custom marketplace. The next article guides you in creating your own user journey. 

----
Add image files to directory: `src/docs/design-toolkit/user-journey`.
Use those images as
```md
![Alt text for the image (for the screen readers)](./the-name-of-the-image.png)
```

Provide a link to the assets file (in directory: `static/*`):

```
- [sample-template-context.json](/sample-template-context.json)
- [CottageDays mobile logo](/tutorial-assets/cottagedays-logo-small.png)
```
- [sample-template-context.json](/sample-template-context.json)
- [CottageDays mobile logo](/tutorial-assets/cottagedays-logo-small.png)



**Read more about Markdown syntax**:<br />
https://www.gatsbyjs.org/docs/mdx/markdown-syntax/

**extrainfo** component provides one additional syntax option on top of markdown:
```md
<extrainfo title="Some title?">

Content that is only visible if the title is clicked.

</extrainfo>
```
<extrainfo title="Some title?">

Content that is only visible if the title is clicked.

</extrainfo>
