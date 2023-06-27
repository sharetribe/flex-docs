import React from 'react';

import { Root } from './src/components';

export const wrapPageElement = props => {
  const { element } = props;
  return <Root>{element}</Root>;
};

export const onRouteUpdate = ({ location }) => {
  // Plausible Analytics
  if (
    process.env.NODE_ENV === `production` &&
    typeof window.plausible !== `undefined`
  ) {
    window.plausible(`pageview`);
  }
};
