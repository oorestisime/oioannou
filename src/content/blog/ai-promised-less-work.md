---
title: "AI Promised Less Work. I Have Never Worked More."
path: /ai-promised-less-work/
date: 2026-10-23
tags: ["AI", "Agents", "Engineering", "Leadership"]
description: "Agents made implementation cheap, so I started doing far more of it in parallel. Six years of GitHub history show what that did: as VP of Technology I am back at my full-stack engineer pace, with bursts, burnout and a low season that is no longer low."
---

<!-- DRAFT: this post is not ready to publish. Resolve every "TODO (Orestis)" below and update the date before merging. -->

The pitch was that AI would give us our time back. Write less boilerplate, delegate the boring parts, go home earlier.

I am not complaining about the tools. I use agents for all of my engineering work now, and I wrote about [how that setup evolved](/blog/ai-engineering-setup-15-months-later/) and [why I still read the code](/blog/i-still-read-the-code/). I can investigate and ship things that would not have been worth starting two years ago.

But somewhere this year I noticed that I am working more than I ever have, and that it feels heavier than it used to. Not because any single task is harder. Because there are so many more of them, all at once.

This post is me trying to understand that, with some data from my own GitHub history.

## The old load and the new load

As a full-stack engineer, a normal week for me meant two or three serious tasks. A feature, a tricky bug, maybe a migration. Each one needed real focus, but I could hold one of them in my head at a time, finish it, and move to the next.

Today my week looks completely different. I have several agents running in parallel: one implementing a change, one investigating a production question, one working through a review, another doing research I will need later. None of them needs me all the time. Every one of them needs me *sometimes*.

That "sometimes" is the problem.

Each agent eventually stops with a question, a plan to approve, a diff to read or a result that looks slightly off. So I keep checking. Is that one stuck? Did this one go in the wrong direction twenty minutes ago? Did that one reintroduce something we agreed to remove? Every check is a context switch, and every context switch means reloading a different problem, a different repository and a different set of decisions.

Two or three serious tasks a week was tiring in a familiar way. Supervising many agents is tiring in a new way. It is less deep work and more constant, shallow vigilance, and I find it much more mentally draining.

> **TODO (Orestis):** a concrete example of a typical "many agents" day, e.g. how many sessions you had running, what they were doing, and the moment you realized you were just bouncing between them.

## What my GitHub history shows

