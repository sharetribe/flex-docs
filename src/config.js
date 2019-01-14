/**
 * Global configuration file for the project.
 *
 * NOTE: Use Node-style exports to allow accessing this file in the
 * gatsby-node.js config.
 */

// Dev mode flag
exports.dev = process.env.NODE_ENV === 'development';

// Fonts that are used from brand-components/fonts.js
exports.fontsInUse = ['CircularStd-Book', 'CircularStd-Bold'];

// Categories allowed for articles. The order defines the order in the
// Topbar navigation.
exports.categories = [
  { id: 'tutorials' },
  { id: 'guides' },
  { id: 'references' },
  { id: 'background' },
];

// LandingPage grid config.
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

  // Secondary background color, e.g. footer
  backgroundColorSecondary: '#f2f2f5',

  // Body text color
  textColor: '#4a4a4a',

  // Body text color
  textColorQuoted: '#888',

  // Text color on secondary background
  textColorSecondary: '#9b9b9b',

  // Hightlighted text color
  textColorHighlight: '#f74b00',

  // Active navigation color
  textColorActive: '#000',
  borderColorActive: '#0080ff',

  // Heading color
  headingColor: '#4a4a4a',
  headingColorSecondary: '#4a4a4a',

  // Horizontal Hr line color
  lineColor: '#ccc',

  // Link colors
  linkColor: '#0074e8',
  linkColorHover: '#0059b3',
  linkColorVisited: '#9013fe',

  // Button colors
  primaryButtonColor: '#0080ff',
  primaryButtonColorHover: '#0059b3',

  // Baseline dev grid
  baselineDevColor1: 'rgba(0, 0, 0, 0.2)',
  baselineDevColor2: 'rgba(0, 0, 0, 0.1)',

  // Content size and spacing
  pageContentMaxWidth: 1135,
  contentMaxWidth: 635,
  contentPaddingSmall: 24,
  contentPaddingLarge: 48,
};

exports.themeDark = {
  ...exports.themeLight,

  // Main background color
  backgroundColor: '#1e1e1e',

  // Raised box background color
  backgroundColorRaised: '#000',

  // Secondary background color, e.g. footer
  backgroundColorSecondary: '#000',

  // Body text color
  textColor: 'rgba(252, 252, 252, 0.8)',

  // Body text color
  textColorQuoted: '#888',

  // Text color on secondary background
  textColorSecondary: '#9b9b9b',

  // Hightlighted text color
  textColorHighlight: '#f74b00',

  // Active navigation color
  textColorActive: '#fcfcfc',
  borderColorActive: '#fcfcfc',

  // Heading color
  headingColor: 'rgba(252, 252, 252, 0.8)',
  headingColorSecondary: '#9b9b9b',

  // Horizontal Hr line color
  lineColor: '#9b9b9b',

  // Link colors
  linkColor: '#489cff',
  linkColorHover: '#489cff',
  linkColorVisited: '#9013fe',

  // Button colors
  primaryButtonColor: '#0080ff',
  primaryButtonColorHover: '#0059b3',
};
