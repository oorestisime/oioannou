title: "GSoC Debsources midterm news"
date: 2015-07-22
category: Blog
tags: ["Debian","GSoC","Debsources"]
published: true
author: Orestis
photo: /static/img/deb-art.jpg

Midterm evaluations have already passed and I guess we have also reached a milestone since last week I finished working on the copyright tracker and started the patch tracker.

Here's the list of my reports on soc-coordination for those interested

* [week #1](http://lists.alioth.debian.org/pipermail/soc-coordination/2015-May/002459.html)
* [week #2](http://lists.alioth.debian.org/pipermail/soc-coordination/2015-June/002488.html)
* [week #3](http://lists.alioth.debian.org/pipermail/soc-coordination/2015-June/002506.html)
* [week #4](http://lists.alioth.debian.org/pipermail/soc-coordination/2015-June/002522.html)
* [week #5](http://lists.alioth.debian.org/pipermail/soc-coordination/2015-June/002542.html)
* [week #6](http://lists.alioth.debian.org/pipermail/soc-coordination/2015-July/002567.html)
* [week #7](http://lists.alioth.debian.org/pipermail/soc-coordination/2015-July/002591.html)

## Copyright tracker status

![Copyright tracker](/static/img/copyright-tracker.jpg)

Most of the functionalities of the copyright tracker are already merged. Specifically navigating in the tracker, rendering the machine readable licenses, API functionalities such as obtaining the license of a file searching by checksum or by a package / version / path or obtaining the licenses of many files at once and their respective views. 

Some more functionalities are still under review such as filling the database with copyright related information at update time, using the database to answer the aforementioned requests, license statistics in the spirit of the [Debsources](https://sources.debian.net/stats) ones and exporting a license in SPDX format.

Its going to be pretty exciting when those pull requests are going to be merged since the copyright tracker will be full and complete! Meanwhile I started working on the patch tracker.

## Patch tracker

My second task is the implementation of a patch tracker. This feature existed in Debian but unfortunately died recently. I have already started revising the functionalities of the old patch tracker, started identifying target users, creating use stories and cases. Those should help me list the desired functionalities of the tracker, imagine the structure of the blueprint and start writing code to that end.

It is going to be a pretty exciting run of 1 month doing this as my knowledge on the Debian packaging system is not that good just yet. I hope that until Debconf some of the functionalities of the patch tracker are going to be ready.


## Debconf

My request for sponsorship for Debconf was accepted and I am pretty excited since this is going to be my first Debconf attendance. I am looking forward meeting my mentors (Zack and Matthieu), the fellow student working on Debsources (Clemux) as well as a lot of other people I happen to chat occasionaly during this summer. I ll arrive on Friday 14th and leave on Sunday 23.   

![Debconf 2015](/static/img/dc15.png)
