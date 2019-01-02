import styled, { css } from 'styled-components';

const styles = css`
  // Font
  font-family: CircularStd-Bold;
  font-weight: 600;
  font-style: normal;
`;

const Strong = styled.strong`
  ${styles}
`;
Strong.styles = styles;

export default Strong;
