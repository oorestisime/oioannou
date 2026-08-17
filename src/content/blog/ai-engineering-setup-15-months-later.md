---
title: "My AI Engineering Setup, 15 Months Later"
path: /ai-engineering-setup-15-months-later/
date: 2026-08-12
tags: ["AI", "Agents", "OpenCode", "Engineering"]
description: "How my engineering workflow moved from coding alongside one assistant to supervising parallel agents, and why company context became the real breakthrough."
---

I have not opened VS Code in months.

I had to laugh a bit when I realized this. When I wrote about [my AI setup in May 2025](/blog/ai-setup-may-2025/), I had been using Claude Code for roughly a month. I liked it, but it was still a coding companion. I wrote the initial implementation, gave it small tasks, and expected to rewrite a fair amount of the result.

Fifteen months later, all my engineering work flows through agents.

To be clear, I still read code. I make architectural decisions, challenge implementations, investigate failures, and own what ships. I just no longer spend much of the day typing code in an editor. I spend it understanding problems, finding the right context, delegating work, reviewing decisions, and checking the result.

Models obviously got much better during those fifteen months. My workflow changed just as much. The model is now one part of a setup that also includes tools, permissions, persistent environments, company context, code review, and a lot of verification.

So, time for an update: what I got right, what I got completely wrong, and what I use today.

## What I believed in May 2025

Reading the old post again was fun. Some opinions held up pretty well. Others aged badly and much faster than I expected.

I was skeptical about AI-first editors. I did not want to move between Cursor, Windsurf, and whatever launched that week because one was temporarily better. That instinct was mostly right for me, although not quite for the reason I expected. VS Code did not catch up and become the center of the workflow. The terminal took over instead.

I also understood that context mattered. I was already connecting Linear tickets to codebase research and wanted AI to help with architecture rather than only complete individual functions. The direction was right, but my definition of context was way too narrow. The repository is only one part of most engineering problems. Useful context also lives in production data, tickets, documentation, previous decisions, user activity, and company conversations.

My largest mistake was how I framed the relationship between engineer and AI:

> When building features, I prefer coding alongside AI rather than having it do everything in one shot.

That was completely accurate at the time. It barely resembles how I work now.

I also wrote that generated code needed extensive rewrites before it was production ready. One-shot full-stack features felt impractical, and I even bolded **less decision making** as the important lesson. Reasonable advice for May 2025, but definitely not advice I would repeat today.

Back then, documentation was my clearest productivity win. That one aged quickly too. Documentation is still useful, but agents now help with production investigation, implementation, code review, product research, support, and operational workflows.

The assumption I am happiest to have outgrown was this one:

> My dream for Bold.org remains one click bug fixes from Linear tickets. We aren't there yet.

We are not living in a magical one-click world, and honestly I would not want that anyway. There should still be judgment between a reported problem and a production change. But the time from a problem being reported to having a tested implementation ready for review has fallen dramatically.

## The capability threshold changed

Agents did not suddenly become infallible. They still misunderstand requirements, choose poor abstractions, miss edge cases, and explain wrong conclusions with impressive confidence.

What changed for me is the size of the task I can hand over. An agent can investigate an unfamiliar part of the codebase, retrieve context, discuss an approach, implement across several files, run the checks, and fix failures it finds along the way. That whole loop used to require me sitting beside it.

My prompts gradually moved from "help me write this function" to "understand this problem, make the change, verify it, and explain the result."

This sounds like a small wording change, but it made parallel work practical. Earlier agents needed constant attention. I could send something to the background, but I would keep checking whether it had gone off track. Now I can hand over several well-defined tasks and return when an agent needs a decision or has a diff ready to review.

There is still plenty of engineering work. I just spend much more of that time making decisions and much less of it typing the implementation.

## The internal agent started as an observability project

During December 2025 and January 2026, I started working much more seriously with agents. I wanted to understand what I could delegate, where they failed, and what made them more reliable in real work rather than demos.

The most important change actually started somewhere else: observability. I was improving how we debugged our backend and introduced wide events, structured events carrying enough context to understand what happened during a request or job. We stored them in ClickHouse, so engineers could investigate production issues with SQL instead of piecing together scattered log lines.

This was built for humans. Then the obvious question came up: if engineers can investigate the system with SQL, why not let an agent do it too?

