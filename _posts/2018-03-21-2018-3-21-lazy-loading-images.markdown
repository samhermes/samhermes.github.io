---
title: Lazy loading images
date: 2018-03-21 00:00:00 Z
categories:
- JavaScript
layout: post
custom_js: prism
---

First things first, we needn’t write a lazy loading script ourselves. There are so many options out there. For many people, having a non-javascript fallback isn’t too much of a concern. But, I am not most people. This led me to lazyload.js, which just so happens to be the first result on Google for “lazy load script”. Maybe I am most people.

So, we include lazyload.js in the footer of the page, and then we call `lazyload();`. I’ve modified my copy of the lazyload.js script to include this in the bottom of the file, so that it gets called right after it loads, but it could also be called in the footer of the page like so:

```html
<script src="lazyload.js"></script>
<script>lazyload();</script>
```

Now we need to adjust the image markup we’re using. We apply a class of `lazyload` to each `<img>`, and move the URL of the image file from the `src` attribute to a new attribute called `data-src`. It will now look something like this:

```html
<img class="lazyload" data-src="banana-tree.jpg" alt="A banana tree.">
```

By moving the image source from the `src` attribute to a `data-` attribute, we prevent the browser from downloading the image file, and then the lazy load script will move the image URL from the `data-` attribute to the `src` attribute, triggering a download.

We really only want to set this up for images that are, pardon my language, but, below the fold. Images that are seen by the user as the page loads should not use a lazy loading technique, as the browser default works just fine! For my photo page, I started applying the lazy loading technique on the third image.

Now that we’ve got images lazy loading, what do we do when JavaScript isn’t working or enabled? Right now, none of the lazy load images will load, and we’ll just have some confused users. This is assuming that anyone looks at my photo page, but still. We just need to add an additional image tag, and wrap it in a `<noscript>` tag. Like so:

```html
<noscript>
  <img src="walnut-tree.jpg" alt="A walnut tree.">
</noscript>
```

What we’ve got now is a fairly bare-bones lazy loading setup, but it works quite well. If I were to add a hundred photos to the page, only the first two would load by default, and the user would only download the photos that they scrolled down to. This is a fantastic relief for anyone who is on a data plan, especially if they land on the page without knowing what they are about to do. Small improvements like lazy loading can have a huge impact.
