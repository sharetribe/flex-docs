import React from 'react';
import styled from 'styled-components';

import {
  baselineSmall,
  baselineLarge,
  baselineBreakpoint,
  H5,
  P,
  Ul,
} from '../../brand-components';
import { Link } from '../../components';

const Paragraph = styled(P)`
  margin-top: ${2 * baselineSmall}px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${2 * baselineLarge}px;
  }
`;

const ArticleLi = styled.li`
  margin-top: ${6 * baselineSmall}px;

  :first-child {
    margin-top: 0;
  }

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${6 * baselineLarge}px;

    :first-child {
      margin-top: 0;
    }
  }
`;

const ArticleExcerpt = props => {
  const { pathPrefix, title, slug, ingress } = props;
  const path = `${pathPrefix}${slug}/`;
  return (
    <ArticleLi>
      <H5 as="h2">
        <Link neutral to={path}>
          {title}
        </Link>
      </H5>
      <Paragraph>
        <Link neutral to={path}>
          {ingress}
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
      {articles.map(article => (
        <ArticleExcerpt
          pathPrefix={pathPrefix}
          key={article.slug}
          {...article}
        />
      ))}
    </Ul>
  );
};

export default ArticleIndex;
