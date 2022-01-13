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

  .algolia-autocomplete {

    & a {
      text-decoration: none;
    }

    & .algolia-docsearch-suggestion--category-header {
    }

    & .algolia-docsearch-suggestion--title {
      color: ${props => props.theme.searchResultsSecondaryColor};

      @media (min-width: ${baselineBreakpoint}px) {
        color: ${props => props.theme.searchResultsPrimaryColor};
      }

    }

    & .algolia-docsearch-suggestion--highlight {
      color: ${props => props.theme.searchResultsHighlightColor};
    }

    & .algolia-docsearch-suggestion {
      & .algolia-docsearch-suggestion--subcategory-column {
        display: none;

        @media (min-width: ${baselineBreakpoint}px) {
          display: inline-block;
        }
      }
    }

    & .ds-dropdown-menu {
      min-width: unset;
      max-width: unset;
      width: calc(100vw - 48px);

      &:before {
        display: none;
      }

      @media (min-width: ${baselineBreakpoint}px) {
        min-width: 500px;
        max-width: 600px;

        &:before {
          display: block;
        }
      }
    }
  }
  a#CybotCookiebotDialogPoweredbyCybot,
  div#CybotCookiebotDialogPoweredByText {
    display: none;
  }
`;

export default GlobalStyle;
