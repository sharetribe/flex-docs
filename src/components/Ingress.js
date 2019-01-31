import styled from 'styled-components';

import { H5 } from '../components';

const Ingress = styled.p`
  ${H5.styles}
`;

// Expose styles
Ingress.styles = H5.styles;

export default Ingress;
