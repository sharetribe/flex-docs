import React from 'react';
import { graphql } from 'gatsby';

import { ArticlePage } from '../components';

export const query = graphql`
  query($slug: String!, $category: String!) {
    markdownRemark(
      frontmatter: { slug: { eq: $slug }, category: { eq: $category } }
    ) {
      frontmatter {
        title
        date
        category
      }
      html
    }
  }
`;

const ArticlePageTemplate = props => {
  const { frontmatter, html } = props.data.markdownRemark;
  const { title, date, category } = frontmatter;
  return (
    <ArticlePage title={title} date={date} category={category} html={html} />
  );
};

export default ArticlePageTemplate;
