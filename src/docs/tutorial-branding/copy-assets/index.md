---
title: Copy no-code changes from Test to Dev
slug: copy-assets
updated: 2023-09-14
category: tutorial-branding
ingress:
  Begin developing your marketplace by copying no-code changes from Test
  environment to Dev environment
published: true
---

In the no-code tutorial, you configured your marketplace into a bike
rental marketplace called Biketribe. We will continue to custom develop
on top of those same configurations. To do that, we will copy all
no-code changes from Test environment to Dev environment.

We recommend that throughout your development process, you follow the
same workflow:

- make all no-code changes in Test
- copy those no-code changes to Dev in order to develop on top of them

This way, your Test environment remains the single source of truth for
no-code changes, and you will be able to make code changes on top of the
same configuration that you have in the Test (and possibly Live)
environments.

### Copy no-code changes from Test to Dev

When you first run your dev marketplace, you see the default branding
and other features.

![Default marketplace screenshot](./generic-landingpage.png)

_TODO if necessary, the Test blank assets are available locally in
/Documents/Codebase/Notes/generics-tutorial-assets -S_

- Go to your Test environment, which now has your Biketribe related
  no-code changes, and click "Copy changes to..."

TODO SCREENSHOT

You will see a modal showing all the changes you have made that are
currently not in Dev. Since we have not copied anything to Dev, the
modal shows all of our no-code changes.

TODO SCREENSHOT

Select all the changes, and then click button. Now, you can go to your
dev environment, and you will see that the content changes have been
copied over.

TODO SCREENSHOT

When you now go to the browser that is running your template in
localhost:3000, you will also see that the branding corresponds to your
Biketribe marketplace.

TODO SCREENSHOT

You can now continue to develop your marketplace with the same
configurations you set up in Test!
