---
title: Rate limiting in Marketplace API and Integration API
slug: rate-limiting
updated: 2022-12-12
category: concepts-api-sdk
ingress:
  This article describes rate limiting in Marketplace API and
  Integration API, as well as suggests how to handle those limits
  gracefully.
published: true
---

Starting in XX-XX-2023, Marketplace API and Integration API will feature
new rate limits in dev and demo environments. In addition, Integration
API will feature new concurrency limits in dev and demo environments
and, eventually, in production environments.

<extrainfo title="What are rate limits and concurrency limits?">

**Rate limit** means a limit on the number of requests from your
marketplace that the API can process within a time span, e.g. in one
minute.

**Concurrency limit** means a limit on the number of simultaneous
requests from your marketplace that the API can process at any given
moment.

</extrainfo>

The rate limits are different for queries (fetching data) and commands
(modifying data). You can find the most up-to-date details of Flex rate
limits in the [API reference](TODO).

It is good to note that **production environments are currently not rate
limited**. Still, as you build your Flex marketplace implementation to
take the rate and concurrency limits into account in your development
environment, we do appreciate it if you also transfer those behaviors
into production.

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
default starting from version XX-XX. To take this built-in concurrency
limiting to use, you need to make sure your SDK is updated to at least
this version.

To handle rate limits, you can pass configurations for query and command
rate limiters. You can see the details of passing those configurations
in our [SDK documentation](TODO).

It is good to note that rate limits apply by client IP address. If you
have more than one instance of the SDK running on the same server or
computer, then each SDK instance will rate-limit itself, but combined
they might still go over the total limits. If that is the case, you can:

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
library such as [limiter](https://www.npmjs.com/package/limiter) for
Node.js, or a similar existing implementation for your stack.
