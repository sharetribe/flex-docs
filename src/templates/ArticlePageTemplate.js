import React from 'react';
import { graphql } from 'gatsby';
import slugger from 'github-slugger';

import { ArticlePage } from '../components';

export const query = graphql`
  query($slug: String!, $category: String!) {
    markdownRemark(
      frontmatter: { slug: { eq: $slug }, category: { eq: $category } }
    ) {
      frontmatter {
        title
        slug
        date
        category
        ingress
        skills
        readingTime
      }
      html
      fields {
        readingTime {
          minutes
        }
      }
      headings {
        value
        depth
      }
    }
  }
`;

const ArticlePageTemplate = props => {
  const {
    frontmatter,
    html,
    fields,
    headings = [],
  } = props.data.markdownRemark;
  const { minutes } = fields.readingTime;
  const slugs = slugger();
  slugs.reset();
  const tableOfContents = headings.map(heading => {
    return {
      id: slugs.slug(heading.value),
      ...heading,
    };
  });
  return (
    <ArticlePage
      frontmatter={frontmatter}
      html={html}
      estimatedReadingTime={minutes}
      tableOfContents={tableOfContents}
    />
  );
};

export default ArticlePageTemplate;
