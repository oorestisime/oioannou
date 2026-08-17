---
title: "Building an Internal Company Agent: 5 Things We Got Right and 5 I Would Do Differently"
path: /internal-company-agent-lessons/
date: 2026-08-17
tags: ["AI", "Agents", "Engineering", "Product"]
description: "A practical retrospective on building and rolling out an internal company agent at Bold.org, from connectors and usage analytics to adoption, contributions and overbuilt evals."
---

In [my recent AI engineering setup article](/blog/ai-engineering-setup-15-months-later/), I briefly explained how an observability project at [Bold.org](https://bold.org/) turned into an internal company agent.

The short version is that back in January 2026, Bold.org had structured backend events in ClickHouse, engineers could investigate them with SQL, and I wanted to see whether an agent could do the same. It worked, so I kept connecting more company systems. Within weeks, people across Bold.org were using it. It eventually became useful across engineering, product, support, operations, marketing, and growth.

That summary makes the path sound much cleaner than it was.

Several decisions helped the agent spread quickly. I also spent time solving problems I did not really have, left some important problems too late, and assumed things were obvious when they definitely were not.

This is not a universal guide to building agents. It is a practical retrospective from building one inside a real company: five things we got right and five I would approach differently today.

## What this looked like in practice

The first workflow was straightforward: I gave the agent **read-only access** to structured backend events in ClickHouse so it could investigate production questions. I then connected more of the systems where people already worked, including Slack, Linear, PostHog, and Grafana.

The practical effect is bigger than a faster way to write SQL. Support can investigate many customer reports **autonomously**, without waiting for engineering or another team to provide context. For the workflows we target, investigations that previously took multiple hours and required finding the right access through three or four people can usually be completed in **zero to one hour**. The agent also automates parts of dashboard setup and analysis in PostHog and Grafana without requiring engineering to step in.

The system consumes **billions of tokens per month**. That makes usage analytics and cost awareness important, but it is also a useful signal that the tool is part of how people work rather than a demo that is occasionally opened.

I made one security boundary deliberately simple. The agent is gated behind Google sign-in for our company domain, and all of its remote access is read-only. Rather than relying on the model to be smart about when a change is safe, I did not give it permissions to write to remote systems in the first place.

## What worked

### 1. Make usage visible early

By "visible," I mean visible inside the company.

It is tempting to build an internal tool privately, make it feel complete, write an announcement, and then ask everyone to use it. We did almost the opposite. The agent was used in shared Slack channels and connected to Linear, where people were already working and could see what it did.

This mattered more than any launch document.

Most people do not immediately know what an agent can do. A blank chat box does not explain its capabilities. Even a good list of examples still requires someone to translate those examples into their own work.

Seeing real usage solves that problem. Someone asks a question in Slack, the agent investigates it, and ten other people see both the result and the way the question was asked. A product manager notices that it can inspect a user flow. Somebody in support realizes it can help investigate a report. An engineer sees it gather context they were about to collect manually.

Each visible interaction becomes a small product demo based on an actual company problem.

Slack and Linear were important for another reason: they did not require people to adopt a new destination. Another internal web application would have asked everyone to remember that the tool existed, open it, and decide when to use it. In Slack and Linear, the agent appears where the question or task already exists.

The web interface is still useful, especially for private or longer work. But shared usage is what taught the company what was possible.

### 2. Connect the tools the company already uses

When I started this in January, MCP was still emerging and many of the systems we needed did not have useful servers. I closed the gap with small CLI tools, mostly thin wrappers around OpenAPI endpoints or existing SDKs, exposing only the operations needed for our workflows. They were intentionally boring: structured results, narrow permissions, proper error handling, and credentials kept away from the model.

The value was not just another action the agent could take. More access meant **more company context**: production data, tickets, analytics, dashboards, and operational information could be considered together. That gave the agent better evidence for its reasoning and made its answers more useful than anything it could infer from a single system.

### 3. Track how people actually use it

Usage analytics went in early. *Not to create a leaderboard* or measure who was "doing AI" correctly, but to understand what had been built.

Tool calls, token spend, recurring workflows, and broad usage patterns showed which tools were valuable, where requests were becoming expensive, and what capabilities people kept trying to use. That made it possible to improve the product based on behavior rather than guesses: unexpected usage suggested a workflow needed simplifying, while unused tools pointed to poor discoverability, descriptions, or limited value. Aggregate operational metrics were more useful than ranking individuals and kept the analytics focused on improving the tool rather than monitoring employees.

### 4. Close the feedback loop

People will try things you did not anticipate. They will also hit confusing behavior that feels obvious to the person who built the system.

Feedback was easy to share, and the agent was adjusted as people used it. This sounds basic, but it created a useful loop: somebody tried a workflow, reported where it failed, and could often try the improved version shortly afterwards.

That responsiveness encouraged more experimentation. People are much more willing to explore a new tool when they know a failure is not the end of the conversation.

Some basic documentation also helped. It did not need to explain every tool or become a complete AI training course. A short explanation of what the agent could access, examples of good requests, known limitations, and how to share feedback gave people enough confidence to start.

The combination matters. Documentation without feedback becomes stale. Feedback without documentation means answering the same introductory questions forever.

### 5. Design for the whole company

The agent started from an engineering and observability problem, so keeping it focused on engineers would have been the obvious path. That would have been a mistake.

Some of the most interesting usage came from product, support, operations, marketing, and growth. These teams often need information spread across several systems but do not have a convenient way to query or combine it. An agent with the right company context can remove a lot of that navigation. Support can be especially powerful here: people can investigate many reports themselves instead of waiting for engineering to gather the context.

Engineers can actually be harder to convince.

They already have coding agents, terminal workflows, preferred models, custom instructions, and strong opinions about harnesses. Asking them to move into a shared company interface can feel like asking them to give up a setup they spent months refining. I understand the resistance because I have the same opinions about my own tools.

Other departments may have fewer existing agent workflows to replace. Once they see a relevant example and trust the access model, the value can be more immediate.

Treating the agent as company infrastructure rather than an engineering experiment changed both its adoption and the features that mattered most.

## Five things I would do differently

### 1. Design local access earlier

The biggest missing piece is making company tools available safely from local agent harnesses.

The shared web, Slack, and Linear interfaces are useful, but local agents have context that a company agent does not. They can work with a person's files, notes, project memory, terminal, and current repository. Engineers in particular do not want to abandon that context every time they need company information.

The ideal setup is not forcing everyone into one harness. It is allowing approved local harnesses to use company tools without exposing credentials or bypassing permissions.

That is a much harder problem than adding another interface. Authentication needs to represent the person making the request. Secrets cannot be handed to the local model. Tool access should remain scoped and auditable. A compromised or badly configured local environment should not gain broad company access.

### 2. Spend less time chasing the perfect architecture

Agent tooling changes constantly. Frameworks appear, models improve, MCP conventions evolve, and every week there is a new opinion about what AI should be, how it should be built, and which patterns or use cases are right or wrong.

It is very easy to keep redesigning the system around what everyone is discussing online.

I spent too much time considering whether I should rebuild parts of the agent around the latest approach. Most of that thinking had a short expiry date: a tool or pattern that looked essential one month could be irrelevant a few months later. Today I would pick one simple architecture that supports the immediate use case and move forward. Keep connectors small, keep boundaries clear, avoid coupling everything to one model or framework, and replace pieces only when there is a real reason rather than because a new diagram is popular on social media.

Internal tools have an advantage here: they do not need to become a generic platform for every possible customer. They need to solve the company's actual problems.

### 3. Make contribution paths obvious

The agent improved quickly, but too much of that improvement depended on a small number of people.

It was not obvious who could write a skill, add a connector, improve instructions, or contribute code. Even when the repository was available, people were understandably hesitant. Agent systems combine code, prompts, permissions, and unfamiliar conventions. Nobody wants to break a tool used across the company or accidentally expose something sensitive.

I have not solved this yet. People are welcome to use the agent, but it is **not obvious how to contribute safely**. The repository is available, but writing a skill, adding a connector, or changing instructions requires understanding code, prompts, permissions, and unfamiliar conventions.

A short contribution guide with examples, ownership, review requirements, and a safe test path would make this easier. Until then, too much of the improvement depends on a small number of people.

### 4. Build fewer evals and less tracing infrastructure

I spent too much time on evals, detailed traces, and comparing model behavior. Some visibility is essential: enough tracing to debug failures, usage analytics to control spend, and tests for critical tools and permissions. But this is *not a frontier lab* or a product with a dedicated evaluation team. It is an internal tool, and I cannot devote all my time to building infrastructure around hypothetical failures.

The goal is to **make it simple, make it work, and keep it maintainable**. A few representative workflows and permission tests are enough until recurring failures justify more. The evaluation system should grow from real problems rather than from the fear of not measuring enough.

### 5. Assume less prior AI knowledge

The largest mistake was probably assuming that capabilities obvious to me would be obvious to everyone else.

AI adoption varies enormously across departments and individuals. Some people work with agents all day. Others have only used the basic ChatGPT interface. Terms such as tools, memory, connectors, context, or skills may mean nothing to them, and there is no reason they should.

From the builder's perspective, the benefit seems clear: the agent can search several company systems, combine what it finds, and act on the result. From somebody else's perspective, it may look like another chat box. Why use this instead of ChatGPT? What does it know? What can it do? What is safe to ask? Will it make a change without permission?

I have not solved this completely either.

What helps most is turning abstract capabilities into visible functionality. Do not announce that the agent has a new connector. Show that it can prepare a specific report, investigate a known type of issue, or automate a repetitive workflow. Give people something relevant they can try immediately.

Adoption does not happen because the architecture is impressive. It happens when somebody sees the agent solve a problem they recognize.

## The main lessons

These are the main lessons and mistakes from the first six months: make the agent visible early, connect it to the systems where context lives, keep access safe, and optimize for something **simple enough to maintain**.

The best decision was letting people see the agent being used before it felt finished. The recurring lesson is that **what feels obvious to the builder is rarely obvious to everyone else**.

I am interested in hearing how other teams are adopting AI in practice, what is working, and where workflows are still awkward or blocked by access, context, or trust. [If you are working through similar questions or facing challenges introducing AI-native workflows in your team or company, I would love to hear more and see whether I can help](/#work-with-me).
