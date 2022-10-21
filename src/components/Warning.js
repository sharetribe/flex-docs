import React from 'react';
import styled from 'styled-components';

import Banner from './Banner';

const WarningIcon = props => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <title>Warning</title>
      <path
        d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z"
        fill="currentColor"
      />
      <path
        d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z"
        fill="#FFC3C3"
        stroke="#FFC3C3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path
        d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z"
        stroke="#FFC3C3"
        fill="#FFC3C3"
      />
    </svg>
  );
};

const Icon = styled(WarningIcon)`
  width: 28px;
`;

const Warning = props => {
  const { children, ...otherProps } = props;
  const fontColour = '#510c0c';
  const borderColour = '#BD1900';
  const backgroundColour = '#FFC3C3';
  return (
    <Banner
      icon={Icon}
      fontColour={fontColour}
      borderColour={borderColour}
      backgroundColour={backgroundColour}
      title={'Warning'}
    >
      {children}
    </Banner>
  );
};

export default Warning;
