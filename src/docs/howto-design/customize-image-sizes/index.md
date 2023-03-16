---
title: Customize image sizes
slug: customize-image-sizes
updated: 2021-02-12
category: how-to-design
ingress:
  Flex's custom image variants functionality allows you to fine-tune
  image sizes to your marketplace's needs.
published: true
---

// TODO This can be configured in configLayout, so do we want to keep
the guide modified or skip it entirely?

Flex provides a selection of predefined image sizes, or _variants_ as
they are called, to be used in your marketplace website. However, when
none of the predefined variants suits your needs, a custom variant can
be requested. In this how-to guide, we'll recap how to fetch different
image variants. We'll also take a look at how to define custom image
variants when Flex's predefined variants don't offer the dimensions that
work best in by your marketplace.

## Image variants in Flex

A quick recap on how to request image variants: Image variants are
defined using a Flex concept called
[sparse attributes](https://www.sharetribe.com/api-reference/index.html#sparse-attributes).
They can be used to declare what attributes of a given resource is
returned for a resource. For example, the following query parameter
passed in listings search query to the JS SDK:
`'fields.image': ['variants.landscape-crop', 'variants.landscape-crop2x']`.

## Viewing vertical content

Like mentioned, the image variants above are used on the search page to
present search results. However, those image variants do not suit all
needs. This may be the case when listing images tend to have some
vertical content. Let's say we are building a clothes sharing
marketplace. If we use the variants mentioned above, we may end up with
search results page like this:

![Landscape variants on tall images](landscape-search.png 'Landscape variants on tall images')

The selected image variants crop out the images in an undesired way. To
present dresses in the search page, we will need to change the image
variants that are fetched for the page.

## Using custom variants

To present dresses well in listing images we would need an image in
portrait mode. However, none of the
[predefined image variants](https://www.sharetribe.com/api-reference/marketplace.html#images)
offer us a portrait image that would be a good fit for tall images. Thus
we will need to use _custom image variants_ to define our own image
variant. Custom image variants, like the predefined variants, are
requested using sparse attributes. What's different with custom variants
is that the requester will decide the variant name and will provide and
accompanying `imageVariant.*` parameter that describes the variant
dimensions and how is the original image fitted to those dimensions. For
example:

```js
'fields.image': ['variants.my-variant']
'imageVariant.my-variant': 'w:400;h:800;fit:scale'
```

See custom image variants in
[the Flex Marketplace API reference](https://www.sharetribe.com/api-reference/marketplace.html#image-variants)
for more information on the custom variant description syntax.

Let's now update our marketplace website to use image variants that work
better with pictures of clothing. What we are looking to do, is change
the aspect ratio of the images presented on the search page. In the
picture above the image ratio is 3:2. Let's change that to 2:3 and see
if that would work better.

First off, make sure that your `sdkLoader` has `util` imported from the
Flex SDK and exported from the file:

```shell
└── src
    └── util
        └── sdkLoader.js
```

```
const { createInstance, types, transit, util } = exportSdk;

export { createInstance, types, transit, util };
```

This allows us to use a utility function provided by the SDK to define
image variants as objects.

Next up, we'll need to define new image variants. The component that
shows the image in the search page uses a source set of two images so
let's replace the current 3:2 variants with two 2:3 ones:
`portrait-crop` and `portrait-crop2x`. This is done by updating the
`SearchPage.duck.js` file:

```shell
└── src
    └── containers
        └── SearchPage
            └── SearchPage.duck.js
```

Import the `sdkLoader` in the top of the file:

```
import { util as sdkUtil } from '../../util/sdkLoader';
```

And update the `loadData` function to define the new image variants:

```diff
export const loadData = (params, search) => {
  const queryParams = parse(search, {
    latlng: ['origin'],
    latlngBounds: ['bounds'],
  });
  const { page = 1, address, origin, ...rest } = queryParams;
  const originMaybe = config.sortSearchByDistance && origin ? { origin } : {};
  return searchListings({
    ...rest,
    ...originMaybe,
    page,
    perPage: RESULT_PAGE_SIZE,
    include: ['author', 'images'],
    'fields.listing': ['title', 'geolocation', 'price'],
    'fields.user': ['profile.displayName', 'profile.abbreviatedName'],
-   'fields.image': ['variants.landscape-crop', 'variants.landscape-crop2x'],
+   'fields.image': ['variants.portrait-crop', 'variants.portrait-crop2x'],
+   'imageVariant.portrait-crop': sdkUtil.objectQueryString({
+     w: 400,
+     h: 600,
+     fit: 'crop',
+   }),
+   'imageVariant.portrait-crop2x': sdkUtil.objectQueryString({
+     w: 800,
+     h: 1200,
+     fit: 'crop',
+   }),
    'limit.images': 1,
  });
};
```

Next we'll need to tell the listing card component to load the newly
defined image variants. In `ListingCard` perform the following change:

```shell
└── src
    └── components
        └── ListingCard
            └── ListingCard.js
            └── ListingCard.module.css
```

```diff
<LazyImage
  rootClassName={css.rootForImage}
  alt={title}
  image={firstImage}
- variants={['landscape-crop', 'landscape-crop2x']}
+ variants={['portrait-crop', 'portrait-crop2x']}
  sizes={renderSizes}
/>
```

Finally, update the aspect ratio in `ListingCard.module.css`:

```diff
.aspectWrapper {
- padding-bottom: 66.6667%; /* 3:2 Aspect Ratio */
+ padding-bottom: 150%; /* 2:3 Aspect Ratio */
  background: var(--matterColorNegative); /* Loading BG color */
}
```

Now we have images that suit the content of the marketplace:

![Portrait variants on tall images](portrait-search.png 'Portrait variants on tall images')

In order to make sure that the `ListingCard` component renders correctly
everywhere, make sure to fetch the 2:3 image variants we used here on
every page where the `ListingCard` component is used. Furthermore, the
changes listed in this how-to guide can be applied to other components
that view listing images too. The `.aspectWrapper` class name is usually
a good search keyword when finding all components that need to be
updated.
