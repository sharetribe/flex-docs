import { baselineSmall, baselineLarge } from './brand-components';

export const categories = {
  tutorials: {
    label: 'Tutorials',
    description:
      'Get started in learning about the product with hands-on tutorials for developers.',
  },
  guides: {
    label: 'How-to Guides',
    description:
      'Specific step-by-step guides for customizing your marketplace.',
  },
  references: {
    label: 'Reference',
    description: 'Technical reference to the tooling.',
  },
  background: {
    label: 'Background',
    description:
      'Explanations and background information for important concepts and design decisions behind the platform.',
  },
};

export const grid = {
  smallGap: 2 * baselineSmall,
  largeGap: 4 * baselineLarge,
  sideMargin: 12,
};

export const themeLight = {
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
  pageMaxWidth: 1135,
  contentPaddingSmall: 24,
  contentPaddingLarge: 48,
};

export const themeDark = {
  ...themeLight,

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
