import React from 'react';
import styled from 'styled-components';

import { baselineSpacing, H2, P, Ul } from '../brand-components';
import { Link } from '../components';

const Paragraph = styled(P)`
  margin-top: ${baselineSpacing}px;
`;

const ArticleLi = styled.li`
  margin-top: ${baselineSpacing}px;
`;

const ArticleExcerpt = props => {
  const { title, slug, date, excerpt, pathPrefix } = props;
  const path = `${pathPrefix}${slug}`;
  return (
    <ArticleLi>
      <H2>
        <Link neutral to={path}>
          {title}
        </Link>
      </H2>
      <Paragraph>date: {date}</Paragraph>
      <Paragraph>path: {path}</Paragraph>
      <Paragraph>
        <Link neutral to={path}>
          {excerpt}
        </Link>
      </Paragraph>
      <Paragraph>
        <Link to={path}>read more</Link>
      </Paragraph>
    </ArticleLi>
  );
};

const ArticleIndex = props => {
  const { pathPrefix, articles, ...rest } = props;
  return (
    <Ul {...rest}>
      {articles.map(a => (
        <ArticleExcerpt pathPrefix={pathPrefix} key={a.id} {...a} />
      ))}
    </Ul>
  );
};

export default ArticleIndex;
