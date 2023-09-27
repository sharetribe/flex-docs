---
title: Solving payout problems
slug: solving-payout-problems
updated: 2019-09-10
category: concepts-payments
ingress:
  A payout is the part of the payment process where the price of an
  order is paid to the provider's bank account. This article gives you
  an overview of what problems you may encounter with payouts in
  Sharetribe and how to solve those problems.
published: true
---

## Introduction

Enabling customers to pay for their orders and paying that money to
listing providers is one of the most valuable features of Sharetribe.
Most of the time payments work as expected: the customer pays for the
order, and the provider receives the money when it's time. However,
there are many variables that affect the payments and sometimes problems
may occur. The payment gateway can deny payouts to a user, the user's
bank might deny payouts, or for some other reason the numbers don't seem
to add up. This article presents potential cases where payouts might
fail and what are the ways to fix those issues.

## Payments in Sharetribe

![Sharetribe payment process](payment-process.png 'Payment process in Sharetribe.')

To make sure that payments make it to the provider and that the
marketplace operator can collect their commissions, Sharetribe uses a
payment gateway called [Stripe](https://stripe.com). The image above
presents the steps that are taken when a customer pays for an order and
the money is eventually paid to the provider. As an example, it uses a
booking that costs 100€ and has both customer and provider commissions
of 10%. The different entities that are involved in the process are
_Customer's payment card_, _Stripe platform account_, _Connected
account_, and _Provider's bank account_.

- **Customer's payment card** Credit or debit card that the customer
  uses to pay for the booking.
- **Platform account** Stripe account of the marketplace. This is the
  account that is identified by the secret Stripe key that is configured
  in the Console.
- **Connected account** Provider's connected account in Stripe. This
  account is created by Sharetribe and it is not accessible by the
  provider but it can be used to specify the payouts of a single
  provider in the Stripe Dashboard.
- **Provider's bank account** This is where the money is paid when a
  payout is created.

The different steps where money moves around in the payment process are
as follows.

1. **Preauthorize** An amount of money is preauthorized from the
   customer. The amount of the transaction does not leave customer's
   payment card but it's reserved to pay the booking. In the default
   transaction process this happens when a customer requests to book a
   listing and the payment is confirmed.
1. **Capture charge** Sharetribe operates using a Stripe concept called
   [PaymentIntents](https://stripe.com/docs/payments/payment-intents)
   but behind the scenes a _charge_ is what defines the payment. When a
   charge is captured, the preauthorization from step 1. is paid to
   Stripe and more specifically to the connected account of the
   provider. Once money is transferred to a connected account it is
   converted to a _settlement currency_ which is the currency of the
   connected account. The settlement currency is defined by the currency
   of the associated bank account. At this point the provider does not
   yet have access to the money. It stays in Stripe and is earmarked to
   be paid to the provider. In the default processes this happens when
   the provider accepts a booking request, or the customer purchases a
   product. See also the background article on
   [PaymentIntents in Sharetribe](/concepts/payment-intents/) and the
   [payments overview](/concepts/payments-overview/).
1. **Pay commissions** Once a charge is captured and the money is in the
   provider's connected account, commissions are moved to the
   marketplaces Stripe account (the platform account). In our case both
   customer and provider commissions are 10€.
1. **Payout** In the payout money from the connected account is paid to
   the provider's bank account according to the payout details they have
   provided.

Normally everything goes as expected, but as payments involve multiple
3rd party stakeholders there are some cases where for one reason or
another the payout fails. In these cases it's good to know a few places
where to look into to solve the situation.

## Why payouts fail

### Insufficient funds

Payouts can fail if the provider's connected account does not hold
enough funds to pay out a charge. Here are a few scenarios in which a
connected account can have insufficient funds.

#### Manual refund

Manually refunding a payment straight from Stripe usually fixes the
transaction that is being refunded but it may lead to problems in
forthcoming transactions. **Therefore, you should never manually refund
payments in the Stripe Dashboard!**

As an example of how manual refunds can result in insufficient funds on
a connected account, picture the following scenario:

- Provider has two transactions, both have a captured charge.
- Price on both is the same as in the image above: the booking costs
  100€, customer and provider commissions are both 10%.
- The balance on the connected account is therefore 180€.

Now the provider decides to cancel one of the bookings while the
transaction is in a state where cancelling is not permitted by the
transaction process. In order to solve the situation, the operator
decides to refund the payment manually from Stripe. As the provider was
late to cancel the booking, the operator decides to keep both
commissions and let the provider pay them. The following takes place:

- The operator refunds the payment manually from Stripe, selecting not
  to refund the _application fee_ (the commissions in Stripe terms).
- 110€ is refunded from the provider's account, leaving the balance
  there to 70€.
- Eventually it's time to pay out the other transaction. The balance of
  70€ is insufficient for paying out 90€ to the provider's bank account
  and the payout for that transaction will fail.

Manual refunds are not supported by Sharetribe. Ideally the transaction
process should be designed so that all refunds can be performed from
Sharetribe.

#### Disputes

[Dispute](https://stripe.com/docs/disputes) is an act where a customer
announces to their payment instrument provider that a payment has not
been valid and wishes the paid amount to be returned to them. This will
cause the payment being debited to the platform account with an
additional chargeback fee that varies between countries. The platform
account is responsible for all disputed payments but it can also debit
the connected account for the disputed payment if it appears to actually
be fraudulent. This is done by reversing a transfer manually from
Stripe.

When a transfer is reversed, funds are moved from a connected account to
the platform account. If a transaction is already paid out from the
connected account this can lead to a negative balance. In some countries
Stripe can withdraw funds from a bank account associated with a
connected account in order to cover a negative balance. In countries
where this is not supported negative or insufficient funds caused by
disputes can cause forthcoming payouts to fail.

### The payout is too small

Stripe refuses to make a payout sometimes if the amount is too small.
The minimum payout varies depending on the settlement currency (currency
of the connected account). More about payout limits can be found in the
[Stripe documentation](https://stripe.com/docs/payouts#minimum-payout-amounts).
This is quite a rare problem as there is also a minimum amount for
creating a charge so smaller payments usually fail already at that
phase. But still good to keep in mind when investigating a failing
payout.

### Stripe or bank refuses the payment

Sometimes Stripe or the provider's bank can refuse a payment for varying
reasons. In most cases it's due to some information being missing from
the provider's connected Stripe account. At the moment Sharetribe can
not keep up with payout status changes like this so if Stripe or the
receiving bank refuses the payout for one reason or another, the
transaction state in Sharetribe will not update.

## How to investigate and fix failed payouts

### Insufficient funds

If there's a reason to doubt that a payout has failed, one place to
start tracking it is the transactions CSV export which is available
under _Manage > Transactions_ in Console.

![Transactions CSV export](console-tx-csv.png 'Transactions CSV export')

The transactions CSV file has a column called _PayoutState_ which
indicates what is the status of the payout. PayoutState can have five
different values.

1. Pending. This means that the customer has been charged, but your
   marketplace has not yet attempted to initiate a payout to the
   provider.
2. Due. This means that a date for the payout has been assigned by
   Sharetribe. You can see this date in the column PayoutDue. Sharetribe
   will attempt a payout on this date.
3. Paid. Sharetribe has attempted to pay the money to the bank account
   of the provider. According to Stripe, it will then take between 1 and
   7 days for the money to reach their bank account. However, it's still
   possible for the payout to fail, if there's something wrong with the
   account of the provider.
4. Cancelled. This means that the payout won't be attempted, because the
   transaction was cancelled for one reason or another (by you, the
   customer, or the provider), and the money has been refunded to the
   customer.
5. Failed. This means that something went wrong with the payout, and the
   provider didn't receive the money they were supposed to receive.

Another column to pay attention to in the CSV file is
_PayoutTotalConverted_. It is the payout total (in subunits) converted
to the settlement currency of the connected account. This amount of
money should be available in the connected account in order to
successfully pay out the charge.

If failed payouts are found in the transactions CSV export, the next
step is to identify the corresponding failed payout events from Stripe.
Log into the [Stripe Dashboard](https://dashboard.stripe.com) and look
for the _Logs_ tab under _Developers_.

![Stripe logs](stripe-logs.png 'Stripe logs')

From the logs clear all other filters but _request failed_.

![Stripe logs filter](stripe-logs-filter.png 'Stripe logs filter')

Now see if there are any `POST` requests with status `400 ERR` to the
`/v1/payouts` endpoint. If found, open the request and see if the error
code is `balance_insufficient`.

![Stripe insufficient balance response](stripe-insufficient-balance-response.png 'Stripe insufficient balance response')

If an error with the `balance_insufficient` code is found it can be
matched to the transactions in the CSV export by checking the
`sharetribe-transaction-id` field from the _Request POST body_ section
of the request and comparing that to the _Id_ field in the CSV file. By
comparing the balance of the associated connected account to the
_PayoutTotalConverted_ of the transaction in the CSV it's possible to
find out what is the missing amount of money. The missing amount can
imply why the balance is not enough to pay out the charge. For manual
refunds it's also good to take a look into the _Payments_ of the
associated connected account in Stripe Dashboard and see if there are
any refunds found there.

In the case of insufficient balance the solution is usually to manually
create the payout from Stripe Dashboard and in that payout take into
account the reason what led to the lack of funds in the connected
account. In the example case of manual refunds presented above the
solution would be to reduce the 20€ of commissions that the provider
owns from the previous transaction and manually pay out the remaining
70€ from the connected account.

### The payout is too small

The case of a payout failing due to too small amount of money, it's good
to start with the transactions CSV export, just like in the case of
insufficient funds. Also look to the events log in Stripe Dashboard.
However, in this case the error code in the response of the failed
request is `amount_too_small`.

![Stripe amount too small response](stripe-amount-too-small-response.png 'Stripe amount too small response')

To solve the problem, wait for more transactions for the connected
account and manually bundle them together and pay out at once.

### Stripe or bank refuses the payments

The CSV export does not help in the case where the payout fails due to
missing information. As mentioned the payout state does not propagate
back to Sharetribe in cases like this. If the payout state seems to be
fine but a provider is reporting missing payouts, it's good to take a
look at the connected account of the user. The associated Stripe account
can be found in Console from the user view. Usually the problem is
missing the account and act based on those to fill in missing
information. information in the connected account. See if there are any
warnings in
