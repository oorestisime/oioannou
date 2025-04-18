---
path: /migrate-from-mui-to-grommet
title: "Migrating oasome.blog from material-ui to grommet"
date: 2019-03-04
tags: ["Grommet", "Material-ui", "Gatsby"]
photo: /img/grommet.png
---

> Initially posted on [Medium](https://medium.com/grommet-io/migrating-oasome-blog-from-material-ui-to-grommet-d2fd490d3c32)

> If you came here for a material-ui vs grommet article then you came to the wrong place. This article documents the why and how I did it and the aftermath.

## The why

Migrating from one UI library to another is no easy task! Almost always the APIs are completely different, their components do not match and there are a lot of broken things before you get to a bare minimum working site again.

For most projects there’s never a reasonable need to go through such migrations. Most often you end up with the UI library you pick at the beginning and when such migrations happen the project is almost always at its early development phases.

My motivation to go through this migration wasn’t driven by a lack of features or issues with Material-ui! It is a great library when someone wants to follow the material guidelines and produce a `materialistic` website.

I came up with the idea to migrate [oasome.blog](https://oasome.blog) to Grommet as an exercise to verify that Grommet provides sufficient components in order to produce a desired UI state. I wanted to use Grommet for something a bit bigger than my personal website and to start walking away from the material design which is needless for this blog.

So lets get it started!

## The how

I separated my effort into 3 main sections with the first one being the global changes needed most often related to dependencies and gatsby, then a per component lookup and the final touches including creating a theme.

### Global changes

As with any feature or fix I created a new branch, this one called grommet. First thing needed for the migration was to remove all the `material-ui` and `jss` related packages from my `package.json` and include the `grommet` and `styled-components` specifics. In the process I also thought it might be a good time to `yarn upgrade-interactive --latest`.

So off comes `@material-ui/core`, `@material-ui/icons`, `jss`, `mdi-material-ui`, `react-jss` and in comes `grommet`, `grommet-icons`, `styled-components` and `gatsby-plugin-styled-components`. In addition I configured `prettier` since I didn't do it back then.

Once I got the dependencies I had to remove all the [magic](https://github.com/mui-org/material-ui/tree/next/examples/gatsby) required to make material-ui work with gatsby and that includes the HOC and gatsby-ssr code. I was never really happy to have that code in my repository so I was glad i got rid of it in the process and I also got [a fix for another issue](https://github.com/gatsbyjs/gatsby/issues/8237). Kind of feels that material-ui is not a great fit for gatsby until today!

Last step needed before gatsby was compiling: remove all the related imports. Gatsby would still break for undefined variables and so but at least I could now migrate components step by step which is hugely beneficial! Incremental changes FTW!

#### Migrating the Layout and index page

Layout and index had the most components in them. It was fitting to start by Layout in order to get the general look of the website up and running and then focus on the different bricks needed to get it together.

Material-ui provides in-library support for most of the components needed for a sidebar and a header (`SwipeableDrawer`, `AppBar`) whereas I had to tweak my own components. This got me into separating my Layout component into much smaller components which always feels good! Didn't feel any particular problem migrating those, the `Box` and `Layer` component are modular enough to let you create the aforementioned components. I admit there's some friction with the flexbox but if you already master that then it would be a breeze!

Same happened more or less with index. Only difference was that it was already cut into smaller components. During this step I recreated my `Card` component using the [patterns provided by grommet](https://codesandbox.io/u/grommetux/sandboxes).

One thing I should note, during this step of the migration I completely ignored styling, colors and the general feel of the website such as spacing issues and so on. I focused on getting something working and then polish the details in the end. And it turned out to work pretty good!

### Per component changes

For each component I first took a look at the different props provided by material-ui. Most often than not they didn’t match but there were some unexpected ones that did! For components using some of the more high-level ones provided by material-ui I was always looking first in the [patterns](https://codesandbox.io/u/grommetux/sandboxes). There are so many re-usable ideas in there.

When there was nothing alike i proceeded to create my own. This did not happen a lot and by looking at the code I’ve only created from scratch the sidebar, chips and tiles. On the other hand I wasn’t using all of the material-ui components so take this with a grain of salt!

Once again my moto was to ignore spacing, styling and coloring issues.

### Final touches

Up to this point the travel blog had the general look and feel only with lots of spacing issues, and with the wrong colors. It was time to create a theme, install my fonts and start moving away from the material design once and for all.

This step was probably the most enjoying to work as i was tweaking my theme values and playing around in order to get a design that looks and feels right for my taste.

## Aftermath

### Some statistics

- Waka time says I worked 16 hours for this migration. (I continued working on the blog for other matters so I am only counting the migration here)
- I started with 26 files and ended up with 28!
- Started with 2411 lines of code and ended up with 1769. I admit a large chunk of `material-ui` lines were for the imports.

### On CSS-in-JS

Wow does it feel different to work with `styled-components` instead of `JSS`. Cleaner, prettier, better! Such a pity `JSS` was the default in `material-ui`. Although this seems to be changing soon for the better.

Another thing to note here is that the `grommet` components rarely need, at least on my case, to be styled differently without using the props. While this is normal since `material-ui` follows the material guidelines it felt good to just being able to tweak some props of the grommet components and get them to the desired state.

### Migrations are fun

Well kind of, small ones with incremental changes and the ones that you don’t scratch your head every two seconds are! And this migration was of this kind.

Can’t imagine what it would be like to move a bigger codebase!

### Grommet is powerfull

Starting this migration my initial goal was to somehow convince myself that I could do it and without much pain. And it came true. I don’t feel I spent too many hours on this task and went with it without much pain.

Documentation is sometimes lacking and I sometimes had to look up the code to understand some of the things happening in the grommet components. Unfortunately I didn’t write these down and I don’t recall where I had to do in order to improve the documentation.

Patterns are a great idea and we need more of those! Please help with your ideas in the [slack channel](https://slackin.grommet.io/). I probably need to get my tiles and sidebar component into a pattern.

The code is available on [github](https://github.com/oorestisime/oasome). Here are two netlify instances, I will let you guess which is what:

[https://5c78424286ca610191f25cd7--keen-knuth-333770.netlify.com/](https://5c78424286ca610191f25cd7--keen-knuth-333770.netlify.com/)

[https://5c7839d9ecd03e019151b7a0--keen-knuth-333770.netlify.com/](https://5c7839d9ecd03e019151b7a0--keen-knuth-333770.netlify.com/)
