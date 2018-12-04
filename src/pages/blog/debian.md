---
path: /debian
title: Install Debian Jessie on MacBookPro
date: 2014-11-11
tags: ["Debian","Tutorial","Mac","Linux"]
photo: ./img/roundedwheezy.png
---

This tutorial covers the process of installing Debian Jessie on a MacBookPro. I've chosen to document this process as I found it hard to overcome some problems I had during my several tries installing Debian on a Mac, mostly problems with grub and making things work (Nvidia, keyboard backlit, wifi etc).

## Motivations

The main reason I wanted to install Debian was the need of more freedom for my pc. I wanted to get out of the closed system the mac is offering, although it works pretty good.
In addition I was tired of Apple’s profit-driven vagaries and of course my recent interest in open source and DIY contributed immensely to my decision.

## What you need!

Well you don't really need anything abnormal besides:

* MacBook
* Usb
* Ethernet cable

## Pre-requisites

In this tutorial I am documenting the process of installing Debian as a dual boot solution. You should have by now freed the space you want to allocate to the Debian partition as well as used the Disk Utilities application to partition your disk.

## Lets get to work!

Firstly you will need an EFI boot-loader. As refit is now longer active you actually have just one possibility which is called [rEFInd](http://www.rodsbooks.com/refind/). Installing it is pretty simple as you just need to download the sources and then use:

```bash
	sudo ./install.sh --alldrivers
```

#### Debian bootable USB

The next step is to create a Debian bootable USB:

* Download the latest Jessie version
* Run diskutil list
* Run diskutil unmountDisk /dev/sdX where sdX is your USB found with the previous command
* Insert the debian iso using: sudo dd if=jessie.iso of=/dev/sdX bs=4M; sync where jessie.iso corresponds to the path where the iso is located and sdX the unmounted USB drive. This will take a while.
* Eject the USB using : diskutil eject /dev/sdX

#### Install Debian

You should by now have rEFInd installed and a bootable USB drive. You should now restart the MacBook and hold down the option key. Select to boot from the USB drive and proceed as a normal Debian install. Keep in mind that you won't be able to connect to wifi so you need an ethernet cable to connect to the internet for the necessary downloads. You can also choose manual procedure on partitioning to make sure you did not choose the Macosx partition and in order to setup the swap partition.

After the installation you have to reboot and hold down the alt key. You can now choose to boot to the Debian partition. If the boot process happens to stop at an error about the "nouveau" drivers then you should proceed as follows:

* After the BIOS loading press shift.
* You will the menu for choosing boot options. Using the key-arrows go to the default one and press E
* You are now presented with the GRUB2 boot commands. Find the line starting with linux /boot/... and ending quiet splash and add nomodeset at the end.
* Press ctrl-x to boot with the new command.

To change this permanently after go to the /etc/default/grub file and change the line with the GRUB2 commands as follows:

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet nomodeset"
```

You now have a working Debian Jessie on your MacBook. Next we need to configure wifi, nvidia the keyboard and some other things like the buttons for brightness.

## Wifi

To get wifi to work you need to update your apt sources.list to include the non-free packages. Then run the following commands:
```bash
apt-get update
apt-get install linux-headers-$(uname -r|sed ‘s,[^-]*-[^-]*-„’) broadcom-sta-dkms
modprobe -r b44 b43 b43legacy ssb brcmsmac
modprobe wl
```
You should now be able to see wifi settings at the network manager.

## Keyboard Mapping

I happen to have a problematic ctrl button. As the cmd is now useless I remapped the keys. To do that create a .Xmodmap file and add the following:

```bash
clear control
clear mod4

keycode 133 = Control_L NoSymbol Control_L
keycode 134 = Control_R NoSymbol Control_R
keycode 37 = Super_L NoSymbol Super_L

add control = Control_L
add control = Control_R
add mod4 = Super_L
```

Then run xmodmap .Xmodmap to take in consideration these alterations.

## Brightness & Backlit keyboard

You need to install some drivers to get this work. Debian has this covered [pretty good](https://wiki.debian.org/NvidiaGraphicsDrivers#Installation).

## General feeling

In order to get things work you definitely need some time. I had many problems with the "nouveau" errors so I hope if anyone comes across this error would find a solution here. Two months after the installation I am extremely satisfied with my decision. I am considering deleting the Mac partition and having only Debian on my computer.

Don't hesitate to contact me if you are experiencing similar problems to the ones i described. I might have passed them as well :) .

Big thanks to [this](https://wiki.debian.org/InstallingDebianOn/Apple/MacBookPro/11-1) and generally to the Debian [wiki](https://wiki.debian.org/).
