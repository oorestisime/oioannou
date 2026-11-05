---
title: "Introducing replacemrr: Who Replaced Whose MRR"
path: /introducing-replacemrr/
date: 2026-11-02
tags: ["AI", "SaaS", "Launch", "Indie Hacking"]
ogImage: /img/og/introducing-replacemrr.png
description: "Everyone is talking about SaaS getting killed. Is this really happening? replacemrr.com is a tracker of the SaaS bills that are replaced: old bill, new running cost, net saved. Submit yours!"
---

There is a lot of talk right now about SaaS getting killed since you we could be building every integration ourselves in an afternoon. (well kinda)

I obviously don't think it's that simple. But something real is happening. Software got malleable. Implementation got cheap and migration costs sunk. With LLms, the tools you used to pay for can now be bent and twisted to fit what you need, rebuilt, or swapped for something cheaper. And everyone doing that ends up with a story. That said just cause some company is moving off some technology doesn't mean you should as well! As with everything, there are tradeoffs (maintainability, domain expertise etc)

Today I'm launching [replacemrr.com](https://replacemrr.com) to collect those stories. It's a leaderboard and a story collector of SaaS bills people cancelled because they replaced the tool with something else they either built or paid for. Each story is a receipt: the old bill, what the replacement costs to run, and the difference, net saved per month. The name is a nod to TrustMRR, which ranks startups by verified revenue. replacemrr ranks the revenue going the other way.

I hope it shows up in more good ways than bad, with more people owning the tools they depend on.

## It doesn't have to be custom

"Replaced" makes people picture someone writing their own Salesforce from scratch. Some stories are like that. A lot won't be.

At [Bold.org](https://bold.org/) we replaced Periscope Data with ClickHouse and AWS Managed Grafana. We had a ton of dashboards to rebuild, and we did so quickly, without much effort by pointing an agent to the task. The bill went from $2,000/mo to about $550/mo. And the migration pushed us toward a proper data lake and better dashboards than we had before.

That is not custom software, and it doesn't cost zero. The new stack still has a bill. The difference is that AI made the migration cheap. It's sinking the cost of moving to a cheaper or more open tool, and that's the kind of move I expect a lot more of.

So the board takes both: people who built their own, and people who moved to something they could run for less.

## What's on the board

There are 150 stories at launch, across 86 vendors and 129 companies. Big companies and indie hackers both belong there.

The top might get dominated mostly by infrastructure since those bills tend to be high. 37signals left AWS for their own Dell servers in a colo and saved $147K a month. Obviously this isn't AI related as it was planned and happened before but still counts. Fynd swapped New Relic for Grafana, OpenTelemetry and Tempo. Curative replaced Salesforce with an internal vibed CRM.

## The trust problem

Here is the issue with a board like this: the numbers are entirely up to the person posting them.

You can prove who you are. A DNS TXT record or a `/.well-known` file on your domain, a Google Workspace sign-in, or a public GitHub repo ties you to the company or project. I ll be reviewing, with the help of AI, every story before it goes live. Still none of that proves the savings are real numbers. Proof shows who you are, not that the numbers are real.

I'm thinking and trying to figure out ways to improve this. For now, it is what it is, and the site says so on every page to not give the wrong impression.

## Built for agents too

You can submit from the web without an account. It goes to review as unverified. Sign in with Google or GitHub if you want to own the story and add proof. Or from the terminal:

```
npx replacemrr submit --file story.yaml
```

The CLI is built so a coding agent can submit for you. Without a login the story goes to review as unverified. After `npx replacemrr login` it's saved as a draft you confirm in the browser. An agent can also hand you a `replacemrr.com/submit#story=...` link that opens the form already filled in, so you just check it and send. There is also a public API if you prefer.

Every approved story gets a share card and an embeddable badge. Vendor pages group everyone who replaced the same tool. And eventually [Reversals](https://replacemrr.com/reversals) is for people who went back to the vendor. It is empty so far, but replacements will not always last, and those stories count too.

## Submit yours

If you replaced a SaaS bill, whether you built your own or migrated to something cheaper, [submit it](https://replacemrr.com/submit). No account needed. If your story is already on the board as unclaimed, claim it so it becomes verified! If you see a story of yours that has the wrong numbers please claim and correct it!

And by the way, the small ones count too. A $150 bill gone is still a receipt.
