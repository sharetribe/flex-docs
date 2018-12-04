import styled, { css } from 'styled-components';

const styles = css`
  list-style: ${props => (props.withBullets ? 'decimal' : 'none')};
  margin: 0;
  padding: ${props => (props.withBullets ? '0 0 0 24px' : '0')};
`;

const Ol = styled.ol`
  ${styles}
`;
Ol.styles = styles;

export default Ol;
