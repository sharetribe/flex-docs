import React from 'react';
import styled from 'styled-components';

import { baselineBreakpoint } from '../../config';
import { Ul, Li, Link } from '../../components';

// NOTE: custom line height
const TocLi = styled(Li).attrs({
  small: true,
})`
  font-size: 15px;
  line-height: 24px;
  margin-top: ${props => (props.depth === 2 ? 6 : 0)}px;
  margin-left: ${props => (props.depth > 2 ? 12 : 0)}px;

  color: ${props => props.theme.tocColorLink};

  // Offset baseline
  top: 1px;

  :hover {
    color: ${props => props.theme.tocColorLinkHover};
  }

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${props => (props.depth === 2 ? 8 : 0)}px;
    margin-left: ${props => (props.depth > 2 ? 12 : 0)}px;

    // Offset baseline
    top: -1px;
  }
`;

const TocItem = props => {
  const { path, value, depth, id, ...rest } = props;
  return (
    <TocLi depth={depth} {...rest}>
      <Link neutral to={`${path}#${id}`}>
        {value}
      </Link>
    </TocLi>
  );
};

const Toc = props => {
  const { path, headings, maxDepth, ...rest } = props;
  const topLevelHeadings = headings.filter(
    heading => heading.depth <= maxDepth
  );
  if (topLevelHeadings.length === 0) {
    return null;
  }
  return (
    <Ul {...rest}>
      {topLevelHeadings.map(heading => (
        <TocItem key={heading.id} path={path} {...heading} />
      ))}
    </Ul>
  );
};

export default Toc;
