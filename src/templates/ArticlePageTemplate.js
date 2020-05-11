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
        updated
        category
        ingress
        skills
      }
      htmlAst
      headings {
        value
        depth
      }
    }
  }
`;

const ArticlePageTemplate = props => {
  const { frontmatter, htmlAst, headings = [] } = props.data.markdownRemark;
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
      htmlAst={htmlAst}
      tableOfContents={tableOfContents}
    />
  );
};

export default ArticlePageTemplate;
