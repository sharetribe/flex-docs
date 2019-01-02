const { NODE_ENV, NODE_VERSION } = process.env;
const NETLIFY_SITE_URL =
  process.env.URL ||
  `http://localhost:${NODE_ENV === 'development' ? 8000 : 9000}`;
const NETLIFY_DEPLOY_URL = process.env.DEPLOY_PRIME_URL || NETLIFY_SITE_URL;
const NETLIFY_ENV = process.env.CONTEXT || NODE_ENV;

const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

const siteTitle = 'Sharetribe Flex documentation';

console.log({
  NODE_ENV,
  NODE_VERSION,
  NETLIFY_SITE_URL,
  NETLIFY_DEPLOY_URL,
  NETLIFY_ENV,
  isNetlifyProduction,
  siteUrl,
});

const withTrailingSlash = path => {
  return path.endsWith('/') ? path : `${path}/`;
};

module.exports = {
  // ================ Site metadata ================
  //
  siteMetadata: {
    title: siteTitle,
    siteUrl,
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
        exclude: ['/styleguide'],
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

    // ================ Robots.txt ================
    //
    {
      // NOTE: robots.txt file is NOT built with dev server

      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*', disallow: [] }],
          },

          // Disallow indexing anything on branch deploys and deploy previews.
          //
          // See: https://github.com/mdreizin/gatsby-plugin-robots-txt/tree/v1.3.0#netlify
          //
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};
