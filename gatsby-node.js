/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve('src/templates/blog.js');
  const tagTemplate = path.resolve('src/templates/tag.js');

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            timeToRead
            frontmatter {
              date
              path
              tags
              title
              photo {
                childImageSharp {
                  fluid(maxHeight: 250, maxWidth: 350, quality: 100) {
                    aspectRatio
                    src
                    sizes
                    srcSet
                  }
                }
              }
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const tags = {};
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.tags) {
        node.frontmatter.tags.forEach((tag) => {
          if (!tags[tag]) {
            tags[tag] = [];
          }
          tags[tag].push(node);
        });
      }
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
      });
    });

    Object.keys(tags).forEach((tag) => {
      createPage({
        path: `/tag/${tag.toLowerCase()}`,
        component: tagTemplate,
        context: {
          posts: tags[tag],
          title: tag,
        },
      });
    })

    return Promise.resolve();
  });
};
