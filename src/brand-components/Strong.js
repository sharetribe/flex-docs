import styled, { css } from 'styled-components';

import { fonts } from './index';

const styles = css`
  // Font
  ${fonts['CircularStd-Bold'].styles}
`;

const Strong = styled.strong`
  ${styles}
`;
Strong.styles = styles;

export default Strong;
