import React from 'react';
import { graphql } from 'gatsby';

import { H1, P } from '../brand-components';
import { ThreeColumnLayout } from '../layouts';
import { MarkdownHtml } from '../components';

export const query = graphql`
  query($slug: String!, $category: String!) {
    markdownRemark(
      frontmatter: { slug: { eq: $slug }, category: { eq: $category } }
    ) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`;

const GuidePageTemplate = props => {
  const { frontmatter, html } = props.data.markdownRemark;
  const { title, date } = frontmatter;
  return (
    <ThreeColumnLayout title={title} activePath="/guides">
      <article>
        <H1>Guide: {title}</H1>
        <P>Updated: {date}</P>
        <MarkdownHtml html={html} />
      </article>
    </ThreeColumnLayout>
  );
};

export default GuidePageTemplate;
