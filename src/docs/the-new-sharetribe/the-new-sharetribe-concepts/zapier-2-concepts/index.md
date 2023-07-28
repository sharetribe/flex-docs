---
title: Understanding how Zapier works with your Sharetribe marketplace
slug: zapier-2-concepts
updated: 2023-07-28
category: the-new-sharetribe-concepts
ingress: We discuss Zapier in the context of Sharetribe in more detail.
published: true
---

Welcome to the second edition of our Zapier guide! In case you haven’t
done so already, please take a look at Part 1: Introducing Sharetribe
and Zapier. It contains a lot of useful information, especially if you
haven’t used Zapier before. In this guide, we’ll explore some of the
concepts introduced in Part 1 in this guide, such as events.

## How Events bring your Zapier integration to life

As we discussed in the last article, Zapier works with things called
‘events’. In the context of a Sharetribe marketplace, an ‘event’ is
something that happens on your Sharetribe marketplace. This could be a
new listing being created, a user updating their profile, or a
transaction being initiated, among other things.

These events are important because they serve as triggers for Zapier.
Think of them like a domino chain - when an event (the first domino)
occurs in your Sharetribe marketplace, it triggers sequence of actions
(other dominoes) to happen in different applications.

## What kind of events are there?

Zapier and Sharetribe can work together in harmony to automate a variety
of tasks based on certain "events" or triggers that occur in your
marketplace. We've categorized these events into three main categories:
Listing Events, User Events, and Transaction Events. Here's what each of
them mean in simpler terms:

### Listing Events

Think of these events as anything that happens to the products,
services, or items that are listed on your marketplace.

- **Listing Created**: This event occurs every time a new listing is
  added to your marketplace. So, if you want something to happen
  whenever a new product, rental, or service is put up for sale, this is
  the event you'll want to focus on.

- **Listing Updated**: This event is triggered every time a listing is
  changed or updated. Typically this happens when a listing author makes
  some change, like the price being adjusted, the description being
  updated, or pictures being added or removed. Keep in mind that when a
  listing is first created, it may go through several updates before
  it's published. You can use Zapier's own built-in filter tool to hone
  in on the specific updates you're interested in.

- **Listing Deleted**: This event happens whenever a listing is removed
  from your marketplace. If you need to track or react to the removal of
  listings, this event will be your guide.

### User Events

User events are all about the actions of your marketplace users. These
events can help you automate tasks related to the registration, updates,
or deletion of user profiles.

- **User Created**: This event happens when a new user signs up on your
  marketplace. This could be used to send a welcome email, add the user
  to your newsletter, or even announce the new user on your social
  media.

- **User Updated**: This event is triggered when a user changes
  information on their profile. Maybe they've updated their profile
  picture, changed their address, or added a new service. If you want to
  monitor or react to such changes, this is the event to use.

- **User Deleted**: This event occurs when a user removes their account
  from your marketplace. You could use this to remove them from your
  mailing list, for example.

### Transaction Events

Transaction events are about the buying and selling activities on your
marketplace. They give you the power to automate actions based on the
status and changes in transactions.

- **Transaction Initiated**: This event happens whenever a new
  transaction starts - basically, when someone decides to make a
  purchase from a listing on your marketplace, or contact another user.

- **Transaction Transitioned**: This event occurs when a transaction
  moves from one state to another. For instance, from 'accepted' to
  'delivered'. The meaning of this event can vary depending on how the
  [transaction process](https://www.sharetribe.com/docs/the-new-sharetribe/default-transaction-process-options/)
  works on your specific marketplace.

- **Transaction Updated**: This event is triggered when a transaction is
  updated but doesn't necessarily change state. For instance, if
  additional information is added to the transaction but it's still in
  the same state (like 'delivered').

By understanding these events, you can design an automation workflow
that suits your marketplace perfectly, making your operations smoother
and more efficient.

## Understanding actions: How Zapier can interact with your Sharetribe marketplace

Now that we've discussed events or triggers that start your automated
workflows, let's delve into the actions that Zapier can perform in your
Sharetribe marketplace.

Think of actions as responses to the events or triggers we just covered.
When an event occurs, you can instruct Zapier to perform a certain task
or "action" on your marketplace. It's a bit like training a virtual
assistant - when this happens, do that!

In the case of Sharetribe and Zapier integration, Zapier can be told to
execute 'search actions' in your marketplace. This simply means that
based on certain identifiers, Zapier can look up or "show" specific
information about users, listings, or transactions. You can use this
information in subsequent steps of your automation.

Let's look at the different search actions available in Zapier:

- **Show user:** This action lets Zapier fetch information about a user
  in your marketplace based on their user ID. It can be a seller, a
  buyer, or any user, really.
- **Show listing:** This action lets Zapier pull up details of a
  particular listing on your marketplace, based on the listing ID.
- **Show transaction:** This action allows Zapier to retrieve
  information about a specific transaction that took place in your
  marketplace, based on the transaction ID.

What's great about these actions is that they can be expanded to include
related information or 'relationships'. Here's what this means:

- **‘Show user’** can also include the name of your marketplace, the URL
  to the user's profile image, and their Stripe account.

- **‘Show listing’** can include the name of the marketplace, the author
  or owner of the listing, the current stock, and images related to the
  listing.

- **‘Show transaction’** can show a whole host of related information,
  such as the name of the marketplace, the listing involved in the
  transaction, the provider of the listing, the customer who initiated
  the transaction, the booking created by the transaction (if
  applicable), stock reservation, reviews, and messages that may have
  been exchanged between parties during the transaction.

Remember, all this information can be used later in your automated
workflow, or 'Zap'. For example, you could insert a user's name and
profile picture in an email, or include a listing's details in a tweet.
It's all about using the right action in response to the right trigger
to automate your marketplace tasks effectively.

If all of this sounds like a lot to take in, don’t worry: in a future
guide, we’ll go through the process of integrating an app into
Sharetribe from start to finish, with the help of screenshots. You can
return to this guide whenever you feel like it, when you’re creating
your own Zaps!
