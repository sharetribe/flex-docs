import styled, { css } from 'styled-components';

const styles = css`
  color: ${props => (props.neutral ? 'inherit' : props.theme.linkColor)};
  text-decoration: none;

  :visited {
    ${props => (props.neutral ? '' : `color: ${props.theme.linkColorVisited}`)};
  }
  :hover {
    ${props => (props.neutral ? '' : `color: ${props.theme.linkColorHover}`)}
  }
`;

const A = styled.a`
  ${styles}
`;
A.styles = styles;

export default A;
