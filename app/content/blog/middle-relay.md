---
path: /middle-relay
title: Tor middle relay - Raspberry pi
date: 2015-01-11
tags: ["Tor", "Tutorial", "rpi"]
photo: /img/tor-middle.jpg
---

Recently I took some time to configure my raspberry pi as a middle relay. Exit relays can be dangerous depending where you live so I decided to help a bit tor with a middle relay.

This was easy to do and fun, and its nice doing something fun and easy while helping out others!

## What you need!

Well not much, just a raspberry pi and an internet connection!

## Getting ready

As always update and upgrade

```bash
 apt-get update
 apt-get upgrade
```

Then you might want create another user just for tor using:

```bash
 adduser tor
```

and edit the sudoers file "/etc/sudoers".

## Install and configure Tor

Then we proceed with the installation of tor and the modification of the torrc. As a root run the following commands:

```bash
	apt-get install tor
  nano /etc/tor/torrc
```

You must edit the following lines

```bash
SocksPort 0
Log notice file /var/log/tor/notices.log
RunAsDaemon 1
ORPort 9001
ExitPolicy reject *:*
Nickname chooseOneHere
RelayBandwidthRate 100 KB
RelayBandwidthBurst 200 KB
```

The difficult part is opening your ports. You need to enter in the configuration mode of your router and configure the ports so that the 9001 traffic is drived on the rpi.

As soon as you have done this then you need to restart tor

```bash
service tor restart
```

And check for a message like "Tor has successfully opened a circuit. Looks like client functionality is working at the end."

That is just about it! After about an hour you can search your relay at the [Atlas](https://atlas.torproject.org/) Atlas or [Globe](https://globe.torproject.org/) for the nickname you configured, to make sure it's there.

And here's some tips when you run relays. [link](https://www.torproject.org/docs/tor-relay-debian.html.en#after)
