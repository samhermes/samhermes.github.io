---
layout: post
title: Deploying a repository to a subdirectory of GitHub Pages site
date: 2019-04-20
---
My site is currently hosted on GitHub Pages, which means that anytime I want to put something on the site, I have to make a commit and push it up. This works great for most things, but if I want to work on a larger project and “host” it on my site, it has to all go in the same repo. With GitHub Pages, it wasn’t clear that there is a much easier way to handle this. It’s a simple as setting any other repository to use GitHub Pages as well.

When you set up the first GitHub Pages repository, you’re given subdomain at a github.io address. This acts as the main or parent site. In my case, I took this a little further by setting up a custom domain, which isn’t required but works just the same. After the main site is set up, any additional repositories that have GitHub pages enabled on them will use a subdirectory structure. These are referred to as “project pages.” The GitHub documentation is a little fuzzy on what exactly that means, but it’s just that these are deployed to a subdirectory of the main site.

I made a repository called `test-subdirectory`, which had a sample index file in it. I pushed this repo to GitHub, and in the repository settings, I chose a source branch under the GitHub Pages section. This immediately deployed the repository to [samhermes.com/test-subdirectory](https://samhermes.com/test-subdirectory). Now, I no longer need to keep all of my projects within the main repository.

It’s very likely that this is something that is obvious to other people, but it’s something that just wasn’t very clear to me, even after searching around for information. Sometimes something so simple can turn into an unnecessary hurdle.