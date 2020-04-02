import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.backgroundColor};
    overflow-y: scroll;
    -webkit-font-smoothing: antialiased;
  }
  button {
    border: none;
    cursor: pointer;
    padding: 0;
    background-color: transparent;
  }

  .algolia-autocomplete {
    ${fonts['CircularStd-Book'].styles}

    & a {
      text-decoration: none;
    }

    & .algolia-docsearch-suggestion--category-header {
      ${fonts['CircularStd-Bold'].styles}
    }

    & .algolia-docsearch-suggestion--title {
      ${fonts['CircularStd-Bold'].styles}
    }

    & .algolia-docsearch-suggestion--highlight {
      color: ${props => props.theme.searchResultsHighlightColor};
    }
  }
`;

export default GlobalStyle;
