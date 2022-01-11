import React, { useState, useEffect } from 'react';
import { oneOf, node } from 'prop-types';

const isDev = process.env.NODE_ENV === 'development';

const initialConsent = {
  necessary: true,
  preferences: isDev || false,
  statistics: isDev || false,
  marketing: isDev || false,
};

const useCookieConsent = () => {
  const [consent, setConsent] = useState(initialConsent);

  const updateConsent = () => {
    if (window?.Cookiebot?.consent) {
      console.log('Update consent to:', window.Cookiebot.consent);
      // For reference, see: https://www.cookiebot.com/en/developer/
      const {
        necessary,
        preferences,
        statistics,
        marketing,
      } = window.Cookiebot.consent;
      setConsent({ necessary, preferences, statistics, marketing });
    } else {
      console.log('Update consent to initial values');
      setConsent(initialConsent);
    }
  };

  useEffect(() => {
    const initEventName = 'CookiebotOnConsentReady';
    window.addEventListener(initEventName, updateConsent);
    return () => {
      window.removeEventListener(initEventName, updateConsent);
    };
  });

  return consent;
};

const CookieConsent = props => {
  const { category, fallback, children } = props;
  const consent = useCookieConsent();
  const hasConsent = consent[category] === true;
  return hasConsent ? <>{children}</> : <>{fallback}</>;
};

CookieConsent.propTypes = {
  // https://support.cookiebot.com/hc/en-us/articles/360003783574-Customizing-the-cookie-categories-
  category: oneOf(['necessary', 'preferences', 'statistics', 'marketing'])
    .isRequired,

  // Fallback content to render if the consent to the specified category is not given
  fallback: node.isRequired,
};

export default CookieConsent;
