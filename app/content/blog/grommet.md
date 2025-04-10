---
path: /joining-grommet
title: "Recent open source fun and joining the grommet team"
date: 2019-02-19
tags: ["Grommet", "Gatsby", "Open source", "pair sessions"]
photo: /img/me.png
---

> This was initially posted at [medium](https://medium.com/grommet-io/recent-open-source-fun-and-joining-the-grommet-team-341f6592d36c)

For the last few months I got myself again into Open source. It has been a while since my last contributions, dating back to a few months after my Google Summer of Code.

Reasons were that I got my first job and it was hard to balance out life, work
and leisure. As it turned out reading books and contributing to open source was
somehow forgotten in my long TODO list.

## Breaking the barrier

Things changed when I finally got some free time to look at interesting projects.
Starting first with Gatsby and then with Grommet it was for me a roll of some exciting months piling up PRs and releasing along the way some NPM packages and a theme builder

Contributing to open source is often easier said than done. There is, in my opinion, a huge barrier between wanting to contribute and actually having the courage to propose changes. I am really glad this entry barrier is well reduced in both of these projects! They have responsive and inclusive communities that do the best they can to remove that barrier.

For me, especially for Grommet, it all clicked as soon as I started talking with the core team members and discussing features and changes before actually jumping in the code. It really helped making me feel at ease and I got insightful feedback on how to start working on those issues. After a few commits I was able to work on my own much faster and propose many PRs.

If you are searching for good first issues and you are not entirely sure on how to tackle them I am glad to offer the same kind of help I got. Join the Slack project and ping me. I'll be glad to talk to you!

## Joining the Grommet team

After several contributions, the team proposed me to join them in development for a tidy react framework that provides accessibility, modularity, responsiveness, and theming seamlessly.

I was overly excited to join them and I am looking forward building exciting new things with them. My current focus and goals on Grommet are to:

improve the DataTable and Table components to facilate interaction and accessibility
add visual regression tests using Cypress
add snapshot tests for the storybook
improving the gromme-theme-builder with insights about color contrast and other accessibility notes. I am aiming for the builder to be an interesting tool for people wanting to create and explore themes

Future plans also include some hyped areas such as converting some components to react-hooks to start and then use them to replace the Theming Context for improved
performance. Also got myself slowly into typescript and grommet could use some improved support!

## Combining Grommet and Gatsby

As you have probably understood I am completely sold on the recent developments of the JAM stack and the general Gatsby features. Grommet is my personal go to framework for a UI library and Gatsby my go to framework for building apps.

The only thing needed to make both work great together is adding gatsby-plugin-styled-components in your Gatsby config!

If you are looking into combining the Link component from gatsby and the Anchor from grommet then a good solution would be to wrap the Link component into a styled-component to remove some of the default styling it has as the following:

```jsx
const InternalLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  :visited {
    color: inherit;
  }
`
```

and then simply use:

```jsx
<InternalLink to={path}>
  <Anchor as="span" label="My beautiful link" />
</InternalLink>
```

This way you get all the magic from gatsby and all the styling from grommet!

I believe there can be lots of exciting projects combining both of those, such as
gatsby themes using Grommet for anything ranging from personal websites / portfolios to business websites and applications.

## Grommet pairing sessions

A step closer to eliminating the barrier of open source contributions is
pairing sessions. I've had a couple with Gatsby folks that were really great to help me get things working fast and I would like to propose myself for pairing sessions for Grommet! One step closer to bridging the gap and one step closer to improving a great library.

If you are looking to work on an issue or you are facing a problem in your application I would gladly work with you on that for 30-60 minutes on a pairing
session. To schedule a pairing session ping me on Slack and let’s discuss the issue and find a schedule that works for both of us!

I might not be always able to answer your questions but by working together I hope to unblock you and create a better bridge of communication between you and the grommet code!

Let's get rolling!
