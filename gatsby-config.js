const { siteTitle } = require('./src/ui-texts');

const {
  NODE_ENV,
  NODE_VERSION,
  PRODUCTION_SITE_URL,
  GOOGLE_TAGMANAGER_ID,

  // Env vars set by Netlify
  // See: https://www.netlify.com/docs/continuous-deployment/#build-environment-variables
  CONTEXT,
  DEPLOY_PRIME_URL,
} = process.env;

const isNetlify = !!CONTEXT;

/**
 * Get the current env.
 *
 * Possible values:
 *
 * - 'local-development': local dev server
 * - 'local-production': local prod server
 * - 'netlify-production': production context in Netlify
 * - 'netlify-deploy-preview': pull request preview context in Netlify
 * - 'netlify-branch-deploy': non-master branch deployment context in Netlify
 */
const getEnv = () => {
  if (isNetlify) {
    return `netlify-${CONTEXT}`;
  } else {
    return `local-${NODE_ENV}`;
  }
};

const getSiteUrl = env => {
  if (env === 'local-development') {
    return 'http://localhost:8000';
  } else if (env === 'local-production') {
    return 'http://localhost:9000';
  } else if (env === 'netlify-production') {
    return PRODUCTION_SITE_URL;
  } else if (env === 'netlify-deploy-preview') {
    return DEPLOY_PRIME_URL;
  } else if (env === 'netlify-branch-deploy') {
    return DEPLOY_PRIME_URL;
  } else {
    throw new Error(`Cannot construct siteUrl for unknown env: ${env}`);
  }
};

const getPathPrefix = env => {
  return isNetlify || env === 'local-production' ? '/docs' : '';
};

const ENV = getEnv();
const SITE_URL = getSiteUrl(ENV);
const PATH_PREFIX = getPathPrefix(ENV);

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
              sizeByPixelDensity: true,
              withWebp: true,

              // Same as `contentMaxWidth` in the theme. The image
              // won't be rendered any bigger.
              maxWidth: 635,

              backgroundColor: 'transparent',
            },
          },
          'gatsby-remark-reading-time',
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
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
        exclude: ['/styleguide', '/thanks-for-the-feedback'],
        serialize: ({ site, allSitePage }) => {
          return allSitePage.edges.map(edge => {
            return {
              url: `${site.siteMetadata.siteUrl}${withTrailingSlash(
                edge.node.path
              )}`,

              // NOTE: These are optional and most likely ignored by Google et. al
              //
              // changefreq: 'daily',
              // priority: 0.7,
            };
          });
        },
      },
    },
  ],
};

// ================ Analytics ================
//
if (ENV === 'netlify-production' && GOOGLE_TAGMANAGER_ID) {
  console.log('Enabling Google Tag Manager plugin');
  module.exports.plugins.push({
    resolve: 'gatsby-plugin-google-tagmanager',
    options: {
      id: GOOGLE_TAGMANAGER_ID,
    },
  });
}

if (PATH_PREFIX) {
  module.exports.pathPrefix = PATH_PREFIX;
}
