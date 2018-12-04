require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Orestis Ioannou personal website',
  },
  plugins: [
    'gatsby-plugin-netlify-cache',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/src/pages/blog`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 756,
            },
          },
          'gatsby-remark-prismjs',
        ],
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'GitHub',
        fieldName: 'github',
        // Url to query from
        url: 'https://api.github.com/graphql',
        // HTTP headers
        headers: {
          Authorization: `bearer ${process.env.GITHUB}`,
        },
        // Additional options to pass to node-fetch
        fetchOptions: {},
      },
    },
  ],
};
