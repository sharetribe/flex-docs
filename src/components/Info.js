import React from 'react';
import styled from 'styled-components';

import Banner from './Banner';

const InfoIcon = props => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <title>Alert Circle</title>
      <path
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
        fill="currentColor"
      />
      <path
        d="M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 6z"
        fill="#C4DFFF"
        stroke="#C4DFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path
        d="M256 367.91a20 20 0 1120-20 20 20 0 01-20 20z"
        stroke="#C4DFFF"
        fill="#C4DFFF"
      />
    </svg>
  );
};

const Icon = styled(InfoIcon)`
  width: 28px;
`;

const Info = props => {
  const { children, ...otherProps } = props;
  const fontColour = '#12337F';
  const borderColour = '#224FB6';
  const backgroundColour = '#C4DFFF';

  return (
    <Banner
      icon={Icon}
      fontColour={fontColour}
      borderColour={borderColour}
      backgroundColour={backgroundColour}
      title={'Information'}
      {...otherProps}
    >
      {children}
    </Banner>
  );
};

export default Info;
