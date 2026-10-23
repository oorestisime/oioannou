---
title: "AI Promised Less Work. I Have Never Worked More."
path: /ai-promised-less-work/
date: 2026-10-23
tags: ["AI", "Agents", "Engineering", "Leadership"]
description: "Agents made implementation cheap, so I started doing far more of it in parallel. My GitHub history shows what that did to my energy: bursts, burnout and a low season that is no longer low."
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

I looked at my GitHub contribution calendar for 2022, when I was a full-stack engineer, and compared it with 2025 and 2026. These are GitHub's contribution counts, including private work, so they mix commits, pull requests, reviews and issues. It is a rough signal of activity, not a measure of value. But the shape is hard to ignore.

![Monthly GitHub contributions for 2022, 2025 and 2026. 2022 and 2025 hover between roughly 50 and 170 per month. 2026 starts at 277 in January, declines to 77 in June, then jumps to 427 in August and 301 in September.](/img/ai-working-more/contributions-per-month.svg)

A few numbers stood out:

- **2022 and 2025 look almost the same.** From January to October 23, I had 1,175 contributions in 2022 and 1,187 in 2025.
- **2026 is a different curve.** By October 23 I am at 2,074. I passed my entire 2025 total on August 17 and my entire 2022 total four days later.
- **My normal day moved.** The median weekday was 4 contributions in every year from 2022 to 2025. In 2026 it is 7.
- **Days off almost disappeared.** I had 40 to 46 weekdays with zero contributions per year from 2022 to 2025. So far in 2026 I have 18.
- **Heavy days became routine.** From 2022 to 2025 I had exactly one day per year with 24 or more contributions. In 2026 I already have 16.

The twist is the role. In 2022 I was doing feature work full time. Today I lead engineering at [Bold.org](https://bold.org/), and I do far less feature work than I used to. On paper I should be producing *less* on GitHub, not almost twice as much.

What changed is that I now do far more in parallel. Agents made implementation cheap, so the limiting factor stopped being how fast I could type and became how much I could keep track of. It turns out that limit is a lot higher than my energy.

## Bursts, then burnout

Looking at the monthly totals, 2026 is not one steady climb. It is a series of bursts.

**January** is the first explosion. This is when I started working seriously with agents, and when the observability experiment that became our internal company agent took off. Every week revealed something new I could suddenly delegate, and I wanted to try all of it.

**February to June** slowly winds down, from 233 contributions in February to 77 in June. There are still spikes, like a 29-contribution day in early April, but the general direction is a return to something more sustainable.

> **TODO (Orestis):** you remember April as a peak. In the monthly totals April (187) is lower than January to March, with a short spike around April 3. Confirm what happened in April (new model? new workflow?) and adjust this paragraph.

**August** is the biggest burst of all. Coming back from my summer break, the calendar shows a full week of zero contributions in early August. Then every weekday from August 10 to August 27 was between 14 and 43. August ended at 427 contributions, the highest month I had in any year from 2022 to 2026. September stayed high at 301.

Every cycle starts the same way. A new model or a new workflow makes something possible that was not possible last month, and my head fills with ideas. Because implementation is now cheap, there is no natural friction stopping me from pursuing all of them at once. So I do. I start more agents, open more threads and say yes to more experiments.

That works for a few weeks. Then the checking, reviewing and context switching catch up with me, and I pull back to a more stable flow. I stay there until something exciting comes along, or until a holiday recharges me enough that I go straight back into another burst.

I count two or three of these cycles since January.

> **TODO (Orestis):** what does the burnout actually feel like for you at the end of a burst? (Tiredness, irritability, not wanting to open the laptop, dropping reviews?) One or two honest sentences here will make this section land.

## The low season is not low anymore

The part that surprised me most is not the peaks. It is the valleys.

My quietest month this year was June, with 77 contributions. That is lower than almost every month in 2022 and 2025. But the median weekday across the whole year is still 7, compared with 4 in every previous year I looked at. Even when I think I am taking it easy, there are still agents to check on, reviews to finish and small things that are now "just a quick prompt".

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
