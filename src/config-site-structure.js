/**
 * Global configuration file for the project.
 *
 * NOTE: Use Node-style exports to allow accessing this file in the
 * gatsby-node.js config.
 */

const sortingArrayIntroduction = [
  'introducing-sharetribe-developer-platform',
  'development-skills',
  'introducing-template',
];

const sortingArrayIntroductionGettingStarted = [
  'getting-started-with-web-template',
  'getting-started-with-sharetribe-cli',
  'getting-started-with-integration-api',
];

// Arrange tutorial articles according to this configuration.
// This sorting order is used to provide next-page link
// for the listed articles.
const sortingArrayTutorial = ['introduction'];
const sortingArrayTutorialBranding = [
  'copy-assets',
  'first-edit',
  'configurations',
  'change-default-locations',
  'deploy-to-render',
];

const sortingArrayTutorialListings = [
  'add-new-wizard-tab',
  'add-favorite-saunas',
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
  'users-and-authentication-in-sharetribe',
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
  'sharetribe-environments',
  'console-overview',
];

const sortingArrayContentManagement = [
  'content-management',
  'headless-content-management',
  'marketplace-texts',
];

const sortingArrayHowToUsers = [
  'enable-facebook-login',
  'enable-google-login',
  'enable-open-id-connect-login',
  'setup-open-id-connect-proxy',
  'enable-login-as-user',
  'implement-delete-user',
];

const sortingArrayTemplateContent = [
  'how-to-change-template-ui-texts',
  'how-to-change-bundled-marketplace-texts',
  'hosted-marketplace-texts',
  'how-to-change-template-language',
  'page-builder',
  'how-to-add-static-pages',
];

const sortingArrayTemplateIntroduction = [
  'sharetribe-web-template',
  'how-to-customize-template',
  'customization-checklist',
];

const sortingArrayListings = [
  'listings-overview',
  'how-the-listing-search-works',
  'requiring-approval',
];

const sortingArrayHowToListings = [
  'extend-listing-data-in-template',
  'modify-time-intervals',
  'bookings-with-buffer',
];

const sortingArrayOperatorGuidesStaticContent = [
  'introducing-pages',
  'what-are-marketplace-texts',
  'what-are-email-texts',
];

const sortingArrayOperatorGuidesConcepts = [
  'concepts',
  'features',
  'flex-operator-resources',
];

const sortingArrayOperatorGuidesLayout = [];

const sortingArrayOperatorGuidesBranding = [];

const sortingArrayOperatorGuidesListings = [];

const sortingArrayOperatorGuidesTransactions = [];
const sortingArrayOperatorGuidesUsefulInformation = [];

const sortingArrayPilotDayGuides = ['test-page'];

const sortingArrayTheNewSharetribeUsefulInformation = [];

/// Arrange The New Sharetribe tutorial
const sortingArrayTheNewSharetribeTutorial = [
  'tutorial-00-introduction',
  'tutorial-01-marketplace-branding',
  'tutorial-02-marketplace-layout',
  'tutorial-03-landing-page',
  'tutorial-04-listing-type',
  'tutorial-05-listing-fields',
  'tutorial-06-listing-search',
  'tutorial-07-commission-tx-size',
  'tutorial-08-microcopy',
  'tutorial-09-footer',
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
        id: 'tutorial-listings',
        sortingArray: sortingArrayTutorialListings,
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
      { id: 'how-to-events' },
      { id: 'how-to-search' },
    ],
  },

  {
    id: 'template',
    isOpen: false,
    subcategories: [
      {
        id: 'template-introduction',
        sortingArray: sortingArrayTemplateIntroduction,
      },
      { id: 'template-configuration' },
      {
        id: 'template-content',
        sortingArray: sortingArrayTemplateContent,
      },
      { id: 'template-styling' },
      { id: 'template-routing' },
      { id: 'template-data-flow' },
      { id: 'template-search' },
      { id: 'template-security' },
      { id: 'template-testing-error-handling' },
      { id: 'template-hosting' },
      { id: 'template-analytics' },
      { id: 'template-legacy' },
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
    id: 'tutorial-service',
    isOpen: true,
    sortingArray: [],
    isHidden: true,
    hideSidebar: true,
  },
  {
    id: 'tutorial-product',
    isOpen: true,
    sortingArray: [],
    isHidden: true,
    hideSidebar: true,
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
        id: 'operator-guides-useful-information',
        sortingArray: sortingArrayOperatorGuidesUsefulInformation,
      },
      {
        id: 'operator-guides-static-content',
        sortingArray: sortingArrayOperatorGuidesStaticContent,
      },

      {
        id: 'operator-guides-layout',
        sortingArray: sortingArrayOperatorGuidesLayout,
      },

      {
        id: 'operator-guides-transactions',
        sortingArray: sortingArrayOperatorGuidesTransactions,
      },

      {
        id: 'operator-guides-branding',
        sortingArray: sortingArrayOperatorGuidesBranding,
      },

      {
        id: 'operator-guides-listings',
        sortingArray: sortingArrayOperatorGuidesListings,
      },
    ],
  },
  {
    id: 'pilot-day-guides',
    isOpen: true,
    isHidden: true,
    hideSidebar: true,
    subcategories: [
      {
        id: 'pilot-day-guides-concepts',
        sortingArray: sortingArrayPilotDayGuides,
      },
      {
        id: 'pilot-day-guides-tutorials',
        sortingArray: [],
      },
      {
        id: 'pilot-day-guides-static-content',
        sortingArray: [],
      },
      {
        id: 'pilot-day-guides-transactions',
        sortingArray: [],
      },
      {
        id: 'pilot-day-guides-useful-information',
        sortingArray: [],
      },
      {
        id: 'pilot-day-guides-listings',
        sortingArray: [],
      },
      {
        id: 'pilot-day-guides-layout',
        sortingArray: [],
      },
      {
        id: 'pilot-day-guides-branding',
        sortingArray: [],
      },
    ],
  },
];
