---
title: 'Analytics: Where do we go?'
date: 2020-09-10 21:10:00 Z
layout: post
---

Measuring web traffic on the web. Yikes. Right now, it seems like we are in a precarious place, increasingly so. With privacy becoming more and more of a household topic, how should we think about collecting analytics in the coming years? (Spoiler alert: I do not have the answer. But, definitely thinking about it.)

Previously, attaching Google Analytics to a site seemed like a fairly obvious choice. It was, and still is, a big priority for Google, and it’s essentially the only viable choice. Now, it doesn’t seem so obvious.

In the past, on many of my projects, I’ve hooked up Google Analytics and gone on with my life. It turns out, in hindsight, that many of these only needed a small snapshot of recent data, and that it was far more convenient to view this data through the site’s admin, WordPress. All of the other data that Google Analytics was collecting was, largely, just for Google. Seems like I should get a commission. In fact, we all should. 👀

Every time that I go dig into the ills of data collection, things seem darker and darker. My simple act of adding to Google’s data treasure trove seems less and less innocent all the time. I have no malicious intent, my goal has simply been to install some mechanism by which site owners can know how their site is performing. It’s unfortunate that this is tied to a large corporation gaining more access to our whereabouts.

## Alternatives to Google Analytics

A fairly good route to go is just with something other than Google Analytics. There are all kind of companies that have cropped up over recent years. I’ve tried out StatCounter, and there are other products like Clicky, Matomo, or GoSquared. Most of these offerings have a limit on how much you can get for free. With StatCounter, it only keeps so much data. Clicky has a limit on daily page views.

## Ad Blockers

Even if you pick a super-privacy-concious analytics service, your efforts could be thwarted by ad blockers. It’s a bit difficult to know how many people have these installed, especially if the ad blockers are doing their job properly. Statista reports that 26% of users have one running this year, but it’s hard to know how accurate this is. Other sites that I viewed reported different numbers.

As ad blockers also block tracking scripts, the data that we collect will always be wrong. To what degree, it’s hard to say. A more technical site likely has a higher percentage of users with ad blockers. An e-commerce site might be more middle of the road, but is still misreporting.

## Server Statistics

Here’s another location where we could potentially get an idea of how much traffic a site is getting. This is full of issues as well, naturally. Due to caching, either on the site itself or in the user’s browser, some users will never hit the server. There’s also the traffic of the various bots that roam the internet, which will show up as a request alongside other users. Getting a good picture of what’s a real visit and what’s not is difficult, and the server doesn’t collect much in the way of user data

## Where do we go?

I wish I had the answer to this question. I hope you didn’t expect an answer here. This is a really complex topic. For now, it seems like the best approach would be to install an alternative to Google Analytics. Which of these to choose is difficult, but those that are built on privacy seem to be a good place to start. If you can pay for an analytics service, that seems like the best option.

Long term, we have two very contradictory needs, the need for user privacy, and the need for an individual or organization to measure their reach. On their own, these are very reasonable. But together, they only become more and more important. As more of what we do moves online, the more we need to measure. The more that we use the web, the more important it is that we are able to move around without being followed.