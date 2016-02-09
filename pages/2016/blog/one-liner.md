title: "Using debsources API to determine the license of foo.bar"
date: 2016-02-09
category: Blog
tags: ["Debian", "Debsources", "Copyright"]
published: True
author: Orestis
photo: /static/img/debsources-pic.png

Following up on the hack of Matthieu - [A one-liner to catch'em all!](http://matthieu.io/blog/2015/08/16/one-liner-to-catch-em-all/) - and the recent [features](/2016/blog/copyright-and-patches) of Debsources I got the idea to modify a bit the one liner in order to retrieve the license of foo.bar.

The script will calculate the SHA256 hash of the file and then query the Debsources API in order to retrieve the license of that particular file. 

Save the following in a file as license-of and add it in your $PATH

<pre class="prettyprint bash">
#!/bin/bash

function license-of {
    readlink -f $1 | xargs dpkg-query --search | awk -F ": " '{print $1}' | xargs apt-cache showsrc | grep-dctrl -s 'Package' -n '' | awk -v sha="$(sha256sum $1 | awk '{ print $1 }')" -F " " '{print "https://sources.debian.net/copyright/api/sha256/?checksum="sha"&packagename="$1""}' | xargs curl -sS
}

CMD="$1"
license-of ${CMD}
</pre> 

Then you can try something like:

<pre>
    license-of /usr/lib/python2.7/dist-packages/pip/exceptions.py
</pre>

### Notes:

* if the checksum is not found in the DB (compiled file, modified file, not part of any package) this will fail
* if the debian/copyright file of the specific package is not machine readable then you are out of luck!
* if there are more than 1 versions of the package you will get all the available information. If you want to get just testing then add "&suite=testing" after the &packagename="$1" in the debsources link.