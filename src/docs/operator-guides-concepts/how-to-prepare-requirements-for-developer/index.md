---
title: How to prepare requirements for a developer
slug: how-to-prepare-requirements-for-developer
updated: 2023-06-01
category: operator-guides-concepts
ingress:
   Prepare requirements as changes to Biketribe defaults for fast and efficient custom development
published: true   
---


Flex provides you with the complete freedom to build a completely unique marketplace. Using this guide, you can learn how to give your developers guidance on how you want your marketplace to work.

## Before defining your marketplace requirements 

Ideally, you should first explore the Sharetribe Web Template and the no-code tools in the Flex Console before defining your requirements for a developer. This will help you understand the starting capabilities of Flex and determine if you need additional changes that will require custom coding.

For example, you may have a unique design in mind that cannot be achieved through the no-code configurations in the Flex Console. In such cases, the custom design will need to be implemented by a developer. You can hire a designer to prepare your design or prepare it yourself using the [design files.](https://www.sharetribe.com/docs/design-toolkit/design-files/)

Another example is if you want to set up different commission rates for different providers on the marketplace. This requires a developer to make code changes to [your transaction process.](https://www.sharetribe.com/docs/concepts/change-transaction-process/).

In general, if you have any specific requirements or features that differ from the Biketribe default or what you can achieve with the no-code tools, it is essential to communicate these to the developer. This will ensure they can custom-build the marketplace to meet your specific needs and make any necessary code changes.


## Defining your requirements using the Sharetribe Web Template and the Flex Console

When you hire a developer, we recommend using the Sharetribe Web Template as a basis for the development work, especially if you're launching a marketplace for the first time, as it is the most time and cost-efficient approach. The Template features “Biketribe”, an example marketplace that can be customized to your unique needs. Developers download the codebase of the Template and modify it to meet your specific requirements, while your responsibility is to communicate these modification requirements to them clearly. 

To effectively leverage the Template, it's important to understand its capabilities. There are a few ways to gain this understanding:

- Access the Biketribe marketplace in the Test environment of your [Flex Console](https://flex-console.sharetribe.com/) to explore the default features, workflows, and design.
- [Install the template application yourself](https://www.sharetribe.com/docs/introduction/getting-started-with-web-template/), or have a developer do it for you.
- If you're comfortable working with design software like Sketch, Adobe XD, or Figma, you can download the [complete design files[(https://www.sharetribe.com/docs/design-toolkit/design-files/) of the Template and modify them to specify your custom design.

The Flex Console also provides you with no-code tools to make basic modifications to the starting template without any technical knowledge. For instance, you can edit the content on the landing page, configure listing types, and set the provider commission fee. 

You can test these capabilities by going to the Test environment in your Flex Console and selecting Build → Content. To get a complete overview of the no-code capabilities in the Flex Console, you can refer to [the Biketribe configuration checklist.](https://www.sharetribe.com/docs/operator-guides/biketribe-configuration-checklist).

## Types of features you can build with Flex

While it's not necessary to have every requirement fully fleshed out, it's a good idea to have at least some level of detail regarding the features and requirements you have for your marketplace. This will help developers understand the precise scope of your project and enable them to offer more accurate estimates of the costs and timeline involved in building your marketplace.

If you’re not entirely sure what kind of features can be built on Flex marketplaces, please check out the [custom feature knowledge base](https://www.sharetribe.com/docs/operator-guides/feature-knowledge-base/) that lists some examples of features commonly built on Flex. 

When it comes to requesting custom features for your Flex marketplace, they can generally be divided into four main categories, making it easier to understand and discuss.


- **Design (UI):** the design or user interface refers to how your marketplace looks and feels visually. It can encompass various things, such as the layout, colors, font, menus, buttons, listing cards, and many other elements that make up the overall aesthetics of the marketplace. Because you’re in complete control of your frontend application, you have full flexibility on what type of design you want to implement for your marketplace
- **Workflow (UX):** the workflow or user experience refers to the sequence of steps that users go through when performing an action to reach a goal in your marketplace. Workflow design involves [mapping out the user journey](https://www.sharetribe.com/docs/design-toolkit/your-user-journey-a-guide/) and optimizing the steps involved in achieving those goals. For example, what information do users need to fill in to sign up on your marketplace? How do users search for listings? For providers, what does the listing creation process look like? 
- **Transaction process:** when a customer and a provider connect with each other on a marketplace, they do it through a transaction. In Flex, the way the users connect and how they interact in the transaction process can be customized. For example, you might want to implement a negotiation feature that allows the customer and the provider to negotiate the price of an item before they agree on a sale. You might also want customers to be able to mark a service or product as delivered before the money from the payment is transferred to the seller. You can read [this documentation](https://www.sharetribe.com/docs/concepts/change-transaction-process/) for more tips on how to design your transaction process. 
- **Third-party integrations:** to enhance the user experience, you may want to connect and incorporate external services or tools into your marketplace’s functionality. These integrations expand the capabilities of the marketplace by leveraging specialized tools built by other software providers. For example, in an online coaching marketplace, you may want to integrate meeting software to allow users to host the meeting within the platform. If your marketplace revolves around selling products, you may consider integrating shipping software to give customers more shipping and carrier options when they purchase the product. 

While we have described four distinct categories of features that can be built on Flex, it's important to recognize that they are interconnected and work in harmony to deliver a seamless user experience. In fact, many features often require considerations across multiple of those four categories. For instance, let's consider the implementation of a negotiation feature within the transaction process between the customer and seller. Building such a feature requires considering not only the technical aspects but also the corresponding workflow. How will the negotiation unfold? Will users initiate the process by clicking a button or engaging in direct messaging? Is there a limit to the number of offers that can be made? Additionally, the visual representation of this negotiation process must be considered, incorporating specific design elements such as text, buttons, and layout. By carefully considering the interplay between these categories, you can ensure a cohesive and user-friendly marketplace experience.



