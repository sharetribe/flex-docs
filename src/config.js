/**
 * Global configuration file for the project.
 *
 * NOTE: Use Node-style exports to allow accessing this file in the
 * gatsby-node.js config.
 */

const structure = require('./config-site-structure');
exports.siteStructure = structure.siteStructure;
exports.categories = structure.categories;

// Dev mode flag
exports.dev = process.env.NODE_ENV === 'development';

// Baseline configuration
exports.baselineSmall = 6;
exports.baselineLarge = 8;
exports.baselineSpacing = 24;
exports.baselineBreakpoint = 768;

/*
// Fonts that are used from fonts.js
exports.fontsInUse = ['CircularStd-Book', 'CircularStd-Bold'];
*/

// Generic grid config used in LandingPage and ArticleIndexPage
exports.grid = {
  smallGap: 12,
  largeGap: 32,
  sideMargin: 12,
};

exports.themeLight = {
  // Main background color
  backgroundColor: '#f9f9fb',

  // Raised box background color
  backgroundColorRaised: '#fff',

  // Footer colors
  footerBackgroundColor: '#fff',
  footerColor: '#5c676d',

  // Text colors
  textColor: '#4a4a4a',
  textColorSecondary: '#9b9b9b',
  textColorSmall: '#5c676d',
  textColorTiny: '#9b9b9b',

  // Quoted code etc. color
  textColorQuoted: '#282c34',

  // Hightlighted text color e.g. for skills list in article
  textColorHighlight: '#f74b00',

  // Topbar colors
  topbarNavColorActive: '#000',
  topbarNavBorderColorActive: '#0080ff',

  // Search
  searchInputBorderColor: '#d1d1d1',
  searchResultsPrimaryColor: '#4a4a4a',
  searchResultsSecondaryColor: '#5c676d',
  searchResultsHighlightColor: '#0080ff',

  // Sidebar colors
  sidebarNavColorTitle: '#4a4a4a',
  sidebarNavColorTitleHover: '#000',
  sidebarNavColorMainCategory: '#a0a6aa',
  sidebarNavColorSubcategory: '#4a4a4a',
  sidebarNavColorLink: '#0080ff',
  sidebarNavColorLinkHover: '#0066cc',
  sidebarNavColorLinkActive: '#004c99',
  sidebarNavColorLinkVisited: '#0080ff',
  sidebarNavBorderColorActive: '#004c99',
  sidebarNavBorderColorHover: '#0066cc',

  tocColorLink: '#0080ff',
  tocColorLinkHover: '#0066cc',

  // Heading color
  headingColor: '#4a4a4a',
  headingColorSecondary: '#9aa6ac',

  // Horizontal Hr line color
  lineColor: '#ccc',

  // Link colors
  linkColor: '#0074e8',
  linkColorHover: '#0059b3',
  linkColorVisited: '#9013fe',

  // Baseline dev grid
  baselineDevColor1: 'rgba(0, 0, 0, 0.2)',
  baselineDevColor2: 'rgba(0, 0, 0, 0.1)',

  // Carousel
  dot: '#d8d8d8',
  activeDot: '#0080ff',
  arrow: '#9b9b9b',
  arrowDisabled: '#ccc',
  arrowHoverColor: '#0080ff',
  slideImgBorderColor: '#dedede',

  // Content size and spacing
  pageContentMaxWidth: 1135,
  contentMaxWidth: 720,
  contentPaddingSmall: 24,
  contentPaddingLarge: 48,
};

exports.themeDark = {
  ...exports.themeLight,

  // NOTE: dark theme is unmaintained, might be enabled at some point,
  // but needs work to sync with the properties above and proper
  // values for those.
  backgroundColor: '#1e1e1e',
  footerBackgroundColor: '#000',
  footerTextColor: '#fff',
  backgroundColorRaised: '#000',
  textColor: 'rgba(252, 252, 252, 0.8)',
  textColorSecondary: '#9b9b9b',
  textColorQuoted: '#888',
  textColorHighlight: '#f74b00',
  textColorActive: '#fcfcfc',
  borderColorActive: '#fcfcfc',
  headingColor: 'rgba(252, 252, 252, 0.8)',
  headingColorSecondary: '#9b9b9b',
  lineColor: '#9b9b9b',
  linkColor: '#489cff',
  linkColorHover: '#489cff',
  linkColorVisited: '#9013fe',
};
