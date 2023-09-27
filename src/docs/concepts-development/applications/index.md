---
title: Applications
slug: applications
updated: 2019-12-10
category: concepts-development
ingress:
  Sharetribe Applications are the entities that authenticate to and
  access the Sharetribe APIs.
published: true
---

In Sharetribe, accessing the
[Marketplace API or the Integration API](/concepts/marketplace-api-integration-api/)
starts with creating an
[_application_](https://flex-console.sharetribe.com/applications). Each
application has the necessary credentials (client ID and optional client
secret) that are used to [authenticate](/concepts/authentication-api/)
your application to the Sharetribe APIs.

Applications come in two types: Marketplace API applications and
Integration API applications. Both types of applications have both a
client ID and a client secret. As a general rule, the client ID can be
considered public information, while the client secret must always be
kept secure.

## Best practices

- Create a separate application for each of your systems that access the
  Sharetribe APIs. For example, if you have a web and a mobile app,
  create two separate Marketplace API applications.
- Name your applications so that it is easier for you to recognize how
  each one is used. For instance, use names like "Web UI", "iOS mobile
  app", "reporting", "mailing list integration", etc.

<warning>

Always keep your applications' client secret secure. Never expose it in
a untrusted device or application, such as end users' browsers or mobile
apps.

</warning>
