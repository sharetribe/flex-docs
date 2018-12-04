import styled, { css } from 'styled-components';

const styles = css`
  list-style: ${props => (props.withBullets ? 'disc' : 'none')};
  margin: 0;
  padding: ${props => (props.withBullets ? '0 0 0 24px' : '0')};
`;

const Ul = styled.ul`
  ${styles}
`;
Ul.styles = styles;

export default Ul;
