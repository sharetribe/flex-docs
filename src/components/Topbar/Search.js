import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { categoryFromLocation } from '../../util/utils';
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

  const [location, setLocation] = useState(null);
  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    if (isBrowser) {
      setLocation(window.location);
    }
  });

  const altSearch = categoryFromLocation(location) === 'the-new-sharetribe';

  const FlexDocsSearch = props => {
    return (
      <DocSearch
        appId="IPOXPQ3KFI"
        apiKey="19a5a1c0a630be55ad534d8b640afe89"
        indexName="sharetribe"
      />
    );
  };

  const TheNewSharetribeSearch = props => {
    return (
      <DocSearch
        appId="IPOXPQ3KFI"
        apiKey="19a5a1c0a630be55ad534d8b640afe89"
        indexName="sharetribe_new_sharetribe"
      />
    );
  };

  return (
    <Wrapper {...rest}>
      {altSearch ? <TheNewSharetribeSearch /> : <FlexDocsSearch />}
    </Wrapper>
  );
};

export default Search;
