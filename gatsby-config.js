module.exports = {
  siteMetadata: {
    title: 'Sharetribe Flex documentation',
  },
  plugins: [
    // Header metadata
    'gatsby-plugin-react-helmet',

    // Markdown and images
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
        ],
      },
    },

    // Styles
    'gatsby-plugin-styled-components',

    // Miscellaneous
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Sharetribe Flex documentation',
        short_name: 'Flex',
        start_url: '/',
        background_color: '#f9f9f9',
        theme_color: '#f9f9f9',
        display: 'minimal-ui',
        icon: 'src/images/logo.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};
