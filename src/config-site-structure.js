/**
 * Global configuration file for the project.
 *
 * NOTE: Use Node-style exports to allow accessing this file in the
 * gatsby-node.js config.
 */

// Arrange tutorial articles according to this configuration.
// This sorting order is used to provide next-page link
// for the listed articles.
const sortingArrayTutorial = ['introduction'];
const sortingArrayTutorialBranding = [
  'first-edit',
  'change-image-assets',
  'change-logo',
  'working-with-translations',
  'configurations',
  'change-default-locations',
  'customize-amenities-filter',
  'deploy-to-heroku',
];

exports.siteStructure = [
  { id: 'introduction' },
  {
    id: 'tutorial',
    isOpen: true,
    sortingArray: sortingArrayTutorial,
    subcategories: [
      { id: 'tutorial-branding', sortingArray: sortingArrayTutorialBranding },
      { id: 'tutorial-advanced' },
    ],
  },
  {
    id: 'concepts',
    subcategories: [
      { id: 'concepts-data-model' },
      { id: 'concepts-availability' },
      { id: 'concepts-search' },
      { id: 'concepts-transaction-process' },
      { id: 'concepts-email-templates' },
      { id: 'concepts-payments' },
    ],
  },

  {
    id: 'cookbook',
    subcategories: [
      { id: 'cookbook-data-model' },
      { id: 'cookbook-search' },
      { id: 'cookbook-transaction-process' },
      { id: 'cookbook-payments' },
      { id: 'cookbook-manage' },
      { id: 'cookbook-email-templates' },
      { id: 'cookbook-availability' },
    ],
  },

  {
    id: 'development',
    isOpen: false,
    subcategories: [
      { id: 'development-flex-cli' },
      { id: 'development-ftw-templates' },
      { id: 'development-integrations' },
    ],
  },

  {
    id: 'ftw',
    isOpen: false,
    subcategories: [
      { id: 'ftw-configuration' },
      { id: 'ftw-styling' },
      { id: 'ftw-routing' },
      { id: 'ftw-dataflow' },
      { id: 'ftw-search' },
      { id: 'ftw-security' },
      { id: 'ftw-server' },
      { id: 'ftw-hosting' },
      { id: 'ftw-analytics' },
      { id: 'ftw-performance' },
      { id: 'ftw-testing' },
    ],
  },
  { id: 'design-toolkit', isOpen: false },
  { id: 'references', isOpen: false },

  { id: 'guides', isOpen: false },
  // { id: 'references', isOpen: false },
  { id: 'background', isOpen: false },
];
