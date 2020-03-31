import React from 'react';
import styled from 'styled-components';

import { baselineBreakpoint } from '../../config';
import fonts from '../../fonts';

const Wrapper = styled.div`
  width: 60px;
  height: 60px;

  @media (min-width: ${baselineBreakpoint}px) {
    width: 220px;
    padding: 16px 0;
    margin-left: auto;
  }
`;

const Input = styled.input`
  width: 220px;
  height: 40px;
  border: 1px solid ${props => props.theme.searchBorderColor};
  border-radius: 20px;
  padding: 0 10px 4px 36px;

  ${fonts['CircularStd-Book'].styles}
  font-size: 16px;
  color: ${props => props.theme.textColorTiny};

  background-repeat: no-repeat;
  background-position: 16px center;
  background-image: url('data:image/svg+xml;utf8, <svg width="15" height="14" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <defs> <filter x="-.5%" y="-6.9%" width="101%" height="119.4%" filterUnits="objectBoundingBox" id="a"> <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"/> <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/> <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" in="shadowBlurOuter1"/> </filter> <path id="b" d="M0 0h1440v72H0z"/> </defs> <g fill="none" fill-rule="evenodd"> <g fill-rule="nonzero" transform="translate(-1200 -28)"> <use fill="%23000" filter="url(%23a)" xlink:href="%23b"/> <use fill="%23FFF" xlink:href="%23b"/> </g> <g transform="translate(-16 -14)"> <rect stroke="%23D1D1D1" fill="%23FFF" fill-rule="nonzero" x=".5" y=".5" width="219" height="39" rx="19"/> <g transform="translate(17 15)" stroke="%239B9B9B" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M8.5137615 8l3.7184751 3.4940844"/> <ellipse cx="4.7889908" cy="4.5" rx="4.7889908" ry="4.5"/> </g> </g> </g> </svg>');

  &:hover,
  &:focus {
    outline: none;
  }
`;

const Search = props => {
  return (
    <Wrapper {...props}>
      <Input
        id="algolia-doc-search"
        type="search"
        placeholder="Search docs..."
      />
    </Wrapper>
  );
};

export default Search;
