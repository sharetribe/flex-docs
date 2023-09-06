/* eslint-disable no-console */
import EditListingAccessoriesForm from './EditListingAccessoriesForm';

export const Empty = {
  component: EditListingAccessoriesForm,
  props: {
    onSubmit: values => {
      console.log('Submit EditListingAccessoriesForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save accessories',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'page:EditListingPage',
};
