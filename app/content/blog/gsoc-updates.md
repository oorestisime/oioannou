---
path: /gsoc-updates
title: "GSoC Debsources updates"
date: 2015-06-23
tags: ["Debian", "GSoC", "Debsources"]
photo: /img/google-summer.jpg
---

The first 4 weeks have been really great. I had the chance to work on the new webapp, the copyright tracker. Here are my first 4 reports for the weeks:

- [week #1](http://lists.alioth.debian.org/pipermail/soc-coordination/2015-May/002459.html)
- [week #2](http://lists.alioth.debian.org/pipermail/soc-coordination/2015-June/002488.html)
- [week #3](http://lists.alioth.debian.org/pipermail/soc-coordination/2015-June/002506.html)
- [week #4](http://lists.alioth.debian.org/pipermail/soc-coordination/2015-June/002522.html)

## Summary

During these weeks i completed the navigation (by prefix, list of versions etc) for the copyright tracker, the license rendering and the API for searching by checksum and by package/version/filename.

Still under review the batch API (request many files at once) and the the respective views for the API.

In the following weeks I ll work on the database and the plugins to mine license information on update time.

## Experience

The experience i accumulate every week is immense. During the review process of my code i receive great feedback from zack, matthieu, and jpleau. It is a great chance for everyone to improve his/hers coding skills. At the university we barely get any feedback on our code, let alone communicate directly with professors to find the best solution for a given problem.

I think it gets development in another level. For example at the university we use git/mercurial for our projects, although we don't really pay attention at commit messages and we marginally make use of these tools besides 'commit pull push'. During the last weeks i had the chance to use far more commands in order to squash amend rebase commits to have a beautiful and useful log history! And this is just a minor example. All in all I think it is a great introduction to the free/open source community for somebody, like me, who has been for years only a user and couldn't find the opportunity to contribute!

And don't get me wrong, gsoc is not only about coding skills. At least for myself having the chance to get just a small taste of how the Debian community works, gets organised, get things done (!) is somehow priceless!

![Summer of code](/img/google-summer.jpg)

## TDD

I have finally understood why test driven development is so powerful. As i am advancing in the project i am sometimes obliged to retouch some areas, refactor pieces of code. Having a great test suite that keeps you on track about the changes, and possible outages in advance is pretty powerful.

## What is coming

I feel the project is on the right path. Both clemux (fellow gsoc student working on debsources) and me are advancing in a productive pace. I hope that soon enough the copyright Blueprint will be completed (most notable pending functionalities are the plugins-hooks to mine the licenses at update time, introduction of at least another license oracle possible ninka, statistics) so that everyone can take profit of the new tools provided by DebSources.

Although we haven't talked much about it the patch tracker should also come into the play sooner rather than later.

Stay tuned!
