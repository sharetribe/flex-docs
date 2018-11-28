import styled from 'styled-components';

const Ul = styled.ul`
  list-style: ${props => (props.withBullets ? 'disc' : 'none')};
  margin: 0;
  padding: ${props => (props.withBullets ? '0 0 0 24px' : '0')};
`;

export default Ul;
