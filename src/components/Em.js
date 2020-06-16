import styled, { css } from 'styled-components';

// NOTE: The CircularStd-BookItalic font isn't currently preloaded, so
// rendering this element for the first time triggers a font file
// download.
const styles = css`
  // Font
`;

const Em = styled.em`
  ${styles}
`;
Em.styles = styles;

export default Em;
