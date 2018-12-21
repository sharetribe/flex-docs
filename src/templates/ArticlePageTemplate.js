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
      fields {
        readingTime {
          minutes
        }
      }
    }
  }
`;

const ArticlePageTemplate = props => {
  const { frontmatter, html, fields } = props.data.markdownRemark;
  const { minutes } = fields.readingTime;
  return (
    <ArticlePage frontmatter={frontmatter} html={html} readingTime={minutes} />
  );
};

export default ArticlePageTemplate;
