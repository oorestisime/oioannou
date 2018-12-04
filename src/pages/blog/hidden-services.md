---
path: /hidden-services
title: Tor hidden services - dynamic IP
date: 2014-10-29
tags: ["Tor","Tutorial","dynIP"]
photo: ./img/tor-logo.png
---

This post mainly covers reasons behind my motivation on having a Tor hidden service on my Raspberry Pi as well as a small tutorial configuring this. I am using my rpi as a development server testing different open source projects, as an [irssi](http://www.irssi.org/) service in order to get the backlog on different channels I am interested in and to work on different projects requiring a server.

## Dynamic IP

This setup has a "flaw" when the internet provider is serving dynamic IPs and is requesting more money (!) in order to provide a fix IP. So the main problem was to ssh on the raspberry pi when I was not at home and thus needing my public IP. At the beginning I tried using services such as noip but I was not satisfied, most notably because for a free service you need to login once a month to the service. And then I discovered the tor [hidden services](https://www.torproject.org/docs/hidden-services.html.en).

<img src="./img/tor-logo.png">

## Tor

In case you do not know anything about the tor project here is a part from their description:

>  Tor is a network of virtual tunnels that allows people and groups to improve their privacy and security on the Internet. It also enables software developers to create new communication tools with built-in privacy features. Tor provides the foundation for a range of applications that allow organizations and individuals to share information over public networks without compromising their privacy.

You can also check more information at their [website](https://www.torproject.org/about/overview.html.en)

## Hidden Services

> Tor makes it possible for users to hide their locations while offering various kinds of services, such as web publishing or an instant messaging server. Using Tor "rendezvous points," other Tor users can connect to these hidden services, each without knowing the other's network identity.

If you are interested more about the technical aspects behind the implementation you can check this upon their [website](https://www.torproject.org/docs/hidden-services.html.en).

Hidden services provide the following service: it allows your to offer a web server, SSH server, etc., without revealing your IP address to its users. In fact, because you don't use any public address, you can run a hidden service from behind your firewall. This comes in handy when your are behind a dynIP as I do.

## Install a hidden service and configure SSH-server

#### Pre-requisites

You need a server running on the machine you are interested in configuring a hidden service. You can choose for example nginx and configure it to serve a website locally with this configuration:

```bash
server {
   listen   127.0.0.1:8080;
   server_name  localhost;
   server_tokens off;
   access_log  /dev/null;
   error_log  /dev/null;
   location / {
       root   /var/www;
       index  index.html index.htm;
   }
```

Then you can create a simple web page and verify that everything is running ok.

#### Install Tor

Then we proceed with the installation of tor. As a root run the following commands:

```bash
	apt-get update
	apt-get install tor
```

After the installation you need to edit the file /etc/tor/torrc and add the following lines:

```bash
	HiddenServiceDir /var/lib/tor/hidden_service/
	HiddenServicePort 22 127.0.0.1:22
```

where HiddenServiceDir will be the directory where the private key and the hostname of the hidden service will be stored and the HiddenServicePort the port and address of the service. So the hidden service is accessible at the address you can find at the /var/lib/tor/hidden_service directory in the file hostname.

#### Connecting via tor to the SSH server

At our machine we need to install tor using the same command we used for the server. The last configuration we need is at the .ssh/config file. Add the following:

```bash
Host torpi
   Hostname hostname.onion
   User ssh_user
   IdentityFile ~/.ssh/id_rsa
   Port 22
   CheckHostIP no
   Compression yes
   Protocol 2
   ProxyCommand connect -R remote -5 -S 127.0.0.1:9050 %h %p
```

where hostname.onion is the address you found in the hostname file and ssh_user the user at the server. I am connecting to my server using a rsa key. If you are connecting using password then delete the line with <i>IdentifyFile</i> The last commands we need to use are the one to get tor running and the one to ssh via tor.

```bash
	service tor start
	ssh torpi
```

