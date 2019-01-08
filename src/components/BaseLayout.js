import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const BaseLayout = props => {
  const { title, description, noIndex, children } = props;
  return (
    <StaticQuery
      query={query}
      render={data => {
        const siteTitle = data.site.siteMetadata.title;
        const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
        const meta = [];

        // https://moz.com/learn/seo/meta-description
        if (description) {
          meta.push({ name: 'description', content: description });
        }

        // https://developers.google.com/search/reference/robots_meta_tag
        // https://moz.com/learn/seo/robots-meta-directives
        if (noIndex) {
          meta.push({ name: 'robots', content: 'noindex, follow' });
        }

        return (
          <>
            <Helmet title={pageTitle} meta={meta}>
              <html lang="en" />
            </Helmet>
            {children}
          </>
        );
      }}
    />
  );
};

export default BaseLayout;
