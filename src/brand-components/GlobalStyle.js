import { css, createGlobalStyle } from 'styled-components';

import fonts from './fonts';

import 'sanitize.css/sanitize.css';

const fontFace = font => {
  const { name, url, format, weight, style } = font;
  return css`
    @font-face {
      font-family: ${name};
      src: url("${url}") format("${format}");
      font-weight: ${weight};
      font-style: ${style};

      // See: https://developers.google.com/web/updates/2016/02/font-display
      font-display: block;
    }
  `;
};

const fontFaces = fontNames => {
  return fonts.filter(f => fontNames.includes(f.name)).map(fontFace);
};

const GlobalStyle = createGlobalStyle`

  // Inject font faces only for fonts that have been specified in the
  // fontNames prop.
  ${props => fontFaces(props.fontNames)}

  html {
    height: 100%;
  }
  body {
    height: 100%;
    background-color: ${props => props.theme.backgroundColor};
  }
  button {
    border: none;
    cursor: pointer;
    padding: 0;
    background-color: transparent;
  }
`;

export default GlobalStyle;
