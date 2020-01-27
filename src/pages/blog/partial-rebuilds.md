---
path: /gatsby-partial-rebuilds-diy
title: "One step closer to ... Gatsby incremental builds: the DIY approach!"
date: 2020-01-29
tags: ["Gatsby", "incremental builds"]
photo: "./img/me.png"
---

In case you landed here by accident or out of sheer curiosity, [Gatsby](https://www.gatsbyjs.org/) is one of the many tools evolving around the JAM stack and serverless universe. It goes by many definitions, a static site generator, an approach to building hybrid applications that live somewhere between the static and dynamic land but the one I like the most is being a progressive web-app generator that optimizes your static pages and enables you to build dynamic ones, a.k.a create-react-app on steroids.

Last few months it has been getting, deservedly, a lot of traction and many sites have been popping everywhere. A trip to their [showcase gallery](https://www.gatsbyjs.org/showcase/) can give you a fair share of an idea. A small issue with that gallery is that there are not a lot of hybrid/dynamic apps and there are not a lot of examples of large websites with lot of pages being build with Gatsby. While what we are building at [Bold.org](https://bold.org) covers both cases, this article will focus on the second and will try to outline the problems faced and the DIY solution to what the community has been calling incremental builds.

**Disclaimer:** I know this solution won't and is not pretending to be universal. One of the side goals of this article is to shred some light into some hard, for now, problems facing on big scaling applications using Gatsby and present a solution to light up the discussion. The Gatsby team has been ligthtly talking about incremental builds and I am sure they are working hard to find a solution to accomodate a larger share of sites.

**Disclaimer 2:** you read this and you are convinced this is for you, but please before you go around writing code and converting your deployment around keep in mind that even if this approach has been in production for a few weeks without any issues it might not suit your case and there are a lot of things to consider before start implementing this. If this breaks your production please don't hold me responsible :)

## The use case

Without getting into implementation details, the use case for Bold.org has been particularly intriguing. For those just finding out about Bold, it is platform aiming to eliminate student debt bringing closer donors and students. A student has the ability to create [a free profile](https://bold.org/apply/) and apply to a growing number of scholarships. The platform hosts a fair amount of static pages along with the client site routes that keep the platform dynamic. Those static pages are your typical index, about page, as well as the scholarship pages but more importantly the public student profiles. Whenever a student creates a profile on Bold.org, they get a public profile showcasing the student experience, hobbies etc. These pages aren't meant to move a lot and find themselves in a hybrid static/dynamic setting making themselves a great candidate for Gatsby pages bringing in the speed, accessibility and SEO improvements that Gatsby provides.

Since Bold.org aims to accomodate in their platform thousands of students, being at more than 15.000 already, the solution needs to be as robust as possible and have the student profiles available in a short interval rather than waiting hours/days for them to appear publicly. While the platform is growing, getting new students and existing ones modifying their profile, we needed a solution to build those profiles. At the beginning fully rebuilding the site at a set interval was an acceptable solution. At a few hundred students/pages this solution is perfectly fine since the build is at the order of a few minutes. But this is not a viable solution as the site grows. In addition rebuilding every hour thousands of student profiles that might have not been modified is a waste of resources be it time or money or both.

Existing deployment infrastructure was on AWS making use of Amplify. Builds started at a few minutes reaching to 25-30 minutes when it became clear a better solution was needed. And build duration was only going to go up so the problem was real and coming at us at fast pace.

While I was investigating Gatsby builds there were 3 essential steps in the Gatsby build pipeline that could be identified as bottlenecks

1. source and transform nodes which is sourcing data from APIs or filesystem

2. building production js/css files

3. creating the Server Side Rendered html pages

Two majors keys to find a solution for this problem were:

- student profiles don't necessarily change over time or at least not **all**. Parallel to a blog website not all articles are changing over time. Only new ones or modified ones are actually needed to be (re)build.

- layout for these pages is exactly the same. Only thing changing is the content. Same goes for a blog, the articles (besides maybe generating sharp images) have the same layout and the production js/css files don't need to be updated when adding new content.

With these in mind the possible solution would need a backend, tracking student modifications and additions, a lighter Gatsby build that fetches updates and builds html pages caching the css/js production files and finally more control over the deployment infrastructure in order to selectively push files into the server. All these while keeping possible the full rebuilds to account for new features or layout changes.

First point was entirely depending on the backend codebase and was fairly easy to implement, the rest needed a custom solution. And while the infrastructure was not a hard problem to tackle by moving the Amplify build into a CI and serving the content from S3/Cloudfront the Gatsby process was the most intriguing problem to solve.

## The Gatsby build process

Looking at the Gatsby build process more closely a few interesting things happen:

- deletes css and html files at the very beginning
- sources data
- creates and runs page/static queries
- builds js/css production files
- builds html files

For a solution to work it surely did not need to delete css files; spending time to recreate production css/js files was pointless for incremental builds. What's needed is to create new html pages for those new students and edit/replace the existing ones for the students who modified their profile. This would equal adding new products and modifying existing ones in a store, adding new content in blog etc.

Some of these features are available in develop mode for example when you modify the content of a blog being in a filesystem file. On the other hand develop mode doesn't actually build html pages and it only runs **once** the source and transform nodes, so all nodes depending on an API can't be updated. What we had to research was how to create a hybrid approach for the incremental builds. A few ideas would be:

- run a long running process that we send data and runs only the needed steps (page queries, build html files)
- add html build support in develop mode and build a subscription model for receiving updates similar to how it happens for filesystem nodes
- create a lightweight Gatsby build that only runs a few steps and outputs html

In all the approaches there were some caveats or problems to solve, how do we hook in the latest production css/js files for a long running process, how do we create a subscription model, how do we make sure these new builds don't interfere with full rebuilds, maintainability of a custom Gatsby pipeline etc.

## The DIY approach

After spending time looking at the different approaches the decision was to build the third one. The ticket contained the following tasks:

- a backend aware of updated/new profiles tracking deployment dates (check)
- create a new lightweight Gatsby build process
- a locking/mutex mechanism to avoid colissions with full rebuilds
- an infrastructure allowing us to selectively push files in
- a CI enabling us to cache css/js files between builds

### Enter gatsby-partial.js

This approach couldn't be fully called incremental builds, there were no atomic builds and it was still building the about, homepage or similar pages. So we decided to call this **partial build**! And turns out building such a process wasn't very complicated and it doesn't seem to be hard to maintain. Peeking at the Gatsby build process the different steps are called in functions and we could reuse most of the code to achieve partial builds.

The new process would run the bootstrap process to fetch data, then run page queries, ignore completely the production css/js build step and finally build the html pages. Only thing I needed to solve is how to cache the css/js files that are deleted at the start of the bootstrap process, which was possible by running a few lines of code before and after that function call to cache and restore those files.

The Gatsby build process and especially the file calling the necessary steps doesn't seem to be updated fairly often. To maintain this approach one needs to be looking for updates in that file and apply what is needed in the custom one. The additional code is minimal and clearly annotated.

```js
/* BOLD CODE: cache css files */
if (!fs.existsSync(PARTIAL_CACHE)) {
  fs.mkdirSync(PARTIAL_CACHE);
}

glob.sync(`${PUBLIC_FOLDER}*.css`).forEach(file => {
  const newPath = `${PARTIAL_CACHE}${path.relative(PUBLIC_FOLDER, file)}`;
  console.log(`Caching ${file} -> ${newPath}`);
  fs.copyFileSync(file, newPath);
});

/* END BOLD CODE: cache css files */

...
/* BOLD CODE: copy back css files */
glob.sync(`${PARTIAL_CACHE}*.css`).forEach(file => {
  const newPath = `${PUBLIC_FOLDER}${path.relative(PARTIAL_CACHE, file)}`;
  console.log(`Moving ${file} -> ${newPath}`);
  fs.copyFileSync(file, newPath);
});

/* END BOLD CODE: copy back css files */

```

To couple this approach I modified the in-house plugin to fetch data from the Bold.org API to account for full rebuilds and partial builds. As soon as the approach was validated the next was was to figure out how we would use this file in a CI.

### Enter CircleCI along with S3/Cloudfront

The new build would only work in environments were we can selectively push files. Unfortunately that ruled out staying on Amplify which had served its purpose pretty good handling all the infrastructure in a few clicks. It also rules a fair number of other solutions in the JAM stack universe such as Netlify and Zeit. The solution was to host the application in an S3 bucket and add in front Cloudfront to profit from the CDN capabilities.

Moving the build process from Amplify to [CircleCI](https://circleci.com) had two nice side-effects and one unfortunate:

- we sped up our build by 80%. Under some weird circonstances Amplify was taking too long to extract and save cache in the builds. We divided the builds by 2 just by not caching anything as a first step! Then CircleCI build was also a lot faster since there was no boostrapping needed for the build. Amplify spends the first 4-5 minutes spinning an environment for the build, time that was saved just by moving to CircleCI.

- more control over the hosting enabling us to let the application delete files when needed (deleting a page, 301 a page etc) and also allow us to better investigate production files.

The unfortunate one was having to use `Lambda@Edge` for a number of operations such as, configuring which files to serve when hitting client only routes or even adding a basic authentication in the staging environments. Seems that Amplify handles that automatically and the reason this is unfortunate is that Lambda costs are still super vague and don't allow us to make safe bets about its usage.

### Structuring the CircleCI builds

To fill in all the requirements we needed to have both full rebuilds for when merging in master and partial builds running at a selected interval. We also had to make sure that a partial rebuild wouldn't run when a full rebuild was ongoing since it would mess up deployment and cache.

To achieve this a small utility script to verify whether a CircleCI workflow was ongoing was created hitting their API and either cancelling ongoing ones when we start a master build or exiting early from partial builds when a master build was ongoing.

In terms of cache what we needed is to save the full build when merging on master and always restore the most up to date in the partial build to retrieve the css/js files which was already baked in CircleCI.

Here's how a simplified configuration file looks like:

```yaml
commands:
  bootstrap-frontend:
    steps:
      - checkout:
          path: ~/bold
      - restore_cache:
          keys:
            - node-v1-frontend-{{ .Branch }}-{{ checksum "~/bold/frontend/package-lock.json" }}
      - run:
          name: install-packages
          command: npm i
      - save_cache:
          paths:
            - ~/bold/frontend/node_modules
          key: node-v1-frontend-{{ .Branch }}-{{ checksum "~/bold/frontend/package-lock.json" }}
jobs:
  deploy-frontend:
    working_directory: ~/bold/frontend
    steps:
      - bootstrap-frontend
      - run:
          name: Verify no build running
          command: npm run isBuildRunning -- --fullBuild
      - run:
          working_directory: ~/bold/frontend
          name: Build frontend
          command: npm run buildDeploy
      - run:
          working_directory: ~/bold/frontend
          name: Deploy frontend
          command: npm run deploy
      - save_cache:
          key: gatsby-cache-{{ .Branch }}-{{ epoch }}
          paths:
            - ~/bold/frontend/public
            - ~/bold/frontend/.cache
  rebuild:
    working_directory: ~/bold/frontend
    steps:
      - checkout:
          path: ~/bold
      - restore_cache:
          keys:
            - node-v1-frontend-{{ .Branch }}-{{ checksum "~/bold/frontend/package-lock.json" }}
      - restore_cache:
          keys:
            - gatsby-cache-{{ .Branch }}-
      - run:
          name: Verify no build running
          command: npm run isBuildRunning
      - run:
          when: on_fail # If previous command fails then we run this one
          name: Cancel this build if other build is on
          command: circleci-agent step halt
      - run:
          environment:
            - FULL_REBUILD: false
          name: Partial rebuild
          command: npm run partialRebuild
      - run:
          name: Deploy to s3
          command: npm run deploy
workflows:
  version: 2
  build-deploy:
    jobs:
      ....
      - deploy-frontend:
          name: deploy-frontend-production
          filters:
            branches:
              only:
                - master
  partial-rebuild:
    jobs:
      - rebuild:
    triggers:
      - schedule:
          cron: "0 0,2,12,14,16,18,20,22 * * *" # POSIX syntax
          filters:
            branches:
              only:
                - master

```

## Lessons learnt

Building the infrastructure around this solution and getting my hands full on AWS configuration been greatly rewarding as a learning experience. Spending time investigating and learning Gatsby internals has been really fun and exciting.

What's more important for me is that the solution and approach, at least for our use case, validates the choice of investing in the JAM stack and particularly Gatsby. The application is well covered to scale correctly and we wouldn't need to invest more time in the near future on our infrastructure and setup letting us to focus on the platform.

## Where to take it from there.

If you read the disclaimers you might feel that this a repeated section, but once again I want to highlight that this approach works well for our use case and while I can think of many other examples where this could be applied it doesn't necessarily mean it would work well.

For the applications in Netlify or similar where atomic builds are a must while this approach doesn't solve anything it could be a beginning. If this would be a necessity I would research a way to pull in all the cache, run a Gatsby partial build and restore inside the already build html files to allow the process to push everything again and create an atomic build. There are some hard problems there I could think

- handling the cache because we are talking about many more files (html, json, images etc)
- build process might also need tapping to avoid building css/js files.

A full solution would also avoid building the pages directory since during a partial build they wouldn't change.

Who knows maybe this is the approach to create a more generalised solution that covers many more use cases. An appoach that could fit well in Gatsby Cloud, developped by the Gatsby team!
