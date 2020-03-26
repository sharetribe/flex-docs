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

const sortingArrayFlexCLI = [
  'getting-started-with-flex-cli',
  'edit-transaction-process-with-flex-cli',
  'edit-email-templates-with-flex-cli',
  'manage-search-schemas-with-flex-cli',
];

const sortingArrayReferences = [
  'api',
  'js-sdk',
  'extended-data',
  'email-templates',
  'availability',
  'transaction-process-format',
  'transaction-process-actions',
  'transaction-process-time-expressions',
];

exports.siteStructure = [
  { id: 'introduction', isOpen: false },
  {
    id: 'tutorial',
    isOpen: false,
    sortingArray: sortingArrayTutorial,
    subcategories: [
      {
        id: 'tutorial-branding',
        sortingArray: sortingArrayTutorialBranding,
        showNextAndPrev: true,
      },
      // { id: 'tutorial-advanced' },
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
  { id: 'integrations', isOpen: false },
  {
    id: 'flex-cli',
    isOpen: false,
    sortingArray: sortingArrayFlexCLI,
  },
  {
    id: 'references',
    isOpen: false,
    sortingArray: sortingArrayReferences,
  },

  { id: 'guides', isOpen: false },
];
