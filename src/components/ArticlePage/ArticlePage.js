import React from 'react';

import { H1, P } from '../../brand-components';
import { ThreeColumnLayout } from '../../layouts';
import { MarkdownHtml } from '../../components';

const ArticlePage = props => {
  const { title, date, category, html } = props;
  return (
    <ThreeColumnLayout title={title} activeCategory={category}>
      <article>
        <H1>{title}</H1>
        <P>{date}</P>
        <MarkdownHtml html={html} />
      </article>
    </ThreeColumnLayout>
  );
};

export default ArticlePage;
