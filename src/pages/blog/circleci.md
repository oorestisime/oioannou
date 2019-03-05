---
path: /build-on-circleci-deploy-netlify
title: "Building gatsby on CircleCi and deploying on Netlify"
date: 2019-03-06
tags: ["Gatsby", "Netlify", "CircleCi"]
photo: ./img/me.png
---

When deploying gatsby sites, Netlify is my go to option. It is free, with great features and with a solid interface.
Only issue I am facing: builds are slow (about 1.5-2 times slower than my PC) and the hard timeout of 15 minutes is sometimes easy to reach.

Normally deploying Gatsby sites is blazing fast! Like pretty impresive fast. There is a significant factor though that can greatly influence the build time, **image processing**!

It all started during the 3rd blog post on [OAsome blog](https://oasome.blog). Build times were worringly growing but I didn't take the time to look much at it! After all if the builds were succeding why would I ?

Then builds actually started to fail! I was hitting the 15 minutes hard limit and I was annoyed I couldn't profit by the automatic deployment.

### Trying gatsby-plugin-netlify-cache

First temporary solution I tried for a fair amount of time was to use a caching solution for all the image processing I was putting up during the build times. And it worked! Simple and efficient.

At least I thought so at the time! Turns out not so efficient for netlify since their cache was growing pretty big!

Then came the time I had to [rebuild my website from scratch without cache](/migrate-from-mui-to-grommet), and I couldn't because the plugin had no cache and I was hitting the 15 minutes again!

It was time for new experimentation.

### Trying CircleCi as a builder

I reached out to Dustin from gatsby core team about this problem and suggested to build the website on CircleCi and then deploy on netlify using their CLI.

This solution was pretty promising since I didn't need to change any of my code and it would work for the future!

Next hicup though was that even if I wasn't hitting timeout limits on CircleCI my builds were running OOM!

Turns out processing big images takes a lot of resources, so there I was back to square one!

### Pre-optimizing pictures

But [Dustin](https://twitter.com/oorestisime/status/1096433363261579264) had a new idea! Optimize my images to reduce both time needed to build and resources! And it worked great and enabled [to open an issue](https://github.com/gatsbyjs/gatsby/issues/11798) on Gatsby to warn users when optimizing heavy images

By calculating the necessary image sizes I needed with regards to my layout I managed to greatly reduce build time! I no longer needed the cache plugin and I actually learnt a few things in the process!

I had my website building on my computer in 3 minutes so I thought i didn't need CircleCI anymore

### Getting frustrated by slow netlify builds

Well I was wrong again! 3 minutes on my PC equals to 7 minutes on Netlify. Pretty unfortunate outcome! While I wouldn't be hitting the timeout anytime soon I thought I should solve this issue once and for all!

### Building on CircleCI and deploying on Netlify

I got back to check again with CircleCI and i was pretty amazed! It was faster than my computer logging at around 2-3 minutes! All I needed now was to configure my workflow to build on CircleCI and deploy both preview builds and production builds on Netlify.

Luckily this wasn't hard!

```yaml
version: 2.1
executors:
  node-executor:
    docker:
      - image: circleci/node:10
commands:
  gatsby-build:
    steps:
      - checkout
      - restore_cache:
          keys:
            - yarn-cache-{{ checksum "yarn.lock" }}
      - run:
          name: Install Dependencies
          command: yarn install
      - save_cache:
          key: yarn-cache-{{ checksum "yarn.lock" }}
          paths:
            - ./node_modules
      - run:
          name: Gatsby Build
          command: yarn build
workflows:
  version: 2
  build-deploy:
    jobs:
      - build:
          filters:
            branches:
              ignore:
                - master
      - release:
          filters:
            branches:
              only:
                - master
jobs:
  build:
    executor: node-executor
    working_directory: ~/repo
    steps:
      - gatsby-build
      - run:
          name: Netlify Deploy
          command: ./node_modules/.bin/netlify deploy --dir=public
  release:
    executor: node-executor
    working_directory: ~/repo
    steps:
      - gatsby-build
      - run:
          name: Netlify Deploy
          command: ./node_modules/.bin/netlify deploy --prod --dir=public
```

There's still one improvement left! I would like CircleCI to report the netlify preview URLs on the corresponding PR.

## Aftermath

With current configuration, it takes 5 minutes to build and deploy my website! This means I can basically build my website around 180 times per month since I am on the free tier on CircleCI.

Needless to say this is more than enough since for now the builds aren't that recurring!

Even if i quadraple my build time with 4 times the amount of pictures I could still build 50 times the website. Still more than enough!
