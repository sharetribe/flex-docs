import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { isScrollingDisabled } from '../../ducks/ui.duck';
import { LayoutSideNavigation, Page, UserNav, H3 } from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import {
  deleteAccount,
  deleteAccountClear,
  resetPassword,
} from './DeleteAccountPage.duck';
import { logout } from '../../ducks/auth.duck';
import css from './DeleteAccountPage.module.css';

export const DeleteAccountPageComponent = props => {
  const {
    deleteAccountError,
    deleteAccountInProgress,
    currentUser,
    onChange,
    onLogout,
    onSubmitDeleteAccount,
    onResetPassword,
    resetPasswordInProgress,
    resetPasswordError,
    accountDeleted,
    scrollingDisabled,
    intl,
  } = props;

  const handleDeleteAccount = values => {
    return onSubmitDeleteAccount(values).then(() => {
      onLogout();
    });
  };

  useEffect(() => {
    return onChange();
  }, []);

  const pageDetails = (
    <div className={css.details}>
      <FormattedMessage
        id={
          deleteAccountError?.status == 409
            ? 'DeleteAccountPage.error'
            : 'DeleteAccountPage.details'
        }
        values={{ errorCause: deleteAccountError?.message }}
      />
    </div>
  );

  const title = intl.formatMessage({ id: 'DeleteAccountPage.title' });

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation
        topbar={
          <>
            <TopbarContainer
              currentPage="DeleteAccountPage"
              desktopClassName={css.desktopTopbar}
              mobileClassName={css.mobileTopbar}
            />
            <UserNav currentPage="DeleteAccountPage" />
          </>
        }
        sideNav={null}
        useAccountSettingsNav
        currentPage="DeleteAccountPage"
        footer={<FooterContainer />}
      >
        <div className={css.content}>
          <H3 as="h1" className={css.title}>
            <FormattedMessage id="DeleteAccountPage.heading" />
          </H3>
          {pageDetails}
        </div>
      </LayoutSideNavigation>
    </Page>
  );
};

DeleteAccountPageComponent.defaultProps = {
  deleteAccountError: null,
  currentUser: null,
  resetPasswordInProgress: false,
  resetPasswordError: null,
};

const { bool, func } = PropTypes;

DeleteAccountPageComponent.propTypes = {
  deleteAccountError: propTypes.error,
  deleteAccountInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  onChange: func.isRequired,
  onSubmitDeleteAccount: func.isRequired,
  accountDeleted: bool.isRequired,
  scrollingDisabled: bool.isRequired,
  resetPasswordInProgress: bool,
  resetPasswordError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  // Topbar needs user info.
  const {
    deleteAccountError,
    deleteAccountInProgress,
    accountDeleted,
    resetPasswordInProgress,
    resetPasswordError,
  } = state.DeleteAccountPage;
  const { currentUser } = state.user;
  return {
    deleteAccountError,
    deleteAccountInProgress,
    currentUser,
    accountDeleted,
    scrollingDisabled: isScrollingDisabled(state),
    resetPasswordInProgress,
    resetPasswordError,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(deleteAccountClear()),
  onLogout: () => dispatch(logout()),
  onSubmitDeleteAccount: values => dispatch(deleteAccount(values)),
  onResetPassword: values => dispatch(resetPassword(values)),
});

const DeleteAccountPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(DeleteAccountPageComponent);

export default DeleteAccountPage;
