import styled, { css } from 'styled-components';

import fonts from '../fonts';

const styles = css`
  // Font
  ${fonts['CircularStd-Bold'].styles}
`;

const Strong = styled.strong`
  ${styles}
`;
Strong.styles = styles;

export default Strong;
