---
title: How to implement a like feature using events
slug: like-feature
updated: 2021-01-20
category: cookbook-events
ingress:
  Following this guide, you'll be able to build a feature that allows users to like listings using events and user extended data
published: true
---

Events represent changes in marketplace data resources. In this guide, we use events to listen to changes in user extended data. We react to these events by updating a 'likes' value in listing extended data. In addition, we display the number of likes on the listing page and allow users to interact by clicking on a 'like' -button. 

## Approaches to updating extended data

[Extended data](/references/extended-data/) is a practical feature that can be used to store structured data associated with either listings, users or transactions.

When implementing a like-counter, it's logical to store the number of likes associated with a listing in the listing's extended data. We can easily access the number of likes by querying the [query-listings](https://www.sharetribe.com/api-reference/marketplace.html#query-listings) endpoint and passing the relevant listing ID as a query parameter. However, merely storing the number of likes in the listing's extended data doesn't provide information about which user has liked the listing. If we can associate likes with users, we can build a dislike feature and show the user a list of listings they have liked. A naive approach would be to store the user ID in the listing's extended data each time they like a listing. However, to render a list of liked listings, we would need to loop through all listings to find all occurrences of the user ID. That is why in this guide, in addition to storing the number of likes in the listing's extended data, we choose to save the listing ID in the user's extended data.

To allow users to like listings, we introduce a UI-element users can interact with to like a listing. However, when we update a listing's extended data as a reaction to user input, we are prone to a race condition. Fortunately, Flex provides a powerful feature called [events](references/events/) that we can use to solve the problem. We can listen to events using a script that polls the [events endpoint](https://www.sharetribe.com/api-reference/integration.html#query-events). As events are handled sequentially, the script can update the listing's extended data while avoiding race conditions. A downside to using events is that the like count may take a moment to update. We can mask this delay by temporarily incrementintg the like value in the UI.

## Create a UI component the user can interact with
We start by creating an icon that users can interact with to like or dislike a listing. Next to the icon, we'll display the number of likes. For the UI component, we'll create a new subcomponent `SectionLikes.js` in the ListingPage directory. 

###### Step 1: Create a new file

```shell
└── src
    └── containers
        └── ListingPage
            ├── SectionLikes.js
            ├── ListingPage.js
            └── ListingPage.module.css
```

###### Step 2: Add the new subcomponent
We'll create a new component that renders an svg and the amount of likes:
```jsx
import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import css from './ListingPage.module.css';

const IconHeart = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 28 "><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
    </svg>
  );
};

const SectionLikes = props => {
  const { 
    publicData, 
  } = props;

  const likes = publicData?.likes ? publicData.likes : 0;

  return (
    <span className={css.heartIcon}> 
      <IconHeart /> { likes }
    </span>
  )
};

export default SectionLikes;
```

##### Step 3: Import the component
Next, let's import the new component in SectionHeading.js:

```jsx
import SectionLikes from './SectionLikes';
```


##### Step 4: Spread the rest of the props to `rest`
In order to access publicData in our new component, we have to pass it as a prop to SectionHeading and from there on to SectionLikes:
```diff
const SectionHeading = props => {
  const {
    priceTitle,
    formattedPrice,
    richTitle,
    category,
    hostLink,
    showContactUser,
    onContactUser,
+   ...rest
  } = props;
```

##### Step 5: Add the component to the render method
We've created the new component SectionLikes.js but it still needs to be included in the render method of SectionHeading.js:
```diff
  return (
    <div className={css.sectionHeading}>
      <div className={css.desktopPriceContainer}>
        <div className={css.desktopPriceValue} title={priceTitle}>
          {formattedPrice}
        </div>
        <div className={css.desktopPerUnit}>
          <FormattedMessage id={unitTranslationKey} />
        </div>
      </div>
      <div className={css.heading}>
        <h1 className={css.title}>{richTitle}</h1>
        <div className={css.author}>
          {category}
          <FormattedMessage id="ListingPage.hostedBy" values={{ name: hostLink }} />
          {showContactUser ? (
            <span className={css.contactWrapper}>
              <span className={css.separator}>•</span>
              <InlineTextButton
                rootClassName={css.contactLink}
                onClick={onContactUser}
                enforcePagePreloadFor="SignupPage"
              >
                <FormattedMessage id="ListingPage.contactUser" />
              </InlineTextButton>
            </span>
          ) : null}
+         <span className={css.separator}>•</span>
+         <SectionLikes {...rest} />
        </div>
      </div>
    </div>
  );
```

###### Step 6: Update ListingPage.module.css

Finally, let's style our new component by adding the following CSS rules in ListingPage.module.css:
```css
.heartIcon {
  border-radius: 11px;
  cursor: pointer;
  display: inline-block;
  padding: 5px;
  &:hover {
    background-color: #e3e1e1;
  }
}

.heartDisabled > svg  {
  fill: var(--marketplaceColorLight);;
}

.heartIcon > svg  {
  fill: #fdb7b0;
  transition: all 0.2s;
}

.iconLiked > svg {
  fill: var(--marketplaceColorLight);
  transition: all 0.2s;
}
```

Now, you should be able to see a heart-shaped icon with a like counter next to it if you navigate to the listing page:

![Example of heart icon](heart-icon.png 'Example of heart icon')


## Update user extended data
To update the user extended data, we'll need to make some changes to ListingPage.duck.js. We'll need to import the currentUserShowSuccess function from `user.duck.js` to update the current user. In addition, we'll be adding a new action type, action creator and reducer to the file. For more information on how Redux is setup in FTW, refer to our [article on Redux](/ftw-data-flow/ftw-redux).

###### Step 1: Import currentUserShowSuccess
```jsx
import { fetchCurrentUser, fetchCurrentUserHasOrdersSuccess, currentUserShowSuccess } from '../../ducks/user.duck';
```

###### Step 2: Add new action types 
```jsx
export const UPDATE_LIKES_REQUEST = 'app/ListingPage/UPDATE_LIKES_REQUEST';
export const UPDATE_LIKES_SUCCESS = 'app/ListingPage/UPDATE_LIKES_SUCCESS';
export const UPDATE_LIKES_ERROR = 'app/ListingPage/UPDATE_LIKES_ERROR';
```

###### Step 3: Add new initialStates:
```diff
const initialState = {
  id: null,
  showListingError: null,
  reviews: [],
  fetchReviewsError: null,
  timeSlots: null,
  fetchTimeSlotsError: null,
  lineItems: null,
  fetchLineItemsInProgress: false,
  fetchLineItemsError: null,
  sendEnquiryInProgress: false,
  sendEnquiryError: null,
  enquiryModalOpenForListingId: null,
+ updateLikesError: null,
+ updateLikesInProgress: false,
};

```
###### Step 4: Update the reducer:
```jsx
case UPDATE_LIKES_REQUEST:
  return { ...state, updateLikesInProgress: true, updateLikesError: null };
case UPDATE_LIKES_SUCCESS:
  return { ...state, updateLikesInProgress: false };
case UPDATE_LIKES_ERROR:
  return { ...state, updateLikesInProgress: false, updateLikesError: payload };  
```

##### Step 5: Add new action creators:
```jsx
export const updateLikesRequest = params => ({ 
  type: UPDATE_LIKES_REQUEST,
  payload: { params },
})
export const updateLikesSuccess = result => ({
  type: UPDATE_LIKES_SUCCESS,
  payload: result.data,
})
export const updateLikesError = error => ({
  type: UPDATE_LIKES_ERROR,
  payload: error,
  error: true,
})

```

###### Step 6: Add new thunk
Thunks are used to call action creators that return functions instead of action objects:
```jsx
export const updateLikes = (listingId) => (dispatch, getState, sdk) => {
  dispatch(updateLikesRequest());

  return dispatch(fetchCurrentUser()).then(() => {

    const currentUser = getState().user.currentUser;
    const currentLikes = currentUser?.attributes?.profile?.privateData?.likedListings;

    const queryParams = {
      expand: true,
      include: ['profileImage'],
      'fields.image': ['variants.square-small', 'variants.square-small2x'],
    };

    // if listingId already exists in currentLikes, it should be removed from currentLikes
    // if user has current likes, merge listingId into current likes
    const ifDislike = !!currentLikes?.includes(listingId);
    const likedListings = ifDislike ? currentLikes.filter(id => id !== listingId) : currentLikes ? [ ...currentLikes, listingId ] : [ listingId ]

    return sdk.currentUser
    .updateProfile({ privateData: { likedListings } }, queryParams)
    .then(response => {
      dispatch(updateLikesSuccess(response));

      const entities = denormalisedResponseEntities(response);
      if (entities.length !== 1) {
        throw new Error('Expected a resource in the sdk.currentUser.updateProfile response');
      }
      const currentUser = entities[0];

      // Update current user in state.user.currentUser through user.duck.js
      dispatch(currentUserShowSuccess(currentUser));
    })
    .catch(e => {
      dispatch(updateLikesError(storableError(e)))
    });
  })
}
```
###### Step 7: Import updateLikes to ListingPage.js
We need to import the new thunk we defined in the `ListingPage.duck.js` file into `ListingPage.js` in order to connect to the Redux store through `mapDispatchToProps`:
```jsx
import { sendEnquiry, fetchTransactionLineItems, setInitialValues, updateLikes } from './ListingPage.duck';
```

###### Step 8: Initialise new props in ListingPage component
We need to initialise the props that are connected to the Redux store:
```diff
  render() {
    const {
      unitType,
      isAuthenticated,
      currentUser,
      getListing,
      getOwnListing,
      intl,
      onManageDisableScrolling,
+     onUpdateLikes,
+     updateLikesInProgress,
      params: rawParams,
      location,
```

###### Step 9: Update ListingPageComponent propTypes
FTW uses `propTypes` to validate that the data we receive is valid:
```diff
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
+ updateLikesInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,
```

###### Step 10: Connect updateLikes to mapDispatchToProps function on ListingPage.js
```diff
const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
+  onUpdateLikes: (listingId) => dispatch(updateLikes(listingId)),
  callSetInitialValues: (setInitialValues, values, saveToSessionStorage) =>
    dispatch(setInitialValues(values, saveToSessionStorage)),
  onFetchTransactionLineItems: (bookingData, listingId, isOwnListing) =>
```


## Update likes when clicking on the icon
Currently, clicking on the icon will do nothing. We need to make some small tweaks for the button click to successfully update the user extended data. First, we'll need to pass props down through SectionHeading to SectionLikes. Then we'll add an onClick event handler to the React component in SectionLikes. 

###### Step 1: Pass `SectionHeading` the correct props in `ListingPage.js`
```diff
<SectionHeading
  priceTitle={priceTitle}
  formattedPrice={formattedPrice}
  richTitle={richTitle}
  category={category}
  hostLink={hostLink}
  showContactUser={showContactUser}
  onContactUser={this.onContactUser}
+ publicData={publicData} 
+ onUpdateLikes={onUpdateLikes} 
+ listingId={listingId.uuid} 
+ currentUser={currentUser} 
+ updateLikesInProgress={updateLikesInProgress}
/>
```

###### Step 2: Define props in `SectionLikes.js`
```diff
const SectionLikes = props => {
  const { 
    publicData, 
+   onUpdateLikes, 
+   listingId, 
+   currentUser, 
+   updateLikesInProgress, 
  } = props;
```

###### Step 3: Define currentLikes in `SectionLikes.js`
```jsx
const currentLikes = currentUser?.attributes?.profile?.privateData?.likedListings;
```

###### Step 4: Add an onClick event handler
```diff
<span className={css.heartIcon} 
+ onClick={() => {
+   if (!updateLikesInProgress && currentUser) {
+     onUpdateLikes(listingId);
+    }
+  }}>
```

Now, clicking on the icon will either add or remove the listing to the user exteneded data with the key `likedListings`. However, as liked listings are only saved into user extended data at the moment, the number of likes still remains at zero. 

## Listening to events
Using events we can react to changes in users' extended data. To do this we'll listen to the [/events/query](https://www.sharetribe.com/api-reference/integration.html#query-events) endpoint, filter out relevant events and finally update listing extended data. We'll use the [`notify-new-listings.js`](https://github.com/sharetribe/flex-integration-api-examples/blob/master/scripts/notify-new-listings.js) script in the integration-api-examples as a basis for our new script. Make sure to follow the instructions at the [root of the repository](https://github.com/sharetribe/flex-integration-api-examples#getting-started) if you're unsure how to run the script locally.

First off, we'll need to change what event type we want to filter. In our case, it's `user/updated`.

###### Step 1: Filter events by `user/updated`
```diff
const queryEvents = (args) => {
-  var filter = {eventTypes: "listing/created,listing/updated"};
+  var filter = {eventTypes: "user/updated"};
  return integrationSdk.events.query(
    {...args, ...filter}
  );
};

```

###### Step 2: Add a function that updates the 'likes' value:
Next, we'll add a function that updates the 'likes' value in listing extended data by calling the Integration API listings/update endpoint:
```js
  /** 
  * @param {string} listingId
  * @param {number} likeAddition – A value representing a like or a dislike that is either added to or subtracted from currentLikes
  */
  const updateListing = (listingId, likeAddition) => {
    return integrationSdk.listings.query({
      ids: listingId,
    })
    .then(listings => {
      const listing = listings.data.data[0];
      const currentLikes = listing.attributes.publicData.likes || 0;
      const updatedLikes = currentLikes + likeAddition;
      return integrationSdk.listings.update({
        id: listingId,
        publicData: {
            likes: updatedLikes,
        },
      }, { expand: true })
  })
};
```

###### Step 3: Add helper functions:

We'll no longer need the `analyzeEvent` or `isPublished` functions found in the boilerplate code. Instead, let's add a few new functions. These functions will help us determine if the event we've received is a like or dislike, and reduce multiple likes to a single API call:

```js
// Get the difference between two arrays
const getDifference = (arr1, arr2) => {
  return arr1.filter(x => !arr2.includes(x))
}

// Compare the amount of likes in the previous event to the current one to
// determine which listing was liked or disliked
const getLikedListingId = (previousLikes, currentLikes) => {
  if (previousLikes === null) return currentLikes;
  if (currentLikes === null) return previousLikes;
  else return previousLikes.length < currentLikes.length ? getDifference(currentLikes, previousLikes) : getDifference(previousLikes, currentLikes);
}

const getLikeCount = (previousLikes, currentLikes) => {
  return previousLikes === null || previousLikes.length < currentLikes.length ? 1 : -1;
}

// Reducer returns an object with listing ID's as keys and amount of likes as values
const groupEvents = events => {
  return likesToBeUpdated = events.reduce((likes, event) => {
    const { resource: user, previousValues } = event.attributes;
    // we might have a user/updated event that doesn't target likedListings
    if (!previousValues.attributes?.profile?.privateData?.likedListings) {
      return {}
    }
    const { likedListings: previouslyLikedListings} = previousValues.attributes.profile.privateData || {};
    const likedListings = user.attributes.profile?.privateData?.likedListings; 
    const likeCount = getLikeCount(previouslyLikedListings, likedListings); 
    const listingId = getLikedListingId(previouslyLikedListings, likedListings); 
    likes[listingId] = likes[listingId] ? likes[listingId] + likeCount : likeCount;
    return likes;
  }, {})
}
```
Finally, to call the right functions, let's make a few changes to the `pollLoop` function:

```diff
const pollLoop = (sequenceId) => {
  var params = sequenceId ? {startAfterSequenceId: sequenceId} : {createdAtStart: startTime};
  queryEvents(params)
    .then(res => {
      const events = res.data.data;
      const lastEvent = events[events.length - 1];
      const fullPage = events.length === res.data.meta.perPage;
      const delay = fullPage? pollWait : pollIdleWait;
-    const lastSequenceId = lastEvent ? lastEvent.attributes.sequenceId : sequenceId;
-     	      events.forEach(e => {	
-       analyzeEvent(e);	
-     });
-      if (lastEvent) saveLastEventSequenceId(lastEvent.attributes.sequenceId);	
-     setTimeout(() => {pollLoop(lastSequenceId);}, delay);
+     const likesToUpdate = groupEvents(events);
+     const actions = Object.keys(likesToUpdate).map(key => updateListing(key, likesToUpdate[key]));
+     const results = Promise.all(actions);
+     results.then(result => {
+       result.forEach(el => {
+         console.log(`Listing ID ${el.data.data.id.uuid} now has ${el.data.data.attributes.publicData.likes} like(s).`)
+       })
+
+       if (lastEvent) saveLastEventSequenceId(lastEvent.attributes.sequenceId);
+       setTimeout(() => {pollLoop(lastSequenceId);}, delay);
+     })
+   });
};
```

You can now run the script locally following the instructions [here](https://github.com/sharetribe/flex-integration-api-examples#getting-started).

## Increment the counter in the UI
You can now click on the likes button, and the number of likes is updated by the script polling the events endpoint. However, the like count doesn't get updated immediately due to the slight latency in our events listener. 

Using React state, we can temporarily increment the counter. Adding a temporary increment isn't mandatory as the number of likes shown to the user will eventually be consistent with the value in extended data. However, we can provide the user with instant feedback by updating the like count in the front-end, even though our event listener updates the actual like count.
 
 ###### Step 1: Add new state to ListingPage.js
 ```diff
 export class ListingPageComponent extends Component {
  constructor(props) {
    super(props);
    const { enquiryModalOpenForListingId, params } = props;
    this.state = {
      pageClassNames: [],
      imageCarouselOpen: false,
      enquiryModalOpen: enquiryModalOpenForListingId === params.id,
+     likesOffset: 0,
    };
 ```

 ###### Step 2: Pass new functions as props to SectionHeading
 ```jsx
<SectionHeading
  likesOffset={this.state.likesOffset}
  onSubtractLike={() => this.setState({ likesOffset: this.state.likesOffset - 1})}
  onAddLike={() => this.setState({ likesOffset: this.state.likesOffset + 1 })}
 ```

###### Step 3: Define new props in SectionLikes.js
```diff
const SectionLikes = props => {
  const { 
    publicData, 
    onUpdateLikes, 
    listingId, 
    currentUser, 
    updateLikesInProgress, 
+   likesOffset, 
+   onAddLike, 
+   onSubtractLike,
  } = props;
```

###### Step 4: Include logic to increment likes and conditional styling
```diff
  const currentLikes = currentUser?.attributes?.profile?.privateData?.likedListings;
+ const alreadyLiked = currentLikes?.includes(listingId);
  const likes = publicData?.likes ? publicData.likes : 0;
+  const classes = classNames(currentUser ? css.heartIcon : css.heartDisabled, alreadyLiked ? css.iconLiked : null)

  return (
-   <span className={css.heartIcon}
+   <span className={classes} 
      onClick={() => {
        if (!updateLikesInProgress && currentUser) {
          onUpdateLikes(listingId);
+         if (alreadyLiked) {
+           onSubtractLike();
+         }
+         else {
+           onAddLike();
+         }
        }
      }}> 

-     <IconHeart /> { likes }
+     <IconHeart /> { likes + likesOffset }
```

Now while running the event listener script you should have a fully functional like button. If you're interested in reading more about events, you can read our articles on [reacting to events](/cookbook-events/reacting-to-events/) and [setting up Zapier](/cookbook-events/set-up-and-use-zapier/).