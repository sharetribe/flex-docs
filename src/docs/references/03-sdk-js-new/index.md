---
title: JavaScript SDK (new)
slug: js-sdk-new
updated: 2019-01-02
category: references
ingress: "The SDK is the easiest way to interact with Sharetribe Flex Marketplace API.

It handles groundwork such as authentication, renewing authentication tokens
and serializing and deserializing data to and from JavaScript data structures.

This lets you to concentrate on building your marketplace front-end instead
of setting up the necessary boilerplate to communicate with the API."
private: true
---

## Installation

Yarn:

```sh
yarn add sharetribe-flex-sdk
```

## Usage

```js
const sharetribeSdk = require('sharetribe-flex-sdk');

// Create new SDK instance
const sdk = sharetribeSdk.createInstance({
  clientId: '<Your Client ID here>',
});

// Query first 5 listings
sdk.listings
  .query({ per_page: 5 })
  .then(res => {
    // Print listing titles
    res.data.data.forEach(listing => {
      console.log(`Listing: ${listing.attributes.title}`);
    });
  })
  .catch(res => {
    // An error occurred
    console.log(`Request failed with status: ${res.status} ${res.statusText}`);
  });
```

## Examples

See [examples/](https://github.com/sharetribe/flex-sdk-js/tree/master/examples/)
directory in GitHub repository.

## Changelog

See
[CHANGELOG.md](https://github.com/sharetribe/flex-sdk-js/tree/master/CHANGELOG.md)
in the GitHub repository.

## Extra

### Extra sub

#### Extra sub sub
