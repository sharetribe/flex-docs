import React from 'react';
import { stripIndent } from "common-tags";

import { Root } from './src/components';

export const wrapPageElement = props => {
  const { element } = props;
  return <Root>{element}</Root>;
};

export const onRenderBody = ({ setHeadComponents }) => {
const plausibleHeadComponents = process.env.NODE_ENV === `production` ? [
  <link key="plausible-preconnect" rel="preconnect" href={`https://plausible.io`} />,
  <script
    key="plausible-script"
    async
    defer
    src="/stats/js/script/"
    data-domain="sharetribe.com/docs"
    data-api="/stats/api/event/"
  />,
  // See: https://plausible.io/docs/custom-event-goals#1-trigger-custom-events-with-javascript-on-your-site
  <script
    key="plausible-custom-events"
    dangerouslySetInnerHTML={{
      __html: `
        window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) };
      `,
    }}
  />,
] : [];
 return setHeadComponents([
    <link 
      rel="preconnect" 
      href="https://IPOXPQ3KFI-dsn.algolia.net" 
      crossOrigin="true"
      />,
    <link
      key="plugin-docsearch-css"
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"
    />,
    ...plausibleHeadComponents
  ]);
};
