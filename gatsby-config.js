module.exports = {
  siteMetadata: {
    title: 'Orestis Ioannou personal website',
  },
  plugins: [
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
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'GitHub',
        fieldName: 'github',
        // Url to query from
        url: 'https://api.github.com/graphql',
        // HTTP headers
        headers: {
          Authorization: 'bearer 54e363ccd64cce03168d2b20adf4a46ba7d6c5f3',
        },
        // Additional options to pass to node-fetch
        fetchOptions: {},
      },
    },
  ],
};
