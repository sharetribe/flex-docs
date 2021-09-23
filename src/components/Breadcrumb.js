import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql, withPrefix } from 'gatsby';

import { baselineBreakpoint } from '../config';
import { Ol, Li, Link } from '../components';

// NOTE: custom font size
const Item = styled(Li)`
  display: inline;

  color: ${props => props.theme.textColorSecondary};

  // Show a separator character between items
  :not(:last-child) {
    margin-right: 7px;

    ::after {
      content: '›';
      margin-left: 7px;
    }
  }

  // Font
  font-size: 12px;

  // This is a bit unorthodox, but make sure the ArticlePage looks
  // good when the breadcrumb and the last updated text both take
  // multiple lines.
  line-height: 12px;

  letter-spacing: -0.07px;

  // Offset baseline
  top: -5px;

  @media (min-width: ${baselineBreakpoint}px) {
    font-size: 14px;
    line-height: 32px;
    letter-spacing: -0.08px;

    color: ${props => props.theme.textColorSecondary};

    // Offset baseline
    top: 3px;
  }
`;

const CrumbLi = props => {
  const { path, label } = props;
  return (
    <Item>
      {path ? (
        <Link neutral to={path}>
          {label}
        </Link>
      ) : (
        label
      )}
    </Item>
  );
};

const query = graphql`
  query SiteUrlQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

const Breadcrumb = props => {
  const { links, ...rest } = props;
  return (
    <StaticQuery
      query={query}
      render={data => {
        const { siteUrl } = data.site.siteMetadata;

        // Structured metadata for the breadcrumb
        //
        // See: https://developers.google.com/search/docs/data-types/breadcrumb
        const ldJson = JSON.stringify({
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: links.map((link, i) => {
            const { path, label } = link;
            return {
              '@type': 'ListItem',
              position: i + 1,
              name: label,
              item: `${siteUrl}${withPrefix(path)}`,
            };
          }),
        });

        return (
          <nav {...rest}>
            <Ol>
              {links.map(link => (
                <CrumbLi key={link.label} {...link} />
              ))}
            </Ol>
            <script 
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: ldJson }}
            />
          </nav>
        );
      }}
    />
  );
};

export default Breadcrumb;
