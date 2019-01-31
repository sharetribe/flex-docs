import React from 'react';

import { P, UiText } from '../../components';

const LastUpdated = props => {
  const { date, ...rest } = props;
  const d = new Date(date);
  const isoString = d.toISOString();
  const uiString = d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <P {...rest} title={isoString} tiny>
      <UiText id="ArticlePage.LastUpdated.lastUpdated" />
      <time dateTime={isoString}>{uiString}</time>
    </P>
  );
};

export default LastUpdated;
