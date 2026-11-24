---
title: "Grok Bot Drives My OpenCode. I Still Make the Decisions."
path: /grok-bot-drives-my-opencode/
date: 2026-11-24
tags: ["AI", "Agents", "OpenCode", "Grok Bot", "Engineering"]
description: "I still open OpenCode all the time. I just pilot it differently now: Grok Bot runs the work that can go end to end without me, and I drive anything that needs real back-and-forth thinking, all on one OpenCode setup on my own machine."
---

I still open [OpenCode](https://opencode.ai/) all the time. I just pilot it differently.

Some days I sit at my desk and drive a session myself. Other days I unblock an agent from my phone. And a growing share of the work never needs me in OpenCode at all, because [Grok Bot](https://x.ai/bot) is driving it for me. Grok Bot doesn't replace OpenCode. It sits in front of it and pilots it.

In August I wrote about [my AI engineering setup 15 months later](/blog/ai-engineering-setup-15-months-later/), where I was the one supervising every agent. In October I wrote that [AI promised less work and I have never worked more](/blog/ai-promised-less-work/):

> None of them needs me all the time. Every one of them needs me *sometimes*. That "sometimes" is the problem.

Most of what changed since then is an attempt to deal with that "sometimes". Not by doing less, unfortunately. By being much more deliberate about which work needs me and which doesn't.

## Two ways in: delegate or drive

My rule is simple. If I feel a task can run end to end without me, it goes to Grok Bot. If it needs back-and-forth implementation and thinking, I do it myself, directly in OpenCode.

Grok Bot wins the end-to-end work because it has more automations in place: routines, memory, connectors to Slack, Linear, GitHub and email, and other bots it can hand work to. It can take a ticket, get it built and reviewed, and come back only with a decision or a PR.

The work I keep is the work where I don't know the answer yet: exploring an unfamiliar problem, challenging an approach, changing my mind halfway through. A bot in the middle would just add a hop to my own thinking.

One thing surprises people: **Grok Bot doesn't code on its own.** The xAI model is not where I want it for coding in our codebases, and I would rather be honest about that than pretend. And if I used it for coding all the time, I would hit my usage limits way sooner. So it only pilots my OpenCode. It joins my [Tailscale](https://tailscale.com/) network and drives the same OpenCode server I use. The default coding model is currently [Opus 5.5](https://www.anthropic.com/news/claude-opus-5-5), but I also use OpenAI's [Astra](https://developers.openai.com/api/docs/models/gpt-6-astra) and other models, depending on the task.

So "delegate" does not mean a different engineering setup. It means a different driver for the same one.

## One OpenCode setup everywhere

![A flat illustration of a tower PC on a home desk acting as a glowing hub, with thin connection lines to a phone, a laptop and four small friendly bot icons inside a faint dotted network circle.](/img/grok-bot-drives-my-opencode/setup-hero.jpg)

I no longer use [herdr](https://herdr.dev/). I now have the OpenCode desktop app (goodbye terminal), and I can control it from Grok Bot, my computer, my laptop and my phone. A single interface, and a tool I am familiar with, for everything.

That is why herdr went. It is a good tool and it solved a real problem for me in August, but I wanted one platform for everything, not a jungle of apps where each one holds part of the picture. Because the bots use the same server, their sessions show up next to mine. I can open one of Grok Bot's sessions from my phone, read where it is stuck and unblock it myself.

[T3 Code](https://t3.codes/) is also a very good option here. But I am too deep into OpenCode to switch.

[Hunk](https://hunk.dev/) went for a different reason. I try to look at the code less now, at least during the build. I still read it at review, as I wrote in [I Don't Write Code Anymore. I Still Read It.](/blog/i-still-read-the-code/). Review happens before I get there (more below), and for feedback on a plan or a change I prefer [Plannotator](https://plannotator.ai/) anyway.

Here is the whole thing in one picture:

![Diagram of my setup. An always-on tower PC runs the OpenCode v2 server inside my Tailscale tailnet. The OpenCode desktop app, my laptop, the iPhone OpenCode app and Grok Bot all attach to it. Inside Grok Bot, the bots I talk to delegate to the bots behind them: a builder on Opus 5.5 and a reviewer on Astra. Grok Bot pilots OpenCode on the PC, which opens pull requests on GitHub, never pushing to main. I review and merge.](/img/grok-bot-drives-my-opencode/setup-diagram.png)

If you want something similar, these are the parts that matter:

- **Run OpenCode as a server on an always-on machine.** Everything else attaches to that one server: the desktop app, the phone, the laptop and the bots. Sessions, projects and history live in one place. I run OpenCode v2, which keeps the service running for me. How do you set it up? Ask your agent to do it.
- **Put it behind Tailscale and a password.** My server is only reachable over Tailscale, with a password on top.
- **Add the bot to the tailnet, not the server to the internet.** Grok Bot joins my tailnet through its Tailscale connector and talks to the server like any other client. Early on it went through a tunnel that needed the Grok Bot app open on my computer, and it kept dropping. The connector fixed that.
- **Use the same agents, skills and plugins for humans and bots.** The bots use my OpenCode agents, skills and plugins, including Plannotator. I don't maintain a separate "bot setup". When I improve something for myself, they get it too.
- **Make unattended sessions actually unattended.** A session waiting on a permission prompt at 3am is a session doing nothing. We had to fix a few things that never bothered me interactively: git over SSH failing in unattended sessions, Node missing from the agents' shell path, and permission rules loose enough not to stall but strict enough to stop pushes to the wrong branch.
- **Phone access.** I use the OpenCode iOS app, which has been in TestFlight testing. It should release soon, and it is awesome.

## Why I still don't get the cloud appeal

Everyone seems to be moving to cloud agents and sandboxes. I honestly still don't see the appeal for me.

I have an always-on tower PC that I can use from anywhere. It already has my repos, my whole OpenCode setup, my subscriptions and every session I have run. A cloud agent would be a weaker copy of that somewhere else, one more thing to keep in sync. If I need more capacity, I will probably just add my laptop as another machine running the same setup. A personal cloud of two, lol.

The one exception I can see coming is spinning up a PR somewhere to test it with browser use. That might not be local.

## Mornings for thinking, then I send it all off

I think I am moving into a waterfall flow, and I am weirdly fine with that.

Waterfall never made sense to me before. Long planning followed by long implementation meant the plan was out of date by the time anything was built. Now the planning is still long, and that is a good thing: it is what gets agents aligned with what I actually want. But the implementation is quick, so I find out fast whether the plan was right.

I spend my mornings preparing everything: designs and plans for my tickets, considerations, edge cases. Still no plan mode: it is the same discuss-first approach from August, just batched. Once a ticket or idea is groomed, it no longer needs me until it is ready for review. Bots only open PRs, never push to main, and every PR goes through a reviewer bot before I look (that gets its own post soon). Then I read the code, how closely depending on what it is.

PR reviews, draft reviews and decisions go into my Plannotator inbox, one thread per item. I can follow up at my own pace.

Mornings are when I focus best, so the part that needs a brain gets my best hours. Later in the day I can be distracted, because I know the work is happening in the background.

It also changed how I feel about bad results. If I get a PR that is completely not what I wanted, I just delete it and recreate it. It is cheap, and it usually teaches me what my plan was missing, so it happens less and less.

## Why the decisions stay with me

The biggest lever, I think, is that the human in the loop is there to decide. I never delegate the thinking process.

That was not true on day one. When the builder bot first came back with a plan, my work bot pointed me at the OpenCode session to answer its questions there:

> Okay here's first annoyance. i need to read opencode session. which means i need to answer there or here? also are you just a forwarder then?

The next attempt sent me only the decisions. That was not enough either: "you didnt send me everything that is waiting on me. i only see questions about decisions and not design implications etc."

What we landed on is a digest. The bot that asked for the work reads the full plan and gives me three things in the chat I am already in: what it builds, the design implications (migrations, backfills, load, edge cases, consistency, contracts) and the real decisions, each with its recommendation. Routine calls it makes itself. I answer in plain words. In the first real round I answered eight design points in one message, things like "backfill shouldn't be in the migration", without opening the session.

The digest fixed that problem between the bots and me. The Plannotator inbox brought it back when I am working in sync. Should I answer in the chat, the session or the inbox? I answer in the session, inbox comments come in at the same time, and the two places drift. That is still open.

Choosing what to stay in the loop for comes back to the same rule. Anything where the thinking is the work, I drive. Anything where the thinking is done and what's left is execution, I delegate, and I want the implications brought back to me, not just a yes-or-no question.

The same logic decides which bot hands work to the builder. My first instinct was to route everything through one bot. Then:

> isnt the whole point to talk to fewer bots though? ... every bot needs to know if they have an idea or need to code something then they should use [the builder bot].

The bot with the context briefs the builder. If my fitness bot has an app idea, it knows my training best, so it briefs the builder itself. I don't relay anything.

## So, am I less tired?

I ended my last post with "And I am tired."

I am a bit less tired. Not because there is less work; the bots made it even easier to start things. But the "sometimes" is more contained. Agents no longer need me at random moments. They need me in the morning, when I plan, and at review time, when I decide. In between, I get digests instead of sessions, and I unblock things from my phone instead of my desk.

The parts I still own are the parts I want to own: the thinking, the decisions and the merge button.

It still feels like the beginning, and still a little ridiculous when I stop to think about it.

> **A note on how this article was written:** my Grok Bot pulled together my earlier posts, my notes and the conversations behind these changes, and helped draft this article. The setup, decisions and opinions are mine.
