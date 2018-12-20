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
        ingress
      }
      html
    }
  }
`;

const ArticlePageTemplate = props => {
  const { frontmatter, html } = props.data.markdownRemark;
  return <ArticlePage frontmatter={frontmatter} html={html} />;
};

export default ArticlePageTemplate;
