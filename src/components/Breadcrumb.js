import React from 'react';
import styled from 'styled-components';

import { baselineBreakpoint, Ul, Li } from '../brand-components';
import { Link } from '../components';

const Item = styled(Li)`
  display: inline;

  // Show a separator character between items
  :not(:last-child) {
    margin-right: 7px;

    ::after {
      content: '›';
      margin-left: 7px;
    }
  }

  // Font
  font-size: 12px;

  // This is a bit unorthodox, but make sure the ArticlePage looks
  // good when the breadcrumb and the last updated text both take
  // multiple lines.
  line-height: 12px;

  letter-spacing: -0.07px;

  // Offset baseline
  top: -3px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 14px;
    line-height: 32px;
    letter-spacing: -0.08px;

    // Offset baseline
    top: 3px;
  }
`;

const CrumbLi = props => {
  const { path, label } = props;
  return (
    <Item>
      {path ? (
        <Link neutral to={path}>
          {label}
        </Link>
      ) : (
        label
      )}
    </Item>
  );
};

const Breadcrumb = props => {
  const { links, ...rest } = props;
  return (
    <Ul {...rest}>
      {links.map(link => (
        <CrumbLi key={link.label} {...link} />
      ))}
    </Ul>
  );
};

export default Breadcrumb;
