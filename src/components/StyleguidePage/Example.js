import styled from 'styled-components';

import { baselineSpacing } from '../../config';

const Example = styled.section`
  margin: ${baselineSpacing}px auto;
  max-width: ${props => props.theme.contentMaxWidth}px;
`;

export default Example;
