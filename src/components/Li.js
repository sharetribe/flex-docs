import React from 'react';

import { P } from '../components';

/**
 * List item with normal text: `<Li>Lorem ipsum</Li>`
 * List item with small text:  `<Li small>Lorem ipsum</Li>`
 * List item with tiny text:   `<Li tiny>Lorem ipsum</Li>`
 */
const Li = props => {
  return <P {...props} as="li" />;
};
Li.styles = P.styles;

export default Li;
