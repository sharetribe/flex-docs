import React from 'react';
import styled from 'styled-components';

import { Ul, Li, Link } from '../../components';

const TocLi = styled(Li)`
  margin-left: ${props => (props.depth - 1) * 12}px;
`;

const TocItem = props => {
  const { path, value, id, ...rest } = props;
  return (
    <TocLi {...rest}>
      <Link to={`${path}#${id}`}>{value}</Link>
    </TocLi>
  );
};

const ArticleToc = props => {
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

export default ArticleToc;
