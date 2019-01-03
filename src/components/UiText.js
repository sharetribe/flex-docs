import React from 'react';

import { dev } from '../config';
import uiTexts from '../ui-texts.json';

const uiText = id => {
  if (dev && !uiTexts[id]) {
    console.warn(`Missing translation for key: ${id}`);
  }
  return uiTexts[id] || id;
};

const UiText = props => {
  const { id, ...rest } = props;
  const componentProps = dev
    ? {
        'data-ui-text-id': id,
        ...rest,
      }
    : rest;
  return <span {...componentProps}>{uiText(id)}</span>;
};

UiText.fn = uiText;

export default UiText;
