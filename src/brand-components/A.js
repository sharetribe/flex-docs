import styled, { css } from 'styled-components';

const styles = css`
  color: ${props => (props.neutral ? 'inherit' : props.theme.linkColor)};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
  :visited {
    color: ${props =>
      props.neutral ? 'inherit' : props.theme.linkColorVisited};
  }
`;

const A = styled.a`
  ${styles}
`;
A.styles = styles;

export default A;
