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
  'introducing-template',
];

const sortingArrayIntroductionGettingStarted = [
  'getting-started-with-web-template',
  'getting-started-with-flex-cli',
  'getting-started-with-integration-api',
];

// Arrange tutorial articles according to this configuration.
// This sorting order is used to provide next-page link
// for the listed articles.
const sortingArrayTutorial = ['introduction'];
const sortingArrayTutorialBranding = [
  'first-edit',
  'change-images',
  'modify-landing-page',
  'change-logo',
  'working-with-microcopy',
  'configurations',
  'change-default-locations',
  'implement-amenities-filter',
  'modify-listing-extended-data',
  'deploy-to-render',
];

const sortingArrayTutorialTransactionProcess = [
  'customize-pricing-tutorial',
  'create-transaction-process',
  'use-protected-data-in-emails',
  'add-new-email-notification',
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

const sortingArrayTransactionProcess = [
  'transaction-process',
  'privileged-transitions',
  'change-transaction-process',
  'reviews',
];

const sortingArrayUsersAndAuthentication = [
  'users-and-authentication-in-flex',
  'social-logins-and-sso',
];

const sortingArrayPayments = [
  'payments-overview',
  'payment-methods-overview',
  'using-stored-payment-cards',
  'off-session-payments-in-transaction-process',
  'payment-intents',
  'solving-payout-problems',
  'strong-customer-authentication',
];

const sortingArrayManageConsole = [
  'console-manage-overview',
  'console-manage-users',
  'console-manage-listings',
  'console-manage-transactions',
  'console-manage-reviews',
];

const sortingArrayDevelopment = [
  'applications',
  'flex-environments',
  'console-overview',
];

const sortingArrayContentManagement = [
  'content-management',
  'headless-content-management',
  'microcopy',
];

const sortingArrayHowToUsers = [
  'enable-facebook-login',
  'enable-google-login',
  'enable-open-id-connect-login',
  'setup-open-id-connect-proxy',
  'enable-login-as-user',
  'implement-delete-user',
];

const sortingArrayFTWContent = [
  'how-to-change-ftw-ui-texts',
  'how-to-change-ftw-bundled-microcopy',
  'hosted-microcopy',
  'how-to-change-ftw-language',
  'page-builder',
  'how-to-add-static-pages-in-ftw',
];

const sortingArrayFTWIntroduction = [
  'sharetribe-web-template',
  'how-to-customize-ftw',
  'customization-checklist',
];

const sortingArrayListings = [
  'listings-overview',
  'how-the-listing-search-works',
  'requiring-approval',
];

const sortingArrayHowToListings = [
  'extend-listing-data-in-ftw',
  'modify-time-intervals',
  'bookings-with-buffer',
];
const sortingArrayOperatorGuidesPages = ['introducing-pages'];
const sortingArrayOperatorGuidesConcepts = [
  'concepts',
  'features',
  'flex-operator-resources',
];

exports.siteStructure = [
  {
    id: 'introduction',
    isOpen: false,
    sortingArray: sortingArrayIntroduction,
    subcategories: [
      {
        id: 'introduction-getting-started',
        sortingArray: sortingArrayIntroductionGettingStarted,
      },
    ],
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
      {
        id: 'concepts-users-and-authentication',
        sortingArray: sortingArrayUsersAndAuthentication,
      },
      {
        id: 'concepts-listings',
        sortingArray: sortingArrayListings,
      },
      {
        id: 'concepts-transaction-process',
        sortingArray: sortingArrayTransactionProcess,
      },
      { id: 'concepts-payments', sortingArray: sortingArrayPayments },
      { id: 'concepts-pricing-and-commissions' },
      { id: 'concepts-availability' },
      { id: 'concepts-development', sortingArray: sortingArrayDevelopment },
      {
        id: 'concepts-content-management',
        sortingArray: sortingArrayContentManagement,
      },
      { id: 'concepts-management', sortingArray: sortingArrayManageConsole },
      { id: 'concepts-extended-data' },
      { id: 'concepts-api-sdk' },
      { id: 'concepts-messages' },
      { id: 'concepts-integrations' },
    ],
    // sortingArray: sortingArrayConcepts,
  },

  {
    id: 'how-to',
    isOpen: false,
    subcategories: [
      {
        id: 'how-to-users-and-authentication',
        sortingArray: sortingArrayHowToUsers,
      },
      {
        id: 'how-to-listing',
        sortingArray: sortingArrayHowToListings,
      },
      { id: 'how-to-transaction-process' },
      {
        id: 'how-to-payments',
        sortingArray: sortingArrayPaymentCookbooks,
      },
      { id: 'how-to-migrations' },
      { id: 'how-to-content' },
      { id: 'how-to-messaging' },
      { id: 'how-to-design' },
      { id: 'how-to-events' },
      { id: 'how-to-search' },
    ],
  },

  {
    id: 'ftw',
    isOpen: false,
    subcategories: [
      {
        id: 'ftw-introduction',
        sortingArray: sortingArrayFTWIntroduction,
      },
      { id: 'ftw-configuration' },
      {
        id: 'ftw-content',
        sortingArray: sortingArrayFTWContent,
      },
      { id: 'ftw-styling' },
      { id: 'ftw-routing' },
      { id: 'ftw-data-flow' },
      { id: 'ftw-search' },
      { id: 'ftw-security' },
      { id: 'ftw-testing-error-handling' },
      { id: 'ftw-hosting' },
      { id: 'ftw-analytics' },
      { id: 'ftw-legacy' },
    ],
  },

  {
    id: 'design-toolkit',
    isOpen: false,
  },

  {
    id: 'references',
    isOpen: false,
    sortingArray: sortingArrayReferences,
  },
  {
    id: 'operator-guides',
    isOpen: false,
    isHidden: true,
    subcategories: [
      {
        id: 'operator-guides-concepts',
        sortingArray: sortingArrayOperatorGuidesConcepts,
      },

      {
        id: 'operator-guides-pages',
        sortingArray: sortingArrayOperatorGuidesPages,
      },
    ],
  },
];
