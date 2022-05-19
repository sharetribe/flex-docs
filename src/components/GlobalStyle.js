import { createGlobalStyle } from 'styled-components';

import { baselineBreakpoint } from '../config';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.backgroundColor};
    overflow-y: scroll;
    -webkit-font-smoothing: antialiased;
    font-family: "Circular", Helvetica, Arial, sans-serif;
  }
  button {
    border: none;
    cursor: pointer;
    padding: 0;
    background-color: transparent;
    font-family: "Circular", Helvetica, Arial, sans-serif;
  }

  .DocSearch-Button-Container svg {
    height: 15px;
  }

  .DocSearch-MagnifierLabel {
    color: ${props => props.theme.searchResultsSecondaryColor};
  }

  .DocSearch-Prefill {
    color: ${props => props.theme.searchResultsHighlightColor};
  }
  .DocSearch-Form {
    box-shadow: inset 0 0 0 1px ${props => props.theme.searchInputBorderColor};
  }

  .DocSearch-Cancel {
    color: ${props => props.theme.searchResultsSecondaryColor};
  }

  .DocSearch-Button {
    background-color: #f9f9f9;
  }

  .DocSearch-Button:hover {
    box-shadow: inset 0 0 0 1px ${props => props.theme.searchInputBorderColor};
  }

  .DocSearch-Dropdown {
    overflow-x: hidden;
    padding: 0;
  }

  .DocSearch-MagnifierLabel svg {
    height: 18px;
  }

  .DocSearch-Hit {
    padding-bottom: 0;
    border-radius: 0;

    border-bottom: 1px solid ${props => props.theme.searchInputBorderColor};
  }

  .DocSearch-Hits mark {
    color: ${props => props.theme.searchResultsHighlightColor};
  }

  .DocSearch-Hit-icon {
    height: 27px;
    width: 20px;
  }

  .DocSearch-Hit a {
    border-radius: 0;
    box-shadow: none;
  }

  .DocSearch-Hit[aria-selected=true] a {
    background-color: ${props => props.theme.searchResultsSecondaryColor};
  }

  .DocSearch-Hit-source {
    padding-left: 18px;
    padding-bottom: 9px;
    margin-bottom: 1px;
    box-shadow: 0px 2px 4px 0px rgb(126 126 126 / 19%);
    color: ${props => props.theme.searchResultsSecondaryColor};
  }

  a#CybotCookiebotDialogPoweredbyCybot,
  div#CybotCookiebotDialogPoweredByText {
    display: none;
  }
`;

export default GlobalStyle;
