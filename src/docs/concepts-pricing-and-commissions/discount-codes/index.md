---
title: Discount codes in Flex
slug: discount-codes
updated: 2022-08-19
category: concepts-pricing-and-commissions
ingress:
  Flex allows a lot of configurability for pricing, including discount
  codes. This article discusses the implications and implementation
  alternatives of different discount code approaches.
published: true
---

Discounts can be a great way to incentivize customers to purchase
listings on your marketplace. Before implementing discounts on your
marketplace, however, it is useful to ask a few questions to clarify the
exact nature of your discount. The approach you choose will have
implications on the implementation of the discount on your Flex
marketplace.

## How much is the discount?

The traditional options for discounts are percentages and fixed sums.
You can also have bulk discounts, for example 6 nights for the price of
5, or free additional services such as shipping or cleanup.

It is also useful to consider the lowest listing or transaction price at
which the discount applies – a 20 dollar discount for a 15 dollar item
can cause a headache for both provider and operator. Depending on the
payment gateway, a poorly configured discount that exceeds the
provider's expected payout can require extra steps so that the provider
does not end up paying for a listing they sold.

## Who sets the discount?

The marketplace operator can set a discount by determining a certain
percentage or a fixed sum off of the customer's final price. A simple
percentage or sum can be defined within the line item calculation file.
However, the more complex the discount logic, the more it makes sense to
integrate a [third party discount code tool](#which-tool-to-integrate)

In addition, the operator can allow a provider to offer a discount as
well. In that case, the discount details can e.g. be saved in the
provider's extended data, so that it can be checked and applied when a
customer initiates a transaction with the provider.

## Who pays for the discount?

Since the customer payin is smaller, the discount needs to be covered by
someone. In traditional e-commerce, the discount giver and the discount
payer are the same entity, but on a marketplace there can be a mismatch
between who sets the discount and whose share gets decreased.

For this reason, it's crucial to be very transparent about the effect of
any discounts on the transaction's payout. Does the discount sum reduce
the customer commission or the provider commission, i.e. is it paid for
by the platform? Or does it reduce the provider's payout?

Depending on who pays for the commission, the percentage or fixed sum
needs to be applied differently in the transaction's line item
calculation. In the case of bulk discounts or free additional services,
both the platform's commission and the provider's payout are affected.

## Who can use the discount?

Discount use can be limited by the customer's activity on the
marketplace. A use-case for this could be a "10% off your first order on
GreatMarketplace" type of campaign, where the discount gets applied to
all customers who e.g. have a metadata flag _paidTransactions: false_.
Since Flex starts transactions upon listing enquiries as well, the
discount should only be applied to paid transactions.

Customers can also apply a discount code to their transaction to get
certain discounts. Here, too, simple discount codes can be implemented
within the Flex pricing system. The more complex the discount code logic
– for instance, if you want to have individual coupon codes per customer
– the more we recommend integrating a third party discount code tool.

## Which tool to integrate?

If you decide to use a third party discount code and promotion tool, it
makes sense to do some research into different choices. Some options
include

- [Voucherify](https://docs.voucherify.io/docs)
- [Vouchery](https://www.vouchery.io/)
- [Stripe](https://stripe.com/docs/api/coupons) (if you are not using
  the default Flex Stripe payment integration)

The benefit of a third-party tool is that you can create complex
discount code logic and, depending on the tool, other promotions such as
gift cards and loyalty programs. The third party tools handle the
validation and redeeming of the code, so you just need to communicate
the discount to your line item calculation within the transaction.

- things to note for the Voucherify how-to
  - validate code several times, redeem only once => what happens to a
    single-use code if it gets redeemed upon payment but the provider
    declines the booking?
