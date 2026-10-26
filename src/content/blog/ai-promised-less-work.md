---
title: "AI Promised Less Work. I Have Never Worked More."
path: /ai-promised-less-work/
date: 2026-10-27
tags: ["AI", "Agents", "Engineering", "Leadership"]
description: "Agents made implementation cheap, so I started doing far more of it in parallel. My GitHub history since 2019 shows what that did: as VP of Technology I am back at my full-stack engineer pace, with bursts, burnout and a low season that is no longer low."
---

The pitch was that AI would give us our time back. Write less boilerplate, delegate the boring parts, go home earlier.

I am not complaining about the tools. I use agents for all of my engineering work now, and I wrote about [how that setup evolved](/blog/ai-engineering-setup-15-months-later/) and [why I still read the code](/blog/i-still-read-the-code/). I can investigate and ship things that would not have been worth starting two years ago.

But somewhere this year I noticed that I am working more than I ever have, and that it feels heavier than it used to. Not because any single task is harder. Because there are so many more of them, all at once.

This post is me trying to understand that, with some data from my own GitHub history.

## The old load and the new load

As a full-stack engineer, a normal week for me meant two or three serious tasks. A feature, a tricky bug, maybe a migration. Each one needed real focus, but I could hold one of them in my head at a time, finish it, and move to the next.

Today my week looks completely different. I have several agents running in parallel: one implementing a change, one investigating a production question, one working through a review, another doing research I will need later. None of them needs me all the time. Every one of them needs me *sometimes*.

That "sometimes" is the problem.

Each agent eventually comes back with a question, a plan to approve, a diff to read or a result to make sense of. Responding means switching contexts: reloading a different problem, a different repository and a different set of decisions.

Two or three serious tasks a week was tiring in a familiar way. Working with many agents is tiring in a new way. My attention is spread across more problems, and I find moving between them much more mentally draining.

## What my GitHub history shows

