import React from 'react';

import { H1 } from '../../brand-components';
import { MainLayout } from '../../components';
import ArticleIndex from './ArticleIndex';

const ArticleIndexPage = props => {
  const { title, category, articles } = props;
  return (
    <MainLayout title={title} activeCategory={category}>
      <H1>{title}</H1>
      <ArticleIndex pathPrefix={`/${category}/`} articles={articles} />
    </MainLayout>
  );
};

export default ArticleIndexPage;
