title: Sublime Text - Plugins - Themes - Configurations
date: 2014-10-23
category: Blog 
tags: ["Software","Sublime Text","text-editor"]
published: true
author: Orestis
photo: /static/img/glacier.jpg

I am using Sublime Text on a daily basis for almost anything. From keeping notes to programming to writing reports. I find that it offers great capabilities with its great interface and the numerous plugins available. If only it was under a CC licence. 

What i find really good with this text editor is the ability to have everything under control. It has so many key bindings that are really usefull when you actually code a lot. I wont write an article about how great it is as it is a topic widely covered. I am aiming to present you some of my main configurations, installed plugins and the key bindings i am using most often.

## Package manager

First things first. The greatest plugin of all is package manager. You can find it [here](https://sublime.wbond.net/) and the reason behind it's greatness is the simplicity which is offering upon installing uninstalling and generally using this text-editor. You can call the package manager pressing shift-ctrl-p.

## Theme

This is more about each ones taste. Mine is Glacier and you can find it via the package manager. Glacier is a flat, colorful theme/scheme combo for Sublime Text. It focuses on using saturated colors to introduce more contrast and visual interest.

<img src="/static/img/glacier.jpg">

## Plugins

I am using a fair number of plugins so I ll present you the most important ones:

#### Rsub

If you are working on servers, whee you have root access, or other devices where you ssh to, like a raspberry pi, and you do love ST then you should consider this plugin. Directions to install are [here](https://github.com/henrikpersson/rsub). After you install you can use a reverse tunnel to connect to the machine you want. When you open a file on the machine it is automatically transfered to your local machine so that you can edit it with ST.

<code>
ssh -R 52698:localhost:52698 serverAdd
</code>

#### Emmet

This plugin has vastly improved my speed writing html/css code with the solutions it offers. You only need to check their manual and you will understand that it is actually a must!

#### LaTeXtools

I tend to write my reports using LaTeX and this plugin is great. It offers the build command and some code completion.

#### Language - Francais - French

This is a spelling plugin. It is better than the ones listed on github and thus i use this one.

#### The rest

I have also installed many packages for the university like Awk and Prolog for the programming languages, Jinja for the jinja templates I use with flask and so on.




