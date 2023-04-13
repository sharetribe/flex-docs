---
title: Rate limiting in Marketplace API and Integration API
slug: rate-limiting
updated: 2022-12-21
category: concepts-api-sdk
ingress:
  This article describes rate limiting in Marketplace API and
  Integration API, as well as suggests how to handle those limits
  gracefully.
published: true
---

Starting in January 2023, Marketplace API and Integration API feature
new rate limits in dev and test environments. In addition, Integration
API features new concurrency limits in dev and test environments and,
eventually, in live environments.

<extrainfo title="What are rate limits and concurrency limits?">

**Rate limit** means a limit on the number of requests that the API can
process within a time span, e.g. in one minute.

**Concurrency limit** means a limit on the number of simultaneous
requests that the API can process at any given moment.

</extrainfo>

The rate limits are different for queries (fetching data) and commands
(modifying data). Queries are rate limited at 1 request per second (60
requests per minute) on average. Commands are rate limited at 1 request
per 2 seconds (30 requests per minute) on average. The rate limit
applies per client IP address. You can find more information on Flex
rate limits in the API reference for
[Marketplace API](https://www.sharetribe.com/api-reference/marketplace.html#rate-limits)
and
[Integration API](https://www.sharetribe.com/api-reference/integration.html#rate-limits).

It is good to note that **live environments are currently not rate
limited**, except for one endpoint in Integration API. Still, as you
build your Flex marketplace implementation to take the rate and
concurrency limits into account in your development environment, we do
appreciate it if you also transfer those behaviors into production.

## Interaction between different rate limits

All query and command endpoints have rate limits in dev and test
environments. In addition, the Integration API listing creation endpoint
has a separate rate limit in all environments. This means that in dev
and test environments, both rate limits apply to listing creation in the
following way:

- If the command rate limit burst capacity has not yet been depleted,
  listing creation is rate limited at 100 API calls per minute. This
  depletes the command rate limit burst capacity accordingly.
- If the command rate limit burst capacity has been depleted, listing
  creation is rate limited at the regular command rate limit of 30
  requests per minute.
- If other commands are taking place while listings are being created,
  all those calls count towards the command rate limit.

## Handling rate limits in Marketplace API

In standard usage, the rate limit will largely be undetectable in
Marketplace API. The API calls happen, for the most part, as a
consequence of user actions, so there is a natural delay between calls.
This means that encountering rate limit errors while developing with
Marketplace API can point you towards finding loops and other buggy
behavior in your code.

If your test environment is exposed to the public web, a traffic spike
caused by bots or crawlers can trigger rate-limiting, preventing
server-side rendering from functioning. This may temporarily prevent
access to your test environment. Therefore, we strongly recommend using
[basic HTTP authentication](/tutorial/deploy-to-render/#enable-http-basic-access-authentication)
on all deployed test marketplace applications.

## Handling rate and concurrency limits in Integration API

Rate limits will likely be more visible to you when developing with the
Integration API. In addition, Integration API also features concurrency
limiting, which needs to be handled.

### Integration SDK

Flex Integration SDK is configured to handle concurrency limits by
default starting from version 1.9.0. To take this built-in concurrency
limiting to use, you need to make sure your SDK is updated to at least
this version.

To handle the general rate limits in dev and test environments, you can
pass configurations for query and command rate limiters. You can see the
details of passing those configurations in our
[SDK documentation](https://sharetribe.github.io/flex-integration-sdk-js/rate-limits.html).

For listing creation rate limits, you will need to implement your own
rate limit handling logic. We have an example of this in our
[Integration API example scripts repository](https://github.com/sharetribe/flex-integration-api-examples/blob/master/scripts/create-listings.js).

It is good to note that rate limits apply by client IP address. If you
have more than one instance of the SDK running on the same server or
computer, then each SDK instance will rate-limit itself, but combined
they might still go over the total limits. Read more in our
[SDK documentation](https://sharetribe.github.io/flex-integration-sdk-js/rate-limits.html).
If that is the case, you can:

- customize the rate limits to lower values than the suggested ones,
- customize `httpsAgent` to use `maxSockets` set to much lower than 10
  (e.g. 3 to 5), so that the total number of concurrent requests has a
  lower chance of being over the limit
- implement your own retry with random exponential backoff in case some
  requests still get a 429 response
- or some combination of the above

### Integration API

If you are not using the Integration SDK, we strongly recommend you to
use your own rate and concurrency limit handling, by using e.g. a
library such as [bottleneck](https://www.npmjs.com/package/bottleneck)
for Node.js, or a similar existing implementation for your stack.
