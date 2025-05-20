import { type RouteConfig, index, route } from "@react-router/dev/routes"

// Create a route array with standard routes first
const routes = [
  index("routes/home.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/blog.$slug.tsx"),
  route("projects", "routes/projects.tsx"),
  route("tags/:tag", "routes/tags.$tag.tsx"),
]

export default routes satisfies RouteConfig
