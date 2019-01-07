import styled, { css } from 'styled-components';

const styles = css`
  // Font

  // TODO: Enable proper italic font if that is really
  // needed. Remember to also add the font-face by prividing the font
  // name to the GlobalStyle component.
  //
  // font-family: CircularStd-BookItalic, system-ui, sans-serif;
  font-weight: 400;
  font-style: italic;
`;

const Em = styled.em`
  ${styles}
`;
Em.styles = styles;

export default Em;
