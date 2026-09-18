---
title: "Why Saying ‘Hi’ to Our OpenCode Agent Used 177,000 Tokens"
path: /how-a-hi-can-be-expensive/
date: 2026-09-18
tags: ["AI", "Agents", "OpenCode", "MCP", "Engineering"]
description: "How OpenCode's database, TokenScope, and a fresh greeting helped me trace our agent's token usage to MCP tool definitions—and what Code Mode changed."
---

At Bold.org, people use our [internal company agent](/blog/internal-company-agent-lessons/) to investigate production issues, look up information, and put together reports. It runs on OpenCode, connected to the systems where that information lives. I have gradually added more integrations as people found useful things to do with them, and for the most part that has worked well.

Over the last few days, though, we started reaching our AI usage limits much sooner than I expected. Astra is more expensive, and usage was growing steadily, so some increase made sense. But token consumption was climbing much faster than the number of sessions or automations could explain, even though I understood Astra was supposed to use fewer tokens to complete tasks. That was what bothered me. Was it spending more on reasoning? Were people keeping conversations open for too long?

So naturally, I asked an agent to help me investigate the agent.

## Start with the database

Our hosted deployment was running **OpenCode 1.18.31**, with session history and per-call usage in SQLite. I asked for queries covering September 14 and 15, ran them against the hosted database, and brought the results back to the conversation. That let me look past the dashboard totals and see which sessions and model calls were consuming the tokens.

One Astra conversation had recorded **50.4 million tokens across 121 model calls**, with **49.9 million in cache reads**. Seeing that, I leaned toward long conversations as the explanation. The agent was repeatedly reading a large context, not generating millions of tokens of answers. Reasoning effort did not explain it either: the inspected sessions used the model default, and their reasoning tokens were a small part of the total.

But following sessions back to their first calls complicated that explanation. An Astra investigation had started with about **177K input tokens**, before it had gathered any results. Other sessions started at a similar size. There was already a lot in the request before the conversation had a chance to become long.

I wanted to see how little I could ask and still get that overhead, so I opened a fresh Astra conversation and sent “hi.” It showed **177,444 tokens**. No previous messages, no tool calls, nothing to investigate. At that point, blaming long conversations was getting difficult.

## What was actually in the context?

My next suspicion was our instructions and skills. I had added plenty of those too, and perhaps I had been less economical with context than I thought. I used [OpenCode TokenScope](https://github.com/ramtinj95/opencode-tokenscope) on the fresh session and shared its report with the agent to see what accounted for the input.

TokenScope separates recorded usage from estimates of the content behind it. The report confirmed **177,431 input tokens for a 13-token response**, but the visible conversation was tiny. The skill catalog was estimated at about 3,400 tokens, and the tool definitions it could inspect at about 5,800. Those numbers did not explain the request, and cutting a few paragraphs from my instructions was clearly not going to get us there.

The important detail was what the report could not see: **its tool inventory in our setup omitted the full MCP definitions**. I asked the agent on the hosted machine to inspect those catalogs separately. That led to Meta Ads: 97 tools, with approximately **595K characters** of descriptions and parameter schemas, accounting for about 72% of the measured MCP definition text.

This was not advertising data the agent had retrieved. It was the documentation needed to call the tools, supplied even when nobody was asking about advertising. To confirm it, I disabled Meta Ads and tried the greeting again. It dropped from **177,444 to 54,181 tokens** without changing the model, reasoning effort, or skills. One integration explained roughly 69% of the original request.

I had been thinking about the cost of using those tools. I had not paid enough attention to the cost of making all of them available, all the time.

## I did not want fewer tools

Disabling Meta Ads answered the question, but it was not a fix I wanted to keep. People used that integration. The problem was that a backend investigation had to carry all its definitions too, through request after request. Caching made that cheaper, but left the context occupied. I had also been noticing more frequent compactions, slower responses, and worse answers; this gave me another reason to care about the overhead beyond the usage limits.

What I wanted seemed straightforward: keep the tools available, but let the agent look up how to use them when it actually needed them. I asked whether OpenCode supported that. It turned out our installed version already did, through experimental Code Mode.

I enabled `OPENCODE_EXPERIMENTAL_CODE_MODE=true` on the OpenCode service, restored Meta Ads, and tried “hi” again. This time it used **13,274 tokens**. The full set of integrations was back, but the starting context was roughly **92% smaller** than before. I had not needed to remove tools or rewrite our skills after all.

The idea behind [Code Mode](https://developers.cloudflare.com/agents/model-context-protocol/codemode/) is to let the model write code that calls tools, combines operations, and filters results, rather than bringing every intermediate response back into the conversation. OpenCode pairs that with on-demand discovery: the model starts with a compact catalog, looks up the signatures it needs, and runs JavaScript through `execute` in a confined runtime. MCP still handles the underlying calls; the full catalog no longer needs to accompany every request.

The 92% is a reduction in the greeting's recorded usage, not a claim about our final bill. An actual investigation will still load definitions and results as it works. The difference is that those tokens can now go toward the task somebody asked it to do.

## A better default

[OpenCode 2 makes Code Mode the default for MCP servers](https://opencode.ai/v2/docs/mcp-servers#permissions), which explains a slightly embarrassing part of this: I had been using its beta locally for at least a month. My own integrations were not accumulating the same upfront overhead, so my daily engineering setup had given me little reason to suspect it. The hosted agent is still on V1, where I needed to opt in.

This is not unique to OpenCode either. [Claude Code has MCP Tool Search](https://code.claude.com/docs/en/mcp#scale-with-mcp-tool-search), and [Codex defaults to deferred MCP discovery](https://github.com/openai/codex/pull/29486) on supported configurations. The mechanisms differ, but on-demand discovery is already a normal default across several harnesses. I was discovering why it mattered in a deployment that had not enabled it yet.

I am glad the fix turned out to be straightforward, and that I could keep the MCP integrations people were already using instead of disabling them to bring usage down.

> **A note on how this article was written:** AI helped me reconstruct the investigation from my OpenCode sessions and edit this article. The experience, decisions and opinions are mine.
