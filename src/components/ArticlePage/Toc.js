import React from 'react';
import styled from 'styled-components';

import { Ul, Li } from '../../brand-components';
import { baselineBreakpoint } from '../../config';
import { Link } from '../../components';

const TocLi = styled(Li)`
  // Side navigation hidden on small viewport

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 16px;
    line-height: 32px;
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
  const { path, headings, ...rest } = props;
  const topLevelHeadings = headings.filter(heading => heading.depth < 3);
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
