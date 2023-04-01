---
title: Concepts
slug: concepts
updated: 2023-04-01
category: operator-guides-concepts
ingress:
  Definition of common terms we use when talking about Sharetribe Flex.
published: true
---

## Core concepts

Description of terms and concepts to understand Sharetribe Flex.

### Headless

Headless describes the technology architecture of marketplaces built on
Flex. Headless software means that the frontend and backend portions are
hosted separately. When a marketplace is built with Flex, the backend is
hosted and managed by Sharetribe while the frontend is hosted and
managed by you. The frontend and backend interface through APIs; the
frontend “calls” the backend, prompting the backend to process the
request and respond.

Building a headless marketplace lets you create custom marketplaces
faster than building a marketplace from scratch. Developers build a
custom frontend, using the pre-built backend functionalities from Flex
APIs.

### Frontend

The frontend refers to the marketplace website or mobile application. In
a headless architecture, this portion is built and hosted separately
from the marketplace backend. Frontend applications can also be referred
to as client applications.

[Flex Templates for Web](https://www.sharetribe.com/docs/operator-guides/concepts/#flex-templates-for-web)
are the most common way to build a marketplace frontend with Flex. You
may build frontends completely from scratch too.

The marketplace frontend communicates with the backend via Flex APIs. It
sends and retrieves data through these APIs. For example, client
applications rely on the Asset API to retrieve content created through
the Pages, such as a landing page.

### Backend

The backend refers to the marketplace database and supporting
infrastructure. In Flex, the backend is hosted, maintained, scaled, and
secured by Sharetribe. It provides tools like API resources, extended
data, or the transaction process to developers that make building a
custom frontend application much faster and easier.

Flex frontend applications, or marketplace applications, store,
retrieve, alter, and use data in the backend via Flex APIs.

### Flex APIs

Flex APIs are the interfaces through which marketplace application(s)
communicate with their Sharetribe-hosted backend. Though distinct from
the backend, APIs and backend are often used interchangeably.

Flex has four major types of APIs. Each of these four APIs has several
API endpoints. Each endpoint represents a tool or functionality that the
developer can use when building and powering your marketplace
application.

The endpoints available with Flex represent what Flex can do and how it
can do it. Because Flex is a tool for building marketplaces, the
available endpoints are designed specifically to support marketplace use
cases. Endpoints are grouped under resources, or data entities, that
they impact.

### API Resource

An API resource refers to a predefined data entity available through
Flex APIs. The most important resources in Flex are User, Listing, and
Transaction. User, Listing, and Transaction resources resource
represents a functional grouping of marketplace building blocks
developers use to save time creating a marketplace application. For
example, the Listing resource includes availability calendar features,
so it can be used to create custom booking and reservation experiences.

You can learn more about the User resource
[here](https://www.sharetribe.com/docs/concepts/users-and-authentication-in-flex/),
the Listing resource
[here](https://www.sharetribe.com/docs/concepts/listings-overview/), and
the Transaction resource
[here](https://www.sharetribe.com/docs/concepts/transaction-process/#users-interact-through-transactions).

### Events

Events log changes to an API resource. If a new resource is created or
an existing resource is modified, an Event occurs. Events thus provide a
history of actions in your marketplace. They are also a mechanism for
initiating actions in other software as a result of something happening
in your marketplace. Flex is integrated with Zapier, which can make
building integrations into many other software applications easier.

### Flex Templates for Web

Flex Templates for Web are the starting point for building your custom
marketplace with Flex. There are three templates from which you can
choose the one closest to your marketplace idea. The templates are
open-sourced website applications that developers can modify per your
unique requirements. The result is a custom-built marketplace without
the cost or time required to build it from scratch.

[Saunatime](https://www.sharetribe.com/docs/design-toolkit/user-journey-saunatime/)
is a great starting point for building rental marketplaces. Saunatime
providers list saunas for rent by day. Sauna lovers can search saunas by
location and book saunas by day using an availability calendar.

[Yogatime](https://www.sharetribe.com/docs/design-toolkit/user-journey-yogatime/)
is a marketplace for service providers–in this example case Yoga
teachers–to create profile listings advertising their teaching practice.
Customers can book hourly sessions from these teachers’ availability
calendars. Since Yogatime uses time based availability, rather than day
based availability like Saunatime, it is also a good starting point for
marketplaces where bookings are made with time units smaller than days.

[Sneakertime](https://www.sharetribe.com/docs/design-toolkit/user-journey-sneakertime/)
is designed to be a starting point for marketplaces where products are
bought and sold. Sellers list their products–in this case sneakers–and
manage inventory and fulfilment. Customers find, purchase, and review
sneakers and sellers.

### Environments

Environments describe different instances of a Flex backend. There are
three environment types: a Demo environment, a Development environment,
and a Production environment. Demo and Development environments are
included with every Flex account.

Demo environments are to demo how the Saunatime Flex Template and Flex
Console work.

The Development environment is used to build and extend your custom
marketplace. You may add your own test Stripe account to the development
environment and configure changes you will later deploy to your live
site. One example of how to use the development environment would be to
create your content. You may modifying microcopy or create a new content
page, for instance, which you can deploy to your Production environment
and live site when ready.

When the built marketplace is ready to go live, a Production environment
should be procured by subscribing to Flex. A Production environment lets
your marketplace add real users to your database and process
transactions with real money. Your users see the Pages content stored in
your Production environment. Production environments are used alongside
Development environments; you develop new features and content using the
latter and publish it to the former when it is ready.

### Extended data

Extended data lets developers modify the Flex backend to store custom
information. Specifically, the feature allows for changing what data the
User, Listing, and Transaction resources store. By capturing custom
variables or IDs to these pre-built resources, developers may support a
broad range of use cases using a turnkey set of backend tools.

[Click here](https://www.sharetribe.com/docs/concepts/extended-data-introduction/)
to learn more about the different types of use cases supported by
extended data.

### Transaction process

Transaction process defines the rules of what and how transactions
happen on the marketplace. Anytime two users interact on a Flex
marketplace, what steps are available to them, when they are available,
and what happens as a result of these steps is enclosed in the
transaction process.

You can have different transaction processes for different ways of
transacting, like renting and buying products, in the same marketplace.
You can see the transaction processes of your marketplace in Console’s
“Build” section.

[Click here](https://www.sharetribe.com/docs/concepts/transaction-process/)
to learn more about transaction processes and for tips on how desing
your own.

### Microcopy editor

The Microcopy editor lets you edit your marketplace’s microcopy from
Console's Build section. Use the Microcopy editor to edit the short
written texts scattered around your marketplace, like button labels,
error messages, or help texts.

[Click here](https://www.sharetribe.com/docs/operator-guides/how-to-use-microcopy-editor/)
to learn more about the Microcopy editor and how to use it.

### Pages

With Pages you can create, modify, and delete content pages on your
marketplace. It comes pre-loaded with four content pages: the About
page, the Landing page, the Privacy policy, and the Terms of use page.
Each of these can be edited with Pages, or additional content pages can
be created. You can find the editor in Console's Build section.

[Click here](https://www.sharetribe.com/docs/operator-guides/how-to-edit-content-pages-in-console/)
to learn how to use the Pages to modify content on your marketplace.

## Content

### Assets

Assets refers to the API resource which stores your text and visual
content. Your landing page texts and pictures, your Terms page legalese,
and your marketplace microcopy are stored in the Flex backend as unique
Assets.

Your marketplace frontend retrieves Assets from the Flex backend and
renders them per your marketplace's design. Assets are created in
Console without code. For further, more technical information about
Assets, consult this
[article](https://www.sharetribe.com/docs/references/assets/).

### Content pages

Content pages only feature content created by you, the marketplace
operator. Landing pages, “About” pages and FAQ pages are examples of
content pages. Content pages can be built and edited using Pages.

### Dynamic pages

Dynamic pages feature content created by your users. The search page
displaying listings is a dynamic page. Often, dynamic pages offer users
the ability to interact with them, such as when buyers are selecting the
length of a booking from a listing or entering their payment information
into the checkout page.

### Microcopy

Microcopy refers to short written texts scattered around a dynamic
page’s interface; button labels, error messages, and help texts are all
examples.They are textual, brief (a sentence or two), and highly
contextual.

You can modify your marketplace’s microcopy using the Microcopy editor
in Console.

### Pages

Pages are how marketplace operators create and edit content pages in
Console. In Pages, operators create content by defining one or more
Sections. Each Section is composed of Blocks, or subsections, laid out
according to the Section template. Depending on which kinds of Sections
and Blocks you choose for your page, you can create a wide range of
content.

Pages include 4 default content pages: the About page, the Landing page,
the Privacy policy page, and the Terms of use page. These can be edited,
but not deleted. Operators may create any number of custom content pages
in addition to the default pages.

### Sections

Sections are the main element of a content page. One Section should be
used to communicate one goal or theme. Your landing page, for example,
might have a Section for the Hero image and main CTA, a Section for
describing the value proposition, and a Section for sharing user
testimonials.

Sections can have Fields and Blocks within them. Section templates
determine how information stored in Fields or Block is organized within
a section.

### Blocks

Blocks capture information and present it according to the Section
template. Though each Block can take the same information, such as a
video or image, text content or title, how this information is presented
depends on the Section template. Blocks, therefore, only exist within
sections. They are the sub-sections that make up a content page.

You can study different Block layouts
[here.](https://www.sharetribe.com/docs/operator-guides/section-templates/)

### Fields

Fields store content information. Fields may take short-form or
long-form text, URLs, and media (images and Youtube videos). Fields fill
out both Sections and Blocks. They may be different headings, from
titles, sub-titles, ingresses, and normal text. The text inside Fields
can be further formatted with Markdown.

### Section templates

Section templates determine the layout of the content page created in
Pages. You choose a Section template as part of building your Section.
The Section template determines how Blocks show up on your marketplace
page. There are three templates–Articles, Columns, and Features. You can
learn more about each Section template
[here.](https://www.sharetribe.com/docs/operator-guides/section-templates/)

### Markdown

Markdown is a simple programming language used to add formatting to
text. You can use it with Pages to emphasize or format your content.
Markdown does not do anything fancy like changing the font size, font
color, or font family — but it covers the essentials, using simple
keyboard symbols.

You can learn more about using Markdown
[here.](https://www.sharetribe.com/docs/operator-guides/how-to-format-your-text-in-pages/)

## Users

Users are one of the API resources available in Flex. Users are created
when anyone registers to your marketplace. Account information like
signup date, email, and password are stored to the User resources.
Custom data can be stored to the User resource using extended data.

Users let you control access to certain marketplace functionalities.
Moreover, User accounts may be in different states, such as pending
verification, banned, or deleted.

### User extended data

User extended data is how you store custom attributes to the User
resource. Flex requires that you define an email and password for every
User account created. Sometimes you’ll want to collect more info like a
phone number or business ID; User extended data stores this custom
information.

Moreover, User extended data is also used to store information about the
user’s role, level, or permissions. If you run a marketplace where user
signs up as either a buyer or seller, User extended data would be used
to store and determine access rights throughout your marketplace
application.

### User roles

Flex has two possible roles for a registered user: customer and
provider. All users can be both customers and providers by default. This
means that even if a person has created a listing, which means they can
be a provider, they can also be a customer on someone else's listing.

Extended data can be used to limit users to only customer or provider
capabilities.

Flex includes one more user type: the marketplace operator. This is the
Admin user. They are not a user in the marketplace – they cannot sign in
to the marketplace with the same credentials they use to sign in to Flex
Console. The operator can, however, take actions on the marketplace
through Flex Console or Integration API, when those actions are defined
for the operator. Operators cannot participate in the messaging between
customer and provider within the transaction.

## Listings

Listings are one of the API resources available in Flex. Listings are
used anytime you need one side of the marketplace to create and add
information that the other side of the marketplace finds and interacts
with.

Listings can represent items for purchase, services for rent,
storefronts for viewing, and much more. In more complex marketplaces,
you may have multiple types of listings; reverse marketplaces have one
listing type to put forth buyer requests and another to capture bids or
proposals by providers.

### Listing extended data

Listing extended data is how you store custom attributes to the listing
resource. Fields that your provider fills out while creating their
listing, such as the category of the listing, are one use case for
extended data. These fields can become search parameters like a single
select filter or a keyword search for buyers too.

Other use cases include using listing extended data to capture listing
type, facilitate integrations, or modify sorting behavior. Ultimately,
listing extended data lets developers create listings that look and
function exactly how you need at a fraction of the effort of building
such features from scratch.

### Listing states

A listing state defines where a listing is in its lifecycle. Listings
that are in progress, but not published are in draft state. Listings
that are waiting for approval (if this feature is turned on) are in
pending approval state. Active listings are in published state; only
listings in published state are searchable and can be used to start a
transaction.

Closed listings are in closed state. Operators or listing authors can
close a listing. Finally, deleted state refers to listings whose data
has been completely removed.

### Listing approval

Marketplaces can require all listings to be approved before they are
published on the marketplace. A listing that is pending approval is
visible only to its author and the marketplace operator, but not
discoverable by any public API endpoints. Marketplace operators can
review and approve listings from Console, though a custom admin
interface may be built to review and approve listings as well.

### Search

Search refers to the discovery process undertaken by the demand side
when looking for supply. In Flex, search is built around listings. Flex
marketplace can return listings based on parameters the buyer inputs
using a variety of techniques, such as keyword search, location search,
or filtering selections. Search results are sorted by creation date,
with more recent listings coming first, or by custom attributes stored
in listing extended data.

### Price

Listings often take a price. Typically providers set the price of their
listing, using pricing units set by the marketplace. Rental marketplaces
might ask providers to price by the rental time unit, like hours, days,
or months for example.

### Stock

Stock is the quantity of available units of a listing. Your marketplace
can allow or disallow buyer behavior based on the quantity of stock. For
example, if a listing does not have available stock, it cannot be
purchased by the buyer.

Stock is typically set by the seller when creating their product
listing. Stock amounts are adjusted by transactions. If 2 units of a
listing are sold, the listing’s stock count decreases by 2.

### Availability calendars

Availability calendars define when someone can and cannot book times
from a calendar. It is an often-used feature in service or rental
marketplaces. Availability is added by the listing author when creating
their listings, and editable thereafter anytime. Buyers can select times
from the available calendar. Whether buyers book days, nights, 30
minutes, half-days, months, or some other measure is up to you; Flex
understands booking increments as small as 5 minutes.

Syncing information between an availability calendar in Flex and a 3rd
party calendar service is possible with custom development. The extent
of the work required depends on your needs and the calendar. Please
contact our support team at flex-support@sharetribe.com if you have any
questions about building such a feature.

### Seats

Seats let providers define how many spaces there are for an available
time. This is taken into account during the booking process. Buyers
cannot reserve more than an available number of seats. Conversely,
buyers can reserve times others reserved when there are available seats.
As an example, marketplaces selling tickets to events can use seats to
let sellers define how many tickets are available and let buyers buy in
confidence that there are enough seats available.

## Transactions

Transactions are one of the API resources available in Flex.
Transactions are used anytime two users are interacting on the
marketplace. How they interact–the possibilities available to them
throughout their interaction–is determined by the transaction process.
You may have multiple different types of transaction processes and thus
different types of transactions. For instance, you could have
rental-style transactions, which include booking possibilities in the
transaction process, and ecommerce-style transactions, with instant
payment and stock management possibilities in the transaction process,
in the same marketplace.

### Transaction process

Transaction process defines the rules of what and how transactions
happen on the marketplace. Anytime two users interact on a Flex
marketplace, what steps are available to them, when they are available,
and what happens as a result of these steps is enclosed in the
transaction process. You can have different transaction processes for
different ways of transacting, like renting and buying products, in the
same marketplace. You can see the transaction processes of your
marketplace in Console’s “Build” section.

[Click here](https://www.sharetribe.com/docs/concepts/transaction-process/)
to learn more about transaction processes and for tips on how desing
your own.

### Messages

Transactions may include messages. In order for a message to be sent, a
transaction resource must be created. They can be available at any point
in the transaction to both the buyer or seller. Operators can view any
message in Console.

### Notifications

Flex marketplaces can send custom email notifications during
transactions. What your email says and how it behaves is controlled by
your transaction process. Flex’s default transaction processes all
include template notification email, such as a receipt or reminder to
leave a review.

You can learn more about transaction email notifications
[here](https://www.sharetribe.com/docs/concepts/email-notifications/#transaction-notifications).

It is possible to send SMS notifications too, but this requires a 3rd
party integration. You may
[use Zapier](https://www.sharetribe.com/docs/how-to/set-up-and-use-zapier/#how-to-build-a-text-message-integration-in-sharetribe-flex-using-twilio-and-zapier)
to send such emails or build bespoke integrations into tools like
Twilio.

### Stock reservations

Flex features stock management. Providers can set their available stock
while creating and managing their listing. During a transaction, stock
amounts are modified based on what happens. If a buyer requests to buy
an item, for example, the stock amount can be decremented to reflect
this request.

Adjusting stock amounts is handled through the transaction process.

### Bookings

Bookings are time reservations made in a provider’s calendar. After a
provider sets their availability in their listing, buyers can make
bookings. Providers can accept, reject, or propose new times. Booking
actions happen during a transaction. A transaction process handles what
booking possibilities exist for buyers and sellers throughout a
transaction.

### Payments

Payments are a typical part of a transaction. Payments may be
“on-platform” (through the marketplace) or “off-platform” (made outside
the marketplace). Flex marketplaces can facilitate on-platform payments
using the built-in payment system or by integrating their own payment
system. In addition to charging the payment method, marketplace payments
also involve charging a commission, payouts to sellers, and refunds.
Payment behaviors are controlled by the rules set in your transaction
process.

### Stripe

Stripe builds software for online payment processing. Flex comes
integrated with Stripe’s Connect tool, which lets buyers purchase from
sellers directly. As part of this, Stripe Connect handles provider
onboarding, payment processing, payouts to providers, and commission
charging. The Stripe Dashboard gives you a detailed view of every
payment.

### Reviews

Reviews can be created by a buyer and seller during a transaction.
Reviews consist of free text and a 0-5 star rating. Who can leave a
review and when is determined by the transaction process.
