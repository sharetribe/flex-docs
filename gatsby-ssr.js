import React from 'react';

import { Root } from './src/components';

export const wrapRootElement = props => {
  const { element } = props;
  return <Root>{element}</Root>;
};
