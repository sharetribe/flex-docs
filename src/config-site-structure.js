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
  'change-transaction-process'
]

const sortingArrayPayments = [
  'payments-overview',
  'payment-methods-overview',
  'using-stored-payment-cards',
  'off-session-payments-in-transaction-process',
  'payment-intents',
  'solving-payout-problems',
  'strong-customer-authentication'
]

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
      { id: 'concepts-transaction-process',
        sortingArray: sortingArrayTransactionProcess,
      },
      { id: 'concepts-payments',
        sortingArray: sortingArrayPayments,
      },
      { id: 'concepts-pricing-and-commissions' },
      { id: 'concepts-availability' },
      { id: 'concepts-development' },
      { id: 'concepts-extended-data' },
      { id: 'concepts-api-sdk' },
    ]
    // sortingArray: sortingArrayConcepts,
  },

  {
    id: 'howto',
    isOpen: false,
    subcategories: [
      { id: 'howto-users-and-authentication' },
      { id: 'howto-listing' },
      { id: 'howto-transaction-process' },
      {
        id: 'howto-payments',
        sortingArray: sortingArrayPaymentCookbooks,
      },
      { id: 'howto-migrations' },
      { id: 'howto-messaging' },
      { id: 'howto-design' },
      { id: 'howto-events' },
      { id: 'howto-search' },
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
    id: 'design-toolkit',
    isOpen: false,
  },

  {
    id: 'references',
    isOpen: false,
    sortingArray: sortingArrayReferences,
  },
];