At the end of January, I gave an agent controlled access to query that data and tried it on real production questions. It worked well enough that I kept connecting more sources and tools. A better interface to backend events gradually turned into an internal company agent.

By mid-February, I was amazed by both its capabilities and its adoption.

What started as an experiment became something people across the company use every day. It is available through web, Slack, and Linear, and we are now working toward bringing the same context and tools into local coding-agent workflows.

The breadth of use surprised me most:

- Support and operations use it to investigate questions involving users and donors
- Engineers use it to debug production problems and understand how systems behave
- Product managers use it to understand flows and user activity, and reason about ideas with real company context
- Teams create watches and automations around specific alerts or messages
- People use it as an entry point into systems that previously required several tools or help from another teammate

Putting a chatbot in Slack is easy. Giving it useful context, safe access, and tools that let it actually help is the hard part.

A model can know a lot about TypeScript, databases, support workflows, or product management. It knows nothing about why your team made a decision, how your permissions work, which dashboard is authoritative, or what happened to a user yesterday. You need to build a way for it to find out.

## It turns out this is becoming a pattern

For a while, I was not sure whether our internal agent was an unusual path caused by our own systems. By mid-2026, enough companies had shared similar work that the pattern became hard to miss.

[Spotify's Honk](https://engineering.atspotify.com/2025/11/spotifys-background-coding-agent-part-1) runs background coding work through Slack and GitHub and connects to Spotify's internal developer platform. [Tiger Data's Eon](https://www.tigerdata.com/blog/we-built-production-agent-open-sourced-everything-we-learned) connects Slack, GitHub, Linear, and company documentation. [Stripe's Minions](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents) start from Slack or internal systems, work inside Stripe development environments, and produce tested pull requests.

Vercel went even broader, with more than a hundred internal agents and a Slack agent named V that routes questions to the right one. To avoid the confusing naming: V is the internal routing agent, not v0 and not the framework itself. Vercel published the common infrastructure behind these agents as [eve](https://vercel.com/blog/introducing-eve), an open-source framework for persistent runs, sandboxes, approvals, channels, and evals.

Then the commercial products started moving in the same direction. [Cloudflare OS](https://blog.cloudflare.com/cloudflare-os/) offers company workspaces with shared context, skills, connected systems, and governed access. [ChatGPT Work](https://openai.com/chatgpt-work/) and [workspace agents](https://openai.com/index/introducing-workspace-agents-in-chatgpt/) bring company context and shared agents into ChatGPT and Slack. [Claude Cowork](https://www.anthropic.com/product/claude-cowork) takes a similar agent workflow into research, documents, spreadsheets, and other non-coding work.

These are clearly not identical products. Some were built for one company's own infrastructure, while others need to work for many companies. What caught my attention is that they all ended up needing context, tools, permissions, persistent work, approvals, and review. Apparently putting a chat box around a model was not enough for anyone else either.

## My current setup

Now the practical part: what I actually use.

Tools change quickly, so this section will age. My current setup has four main pieces: the coding agent, a place to keep parallel sessions running, code review, and structured feedback.

### OpenCode

I moved away from Claude Code and now do my engineering work in [OpenCode](https://opencode.ai/).

This is not me declaring Claude Code bad. Claude Code was the tool that convinced me the workflow could work in the first place. OpenCode simply fits me better today.

It is open source, has a terminal interface I prefer, lets me switch models and providers, works with subscriptions I already own, and gives me more control over the environment. I do not want my entire engineering workflow tied permanently to one model vendor. Models move too quickly for that.

The open-source part is also very practical. I can inspect how it works, configure it properly, and change the workflow when something does not fit instead of waiting and hoping it appears on a roadmap.

### herdr

[herdr](https://herdr.dev/) is the runtime and terminal workspace where I manage persistent agent sessions.

A normal day now spans four or five projects. Several agents may be investigating, implementing, testing, or waiting for input at the same time. herdr keeps those sessions running, shows which ones are working or blocked, and lets me jump back into the right context.

I tried managing this with normal terminal tabs. It gets messy very quickly. Parallel agents are only useful if I can tell what is running, what needs me, and which project each session belongs to.

### Hunk

I spend much more time in diffs now, so I wanted a tool focused on reviewing them.

[Hunk](https://hunk.dev/) is a terminal diff viewer built for human- and agent-authored changes. I use it to read the whole changeset, move across files and hunks, and understand what changed without opening a full editor.

Code review has become more important in my day, not less.

### Plannotator

Terminal chat is terrible for giving feedback on a long document. I use [Plannotator](https://plannotator.ai/) for plans, specifications, long-form output, drafts, and code review.

Instead of explaining "the third paragraph under the second heading," I annotate the exact part that needs to change and send that feedback back to the agent. It sounds like a small improvement, but it removes a surprising amount of friction.

## Why I rarely use plan mode now

I used to rely heavily on plan mode. It created a useful checkpoint before an agent changed code. These days I almost never use it for ordinary engineering work.

I usually discuss the problem with the agent first. We inspect the relevant code, pull in missing context, clear up ambiguity, and challenge the approach. Once the direction feels right, I ask it to execute.

This is still planning, just without generating a formal document too early. Long plans were useful when agents struggled to explore or recover from mistakes. Now they often become stale halfway through the implementation.

I still use a formal plan for risky changes, work involving several teams, or a specification that people need to review and share. It is simply no longer my default. Most of the time we discuss the problem, retrieve what is missing, settle the important decisions, and then the agent implements while I wait for something concrete to review.

## Parallel work made experimentation much cheaper

The focused engineering time required to turn an idea into something testable has fallen dramatically. Of course models and infrastructure still cost money, and reviewing bad work still costs time. But trying something is much cheaper than it was.

I can explore two approaches in parallel, review both, and throw one away. I can prototype a product idea before deciding whether it deserves a week of engineering time. I can let an agent investigate a neglected problem while I continue with higher-priority work. For a migration, I can look at a real diff instead of debating the whole thing in the abstract.

This has changed which ideas are worth trying. Plenty of ideas never received a fair test because implementation was too expensive relative to the uncertainty. It is now much easier to learn by building something small.

I see this clearly in my independent work. Building [clssrm](https://clssrm.app/), an operations product for class-based studios, means jumping between customer discovery, scheduling, billing, onboarding, SEO, analytics, and launch. Agents make it much easier to return to each area and keep the product moving while I handle other projects.

This is probably the biggest productivity jump I have experienced as an engineer. The difficult part is making sure speed does not quietly turn into lower quality.

## Quality did not become automatic

More output is not better engineering. An agent can produce a huge amount of plausible code, and without proper review that just creates problems faster.

My current checklist is not particularly exciting, but it works:

- spend enough time understanding the actual problem
- provide relevant context instead of one enormous generic prompt
- point the agent toward existing code patterns and project instructions
- run type checks, tests, builds, and other automated checks
- isolate parallel work so sessions do not interfere with each other
- read the complete diff
- give precise feedback and ask for another pass
- keep product and architectural decisions with the person who owns the result

The first implementation is often not the one I keep, and that is fine. I can compare options and ask for revisions without losing another two days. I now spend less time typing and more time deciding whether the work is actually good. That is a trade I am very happy with.

## What still fails

The failures are less about syntax than they were fifteen months ago.

Most failures still begin with a poorly framed task or weak tests. If I split the work badly, parallel agents duplicate effort or make incompatible assumptions. If the tests are weak, incorrect work can look complete. No surprises there.

They are also extremely good at sounding finished. I never treat "done" in an agent response as proof that the task is actually done. The checks need to pass, the diff needs to make sense, and somebody still has to own the result.

Company-wide agents make permissions much more serious. Every connected tool makes the agent more useful, but also gives us another place where access, privacy, or a destructive action can go wrong. There is no shortcut around building those controls properly.

## Where I landed

If I rewrote the assumptions from my May 2025 post today, I would keep it to three:

- The model is only the beginning. Context, tools, permissions, and verification are what turn it into something useful.
- Parallel agents make many more ideas cheap enough to try, but faster implementation puts even more pressure on good review.
- I can delegate all of the implementation without delegating responsibility for what ships.

I ended the original article with: "Feels we are at the very beginning. Still yeah."

That might be the sentence that aged best.

Fifteen months ago, I was looking for a better coding companion. Now a normal day involves several agents working across engineering, product, support, operations, and my own projects. I still find that transition a little ridiculous when I stop to think about it.

And yes, it still feels like the beginning.
