import React from 'react';
import styled from 'styled-components';

import { baselineSpacing, pageMaxWidth } from '../brand-components';
import BaseLayout from './BaseLayout';

const Centered = styled.div`
  padding: ${baselineSpacing}px;
  margin-left: auto;
  margin-right: auto;
  max-width: ${pageMaxWidth}px;
`;

const SingleColumnLayout = props => {
  const { children, ...rest } = props;
  return (
    <BaseLayout {...rest}>
      <Centered>{children}</Centered>
    </BaseLayout>
  );
};

export default SingleColumnLayout;
