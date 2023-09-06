import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';

// Import configs and util modules
import { intlShape, injectIntl, FormattedMessage } from '../../../../util/reactIntl';
import { propTypes } from '../../../../util/types';
import { required } from '../../../../util/validators';

// Import shared components
import { Button, Form, FieldTextInput } from '../../../../components';

// Import modules from this directory
import css from './EditListingAccessoriesForm.module.css';


export const EditListingAccessoriesFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        formId,
        autoFocus,
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const { updateListingError, showListingsError } = fetchErrors || {};

      return (
        <Form onSubmit={handleSubmit} className={classes}>
          {updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingAccessoriesForm.updateFailed" />
            </p>
          ) : null}
          {showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingAccessoriesForm.showListingFailed" />
            </p>
          ) : null}
          <FieldTextInput
            id={`${formId}accessories`}
            name="accessories"
            className={css.input}
            autoFocus={autoFocus}
            type="textarea"
            label="Accessories"
            placeholder={intl.formatMessage({ id: 'EditListingAccessoriesForm.AccessoriesInputPlaceholder' })}
            validate={required(
              intl.formatMessage({
                id: 'EditListingDetailsForm.descriptionRequired',
              })
            )}
          />

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingAccessoriesFormComponent.defaultProps = {
  fetchErrors: null,
  formId: 'EditListingAccessoriesForm',
};

EditListingAccessoriesFormComponent.propTypes = {
  formId: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingAccessoriesFormComponent);
