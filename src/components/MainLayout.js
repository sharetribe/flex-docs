import React from 'react';
import styled from 'styled-components';

import { BaseLayout, Topbar, Footer } from '../components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  // Make sure that even with little content the element expands so
  // that the Wrapper takes at least the full viewport height.
  flex-grow: 1;

  width: 100%;
  max-width: ${props => props.theme.pageMaxWidth}px;
  margin-left: auto;
  margin-right: auto;
`;

const MainLayout = props => {
  const { activeCategory, children, ...rest } = props;
  return (
    <BaseLayout {...rest}>
      <Wrapper>
        <Topbar activeCategory={activeCategory} />
        <Content>{children}</Content>
        <Footer />
      </Wrapper>
    </BaseLayout>
  );
};

export default MainLayout;
