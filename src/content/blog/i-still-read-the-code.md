---
title: "I Don't Write Code Anymore. I Still Read It."
path: /i-still-read-the-code/
date: 2026-09-30
tags: ["AI", "Agents", "Engineering", "Code Review"]
description: "Agents write all my code now. I still keep asking them to simplify it, because unnecessary complexity creates more to reason about and more places for bugs."
---

Apparently, coding is solved and AGI is just around the corner. Meanwhile, I am asking the latest model why it is checking, yet again, whether an integer is a number.

I went back through two months of my [OpenCode](https://opencode.ai/) conversations and [Plannotator](https://plannotator.ai/) feedback to understand that pattern. Across different projects and tasks, I kept pushing in the same direction: use the established approach, remove the unnecessary transformation, leave unrelated code alone, reconsider whether we need this behavior at all.

These conversations were with OpenAI's latest models: Sol 5.6, then Astra.

## Code is solved. Bugs are not.

For my day-to-day work, producing an implementation is no longer the bottleneck. I can describe a change, discuss it with an agent, and get working code across the relevant parts of a project. What remains difficult is establishing that the change solves the actual problem without introducing behavior we did not need or bugs we did not have.

That is why I keep asking for simpler code.

Every additional condition introduces another path to reason about. Every additional representation creates another opportunity for the same information to disagree. Every unrelated refactor changes more behavior that must be understood and verified alongside the requested work.

The cost of generating those additions is now tiny. Their cost continues long after the current task is finished.

This matters especially in an established codebase. There are already patterns for how the system handles things, with behavior that callers rely on. An agent can follow those patterns, or it can introduce a second way of doing something because that looks convenient within the current task. The second approach may work in isolation while creating another area where bugs can develop.

I can see the appeal of frameworks such as [Effect](https://effect.website/docs/getting-started/why-effect/) for agent-written code: explicit errors and dependencies, plus standard tools for concurrency and resource management, leave fewer mechanisms to invent from scratch. But not every codebase uses Effect or will migrate to it, and a well-typed, well-structured change can still be unnecessary.

A poorly designed function introduced today also becomes context for the next agent. Other agents start using it. Later, another agent changes it without knowing why it worked that way in the first place. An arbitrary choice has become a constraint on future work, and we now have to figure out which parts reflect an actual requirement and which parts were just the previous model's interpretation.

The next agent will make it work, with tests. **But work how? The way we want, or the way it infers we want from the code it inherited?**

## The model can make its own complexity necessary

The most frustrating pattern starts with a design choice that was never a requirement.

The agent makes that choice, encounters the consequences, and writes more code to accommodate them. By the time I read the result, each addition has a reasonable explanation. Given the earlier decision, we need the extra handling. Given the extra handling, we need more tests. Given the new behavior, we need to account for another case.

Take an integer read from the database. The column is an integer, the API contract describes it as a number, and the [Kysely](https://kysely.dev/) query type agrees. Yet I still see agents repeatedly checking whether that value is a number as it passes through internal code. We have already established where it comes from and what it can be. Why does every use treat that guarantee as unknown again?

The check itself may be completely correct. It may never throw or have any meaningful performance impact. But what does it buy when the value already comes through a path that guarantees its type? It is treating the database as though we routinely bypass its constraints and manually create invalid values.

I see the same thing with locking and concurrency mechanisms. Before establishing whether an operation can actually run concurrently, the agent starts coordinating it. Then we need rules for acquiring and releasing the lock, recovering from failure, and testing those rules. If our execution model does not require that coordination, we have introduced new ways to fail while protecting against a problem we do not have.

I can ask the agent to improve each check or lock. The more useful question is whether the operation needs them at all.

We already had a principle for this: avoid premature optimization. When we wrote the code ourselves, the effort of implementing each idea also limited how much speculative work we could add. Agents can deliver the optimization, defensive branches, and supporting tests before we have established a need for any of them.

Even when it all works, that is extra cognitive load during review, extra context for the next agent, and extra tests in the PR and CI. We are generating code much faster than before, so more of the effort goes into deciding which of those additions are justified.

This is why asking for simplification sometimes takes several rounds. The agent removes the specific thing I pointed at, but the reasoning that produced it remains. I find another instance and have to explain the same objection again.

An impressive implementation of an unnecessary requirement still leaves us owning the unnecessary requirement.

## Passing checks does not answer that question

Typechecking, linting, tests, and screenshots are essential to this workflow. They let agents catch and fix a huge amount without involving me. But a clean result does not establish that all the new code belongs in the change.

A typechecker checks the types we chose. A test checks the behavior we specified. If the agent introduced an unnecessary constraint and then wrote code and tests around it, those checks can all agree.

Even adversarial tests can reinforce this. Supply a string to the internal function that receives our database integer, and the test confirms that the defensive check handles it. We have proved that an invented error path works, without establishing that the real data path needs it.

Screenshots can help an agent verify that the UI is visually consistent. It can still consistently display the wrong information or take the user through the wrong flow. Looking right is another useful check, but it does not settle whether we built the right thing.

That is also why I keep asking what a test actually proves. Does it protect behavior that matters to a user? Would it catch a meaningful regression? Or would it mostly object if we reorganized the implementation?

One agent interpreted those questions as a preference against mock-heavy tests. I had to correct it: **the issue was whether the test had meaning.** Turning that judgment into a rule about mocks missed the point.

The same applies to complexity. “Fewer helpers” cannot substitute for understanding which responsibilities belong together. “More tests” cannot substitute for deciding which behavior is correct. These shortcuts are easy to put in an instruction file and easy to follow superficially.

## I already put it in the prompt

I use skills, project instructions, and `AGENTS.md`. I keep them up to date, revisit them when I move to a new model, and check whether the agent's behavior matches the guidance. Maintaining that setup is already part of the work.

The questions about test value belong in a testing skill. But agents do not always follow those instructions, and I still have to check whether the tests reflect them.

While working on this article, I again asked an agent why it had added a helper instead of reusing or improving existing functions. Its answer:

> The extra helper was my judgment call; repository guidance actually favors reuse.

That is why I struggle with “skill issue” or “fix your AGENTS.md” as a sufficient explanation. The guidance was already there. The agent could identify it and acknowledge that its implementation had gone another way.

There is a difference between making a principle available and applying it well. **An agent can correctly explain why unnecessary complexity is undesirable and still introduce it in the next change.** It can agree that a requirement is out of scope and later build something that depends on it.

More precise instructions help when I already know the specific mistake to prevent. But I often discover that mistake by reading the code. At that point, identifying the problem and writing the corrective prompt is the engineering work. Calling the resulting improvement better prompting does not explain how I could have skipped that judgment.

I want the agent to make routine implementation decisions independently. Specifying every branch and every boundary in advance would mean doing much of the implementation design myself. The useful delegation is letting it do that work, then being able to challenge the decisions that do not fit.

Long sessions can also lose agreed decisions. I asked for a command-line option to be removed, and an early compaction summary preserved that decision. Six compactions later, the option was back—with tests requiring it. I had also approved broader plans along the way, so compaction alone does not explain the regression. But the summaries had lost the explicit exclusion and eventually described the rejected behavior as intended. An earlier agreement was no guarantee of the final result.

That is the gap I keep encountering, even with the latest models and a workflow built around giving them useful context.

## Why I still read production code

Plannotator makes this part of the workflow unusually smooth. I can annotate the exact part of a plan, diff, or explanation that bothers me, ask why it exists, and discuss a simpler approach. That feedback goes back to the agent with the relevant context. It makes it easy to reason about a change together and ask for another pass, instead of trying to describe code locations through a long prompt.

That matters because this is a recurring conversation, not a final approval button. I am very happy with how much faster I can investigate and implement things. Having a good way to challenge the result is part of what makes that speed useful.

I have been wrestling with this since Opus 4.5. I hoped newer models would make it substantially less necessary. There have absolutely been improvements, but not enough for me to confidently stop reading code intended for critical production use.

And trust me, I do want to stop reading code. I want this solved end to end. I just cannot treat it as solved yet.

Pet projects and fun experiments are a different tradeoff. If the consequences are small, I understand choosing to spend less time checking. **But when someone says critical production code no longer needs to be read by a human, I think they are fooling themselves about what these tools can currently establish.**

> **A note on how this article was written:** AI helped me analyze my OpenCode conversations and Plannotator feedback, then draft and revise this article. The experience, decisions and opinions are mine.
