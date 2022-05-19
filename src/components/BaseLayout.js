import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql, withPrefix } from 'gatsby';
import { findParentCategories } from '../util/navigation';
import { siteStructure } from '../config';

const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`;

const BaseLayout = props => {
  const {
    title,
    description,
    noIndex,
    children,
    activeArticle,
    activeCategory,
  } = props;

  const findMainCategory = category => {
    const path = findParentCategories(category, siteStructure) || [];
    return path.length > 0 ? path[path.length - 1] : null;
  };

  return (
    <StaticQuery
      query={query}
      render={data => {
        const siteTitle = data.site.siteMetadata.title;
        const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
        const siteUrl = data.site.siteMetadata.siteUrl;
        const meta = [];
        const path = activeArticle
          ? `/${findMainCategory(activeArticle.category) ||
              activeArticle.category}/${activeArticle.slug}/`
          : activeCategory
          ? `${activeCategory}/`
          : '';

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
              <link rel="canonical" href={`${siteUrl}${withPrefix(path)}`} />
            </Helmet>
            {children}
          </>
        );
      }}
    />
  );
};

export default BaseLayout;
