# oioannou [![Netlify Status](https://api.netlify.com/api/v1/badges/c8ac9867-3466-4573-a88e-b5776cf70c82/deploy-status)](https://app.netlify.com/sites/oorestisime/deploys)

This is the code for my personal website.

- It was initially built using Flask Python Frozen-Flask FlatPages.
- Second iteration using Gatsby and Grommet
- Third iteration React Router + shadcn
- Current iteration using Astro and static content collections

You can see it live at [www.oioannou.com](http://www.oioannou.com).

## Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

## Structure

- `/src/pages` - Statically generated routes
- `/src/components` - Reusable Astro components
- `/src/content/blog` - Markdown articles
- `/src/layouts` - Shared page metadata and document structure
- `/public` - Static images, robots policy, and favicon
