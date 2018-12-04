import styled, { css } from 'styled-components';

import { brandColor } from './config';

const styles = css`
  color: ${brandColor};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const A = styled.a`
  ${styles}
`;
A.styles = styles;

export default A;
