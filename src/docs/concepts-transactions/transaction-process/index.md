---
title: Introduction to transaction processes
slug: transaction-process
updated: 2023-10-24
category: concepts-transaction-process
ingress:
  This article introduces transaction processes as a concept, their
  parts, and how they define user interactions and order flows in your
  marketplace.
published: true
---

Your marketplace exists to connect supply and demand. You have a unique
vision of how this connection should happen. Sharetribe makes this
custom vision possible using its composable transaction process.

<plan tier="launch">

Live transactions are available in the Launch plan and above.

</plan>

## Users interact through transactions

Any time users connect with each other on a Sharetribe marketplace, they
do it through a transaction. At its core, a Sharetribe transaction is
the interaction between two users—the provider and the customer—from
beginning to end. A single transaction might include events such as
messages between users, the payment sent from the customer to the
provider, and the reviews users leave about their experience.

You likely want users on your marketplace to transact a certain way. For
instance, you may want your providers to accept requests before
confirming bookings to ensure that there is no conflict. Or, you might
prefer requests to confirm automatically because you want to prioritize
speed. Perhaps you’d like both options, depending on the nature of the
offered service.

The guidelines for how you’d like users to transact are established in
Sharetribe using a transaction process. Your marketplace’s transaction
process determines how your customers and providers move through their
transaction. You can have different transaction processes for different
ways of transacting, like renting and buying products, in the same
marketplace too.

A transaction follows the trail established by your transaction process.
The transaction process maps the steps your users will complete and the
possibilities they have upon reaching each step.

