/* eslint-disable no-console */
import EditListingRulesForm from './EditListingRulesForm';

export const Empty = {
  component: EditListingRulesForm,
  props: {
    onSubmit: values => {
      console.log('Submit EditListingRulesForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save rules',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'page:EditListingPage',
};
