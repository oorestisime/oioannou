---
title: "AI setup: May 2025"
path: /ai-setup-may-2025/
date: 2025-05-19
tags: ["Claude", "AI", "OpenAI"]
---

# AI Setup: May 2025

The AI landscape is shifting every week. New models, XYZ tool updates, MCP this, MCP that, yet more models—honestly, it’s overwhelming. Keeping track is already time-consuming; experimenting with it all? Good luck.

My strategy remains pragmatic. AI is clearly improving, and engineers integrating AI into their workflows can significantly boost productivity. We're not fully there yet, but each iteration brings us closer.

## My Thoughts on AI Editors

Editors like Cursor or Windsurf haven't clicked for me yet. Maybe I’m resistant to change, but I don't see why these editors will stick around longterm. Without their own unique model, they're just VS Code plus some features. If they're building their own models, that's different. Otherwise, VS Code will catch up eventually.

Constantly switching editors every few weeks because one is now slightly better than another is draining. My interest in chasing editor hype has died — I'd rather wait for the dust to settle.

So for now — 🛑

## Extracting Value from AI

Before diving into my workflow, it helps to clarify what I seek from AI:

- **A Rubber Duck:** I spend a lot of time on architecture decisions at [Bold.org](https://bold.org). Whether it's eliminating bottlenecks, evaluating third-party integrations, or optimizing resources, having an AI companion to reason, challenge, and learn from is inevitable today.

- **Coding Companion:** When building features, I prefer coding alongside AI rather than having it do everything in one shot. I don't mind iterating with it.

- **Bug Identification:** I'd love AI to sift through logs, Sentry reports, or Linear tickets to initially identify and propose fixes for bugs. Maybe it's a dream, but it's my ideal scenario.

## Claude Code Experience

Since editors haven’t won me over, Claude Code caught my attention. Staying within my IDE and delegating background tasks to Claude Code is appealing — it lets me remain focused without distraction.

I've been using Claude for a month with solid results. Codex, however, didn't survive even ten minutes of my attention. It failed miserably, while Claude handled similar tasks pretty good. Time is precious — I won’t waste it forcing something to work.

The only downside? Claude feels expensive. Using it fully could easily cost over $100 monthly — easy for Bold, but steep for personal projects.

## How I'm Using AI

Now, let’s get practical!

It’s important to distinguish my workflow at Bold.org. It's around 8k files,not massive, but certainly complex.

### Large Codebase

My dream for Bold.org remains one click bug fixes from Linear tickets. We aren’t there yet.

Even straightforward tasks like adding new backend services still underperform using AI at Bold. Dependencies, TypeScript issues, context confusion. Verdict for me is generated code typically needs extensive rewrites for it to be production ready.

However, GitHub Copilot helps a lot for simple, low context tasks like migrations or short method implementations. Writing comments to generate a few reliable lines is great. Certainly Copilot hasn't been hot recently but I am not sure it needs to.

The biggest productivity boost I've gotten is in documentation. We recently prioritized docs by kicking off an Obsidian project. Claude Code is magic here. I point it at concepts (auth, background jobs, validations) and it generates complete markdown documents. It made documentation meaningful, accessible, and manageable. Definitely recommend.

Taking this further, integrating Claude into PR workflows to auto-document changes has been successful and popular among our engineers, reducing friction considerably.

Lastly, for architectural decisions or research tasks, I built a small script, [linear-agent](https://github.com/oorestisime/linear-agent), pairing Claude with Linear. Claude gathers ticket context, proposes solutions, and I refine them using more advanced reasoning models like o3 and o4 and oh my god they need to fix namings. This setup ensures discussions are immediately relevant to our codebase.

### One-off Scripts

Another practical use: quick scripting. To improve team communication, we launched weekly “Show N Tell” meetings, presenting work from our weekly cycles. Initially unstructured, this quickly failed. Nobody has anything to present when not prompted to do so!

Claude scripted an integration between Linear, OpenAI, and Slack that automatically prioritizes tickets for demo voting. One off, non-production scripts - approved!

### Smaller Codebase & Greenfield Projects

I’m also developing a smaller side app (more on that later) with a monorepo containing backend, frontend, and shared packages.

One-shotting entire full-stack features is still impractical; AI often loses context, introduces unnecessary dependencies, or goes off track.

I've had way better success from limiting scope and giving precise direction, referencing existing code patterns explicitly. For example, AI struggled initially creating routers but succeeded once I provided a clear example. **Less decision making** from AI is crucial here.

My current flow:

- Write initial backend services/controllers.
- Iterate or improve with Claude.
- Ask for data fetching in frontend with existing pattern.
- Let it do and iterate on UI

Tailwind and ShadCN have significantly reduced my frontend coding time, and React Router’s loaders and fetchers cleanly separate from UI components, preventing Claude from introducing yet another patter or breaking existing implementations.

## Looking Ahead

Feels we are at the very beginning. Still yeah. Excited about future of Claude Code, especially now that there's competition. Still bearish about the viability of IDEs, but who knows what the future holds!
