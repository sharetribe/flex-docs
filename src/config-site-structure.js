/**
 * Global configuration file for the project.
 *
 * NOTE: Use Node-style exports to allow accessing this file in the
 * gatsby-node.js config.
 */

const sortingArrayIntroduction = [
  'introducing-flex',
  'getting-started-with-ftw-daily',
  'how-to-build-and-launch-with-flex',
  'is-flex-right-for-you',
  'development-skills',
];

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
  'add-faq-page',
  'deploy-to-heroku',
];
const sortingArrayTutorialExtendedData = [
  'add-extended-data',
  'show-extended-data',
  'filter-with-extended-data',
];

const sortingArrayTutorialTransactionProcess = [
  'customize-pricing-tutorial',
  'create-transaction-process',
  'use-protected-data-in-emails',
  'add-new-email-notification',
];

// const sortingArrayConcepts = [
//   'introducing-flex',
//   'concepts',
//   'development-skills',
//   'features',
//   'transaction-process',
//   'ftw-routing',
//   'ftw-redux',
//   'how-to-build-and-launch-with-flex',
//   'is-flex-right-for-you',
//   'custom-pricing',
//   'pricing',
//   'what-is-the-difference-between-flex-and-go-source-available',
//   'payments-overview',
//   'payment-methods-overview',
//   'payment-intents',
//   'strong-customer-authentication',
//   'privileged-transitions',
//   'off-session-payments-in-transaction-process',
//   'using-stored-payment-cards',
//   'solving-payout-problems',
//   'commissions-and-monetizing-your-platform',
//   'stripe-provider-onboarding-and-capabilities',
//   'how-the-search-works',
//   'marketplace-api-integration-api',
//   'time-based-template',
//   'authentication-api',
//   'social-logins-and-sso',
//   'applications',
// ];

const sortingArrayFlexCLI = [
  'getting-started-with-flex-cli',
  'edit-transaction-process-with-flex-cli',
  'edit-email-templates-with-flex-cli',
  'manage-search-schemas-with-flex-cli',
  'view-events-with-flex-cli',
];

const sortingArrayReferences = [
  'api',
  'js-sdk',
  'extended-data',
  'email-templates',
  'availability',
  'stock',
  'transaction-process-format',
  'transaction-process-actions',
  'transaction-process-time-expressions',
];

const sortingArrayPaymentCookbooks = [
  'how-to-customize-pricing',
  'set-up-and-use-stripe',
  'provider-onboarding-and-identity-verification',
  'enable-payment-intents',
  'save-payment-card',
  'stripe-connect-platform-review',
  'removing-stripe',
];

exports.siteStructure = [
  {
    id: 'introduction',
    isOpen: false,
    sortingArray: sortingArrayIntroduction,
  },
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
      {
        id: 'tutorial-extended-data',
        sortingArray: sortingArrayTutorialExtendedData,
        showNextAndPrev: true,
      },
      {
        id: 'tutorial-transaction-process',
        sortingArray: sortingArrayTutorialTransactionProcess,
        showNextAndPrev: true,
      },
    ],
  },
  {
    id: 'concepts',
    isOpen: false,
    subcategories: [
      { id: 'concepts-users-and-authentication' },
      { id: 'concepts-listings' },
      { id: 'concepts-transaction-process' },
      { id: 'concepts-payments' },
      { id: 'concepts-pricing-and-commissions' },
    ]
    // sortingArray: sortingArrayConcepts,
  },

  {
    id: 'cookbook',
    isOpen: false,
    subcategories: [
      { id: 'cookbook-data-model' },
      { id: 'cookbook-design' },
      { id: 'cookbook-search' },
      { id: 'cookbook-transaction-process' },
      {
        id: 'cookbook-payments',
        sortingArray: sortingArrayPaymentCookbooks,
      },
      { id: 'cookbook-manage' },
      { id: 'cookbook-emails' },
      { id: 'cookbook-social-logins-and-sso' },
      { id: 'cookbook-events' },
    ],
  },

  {
    id: 'ftw',
    isOpen: false,
    subcategories: [
      { id: 'ftw-introduction' },
      { id: 'ftw-configuration' },
      { id: 'ftw-styling' },
      { id: 'ftw-routing' },
      { id: 'ftw-data-flow' },
      { id: 'ftw-search' },
      { id: 'ftw-security' },
      { id: 'ftw-testing-error-handling' },
      { id: 'ftw-hosting' },
      { id: 'ftw-analytics' },
    ],
  },

  {
    id: 'flex-cli',
    isOpen: false,
    sortingArray: sortingArrayFlexCLI,
  },

  {
    id: 'design-toolkit',
    isOpen: false,
  },

  { id: 'integrations', isOpen: false },

  {
    id: 'references',
    isOpen: false,
    sortingArray: sortingArrayReferences,
  },
];
