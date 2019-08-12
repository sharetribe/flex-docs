---
title: FTW customization checklist
slug: ftw-customization-checklist
updated: 2019-08-12
category: guides
ingress:
  This guide lists the important things to go through when customizing
  Flex Template for Web (FTW).
published: true
---

Here is a list of things to update and check when starting to customize
FTW.

## 1. Customize visual styles

- Marketplace colors:
  [How to customize FTW styles](/guides/how-to-customize-ftw-styles/)
- Favicon and application icons:
  [How to change FTW icons](/guides/how-to-change-ftw-icons/)
- Social media sharing graphics in the
  [Page](https://github.com/sharetribe/flex-template-web/blob/master/src/components/Page/Page.js)
  component
- [Logo](https://github.com/sharetribe/flex-template-web/blob/master/src/components/Logo/Logo.js)
  component change and check that it works on [Topbar](https://github.com/sharetribe/flex-template-web/tree/master/src/components/TopbarDesktop), [Footer](https://github.com/sharetribe/flex-template-web/tree/master/src/components/Footer), and
  [CheckoutPage](https://github.com/sharetribe/flex-template-web/blob/master/src/containers/CheckoutPage/CheckoutPage.js)
- [Default background image](https://github.com/sharetribe/flex-template-web/blob/master/src/assets/background-1440.jpg)
- [Maps Marker icon](https://github.com/sharetribe/flex-template-web/blob/master/public/static/icons/map-marker-32x32.png)

## 2. Change text content

- Update UI texts or change the language:
  [How to change FTW UI texts and translations](/guides/how-to-change-ftw-ui-texts-and-translations/)
- [LandingPage](https://github.com/sharetribe/flex-template-web/blob/master/src/containers/LandingPage/LandingPage.js)
  component: update and create branded sections
- [Footer](https://github.com/sharetribe/flex-template-web/blob/master/src/components/Footer/Footer.js)
  component
- [AboutPage](https://github.com/sharetribe/flex-template-web/blob/master/src/containers/AboutPage/AboutPage.js)
  compponent
- Update Terms of Service and Privacy Policy:
  [How to change Terms of Service and Privacy Policy in FTW](/guides/how-to-change-tos-and-privacy-policy-in-ftw/)

## 3. Change configuration

- Go through the
  [FTW Environment configuration variables](/references/ftw-env/)
- [Config: siteTitle](https://github.com/sharetribe/flex-template-web/blob/master/src/config.js)
  for page schema (SEO)
- [Config: marketplace address](https://github.com/sharetribe/flex-template-web/blob/master/src/config.js):
  contact details also improve SEO
- [Config: social media pages](https://github.com/sharetribe/flex-template-web/blob/master/src/config.js)
- [Marketplace custom config](https://github.com/sharetribe/flex-template-web/blob/master/src/marketplace-custom-config.js)

## 4. Other optional changes

- Update
  [ListingPage](https://github.com/sharetribe/flex-template-web/blob/master/src/containers/ListingPage/ListingPage.js)
  to show extended data (aka publicData attribute)
- Update
  [EditListingWizard](https://github.com/sharetribe/flex-template-web/blob/master/src/components/EditListingWizard/EditListingWizard.js)
  and panels to add extended data
- Update
  [SearchPage](https://github.com/sharetribe/flex-template-web/blob/master/src/containers/SearchPage/SearchPage.js)
  to filter with extended data
- Update
  [routeConfiguration](https://github.com/sharetribe/flex-template-web/blob/master/src/routeConfiguration.js)
  if needed
- Update all email templates in
  [ext/default-mail-templates](https://github.com/sharetribe/flex-template-web/tree/master/ext/default-mail-templates):
  .html, subject.txt, and text.txt
  - See the
    [Email template reference](https://www.sharetribe.com/docs/references/email-templates/)
    for more information
- Update
  [config: bookingUnitType](https://github.com/sharetribe/flex-template-web/blob/master/src/config.js)
  if needed
- If `line-item/units` is used, add quantity handling to
  [BookingDatesForm](https://github.com/sharetribe/flex-template-web/blob/master/src/forms/BookingDatesForm/BookingDatesForm.js),
  [ListingPage](https://github.com/sharetribe/flex-template-web/blob/master/src/containers/ListingPage/ListingPage.js),
  [CheckoutPage](https://github.com/sharetribe/flex-template-web/blob/master/src/containers/CheckoutPage/CheckoutPage.js)
- Add more static pages:
  [How to add static pages in FTW](/guides/how-to-add-static-pages-in-ftw/)
- Changes to existing pages
- Changes to transaction process (API + Web app)
