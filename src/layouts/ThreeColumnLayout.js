import React from 'react';
import styled from 'styled-components';

import { pageMaxWidth } from '../brand-components';
import BaseLayout from './BaseLayout';

const Columns = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${pageMaxWidth}px;
`;

const ThreeColumnLayout = props => {
  const { children, ...rest } = props;
  return (
    <BaseLayout {...rest}>
      <Columns>{children}</Columns>
    </BaseLayout>
  );
};

export default ThreeColumnLayout;
