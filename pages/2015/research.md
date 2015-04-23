title: Research Project - Cryptographic methods for electronic voting
date: 2015-01-19
category: Blog 
tags: ["Lyon 1","python","cryptography","research"]
published: true
author: Orestis
photo: /static/img/curves.png

For the next two months I'll be working on a research project. The title is "Cryptographic methods for electronic voting" and my aim is to study several techniques used in the domaine of the electronic voting such as homomorphic encryption, mixnets, zero knowledge proofs (ZKP) and many more.

I'll be studying the protocol used in [Helios](https://vote.heliosvoting.org/) created by [Ben Adida](http://ben.adida.net/). The work conducted by Ben Adida is with the El Gamal encryption scheme and so my work will have two main objectives:

- The creation of a module in python that would replace El Gamal with elliptic curves
- The possibility of having an helios voting running with this module.

I have already started reading a lot of papers, mainly Adida's publications as well as Rivest's [course](http://courses.csail.mit.edu/6.897/spring04/materials.html) on MIT (which I find really good). 

The programming language will be python, mainly because Helios is on django. Here is a calendar of my work. 

- The weeks before  the 19 January was a period of familiarisation of elliptic curves and general study of the electronic voting problems
    
- 19/01 - 26/01 Development of homomorphic procedures, decryption and studying ZKP

- 26/01 - 09/02 Development of ZKP and mixnets

- 09/02 - 16/02 Studying the problems around the encoding of messages on the curve
    
- 16/02 - 27/02 Code optimisation, helios integration.

At the moment I have already implemented a general module providing encryption, re-encryption and decryption algorithms on an elliptic curve. I have implemented two types of curves [Montgomery](https://en.wikipedia.org/wiki/Montgomery_curve) and [Edwards](https://en.wikipedia.org/wiki/Edwards_curve). In the future I hope implementing the Weierstrass form as well.

Right now I am working on the ZKP. You can find my work on my [github](https://github.com/oorestisime/elliptic_curves) although at the moment there is a lot of cleaning code to be made and optimisation.

