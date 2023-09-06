import React from 'react';
import '@testing-library/jest-dom';

import { fakeIntl } from '../../../../util/testData';
import { renderWithProviders as render, testingLibrary } from '../../../../util/testHelpers';

import EditListingAccessoriesForm from './EditListingAccessoriesForm';

const { screen, userEvent } = testingLibrary;

const noop = () => null;

describe('EditListingAccessoriesForm', () => {
  test('Check that accessories can be given and submit button activates', () => {
    const saveActionMsg = 'Save accessories';
    render(
      <EditListingAccessoriesForm
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
        unitType="day"
        saveActionMsg={saveActionMsg}
        updated={false}
        updateInProgress={false}
        disabled={false}
        ready={false}
      />
    );

    // Test that save button is disabled at first
    expect(screen.getByRole('button', { name: saveActionMsg })).toBeDisabled();

    // Fill mandatory attributes
    const accessories = 'Accessories';
    userEvent.type(screen.getByRole('textbox', { name: accessories }), 'Pannier rack');

    // Test that save button is enabled
    expect(screen.getByRole('button', { name: saveActionMsg })).toBeEnabled();
  });
});