I pulled my GitHub contribution calendar for every month from January 2019 to today and marked my roles at [Bold.org](https://bold.org/), which I joined in January 2020: Full Stack Engineer until August 2022, Principal Engineer until August 2025, and Vice President of Technology since then. These are GitHub's contribution counts, including private work, so they mix commits, pull requests, reviews and issues. It is a rough signal of activity, not a measure of value. 2019 is an incomplete baseline: my job before Bold.org used a self-hosted GitLab, so GitHub only shows what I did outside it. But the shape is hard to ignore.

![Monthly GitHub contributions from January 2019 to October 2026, shaded by role, with a second dashed line for public contributions only. 2019, before Bold.org, is incomplete because that job used a self-hosted GitLab. As a Full Stack Engineer, months mostly sit between 130 and 320, peaking at 319 in April 2020. As a Principal Engineer, they mostly sit between 55 and 200. As VP of Technology, 2025 stays around 50 to 150, then 2026 jumps to 277 in January, drops to 77 in June and peaks at 427 in August. Public contributions stay near zero from 2021 to 2025 and reach 68 in April 2026.](/img/ai-working-more/contributions-per-month.svg)

The first part of the curve is what I expected:

- **My busiest coding years at Bold.org were the early ones.** 2020 was my highest year, with 2,711 contributions. 2021 dropped to 1,839 and 2022 to 1,498.
- **The Principal Engineer years were flat and lower.** From August 2022 to July 2025 I averaged 114 contributions a month, against 173 as a Full Stack Engineer. My lowest year was 2023, with 1,189.
- **The first months as VP of Technology looked the same.** From August to December 2025 I averaged 111 a month, and December 2025 was my quietest month since joining Bold.org, with 50.

As a Principal Engineer, more of my work went into architecture, deep dives into concepts, setting up projects and planning, rather than fixing bugs or iterating on features. Becoming VP of Technology continued that shift, with even less feature work expected. At least until AI came along.

Then 2026 happened:

- **I am back at my Full Stack Engineer pace.** By October 23 I am at 2,074 contributions, already more than any full year from 2021 to 2025. Over the same period in 2020 I had 2,352, so 2026 is close to my busiest year but not above it.
- **August 2026 is the busiest month in the whole timeline.** 427 contributions, against a previous high of 319 in April 2020.
- **My normal day moved back up.** The median weekday was 3 or 4 contributions every year from 2022 to 2025. In 2026 it is 7, close to the 8 I had in 2020.
- **Fewer weekdays without GitHub activity.** Through October 23, I had 18 weekdays with zero contributions, compared with 40–46 across each full year from 2022 to 2025. These are days without recorded GitHub activity, not days off work.
- **Heavy days became routine again.** From 2022 to 2025 I had exactly one day per year with 24 or more contributions. In 2026 I already have 16, almost the 17 I had in all of 2020.

Almost all of this is private work. The dashed line in the chart is public contributions only: it was near zero from 2021 to 2025 and came back this year, with 191 so far, but that is still less than a tenth of 2026.

The twist is the role. In 2020 I was a full-stack engineer doing feature work full time, and this is roughly what that looked like on GitHub. Today I lead engineering at Bold.org and do far less feature work than I used to. On paper my graph should look like my Principal Engineer years, or lower. Instead it is back where it was when writing code was my whole job.

What changed is how much work feels worth taking on. When coding is cheap, I can fix bugs I would previously have left alone, improve patterns across the codebase, take on new projects and turn more ideas into something real. Much of this is work I would never have considered before. Agents did not just make my existing workload faster to finish. They made it easy to give myself a much bigger one.

## Bursts, then burnout

Looking at the monthly totals, 2026 is not one steady climb. It is a series of bursts.

**January** is the first clear burst. This is when I started working seriously with agents, and when the observability experiment that became [our internal company agent](/blog/internal-company-agent-lessons/) took off. Every week revealed something new I could suddenly delegate, and I wanted to try all of it.

**February to June** generally winds down, from 233 contributions in February to 77 in June. But **April** stands out in my memory as another month when I had ideas and acted on them. I think improvements in the models were part of that renewed energy. Its monthly total of 187 is below January to March, but it includes a 29-contribution day and 68 public contributions, my highest public total of the year.

**August** is the biggest burst of all. Coming back from my summer break, the calendar shows a full week of zero contributions in early August. Then every weekday from August 10 to August 27 was between 14 and 43. August ended at 427 contributions, the busiest month in the whole timeline. September stayed high at 301.

Every cycle starts the same way. A new model or a new workflow makes something possible that was not possible last month, and my head fills with ideas. Because implementation is now cheap, there is no natural friction stopping me from pursuing all of them at once. So I do. I start more agents, open more threads and say yes to more experiments.

That works for a few weeks. Then the reviewing and context switching catch up with me, and I pull back to a more stable flow. I stay there until something exciting comes along, or until a holiday recharges me enough that I go straight back into another burst.

I count two or three of these cycles since January.

At the end of a burst, I feel tired of AI. I do not want to start another agent or think of more ideas. I do my normal work, but I stop chasing the extra projects and possibilities because I do not have the mental bandwidth for them.

## The low season is not low anymore

The part that surprised me most is not the peaks. It is how much I am doing between them.

March and April did not feel like the bursts in January or August, but I was still doing substantial work. April had 187 contributions, against my Principal Engineer average of 114 a month. I had ideas and acted on them, but that level of activity no longer felt like an exceptional push. Even when I think I am taking it easy, there are still agent results to work through, reviews to finish and small things that are now "just a quick prompt".

June was genuinely low, with 77 contributions, comparable to my quieter Principal Engineer months. Maybe that was when all the tiredness caught up with me. Not every quiet month is higher than before. But outside the bursts, I still find myself taking on more work than I used to. That is what I mean by the low season not feeling low anymore.

## Where that leaves me

AI made room for work I would never have considered before. I like being able to fix more things and turn more ideas into something real. But the capacity to implement those ideas has grown much faster than my capacity to think about them. Eventually I stop wanting to start another agent and go back to just doing my normal work. I have not figured out a balance. For now, I am noticing that being able to do more keeps turning into doing more—and I am tired.

> **A note on how this article was written:** AI helped me pull and analyze my GitHub contribution data, build the chart and draft this article. The experience, decisions and opinions are mine.
