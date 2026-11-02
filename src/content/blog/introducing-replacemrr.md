---
title: "Introducing replacemrr: Who Replaced Whose MRR"
path: /introducing-replacemrr/
date: 2026-11-02
tags: ["AI", "SaaS", "Launch", "Indie Hacking"]
description: "Everyone is talking about SaaS getting killed. AI made software malleable and migrations cheap, so people have stories to share. replacemrr.com is a leaderboard of the SaaS bills they cancelled: old bill, new running cost, net saved."
---

There is a lot of talk right now about SaaS getting killed. The argument goes that you can now build most of it yourself in an afternoon.

I don't think it's that simple. But something real is happening. Software got malleable. With AI, the tool you used to rent can now be bent to fit what you need, rebuilt, or swapped for something cheaper. And everyone doing that ends up with a story.

Today I'm launching [replacemrr.com](https://replacemrr.com) to collect those stories. It's a leaderboard of SaaS bills people cancelled because they replaced the tool with something they run themselves. Each story is a receipt: the old bill, what the replacement costs to run, and the difference, net saved per month. The name is a nod to TrustMRR, which ranks startups by verified revenue. replacemrr ranks the revenue going the other way.

I hope it shows up in more good ways than bad, with more people owning the tools they depend on.

## It doesn't have to be custom

"Replaced" makes people picture someone writing their own Salesforce from scratch. Some stories are like that. A lot won't be.

At [Bold.org](https://bold.org/) we replaced Periscope Data with ClickHouse and managed Grafana. What made it worth doing was AI. We had a ton of dashboards to rebuild, and with agents we could rebuild them in Grafana quickly, without much effort. The bill went from $2,000/mo to about $550/mo. And the migration pushed us toward a proper data lake and better dashboards than we had before.

That is not custom software, and it doesn't cost zero. The new stack still has a bill. The difference is that AI made the migration cheap. It isn't only for building from the ground up. It's sinking the cost of moving to a cheaper or more open tool, and that's the kind of move I expect a lot more of.

So the board takes both: people who built their own, and people who moved to something they could run for less.

## What's on the board

There are 150 stories at launch, across 86 vendors and 129 companies. Big companies and indie hackers both belong there.

The top is mostly infrastructure. 37signals left AWS for their own Dell servers in a colo and saved $147K a month. Fynd swapped New Relic for Grafana, OpenTelemetry and Tempo. Curative replaced Salesforce with an internal AI-enabled CRM.

AWS is the most replaced vendor, with 14 stories. Then GitHub Actions and Vercel, then Zapier, HubSpot and Mailchimp.

## The trust problem

Here is the issue with a board like this: the numbers are entirely up to the person posting them.

You can prove who you are. A DNS TXT record or a `/.well-known` file on your domain, a Google Workspace sign-in, or a public GitHub repo ties you to the company or project. A person reviews every story before it goes live. None of that proves the savings. Proof shows who you are, not that the numbers are real.

I'm thinking about ways to improve this. For now, it is what it is, and the site says so on every page.

What I can control is what gets amplified. 110 of the 150 stories were seeded from public "we replaced X" posts that nobody has claimed yet. They are marked unclaimed and unverified, rank at half weight, and aren't shared or indexed. They stay quiet until someone who can prove they're behind them claims them.

## Built for agents too

You can submit from the web with Google or GitHub, or from the terminal:

```
npx replacemrr login
npx replacemrr submit --file story.yaml
```

The CLI is built so a coding agent can submit for you. Agent submissions stay drafts until you confirm them in a browser. There is also a public API at `/api/v1` and an [llms.txt](https://replacemrr.com/llms.txt), so agents can read the board too.

Every live story gets a share card and an embeddable badge. Vendor pages group everyone who left the same tool. And [Reversals](https://replacemrr.com/reversals) is for people who went back to the vendor. It's empty so far, but replacements don't always last, and those stories count too.

## Submit yours

If you cancelled a SaaS bill, whether you built your own or migrated to something cheaper, [submit it](https://replacemrr.com/submit). If your story is already on the board as unclaimed, claim it.

The small ones count. A $150 bill gone is still a receipt.
