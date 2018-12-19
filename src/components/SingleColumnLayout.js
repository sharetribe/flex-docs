import React from 'react';
import styled from 'styled-components';

import BaseLayout from './BaseLayout';

const Content = styled.div`
  max-width: ${props => props.theme.pageMaxWidth}px;
  margin-left: auto;
  margin-right: auto;
`;

const SingleColumnLayout = props => {
  const { children, ...rest } = props;
  return (
    <BaseLayout {...rest}>
      <Content>{children}</Content>
    </BaseLayout>
  );
};

export default SingleColumnLayout;
