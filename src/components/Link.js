import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

import { A } from '../components';

const GatsbyLinkWithoutExtraProps = props => {
  // Filter out A props that GatsbyLink isn't expecting
  const { neutral, active, ...rest } = props;
  return <GatsbyLink {...rest} />;
};

const Link = props => {
  return <A as={GatsbyLinkWithoutExtraProps} {...props} />;
};

export default Link;
