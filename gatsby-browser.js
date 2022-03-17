import React from 'react';

import { Root } from './src/components';

export const wrapPageElement = props => {
  const { element } = props;
  return <Root>{element}</Root>;
};
