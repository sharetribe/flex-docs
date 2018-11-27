import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import 'sanitize.css/sanitize.css';

import Topbar from './Topbar';

export default props => {
  const { title, description, children } = props;
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => {
        const siteTitle = data.site.siteMetadata.title;
        const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
        return (
          <>
            <Helmet
              title={pageTitle}
              meta={[
                { name: 'description', content: description || siteTitle },
              ]}
            >
              <html lang="en" />
            </Helmet>
            <Topbar siteTitle={siteTitle} />
            {children}
          </>
        );
      }}
    />
  );
};