Your marketplace can have multiple different transaction processes in
use simultaneously. You can see the transaction processes of your
marketplace in
[Sharetribe Console](https://console.sharetribe.com/advanced/transaction-processes).

Typically, all transaction processes are different. These differences
can be fundamental and change the logic of the order flow, or they can
be small and superficial.

An example of a fundamental difference is choosing whether the users
book

- by night or by day, as when booking a hotel room
- by seat, as when booking tickets to an event
- by hour, as when booking a hairdresser
- or not at all, as when booking is handled outside the marketplace.

A smaller variation could be, for example, deciding if the provider has
to always accept the booking before it can be confirmed or if the
booking is automatically confirmed as soon as it is made (i.e. instant
booking). Another small variation could be a change of wording in a
notification email sent to remind the customer of their upcoming
booking.

## Transaction process building blocks

Each transaction process guides how your users interact in your
marketplace. Each process is built with a few building blocks that
describe what is going on. These building blocks are called **states**,
**transitions**, and **actions**. Let’s explore a transaction process
modeled on AirBnB to learn more about them.

![Default transaction process](./complete-transaction-process.png)

In the image above you can see one of the default transaction processes
in Sharetribe called "default-booking". It is the same process that you
will find, albeit with a different layout, within your Console account's
[transaction process page](https://console.sharetribe.com/advanced/transaction-processes).
It closely mimics how a customer and a provider transact on AirBnB. From
a listing, customers can message a provider or book directly by entering
their payment details and authorizing the charge on their card.
Providers must then either accept the request, reject the request, or
let it expire.

After an accepted booking is completed, the customer and provider have a
certain period of time to review each other. After this, the reviews are
published and the transaction is concluded.

The default process is built in to Sharetribe Web Template. Usually, the
easiest way to start defining your own transaction process is by editing
the default process.

### States

The status at any given point in a transaction is called its state. The
state describes where the users are in their transaction.

The Sharetribe default booking process, for example, has a state called
preauthorized. It signifies that a customer has requested to book a time
from the provider’s calendar, and a charge on their credit card has been
preauthorized.

From the _preauthorized_ state the provider can reject or accept the
request, in which case the transaction will transition to the _declined_
or _accepted_ state respectively.

### Transitions

Transitions move the transaction from one state to another. They are the
steps between states.

A transition is triggered by one type of user or “actor”: the customer,
the provider, the operator, or time (this is known as the “system” actor
in Sharetribe, or as an automatic transition). From the accepted state
in the transaction, the transaction will automatically transition to a
delivered state at a certain point in time. Or, the operator may cancel
the booking.

Transitions describe the possible next steps from a particular state.
They also describe who can complete the steps. If there are no possible
transitions from a state, the transaction has ended.

Technically, transitions can be considered the main building block of
Sharetribe transaction process. They define, implicitly or explicitly,
all the other elements of a transaction process. We will not go to into
more detail in this article, but you can find more information
[in the transaction process format reference documentation.](/references/transaction-process-format/)

### Actions

Actions describe what happens as part of a transition. For example, the
transaction process allows users to transition from accepted state to
delivered or cancelled. The transaction may “complete” automatically, or
the operator may “cancel” it with the respective transitions. “Complete”
actions involve creating a payout to the provider via Stripe
(Sharetribe’s payment gateway). “Cancel” actions, on the other hand,
include cancelling the booking and issuing a refund.

Possible actions are defined by the capacity of the Sharetribe API. The
list of all transaction process actions can be found
[in the transaction process actions reference documentation](/references/transaction-process-actions/).
Creating custom transaction process actions is not possible in
Sharetribe.

### Notifications

Notifications specify the content and behavior of emails sent during a
transaction.They determine which actor receives them; define what email
template is used; and schedule the specific sending time. Email
notifications are triggered by the completion of a transition. The email
templates used for the notifications are also considered part of the
transaction process, and can be fully customised to fit the needs of the
marketplace.

In the Sharetribe default booking process, transitioning from the
accepted to the delivered state triggers three email notifications. The
provider receives a notification that their money has been paid out and
a notification prompting them to review the customer. The customer
receives an email notification to review the provider.

To review what notifications are sent as part of the Sharetribe default
process, visit your [Sharetribe Console](/concepts/console-overview/)
Build tab. Each included
[email notification has a template](/references/email-templates/#editing-transaction-emails)
that can be customized using the Sharetribe CLI. You can also edit the
content of the transaction notifications in the Console, under Build >
Content > Email texts.

<plan tier="extend" feature="Access to Sharetribe CLI"></plan>

<transactionprocesscomponentscarousel title="Transaction process components">

</transactionprocesscomponentscarousel>

## How users interact with your transaction process?

You may be wondering what a graph has to do with your marketplace – a
very good question. The graph is simply a visualization of the
transaction process information (the states, the transitions, and the
actions) stored in your marketplace database in Sharetribe. The
transaction process is, in reality, a short set of instructions written
in a text file. You can see an example of these instructions
[here](https://github.com/sharetribe/example-processes/blob/master/default-booking/process.edn)
if you are curious.

These instructions ultimately play out during transactions in your web
or mobile marketplace app.

Whenever your users transact, at whichever state they are in that
interaction, the transaction process determines **what** they can do
next and **how** it happens.

Let’s revisit our Sharetribe default booking transaction process, this
time in conjunction with Sharetribe Web Template, to illustrate this.
You’ll see how a transaction process state looks for providers and
customers in Biketribe, an example marketplace built with Sharetribe Web
Template. If you’re not sure what is meant by the “Sharetribe Web
Template”, you can read more about it
[here](/introduction/introducing-template/).

<txnprocessuxcarousel title="Transaction process and user experience">

</txnprocessuxcarousel>

## What kind of transaction process customizations are possible?

As all marketplaces’ have their own characteristics, it is common to
need some customization to the default transaction process to make it
more suitable to the customers’ needs.

<plan tier="extend" feature="Customizing transaction processes"></plan>

However, quite often it's helpful to start building your process by
making slight customizations to the default process. Typical minor
customizations for transaction process are adding the possibility for a
customer to cancel a booking or a booking request, adding operator
transitions, or editing the contents of the email templates used for the
notifications.

![An example transaction process with instant booking and customer cancellation](./tx-process-instabook-customer-cancel.png)

Another common example is to modify the process so that the provider has
to manually mark the booking as completed and the rented goods as
returned in good condition. This might be useful in rental marketplaces
where the goods that are rented are of high value. In another case, the
process could be modified so that the operator can close down the
transaction process in case that there is trouble in the order flow.
This could be done for example in cases where a customer has booked a
time from a professional, but doesn’t appear in the meeting.

Apart from the order flow, customizations can also affect the money
flow, storing
[protected data](/references/extended-data/#protected-data) or sending
notifications.

## Start creating your own transaction process

The transaction process determines how your users transact on your
marketplace. It maps where your users are in a transaction, what
possible next steps they have, and how those steps are taken. The
transaction process plays out in your marketplace application where your
users transact.

Now that you understand more about how the transaction process works,
it’s time to create your own. Sharetribe provides a few default
processes, but you’ll likely want to modify these to capture the unique
way your users will transact.

If you’re a developer building with Sharetribe, you can build your
transaction process using the Sharetribe CLI. Here are guides for
[creating your own transaction process](/tutorial/create-transaction-process/)
and for
[getting started with Sharetribe CLI](/introduction/getting-started-with-sharetribe-cli/).
For more details of the transaction process format, see the
[Transaction process format](/references/transaction-process-format/)
reference. To customise the UI of your marketplace to match your process
changes, see the
[Change transaction process setup in Sharetribe Web Template](/how-to/change-transaction-process-in-template/)
how-to guide.

If you’re working with a developer, then you need to communicate how you
would like transactions to work so your developer can implement the
necessary steps, transitions, and actions to build your transaction
process.
[Our guide for changing your transaction process](/concepts/change-transaction-process/)
shares a few principles to keep in mind when making changes as a
non-developer.
