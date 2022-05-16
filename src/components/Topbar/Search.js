import React, { useEffect, useRef } from 'react';
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


const useFocus = () => {
  const elRef = useRef(null);
  const setFocus = () => {
    elRef.current && elRef.current.focus();
  };
  return [elRef, setFocus];
};

const Search = props => {
  const [searchInputRef, setFocusToSearchInput] = useFocus();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This follows a setup that styled-components use.
      // import('docsearch.js').then(ds => {
      //   ds.default({
      //     appId: 'IPOXPQ3KFI',
      //     apiKey: '48fd5d7d401d024a0b034f9e62b1cd34',
      //     indexName: 'sharetribe',
      //     inputSelector: '#algolia-doc-search',
      //     debug: false, // Set debug to true if you want to inspect the dropdown
      //     autocompleteOptions: {
      //       openOnFocus: true,
      //       autoselect: true,
      //       hint: false,
      //       keyboardShortcuts: [`s`],
      //     },
      //   });
      // });
    }
  }, []);

  const { isOpen, setIsOpen, ...rest } = props;

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
