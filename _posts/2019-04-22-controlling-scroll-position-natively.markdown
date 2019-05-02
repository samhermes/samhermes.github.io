---
layout: post
title: Controlling scroll position natively
date: 2019-04-22
categories: [JavaScript]
custom_js: prism
---
It had been a little while since I implemented a control to scroll the page, and I was delighted to find that much of the functionality we usually look for has been implemented directly into [most of the major browsers](https://caniuse.com/#feat=element-scroll-methods)! Of course, before we get too carried away, it’s important to note that this isn’t quite ready for use without a polyfill, but we’re getting closer and closer every day.

The browser controls fall under the `window` object, so we can give our directions there. The available functions are `.scroll()`, `.scrollBy()`, `.scrollByLines()`, `.scrollByPages()`, and `.scrollTo()`. The scroll by lines and pages are hardly supported, it looks like just Firefox has picked them up for now. However, the remaining three are more than enough to get most jobs done.

A common pattern that we see around is the case where the hero area of a page takes up `100vh`, and gives the appearance of a full screen element. Some feel that users do not know to scroll, so they put a down arrow at the bottom of the hero area, which, when clicked, takes the user down the page. Usually, with this, we want to position the top of the viewport in alignment with the very bottom of the hero area.

Here’s the full function for the desired behavior, and then I’ll pick it apart a bit:

```js
// store the <button> element in a variable
var downButton = document.querySelector('.down-button');

// attach event handler to the button element
downButton.addEventListener('click', function () {
    // get the pixel value of how much the user has already scrolled
    var alreadyScrolled = window.scrollY;
    // get the window's height, subtract how much the user has scrolled
    var windowHeight = window.innerHeight - alreadyScrolled;

    // smoothly scroll down the page by calculated amount
    window.scrollBy({
        left: 0,
        top: windowHeight,
        behavior: 'smooth'
    });
});
```

You’ll notice that `.scrollBy()` is in use here. This allows us to pass in a pixel value of how much we’d like to scroll. To ensure that the user always gets take to the same spot, we need to check and makes sure that we incorporate any amount that they’ve already scrolled. We subtract that from the `innerHeight` value that is a part of the `window` object.

The best part of this functionality is the `behavior` setting. Previously, we went looking for libraries to scroll smoothly, but now it’s built into the browser. Although it lacks customization, it works great for most cases, and eases the page to the new scroll position. You can always take a user immediately to the new scroll position if desired, but the smooth scroll helps to show exactly what’s happening.

Last but not least, a polyfill is needed to make this work in IE and Edge (at least at the time of writing). There is one by Dustan Kasten, [available on GitHub](https://github.com/iamdustan/smoothscroll). It gets the browser support to where most would need it to be. Hopefully we’ll be able to skip it altogether soon.