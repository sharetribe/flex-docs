import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle, fonts, BaselineDevGrid } from '../brand-components';
import { Topbar } from '../components';
import { themeLight as theme } from '../theme';

const fontsInUse = ['CircularStd-Book', 'CircularStd-Bold'];

const FontPreloadLink = font => {
  const { name, format, url } = font;
  return (
    <link
      key={name}
      rel="preload"
      as="font"
      crossorigin="crossorigin"
      type={`font/${format}`}
      href={url}
    />
  );
};

const BaseLayout = props => {
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
          <ThemeProvider theme={theme}>
            <>
              <Helmet
                title={pageTitle}
                meta={[
                  { name: 'description', content: description || siteTitle },
                ]}
              >
                <html lang="en" />
                {fonts
                  .filter(f => fontsInUse.includes(f.name))
                  .map(FontPreloadLink)}
              </Helmet>
              <BaselineDevGrid>
                <Topbar siteTitle={siteTitle} />
                {children}
              </BaselineDevGrid>
              <GlobalStyle fontNames={fontsInUse} />
            </>
          </ThemeProvider>
        );
      }}
    />
  );
};

export default BaseLayout;
