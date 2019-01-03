import React from 'react';
import styled from 'styled-components';

import { baselineBreakpoint, Ul, Li } from '../../brand-components';
import { Link } from '../../components';

const TocUl = styled(Ul)`
  margin-top: 24px; // TODO
`;

const TocLi = styled(Li)`
  // Side navigation hidden on small viewport

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 16px;
    letter-spacing: -0.09px;
    color: ${props => props.theme.linkColor};

    :hover {
      color: ${props => props.theme.linkColorHover};
    }
  }
`;

const TocItem = props => {
  const { path, value, depth, id, ...rest } = props;
  return (
    <TocLi {...rest}>
      <Link neutral to={`${path}#${id}`}>
        {' › '}
        {value}
      </Link>
    </TocLi>
  );
};

const Toc = props => {
  const { path, headings } = props;
  const topLevelHeadings = headings.filter(heading => heading.depth < 3);
  if (topLevelHeadings.length === 0) {
    return null;
  }
  return (
    <TocUl>
      {topLevelHeadings.map(heading => (
        <TocItem key={heading.id} path={path} {...heading} />
      ))}
    </TocUl>
  );
};

export default Toc;
