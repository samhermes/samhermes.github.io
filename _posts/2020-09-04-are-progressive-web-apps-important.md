---
title: Are progressive web apps important?
date: 2020-09-04 21:37:00 Z
---

As part of Google’s Lighthouse tool (which is very useful), it gives feedback on how well a site has implemented progressive web app (PWA) features. It’s one of five main measurements, alongside performance and accessibility. Google has championed progressive web apps more than anyone, so it isn’t surprising that the ranking gets this positioning in its own tool. However, how important are they?

Spelled out right in the name is “web app,” which already gives an eye into when PWAs might be useful. When your site contains app-like behavior (I’ll let you make the call on that one), it makes sense that you might work to optimize that, and adding PWA features is a great place to start. It allows developers to store important assets on the user’s device, so that the next interaction is super fast.

When we look at the wider web, however, should the general advice be to make your site into a progressive web app, no matter what?

## Generalizations about the web

A newcomer to web development would not be blamed for thinking that web development is mainly about libraries and frameworks, as this is what gets talked about most frequently. React, Vue, etc. catch most of the headlines. Those frameworks do have a lot of figuring out to do in their quest to re-implement the web inside of itself, so it makes sense that there is so much chatter [end snark]. However, it can distort the reality of what the web is actually made up of.

For e-commerce sites, social networking sites, dashboards, tools, things of that sort, JavaScript is absolutely required, and the usual tools for these applications now come with progressive web app functionality bundled in. If you use Create React App to start a React project, it includes the needed stuff to make your application a progressive web app out of the box.

If you’re making a blog, or a marketing site, or really anything that’s not an “app,” you probably don’t need to bother implementing the PWA features. It’s a waste of time, stores assets on your users device unnecessarily, causes them to download extra unnecessary files the first time they visit your site, and is an extra burden on already overburdened developers.

## Performance

For a web app, the typical expectation is that users will visit again and again. A social media service expects repeat visits, an enterprise tool could be used day in and day out. Progressive web apps are able to store many of the app’s assets locally on the users device, and just grabs them from local storage instead of sending a network request. That really speeds up the application. Performance win.

Will you return to a marketing site day after day? Probably not. What if you’re using a search engine, and hitting lots of different sites as you look for an answer? You don’t want to keep any of the assets from those sites. For those sites to do any extra work to speed up your second visit is a waste.

## Offline

Another great perk of progressive web apps is that you can allow a user to still interact with the app while they are offline. You could even show a custom “you’re offline” message when they are offline. I just… don’t know why this is useful in any way. If something lives on the web, it needs a connection. A user’s device is already good at communicating when the connection has been broken. And, if I’ve lost my connection, I probably don’t want to try to do anything with an app anyway. I have to trust that everything gets properly sorted out when the connection comes back.

## Installable

This topic is heavily influenced by our favorite trillion dollar corporation, as iOS has really been the main holdup on installable web apps gaining hold. Despite some sort of progress (?) on this in the last few years, it’s still very clear that Apple wants to keep their very profitable App Store humming along. PWAs on iOS are just buggy enough to be useless.

Google’s great improvements in Android have been remarkable, and I wish that iOS could match it. Without wide cross-platform adoption of the features of PWAs, I can’t see this being a compelling reason to implement any of them. This is true of anything on the web. Do we suggest users on Android install a web app, and then users on iOS have to download a native app? This is a strange fracturing.

## Are PWAs important?

Back to the original question. The answer, of course, is nuanced. But, for many developers, PWAs are not important. If a project is “app-like,” it deserves some consideration, naturally, based on user trends and plenty of real-world testing, like anything else. It’s important that we implement features that make a difference to the user experience, not just because an internet giant is giving us a pass/fail.