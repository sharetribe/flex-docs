import React from 'react';
import styled from 'styled-components';

import { baselineLarge, baselineBreakpoint, grid } from '../../config';
import { H5, P, Ul, Link, UiText, Box } from '../../components';

const Grid = styled(Ul)`
  display: grid;
  grid-row-gap: ${2 * baselineLarge}px;
  grid-column-gap: ${grid.smallGap}px;

  @media (min-width: ${baselineBreakpoint}px) {
    grid-row-gap: ${2 * baselineLarge}px;
    grid-column-gap: ${grid.largeGap}px;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }
`;

// NOTE: custom font size
const Paragraph = styled(P).attrs({
  small: true,
})`
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.08px;

  // Offset baseline
  top: 1px;

  @media (min-width: ${baselineBreakpoint}px) {
    margin-top: ${baselineLarge}px;

    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0px;

    // Offset baseline
    top: -2px;
  }
`;

const GridItem = props => {
  const { pathPrefix, title, slug, ingress } = props;
  const path = `${pathPrefix}${slug}/`;
  return (
    <Link neutral to={path}>
	    <Box as="li">
	      <H5 as="h2">{title}</H5>
	      <Paragraph>{ingress}</Paragraph>
	    </Box>
    </Link>
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
