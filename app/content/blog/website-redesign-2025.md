---
title: "Website Redesign 2025: Back to Basics & New Beginnings"
path: /website-redesign-2025-back-to-basics-new-beginnings/
date: "2025-04-18"
tags: ["website", "redesign", "react", "AI", "gatsby"]
---

Yes I've refreshed my personal website yet again—this time prioritizing clarity, simplicity, and a renewed sense of purpose. While diving into a fresh tech stack is always enjoyable, the real excitement lies ahead: committing to a regular posting schedule.

Expect more frequent and focused content covering engineering from a startup perspective, thoughtful solutions to practical problems through smart tooling, and leveraging AI to accelerate workflows.

Working at [Bold.org](https://bold.org) involves navigating technical trade-offs—sometimes building for robustness and scale (supporting 7 million users!), other times optimizing purely for speed and quick validation. Experimentation is one of our core values.

## A Quick Note on Tech

A special shout-out to [shadcn](https://ui.shadcn.com/), [Bun](https://bun.sh/) — tools that truly just get out of your way and make building enjoyable.

Bun, has been a breath of fresh air. My next step is bringing this experience into Bold.org, transitioning from pnpm to Bun. I’m especially excited to leverage Bun’s efficiency in production, potentially cutting down CPU and RAM usage significantly.
Will be interesting to see how that behaves with our NextJS projects and mobile app!

shadcn has also been something awesome to use! Won't lie my role at Bold has shifted from full stack to more backend architecture and product architecture. I don't touch frontend code remotely as often as before. While our team had already embraced shadcn, I hadn't personally explored it deeply until now. Having consistent, beautiful components with great developer experience out-of-the-box is a game changer. It feels great never having to reinvent the wheel with basic components again—what more could I ask for?

## Leveraging AI

For this redesign, I barely wrote a line of code myself. Sure, it's a compact codebase, but here's a snapshot of my AI-powered workflow:

My ambitious first attempt—asking the AI to migrate the entire Gatsby site to React Router v7 in one shot—predictably fell apart. Fair enough, I was overly optimistic.

I then shortly asked it to start fresh but even that kind of fell apart. I learned why you should always give AI a good starting point. So I started fresh with a Vite + React Router scaffold. Next, I prompted the AI to rearrange content and implement page structures natively in React Router, including a visual refresh inspired by my recent work on [Terminal Brew](https://terminal-brew.vercel.app).

It nailed it in a single go. From there, iterative cycles were smooth: quick prompts to squash bugs like broken links and navigation glitches, paired with manual refinements for polish.

The result? An enjoyable, and highly productive "vibe-coding" experience—one of the best I've had.

## Introducing My Pomodoro App

In other news, I've been building something exciting: a Pomodoro-based productivity tool designed specifically for product teams. It integrates seamlessly with task managers like Linear and GitHub, while promoting healthy habits during your breaks.

Stay tuned for a dedicated announcement soon!
