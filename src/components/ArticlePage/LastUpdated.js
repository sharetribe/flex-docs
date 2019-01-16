import React from 'react';

import { P } from '../../components';

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
    <P {...rest} title={isoString}>
      Last updated <time dateTime={isoString}>{uiString}</time>
    </P>
  );
};

export default LastUpdated;
