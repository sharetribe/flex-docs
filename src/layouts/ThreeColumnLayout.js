import React from 'react';
import styled from 'styled-components';

import { baselineSpacing } from '../brand-components';
import BaseLayout from './BaseLayout';

const Wrapper = styled.div`
  padding: ${baselineSpacing}px;
`;

const ThreeColumnLayout = props => {
  const { children, ...rest } = props;
  return (
    <BaseLayout {...rest}>
      <Wrapper>{children}</Wrapper>
    </BaseLayout>
  );
};

export default ThreeColumnLayout;
