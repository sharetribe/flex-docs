---
title: How to deploy FTW to production
slug: how-to-deploy-ftw-to-production
updated: 2021-01-21
category: ftw-hosting
ingress:
  This guide describes how to set up a production deployment for Flex
  Template for Web (FTW).
published: true
---

## What is a production environment and how does it differ from a test environment?

- test environment => meant for testing and exploring, no real user data
  or transactions
  - in Flex: linked to the Flex **dev** environment i.e. uses the
    application info from that environment
  - deployment can be e.g. on a free plan with shared resources since
    there's no requirement for consistent uptime for a substantial
    volume of users
- production environment => meant for the real-life usage of the
  application, and moving code from test to production happens once the
  code has been sufficiently tested first

  - in Flex: linked to the Flex **prod** environment
  - deployment should be on a paid plan with dedicated resources

- Read more about [Flex environments](/concepts/flex-environments/)

## Where to host your production client application?

- Heroku, render, aws
- What to consider when hosting
- Why can't ftw be hosted on serverless platforms such as Vercel or
  Netlify
  - server side rendering
  - possible to refactor server features to lambda functions for
    serverless hosting, however it is likely not worth the effort vs the
    benefit since there are also options for hosting the server

## Launching to production

- Some environment vars need to be changed, such as Set NODE_ENV to
  'production'
- Make sure you've removed unnecessary console.logs etc.
- Links to Heroku and Render guides
  - [Deploy FTW to Heroku](/ftw/how-to-deploy-ftw-to-heroku/)
