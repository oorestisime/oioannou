import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/blog.$slug.tsx"),
  route("projects", "routes/projects.tsx"),
  route("tags/:tag", "routes/tags.$tag.tsx"),
] satisfies RouteConfig;