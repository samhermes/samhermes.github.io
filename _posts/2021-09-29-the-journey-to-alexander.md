---
title: The journey to Alexander
date: 2021-09-29 00:32:00 Z
tags:
- HTML
- CSS
- JavaScript
---

I’ve long been interested in design systems, pattern libraries, front end frameworks, and the like. Naturally, for no good reason, I’ve wanted to create one of my own, putting my spin on it and filling it with all of my opinions. Despite a long list of reasons not to, I decided to wade into this project earlier this year.

I began listing out all of the components I wanted to create, from buttons to cards to accordions, and then began researching the best way to make a foundation to support it all. I planned to make a color palette, custom styles for all of the basic elements, and then bundle it up in a way to make it easy to insert into a project. In essence, I did what everyone else has done. The further along I got, the emptier it felt. I lost track of why I was doing it.

For a little while, I was stuck there. I was teetering on going full steam ahead or totally scrapping it. Either way felt reasonable. Finally, after spending an afternoon on a remote mountain top, it hit me. The reason I was making this was not to make a design system, but to take what I’ve learned about front end so far and to put that into a product. Lightbulb.

With this, I redirected my energy into documenting just the things I felt I had something to say about. Anything that had been answered in a better way somewhere else, I removed. Anything that felt like a specific design implementation, I removed. Partially relieved at having less to do, and partially energized by a new focus, I found myself at a version 1. And that’s about where I am today. I plan to grow and adapt it as I go, treating it primarily as a reference point for myself.

[Alexander](https://samhermes.com/alexander) looks like a front end framework. And it is, sort of. It’s also a place for me to ask questions and go down rabbit holes in a place that’s outside of any project I’m working on. Why are we still using browser resets? Can we separate global and component level styles? Can accessibility be separate from branding? How modular can I get? Why does every design system have to solve the same base level problem? What browser defaults are best left alone?

I've used Underscores for my WordPress work for so long. It includes Normalize as its starting point, and this has always seemed appropriate to me. I'm beginning to question this approach of just wholesale including a stylesheet like that though. How many sites have I put out there with these extra styles, when they were never needed for the site? That's an obvious area for improvement.

A lot of the styles that are included in Normalize or a similar reset/starter have to do with form elements. At least in the context of WordPress, I rely on a form plugin to handle forms, and those plugins come with their own stylesheet. Ninja Forms includes form reset styles. So, I've been double reset-ing. Not great. The most I’ll do outside of Ninja Forms is add a search field, which I usually style enough to handle any inconsistencies anyway.

On a broader scope, I’ve always been bewildered by using Bootstrap wholesale for anything. To include a bunch of assets in a project that may or may not use them seems super wasteful. For a larger system where you don't know what elements will be used, sure, it makes perfect sense. For a small site? No. I do, however, look at it for reference regularly, and I think that this kind of usage makes a lot of sense, as it gives you a really great starting point. They’ve already thought through performance, browser consistency, accessibility, long term maintenance, not to mention common interaction patterns.

This brings me a second area of concern, probably best highlighted by Bootstrap. What’s the best way to adapt reusable components for a specific design? Sure, Bootstrap offers a way to control the presentation of components, but things can just get messy really quickly. Changing the markup at all would essentially fork the component. I wanted to take a stab at this, and worked on Alexander with two distinct layers. These two layers are visible throughout the documentation by using the toggle button on each demo.

The difficulty of this exercise was deciding exactly where to draw the line. Some styles are needed in order for each component to function at a base level, but finding where those cross over into a design implementation took some second-guessing. Additionally, the animations and interactions that I implemented were specific enough not to work in every situation. Those are much less flexible, and difficult to make more flexible. The limits of JavaScript strike again. Were some of these interactions built into the browser, these components could be far more robust, but we’re working with what we’ve got.

In the long run, to make the call on whether or not this project was successful, I’ll need to use it on a real project. That will take time, and will result in changes, but I think it’s in a really good place now, and I’m excited to have those opportunities. Like I said, I hope to continue growing and changing Alexander as I learn more.