I pulled my GitHub contribution calendar for every month from January 2020 to today and marked my roles at [Bold.org](https://bold.org/): Full Stack Engineer until August 2022, Principal Engineer until August 2025, and Vice President of Technology since then. These are GitHub's contribution counts, including private work, so they mix commits, pull requests, reviews and issues. It is a rough signal of activity, not a measure of value. But the shape is hard to ignore.

![Monthly GitHub contributions from January 2020 to October 2026, shaded by role at Bold.org. As a Full Stack Engineer, months mostly sit between 130 and 320, peaking at 319 in April 2020. As a Principal Engineer, they mostly sit between 55 and 200. As VP of Technology, 2025 stays around 50 to 150, then 2026 jumps to 277 in January, drops to 77 in June and peaks at 427 in August.](/img/ai-working-more/contributions-per-month.svg)

The first part of the curve is what I expected:

- **My busiest coding years were the early ones.** 2020 was my highest year, with 2,711 contributions. 2021 dropped to 1,839 and 2022 to 1,498.
- **The Principal Engineer years were flat and lower.** From August 2022 to July 2025 I averaged 114 contributions a month, against 173 as a Full Stack Engineer. My lowest year was 2023, with 1,189.
- **The first months as VP of Technology looked the same.** From August to December 2025 I averaged 111 a month, and December 2025 was my quietest month in the whole timeline, with 50.

> **TODO (Orestis):** one sentence on what took the place of coding as a Principal Engineer (design, mentoring, hiring, planning?). I did not want to guess.

Then 2026 happened:

- **I am back at my Full Stack Engineer pace.** By October 23 I am at 2,074 contributions, already more than any full year from 2021 to 2025. Over the same period in 2020 I had 2,352, so 2026 is close to my busiest year but not above it.
- **August 2026 is the busiest month in the timeline.** 427 contributions, against a previous high of 319 in April 2020.
- **My normal day moved back up.** The median weekday was 3 or 4 contributions every year from 2022 to 2025. In 2026 it is 7, close to the 8 I had in 2020.
- **Days off almost disappeared.** I had 40 to 46 weekdays with zero contributions per year from 2022 to 2025. So far in 2026 I have 18, fewer than any year since 2020 (31 in 2020, 25 in 2021).
- **Heavy days became routine again.** From 2022 to 2025 I had exactly one day per year with 24 or more contributions. In 2026 I already have 16, almost the 17 I had in all of 2020.

The twist is the role. In 2020 I was a full-stack engineer doing feature work full time, and this is roughly what that looked like on GitHub. Today I lead engineering at Bold.org and do far less feature work than I used to. On paper my graph should look like my Principal Engineer years, or lower. Instead it is back where it was when writing code was my whole job.

What changed is that I now do far more in parallel. Agents made implementation cheap, so the limiting factor stopped being how fast I could type and became how much I could keep track of. It turns out that limit is a lot higher than my energy.

## Bursts, then burnout

Looking at the monthly totals, 2026 is not one steady climb. It is a series of bursts.

**January** is the first explosion. This is when I started working seriously with agents, and when the observability experiment that became our internal company agent took off. Every week revealed something new I could suddenly delegate, and I wanted to try all of it.

**February to June** slowly winds down, from 233 contributions in February to 77 in June. There are still spikes, like a 29-contribution day in early April, but the general direction is a return to something more sustainable.

> **TODO (Orestis):** you remember April as a peak. In the monthly totals April (187) is lower than January to March, with a short spike around April 3. Confirm what happened in April (new model? new workflow?) and adjust this paragraph.

**August** is the biggest burst of all. Coming back from my summer break, the calendar shows a full week of zero contributions in early August. Then every weekday from August 10 to August 27 was between 14 and 43. August ended at 427 contributions, the busiest month since at least 2020. September stayed high at 301.

Every cycle starts the same way. A new model or a new workflow makes something possible that was not possible last month, and my head fills with ideas. Because implementation is now cheap, there is no natural friction stopping me from pursuing all of them at once. So I do. I start more agents, open more threads and say yes to more experiments.

That works for a few weeks. Then the checking, reviewing and context switching catch up with me, and I pull back to a more stable flow. I stay there until something exciting comes along, or until a holiday recharges me enough that I go straight back into another burst.

I count two or three of these cycles since January.

> **TODO (Orestis):** what does the burnout actually feel like for you at the end of a burst? (Tiredness, irritability, not wanting to open the laptop, dropping reviews?) One or two honest sentences here will make this section land.

## The low season is not low anymore

The part that surprised me most is not the peaks. It is the valleys.

My quietest month this year was June, with 77 contributions. That is as low as my quietest months as a Principal Engineer. But the median weekday across the whole year is still 7, compared with 3 or 4 in every year from 2022 to 2025. Even when I think I am taking it easy, there are still agents to check on, reviews to finish and small things that are now "just a quick prompt".

Before, a low season meant genuinely less work. Now it means fewer parallel threads, but rarely zero. And because the floor is higher, the next burst starts from an already tired place, so burnout comes faster.

## What I am trying

> **TODO (Orestis):** this section is the one I cannot write for you. Replace the prompts below with what you actually do, or delete the ones that do not apply. Keep it honest; it is fine to say you have not solved this.

- **TODO:** Do you cap how many agents or sessions you run at once? What number works?
- **TODO:** Do you batch the checking (e.g. specific times of day) instead of reacting to every agent that stops?
- **TODO:** How do you decide which ideas from a burst are worth pursuing now, and which go on a list?
- **TODO:** Are you protecting real days off, now that the calendar shows they almost disappeared?
- **TODO:** What do you tell your team at Bold.org about this, if anything? Do you see the same pattern in them?

## The main lesson

AI did reduce the effort of each individual task. It did not reduce the amount of work. It removed the friction that used to limit how much I took on, and that friction turned out to be doing a job I had not noticed.

> **TODO (Orestis):** one closing paragraph in your own words. What would you tell someone who just went through their first AI burst and is wondering why they feel more tired, not less?

> **A note on how this article was written:** AI helped me pull and analyze my GitHub contribution data, build the chart and draft this article. The experience, decisions and opinions are mine.
