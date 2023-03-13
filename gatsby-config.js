const { siteTitle } = require('./src/ui-texts');

const {
  NODE_ENV,
  NODE_VERSION,
  PRODUCTION_SITE_URL,
  GOOGLE_TAGMANAGER_ID,
  GOOGLE_TAGMANAGER_ID_DEPLOY_PREVIEW,
  // Env vars set by Vercel
  // See: https://vercel.com/docs/concepts/projects/environment-variables
  GATSBY_VERCEL_ENV,
  GATSBY_VERCEL_URL,
} = process.env;

const isVercel = !!GATSBY_VERCEL_ENV;

const VERCEL_URL = !/^https?:\/\//i.test(GATSBY_VERCEL_URL)
  ? 'https://' + GATSBY_VERCEL_URL
  : GATSBY_VERCEL_URL;

/**
 * Get the current env.
 *
 * Possible values:
 *
 * - 'local-development': local dev server
 * - 'local-production': local prod server
 * - 'vercel-production': production context in Vercel
 * - 'vercel-preview': non-master branch preview deployment in Vercel
 */
const getEnv = () => {
  if (isVercel) {
    return `vercel-${GATSBY_VERCEL_ENV}`;
  } else {
    return `local-${NODE_ENV}`;
  }
};

const getSiteUrl = env => {
  if (env === 'local-development') {
    return 'http://localhost:8000';
  } else if (env === 'local-production') {
    return 'http://localhost:9000';
  } else if (env === 'vercel-production') {
    return PRODUCTION_SITE_URL;
  } else if (env === 'vercel-preview') {
    return VERCEL_URL;
  } else {
    throw new Error(`Cannot construct siteUrl for unknown env: ${env}`);
  }
};

// Dont prefix /docs in vercel deploy previews
const getPathPrefix = env => {
  return (isVercel || env === 'local-production') && !(env === 'vercel-preview')
    ? '/docs'
    : '';
};

const ENV = getEnv();
const SITE_URL = getSiteUrl(ENV);
const PATH_PREFIX = getPathPrefix(ENV);

console.log(PATH_PREFIX, 'path prefix');
console.log(ENV, 'env');

console.log({
  NODE_ENV,
  NODE_VERSION,
  PRODUCTION_SITE_URL,
  PATH_PREFIX,
  ENV,
  SITE_URL,
});

const withTrailingSlash = path => {
  return path.endsWith('/') ? path : `${path}/`;
};

module.exports = {
  // ================ Site metadata ================
  //
  siteMetadata: {
    title: siteTitle,
    siteUrl: SITE_URL,
  },
  plugins: [
    // ================ Header metadata ================
    //
    'gatsby-plugin-react-helmet',

    // ================ Markdown and images ================
    //
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: `${__dirname}/src/docs`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              withWebp: { quality: 85 },

              // Same as `contentMaxWidth` in the theme. The image
              // won't be rendered any bigger.
              maxWidth: 635,
              quality: 85,

              backgroundColor: 'transparent',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              rel: 'noopener noreferrer',
            },
          },
        ],
      },
    },
    'gatsby-plugin-catch-links',

    // ================ Styles ================
    //
    'gatsby-plugin-styled-components',

    // ================ Manifest ================
    //
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteTitle,
        short_name: 'Flex',
        start_url: '/',
        background_color: '#f9f9f9',
        theme_color: '#f9f9f9',
        display: 'minimal-ui',
        icon: 'src/images/logo.png', // This path is relative to the root of the site.
      },
    },

    // ================ Sitemap ================
    //
    {
      // NOTE: sitemap is NOT built with dev server

      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: [
          '/styleguide',
          '/thanks-for-the-feedback',
          `/operator-guides`,
          `/operator-guides/*`,
        ],
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
        }
      `,
        resolveSiteUrl: () => SITE_URL,
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages;
        },
        serialize: ({ path }) => {
          return {
            url: path,
            // NOTE: These are optional and most likely ignored by Google et. al
            //
            // changefreq: 'daily',
            // priority: 0.7,
          };
        },
      },
    },
  ],
};

// ================ Analytics ================
//
if (ENV === 'vercel-production' && GOOGLE_TAGMANAGER_ID) {
  console.log('Enabling Google Tag Manager plugin for production');
  module.exports.plugins.push({
    resolve: 'gatsby-plugin-google-tagmanager',
    options: {
      id: GOOGLE_TAGMANAGER_ID,
    },
  });
}
if (ENV === 'vercel-preview' && GOOGLE_TAGMANAGER_ID_DEPLOY_PREVIEW) {
  console.log('Enabling Google Tag Manager plugin for deploy preview');
  module.exports.plugins.push({
    resolve: 'gatsby-plugin-google-tagmanager',
    options: {
      id: GOOGLE_TAGMANAGER_ID_DEPLOY_PREVIEW,
    },
  });
}

if (PATH_PREFIX) {
  module.exports.pathPrefix = PATH_PREFIX;
}
