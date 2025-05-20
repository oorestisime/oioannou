import { type RouteConfig, index, route } from "@react-router/dev/routes"
import { getSortedPostsData } from "./lib/blog"

// Get all blog posts
const posts = getSortedPostsData()

// Create a route array with standard routes first
const routes = [
  index("routes/home.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/blog.$slug.tsx"),
  route("projects", "routes/projects.tsx"),
  route("tags/:tag", "routes/tags.$tag.tsx"),
]

// Add direct slug to /blog/slug redirects for each post
posts.forEach((post) => {
  // Only create redirect if the post.url (slug) doesn't contain slashes
  console.log("registering route from", post.path)
  routes.push(route(post.path, "routes/blogRedirect.tsx"))
})

export default routes satisfies RouteConfig
