import React from 'react';
import styled from 'styled-components';

import { baselineLarge, baselineBreakpoint, grid } from '../../config';
import { H5, P, Ul, Link, UiText, Box } from '../../components';

const Grid = styled(Ul)`
  display: grid;
  grid-row-gap: ${grid.smallGap}px;
  grid-column-gap: ${grid.smallGap}px;

  @media (min-width: ${baselineBreakpoint}px) {
    grid-row-gap: ${grid.largeGap}px;
    grid-column-gap: ${grid.largeGap}px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto auto;
  }
`;

const Paragraph = styled(P)`
  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${2 * baselineLarge}px;

    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.09px;

    // Offset baseline
    top: -2px;
  }
`;

const GridItem = props => {
  const { pathPrefix, title, slug, ingress } = props;
  const path = `${pathPrefix}${slug}/`;
  return (
    <Box as="li">
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
    </Box>
  );
};

const ArticleIndex = props => {
  const { pathPrefix, articles, ...rest } = props;

  if (articles.length === 0) {
    return (
      <P {...rest}>
        <UiText id="ArticleIndexPage.ArticleIndex.noArticlesFound" />
      </P>
    );
  }

  return (
    <Grid {...rest}>
      {articles.map(article => (
        <GridItem pathPrefix={pathPrefix} key={article.slug} {...article} />
      ))}
    </Grid>
  );
};

export default ArticleIndex;
