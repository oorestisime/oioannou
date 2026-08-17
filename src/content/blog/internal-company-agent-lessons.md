---
title: "Building an Internal Company Agent: 5 Things I Got Right and 5 I Would Do Differently"
path: /internal-company-agent-lessons/
date: 2026-08-17
tags: ["AI", "Agents", "Engineering", "Product"]
description: "A practical retrospective on building and rolling out an internal company agent at Bold.org, from connectors and usage analytics to adoption, contributions and overbuilt evals."
---

In [my recent AI engineering setup article](/blog/ai-engineering-setup-15-months-later/), I briefly explained how an observability project at [Bold.org](https://bold.org/) turned into an internal company agent.

The short version is that back in January 2026, Bold.org had structured backend events in ClickHouse, engineers could investigate them with SQL, and I wanted to see whether an agent could do the same. It worked, so I kept connecting more company systems. Within weeks, people across Bold.org were using it. It eventually became useful across engineering, product, support, operations, marketing, and growth.

That summary makes the path sound much cleaner than it was.

I made several decisions that helped the agent spread quickly. I also spent time solving problems I did not really have, left some important problems too late, and assumed things were obvious when they definitely were not.

This is not a universal guide to building agents. It is a practical retrospective from building one inside a real company: five things I think I got right and five I would approach differently today.

## What this looked like in practice

The first workflow was straightforward: I gave the agent read-only access to structured backend events in ClickHouse so it could investigate production questions. I then connected more of the systems where people already worked, including Slack, Linear, PostHog, and Grafana.

The practical effect is bigger than a faster way to write SQL. Support can investigate many customer reports autonomously, without waiting for engineering or another team to provide context. For the workflows we target, investigations that previously took multiple hours and required finding the right access through three or four people can usually be completed in zero to one hour. The agent also automates parts of dashboard setup and analysis in PostHog and Grafana without requiring engineering to step in.

The system consumes billions of tokens per month. That makes usage analytics and cost awareness important, but it is also a useful signal that the tool is part of how people work rather than a demo that is occasionally opened.

I made one security boundary deliberately simple. The agent is gated behind Google sign-in for our company domain, and all of its remote access is read-only. Rather than relying on the model to be smart about when a change is safe, I did not give it permissions to write to remote systems in the first place.

## Five things I got right

### 1. I made it visible before it was finished

By "visible," I mean visible inside the company.

It is tempting to build an internal tool privately, make it feel complete, write an announcement, and then ask everyone to use it. I did almost the opposite. I used the agent in shared Slack channels and connected it to Linear, where people were already working and could see what it did.

This mattered more than any launch document.

Most people do not immediately know what an agent can do. A blank chat box does not explain its capabilities. Even a good list of examples still requires someone to translate those examples into their own work.

Seeing real usage solves that problem. Someone asks a question in Slack, the agent investigates it, and ten other people see both the result and the way the question was asked. A product manager notices that it can inspect a user flow. Somebody in support realizes it can help investigate a report. An engineer sees it gather context they were about to collect manually.

Each visible interaction becomes a small product demo based on an actual company problem.

Slack and Linear were important for another reason: they did not require people to adopt a new destination. Another internal web application would have asked everyone to remember that the tool existed, open it, and decide when to use it. In Slack and Linear, the agent appears where the question or task already exists.

The web interface is still useful, especially for private or longer work. But shared usage is what taught the company what was possible.

### 2. I built small connectors when an MCP server did not exist

An agent becomes much more useful when it can reach the systems where the company actually works. Unfortunately, many internal and third-party systems still do not have a useful MCP server. This is less of a blocker than it first appears.

If a service has an API and an OpenAPI specification, building a basic connector is now surprisingly fast. I can point a coding agent at the specification, describe the small set of operations we need, and ask it to build a simple package around them. Then I review the generated code, narrow the permissions, test it, and connect it to the agent.

These connectors do not need to become ambitious integration platforms. In fact, making them boring is better. Expose a few clear operations, return structured results, handle errors properly, and keep credentials away from the model.

The goal is not to reproduce the entire application through tools. It is to give the agent the capabilities needed for useful company workflows.

This approach let me move without waiting for every vendor to ship an official MCP server. It also worked well for internal APIs, where an external connector was never going to exist anyway.

### 3. I tracked how people actually used it

I added usage analytics early. Not to create a leaderboard or measure who was "doing AI" correctly, but to understand what I had built.

Basic data such as tool calls, token spend, recurring workflows, and usage by department answered questions that conversations alone could not:

- Which tools were actually valuable?
- Were people mostly asking questions or asking the agent to take action?
- Which departments had found useful workflows?
- Where was usage growing or disappearing?
- Which requests were expensive without producing much value?
- What capabilities were people repeatedly trying to use?

This helped me improve the product based on behavior rather than guesses. If one department kept using a connector in an unexpected way, that was a signal to make the workflow easier. If a tool was almost never called, either people did not know about it, its description was poor, or the capability was less useful than I thought.

Department-level patterns were especially interesting. The same agent can look like a debugging tool to engineering, a research tool to product, and an investigation tool to support. Looking only at total message count hides that.

There is an important privacy line here. Internal analytics should help improve the tool, not make employees feel monitored or judged. Aggregate patterns and operational metrics were much more useful than ranking individual people.

### 4. I listened to feedback and wrote basic documentation

People will try things you did not anticipate. They will also hit confusing behavior that feels obvious to the person who built the system.

I made it easy to share feedback and adjusted the agent as people used it. This sounds basic, but it created a useful loop: somebody tried a workflow, reported where it failed, and could often try the improved version shortly afterwards.

That responsiveness encouraged more experimentation. People are much more willing to explore a new tool when they know a failure is not the end of the conversation.

Some basic documentation also helped. It did not need to explain every tool or become a complete AI training course. A short explanation of what the agent could access, examples of good requests, known limitations, and how to share feedback gave people enough confidence to start.

The combination matters. Documentation without feedback becomes stale. Feedback without documentation means answering the same introductory questions forever.

### 5. I did not make it an engineering-only tool

The agent started from an engineering and observability problem, so keeping it focused on engineers would have been the obvious path. I am glad I did not.

Some of the most interesting usage came from product, support, operations, marketing, and growth. These teams often need information spread across several systems but do not have a convenient way to query or combine it. An agent with the right company context can remove a lot of that navigation. Support can be especially powerful here: people can investigate many reports themselves instead of waiting for engineering to gather the context.

Engineers can actually be harder to convince.

They already have coding agents, terminal workflows, preferred models, custom instructions, and strong opinions about harnesses. Asking them to move into a shared company interface can feel like asking them to give up a setup they spent months refining. I understand the resistance because I have the same opinions about my own tools.

Other departments may have fewer existing agent workflows to replace. Once they see a relevant example and trust the access model, the value can be more immediate.

Treating the agent as company infrastructure rather than an engineering experiment changed both its adoption and the features I prioritized.

## Five things I would do differently

### 1. I would design local access much earlier

The biggest missing piece is making company tools available safely from local agent harnesses.

The shared web, Slack, and Linear interfaces are useful, but local agents have context that a company agent does not. They can work with a person's files, notes, project memory, terminal, and current repository. Engineers in particular do not want to abandon that context every time they need company information.

The ideal setup is not forcing everyone into one harness. It is allowing approved local harnesses to use company tools without exposing credentials or bypassing permissions.

That is a much harder problem than adding another interface. Authentication needs to represent the person making the request. Secrets cannot be handed to the local model. Tool access should remain scoped and auditable. A compromised or badly configured local environment should not gain broad company access.

I still have not solved this completely. But if I started again, I would treat secure local access as a core architecture requirement rather than a later integration. It is the clearest way to combine shared company knowledge with the personal context people already maintain.

### 2. I would spend less time chasing the perfect architecture

Agent tooling changes constantly. Frameworks appear, model APIs improve, MCP conventions evolve, and every week there is a new opinion about the correct architecture.

It is very easy to keep redesigning the system around what everyone is discussing online.

I spent too much time considering whether I should rebuild parts of the agent around the latest approach. Most of that thinking had a short expiry date. The tool or pattern that looked essential one month could be irrelevant a few months later.

Today I would pick one simple architecture that supports the immediate use case and move forward. Keep connectors small. Keep boundaries clear. Avoid coupling everything to one model or framework. Then replace pieces when there is a real reason, not because a new diagram is popular on social media.

Internal tools have an advantage here: they do not need to become a generic platform for every possible customer. They need to solve the company's actual problems.

### 3. I would make contribution paths obvious from the beginning

The agent improved quickly, but too much of that improvement depended on a small number of people.

It was not obvious who could write a skill, add a connector, improve instructions, or contribute code. Even when the repository was available, people were understandably hesitant. Agent systems combine code, prompts, permissions, and unfamiliar conventions. Nobody wants to break a tool used across the company or accidentally expose something sensitive.

Saying "contributions are welcome" is not enough.

I would define contribution levels explicitly:

- how anyone can propose or edit a skill
- how teams can own documentation for their workflows
- how engineers can add a tool or connector
- which changes require security or code review
- where to test changes before they reach everyone

A few examples and a short contribution guide would have removed a lot of uncertainty. I would also identify owners in different departments instead of making every improvement flow through engineering.

The company agent should capture knowledge from across the company. Its contribution model should reflect that.

### 4. I would build fewer evals and less tracing infrastructure

I spent too much time on evals, detailed traces, and comparing model behavior.

Some visibility is essential. You need enough tracing to debug failures, enough usage analytics to control spend, and enough logging to understand what tools were called. But it is easy to cross from useful visibility into building infrastructure for a problem you do not have.

This is not a frontier lab evaluating model capabilities, and it is not an external agent product promising consistent behavior to thousands of customers. It is an internal tool used by colleagues who can report failures and adjust their requests.

That changes the appropriate level of investment.

A small set of tests for critical tools and permissions is valuable. A few representative workflows can catch obvious regressions. Beyond that, I would wait for recurring failures before building a large evaluation system.

This does not conflict with tracking usage. Usage analytics tells me whether the product is useful and where to improve it. A sophisticated eval suite tries to measure correctness across models and prompts. I needed much more of the first than the second.

### 5. I would assume much less prior AI knowledge

The largest mistake was probably assuming that capabilities obvious to me would be obvious to everyone else.

AI adoption varies enormously across departments and individuals. Some people work with agents all day. Others have only used the basic ChatGPT interface. Terms such as tools, memory, connectors, context, or skills may mean nothing to them, and there is no reason they should.

From the builder's perspective, the benefit seems clear: the agent can search several company systems, combine what it finds, and act on the result. From somebody else's perspective, it may look like another chat box. Why use this instead of ChatGPT? What does it know? What can it do? What is safe to ask? Will it make a change without permission?

I have not solved this completely either.

What helps most is turning abstract capabilities into visible functionality. Do not announce that the agent has a new connector. Show that it can prepare a specific report, investigate a known type of issue, or automate a repetitive workflow. Give people something relevant they can try immediately.

Adoption does not happen because the architecture is impressive. It happens when somebody sees the agent solve a problem they recognize.

## What I would optimize for now

If I started again, I would spend less time optimizing the agent itself and more time optimizing the path from curiosity to useful work.

That means putting it where people already work, showing real examples, building the missing connectors quickly, making contributions safe and obvious, and giving local agents a secure path into company context.

The technical foundation still matters. Permissions need to be correct. Tools need to be reliable. Failures need to be debuggable. But internal adoption depends just as much on whether people understand the possibilities and feel comfortable trying them.

The best decision I made was letting people see the agent being used before it felt finished. The biggest lesson I would carry into the next version is that what feels obvious to the builder is almost never obvious to everyone else.

I am interested in hearing how other teams are adopting AI in practice, especially where their workflows are still awkward or blocked by access, context, or trust. If your team is working through similar questions, I would be glad to compare notes. You can [find out more about working with me](/#work-with-me).
