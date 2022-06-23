import React from 'react';
import { stripIndent } from "common-tags";

import { Root } from './src/components';

export const wrapPageElement = props => {
  const { element } = props;
  return <Root>{element}</Root>;
};

export const onRenderBody = (
  { setHeadComponents },
  {}
) => {
  setHeadComponents([
    <link 
      rel="preconnect" 
      href="https://IPOXPQ3KFI-dsn.algolia.net" 
      crossOrigin="true"
      />,
    <link
      key="plugin-docsearch-css"
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"
    />
  ]);
};
