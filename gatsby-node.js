const path = require("path")

exports.onCreatePage = ({
  page,
  actions
}) => {
  const {
    createPage,
    deletePage
  } = actions

  return new Promise(resolve => {
    // Check if this page is a post page created by theme "gatsby-theme-grommet"
    if (
      page.component.includes("gatsby-theme-grommet") &&
      page.component.includes("blog")
    ) {
      deletePage(page)
      createPage({
        ...page,
        component: require.resolve("gatsby-theme-grommet/src/templates/blog.tsx"), // Replacement template
      })
    }

    if (
      page.component.includes("gatsby-theme-grommet") &&
      page.component.includes("tag")
    ) {
      deletePage(page)
      createPage({
        ...page,
        component: require.resolve("gatsby-theme-grommet/src/templates/tag.tsx"), // Replacement template
      })
    }

    resolve()
  })
}
