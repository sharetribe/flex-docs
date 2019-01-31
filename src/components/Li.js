import styled, { css } from 'styled-components';

import { P } from '../components';

const Li = styled.li`
  ${P.styles}
`;
Li.styles = P.styles;

export default Li;
