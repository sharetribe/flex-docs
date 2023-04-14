import React from 'react';
import styled from 'styled-components';

import { Banner, WarningIcon } from '../components';

const Warning = props => {
  const { children, ...otherProps } = props;
  const fontColour = '#510c0c';
  const borderColour = '#BD1900';
  const backgroundColour = '#FFC3C3';
  const Icon = styled(WarningIcon).attrs({
    bgcolor: backgroundColour,
  })`
    width: 28px;
  `;
  return (
    <Banner
      icon={Icon}
      fontColour={fontColour}
      borderColour={borderColour}
      backgroundColour={backgroundColour}
      title={'Warning'}
      {...otherProps}
    >
      {children}
    </Banner>
  );
};

export default Warning;
