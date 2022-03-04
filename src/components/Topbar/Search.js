import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { baselineBreakpoint } from '../../config';

import IconSearch from './IconSearch';

const Wrapper = styled.div`
  width: 66px;
  height: 60px;

  @media (min-width: ${baselineBreakpoint}px) {
    width: auto;
    height: 72px;
    padding: 16px 0;
    margin-left: auto;
  }
`;

const SearchInput = styled.input`
  font-size: 16px;
  color: ${props => props.theme.textColor};

  width: calc(100vw - 48px);
  height: 36px;
  padding: 2px 10px 2px 36px;
  border: 1px solid ${props => props.theme.searchInputBorderColor};
  border-radius: 20px;
  font-family: 'Circular', Helvetica, Arial, sans-serif;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => props.theme.textColorTiny};
  }

  @media (min-width: ${baselineBreakpoint}px) {
    width: 220px;
    height: 40px;
  }
`;

const MobileButton = styled.button`
  display: block;
  padding: 21px 24px;

  &:hover {
    & g {
      stroke: ${props => props.theme.topbarNavColorActive};
    }
  }

  &:focus {
    outline: none;

    & g {
      stroke: ${props => props.theme.topbarNavColorActive};
    }
  }

  @media (min-width: ${baselineBreakpoint}px) {
    display: none;
  }
`;

const InputWrapper = styled.div`
  display: block;
  position: absolute;
  top: ${props => (props.isOpen ? '60px' : '-160px')};
  right: 0px;
  width: 100%;
  padding: 6px 24px;
  z-index: 11;
  background-color: #ccc;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  transition: opacity 0.3s ease-in-out;

  @media (min-width: ${baselineBreakpoint}px) {
    position: relative;
    top: unset;
    right: unset;
    width: 220px;
    padding: 0;
    opacity: 1;
    background-color: unset;
  }
`;

const StyledIconSearch = styled(IconSearch)`
  position: absolute;
  top: 17px;
  left: 40px;
  width: 14px;
  height: 14px;
  z-index: 1;

  @media (min-width: ${baselineBreakpoint}px) {
    top: 13px;
    left: 16px;
    width: 15px;
    height: 16px;
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
      import('docsearch.js').then(ds => {
        ds.default({
          appId: 'IPOXPQ3KFI',
          apiKey: '48fd5d7d401d024a0b034f9e62b1cd34',
          indexName: 'sharetribe',
          inputSelector: '#algolia-doc-search',
          debug: false, // Set debug to true if you want to inspect the dropdown
          autocompleteOptions: {
            openOnFocus: true,
            autoselect: true,
            hint: false,
            keyboardShortcuts: [`s`],
          },
        });
      });
    }
  }, []);

  const { isOpen, setIsOpen, ...rest } = props;
  const handleClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusToSearchInput();
    }
  };

  return (
    <Wrapper {...rest}>
      <MobileButton onClick={handleClick}>
        <IconSearch stroke="#666" />
      </MobileButton>
      <InputWrapper isOpen={isOpen}>
        <StyledIconSearch stroke="#9B9B9B" />
        <SearchInput
          id="algolia-doc-search"
          type="search"
          placeholder="Search docs..."
          ref={searchInputRef}
        />
      </InputWrapper>
    </Wrapper>
  );
};

export default Search;
