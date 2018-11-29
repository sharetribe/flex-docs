import styled from 'styled-components';

import { brandColor } from './config';

const A = styled.a`
  color: ${brandColor};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

export default A;
