---
title: Customization checklist
slug: customization-checklist
updated: 2019-10-23
category: ftw-introduction
ingress:
  This guide lists the important things to go through when customizing
  Flex Template for Web (FTW).
published: true
---

Here is a list of things to update and check when starting to customize
FTW.

## 1. Customize visual styles

- Marketplace colors:
  [How to customize FTW styles](/ftw/how-to-customize-ftw-styles/)
- Favicon and application icons:
  [How to change FTW icons](/ftw/how-to-change-ftw-icons/)
- Social media sharing graphics in the
  [Page](https://github.com/sharetribe/ftw-daily/blob/master/src/components/Page/Page.js)
  component
- [Logo](https://github.com/sharetribe/ftw-daily/blob/master/src/components/Logo/Logo.js)
  component change and check that it works on
  [Topbar](https://github.com/sharetribe/ftw-daily/tree/master/src/components/Topbar),
  [Footer](https://github.com/sharetribe/ftw-daily/tree/master/src/components/Footer),
  and
  [CheckoutPage](https://github.com/sharetribe/ftw-daily/blob/master/src/containers/CheckoutPage/CheckoutPage.js)
- [Default background image](https://github.com/sharetribe/ftw-daily/blob/master/src/assets/background-1440.jpg)

## 2. Change text content

- Update UI texts or change the language:
  [How to change FTW UI texts](/ftw/how-to-change-ftw-ui-texts/)
- [LandingPage](https://github.com/sharetribe/ftw-daily/blob/master/src/containers/LandingPage/LandingPage.js)
  component: update and create branded sections
- [Footer](https://github.com/sharetribe/ftw-daily/blob/master/src/components/Footer/Footer.js)
  component
- [AboutPage](https://github.com/sharetribe/ftw-daily/blob/master/src/containers/AboutPage/AboutPage.js)
  component
- Update
  [Terms of Service](https://github.com/sharetribe/ftw-daily/blob/master/src/components/TermsOfService/TermsOfService.js)
  and
  [Privacy Policy](https://github.com/sharetribe/ftw-daily/blob/master/src/components/PrivacyPolicy/PrivacyPolicy.js)

    <extrainfo title="Locate Terms of Service and Privacy Policy">

      ```shell
      └── src
          └── components
              ├── TermsOfService
              └── PrivacyPolicy
      ```

    </extrainfo>

## 3. Change configuration

- Go through the
  [FTW Environment configuration variables](/ftw/ftw-env/)
- **Update config.js**
  - FTW-daily & FTW-hourly: _src/config.js_
  - FTW-product: _src/config/config.js_
- **Update marketplace-custom-config.js**. It contains configs for
  search page filters and sorting.
  - FTW-daily & FTW-hourly: _src/marketplace-custom-config.js_
  - FTW-product: _src/config/marketplace-custom-config.js_
- **Update default-location-searches.js**. It contains configs for
  search page filters and sorting.
  - FTW-daily & FTW-hourly: _src/default-location-searches.js_
  - FTW-product: _src/config/default-location-searches.js_

## 4. Other optional changes

- **Update
  [page schema](/ftw/how-to-add-static-pages-in-ftw/#add-page-schema)**
  to improve Search Engine Optimization (SEO)
- **Update ListingPage** to show extended data (aka publicData
  attribute).
  - It's inside _src/containers_ directory
- **Update EditListingWizard** component to add extended data listing
  entity.
  - FTW-daily and FTW-hourly has it in _src/components/_ directory and
  - FTW-product has it inside _src/containers/EditListingPage/_
    directory.
- **Update SearchPage** to filter with extended data
  - It's inside _src/containers_ directory
- **Update routeConfiguration.js** if routing changes are needed.
  - FTW-daily and FTW-hourly has it in _src/_ directory and
  - FTW-product has it inside _src/routing/_ directory
- **Update transaction email templates**. For more information, see
  [Edit email templates with Flex CLI](/how-to/edit-email-templates-with-flex-cli/)
  tutorial and [Email templates](/references/email-templates/) reference
  article.
- **Update unit type for order line-items**, if order's main unit
  changes ('day', 'night', 'units').
  - FTW-daily and FTW-hourly has config:
    [bookingUnitType](https://github.com/sharetribe/ftw-daily/blob/master/src/config.js)
    and
  - FTW-product has that config named as
    [lineItemUnitType](https://github.com/sharetribe/ftw-product/blob/master/src/config/config.js)
- **[Customize pricing](/tutorial/customize-pricing-tutorial/)**
- **Add more static pages**:
  [How to add static pages in FTW](/ftw/how-to-add-static-pages-in-ftw/)
- **Update other existing pages**
- **Update transaction process** (API + Web app)
