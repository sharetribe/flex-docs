import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

import { A } from '../brand-components';

const Link = props => <A as={GatsbyLink} {...props} />;

export default Link;
