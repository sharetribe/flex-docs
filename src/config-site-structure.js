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

const sortingArrayBackground = [
  'introducing-flex',
  'concepts',
  'development-skills',
  'getting-started',
  'features',
  'transaction-process',
  'ftw-routing',
  'ftw-redux',
  'how-to-build-and-launch-with-flex',
  'is-flex-right-for-you',
  'custom-pricing',
  'what-is-the-difference-between-flex-and-go-source-available',
  'payment-intents',
  'strong-customer-authentication',
  'how-the-search-works',
  'off-session-payments-in-transaction-process',
  'using-stored-payment-cards',
  'solving-payout-problems',
  'marketplace-api-integration-api',
  'time-based-template',
  'authentication-api',
  'commissions-and-monetizing-your-platform',
  'applications',
  'stripe-provider-onboarding-and-capabilities',
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
    id: 'background',
    isOpen: false,
    sortingArray: sortingArrayBackground,
  },

  {
    id: 'cookbook',
    isOpen: false,
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
      { id: 'ftw-templates' },
      { id: 'ftw-configuration' },
      { id: 'ftw-styling' },
      { id: 'ftw-routing' },
      { id: 'ftw-data-flow' },
      { id: 'ftw-search' },
      { id: 'ftw-security' },
      { id: 'ftw-testing-error-handling' },
      { id: 'ftw-hosting' },
      { id: 'ftw-analytics' },
      { id: 'ftw-hosting' },
      { id: 'ftw-performance' },
    ],
  },
  {
    id: 'integrations',
    isOpen: false,
  },
  { id: 'design-toolkit', isOpen: false },
  { id: 'references', isOpen: false },

  { id: 'guides', isOpen: false },
  // { id: 'references', isOpen: false },
];
