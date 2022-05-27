import React from 'react';
import styled from 'styled-components';

import { baselineBreakpoint } from '../../config';

import { DocSearch } from '@docsearch/react';

const Wrapper = styled.div`
  width: auto;
  height: 60px;
  display: flex;
  align-items: center;
  margin-right: 25px;
  font-size: 16px;

  @media (min-width: ${baselineBreakpoint}px) {
    height: 72px;
    padding: 16px 0;
    margin-left: auto;
    margin-right: 40px;

  }
`;

const Search = props => {

  const { ...rest } = props;

  return (
    <Wrapper {...rest}>
        <DocSearch
          appId="IPOXPQ3KFI"
          apiKey="48fd5d7d401d024a0b034f9e62b1cd34"
          indexName="sharetribe"
/>
    </Wrapper>
  );
};

export default Search;
