import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';

import { A } from '../brand-components';

const NeutralA = styled(A)`
  color: inherit;
`;

const Link = props => {
  const { neutral, ...rest } = props;
  return neutral ? (
    <NeutralA as={GatsbyLink} {...rest} />
  ) : (
    <A as={GatsbyLink} {...rest} />
  );
};

export default Link;
