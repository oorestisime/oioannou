---
title: "Building a Migration Factory to Adopt oRPC Contracts"
path: /orpc-contract-migration-factory/
date: 2026-09-08
tags: ["Engineering", "AI", "Agents", "OpenCode", "oRPC"]
description: "How I used coding agents, temporary compatibility layers and a lot of review to complete an oRPC contract migration I would never have attempted by hand."
---

I recently reviewed a diff that removed more than 30,000 lines of code.

I was very happy about it.

The deleted code was not an old product or feature. It was a temporary compatibility system I had built to move our [oRPC](https://orpc.dev/) APIs [from implementation-inferred types to explicit, reviewed contracts](https://orpc.dev/docs/contract-first).

The work happened in roughly three weeks as a side project while continuing to ship along the way. The following is an attempt to share learnings, findings and storytelling on how I organized OpenCode sessions that researched routers, implemented contracts, reviewed each other's work and kept the migration moving.

AI did not just make the migration faster. It made a migration strategy possible that I would not have seriously considered doing by hand.

## Why we used type inference in the first place

When we first adopted oRPC, we knew its [contract-first approach](https://orpc.dev/docs/contract-first) was attractive. Inputs, outputs and route metadata live in a separate contract, the backend implements it, and clients derive their types from the same definition.

Hand-writing every input and output contract was tedious, especially while we were still testing whether oRPC was the right direction. Letting TypeScript infer the router types from the implementation made adoption much easier. We could write the handlers, export the router type and immediately get a fully typed client after emitting the types.

That was a good tradeoff at the time. It let us adopt oRPC without first describing our entire API by hand.

The downside appeared as more applications started depending on those inferred backend types. The backend implementation became the public type definition. Frontends and internal tools depended on backend declaration builds, and a typecheck could pull a huge part of the backend source graph into memory. Generating the backend types took roughly two to three minutes, and that cost was repeated in multiple CI jobs and even in Vercel deployments. Local development had another build step, and deployments inherited work that had little to do with deploying a frontend. Removing it saved many minutes across a full delivery cycle.

AI changed the original tradeoff. Writing, reviewing and maintaining explicit contracts was no longer the limiting factor. An agent could inspect the implementation, trace database and service types, write a complete schema and fix the consumers affected by more accurate types. I still had to decide what the contract should mean, but I no longer had to type every property myself. The agent could also review shared entities, making contracts reusable.

The end state was much simpler. The contract package builds quickly, every application consumes it directly, and nothing needs a backend declaration build just to know the API shape. That shaved time from CI and Vercel deployments and made local development smoother as well.

It also gives better editor autocomplete. Not that I spend time writing code by hand anymore.

## The part that made this dangerous

The most important conclusion from my first planning session was this:

> Contracts must be treated as runtime parsers, not merely TypeScript declarations.

Adding an output contract does not only change types. oRPC parses every handler result through that schema. The parser can strip undeclared properties, reject historical database values, transform data or turn a previously successful response into an output-validation error.

A safe migration therefore had to preserve much more than assignable TypeScript types:

- procedure names and namespaces
- input defaults, coercions, transforms and stripped fields
- required, optional, nullable and omitted output fields
- database driver representations
- recursive JSON and serialized dates
- middleware and authorization order
- GET and POST metadata
- errors, headers, cookies, caching and response envelopes
- assumptions already compiled into every consumer

Several of those distinctions are easy to miss. A missing property is not the same as `null`. A database timestamp may reach an oRPC client as a `Date`, while a date inside JSON remains a string. Authentication before input parsing produces a different response from authentication after parsing. A schema can be perfectly valid and still remove properties that the previous endpoint returned.

It was clear from the get-go that no single typecheck could prove all of that.

## Building temporary compatibility layers

I settled on this sequence:

```text
foundation
-> router migrations
-> application contract composition
-> consumer cutovers
-> deletion-only cleanup
```

Every router migration temporarily gained a few extra pieces:

```text
router.legacy.ts
contracts/src/router/contract.ts
router.ts
contractCompatibility/router.compat.ts
```

The legacy file froze the implementation before activation. It was not allowed to import the new contract. The compatibility file derived input and output maps from both sides and checked exact procedure keys, bidirectional equivalence and the absence of unexplained `any` or `unknown`.

The main check looked roughly like this:

```bash
tsc --noEmit -p tsconfig.contract-compat.json \
  && tsx scripts/checkContractLegacyImports.ts
```

An import guard stopped runtime code from depending on the frozen routers. In-process tests checked handler and service behavior. Focused HTTP tests covered the real transport boundary where it mattered, including GET query encoding, authentication, dates, caching, uploads and serialization. Every affected application/consumer also had to typecheck against the reviewed contracts.

I wanted the compatibility project to run with strict TypeScript at first. That did not survive the reality with our codebase. Importing a frozen router pulled in services and a large section of the backend, exposing years of unrelated strictness debt. Turning this into a backend-wide strictness migration would have made sure that neither migration finished.

The practical compromise was to keep the contracts package and consumers strict, compile the frozen compatibility files using the backend's existing mode, and fill the gaps with schema checks and targeted runtime tests. Aim for usefulness and not purity.

## Giving agents enough context

Before scaling the migration, I created `contracts.md` and `contract-prompt.md`.

`contracts.md` contained the complete plan: compatibility rules, migration phases, activation requirements, consumer cutover and cleanup. `contract-prompt.md` turned those decisions into a reusable worker prompt.

At the beginning, my prompts were huge. I repeated the architecture, the files to create, the compatibility rules, the tests to run and every shortcut I did not want the agent to take. I did not yet trust that a fresh session could read two Markdown files and make the same decisions.

The first migrations and their reviews gradually moved those details into the repository. `contract-prompt.md` defined what behavior-preserving meant, prohibited broad `z.any()` escapes and output casts, required evidence for compatibility exceptions, and told workers not to commit or push before review. Every useful review finding made the next version better.

Once I gained confidence in those files, my direct prompts became much shorter. A real one, with internal names and paths redacted, looked like this:

```text
Read /contracts.md and /contract-prompt.md, then follow the worker prompt to migrate:

ROUTER_FILE: [router file]
ROUTER_NAME: [router name]
CONTRACT_NAME: [contract name]
WIRE_NAMESPACE: [wire namespace]
KNOWN_CONSUMERS: [known consumers]

Work autonomously through implementation and verification. Do not commit or push.
```

That did not mean the worker received less context. The controller read the migration documents, used a lot of subagents to understand the router, and turned its findings into a detailed implementation assignment.

I did not type those detailed prompts line by line. The controller generated them from the rules I had written and the inventory it had just completed. My side of the interface became simpler while the instructions behind it became more specific.

That is one of the largest benefits of a long-running controller session. It did not only remember which router was next. It remembered why a previous contract failed, which tests were useful, where agents took shortcuts and which files parallel workers were allowed to touch. I usually had to prompt it to check my OpenCode session database before it compacted its context to keep it focused.

## The controller and workers

Most of the work followed the same loop:

```text
research the existing router
-> implement the contract migration
-> review compatibility and runtime behavior
-> fix findings
-> verify and integrate
```

I chose the routers and decided how to group them. The controller session prepared prompts, tracked decisions, compared reviewer findings and helped manage the Git work. Workers did the focused research and implementation. Separate workers reviewed the result without inheriting the implementer's confidence that everything was already correct. Their prompts focused on comparing frozen routers with the new contracts, checking exact input and output behavior, and reporting only concrete regressions.

This was not review theater. Reviewers found nullable database fields made required, arbitrary projected fields stripped by Zod objects, historical values excluded by new enums, output parsing inside `try/catch` changing errors, and middleware moved to the wrong side of validation.

For a slightly funny measure of scale, I asked Sol to inspect OpenCode's session database after the migration. The migration-related sessions recorded roughly **4.2 billion tokens** of model activity. Almost 4 billion were cached context reads, while input, output and reasoning accounted for around 163 million.

## Deciding what to group

I started with one physical router per worker, branch and PR. It was the safest way to validate the process.

That rule did not last.

Small independent routers worked well in parallel. Two related routers were sometimes easier to migrate together. Large routers stayed by themselves and received more research and review. Later batches grouped several small routers sharing the same consumer surface. When I made an exception to the one-router rule, the prompt stated the batch boundary, required the full verification process, and still kept commits and pushes behind review.

The useful unit was not a fixed router count. It was risk, domain coupling, consumer surface and the quality of existing examples.

Parallelism also needed limits. Research and router-owned files could proceed independently. Shared composition, broad formatting, integration tests, commits and rebases were serialized. More agents only helped when the work could actually be separated.

## What the compatibility work caught

The best findings came from disagreement between layers.

Type equivalence could pass while a Zod object stripped projected fields. A model type could say `string` while the database returned something else. A current enum could reject historical values already stored in production. An output could be assignable in TypeScript while changing from omitted to explicit `null` over HTTP.

The migration found issues involving:

- nullable booleans and timestamps
- omitted versus nullable fields
- recursive JSONB values
- database numerics and arrays
- dates inside and outside JSON
- coercion and default injection
- authorization before input validation
- GET metadata and caching
- duplicate output parsing
- service return types that were more optimistic than runtime data

One subtle case involved routers that were already partially contract-backed. For those procedures, the deployed contract was the real wire baseline, even if it had stripped fields from the handler result. Comparing only against raw implementation inference would have restored fields that clients were not actually receiving.

Compatibility meant preserving the observable API, not whichever source file looked oldest.

## Composing the application contracts

Finishing every physical router was still not enough. I had to compose them into complete admin, internal, public and static contracts, followed by the combinations used by our web applications, mobile application, internal backoffice and internal CLI.

Eleven namespaces overlapped. A shallow spread would have silently replaced one group of procedures with another:

```ts
const broken = { ...publicTier, ...adminTier }

const combined = {
  ...publicTier,
  ...adminTier,
  scholarships: {
    ...publicTier.scholarships,
    ...adminTier.scholarships,
  },
}
```

I added composition tests for exact namespace and procedure parity, collisions, application combinations and GET metadata. Only after those passed did I cut the clients over from backend-inferred types to contract-derived types.

The consumer change was intentionally boring. URLs, methods, headers, cookies, hooks and call sites stayed the same. The type source changed, every application passed its typecheck, and the backend declaration build could finally disappear.

## Deleting the migration

Once the routers, composed contracts and clients had all crossed over, the compatibility system had done its job.

I removed it in one cleanup:

- 63 frozen legacy router files
- 65 compatibility and assertion files
- compatibility TypeScript configurations
- the legacy import guard
- backend declaration-build machinery
- temporary CI tasks
- `contracts.md`
- `contract-prompt.md`

The review snapshot was 139 files changed, 30,664 deletions and one insertion.

Deleting this code was always part of the plan. The compatibility files were migration oracles, not a permanent second architecture. Keeping them would mean every future router change had to consider both the old and new worlds.

Temporary code should be easy to delete when it has finished proving what it needed to prove.

## Production still found one

The release had one production regression caused by a historical database value whose runtime representation differed from the reviewed schema.

I noticed the new 500s through our wide logging pattern, correlated them with the rollout and reproduced the request directly to expose the exact output mismatch. From identifying the cause to having the hotfix verified in production took less than 30 minutes.

I would have preferred to say all those compatibility layers proved perfect compatibility. They did not.

## A migration I would not do by hand

The largest takeaway is not that agents can write Zod schemas quickly.

Without AI, I would never have written more than sixty frozen routers and another sixty compatibility files by hand. I would not have attempted to keep the whole migration together until every router, composed API and consumer had crossed over. I would definitely not have looked forward to repeatedly rebasing that work onto a staging branch that kept changing underneath it.

With agents, most of that became an afterthought. A controller could prepare the next batch while another worker reviewed the current one. A rebase that would have consumed an unpleasant afternoon could run while I worked on something else. If a reviewer found a problem, another pass could trace it through the database, implementation, contract and consumers before I made the final decision.

AI made the repetitive work cheaper, but more importantly it made extra verification affordable. I could build compatibility layers I always intended to delete, ask independent agents to challenge every migration, and carry one complete change through several rebases without quietly dropping half the safety checks because they were too much work.

I would probably have avoided this migration a year ago, or reduced its scope until it felt manageable by hand.

This time I could afford to be more careful, not less. That is what gave me the confidence to attempt it in the first place.

> **A note on how this article was written:** AI helped me reconstruct the migration from my OpenCode sessions and edit this article. The experience, decisions and opinions are mine.
