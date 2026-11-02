---
title: "Introducing replacemrr: Who Replaced Whose MRR"
path: /introducing-replacemrr/
date: 2026-11-02
tags: ["AI", "SaaS", "Launch", "Indie Hacking"]
description: "Everyone is talking about SaaS getting killed. AI made software malleable and migrations cheap, so people have stories to share. replacemrr.com is a leaderboard of the SaaS bills they cancelled: old bill, new running cost, net saved."
---

There is a lot of talk right now about SaaS getting killed since you we could be building every integration ourselves in an afternoon. (well kinda)

I obviously don't think it's that simple. But something real is happening. Software got malleable. Implementation got cheap and migration costs sunk. With LLms, the tools you used to pay for can now be bent and twisted to fit what you need, rebuilt, or swapped for something cheaper. And everyone doing that ends up with a story. That said just cause some company is moving off some technology doesn't mean you should as well! As with everything, there are tradeoffs (maintainability, domain expertise etc)

Today I'm launching [replacemrr.com](https://replacemrr.com) to collect those stories. It's a leaderboard and a story collector of SaaS bills people cancelled because they replaced the tool with something else they either built or paid for. Each story is a receipt: the old bill, what the replacement costs to run, and the difference, net saved per month. The name is a nod to TrustMRR, which ranks startups by verified revenue. replacemrr ranks the revenue going the other way.

I hope it shows up in more good ways than bad, with more people owning the tools they depend on.

## It doesn't have to be custom

"Replaced" makes people picture someone writing their own Salesforce from scratch. Some stories are like that. A lot won't be.

At [Bold.org](https://bold.org/) we replaced Periscope Data with ClickHouse and AWS Managed Grafana. What made it worth doing was AI. We had a ton of dashboards to rebuild, and we rebuilt them in Grafana quickly, without much effort. The bill went from $2,000/mo to about $550/mo. And the migration pushed us toward a proper data lake and better dashboards than we had before.

That is not custom software, and it doesn't cost zero. The new stack still has a bill. The difference is that AI made the migration cheap. It's sinking the cost of moving to a cheaper or more open tool, and that's the kind of move I expect a lot more of.

So the board takes both: people who built their own, and people who moved to something they could run for less.

## What's on the board

There are 150 stories at launch, across 86 vendors and 129 companies. Big companies and indie hackers both belong there.

The top is mostly infrastructure. 37signals left AWS for their own Dell servers in a colo and saved $147K a month. Obviously this isn't AI related as it was planned and happened before but still counts. Fynd swapped New Relic for Grafana, OpenTelemetry and Tempo. Curative replaced Salesforce with an internal vibed CRM.

## The trust problem

Here is the issue with a board like this: the numbers are entirely up to the person posting them.

You can prove who you are. A DNS TXT record or a `/.well-known` file on your domain, a Google Workspace sign-in, or a public GitHub repo ties you to the company or project. I with the help of AI will review every story before it goes live but still none of that proves the savings are real numbers. Proof shows who you are, not that the numbers are real.

I'm thinking and figuring about ways to improve this. For now, it is what it is, and the site says so on every page to not give the wrong impression.

## Built for agents too

You can submit from the web with Google or GitHub, or from the terminal:

```
npx replacemrr login
npx replacemrr submit --file story.yaml
```

The CLI is built so a coding agent can submit for you. Agent submissions stay drafts until you confirm them in a browser (might change that to be e2e). There is also a public API at `/api/v1` and an [llms.txt](https://replacemrr.com/llms.txt), so agents can read the board too.

Every live story gets a share card and an embeddable badge. Vendor pages group everyone who left the same tool. And eventually [Reversals](https://replacemrr.com/reversals) is for people who went back to the vendor. It's empty so far, but replacements don't always last, and those stories count too.

## Submit yours

If you cancelled a SaaS bill, whether you built your own or migrated to something cheaper, [submit it](https://replacemrr.com/submit). If your story is already on the board as unclaimed, claim it so it becomes verified! If you see a story of yours that has the wrong numbers please claim and correct it!

And by the way, the small ones count too. A $150 bill gone is still a receipt.
