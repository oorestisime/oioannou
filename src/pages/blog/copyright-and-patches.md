---
path: /copyright-and-patches
title: "Debian - your patches and machine readable copyright files are available on Debsources"
date: 2016-02-08
tags: ["Debian","Debsources", "Copyright", "Patches"]
photo: ./img/debsources-pic.png
---

** TL;DR All Debian license and patches are belong to us. Discover them [here](https://sources.debian.net/copyright) and [here](https://sources.debian.net/patches).**

In case you hadn't already stumbled upon *[sources.debian.net](https://sources.debian.net/)* in the past, Debsources is a simple web application that allows to publish an unpacked Debian source mirror on the Web. On the live instance you can browse the contents of Debian source packages with [syntax highlighting](https://sources.debian.net/src/cowsay/latest/cowsay/), search files matching a [SHA-256 hash or a ctag](https://sources.debian.net/advancedsearch/), query its [API](https://sources.debian.net/doc/api/), [highlight lines](https://sources.debian.net/src/cowsay/latest/cowsay/#L38), view accurate [statistics](https://sources.debian.net/stats/#size_current) and [graphs](https://sources.debian.net/stats/#hist_source_files). It was initially developed at IRILL by [Stefano Zacchiroli](https://upsilon.cc/~zack/) and [Matthieu Caneill](http://matthieu.io/).

During GSOC 2015 I helped introduce two new features.

## License Tracker

Since Debsources has all the debian/copyright files and that many of them adopted the [DEP-5](https://www.debian.org/doc/packaging-manuals/copyright-format/1.0/) suggestion (machine readable copyright files) it was interesting to exploit them for end users. You may find interesting the following features:

* an [API](https://sources.debian.net/doc/api/#copyright) that allows users to find the license of file "foo" or the licenses for a bunch of packages, using [filenames](https://sources.debian.net/copyright/api/file/gnubg/latest/doc/gnubg/gnubg.html/) or [SHA-256](https://sources.debian.net/copyright/sha256/?checksum=d77d235e41d54594865151f4751e835c5a82322b0e87ace266567c3391a4b912) hashes

* a better looking [interface](https://sources.debian.net/copyright/license/python-django/stretch/) for debian/copyright files

Have a look at the documentation to discover more!

## Patch tracker

The old patch tracker unfortunately died a while ago. Since Debsources stores all the patches it was, probably, natural for it to be able to exploit them and present them over the web. You can navigate through packages by prefix or by searching them [here](https://sources.debian.net/patches). Among the use cases:

* a [summary](https://sources.debian.net/patches/cowsay/latest/) which contains all the patches of a package together with their diffs and summaries/subjects
* links to view and download (quilt-3.0) patches.

Read more about the [API](https://sources.debian.net/doc/api/#patches)!

## Coming ...

* In the future these informations will be added in the DB. This will allow:

    * the license tracker to provide interesting statistics and graphs about licensing trends (What do Pythonistas usually choose as a license, how many GPL-3 files are in Jessie etc). Those are going to be quite accurate since they will take into account each file in a given package and not just the "general" license of the package.

    * the patch tracker to produce a list of packages that contain patches - this will enable providing links from PTS to the patch tracker.

* Not far in the horizon there is also an initial work for exporting debian/copyright files into SPDX documents. You can have a look at a beta / testing version on [debsources-dev](http://sourcesdev.debian.net/copyright/). ([Example](http://sourcesdev.debian.net/copyright/license/gnubg/latest/))

I hope you find these new features useful. Don't hesitate to report any [bugs or suggestions](https://bugs.debian.org/cgi-bin/pkgreport.cgi?pkg=qa.debian.org;tag=debsources) you come accross.
