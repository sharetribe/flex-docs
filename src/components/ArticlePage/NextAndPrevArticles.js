import React from 'react';
import styled from 'styled-components';

import fonts from '../../fonts';
import { siteStructure } from '../../config';
import { findCategory } from '../../util/navigation';
import { Link, UiText } from '../../components';

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 78px;
  border-top: solid 1px ${props => props.theme.lineColor};
  padding: 24px 0;
`;

const Prev = styled(Link)`
  ${fonts['CircularStd-Medium'].styles}
  font-size: 18px;
  text-decoration: none;
`;
const Next = styled(Link)`
  ${fonts['CircularStd-Medium'].styles}
  font-size: 18px;
  text-decoration: none;
`;

const nextAndPrev = (slug, category, siteStructure) => {
  const pageCategory = findCategory(category, siteStructure);

  const sortingArray =
    pageCategory && pageCategory.sortingArray ? pageCategory.sortingArray : [];

  const slugIndex = sortingArray.findIndex(s => s === slug);
  const lastSlugIndex = sortingArray.length - 1;
  const hasNext = slugIndex > -1 && slugIndex < lastSlugIndex;
  const hasPrev = slugIndex > -1 && slugIndex > 0;
  return {
    nextArticleSlug: hasNext ? sortingArray[slugIndex + 1] : null,
    prevArticleSlug: hasPrev ? sortingArray[slugIndex - 1] : null,
  };
};

const nextAndPrevArticles = props => {
  const { slug, category, ...rest } = props;
  const { nextArticleSlug, prevArticleSlug } = nextAndPrev(
    slug,
    category,
    siteStructure
  );

  return prevArticleSlug || nextArticleSlug ? (
    <Pagination {...rest}>
      {prevArticleSlug ? (
        <Prev to={`/${category}/${prevArticleSlug}/`}>
          <UiText id="ArticlePage.previous" />
        </Prev>
      ) : (
        <span />
      )}
      {nextArticleSlug ? (
        <Next to={`/${category}/${nextArticleSlug}/`}>
          <UiText id="ArticlePage.next" />
        </Next>
      ) : (
        <span />
      )}
    </Pagination>
  ) : null;
};

export default nextAndPrevArticles;
