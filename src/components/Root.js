import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import 'sanitize.css/sanitize.css';
import '../font-faces.css';

import { fontsInUse, themeLight as theme } from '../config';
import fonts from '../fonts';
import { GlobalStyle, BaselineDevGrid, Sidebar } from '../components';

const FontPreloadLink = font => {
  const { url, format } = font;
  return (
    <link
      rel="preload"
      as="font"
      crossorigin="crossorigin"
      type={`font/${format}`}
      href={url}
    />
  );
};

/**
 * Root component of the application.
 *
 * This is the root component of the whole application and is not
 * mounted/unmounted when pages change.
 *
 * This component should only add providers, styles, etc. that
 * shouldn't mount/unmount when pages change.
 *
 * For example, when having the font-face declarations of the
 * `GlobalStyle` component in the `BaseLayout` component, the browser
 * would trigger font downloads every time navigation happened,
 * resulting in unneeded network usage as well as a flash of unstyled
 * text.
 *
 * See the `gatsby-ssr.js` and `gatsby-browser.js` config files that
 * render this component.
 */
const Root = props => {
  const [sidebarNavsIsOpen, setSidebarNavsOpen] = useState({});
  const setSidebarNavsIsOpen = category => isOpen => {
    setSidebarNavsOpen({
      ...sidebarNavsIsOpen,
      [category]: isOpen,
    });
  };

  return (
    <Sidebar.StateProvider
      value={{
        sidebarNavsIsOpen,
        setSidebarNavsIsOpen,
      }}
    >
      <ThemeProvider theme={theme}>
        <Helmet>
          {fontsInUse.map(fontName => (
            <FontPreloadLink key={fontName} {...fonts[fontName]} />
          ))}
        </Helmet>
        <BaselineDevGrid>{props.children}</BaselineDevGrid>
        <GlobalStyle fontNames={fontsInUse} />
      </ThemeProvider>
    </Sidebar.StateProvider>
  );
};

export default Root;
