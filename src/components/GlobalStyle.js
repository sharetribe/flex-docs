import { createGlobalStyle } from 'styled-components';

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

  .DocSearch.DocSearch-Button {
    background-color: #f9f9f9;
    &:hover {
      box-shadow: inset 0 0 0 1px ${props =>
        props.theme.searchInputBorderColor};
    }
  }

  .DocSearch {

    .DocSearch-input {
      font-size: 1em;
    }

    .DocSearch-Modal {
      background-color: #ffffff;
    }

    .DocSearch-Footer {
      box-shadow: none;
    }

    .DocSearch-Logo svg {
      color: #9a9a9a;
    }

    .DocSearch-SearchBar {
      border-bottom: 1px solid #9a9a9a;
      padding-top: 7px;
    }

    .DocSearch-Form {
      box-shadow: none;
    }

    .DocSearch-MagnifierLabel svg {
      height: 18px;
      color: #9a9a9a;
    }

    .DocSearch-Hit-source {
      background-color: #ffffff;
      color: var(--docsearch-hit-color);
      font-size: 1em;
      margin-top: 5px;
      margin-bottom: 6px; 
    }

    .DocSearch-Hit a {
      box-shadow: none;
      border: 1px solid #e3e3e3;
    }

    .DocSearch-Dropdown {
      padding: 0 20px;
    }

    .DocSearch-Hits mark {
      color: ${props => props.theme.searchResultsHighlightColor};
    }

    .DocSearch-Hit-Select-Icon {
      color: var(--docsearch-muted-color) !important;
    }

   .DocSearch-Hit[aria-selected=true] a {
      background-color: #f4f9ff;
      border: 1px solid #f4f9ff;

      .DocSearch-Hit-title {
        color: var(--docsearch-hit-color) !important;
      }
      .DocSearch-Hit-action {
        color: var(--docsearch-hit-color) !important;
      }
      .DocSearch-Hit-icon {
        color: var(--docsearch-muted-color) !important;
      }
      .DocSearch-Hit-path {
        color: var(--docsearch-muted-color) !important;
      }
      .DocSearch-Hit-Tree {
        color: var(--docsearch-muted-color) !important;
      }
      mark {
        color: ${props => props.theme.searchResultsHighlightColor} !important;
        text-decoration: none;
      }
    }
    
    .DocSearch-Button-Container svg {
      height: 15px;
    }

    .DocSearch-Prefill {
      color: ${props => props.theme.searchResultsHighlightColor};
    }

    .DocSearch-Cancel {
      color: ${props => props.theme.searchResultsSecondaryColor};
    }

    .DocSearch-Hit-icon {
      height: 27px;
      width: 20px;
    }

  }
`;

export default GlobalStyle;
