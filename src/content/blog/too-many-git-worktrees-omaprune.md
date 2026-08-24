---
title: "Working on Many Things at Once Left Me With Too Many Git Worktrees"
path: /too-many-git-worktrees-omaprune/
date: 2026-08-24
tags: ["AI", "Agents", "Git", "Omarchy"]
description: "How forgotten Git worktrees became Omaprune, why Omarchy made it easy to share, and where the plugin trust model still needs work."
---

Working on many things at once has changed how I use Git.

I often have several agent sessions working on the same repository: one implementing a feature, another investigating a bug, and perhaps a third reviewing a pull request. Git worktrees are a useful primitive for this. Each session gets an isolated checkout and branch without cloning the entire repository again or interfering with another session.

This is a fairly recent change for me. A few months ago I avoided worktrees because working with them felt like a hassle: extra paths, branches, cleanup, and more Git state to track. Now LLMs handle almost my entire Git workflow. I rarely create, switch, or remove worktrees myself. As something that stays behind the agent interface, a worktree is much more appealing than it was when I had to manage all of that by hand.

The problem is that creating worktrees became much easier than remembering to remove them.

When I checked my machine last week, I still had nine worktrees created by T3 Code alone. Some were active. Others belonged to sessions I had finished and forgotten about, still holding dependencies, build output, and temporary files.

So I built [Omaprune](https://github.com/oorestisime/omaprune), an Omarchy bar plugin for finding old Git worktrees, seeing how much space they use, and pruning them safely.

## A problem created by my own workflow

The idea appeared after I saw an Omarchy plugin competition and started looking for something useful to build.

I first asked an agent for ideas. Most were bad. My response to one list was essentially: this already exists, no, boring, nope. That was still useful because rejecting generic ideas pushed me to think about what was actually missing from my setup.

Then I noticed the worktrees.

> OHHHHHHHHHHHHHHHHHHH I think I have a nice idea. A plugin that lists worktrees, total space consumed and a way to easily clean them.

The initial product was simple:

- scan my home and temporary directories for worktrees
- group them by repository
- show their branch, size, and estimated activity
- provide shortcuts for worktrees inactive for 7 or 30 days
- remove one worktree or confirm a batch cleanup

It felt especially appropriate as an Omarchy bar plugin. Cleanup is not something I want to remember to run from a dedicated application. I want a small indicator inside the environment where those worktrees are being created.

At 14:16, after discussing the design and finding the name Omaprune, I told the agent to build it. The initial commit landed at 14:28. The rest of the afternoon went into fixing the layout, adding batch cleanup, explaining how activity is estimated, improving the README, taking screenshots, and submitting it to the community marketplace.

The first commit arriving twelve minutes after "Let's build" is funny, but it is not really the important part. A first version is now extremely cheap. Deciding whether it is useful and safe still takes work.

## Omarchy makes small software worth building

What surprised me most was how little ceremony stood between an idea and something other people could install.

An [Omarchy plugin](https://github.com/basecamp/omarchy/blob/quattro/manual/32-shell-plugins.md) is essentially a Git repository with a manifest and some QML. I created the repository, added a README and license, submitted it to the community directory, and anybody could install it with one command:

```bash
omarchy plugin add https://github.com/oorestisime/omaprune.git --enable
```

Compare that with making a small macOS menu-bar application. For [normal distribution outside the App Store](https://developer.apple.com/macos/distribution/), I would need to think about packaging, Developer ID signing, notarization, hosting, and updates. Some of those layers exist for good reasons; others feel like ceremony. Either way, they raise the minimum effort required to share a tiny personal utility.

Omarchy already provides the bar, theming, installation flow, updates, and a place where people can discover the result. There are many workflow annoyances too small to justify building and distributing a full application. Agents reduce the implementation cost, while Omarchy reduces the integration and distribution cost. A personal script can become a native-looking tool and be shared with other people before the idea loses momentum.

## Safe deletion was the real work

The interface was straightforward. The dangerous part was the button that deletes a directory.

Omaprune uses `git worktree remove`, never `rm` or `--force`. It rechecks every worktree immediately before removal and refuses the main worktree, dirty, locked, detached, unreadable, or otherwise ambiguous worktrees. It also makes the limitations visible: ignored files do not make a worktree dirty, so an ignored `.env`, database, or dependency directory can still disappear during cleanup.

Then the [marketplace review](https://github.com/HANCORE-linux/omarchy-plugin-marketplace/issues/949#issuecomment-5361366284) caught something I did not know.

Omaprune used `git status` to detect dirty worktrees. I thought of that as passive inspection. A reviewer pointed out that repository-local `core.fsmonitor` configuration can execute a command during that scan. Repository-controlled names were also going through QML's automatic rich-text handling instead of being rendered explicitly as plain text.

I fixed those issues and looked for adjacent risks. Git clean, smudge, and process filters can execute commands too, while submodules bring their own repositories and configuration. Omaprune now disables filesystem monitors for every Git invocation, protects worktrees with executable filters or populated submodules, avoids recursing into submodules, renders repository values as plain text, and includes tests ensuring those commands are not executed.

The reviewer found one specific bug. Following it properly improved the whole trust boundary.

## The plugin system has its own trust problem

Omarchy is refreshingly direct about third-party plugins: they run as arbitrary, unsandboxed code inside the long-lived shell process. Installation warns users, new plugins start disabled unless asked otherwise, and updates show a diff before applying it.

Those are good safeguards, but the marketplace cannot be treated as a permanent security certificate.

The marketplace validates and approves a particular snapshot. The installed plugin is still a Git checkout of the author's repository. A developer could publish a benign version, get it approved, and later push a malicious update. The same could happen if their GitHub account or repository were compromised. New installations clone the current repository, while updates fast-forward to its latest version.

Users normally see the update diff and must confirm it, but that assumes they can meaningfully review the code. The `--yes` option also allows scripts and agents to skip every prompt. Manifest validation can confirm that a plugin is structurally valid; it cannot prove that its code is safe.

I do not think this means Omarchy should make plugins difficult to build or distribute. That openness is the feature. It does mean the ecosystem will need continuous auditing rather than one review at submission time. Reviewed commits could be pinned or signed, updates could be rescanned, and the marketplace should keep making the difference between "listed" and "trusted forever" impossible to miss.

The tradeoff is similar to many package ecosystems, only more visible because a plugin can access everything available to the user's desktop session. That tension is probably the whole story: Omarchy made it easy to turn a personal annoyance into a native tool other people can install, and I want that ease to remain. We just need to make sure easy distribution does not quietly become easy exploitation.

You can find [Omaprune on GitHub](https://github.com/oorestisime/omaprune) or in the [Omarchy plugin marketplace](https://omarchyplugins.com/plugin.html?id=oorestisime.omaprune).
