import { createGlobalStyle } from 'styled-components';
import fonts from '../fonts';

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

    & .algolia-docsearch-suggestion--title {
      ${fonts['CircularStd-Bold'].styles}
    }
  }
`;

export default GlobalStyle;
