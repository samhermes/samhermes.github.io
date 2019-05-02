---
layout: post
title: Closing the gap above sticky elements
date: 2018-05-22
categories: [CSS]
---
`position: sticky` is fantastic, and browser support is increasing. However, one little annoyance that keeps happening is that a small gap will appear above an element while it is fixed (as in, it’s stuck to the top of the viewport). At the moment, this is only happening in Chrome, which is convenient, because most everyone uses Chrome.

This issue is most visible on elements that stick to the top of the viewport while a user scrolls down. If the element has a solid background color, the gap between the element and the top of the viewport allows the content behind the element to be seen scrolling by. This, of course, is only an issue when the element with `position: sticky` is currently fixed.

Fortunately, there’s a fix! This gap comes from the browser calculating the height of preceding elements a little too precisely. For example, say you’ve got a site title with a navigation directly beneath it, and that navigation is sticky. The height of the site title can actually have an effect on the navigation while it’s sticky, as the browser calculates the height of the site title in precise, fractional pixel values. If we set an even pixel height on the site title container, the gap above the sticky navigation will go away.
