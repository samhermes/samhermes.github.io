---
title: I love overscroll-behavior
date: 2018-06-10 00:00:00 Z
tags:
- CSS
---

Talk about something that you didn’t know you needed! A new CSS property has been proposed (about a year ago by now, actually) called `overscroll-behavior` that allows us to limit scrolling to a contained element, without scrolling the entire page as well. This is great for modals, small chat windows, and, in my very specific reason to be excited, mobile menus! There’s a great writeup about it on the [Chrome developer site](https://developers.google.com/web/updates/2017/11/overscroll-behavior).

Browser support is limited to Chrome (desktop and Android) and Firefox at the moment, according to [Can I use](https://caniuse.com/#feat=css-overscroll-behavior). This means that about 60% of users have it, though, so we’re well on our way to wide support. It appears that IE 11 and Edge support a property called `-ms-scroll-chaining`, which works similarly. The only concerning holdout to me is mobile Safari. It would be great to see `overscroll-behavior` implemented there. It’s [been reported to the bug tracker](https://bugs.webkit.org/show_bug.cgi?id=176454) but I’m not sure about future plans.

What is so great about `overscroll-behavior` is that it allows you to limit a users scroll to only the element that they’re currently interacting with. For a mobile menu, this is great. If the menu takes over the entire screen, as many of them do, you can ensure that the user never ends up accidentally scrolling the page behind the menu. If you’ve ever had this happen before, you know how annoying it is. This behavior is known as scroll chaining, and a much better description is available in the [WICG spec for overscroll behavior](https://wicg.github.io/overscroll-behavior/#scroll-chaining).

In Chrome on Android, by default, when you reach the top of the page, you can pull to refresh the entire page. In this instance, `overscroll-behavior` is especially helpful if you’ve implemented your own pull-to-refresh and do not want them to interfere with one another.
